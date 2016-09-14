module.exports = class ValkrieDataShim

  constructor : () ->
    @initUI()

  getApp : (id, resetApp=false) ->
    # return require './valkrie-glob-1.json'
    return require './sept-14-rails-test.json'



    # ------------------------------------
    if resetApp
      @app = @basicApp()

    @app = switch id
      when 'host-state-change'      then @hostStateChange()
      when 'component-state-change' then @componentStateChange()
      when 'add-component'          then @addComponent()
      when 'remove-component'       then @destroyComponent()
      when 'add-generation'         then @addGeneration()
      when 'remove-generation'      then @destroyGeneration()
      when 'basic'
      else @basicApp()

    returner = @serialize()
    # console.log JSON.stringify returner
    returner

  # Basic app
  basicApp : () ->
    clobberBoxDataShim.resetCounts()
    return {
      clusters     : [  ]
      # clusters     : [ clobberBoxDataShim.getDataCluster() ]
      hosts        : [ clobberBoxDataShim.getHost()    ]
    }


  # Change the state of the first host
  hostStateChange : () ->
    @app.hosts[0].state = 'provisioning'
    @app

  # Change the state of the first app component of the first host
  componentStateChange : ()->
    @app.hosts[0].appComponents[0].generations[0].state = 'provisioning'
    @app

  # Add a component to the first host
  addComponent : () ->
    @app.hosts[0].addComponent('web', 'node', true)
    @app

  # Remove the last component from the first host
  destroyComponent : () ->
    @app.hosts[0].appComponents.pop()
    @app

  # Add a generation to the first component of the first host
  addGeneration : () ->
    @app.hosts[0].appComponents[0].addGeneration 'provisioning'
    @app

  # Remove the last generation from the first component of the first host
  destroyGeneration : () ->
    @app.hosts[0].appComponents[0].generations.pop()
    @app

  serialize : () ->
    data =
      clusters     : []
      hosts        : []
      totalDeploys : 2
      xAuthToken   : 'WPqKIYCvT7UwFR1GJ8sSg09jVXdL4QEoxlnAymB6ek2O5NfrM3'
      appId        : '100a4410-53e9-4913-a0eb-589a367c4d95'

    for cluster in @app.clusters
      data.clusters.push cluster.serialize()

    for host in @app.hosts
      data.hosts.push host.serialize()

    # Make sure any references to objects and arrays in the @app
    # are fully brokens
    data = JSON.parse JSON.stringify(data)

    return data

  initUI : () ->
    $('select').on 'change', (e)=>
      val = $(e.currentTarget).val()
      valkrie.refresh( @getApp( val ) )
