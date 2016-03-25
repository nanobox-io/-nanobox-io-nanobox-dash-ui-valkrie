example = require 'jade/example'

class Valkrie

  constructor: ($el) ->
    $node = $ example( {} )
    $el.append $node

  # ------------------------------------ API

  # Hosts
  addHost : () ->
  deleteHost : () ->
  updateHost : () ->

  # Clusters
  addCluster : () ->
  deleteCluster : () ->
  updateCluster : () ->

  # Services
  addService : () ->
  deleteService : () ->
  updateService : () ->


  update : (data) -> console.log data


window.nanobox ||= {}
nanobox.Valkrie = Valkrie
