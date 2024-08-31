"use strict";
const { BST } = require('./bst')
const { MinHeap } = require('./heap')

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // previous BST version:
  // use binary search tree to store first entry from each source
  // const Bst = new BST()
  // for(const [i,source] of logSources.entries()) {
  //   const entry = source.pop()
  //   Bst.insert(entry, i)
  // }

  // // extract minimum date, print, then grab next entry from same source
  // while(Bst.root){
  //   const min = Bst.extractMin()
  //   printer.print(min.value)
  //   Bst.insert(logSources[min.source].pop(), min.source)
  // }

  // updated heap version
  const heap = new MinHeap()
  for(const [i,source] of logSources.entries()) {
    const entry = source.pop()
    heap.insert({entry: entry, source: i})
  }

  while(heap.heap.length){
    const {entry, source} = heap.removeMin()
    printer.print(entry)
    heap.insert({
      entry: logSources[source].pop(),
      source
    })
  }
  
  printer.done()
  return console.log("Sync sort complete.");
};
