StatsMachine = require 'stats/stats-machine'

class Valkrie

  constructor: (@$el) ->
    @hosts               = {}
    @clusters            = {}
    @platform_components = {}
    @app_components      = {}

    @statsMachine = new StatsMachine()

    @subscribeToRegistrations()
    @subscribeToStatEvents()
    @subscribeToPubsubEvents()

  # ------------------------------------ API

  # Hosts
  addHost : (data) ->
    host = new nanobox.ClobberBox()
    host.build @$el, nanobox.ClobberBox.HOST, data
    PubSub.publish 'REGISTER.HOST', {id:host.id, host:host}
    host.id

  deleteHost : () ->
  updateHost : () ->
  getHost    : (id) -> @hosts[id]

  # Clusters
  addCluster : (data) ->
    cluster = new nanobox.ClobberBox()
    cluster.build @$el, nanobox.ClobberBox.CLUSTER, data
    PubSub.publish 'REGISTER.CLUSTER', {id:cluster.id, cluster:cluster}
    cluster.id

  deleteCluster : () ->
  updateCluster : () ->
  getCluster    : (id) -> @clusters[id]

  # ------------ Services
  addService : () ->
  deleteService : () ->
  updateService : () ->


  # ------------------------------------ Subscriptions

  subscribeToRegistrations : ->
    PubSub.subscribe 'REGISTER.HOST'                , (m, data)=> @hosts[data.id] = data.host
    PubSub.subscribe 'REGISTER.CLUSTER'             , (m, data)=> @clusters[data.id] = data.cluster
    PubSub.subscribe 'REGISTER.PLATFORM_COMPONENT'  , (m, data)=> @platform_components[data.id] = data.component
    PubSub.subscribe 'REGISTER.APP_COMPONENT'       , (m, data)=> @app_components[data.id] = data.component
    PubSub.subscribe 'UNREGISTER.HOST'              , (m, data)=> delete @hosts[data.id]
    PubSub.subscribe 'UNREGISTER.CLUSTER'           , (m, data)=> delete @clusters[data.id]
    PubSub.subscribe 'UNREGISTER.PLATFORM_COMPONENT', (m, data)=> delete @platform_components[data.id]
    PubSub.subscribe 'UNREGISTER.APP_COMPONENT'     , (m, data)=> delete @app_components[data.id]

  subscribeToStatEvents : ->
    PubSub.subscribe 'STATS.SUBSCRIBE'  , (m, data)=> @statsMachine.addSubsciber data
    PubSub.subscribe 'STATS.UNSUBSCRIBE', (m, data)=> @statsMachine.removeSubsciber data


  subscribeToPubsubEvents : ->
    PubSub.subscribe 'SHOW.APP_COMPONENTS'     , (m, data)=> @hosts[data].box.showAppComponents()
    PubSub.subscribe 'SHOW.PLATFORM_COMPONENTS', (m, data)=> @hosts[data].box.showPlatformComponents()
    PubSub.subscribe 'SHOW.INSTANCES'          , (m, data)=>
    PubSub.subscribe 'SHOW.SCALE'              , (m, data)=> @hosts[data].box.showScaleMachine()
    PubSub.subscribe 'SHOW.STATS'              , (m, data)=> @getBox(data).box.showStats()
    PubSub.subscribe 'SHOW.CONSOLE'            , (m, data)=>
    PubSub.subscribe 'SHOW.SPLIT'              , (m, data)=>
    PubSub.subscribe 'SHOW.ADMIN'              , (m, data)=>
    PubSub.subscribe 'SHOW'                    , (m,data) => console.log m, data

  getBox : (key) ->
    for list in [@hosts,@clusters,@platform_components,@app_components]
      for boxKey, box of list
        # console.log boxKey, key
        if key == boxKey
          return box
      # console.log "none found..."


    # console.log key

window.nanobox ||= {}
nanobox.Valkrie = Valkrie
