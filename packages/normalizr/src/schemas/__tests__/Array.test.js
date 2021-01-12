// eslint-env jest
import { fromJS } from 'immutable';

import { denormalize } from '../../denormalize';
import { normalize, schema } from '../../';
import IDEntity from '../../entities/IDEntity';

describe(`${schema.Array.name} normalization`, () => {
  describe('Object', () => {
    test('should throw a custom error if data loads with string unexpected value', () => {
      class User extends IDEntity {}
      const schema = [User];
      function normalizeBad() {
        normalize('abc', schema);
      }
      expect(normalizeBad).toThrowErrorMatchingSnapshot();
    });

    test('should throw a custom error if data loads with json string unexpected value', () => {
      class User extends IDEntity {}
      const schema = [User];
      function normalizeBad() {
        normalize('[{"id":5}]', schema);
      }
      expect(normalizeBad).toThrowErrorMatchingSnapshot();
    });

    test(`normalizes plain arrays as shorthand for ${schema.Array.name}`, () => {
      class User extends IDEntity {}
      expect(normalize([{ id: '1' }, { id: '2' }], [User])).toMatchSnapshot();
    });

    test('throws an error if created with more than one schema', () => {
      class User extends IDEntity {}
      class Cat extends IDEntity {}
      expect(() => normalize([{ id: '1' }], [Cat, User])).toThrow();
    });

    test('passes its parent to its children when normalizing', () => {
      class Child extends IDEntity {
        content = '';

        static fromJS(entity, parent, key) {
          return super.fromJS({
            ...entity,
            parentId: parent.id,
            parentKey: key,
          });
        }
      }
      class Parent extends IDEntity {
        content = '';
        children = [];

        static schema = {
          children: [Child],
        };
      }

      expect(
        normalize(
          {
            id: '1',
            content: 'parent',
            children: [{ id: 4, content: 'child' }],
          },
          Parent,
        ),
      ).toMatchSnapshot();
    });

    test('normalizes Objects using their values', () => {
      class User extends IDEntity {}
      expect(
        normalize({ foo: { id: '1' }, bar: { id: '2' } }, [User]),
      ).toMatchSnapshot();
    });
  });

  describe('Class', () => {
    class Cats extends IDEntity {}
    test('normalizes a single entity', () => {
      const listSchema = new schema.Array(Cats);
      expect(
        normalize([{ id: '1' }, { id: '2' }], listSchema),
      ).toMatchSnapshot();
    });

    test('normalizes multiple entities', () => {
      const inferSchemaFn = jest.fn(
        (input, parent, key) => input.type || 'dogs',
      );
      class Person extends IDEntity {}
      const listSchema = new schema.Array(
        {
          Cat: Cats,
          people: Person,
        },
        inferSchemaFn,
      );

      expect(
        normalize(
          [
            { type: 'Cat', id: '123' },
            { type: 'people', id: '123' },
            { id: '789', name: 'fido' },
            { type: 'Cat', id: '456' },
          ],
          listSchema,
        ),
      ).toMatchSnapshot();
      expect(inferSchemaFn.mock.calls).toMatchSnapshot();
    });

    test('normalizes Objects using their values', () => {
      class User extends IDEntity {}
      const users = new schema.Array(User);
      expect(
        normalize({ foo: { id: '1' }, bar: { id: '2' } }, users),
      ).toMatchSnapshot();
    });

    test('filters out undefined and null normalized values', () => {
      class User extends IDEntity {}
      const users = new schema.Array(User);
      expect(
        normalize([undefined, { id: '123' }, null], users),
      ).toMatchSnapshot();
    });
  });
});

