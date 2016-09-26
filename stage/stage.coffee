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

  dontLoadStats = false
  window.valkrie  = new nanobox.Valkrie $("body"), params, dontLoadStats
  window.dataShim.initUI()
