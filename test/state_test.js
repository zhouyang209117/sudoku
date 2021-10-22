import {State} from '../state.js'

import assert from 'assert'

describe('StateInit', function() {
  describe('init()', function() {
    it('', function() {
      let state_buf = new Array()
      for (let i = 0; i < 9; i++) {
        let buf = new Array()
        for (let j = 1; j < 10; j++) {
          buf.push(j)
        }
        state_buf.push(buf)
      }
      let state = new State(state_buf)
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          assert.equal(state.get(i, j), j + 1)
        }
      }
    })
  })
})

describe('StateDeepCopy', function() {
  describe('init()', function() {
    it('', function() {
      let state_buf = new Array()
      for (let i = 0; i < 9; i++) {
        let buf = new Array()
        for (let j = 1; j < 10; j++) {
          buf.push(j)
        }
        state_buf.push(buf)
      }
      let state = new State(state_buf)
      let s1 = state._deep_copy()
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          assert.equal(state.get(i, j), s1.get(i, j))
        }
      }
    })
  })
})


describe('StateNext', function() {
  describe('init()', function() {
    it('', function() {
      let state_buf = new Array()
      for (let i = 0; i < 9; i++) {
        let buf = new Array()
        for (let j = 1; j < 10; j++) {
          buf.push(0)
        }
        state_buf.push(buf)
      }
      let state = new State(state_buf)
      state.set(0, 0, 1)
      state.set(0, 1, 2)
      state.set(0, 2, 3)
      state.set(0, 3, 4)
      state.set(0, 4, 5)
      state.set(0, 5, 6)
      state.set(0, 6, 7)
      state.set(0, 7, 8)
      let a = state.next()
      assert.equal(a.length, 1)
    })
  })
})