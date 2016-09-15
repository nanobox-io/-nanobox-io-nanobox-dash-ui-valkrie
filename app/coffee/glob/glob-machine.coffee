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
    @fillInMissingData glob

    for hostData in glob.hosts
      @createOrUpdateHost hostData

    for clusterData in glob.clusters
      for generation in clusterData.generations
        data =
          serviceId        : clusterData.id
          serviceState     : clusterData.state
          name             : clusterData.name
          category         : clusterData.category
          clusterable      : clusterData.clusterable
          isSplitable      : clusterData.isSplitable
          serviceType      : clusterData.serviceType
          scalesHoriz      : clusterData.scalesHoriz
          scalesRedund     : clusterData.scalesRedund
          adminPath        : clusterData.adminPath
          actionPath       : clusterData.actionPath
          uid              : clusterData.uid
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
    else
      PubSub.publish 'HIDE_NO_DEPLOYS_MESSSAGE'

    @sortBoxes @clusters, @clusterSorter, @$el
    @sortBoxes @hosts, @hostSorter, @$el

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


  sortBoxes : (items, sortMethod, $parent) ->
    ar = []
    for key, item of items
      ar.push item

    return if ar.length == 0
    ar.sort sortMethod

    for i in [ar.length-1..0]
      $detatchedItem = ar[i].entity.box.$node.detach()
      $parent.prepend $detatchedItem

  # Used to order an array of hosts
  hostSorter : (a,b)->
    if a.data.name > b.data.name
      return 1
    if a.data.name < b.data.name
      return -1
    return 0

  # Used to order an array of clusters
  clusterSorter : (a,b)->
    # Data components always at the bottom
    if a.data.category != 'data' && b.data.category == 'data'
      return -1
    if a.data.category == 'data' && b.data.category != 'data'
      return 1
    if a.data.name > b.data.name
      return 1
    if a.data.name < b.data.name
      return -1
    return 0



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
    PubSub.subscribe 'SHOW.TUNNEL'             , (m, data)=> @getBox(data.id).switchSubContent 'tunnel', data.el
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

  # This is used by the splitter to know what bunkhouses are available for moving components onto
  getBunkhouses : (componentId) ->
    ar = []
    for id, host of @hosts
      data =
        id   : host.data.bunkhouseId
        name : host.data.name

      # Loop through all app components on thes host and see if this component id matches
      match = host.data.appComponents.find (component)-> component.id == componentId
      # If nothing was found, loop through all the platform components on the host
      if !match?
        match = host.data.platformServices.find (service)->
          service.components.find (component)-> component.id == componentId

      if match? then data.current = true
      ar.push data
    return ar

  # ------------------------------------ Helpers
  fillInMissingData : (glob) ->
    if !glob.hosts?    then glob.hosts    = []
    if !glob.clusters? then glob.clusters = []
    # Hosts
    for host in glob.hosts
      if !host.platformServices? then host.platformServices = []
      if !host.appComponents?    then host.appComponents    = []
      # Platform Services
      for service in host.platformServices
        if !service.components? then service.components = []
        # Components
        for component in service.components
          @fillInMissingDataForComponent component
      # App Components
      for component in host.appComponents
        @fillInMissingDataForComponent component

    # Clusters
    for cluster in glob.clusters
      if !cluster.generations? then cluster.generations = []
      for generation in cluster.generations
        if !generation.instances? then generation.instances = []


  fillInMissingDataForComponent : (component) ->
    if !component.generations? then component.generations = []
    for generation in component.generations
      if !generation.instances? then component.instances = []
