Updater = require 'glob/updater'

module.exports = class GenerationUpdater extends Updater

  constructor: (getBox, @getParentHostOfComponent) ->
    super getBox

  updateGenerations : (componentId, oldGenerations, newGenerations) ->
    # Called with every generation found to exist in both the
    # oldGenerations array and newGenerations array
    cb = (newGeneration, oldGeneration)=>
      @updateGeneration oldGeneration, newGeneration

    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newGenerations, oldGenerations, cb

    # Brand new generations
    for newGeneration in nonMatchedNew
      @getParentHostOfComponent(componentId).addGeneration componentId, newGeneration

    # Old generations that should be destroyed
    for newGeneration in nonMatchedNew
      'do nothing yet'
      # Need to destroy this component somehow.. Should I set its state to archived? or add
      # a destroy component method?. I'm leaning towards the latter.





  updateGeneration : (oldGeneration, newGeneration) ->
    @updateState newGeneration.id, oldGeneration.state, newGeneration.state
