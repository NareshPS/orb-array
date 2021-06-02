# orb-array
*orb-array* aims to simplify common array operations that use functional programming constructs. The usage of map, reduce, filter, fill etc. APIs is often verbose. Our goal is to make their usage *less-verbose*

## APIs
### split
It splits an array into specified number of pieces. When the number of pieces is larger than the input size, it creates empty pieces. It always returns the specified number of pieces. Following are some examples:
```js
// Default is splitting from the middle.
const items = [1, 2, 3, 4, 5]
const pieces = split(items)
// Output: [[1, 2, 3], [4, 5]]
```

```js
const items = [1, 2, 3, 4, 5]
const pieces = split(items, 10)
// Output: [[1], [2], [3], [4], [5], [], [], [], [], []]
```

### range
It generates numbers in a given range, starting with 0.
```js
const items = range(5)
// Output: [0, 1, 2, 3, 4]
```

### fill
It generates a range of values using a function.
```js
const items = fill(5, v => v*2) // v is an item index
// Output: [0, 2, 4, 6, 8]
```

### zip
It zips a bunch of arrays together. If the arrays vary in size, the output size is equal to the shortest array.
```js
const items = range(5)
const values = range(10)
const zipped = zip(items, values)
// Output: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]
```
### reduce
*reduce* support several operations.

**reduce.o** reduces an array to an object. It supports customizations using key and value functions. In the absence of customizations, key and value are the input array items.
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

**reduce.mul* multiplies together the elements of the input array. When the input contains a non-numerical value, the output is **NaN**. The boolean values are converted to their numerical form (0 or 1).
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

### map
*map* supports several operations.

**map.scale** uses the input factor to scale elements.
```js
const items = range(5)
const scaled = map.scale(items, 2)
// Output: [0, 2, 4, 6, 8]
```
