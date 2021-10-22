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
      let new_value = (((current << 4) >> 4) | (value << 4))
      this.buf.fill(new_value, index, index + 1)
    } else {
      index = (pos - 1) / 2
      let current = this.buf[index]
      let new_value = ((current >> 4) << 4) | value
      this.buf.fill(new_value, index, index + 1)
    }
  }

  _get_set() {
    let arr = new Array(10)
    for (let i = 1; i < arr.length; i++) {
      arr[i] = i
    }
    return new Set(arr)
  }

  _get_row_candidate(set, row) {
    for (let i = 0; i < 9; i++) {
      let value = this.buf.get(row, i)
      if (set.has(value)) {
        set.delete(i)
      }
    }
    return set
  }

  _get_col_candidate(set, col) {
    for (let i = 0; i < 9; i++) {
      let value = this.buf.get(i, col)
      if (set.has(value)) {
        set.delete(i)
      }
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
        set.delete(this.buf.get(left_x + i, left_y + j))
      }
    }
    return set
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
        }
      }
    }
    if (found) {
      let set = this._get_set()
      set = this._get_row_candidate(set, x)
      set = this._get_col_candidate(set, y)
      set = this._get_square_candidate(set, x, y)
      if (set.size == 0) {
        return null
      }
    } else {
      return null
    }
  }
}