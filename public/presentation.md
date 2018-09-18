# Practical TypeScript

## ... how to make better mistakes

---

# TypeScript

is a Microsoft-owned **superset** of Javascript.

---

# Things the compiler catches

---

```typescript
function processEvent(e: Event) {
  if (e instanceof KeyboardEvent) {
    console.log(e.keyCode);
  } else if (e instanceof KeyboardEvent) {
    // ^ typo, meant WheelEvent
    console.log(e.deltaY);
    //          ^^^^^^^^
    // [ts] Property 'deltaY' does not exist on type 'Event'.
  }
}
```

---

```typescript
function fooify(thing: string) {
  return thing.toUpperCase();
}

fooify(undefined);
fooify(null);
```
