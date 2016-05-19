Updater = require 'glob/updater'

module.exports = class AppComponentUpdater extends Updater

  constructor: (getBox, @getParentHostOfComponent, @generationUpdater) ->
    super getBox

  updateComponents : (hostId, oldComponents, newComponents)->
    # Called with every component found to exist in both the
    # oldComponents array and new Components array
    cb = (newComponent, oldComponent)=>
      @updateComponent newComponent.id, oldComponent, newComponent

    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newComponents, oldComponents, cb

    # Brand new components
    for newComponent in nonMatchedNew
      @getBox(hostId).addComponent newComponent

    # Old components that should be destroyed
    for oldComponent in nonMatchedOld
      @getBox(hostId).removeComponent oldComponent.id

      # Need to destroy this component somehow.. Should I set its state to archived? or add
      # a destroy component method?. I'm leaning towards the latter.

  updateComponent : (componentId, oldComponent, newComponent) ->
    @generationUpdater.updateGenerations componentId, oldComponent.generations, newComponent.generations

    # @updateState newComponent.id, oldComponent.state, newComponent.state
