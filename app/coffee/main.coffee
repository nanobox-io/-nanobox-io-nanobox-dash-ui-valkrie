StatsMachine = require 'stats/stats-machine'
GlobMachine  = require 'glob/glob-machine'

class Valkrie

  constructor: (@$el, @params, isTesting=false) ->
    @statsMachine = new StatsMachine(isTesting)
    $boxes = $ '<div class="boxes" />'
    @$el.append $boxes
    @registerForPubSubCalls()
    @globMachine = new GlobMachine $boxes

  # ------------------------------------ API

  update : (glob) ->
    if !glob?
      $.ajax
        url         : @params.updateUrl
        type        : 'GET'
        contentType : "application/json;charset=utf-8"
        error       : (request, error)=> console.log "error fetching data : #{error}"
        success     : (data)=> @refresh data
    else
      @refresh glob

  # ------------------------------------ Helpers

  refresh : (dataGlob) ->
    @statsMachine.setAppInfo dataGlob.appId, dataGlob.xAuthToken, dataGlob.proxy
    @globMachine.update dataGlob

  # UI Events triggered from within valkrie

  registerForPubSubCalls : () ->
    PubSub.subscribe 'SPLIT.SAVE'           , (m, data)=> @params.callbacks.onSplitService data
    PubSub.subscribe 'SCALE.SAVE'           , (m, data)=> @params.callbacks.onScaleHost data
    PubSub.subscribe 'HOST.RUN-ACTION'      , (m, data)=> @params.callbacks.onHostAction      data.hostId, data.action, data.onComplete
    PubSub.subscribe 'COMPONENT.RUN-ACTION' , (m, data)=> @params.callbacks.onComponentAction data.componentId, data.action, data.onComplete
    PubSub.subscribe 'GET_BUNKHOUSES'       , (m, data)=> data.cb @globMachine.getBunkhouses(data.id)
    PubSub.subscribe 'SCALE.GET_OPTIONS'    , (m, cb)  => cb @params.scaleOptions

window.nanobox ||= {}
nanobox.Valkrie = Valkrie
