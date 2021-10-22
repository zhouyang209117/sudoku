import {State} from '../state.js'

import assert from 'assert'

describe('State', function() {
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