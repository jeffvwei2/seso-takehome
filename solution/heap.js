// boilerplate for heap taken from https://javascripttoday.com/blog/heap-data-structure-in-javascript/
class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    getLeftChildIndex(parentIndex) {
      return 2 * parentIndex + 1;
    }
  
    getRightChildIndex(parentIndex) {
      return 2 * parentIndex + 2;
    }
  
    getParentIndex(childIndex) {
      return Math.floor((childIndex - 1) / 2);
    }
  
    hasParent(index) {
      return this.getParentIndex(index) >= 0;
    }
  
    swap(index1, index2) {
      [this.heap[index1], this.heap[index2]] = [
        this.heap[index2],
        this.heap[index1],
      ];
    }
  
    insert(value) {
      if (value.entry == false) {
          return
      } else {
        this.heap.push(value);
        this.heapifyUp();
      }
    }
  
    heapifyUp() {
      let currentIndex = this.heap.length - 1;
      while (
        this.hasParent(currentIndex) &&
        this.heap[currentIndex].entry.date < this.heap[this.getParentIndex(currentIndex)].entry.date
      ) {
        this.swap(currentIndex, this.getParentIndex(currentIndex));
        currentIndex = this.getParentIndex(currentIndex);
      }
    }
  
    removeMin() {
      if (this.heap.length === 0) {
        throw new Error("Heap is empty");
      }
      const minValue = this.heap[0];
      const newmin = this.heap.pop()
      if (this.heap.length) {
        this.heap[0] = newmin
        this.heapifyDown();
      }
      return minValue;
    }
  
    heapifyDown() {
      let currentIndex = 0;
      while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
        let smallerChildIndex = this.getLeftChildIndex(currentIndex);
        if (
          this.getRightChildIndex(currentIndex) < this.heap.length &&
          this.heap[this.getRightChildIndex(currentIndex)].entry.date <
            this.heap[smallerChildIndex].entry.date
        ) {
          smallerChildIndex = this.getRightChildIndex(currentIndex);
        }
  
        if (this.heap[currentIndex].entry.date <= this.heap[smallerChildIndex].entry.date) {
          break;
        } else {
          this.swap(currentIndex, smallerChildIndex);
        }
  
        currentIndex = smallerChildIndex;
      }
    }
  }
  module.exports = { MinHeap}