# This should be a H1 on the first slide

---

* This
* should
* be
  * a
  * list

---

## Slide 3

### It works

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