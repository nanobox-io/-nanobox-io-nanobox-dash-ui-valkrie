Updater = require 'glob/updater'

module.exports = class ClusterMemberUpdater extends Updater

  constructor: (getBox) ->
    super getBox

  updateMembers : (@cluster, oldMembers, newMembers)->
    [nonMatchedNew, nonMatchedOld] = @getNonPairedItems newMembers, oldMembers, @updateMember, 'id'
    # Brand new components
    for newMember in nonMatchedNew
      @cluster.addMember newMember

    # Old components that should be destroyed
    for oldMember in nonMatchedOld
      @cluster.removeMember oldMember.hostId

  updateMember : (newMember, oldMember) =>
    # @generationUpdater.updateGenerations newMember.id, newMember.uri, oldMember.generations, newMember.generations, @cluster
    @updateState newMember.id, oldMember.state, newMember.state
