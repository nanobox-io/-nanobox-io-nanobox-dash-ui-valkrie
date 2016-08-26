StatsMachine = require 'stats/stats-machine'
GlobMachine  = require 'glob/glob-machine'

class Valkrie

  constructor: (@$el, @params) ->
    @statsMachine = new StatsMachine()
    $boxes = $ '<div class="boxes" />'
    @$el.append $boxes
    @registerForPubSubCalls()
    @globMachine = new GlobMachine $boxes

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
    @statsMachine.setAppInfo dataGlob.appId, dataGlob.xAuthToken
    @globMachine.update dataGlob

  # UI Events triggered from within valkrie

  registerForPubSubCalls : () ->
    PubSub.subscribe 'SPLIT.SAVE'        , (m, data)=> @params.callbacks.onSplitService data
    PubSub.subscribe 'SCALE.SAVE'        , (m, data)=> @params.callbacks.onScaleHost data
    PubSub.subscribe 'SCALE.GET_OPTIONS' , (m, cb)  => cb @params.scaleOptions

window.nanobox ||= {}
nanobox.Valkrie = Valkrie
