export class State {
  constructor(arr) {
    if (arr.length == 0 || arr.length != 9) {
      this.buf = null
    } else {
      this.buf = new Uint8Array(new ArrayBuffer(41))
      for (let i = 0; i < 9; i++) {
        if (arr[i].length != 9) {
          this.buf = null
          break
        }
      }
      if (this.buf != null) {
        for (let i = 0; i < arr.length; i++) {
          let row = arr[i]
          for (let j = 0; j < row.length; j++) {
            this._set_native(i * 9 + j, row[j])
          }
        }
      }
    }
  }

  toString() {
    return this.buf.toString()
  }
  get_array() {
    let demo1_array = new Array()
    for (let i = 0; i < 81; i++) {
      let value = 0
      if (i % 2 == 0) {
        let index = i / 2
        value = this.buf[index] >> 4
      } else {
        let index = (i - 1) / 2
        value = this.buf[index] & 15
      }
      demo1_array.push(value)
    }
    let result = new Array()
    for (let i = 0; i < 9; i++) {
      let arr = new Array()
      for (let j = 0; j < 9; j++) {
        arr.push(demo1_array[i * 9 + j])
      }
      result.push(arr)
    }
    return result
  }

  get(x, y) {
    if (this.buf == null) {
      return -1
    }
    let pos = x * 9 + y
    let index = 0
    if (pos % 2 == 0) {
      index = pos / 2
      return this.buf[index] >> 4
    } else {
      index = (pos - 1) / 2
      return this.buf[index] & 15
    }
  }

  set(x, y, v) {
    if (this.buf == null) {
      return
    }
    this._set_native(x * 9 + y, v)
  }

  _set_native(pos, value) {
    if (this.buf == null) {
      return
    }
    let index = 0;
    if (pos % 2 == 0) {
      index = pos / 2
      let current = this.buf[index]
      let new_value = (current & 15) | (value << 4)
      this.buf.fill(new_value, index, index + 1)
    } else {
      index = (pos - 1) / 2
      let current = this.buf[index]
      let new_value = ((current >> 4) << 4) | value
      this.buf.fill(new_value, index, index + 1)
    }
  }

  _get_number() {
    let arr = new Array()
    for (let i = 0; i < 9; i++) {
      arr.push(i + 1)
    }
    return new Set(arr)
  }

  _get_row_candidate(set, row) {
    for (let i = 0; i < 9; i++) {
      let value = this.get(row, i)
      set.delete(value)
    }
    return set
  }

  _get_col_candidate(set, col) {
    for (let i = 0; i < 9; i++) {
      let value = this.get(i, col)
      set.delete(value)
    }
    return set
  }

  _get_square_candidate(set, x, y) {
    let relative_x = x % 3
    let relative_y = y % 3
    let left_x = x - relative_x
    let left_y = y - relative_y
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        set.delete(this.get(left_x + i, left_y + j))
      }
    }
    return set
  }

  _deep_copy() {
    let s1 = new State(this.get_array())
    return s1
  }

  next() {
    let found = false
    let x = 0
    let y = 0
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.get(i, j) == 0) {
          x = i
          y = j
          found = true
          break
        }
      }
      if (found) {
        break
      }
    }
    if (found) {
      let set = this._get_number()
      set = this._get_row_candidate(set, x)
      set = this._get_col_candidate(set, y)
      set = this._get_square_candidate(set, x, y)
      if (set.size == 0) {
        return null
      } else {
        let result = new Array()
        for (let s of set) {
          let newState = this._deep_copy()
          newState.set(x, y, s)
          result.push(newState)
        }
        return result
      }
    } else {
      return null
    }
  }

  success() {
    for (let i = 0; i < 9; i ++) {
      let s1 = this._get_number()
      let s2 = this._get_number()
      for (let j = 0; j < 9; j++) {
        s1.delete(this.get(i, j))
        s2.delete(this.get(j, i))
      }
      if (s1.size != 0 || s2.size != 0) {
        return false
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let lt_x_relative = i * 3
        let lt_y_relative = j * 3
        let s = this._get_number()
        for (let i1 = 0; i1 < 3; i1++) {
          for (let j1 = 0; j1 < 3; j1++) {
            s.delete(this.get(lt_x_relative + i1, lt_y_relative + j1))
          }
        }
        if (s.size != 0) {
          return false
        }
      }
    }
    return true
  }
}