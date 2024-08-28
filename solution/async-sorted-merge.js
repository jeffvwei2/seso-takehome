"use strict";
const { BST } = require('./bst')
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const Bst = new BST()
  // get intial source entries
  await Promise.all(
    logSources.map(async (source,i) =>  {
      const entry = await source.popAsync()
      Bst.insert(entry, i)
    })
  )

  // extract minimum date, print, then grab next entry from same source
  while(Bst.root){
    const min = Bst.extractMin()
    printer.print(min.value)
    const entry = await logSources[min.source].popAsync()
    Bst.insert(entry, min.source)
  }

  printer.done()
  return console.log("Async sort complete.")
};
