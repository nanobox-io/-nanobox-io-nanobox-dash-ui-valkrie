### TODO
For clusters,    verb="max"
To fill with 0s  backfill="-1"
###
UsageBreakdownMachine = require 'stats/usage-breakdown-machine'

module.exports = class StatsMachine

  constructor: (isTesting) ->
    if !isTesting
      @subscribeToStatRequests()

  setAppInfo : (@appId, @xAuthToken) ->

  subscribeToStatRequests : () ->

    PubSub.subscribe 'STATS.SUBSCRIBE.HISTORIC', (m, data)=>
      for metric in data.metrics
        @loadHistoricStat data, metric

    PubSub.subscribe 'STATS.SUBSCRIBE.LIVE', (m, data)=>
      for metric in data.metrics
        @loadLiveStat data, metric

    PubSub.subscribe 'STATS.SUBSCRIBE.HOURLY_AVERAGE', (m, data)=>
      @loadHrAveragedStats data

    PubSub.subscribe 'STATS.SUBSCRIBE.USAGE_BREAKDOWN', (m, data)=>
      usageBreakdownMachine = new UsageBreakdownMachine()
      usageBreakdownMachine.startLoad data, @buildUrl, @makeRequest



    #     # ###  #####  ####### ####### ######  ###  #####
    #     #  #  #     #    #    #     # #     #  #  #     #
    #     #  #  #          #    #     # #     #  #  #
    #######  #   #####     #    #     # ######   #  #
    #     #  #        #    #    #     # #   #    #  #
    #     #  #  #     #    #    #     # #    #   #  #     #
    #     # ###  #####     #    ####### #     # ###  #####

    # ---------------------------------------------------------------------------------------------------

  loadHistoricStat : (data, metric) ->
    dataParams =
      start : data.start
      stop  : data.stop
      verb  : 'max'
    entity = data.entity

    if entity == 'host'
      dataParams.component = ''
    else if entity == 'host-instance' or entity == 'member'
      entity = 'host'

    dataParams[entity] = data.entityId

    url = @buildUrl(metric, 'hourly')
    @makeRequest url, dataParams, (result)->
      for item in result
        if item.value != -1
          item.value /= 100
      data.callback { metric: metric, data: result }

  #       ### #     # #######
  #        #  #     # #
  #        #  #     # #
  #        #  #     # #####
  #        #   #   #  #
  #        #    # #   #
  ####### ###    #    #######

  # ---------------------------------------------------------------------------------------------------

  loadLiveStat : (data, metric) ->
    dataParams =
      verb : 'max'
    entity = data.entity

    if entity == 'host'
      dataParams.component = ''
    else if entity == 'host-instance' or entity == 'member'
      entity = 'host'

    dataParams[entity] = data.entityId

    url = @buildUrl(metric, 'latest')
    @makeRequest url, dataParams, (result)->
      result.value /= 100
      data.callback { metric: metric, value: result.value }


    #    #     # ####### ######     #     #####  #######
   # #   #     # #       #     #   # #   #     # #
  #   #  #     # #       #     #  #   #  #       #
  #     # #     # #####   ######  #     # #  #### #####
  #######  #   #  #       #   #   ####### #     # #
  #     #   # #   #       #    #  #     # #     # #
  #     #    #    ####### #     # #     #  #####  #######

  # ---------------------------------------------------------------------------------------------------


  loadHrAveragedStats : (data) ->
    return if !data.metric?
    dataParams =
      start  : data.start
      stop   : '0h' #data.stop
    entity = data.entity

    if entity == 'host'
      dataParams.member = ''
    if entity == 'member' or entity == 'host-instance'
      entity = 'host'


    dataParams[entity] = data.entityId


    url  = @buildUrl data.metric, 'daily'
    @makeRequest url, dataParams, (result)->
      for item in result
        if item.value != -1
          item.value /= 100
      data.callback result


  # ------------------------------------ Request

  makeRequest : (url, data, onSuccess) =>
    data.backfill = '-1'
    $.ajax
      url         : url
      type        : 'GET'
      dataType    : 'json'
      data        : data
      headers     : {"X-Auth-Token" : @xAuthToken}
      success     : onSuccess
      error       : (result) -> console.log "Error getting stats:"; console.log result

  # ------------------------------------ Helpers

  ###
  @metric   ex: 'ram', 'cpu', etc
  @interval ex: 'daily', 'latest', etc
  ###
  buildUrl : (metric, interval) => "https://proxy.nanobox.io/#{@appId}/pulse/#{interval}/#{metric}_percent"
