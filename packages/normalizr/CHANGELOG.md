# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 6.0.0-k.0 (2021-01-05)

* pkg: Use @babel/runtime @ 7.12 ([e631f6a](https://github.com/coinbase/rest-hooks/commit/e631f6a))
* fix: TypeScript 4 compatibility (#406) ([5d82e24](https://github.com/coinbase/rest-hooks/commit/5d82e24)), closes [#406](https://github.com/coinbase/rest-hooks/issues/406)
* internal: Upgrade build pkgs (#404) ([dc56530](https://github.com/coinbase/rest-hooks/commit/dc56530)), closes [#404](https://github.com/coinbase/rest-hooks/issues/404)





## 6.0.0-j.2 (2020-08-04)

* fix: Handle entities updated with new indexes (#384) ([2ee3bb6](https://github.com/coinbase/rest-hooks/commit/2ee3bb6)), closes [#384](https://github.com/coinbase/rest-hooks/issues/384)
* internal: Only import what is used (#383) ([10fef0c](https://github.com/coinbase/rest-hooks/commit/10fef0c)), closes [#383](https://github.com/coinbase/rest-hooks/issues/383)





## 6.0.0-j.1 (2020-07-31)

* enhance: Normalizr ES build should be split into modules for code splitting (#381) ([c543a31](https://github.com/coinbase/rest-hooks/commit/c543a31)), closes [#381](https://github.com/coinbase/rest-hooks/issues/381)





## 6.0.0-j.0 (2020-07-27)

* fix: Make normalizr commonjs bundle transpile classes ([6812990](https://github.com/coinbase/rest-hooks/commit/6812990))





## 6.0.0-i.1 (2020-07-22)

* fix: Ambient files now typechecked, fixed some types there (#372) ([223d4a4](https://github.com/coinbase/rest-hooks/commit/223d4a4)), closes [#372](https://github.com/coinbase/rest-hooks/issues/372)





## 6.0.0-i.0 (2020-07-20)

* build(deps): bump lodash in /packages/normalizr/examples/redux (#367) ([7e8c191](https://github.com/coinbase/rest-hooks/commit/7e8c191)), closes [#367](https://github.com/coinbase/rest-hooks/issues/367)





## 6.0.0-h.0 (2020-07-13)

* pkg: Bump babel runtime ([c6bf844](https://github.com/coinbase/rest-hooks/commit/c6bf844))





## 6.0.0-delta.0 (2020-07-08)

* feat: Deletes and invalidates trigger suspense always (#360) ([96175ba](https://github.com/coinbase/rest-hooks/commit/96175ba)), closes [#360](https://github.com/coinbase/rest-hooks/issues/360)


### BREAKING CHANGE

* - denormalize has third boolean value to track deletion
- deletes no long remove entities, but replace them with DELETE symbol (exported from normalizr)
- schema of delete shape should be the `new schemas.Delete()`
- useInvalidator()'s function calls will always suspend - even without invalidIfStale
- deleted entities that are required by a useResource() will now cause it to suspend rather than throwing `404`
- required entities missing from network response will now throw error in useResource() just like other unexpected deserializations
- FetchShape type is now just 'read' | 'mutate'. No more 'delete'. (use schema.Delete())




## 6.0.0-gamma.2 (2020-06-13)

* docs: Fix normalizr docs links ([11c2995](https://github.com/coinbase/rest-hooks/commit/11c2995))
* docs: Switch to 'gamma' channel ([f932659](https://github.com/coinbase/rest-hooks/commit/f932659))





## 6.0.0-beta.12 (2020-06-13)

* docs: Add field deserialization ([05686cb](https://github.com/coinbase/rest-hooks/commit/05686cb))
* feat: Declarative schema deserialization (#355) ([9dbb019](https://github.com/coinbase/rest-hooks/commit/9dbb019)), closes [#355](https://github.com/coinbase/rest-hooks/issues/355)





## 6.0.0-beta.11 (2020-06-06)

* enhance: Catch Entity key on node 14 ([2a99cd3](https://github.com/coinbase/rest-hooks/commit/2a99cd3))
* feat: SimpleRecord can have optional entities by setting default to null (#350) ([b656185](https://github.com/coinbase/rest-hooks/commit/b656185)), closes [#350](https://github.com/coinbase/rest-hooks/issues/350)
* internal: Add test for complex schema.Values() case (#349) ([d14802a](https://github.com/coinbase/rest-hooks/commit/d14802a)), closes [#349](https://github.com/coinbase/rest-hooks/issues/349)
* internal: eslint major, plugin minor ([1532f7a](https://github.com/coinbase/rest-hooks/commit/1532f7a))





## [6.0.0-beta.10](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.9...@rest-hooks/normalizr@6.0.0-beta.10) (2020-05-20)


### 🐛 Bug Fix

* Types for nested nullable Record or Entity account for not finding nested pieces ([#345](https://github.com/coinbase/rest-hooks/issues/345)) ([f822b53](https://github.com/coinbase/rest-hooks/commit/f822b53487deedf5ae85909584ed5d8343a9cef8))



## [6.0.0-beta.9](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.8...@rest-hooks/normalizr@6.0.0-beta.9) (2020-05-19)


### 🐛 Bug Fix

* Types need to be exported ([0bf5aac](https://github.com/coinbase/rest-hooks/commit/0bf5aac7d41ec8f4795d77f03eba2d426765aff7))



## [6.0.0-beta.8](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.7...@rest-hooks/normalizr@6.0.0-beta.8) (2020-05-19)


### 🐛 Bug Fix

* Import types properly into schema.d.ts ([2d95f55](https://github.com/coinbase/rest-hooks/commit/2d95f554702c1d882f38448ff339528333ef58ad))



## [6.0.0-beta.7](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.6...@rest-hooks/normalizr@6.0.0-beta.7) (2020-05-19)


### 💅 Enhancement

* Better dev error messaging with unexpected string to normalize ([#342](https://github.com/coinbase/rest-hooks/issues/342)) ([efc1b60](https://github.com/coinbase/rest-hooks/commit/efc1b609dc6e3b61b48f69a6bcb51c268cd39ef1))


### 🏠 Internal

* Add Entity tests for handling of getters ([8d1e552](https://github.com/coinbase/rest-hooks/commit/8d1e55269a624a6dc38cc90e0c257d720a81d3c2))
* Add test for taking string response when expecting entity ([dfb2625](https://github.com/coinbase/rest-hooks/commit/dfb26259f47a21c7d95e9edc38a73e5db1367158))
* Add test: methods are not expected in Entities ([d7c26e6](https://github.com/coinbase/rest-hooks/commit/d7c26e6a0c40b4fd059c496670f9dff394fc6c62))



## [6.0.0-beta.6](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.5...@rest-hooks/normalizr@6.0.0-beta.6) (2020-05-14)


### 💅 Enhancement

* Rename merge variables to (existing, incoming) ([#340](https://github.com/coinbase/rest-hooks/issues/340)) ([1d68c30](https://github.com/coinbase/rest-hooks/commit/1d68c30c4b07204d20782f257c9bf0b0fd594c7c))


### 📝 Documentation

* Get rid of all references to asSchema() ([#339](https://github.com/coinbase/rest-hooks/issues/339)) ([01b878b](https://github.com/coinbase/rest-hooks/commit/01b878b85f7469a12e19912efc696a424663e5f5))



## [6.0.0-beta.5](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.4...@rest-hooks/normalizr@6.0.0-beta.5) (2020-05-13)


### 💅 Enhancement

* Include merge() in EntityInterface ([709cb38](https://github.com/coinbase/rest-hooks/commit/709cb380fa765c459a2b3edb72f7b7187c968f29))



## [6.0.0-beta.4](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.3...@rest-hooks/normalizr@6.0.0-beta.4) (2020-05-13)


### 💅 Enhancement

* Improve malformed entity normalization algorithm ([#338](https://github.com/coinbase/rest-hooks/issues/338)) ([b6032b2](https://github.com/coinbase/rest-hooks/commit/b6032b21aec1e982b4b1abcbddbd28593b86c91b))
* Warn about using asSchema() in dev-mode ([35b680e](https://github.com/coinbase/rest-hooks/commit/35b680e4d6ecea309d62a140941042fa2b0d1f0b))



## [6.0.0-beta.3](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.2...@rest-hooks/normalizr@6.0.0-beta.3) (2020-05-12)


### 🚀 Features

* Allow SimpleRecords to be schemas ([#334](https://github.com/coinbase/rest-hooks/issues/334)) ([924c257](https://github.com/coinbase/rest-hooks/commit/924c2579f740434f62e3597503b2d4fb53b76916))


### 💅 Enhancement

* No longer require 'asSchema()' ([#335](https://github.com/coinbase/rest-hooks/issues/335)) ([a29c41b](https://github.com/coinbase/rest-hooks/commit/a29c41b4449741e0e589d513261186e1a1cbe98a))



## [6.0.0-beta.2](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.1...@rest-hooks/normalizr@6.0.0-beta.2) (2020-05-08)


### 💅 Enhancement

* Detect more cases of network mismatching schema ([#331](https://github.com/coinbase/rest-hooks/issues/331)) ([2af464f](https://github.com/coinbase/rest-hooks/commit/2af464f54318c5f099899150371c911133a717cb))


### 🐛 Bug Fix

* Allow for multiple pk methods ([#333](https://github.com/coinbase/rest-hooks/issues/333)) ([7ea9ed9](https://github.com/coinbase/rest-hooks/commit/7ea9ed9ee4701b2ba1bb1cf29743ae755ed909e8))


### 🏠 Internal

* Improve test coverage ([#330](https://github.com/coinbase/rest-hooks/issues/330)) ([edc5f73](https://github.com/coinbase/rest-hooks/commit/edc5f73471fc2b68a95b4ef09d883e7dab016d7d))



## [6.0.0-beta.1](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@6.0.0-beta.0...@rest-hooks/normalizr@6.0.0-beta.1) (2020-05-04)


### 🚀 Features

* Entity fully denormalizes & Entity -> FlatEntity for non-nested ([#328](https://github.com/coinbase/rest-hooks/issues/328)) ([dd5e513](https://github.com/coinbase/rest-hooks/commit/dd5e5130e317bec5572f00e0d2a192ba2f1ea8cb))



## [6.0.0-beta.0](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.6...@rest-hooks/normalizr@6.0.0-beta.0) (2020-04-26)


### ⚠ 💥 BREAKING CHANGES

* TypeScript 3.7 or higher is required. This uses type
recursion.

### 🚀 Features

* Simplified Entity class ([#315](https://github.com/coinbase/rest-hooks/issues/315)) ([0e6bfcb](https://github.com/coinbase/rest-hooks/commit/0e6bfcb3620006e285510d4e5121fce743214d55))


### 💅 Enhancement

* More readable array return types ([#314](https://github.com/coinbase/rest-hooks/issues/314)) ([4ac8918](https://github.com/coinbase/rest-hooks/commit/4ac8918df19a4d386ff717c3ceef40e151c60c1f))


### 📦 Package

* Bump internal pkgs ([#306](https://github.com/coinbase/rest-hooks/issues/306)) ([46bebad](https://github.com/coinbase/rest-hooks/commit/46bebad79d848404d02423fd2a3e2d647ee5bbbb))


### 🏠 Internal

* Hoist coveralls to root, since testing is done there ([3b1dbaa](https://github.com/coinbase/rest-hooks/commit/3b1dbaac303048a1b1e543f99fb9758b21feb083))
* Update packages in redux example ([dbba679](https://github.com/coinbase/rest-hooks/commit/dbba67935a7b756d66ce7b6cb9e2d93e7f2ce44a))



### [5.0.6](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.5...@rest-hooks/normalizr@5.0.6) (2020-03-13)


### 🐛 Bug Fix

* Schema can be null (for media) ([#293](https://github.com/coinbase/rest-hooks/issues/293)) ([003b3ca](https://github.com/coinbase/rest-hooks/commit/003b3ca53703174b66c5fc9d546d2b340e293e86))



### [5.0.5](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.4...@rest-hooks/normalizr@5.0.5) (2020-02-26)


### 🏠 Internal

* readonly should exist on all levels of internal state ([#276](https://github.com/coinbase/rest-hooks/issues/276)) ([a884186](https://github.com/coinbase/rest-hooks/commit/a884186e2696b40ab764979d646089aa625dfe8d))
* Use Record<string, any> form for POJOs ([dae11b2](https://github.com/coinbase/rest-hooks/commit/dae11b233d4cc3d56ba93f1488a0b42ba7a1dfce))



### [5.0.4](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.3...@rest-hooks/normalizr@5.0.4) (2020-02-19)


### 🏠 Internal

* Check compressed size changes on PR ([#270](https://github.com/coinbase/rest-hooks/issues/270)) ([d70ccbf](https://github.com/coinbase/rest-hooks/commit/d70ccbf44ac5ba8fdc4f70886851ab18349f37e6))



### [5.0.3](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.3-beta.0...@rest-hooks/normalizr@5.0.3) (2020-02-18)

**Note:** Version bump only for package @rest-hooks/normalizr





### [5.0.3-beta.0](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.2...@rest-hooks/normalizr@5.0.3-beta.0) (2020-02-18)


### 🏠 Internal

* Centralize jest config ([#230](https://github.com/coinbase/rest-hooks/issues/230)) ([5d769d2](https://github.com/coinbase/rest-hooks/commit/5d769d2485fe62ba65f4176894768bdbb6faafb3))



### [5.0.2](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.2-beta.0...@rest-hooks/normalizr@5.0.2) (2020-02-10)

**Note:** Version bump only for package @rest-hooks/normalizr





### [5.0.2-beta.0](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.1...@rest-hooks/normalizr@5.0.2-beta.0) (2020-02-04)

**Note:** Version bump only for package @rest-hooks/normalizr





### [5.0.1](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@5.0.0...@rest-hooks/normalizr@5.0.1) (2020-01-29)


### 🐛 Bug Fix

* ES export is non-min version ([4b04b62](https://github.com/coinbase/rest-hooks/commit/4b04b629e67cce295c82743cb6d3a6d9f99df506))



## [5.0.0](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@4.3.3...@rest-hooks/normalizr@5.0.0) (2020-01-29)


### ⚠ 💥 BREAKING CHANGES

* Remove denormalizeAndTracked

### 💅 Enhancement

* Only export one denormalize ([3f77da2](https://github.com/coinbase/rest-hooks/commit/3f77da206c1e4bc4065b98c8bdcfcfa3693586b7))
* Use minified build for es modules ([a1a760c](https://github.com/coinbase/rest-hooks/commit/a1a760c74f5f389951ec1c827403e02bf5fb2442))


### 🐛 Bug Fix

* **schemas:** don't use schema to attribute mapping on singular array schemas ([a39d3e5](https://github.com/coinbase/rest-hooks/commit/a39d3e5402adfaef4651e0e8efeea0f1587186d5))


### 🏠 Internal

* Upgrade jest to 25 ([#253](https://github.com/coinbase/rest-hooks/issues/253)) ([745a253](https://github.com/coinbase/rest-hooks/commit/745a2532cb1ec3471f1fcb9c90fd87ffb55d6d1a))



### [4.3.3](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@4.3.2...@rest-hooks/normalizr@4.3.3) (2020-01-27)


### 💅 Enhancement

* Keep referential equality in list views ([#251](https://github.com/coinbase/rest-hooks/issues/251)) ([caf2bf7](https://github.com/coinbase/rest-hooks/commit/caf2bf78e6c48af8a32b080291ae60615ad05b34))



### [4.3.2](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@4.3.1...@rest-hooks/normalizr@4.3.2) (2020-01-18)


### 🐛 Bug Fix

* Support extra members of schema that are empty in denormalize ([#244](https://github.com/coinbase/rest-hooks/issues/244)) ([86b1e0a](https://github.com/coinbase/rest-hooks/commit/86b1e0a30b87156f144629df8e24933a7f90ba66))



### [4.3.1](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@4.3.0...@rest-hooks/normalizr@4.3.1) (2020-01-18)


### 🐛 Bug Fix

* Support extra members of schema that are only sometimes empty ([#243](https://github.com/coinbase/rest-hooks/issues/243)) ([74916a3](https://github.com/coinbase/rest-hooks/commit/74916a3f9c5a0e5a9843a6211517dfeff1b86eb6))



## [4.3.0](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@4.2.0...@rest-hooks/normalizr@4.3.0) (2020-01-17)


### 🚀 Features

* Add indexes to Entity for improved performance ([#237](https://github.com/coinbase/rest-hooks/issues/237)) ([a2339f0](https://github.com/coinbase/rest-hooks/commit/a2339f0e61e9446da87af85440061b060ad0f444))



## [4.2.0](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@4.1.1...@rest-hooks/normalizr@4.2.0) (2020-01-06)


### 🚀 Features

* Entity class added to Resource hierarchy ([#226](https://github.com/coinbase/rest-hooks/issues/226)) ([7c4efb7](https://github.com/coinbase/rest-hooks/commit/7c4efb7a55efbffa8a0cab3dab1b39e69535df49))



### [4.1.1](https://github.com/coinbase/rest-hooks/compare/@rest-hooks/normalizr@4.1.0...@rest-hooks/normalizr@4.1.1) (2020-01-05)


### 💅 Enhancement

* Remove extraneous logic - schema is not allowed to be null ([775cc8a](https://github.com/coinbase/rest-hooks/commit/775cc8a47a7d016f3f33766aee83a0154b7385ac))


### 📦 Package

* Build things ([9d386aa](https://github.com/coinbase/rest-hooks/commit/9d386aa1ab944159f5ed4576b81d8d5e5f67847b))


### 🏠 Internal

* Run normalizr typescript tests ([#223](https://github.com/coinbase/rest-hooks/issues/223)) ([17a3f84](https://github.com/coinbase/rest-hooks/commit/17a3f84a390762173843736ad0b2d6a3ef8e031f))



## 4.1.0 (2019-12-31)


### 🚀 Features

* Support string schemas ([#222](https://github.com/coinbase/rest-hooks/issues/222)) ([3f025de](https://github.com/coinbase/rest-hooks/commit/3f025def8de1d949962f99c4411bca86a2e22b1f))


### 🏠 Internal

* **deps:** bump extend in /packages/normalizr/examples/redux ([#218](https://github.com/coinbase/rest-hooks/issues/218)) ([96f31bf](https://github.com/coinbase/rest-hooks/commit/96f31bf78bb218994ce7538a48178fc3a8440354))
* **deps:** bump sshpk in /packages/normalizr/examples/redux ([#217](https://github.com/coinbase/rest-hooks/issues/217)) ([56e4a16](https://github.com/coinbase/rest-hooks/commit/56e4a16bbfb861e3acfdb7ccec353991fb07e2ab))
* **deps:** bump stringstream in /packages/normalizr/examples/redux ([#216](https://github.com/coinbase/rest-hooks/issues/216)) ([f57648a](https://github.com/coinbase/rest-hooks/commit/f57648a3ed77ca4f4592bf655fe40f045b024b77))
* **deps:** bump tar in /packages/normalizr/examples/redux ([#220](https://github.com/coinbase/rest-hooks/issues/220)) ([1575c65](https://github.com/coinbase/rest-hooks/commit/1575c655d9fdc2bc0034095ab935aed47a439d6c))
* **deps:** bump tough-cookie in /packages/normalizr/examples/redux ([#221](https://github.com/coinbase/rest-hooks/issues/221)) ([2088197](https://github.com/coinbase/rest-hooks/commit/20881979e883b96def82948bce3583dc02f3f66b))
* Move normalizr code into repo ([#212](https://github.com/coinbase/rest-hooks/issues/212)) ([7d290f4](https://github.com/coinbase/rest-hooks/commit/7d290f404016073b64b4cddfc723e3591241b358))
