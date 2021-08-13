# orb-array
*orb-array* exposes concise APIs to manipulate arrays.

# Installation
Browser Installation. The module is exported as *orbarr* global variable.

```html
<script src="https://cdn.jsdelivr.net/npm/orb-array@latest/dist/index.js"></script>
```

Node Installation
```js
npm install orb-array
```

# APIs
## split
It splits an array into the specified number of pieces. When the number of pieces is larger than the input size, it creates empty pieces. It always returns the specified number of pieces. Some examples:
```js
// Midway split is the default behavior.
const items = [1, 2, 3, 4, 5]
const pieces = split(items)
// Output: [[1, 2, 3], [4, 5]]
```

```js
const items = [1, 2, 3, 4, 5]
const pieces = split(items, 10)
// Output: [[1], [2], [3], [4], [5], [], [], [], [], []]
```

## range
It generates numbers in a given range, starting with 0.
```js
const items = range(5)
// Output: [0, 1, 2, 3, 4]
```

## fill
It generates a range of values using a function.
```js
const items = fill(5, v => v*2) // v is an item index
// Output: [0, 2, 4, 6, 8]
```

## zip
It zips arrays together. When the array sizes vary, the output size is equal to the shortest array.
```js
const items = range(5)
const values = range(10)
const zipped = zip(items, values)
// Output: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]
```
## reduce
*reduce* support several operations.

**reduce.o** reduces an array to an object. It supports customizations using the key and the value functions. Without customizations, key and value are the input array items.
```js
const items = range(5)
const o = reduce.o(items)
// Output: {0:0, 1:1, 2:2, 3:3, 4:4}
```
```js
const items = range(5)
const o = reduce.o(items, {value: v => v + 2})
// Output: {0:2, 1:3, 2:4, 3:5, 4:6}
```

**reduce.a** transforms an array. A value function is applied to the original values. A custom container can be used to store the results. Some examples:
```js
// Simple Example
const items = range(5)
const o = reduce.a(items)
// Output: [0, 1, 2, 3, 4]
```

```js
// Using value function and a container
const items = [1, 2, 5, 6]
const vfn = v => 2*v
const container = [20]
const o = reduce.a(items, {value: vfn, container})
// Output: [20, 2, 4, 10, 60]
```

**reduce.mul** multiplies together all the elements of an array. When the input contains a non-numerical value, the output is **NaN**. The boolean values are converted to their numerical form (0 or 1).
```js
const items = [1, 2, 5, 6]
const result = reduce.mul(items)
// Output: 60
```
```js
// It returns 1 for an empty input.
const result = reduce.mul([])
// Output: 1
```

**reduce.rollingmul** performs cumulative multiplication. Follow the following examples:
```
// Rolling Multiplication
const items = [1, 2, 5, 6]
const o = reduce.rollingmul(items)
// Output: [1, 2, 10, 60]
```

**reduce.sum** adds the elements together.
```
// Addition
const items = [1, 2, 3, 4, 6]
const o = reduce.sum(items)
// Output: 16
```

## map
*map* supports several operations.

**map.scale** uses the input factor to scale elements.
```js
const items = range(5)
const scaled = map.scale(items, 2)
// Output: [0, 2, 4, 6, 8]
```

## last
*last* gets the last element from an array without modification.
```js
// Action
const items = ['last-input']
const o = last(items)
// Output: 'last-input'
```

## ranges
*ranges* simplifies nested iterations over the deep arrays. It creates a list of addresses for individual elements. **resolveAddress** API resolves them. Follow the following examples:
```js
// Ranges Demonstration
const o = ranges(2, 3)
// Output: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]]
```
```js
// Access Elements
const deepfruits = [['mango'], ['apple']]
const o = ranges(2, 2)
const fruits = o.map((address) => resolveAddress(deepfruits, address)
// Output: ['mango', 'apple']
```

## resolveAddress
*resolveAddress* resolves the ordered indices in a nested array or the ordered keys in a nested object. The order must follow the parent-child relationship.
```js
// Array Example
const deepfruits = [['mango'], ['apple']]
const o = resolveAddress(deepfruits, [1, 0])
// Output: 'apple'
```
```js
// Object Example
const fruits = {
  tropical: {
    summer: ['mango', 'orange']
  },
  wild: {
    names: ['berries']
  }
}
const o = resolveAddress(fruits, ['wild', 'names'])
// Output: ['berries]
```

## repeat
*repeat* repeats an object. The repeat count is configurable.
```js
// Basic Example
const input = {tree: 'tonmayi'}
const o = repeat(input, 2)
// Output: [{tree: 'tonmayi'}, {tree: 'tonmayi'}, {tree: 'tonmayi'}]
```
