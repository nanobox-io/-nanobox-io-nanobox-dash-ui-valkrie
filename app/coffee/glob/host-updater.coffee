Updater = require 'glob/updater'

module.exports = class HostUpdater extends Updater

  constructor: (getBox, @appComponentUpdater, @$el) ->
    @hosts    = {}
    super(getBox)

  updateHosts : (newHosts) ->
    # Place all the previous host's data into an array
    oldHosts = []
    oldHosts.push host.data for key, host of @hosts

    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newHosts, oldHosts, @updateExistingHost

    for newHostData in nonMatchedNew
      @createNewHost newHostData

    for oldHostData in nonMatchedOld
      @destroyOldHost oldHostData

  updateExistingHost : (newHostData, oldHostData)=>
    host = @hosts[ newHostData.id ].entity

    @updateState newHostData.id, oldHostData.state, newHostData.state
    @appComponentUpdater.updateComponents host.box, oldHostData.appComponents, newHostData.appComponents

    host.data     = newHostData
    host.box.data = newHostData
    @hosts[newHostData.id] = {data:newHostData, entity:host}


  createNewHost : (newHostData) ->
    entity = new nanobox.ClobberBox()
    entity.build @$el, nanobox.ClobberBox.HOST, newHostData
    @hosts[newHostData.id] = {data:newHostData, entity:entity}

  destroyOldHost : (oldHostData) ->
    @hosts[oldHostData.id].entity.destroy()
    delete @hosts[oldHostData.id]
