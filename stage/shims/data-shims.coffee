module.exports = class ValkrieDataShim

  constructor: () ->

  getSampleApp : () ->
    {
      bunkHouses : [
        {
          id:"ec2.1"
          appComponents : [
            {
              id:"web"
              name:"web"
              serviceType:"ruby"
            },
            {
              id:"db"
              name:"customers"
              serviceType:"mongo-db"
            }
          ]
          platformComponents : [
            {id:"lb", name:"Load Balancer", serviceType:"load-balancer"}
            {id:"lg", name:"Logger", serviceType:"logger"}
            {id:"hm", name:"Health Monitor", serviceType:"health-monitor"}
            {id:"mr", name:"Message Router", serviceType:"message-router"}
            {id:"gs", name:"Blob Storage", serviceType:"glob-storage"}
          ]
        }
      ]

      clusters : [
        {
          id:"web"
          name:"web"
          serviceType:"ruby"
          instances:[
            {id:"web.1", hostId:"ec2.2"}
            {id:"web.2", hostId:"ec2.3"}
            {id:"web.3", hostId:"ec2.4"}
            {id:"web.4", hostId:"ec2.5"}
          ]
        }
      ]

    }
