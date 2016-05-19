StatsMachine = require 'stats/stats-machine'
GlobMachine  = require 'glob/glob-machine'

class Valkrie

  constructor: (@$el, @params) ->
    @globMachine = new GlobMachine(@$el)

  # ------------------------------------ API

  update : (appId, url) ->
    postData =
      appId : appId

    $.ajax
      url         : url
      type        : 'POST'
      dataType    : 'json'
      contentType : "application/json;charset=utf-8"
      error       : (request, error)=> console.log "error fetching data : #{error}"
      success     : (data)=> @refresh JSON.parse(data)

  # ------------------------------------ Helpers

  refresh : (dataGlob) ->
    @globMachine.update dataGlob

window.nanobox ||= {}
nanobox.Valkrie = Valkrie
