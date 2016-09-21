Updater = require 'glob/updater'

module.exports = class GenerationUpdater extends Updater

  constructor: (getBox, @getParentHostOfComponent) ->
    super getBox

  updateGenerations : (componentId, @componentUri, oldGenerations, newGenerations, @host) ->
    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newGenerations, oldGenerations, @updateExistingGeneration

    for newGeneration in nonMatchedNew
      @getParentHostOfComponent(@componentUri).addGeneration componentId, newGeneration
      @host.updateMiniIcons()

    # Old generations that should be destroyed
    for oldGeneration in nonMatchedOld
      @getParentHostOfComponent(@componentUri).removeGeneration oldGeneration.id
      @host.updateMiniIcons()

  updateExistingGeneration : (newGeneration, oldGeneration) =>
    @updateState "#{@componentUri}/#{newGeneration.id}", oldGeneration.state, newGeneration.state
    @host.updateMiniIcons()
