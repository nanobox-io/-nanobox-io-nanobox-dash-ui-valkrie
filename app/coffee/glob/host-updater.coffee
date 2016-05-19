Updater = require 'glob/updater'

module.exports = class HostUpdater extends Updater

  constructor: (getBox, @appComponentUpdater) ->
    super(getBox)

  update : (host, oldData, newData) ->
    @updateState newData.id, oldData.state, newData.state
    @appComponentUpdater.updateComponents newData.id, oldData.appComponents, newData.appComponents

    host.data     = newData # What I probably should do i
    host.box.data = newData
