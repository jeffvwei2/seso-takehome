"use strict";
const { MinHeap } = require('./heap')
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const heap = new MinHeap()
  const queue = new Array(logSources.length).fill([])

  // helper function
  async function getNext(source) {
    const newentry = await logSources[source].popAsync()
    heap.insert({
      entry: newentry,
      source
    })
    // if not drained, queue up next value
    if (newentry) {
      queue[source] = [getNext(source)]
    }
  }

  await Promise.all(logSources.map((source,i) => getNext(i)))

  while(heap.heap.length){
    // print minimum
    const {entry, source} = heap.removeMin()
    printer.print(entry)
    // resolve next value of source
    await Promise.all(queue[source])
  }
  printer.done()
  return console.log("Async sort complete.")
};
