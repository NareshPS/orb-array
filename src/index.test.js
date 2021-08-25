const test = require('ava')
const functions = require('orb-functions')
const { split, range, fill, zip, reduce, map, ranges, last, resolveAddress, repeat } = require('./index.js')

/////////////////////////// map.scale [start] /////////////////////////
test('map.scale-no-args', t => {
  const o = map.scale()

  t.deepEqual(o, [])
})

test('map.scale-empty-items', t => {
  const o = map.scale([])

  t.deepEqual(o, [])
})

test('map.scale-list-no-scaling-factor', t => {
  const items = [1, 2, 5, 6]
  const o = map.scale(items)

  t.deepEqual(o, items)
})

test('map.scale-list-with-scaling-factor', t => {
  const items = [1, 2, 5, 6]
  const o = map.scale(items, 2)

  t.deepEqual(o, [2, 4, 10, 12])
})
/////////////////////////// map.scale [end] ///////////////////////////

/////////////////////////// map.a [start] ///////////////////////////
test('map.a-no-args', t => {
  const o = map.a()

  t.deepEqual(o, [])
})

test('map.a-with-items', t => {
  const items = [1, 2, 5, 6]
  const o = map.a(items)

  t.deepEqual(o, items)
})

test('map.a-with-items-and-valuefn', t => {
  const items = [1, 2, 5, 6]
  const vfn = v => 2*v
  const o = map.a(items, {value: vfn})

  t.deepEqual(o, map.scale(items, 2))
})

test('map.a-with-items-and-valuefn-and-container', t => {
  const items = [1, 2, 5, 6]
  const vfn = v => 2*v
  const container = [20]
  const o = map.a(items, {value: vfn, container})

  t.deepEqual(container, [20, ...map.scale(items, 2)])
  t.deepEqual(o, container)
})
/////////////////////////// map.a [end] ///////////////////////////

/////////////////////////// reduce.mul [start] /////////////////////////
test('reduce.mul-no-args', t => {
  const o = reduce.mul()

  t.is(o, 1)
})

test('reduce.mul-empty-items', t => {
  const o = reduce.mul([])

  t.is(o, 1)
})

test('reduce.mul-list', t => {
  const items = [1, 2, 5, 6]
  const o = reduce.mul(items)

  t.is(o, 60)
})

test('reduce.mul-list-with-some-strings', t => {
  const items = [1, 2, "hello", 6]
  const o = reduce.mul(items)

  t.truthy(Number.isNaN(o))
})

test('reduce.mul-list-with-some-boolean', t => {
  const items = [1, 2, 3, true]
  const o = reduce.mul(items)

  t.is(o, 6)
})
/////////////////////////// reduce.mul [end] /////////////////////////

/////////////////////////// reduce.o [start] /////////////////////////
test('reduce.o-no-args', t => {
  const o = reduce.o()

  t.deepEqual(o, {})
})

test('reduce.o-empty-items', t => {
  const o = reduce.o([])

  t.deepEqual(o, {})
})

test('reduce.o-list', t => {
  const items = [1, 2, 5, 6]
  const o = reduce.o(items)

  t.deepEqual(o, {1:1, 2:2, 5:5, 6:6})
})

test('reduce.o-list-with-keyfn-and-valuefn', t => {
  const items = [1, 2, 5, 6]
  const o = reduce.o(items, {key: k => k**2, value: v => v + 2})

  t.deepEqual(o, {1:3, 4:4, 25:7, 36:8})
})

test('reduce.o-list-with-keyfn-and-valuefn-using-indices', t => {
  const items = [1, 2, 5, 6]
  const o = reduce.o(items, {key: (k, i) => k*i, value: (v, i) => v+i})

  t.deepEqual(o, {0:1, 2:3, 10:7, 18:9})
})
/////////////////////////// reduce.o [end] ///////////////////////////

/////////////////////////// reduce.rollingmul [start] ///////////////////////////
test('reduce.rollingmul-no-args', t => {
  const o = reduce.rollingmul()

  t.deepEqual(o, [])
})

test('reduce.rollingmul-with-items', t => {
  const items = [1, 2, 5, 6]
  const o = reduce.rollingmul(items)

  t.deepEqual(o, [1, 2, 10, 60])
})
/////////////////////////// reduce.rollingmul [end] ///////////////////////////

/////////////////////////// reduce.sum [start] ///////////////////////////
test('reduce.sum-no-args', t => {
  const o = reduce.sum()

  t.is(o, 0)
})

test('reduce.sum-with-items', t => {
  const items = [1, 2, 3, 4, 6]
  const o = reduce.sum(items)

  t.is(o, 16)
})
/////////////////////////// reduce.sum [end] ///////////////////////////

/////////////////////////// zip [start] ///////////////////////////
test('zip-no-args', t => {
  const zipped = zip()

  t.is(zipped.length, 0)
})

test('zip-one-arg', t => {
  const zipped = zip(range(5))

  t.is(zipped.length, 5)
  zipped.forEach((v, index) => {
    t.deepEqual(v, [index])
  })
})

test('zip-two-unequal-args', t => {
  const zipped = zip(range(5), range(3))

  t.is(zipped.length, 3)
  zipped.forEach((v, index) => {
    t.deepEqual(v, [index, index])
  })
})
/////////////////////////// zip [end] ///////////////////////////

/////////////////////////// fill [start] ///////////////////////////
test('fill-no-args', t => {
  const filled = fill()

  t.is(filled.length, 0)
})

test('fill-with-size-no-fill-value', t => {
  const size = 5
  const filled = fill(size)

  t.is(filled.length, size)
  t.deepEqual(filled, range(size))
})

