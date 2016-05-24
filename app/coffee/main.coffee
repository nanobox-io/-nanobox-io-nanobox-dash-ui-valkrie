StatsMachine = require 'stats/stats-machine'
GlobMachine  = require 'glob/glob-machine'

class Valkrie

  constructor: (@$el, @params) ->
    @registerForPubSubCalls()
    @globMachine = new GlobMachine(@$el)

  # ------------------------------------ API

  update : () ->
    $.ajax
      url         : @params.updateUrl
      type        : 'GET'
      contentType : "application/json;charset=utf-8"
      error       : (request, error)=> console.log "error fetching data : #{error}"
      success     : (data)=> @refresh data

  # ------------------------------------ Helpers

  refresh : (dataGlob) ->
    @globMachine.update dataGlob

  # UI Events triggered from within valkrie

  registerForPubSubCalls : () ->
    PubSub.subscribe 'SPLITTER.SPLIT'    , (m, data)=> @params.callbacks.onSplitService data
    PubSub.subscribe 'SCALE'             , (m, data)=> @params.callbacks.onScaleHost data
    PubSub.subscribe 'STATS.GET_OPTIONS' , (m, cb)  =>
      console.log "Getting scale options:"
      console.log @
      console.log @params
      console.log @params.scaleOptions
      console.log "-------------------------------"
      cb @params.scaleOptions

window.nanobox ||= {}
nanobox.Valkrie = Valkrie
