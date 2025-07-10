

---

## 🧠 What is the Temporal Dead Zone (TDZ)?

> The **Temporal Dead Zone** is the period between entering a scope and when a variable declared with `let` or `const` is initialized.

During this period, the variable **exists**, but **accessing it will throw a `ReferenceError`**.

---

## 🕒 Timeline Example

```js
function test() {
  console.log(a); // ❌ ReferenceError — TDZ!
  let a = 5;
}
```

### What happens:

1. JS **knows** there's a `let a` because of hoisting (yes, `let` and `const` are hoisted, but not initialized).
    
2. But until the `let a = 5` line runs, `a` is in the **TDZ**.
    
3. So trying to access `a` before initialization causes a `ReferenceError`.
    

---

## ✅ Compare with `var` (which has no TDZ)

```js
function test() {
  console.log(a); // ✅ undefined
  var a = 5;
}
```

- `var` is hoisted and initialized to `undefined`, so you **can access it**, even before its declaration — though it’s not recommended.
    

---

## 🔁 Common TDZ Cases

### 1. Accessing before declaration

```js
{
  console.log(x); // ❌ ReferenceError
  let x = 10;
}
```

### 2. In default parameters (like your earlier example):

```js
let x = 1;
function foo(a = x) {
  let x = 2;
}
foo(); // ❌ ReferenceError — x is in TDZ
```

### 3. In `typeof`

```js
console.log(typeof x); // ❌ ReferenceError
let x = 3;
```

> This is different from `var`, where `typeof x` would return `'undefined'`.

---

## ✅ Summary

|Variable Type|Hoisted|Initialized|TDZ Applies?|Can Access Before Declaration?|
|---|---|---|---|---|
|`var`|✅ Yes|✅ `undefined`|❌ No|✅ Yes|
|`let`|✅ Yes|❌ No|✅ Yes|❌ No (ReferenceError)|
|`const`|✅ Yes|❌ No|✅ Yes|❌ No (ReferenceError)|

---
