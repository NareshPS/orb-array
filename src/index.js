const { self, constant } = require("orb-functions")

const get = a => a || []

const split = (o = [], ways = 2) => {
  const chunk = Math.ceil(o.length / ways)

  return range(ways).map((v) => {
    return o.slice(v*chunk, (v+1)*chunk)
  })
}

const range = (n = 0) => new Array(n < 0? 0: n).fill(0).map((_, index) => index)
const fill = (n, fn = self) => range(n).map((v) => (typeof fn === "function"? fn(v): fn))
const zip = (...arrays) => {
  arrays = get(arrays)
  // Output length is the smallest of all input lengths
  const n = arrays.length > 0? Math.min(...arrays.map((a) => get(a).length)): 0

  return range(n).map((index) => arrays.map((a) => a[index]))
}

const reduce = {
  o: (items = [], {key: kfn = self, value: vfn = self} = {}) =>
  items.reduce((c /** container */, v, index) => (c[kfn(v, index)] = vfn(v, index), c), {}),

  mul: (items = []) => items.reduce((v, vi) => v*vi, 1),
  rollingmul: ([first, ...rest] = []) => rest.reduce(
    (container, item) => (
      container.push(item*last(container)),
      container
    ),
    first? [first]: []
  ),
  sum: (items = []) => items.reduce((v, vi) => v+vi, 0)
}

const map = {
  a: (items = [], {value: vfn = self, container = []} = {}) =>
  items.reduce((c /** container */, v, index) => (c.push(vfn(v, index)), c), container),

  scale: (items = [], factor = 1) => items.map((item) => item*factor),
}

const ranges = (...ns /** range sizes */) => {
  const cs = reduce.rollingmul(ns.reverse()).reverse() // range container sizes in decreasing order
  const nes = cs.shift() // total number of elements.
  const addressFn = (index) => cs.reduce(
    ([rs /**remaining size */, address], csi) => {
      return [rs%csi, (address.push(Math.floor(rs/csi)), address)]
    },
    [index, []]
  )

  cs.push(1) // Deepest container size
  return range(nes).map((index) => addressFn(index)[1])
}

const last = (array = []) => !(array instanceof Array)? array: array[array.length - 1]

/**
 * It resolves an address in an Array/Object
 * 
 * @param {Array} value 
 * @param {Array} address 
 * @returns 
 */
const resolveAddress = (value = [], address = []) => address.reduce((v, ai) => v[ai], value)

/**
 * Repeats the input object {count} times. 
 * 
 * @param {Object} o 
 * @param {number} count
 * @returns 
 */
 const repeat = (o, count = 1) => fill(count + 1, constant(o))

module.exports = {
  split,
  range,
  reduce,
  map,
  fill,
  zip,
  last,
  ranges,
  resolveAddress,
  repeat
}