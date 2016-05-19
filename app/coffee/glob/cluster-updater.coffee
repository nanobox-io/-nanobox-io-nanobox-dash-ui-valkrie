Updater = require 'glob/updater'

module.exports = class ClusterUpdater extends Updater

  constructor: (getBox) ->
    super(getBox)
