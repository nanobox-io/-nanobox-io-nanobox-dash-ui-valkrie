Updater = require 'glob/updater'

module.exports = class ClusterUpdater extends Updater

  constructor: (getBox, @$el, @clusterMemberUpdater) ->
    super(getBox)
    @clusters = {}

  updateClusters : (clusters) ->
    newClusters = @collateClusterData clusters
    oldClusters = []
    oldClusters.push cluster.data for key, cluster of @clusters
    # @getOrCreateCluster data
    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newClusters, oldClusters, @updateExistingCluster

    for newClusterData in nonMatchedNew
      @createNewCluster newClusterData

    for oldClusterData in nonMatchedOld
      @destroyOldCluster oldClusterData

  updateExistingCluster : (newClusterData, oldClusterData) =>
    cluster = @clusters[newClusterData.id]
    entity  = cluster.entity
    @updateState newClusterData.id, oldClusterData.generationState, newClusterData.generationState
    @clusters[newClusterData.id] = {data:newClusterData, entity:entity}
    @clusterMemberUpdater.updateMembers entity.box, oldClusterData.members, newClusterData.members
    entity.box.update  newClusterData
    # console.log entity

  createNewCluster : (newClusterData) ->
    entity = new nanobox.ClobberBox()
    entity.build @$el, nanobox.ClobberBox.CLUSTER, newClusterData
    @clusters[newClusterData.id] = {data:newClusterData, entity:entity}

  destroyOldCluster : (oldClusterData) ->
    @clusters[oldClusterData.id].entity.destroy()
    delete @clusters[oldClusterData.id]

  collateClusterData : (clusters) ->
    ar = []
    for clusterData in clusters
      for generationData in clusterData.generations
        data =
          serviceId         : clusterData.id
          serviceState      : clusterData.state
          name              : clusterData.name
          category          : clusterData.category
          clusterable       : clusterData.clusterable
          isSplitable       : clusterData.isSplitable
          serviceType       : clusterData.serviceType
          adminPath         : clusterData.adminPath
          actionPath        : clusterData.actionPath
          uid               : clusterData.uid
          id                : generationData.id
          generationState   : generationData.state
          generationStatus  : generationData.status
          members           : generationData.instances
          totalMembers      : generationData.instances.length
          clusterShapeIs    : generationData.clusterShapeIs
          clusterShapeCanBe : clusterData.clusterShapeCanBe
          topology          : clusterData.topology
        ar.push data
    return ar
