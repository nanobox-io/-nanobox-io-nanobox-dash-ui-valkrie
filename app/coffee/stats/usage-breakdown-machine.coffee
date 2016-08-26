module.exports = class UsageBreakdownMachine

  constructor: () ->
    @totalServices = 0
    @services = []

  startLoad : (data, buildUrl, makeRequest) ->
    @liveHostStats = data.liveHostStats
    @cb = data.callback
    # For each metric (ram, cpu)
    for metric in data.metrics

      for component in data.services
        @totalServices++
        dataParams =
          component : component.entityId
        url = buildUrl(metric, 'latest')
        @loadStat url, dataParams, metric, component, makeRequest

  loadStat : (url, dataParams, metric, component, makeRequest)=>
    makeRequest url, dataParams, (result)=>
      @services.push
        id     : component.entityId + component.name
        type   : component.type
        name   : component.name
        kind   : component.kind
        metric : metric
        value  : result.value/100

      if @services.length == @totalServices
        @prepareAndSendServices()
      # {type:"internal", name:service.name, kind:service.kind, metrics: metrics}

  prepareAndSendServices : () ->
    # Collate the single metric results into one object per component
    data = {}
    for service in @services
      # If this service doesn't exist yet, create it
      if !data[service.id]?
        data[service.id] =
          type    : service.type
          name    : service.name
          kind    : service.kind
          metrics : {}

      # Store the value of this metric
      data[service.id].metrics[service.metric] = service.value

    ar = []
    for key, val of data
      ar.push val

    obj =
      liveHostStats : @liveHostStats
      services      : ar

    @cb obj
