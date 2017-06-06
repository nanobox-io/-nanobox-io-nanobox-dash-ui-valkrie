ValkrieDataShim = require './shims/data-shims'
window.dataShim = new ValkrieDataShim()
# statsDataSimultor.createFakeStatDataProvider()

window.valkrieTesterInit = ()->
  params =
    scaleOptions : scaleMachineTestData.getHostOptions()
    updateUrl    : "htpp://nanobox.io/apps/3in0vsia0an3"
    callbacks    :
      onScaleHost : (data)->
        console.log 'scale host ::'
        console.log data

      onSplitService : (data)->
        console.log 'split service new scale ID ::'
        console.log data

      onHostAction : (hostId, action, cb)->
        console.log "run `#{action}` on host : `#{hostId}`"
        setTimeout cb, 2000 * Math.random()

      onComponentAction : (componentId, action, cb)->
        console.log "run `#{action}` on component : `#{componentId}`"
        setTimeout cb, 2000 * Math.random()
        
  dontLoadStats = false
  window.valkrie  = new nanobox.Valkrie $("body"), params, dontLoadStats
  window.dataShim.initUI()
