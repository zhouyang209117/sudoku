import {State} from './state.js';

export class Sudoku {
  constructor(arr) {
    this.start = new State(arr)
  }

  get_result() {
    let queue = new Array()
    queue.push(this.start)
    let visited = new Set()
    let finish = null
    while (queue.length != 0) {
      let first = queue.shift()
      if (first.success()) {
        finish = first
        break
      } else {
        let nextList = first.next()
        for (let a of nextList) {
          if (!visited.has(a.toString())) {
            visited.add(a.toString())
            queue.push(a)
          }
        }
      }
    }
    if (finish != null) {
      return finish.get_array()
    } else {
      return null
    }
  }
}