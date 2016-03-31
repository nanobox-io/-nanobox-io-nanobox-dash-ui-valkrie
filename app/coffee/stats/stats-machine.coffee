module.exports = class StatsMachine

  constructor: () ->

  addSubsciber : (data) ->

  removeSubsciber : (data) ->


###

CPU : ->
  # CPU is a percentage
  hostCpuUsed = pulse.getHostStat( cpu_%  )

  nanoboxCpuUsed = 0
  for component in platformComponents
    nanoboxCpuUsed += pulse.getContainerStat( component, cpu_% )

  # Do the same for each app component
  # Add up all the totals, and the diff between the total and hostCpuUsed is "misc"

RAM : ->

###
