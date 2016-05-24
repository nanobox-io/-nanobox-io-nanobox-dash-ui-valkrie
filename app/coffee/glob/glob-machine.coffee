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
    for hostData in glob.hosts
      @createOrUpdateHost hostData

    for clusterData in glob.clusters
      @getOrCreateCluster clusterData

  createOrUpdateHost : (newHostData) ->
    # If Host doesn't exist :
    if !@hosts[ newHostData.id ]?
      entity = new nanobox.ClobberBox()
      entity.build @$el, nanobox.ClobberBox.HOST, newHostData
    # Create host:
    else
      host = @hosts[ newHostData.id ]
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
    PubSub.subscribe 'STATS.GET_OPTIONS'       , (m, cb) -> cb scaleMachineTestData.getHostOptions()
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

  getBox    : (id)  => @boxes[id]
  getParentHostOfComponent : (id) =>
    for key, box of @boxes
      if box.hasComponentWithId id
        return box

  addBox    : (box) -> @boxes[box.id] = box
  removeBox : (box) -> delete @boxes[box.id]
