ValkrieDataShim = require './shims/data-shims'

dataShim = new ValkrieDataShim()

valkrie  = new nanobox.Valkrie( $("body") )
