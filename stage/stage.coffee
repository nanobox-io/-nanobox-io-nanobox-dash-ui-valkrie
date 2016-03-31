ValkrieDataShim = require './shims/data-shims'

dataShim = new ValkrieDataShim()
valkrie = new nanobox.Valkrie( $("body") )

statsDataSimultor.createFakeStatDataProvider()


# Host
hostId = valkrie.addHost clobberBoxDataShim.getHost()

# Cluster
clusterId = valkrie.addCluster clobberBoxDataShim.getCluster()
