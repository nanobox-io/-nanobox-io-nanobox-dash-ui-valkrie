module.exports = class Updater

  constructor: (@getBox) ->

  updateState : (id, oldState, newState) ->
    if oldState != newState
      @getBox(id)?.setState newState

  # This method examines two arrays that should have items with the same ids
  # We look for items in either list that do not have a partner in the opposite list.
  # non paired items are returned
  # items with a match are passed into the `matchCb` method
  getNonPairedItems : (newStack, oldStack, matchCb) ->
    nonPairedNewItems = []
    nonPairedOldItems = []
    for newItem in newStack
      matchFound = false
      for oldItem in oldStack
        if newItem.id == oldItem.id
          matchFound = true
          matchCb newItem, oldItem
      if !matchFound
        nonPairedNewItems.push newItem

    for oldItem in oldStack
      matchFound = false
      for newItem in newStack
        if newItem.id == oldItem.id
          matchFound = true
      if !matchFound
        nonPairedOldItems.push oldItem

    return [nonPairedNewItems, nonPairedOldItems]