describe(`${schema.Array.name} denormalization`, () => {
  describe('Object', () => {
    test('denormalizes a single entity', () => {
      class Cat extends IDEntity {}
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      expect(denormalize(['1', '2'], [Cat], entities)).toMatchSnapshot();
      expect(
        denormalize(['1', '2'], [Cat], fromJS(entities)),
      ).toMatchSnapshot();
    });

    test('denormalizes plain arrays with nothing inside', () => {
      class User extends IDEntity {}
      const entities = {
        User: {
          1: { id: '1', name: 'Jane' },
        },
      };
      expect(
        denormalize({ user: '1' }, { user: User, tacos: [] }, entities),
      ).toMatchSnapshot();
      expect(
        denormalize({ user: '1' }, { user: User, tacos: [] }, fromJS(entities)),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1' }),
          { user: User, tacos: [] },
          fromJS(entities),
        ),
      ).toMatchSnapshot();

      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: [] },
          entities,
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: [] },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1', tacos: [] }),
          { user: User, tacos: [] },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
    });

    test('denormalizes plain arrays with plain object inside', () => {
      class User extends IDEntity {}
      const entities = {
        User: {
          1: { id: '1', name: 'Jane' },
        },
      };
      expect(
        denormalize(
          { user: '1' },
          { user: User, tacos: [{ next: '' }] },
          entities,
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          { user: '1' },
          { user: User, tacos: [{ next: '' }] },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1' }),
          { user: User, tacos: [{ next: '' }] },
          fromJS(entities),
        ),
      ).toMatchSnapshot();

      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: [{ next: '' }] },
          entities,
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: [{ next: '' }] },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1', tacos: [] }),
          { user: User, tacos: [{ next: '' }] },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
    });

    test('denormalizes nested in object', () => {
      class Cat extends IDEntity {}
      const catSchema = { results: [Cat] };
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      expect(
        denormalize({ results: ['1', '2'] }, catSchema, entities),
      ).toMatchSnapshot();
      expect(
        denormalize({ results: ['1', '2'] }, catSchema, fromJS(entities)),
      ).toMatchSnapshot();
    });

    test('denormalizes nested in object with primitive', () => {
      class Cat extends IDEntity {}
      const catSchema = { results: [Cat], nextPage: '' };
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      let [value, found] = denormalize(
        { results: ['1', '2'] },
        catSchema,
        entities,
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(true);
      [value, found] = denormalize(
        { results: ['1', '2'] },
        catSchema,
        fromJS(entities),
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(true);
    });

    test('denormalizes should not be found when result array is undefined', () => {
      class Cat extends IDEntity {}
      const catSchema = { results: [Cat] };
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      let [value, found] = denormalize(
        { results: undefined },
        catSchema,
        entities,
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(false);
      [value, found] = denormalize(
        { results: undefined },
        catSchema,
        fromJS(entities),
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(false);
    });

    test('denormalizes with missing entity should have true second value', () => {
      class Cat extends IDEntity {}
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      let [value, foundEntities] = denormalize(
        [{ data: '1' }, { data: '2' }, { data: '3' }],
        [{ data: Cat }],
        entities,
      );
      expect(value).toMatchSnapshot();
      expect(foundEntities).toBe(true);
      [value, foundEntities] = denormalize(
        [{ data: '1' }, { data: '2' }, { data: '3' }],
        [{ data: Cat }],
        fromJS(entities),
      );
      expect(value).toMatchSnapshot();
      expect(foundEntities).toBe(true);
    });

    test('returns the input value if is not an array', () => {
      class Filling extends IDEntity {}
      class Taco extends IDEntity {
        static schema = { fillings: [Filling] };
      }
      const entities = {
        Taco: {
          123: {
            id: '123',
            fillings: null,
          },
        },
      };

      expect(denormalize('123', Taco, entities)).toMatchSnapshot();
      expect(denormalize('123', Taco, fromJS(entities))).toMatchSnapshot();
    });
  });

  describe('Class', () => {
    test('denormalizes a single entity', () => {
      class Cat extends IDEntity {}
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      const catList = new schema.Array(Cat);
      expect(denormalize(['1', '2'], catList, entities)).toMatchSnapshot();
      expect(
        denormalize(['1', '2'], catList, fromJS(entities)),
      ).toMatchSnapshot();
    });

    test('denormalizes plain arrays with nothing inside', () => {
      class User extends IDEntity {}
      const entities = {
        User: {
          1: { id: '1', name: 'Jane' },
        },
      };
      expect(
        denormalize(
          { user: '1' },
          { user: User, tacos: new schema.Array() },
          entities,
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          { user: '1' },
          { user: User, tacos: new schema.Array() },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1' }),
          { user: User, tacos: new schema.Array() },
          fromJS(entities),
        ),
      ).toMatchSnapshot();

      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: new schema.Array() },
          entities,
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: new schema.Array() },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1', tacos: [] }),
          { user: User, tacos: new schema.Array() },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
    });

    test('denormalizes plain arrays with plain object inside', () => {
      class User extends IDEntity {}
      const entities = {
        User: {
          1: { id: '1', name: 'Jane' },
        },
      };
      expect(
        denormalize(
          { user: '1' },
          { user: User, tacos: new schema.Array({ next: '' }) },
          entities,
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          { user: '1' },
          { user: User, tacos: new schema.Array({ next: '' }) },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1' }),
          { user: User, tacos: new schema.Array({ next: '' }) },
          fromJS(entities),
        ),
      ).toMatchSnapshot();

      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: new schema.Array({ next: '' }) },
          entities,
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          { user: '1', tacos: [] },
          { user: User, tacos: new schema.Array({ next: '' }) },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
      expect(
        denormalize(
          fromJS({ user: '1', tacos: [] }),
          { user: User, tacos: new schema.Array({ next: '' }) },
          fromJS(entities),
        ),
      ).toMatchSnapshot();
    });

    test('denormalizes nested in object', () => {
      class Cat extends IDEntity {}
      const catSchema = { results: new schema.Array(Cat) };
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      expect(
        denormalize({ results: ['1', '2'] }, catSchema, entities),
      ).toMatchSnapshot();
      expect(
        denormalize({ results: ['1', '2'] }, catSchema, fromJS(entities)),
      ).toMatchSnapshot();
    });

    test('denormalizes nested in object with primitive', () => {
      class Cat extends IDEntity {}
      const catSchema = { results: new schema.Array(Cat), nextPage: '' };
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      let [value, found] = denormalize(
        { results: ['1', '2'] },
        catSchema,
        entities,
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(true);
      [value, found] = denormalize(
        { results: ['1', '2'] },
        catSchema,
        fromJS(entities),
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(true);
    });

    test('denormalizes should not be found when result array is undefined', () => {
      class Cat extends IDEntity {}
      const catSchema = { results: new schema.Array(Cat) };
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      let [value, found] = denormalize(
        { results: undefined },
        catSchema,
        entities,
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(false);
      [value, found] = denormalize(
        { results: undefined },
        catSchema,
        fromJS(entities),
      );
      expect(value).toMatchSnapshot();
      expect(found).toBe(false);
    });

    test('denormalizes with missing entity should have true second value', () => {
      class Cat extends IDEntity {}
      const entities = {
        Cat: {
          1: { id: '1', name: 'Milo' },
          2: { id: '2', name: 'Jake' },
        },
      };
      const catList = new schema.Array(Cat);
      expect(denormalize(['1', '2', '3'], catList, entities)).toMatchSnapshot();
      expect(
        denormalize(['1', '2', '3'], catList, fromJS(entities)),
      ).toMatchSnapshot();
    });

    test('denormalizes multiple entities', () => {
      class Cat extends IDEntity {}
      class Person extends IDEntity {}
      const listSchema = new schema.Array(
        {
          Cat: Cat,
          dogs: {},
          people: Person,
        },
        (input, parent, key) => input.type || 'dogs',
      );

      const entities = {
        Cat: {
          123: {
            id: '123',
            type: 'Cat',
          },
          456: {
            id: '456',
            type: 'Cat',
          },
        },
        Person: {
          123: {
            id: '123',
            type: 'people',
          },
        },
      };

      const input = [
        { id: '123', schema: 'Cat' },
        { id: '123', schema: 'people' },
        { id: { id: '789' }, schema: 'dogs' },
        { id: '456', schema: 'Cat' },
      ];

      expect(denormalize(input, listSchema, entities)).toMatchSnapshot();
      expect(
        denormalize(input, listSchema, fromJS(entities)),
      ).toMatchSnapshot();
    });

    test('returns the input value if is not an array', () => {
      class Filling extends IDEntity {}
      const fillings = new schema.Array(Filling);
      class Taco extends IDEntity {
        static schema = { fillings };
      }
      const entities = {
        Taco: {
          123: {
            id: '123',
            fillings: {},
          },
        },
      };

      expect(denormalize('123', Taco, entities)).toMatchSnapshot();
      expect(denormalize('123', Taco, fromJS(entities))).toMatchSnapshot();
    });

    test('does not assume mapping of schema to attribute values when schemaAttribute is not set', () => {
      class Cat extends IDEntity {}
      const catRecord = new schema.Object({
        cat: Cat,
      });
      const catList = new schema.Array(catRecord);
      const input = [
        { cat: { id: '1' }, id: '5' },
        { cat: { id: '2' }, id: '6' },
      ];
      const output = normalize(input, catList);
      expect(output).toMatchSnapshot();
      expect(denormalize(output.result, catList, output.entities)).toEqual([
        input,
        true,
        false,
      ]);
    });
  });
});
