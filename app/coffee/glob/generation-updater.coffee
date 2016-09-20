Updater = require 'glob/updater'

module.exports = class GenerationUpdater extends Updater

  constructor: (getBox, @getParentHostOfComponent) ->
    super getBox

  updateGenerations : (componentId, @componentUri, oldGenerations, newGenerations) ->
    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newGenerations, oldGenerations, @updateExistingGeneration

    for newGeneration in nonMatchedNew
      @getParentHostOfComponent(@componentUri).addGeneration componentId, newGeneration

    # Old generations that should be destroyed
    for oldGeneration in nonMatchedOld
      @getParentHostOfComponent(@componentUri).removeGeneration oldGeneration.id

  updateExistingGeneration : (newGeneration, oldGeneration) =>
    @updateState "#{@componentUri}/#{newGeneration.id}", oldGeneration.state, newGeneration.state
