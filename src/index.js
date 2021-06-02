const { self } = require("orb-functions")

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

  mul: (items = []) => items.reduce((v, vi) => v*vi, 1)
}

const map = {
  scale: (items = [], factor = 1) => items.map((item) => item*factor)
}

module.exports = {split, range, reduce, map, fill, zip}