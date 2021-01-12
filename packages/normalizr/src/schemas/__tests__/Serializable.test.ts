// eslint-env jest
import { denormalize } from '../../denormalize';
import { normalize } from '../../';
import IDEntity from '../../entities/IDEntity';

class User extends IDEntity {
  createdAt = new Date(0);
  name = '';
  static schema = {
    createdAt: Date,
  };
}
class Other {
  thing = 0;
  constructor(props) {
    this.thing = props.thing;
  }

  toJSON() {
    return { thing: this.thing };
  }
}
const objectSchema = {
  user: User,
  anotherItem: Other,
  time: Date,
};

describe(`Serializable normalization`, () => {
  test('normalizes date and custom', () => {
    const norm = normalize(
      {
        user: {
          id: '1',
          name: 'Nacho',
          createdAt: '2020-06-07T02:00:15+0000',
        },
        anotherItem: { thing: 500 },
        time: '2020-06-07T02:00:15+0000',
      },
      objectSchema,
    );
    expect(norm.result.time.getTime()).toBe(norm.result.time.getTime());
    expect(norm.result.anotherItem).toBeInstanceOf(Other);
    expect(norm.entities[User.key]['1'].createdAt).toBe(
      norm.entities[User.key]['1'].createdAt,
    );
    expect(norm).toMatchSnapshot();
    expect(JSON.stringify(norm)).toMatchSnapshot();
  });
});

describe(`Serializable denormalization`, () => {
  test('denormalizes date and custom', () => {
    const entities = {
      User: {
        '1': {
          id: '1',
          name: 'Nacho',
          createdAt: new Date('2020-06-07T02:00:15+0000'),
        },
      },
    };
    const [response, found] = denormalize(
      {
        user: '1',
        anotherItem: new Other({ thing: 500 }),
        time: new Date('2020-06-07T02:00:15+0000'),
      },
      objectSchema,
      entities,
    );
    expect(response.anotherItem).toBeInstanceOf(Other);
    expect(response.time.getTime()).toBe(response.time.getTime());
    expect(response.user?.createdAt.getTime()).toBe(
      response.user?.createdAt.getTime(),
    );
    expect(found).toBe(true);
    expect(response).toMatchSnapshot();
  });

  test('denormalizes as plain', () => {
    const entities = {
      User: {
        '1': {
          id: '1',
          name: 'Nacho',
          createdAt: '2020-06-07T02:00:15+0000',
        },
      },
    };
    const [response, found] = denormalize(
      {
        user: '1',
        anotherItem: { thing: 500 },
        time: '2020-06-07T02:00:15+0000',
      },
      objectSchema,
      entities,
    );
    expect(response.anotherItem).toBeInstanceOf(Other);
    expect(response.time.getTime()).toBe(response.time.getTime());
    expect(response.user?.createdAt.getTime()).toBe(
      response.user?.createdAt.getTime(),
    );
    expect(found).toBe(true);
    expect(response).toMatchSnapshot();
  });
});
