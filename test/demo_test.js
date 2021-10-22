import {State} from '../state.js';
import assert from 'assert'

describe('demo', function() {
  describe('init()', function() {
    it('', function() {
      let state_buf = new Array()
      let a = new Uint8Array(new ArrayBuffer(41))
    })
  })
})

describe('BufferEqual', function() {
  describe('init()', function() {
    it('', function() {
      let a = new Uint8Array(new ArrayBuffer(2))
      let b = new Uint8Array(new ArrayBuffer(2))
      a.fill(1, 0, 1)
      a.fill(2, 1, 2)
      b.fill(1, 0, 1)
      b.fill(2, 1, 2)
      assert.equal(true, a.toString() == b.toString())

      let a1 = new Uint8Array(new ArrayBuffer(2))
      let b1 = new Uint8Array(new ArrayBuffer(2))
      a1.fill(2, 0, 1)
      a1.fill(2, 1, 2)
      b1.fill(1, 0, 1)
      b1.fill(2, 1, 2)
      assert.equal(false, a1.toString() == b1.toString())
    })
  })
})