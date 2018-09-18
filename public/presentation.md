# Practical TypeScript

## ... how to make better mistakes

---

# TypeScript

is a Microsoft-owned **superset** of Javascript.

---

### Reasons I like TypeScript:

# The compiler is smarter than me

---

```typescript
// using strict null checking...

function fooify(thing: string) {
  return thing.toUpperCase();
}

fooify(undefined);
//     ^^^^^^^^^
// [ts] Argument of type 'undefined' is not assignable
//      to parameter of type 'string'.
```

Can't pass an undefined to a string parameter.

---

```typescript
const stringOrFalse = (returnString: boolean) =>
  (returnString) ? "hi" : false;

const fooify = (thing: string) => thing.toUpperCase();
const value = stringOrFalse(true);

fooify(value);
//     ^^^^^
// [ts] Argument of type 'false | "hi"' is not
//      assignable to parameter of type 'string'.
// Type 'false' is not assignable to type 'string'.
```

Value could be `false`.

---

```typescript
const stringOrFalse = (returnString: boolean) =>
  (returnString) ? "hi" : false;

const fooify = (thing: string) => thing.toUpperCase();
const value = stringOrFalse(true);

if (value) {
  // value can't be 'false', so no error
  fooify(value);
}
```

Compiler is smart enough to find conditions that narrow a value.

---

```typescript
type Eel = string | 7;
type SwallowType = 'African' | 'European';

enum FavouriteColour {
  blue = '#0000ff',
  yellow = '#ffff00',
}

interface IHovercraft {
  contents: Eel[],
}
```

Most types are very flexible.

---

```typescript
interface IUser {
  name: string,
  isAdmin: boolean,
}

const addUser = (user: IUser) => true;

addUser({name: 'Jesse Doe', isAdmin: true});
```

Most types are picked up without needing to annotate them.

---

```typescript
addUser({name: 'Alex Nguyen'});
//      ^^^^^^^^^^^^^^^^^^^^^
// [ts] Argument of type '{ name: string; }' is not
//      assignable to parameter of type 'User'.
// Property 'isAdmin' is missing in type
//      '{ name: string; }'.
```

Error messages tell you why the type doesn't work here.

---

```typescript
interface IFeatureFlagList { [k: string]: boolean };

const makeFlagTester = (flags: IFeatureFlagList) =>
  (flag: keyof IFeatureFlagList) =>
    flags[flag];

const testFlag = makeFlagTester({
  hasBakedBeans: false,
  // error due to value
  invasiveTracking: 'always!',
  // error due to key
  true: false,
});
```

---

```typescript
interface IFeatureFlagList { [k: string]: boolean };

const makeFlagTester = (flags: IFeatureFlagList) =>
  (flag: keyof IFeatureFlagList) =>
    flags[flag];

const testFlag = makeFlagTester({});
// error: true can never be a key of
//        IFeatureFlagList
testFlag(true);
// error: boolean doesn't have `toUpperCase`
testFlag('gamification').toUpperCase();
```

---

### Reasons I (sorta) like TypeScript:

# It's still JavaScript

---

![Unfortunately, you often still have to wait for JavaScript features to be, at least, syntax complete.](./img/waiting-for-js-features.png)

---

![You can change at your own page, whether that's one piece at a time, new things only, all at once.](./img/gradual-conversion.png)

---

migrating using jscheck etc.