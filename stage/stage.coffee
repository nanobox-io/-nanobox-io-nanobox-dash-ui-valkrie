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

  window.valkrie  = new nanobox.Valkrie( $("body"), params )


  # For local testing, just call an immediate refresh
  # Instead of AJAXing from a data endpoint
  # console.log dataShim.getApp()
  valkrie.refresh dataShim.getApp()