test('fill-with-size-undef-function', t => {
  const size = 5
  const filled = fill(size, _ => undefined)

  t.is(filled.length, size)
  t.deepEqual(filled, [undefined, undefined, undefined, undefined, undefined])
})

test('fill-with-size-and-fill-value', t => {
  const size = 5
  const filled = fill(size, 13)

  t.is(filled.length, size)
  t.deepEqual(filled, [13, 13, 13, 13, 13])
})

test('fill-with-size-and-fill-function', t => {
  const size = 5
  const func = (v) => v**2
  const filled = fill(size, func)

  t.is(filled.length, size)
  t.deepEqual(filled, range(size).map(func))
})
/////////////////////////// fill [end] ///////////////////////////

/////////////////////////// range [start] ///////////////////////////
test('range-no-args', t => {
  const sequence = range()

  t.is(sequence.length, 0)
})

test('range-with-arg', t => {
  const n = 5
  const sequence = range(n)
  const anchor = [0, 1, 2, 3, 4]

  t.is(sequence.length, n)
  t.deepEqual(sequence, anchor)
})

test('range-with-negative-arg', t => {
  const sequence = range(-5)

  t.is(sequence.length, 0)
})
/////////////////////////// range [end] ///////////////////////////

/////////////////////////// split [start] ///////////////////////////
test('split-no-args', t => {
  const pieces = split()

  t.is(pieces.length, 2)
  pieces.forEach((p) => {
    t.is(p.length, 0)
  })
})

test('split-empty-array-n-ways-split', t => {
  const ways = 5
  const pieces = split([], ways)

  t.is(pieces.length, ways)
  pieces.forEach((p) => {
    t.is(p.length, 0)
  })
})

test('split-more-ways-than-input-length', t => {
  const input = range(10)
  const ways = input.length + 5
  const pieces = split(input, ways)

  // Assert output shape
  t.is(pieces.length, ways)

  // TODO: Come up with a creative slice without creating a copy.
  // Assert output contents
  pieces.slice(0, 10).forEach((p, index) => {
    t.is(p.length, 1)
    t.deepEqual(p, [index])
  })

  pieces.slice(10).forEach((p) => {
    t.is(p.length, 0)
  })
})

test('split-default-split', t => {
  const input = range(10)
  const pieces = split(input)

  // Assert output shape
  t.is(pieces.length, 2)

  // Assert output contents
  pieces.forEach((p, index) => {
    t.is(p.length, 5)

    const start = 5*index
    t.deepEqual(p, input.slice(start, start + 5))
  })
})

test('split-each-one-gets-some', t => {
  const input = range(10)
  const ways = 3
  const pieces = split(input, 3)
  const pieceLengths = [4, 4, 2]
  const pieceStarts = [0, 4, 8]

  // Assert output shape
  t.is(pieces.length, ways)

  // Assert output contents
  pieces.forEach((p, index) => {
    const [start, length] = [pieceStarts[index], pieceLengths[index]]

    t.is(p.length, length)
    t.deepEqual(p, input.slice(start, start + length))
  })
})
/////////////////////////// split [end] ///////////////////////////

/////////////////////////// ranges [start] ///////////////////////////
test('ranges-no-args', t => {
  const o = ranges()

  t.deepEqual(o, [])
})

test('ranges-with-single-size', t => {
  const o = ranges(4)

  t.deepEqual(o, [[0], [1], [2], [3]])
})

test('ranges-with-multiple-size', t => {
  const o = ranges(2, 3)

  t.deepEqual(o, [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]])
})
/////////////////////////// ranges [end] ///////////////////////////

/////////////////////////// last [start] ///////////////////////////
test('last-no-args', t => {
  const o = last()

  t.is(o, undefined)
})

test('last-with-single-input', t => {
  const input = 'last-input'
  const o = last(input)

  t.is(o, input)
})

test('last-with-single-item', t => {
  const items = ['last-input']
  const o = last(items)

  t.is(o, 'last-input')
})

test('last-with-multiple-items', t => {
  const items = ['last-input0', 'last-input1', 'last-input2']
  const o = last(items)

  t.is(o, 'last-input2')
})
/////////////////////////// last [end] ///////////////////////////

/////////////////////////// resolveAddress [start] ///////////////////////////
test('resolveAddress-no-args', t => {
  const o = resolveAddress()

  t.deepEqual(o, [])
})

test('resolveAddress-with-value', t => {
  const value = ['address0']
  const o = resolveAddress(value)

  t.deepEqual(o, value)
})

test('resolveAddress-with-1d-address', t => {
  const value = ['address0', 'address1']
  const o = resolveAddress(value, [1])

  t.deepEqual(o, 'address1')
})

test('resolveAddress-with-2d-address', t => {
  const value = [['address00'], ['address10', 'address11'], 'address20']
  const o = resolveAddress(value, [1, 1])

  t.deepEqual(o, 'address11')
})
/////////////////////////// resolveAddress [end] ///////////////////////////

/////////////////////////// repeat [start] ///////////////////////////
test('repeat-no-args', t => {
  const o = repeat()

  t.deepEqual(o, [undefined, undefined])
})

test('repeat-with-object', t => {
  const input = {tree: 'tonmayi'}
  const o = repeat(input)

  t.deepEqual(o, [input, input])
})

test('repeat-with-object-and-count', t => {
  const input = {tree: 'tonmayi'}
  const o = repeat(input, 5)

  t.deepEqual(o, fill(6, functions.constant(input)))
})
/////////////////////////// repeat [end] ///////////////////////////