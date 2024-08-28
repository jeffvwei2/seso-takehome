class Node {
  constructor(value, source){
    this.value = value // log entry
    this.source = source // source index
    this.left = null
    this.right = null
  }
}
  
class BST {
  constructor(){
    this.root = null
  }

  // insert new nodes based on date
  insert(value, source){
    // dont store any empty logs
    if (value == false) {
      return undefined
    }

    const newNode = new Node(value, source)
    if(!this.root){
      this.root = newNode
      return this
    }

    let cur = this.root
    while (cur) {
      if (value.date <= cur.value.date) {
        if (!cur.left) {
          cur.left = newNode
          return this
        }
        cur = cur.left
      } else {
        if (!cur.right){
          cur.right = newNode
          return this
        }
        cur = cur.right
      }
    }
  }

  // Find minimum node, then remove it from tree
  extractMin(){
    let cur = this.root
    let prev = null
    while (cur.left){
      prev = cur
      cur = cur.left
    }
    if (prev) {
      if (cur.right) {
        prev.left = cur.right
      } else {
        prev.left = null
      }
    } else {
      this.root = cur.right
    }
    return cur
  }
}

module.exports = {
  BST,
  Node
}