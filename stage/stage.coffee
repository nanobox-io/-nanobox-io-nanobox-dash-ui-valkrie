ValkrieDataShim = require './shims/data-shims'

window.dataShim = new ValkrieDataShim()
window.valkrie  = new nanobox.Valkrie( $("body") )

statsDataSimultor.createFakeStatDataProvider()

valkrie.update dataShim.getApp()
