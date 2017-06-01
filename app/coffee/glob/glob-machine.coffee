HostUpdater          = require 'glob/host-updater'
ClusterUpdater       = require 'glob/cluster-updater'
ClusterMemberUpdater = require 'glob/cluster-member-updater'
AppComponentUpdater  = require 'glob/app-component-updater'
GenerationUpdater    = require 'glob/generation-updater'

module.exports = class GlobMachine

  constructor: (@$el) ->
    @boxes    = {}

    @generationUpdater    = new GenerationUpdater @getBox, @getParentHostOfComponent
    @appComponentUpdater  = new AppComponentUpdater @getBox, @getParentHostOfComponent, @generationUpdater
    @hostUpdater          = new HostUpdater @getBox, @appComponentUpdater, @$el
    @clusterMemberUpdater = new ClusterMemberUpdater @getBox, @$el
    @clusterUpdater       = new ClusterUpdater @getBox, @$el, @clusterMemberUpdater

    @subscribeToRegistrations()
    @addEventListeners()

  update : (glob) ->
    nanobox.appName   = glob.appName
    nanobox.fqAppName = glob.fqAppName
    @fillInMissingData glob
    @hostUpdater.updateHosts glob.hosts
    @clusterUpdater.updateClusters glob.clusters

    # If there are no deploys, then there will only be one
    # host (bunkhouse). Show the state of this host as ready
    # for deploy
    if glob.totalDeploys == 0
      nanobox.noDeploys = true
      for key, host of @hostUpdater.hosts
        if glob.isPlatformReady
          host.entity.box.setReadinessState 'no-deploys'
        else
          host.entity.box.setReadinessState 'platform-building'

        return
    else
      delete nanobox.noDeploys
      PubSub.publish 'HIDE_NO_DEPLOYS_MESSSAGE'

    @sortBoxes @clusterUpdater.clusters, @clusterSorter, @$el
    @sortBoxes @hostUpdater.hosts, @hostSorter, @$el


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
    PubSub.subscribe 'SHOW.APP_COMPONENTS'     , (m, data)=> @getBox(data.uri).switchSubContent 'app-components', data.el
    PubSub.subscribe 'SHOW.PLATFORM_COMPONENTS', (m, data)=> @getBox(data.uri).switchSubContent 'platform-components', data.el
    PubSub.subscribe 'SHOW.INSTANCES'          , (m, data)=>
    PubSub.subscribe 'SHOW.SCALE'              , (m, data)=> @getBox(data.uri).switchSubContent 'scale-machine', data.el
    PubSub.subscribe 'SHOW.STATS'              , (m, data)=> @getBox(data.uri).switchSubContent 'stats', data.el
    PubSub.subscribe 'SHOW.CONSOLE'            , (m, data)=> @getBox(data.uri).switchSubContent 'console', data.el
    PubSub.subscribe 'SHOW.TUNNEL'             , (m, data)=> @getBox(data.uri).switchSubContent 'tunnel', data.el
    PubSub.subscribe 'SHOW.SPLIT'              , (m, data)=> @getBox(data.uri).switchSubContent 'split', data.el
    PubSub.subscribe 'SHOW.ADMIN'              , (m, data)=> @getBox(data.uri).switchSubContent 'admin', data.el
    PubSub.subscribe 'SHOW.HOST-INTANCES'      , (m, data)=> @getBox(data.uri).switchSubContent 'host-instances', data.el

  getBox : (id)  => @boxes[id]

  getParentHostOfComponent : (uri) =>
    for key, box of @boxes
      if box.hasComponentWithUri uri
        return box

  addBox    : (box) -> @boxes[box.uri] = box
  removeBox : (box) -> delete @boxes[box.uri]

  # This is used by the splitter to know what bunkhouses are available for moving components onto
  getBunkhouses : (componentId) ->
    ar = []
    for id, host of @hostUpdater.hosts
      data =
        id     : host.data.bunkhouseId
        name   : host.data.name
        state  : host.data.state

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
      if !host.appComponents?
        host.appComponents    = []
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
