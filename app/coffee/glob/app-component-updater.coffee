Updater = require 'glob/updater'

module.exports = class AppComponentUpdater extends Updater

  constructor: (getBox, @getParentHostOfComponent, @generationUpdater) ->
    super getBox

  updateComponents : (host, oldComponents, newComponents)->
    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newComponents, oldComponents, @updateComponent, 'uri'

    # Brand new components
    for newComponent in nonMatchedNew
      host.addComponent newComponent

    # Old components that should be destroyed
    for oldComponent in nonMatchedOld
      host.removeComponent oldComponent.id

  updateComponent : (newComponent, oldComponent) =>
    @generationUpdater.updateGenerations newComponent.id, newComponent.uri, oldComponent.generations, newComponent.generations
    # @updateState newComponent.id, oldComponent.state, newComponent.state
