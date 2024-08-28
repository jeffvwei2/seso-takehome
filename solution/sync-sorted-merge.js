"use strict";
const { BST } = require('./bst')

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // use binary search tree to store first entry from each source
  const Bst = new BST()
  for(const [i,source] of logSources.entries()) {
    const entry = source.pop()
    Bst.insert(entry, i)
  }

  // extract minimum date, print, then grab next entry from same source
  while(Bst.root){
    const min = Bst.extractMin()
    printer.print(min.value)
    Bst.insert(logSources[min.source].pop(), min.source)
  }

  printer.done()
  return console.log("Sync sort complete.");
};
