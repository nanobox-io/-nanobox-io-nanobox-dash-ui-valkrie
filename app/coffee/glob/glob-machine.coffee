HostUpdater         = require 'glob/host-updater'
ClusterUpdater      = require 'glob/cluster-updater'
AppComponentUpdater = require 'glob/app-component-updater'
GenerationUpdater   = require 'glob/generation-updater'

module.exports = class GlobMachine

  constructor: (@$el) ->
    @hosts    = {}
    @clusters = {}
    @boxes    = {}

    @generationUpdater   = new GenerationUpdater @getBox, @getParentHostOfComponent
    @appComponentUpdater = new AppComponentUpdater @getBox, @getParentHostOfComponent, @generationUpdater
    @hostUpdater         = new HostUpdater @getBox, @appComponentUpdater
    @clusterUpdater      = new ClusterUpdater @getBox, @appComponentUpdater

    @subscribeToRegistrations()
    @addEventListeners()

  update : (glob) ->
    if glob.hosts?
      for hostData in glob.hosts
        @createOrUpdateHost hostData

    if glob.clusters?
      for clusterData in glob.clusters
        for generation in clusterData.generations
          data =
            serviceId        : clusterData.id
            serviceState     : clusterData.state
            name             : clusterData.name
            serviceType      : clusterData.serviceType
            scalesHoriz      : clusterData.scalesHoriz
            scalesRedund     : clusterData.scalesRedund
            instances        : clusterData.instances # Delete
            adminPath        : clusterData.adminPath
            id               : generation.id
            generationState  : generation.state
            generationStatus : generation.status
            members          : generation.instances
            totalMembers     : generation.instances.length
          @getOrCreateCluster data

    # If there are no deploys, then there will only be one
    # host (bunkhouse). Show the state of this host as ready
    # for deploy
    if glob.totalDeploys == 0
      for key, host of @hosts
        host.entity.box.showAsReadyForDeploys()
        return

  createOrUpdateHost : (newHostData) ->
    # If Host doesn't exist :
    if !@hosts[ newHostData.id ]?
      entity = new nanobox.ClobberBox()
      entity.build @$el, nanobox.ClobberBox.HOST, newHostData
    # get existing host :
    else
      host   = @hosts[ newHostData.id ]
      entity = host.entity
      @hostUpdater.update host.entity, host.data, newHostData

    @hosts[newHostData.id] = {data:newHostData, entity:entity}

  getOrCreateCluster : (clusterData) ->
    if !@clusters[clusterData.id]?
      entity = new nanobox.ClobberBox()
      entity.build @$el, nanobox.ClobberBox.CLUSTER, clusterData
    else
      cluster = @clusters[clusterData.id]
      entity = cluster.entity
      # @hostUpdater.update host.entity, host.data, newHostData

    @clusters[clusterData.id] = {data:clusterData, entity:entity}

  subscribeToRegistrations : ->
    PubSub.subscribe 'REGISTER'                , (m, box)=> @addBox box
    PubSub.subscribe 'UNREGISTER'              , (m, box)=> @removeBox box

  addEventListeners : () ->
    PubSub.subscribe 'SHOW.APP_COMPONENTS'     , (m, data)=> @getBox(data.id).switchSubContent 'app-components', data.el
    PubSub.subscribe 'SHOW.PLATFORM_COMPONENTS', (m, data)=> @getBox(data.id).switchSubContent 'platform-components', data.el
    PubSub.subscribe 'SHOW.INSTANCES'          , (m, data)=>
    PubSub.subscribe 'SHOW.SCALE'              , (m, data)=> @getBox(data.id).switchSubContent 'scale-machine', data.el
    PubSub.subscribe 'SHOW.STATS'              , (m, data)=> @getBox(data.id).switchSubContent 'stats', data.el
    PubSub.subscribe 'SHOW.CONSOLE'            , (m, data)=> @getBox(data.id).switchSubContent 'console', data.el
    PubSub.subscribe 'SHOW.SPLIT'              , (m, data)=> @getBox(data.id).switchSubContent 'split', data.el
    PubSub.subscribe 'SHOW.ADMIN'              , (m, data)=> @getBox(data.id).switchSubContent 'admin', data.el
    PubSub.subscribe 'SHOW.HOST-INTANCES'      , (m, data)=> @getBox(data.id).switchSubContent 'host-instances', data.el

  getBox    : (id)  => @boxes[id]
  getParentHostOfComponent : (id) =>
    for key, box of @boxes
      if box.hasComponentWithId id
        return box

  addBox    : (box) -> @boxes[box.id] = box
  removeBox : (box) -> delete @boxes[box.id]
