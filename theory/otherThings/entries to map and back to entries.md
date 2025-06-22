Great! Converting between an **object** and a **Map** in JavaScript is easy using:

- `Object.entries()` — to turn an object into an array of key-value pairs
    
- `new Map()` — to create a Map from those entries
    
- `Object.fromEntries()` — to convert back from Map to object
    

---

## 🔁 Convert Object → Map

```js
const obj = {
  name: "dullat",
  age: 25,
  isLoggedIn: true
};

const map = new Map(Object.entries(obj));

console.log(map);
```

### 🔸 Output:

A `Map` object with:

```
Map(3) {
  'name' => 'dullat',
  'age' => 25,
  'isLoggedIn' => true
}
```

---

## 🔁 Convert Map → Object

```js
const backToObject = Object.fromEntries(map);

console.log(backToObject);
```

### 🔸 Output:

```js
{
  name: "dullat",
  age: 25,
  isLoggedIn: true
}
```

---

## ✅ Summary Table:

|Conversion|Code|
|---|---|
|Object → Map|`new Map(Object.entries(obj))`|
|Map → Object|`Object.fromEntries(map)`|

This is super handy when you want to use Map-specific features (like ordered keys, any type as a key, or built-in size tracking) but still want to switch back to plain objects.