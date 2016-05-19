StatsMachine = require 'stats/stats-machine'
GlobMachine  = require 'glob/glob-machine'

class Valkrie

  constructor: (@$el) ->
    @globMachine = new GlobMachine(@$el)

  fetchDataGlob : (appId, url) ->
    postData =
      appId : appId

    $.ajax
      url         : url
      type        : 'POST'
      dataType    : 'json'
      contentType : "application/json;charset=utf-8"
      error       : (request, error)=> console.log 'error fetching data..'
      success     : (data)=>@update JSON.parse(data)

  update : (dataGlob) ->
    @globMachine.update dataGlob

window.nanobox ||= {}
nanobox.Valkrie = Valkrie
