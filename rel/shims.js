(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TestData;

module.exports = TestData = (function() {
  function TestData() {}

  TestData.prototype.createFakeStatDataProvider = function() {
    PubSub.subscribe('STATS.SUBSCRIBE.LIVE', (function(_this) {
      return function(m, data) {
        data.callback(statsDataSimultor.generateLiveStats());
        return setInterval(function() {
          if (window.enableUpdates) {
            return data.callback(statsDataSimultor.generateLiveStats());
          }
        }, 5000);
      };
    })(this));
    PubSub.subscribe('STATS.SUBSCRIBE.HISTORIC', (function(_this) {
      return function(m, data) {
        data.callback(statsDataSimultor.generateHistoricalStats());
        return setInterval(function() {
          var i, j, results;
          if (window.enableUpdates) {
            results = [];
            for (i = j = 0; j <= 4; i = ++j) {
              results.push(setTimeout(function() {
                return data.callback(statsDataSimultor.generateHistoricalStat());
              }, Math.floor((Math.random() * 1000) + 250)));
            }
            return results;
          }
        }, 5000);
      };
    })(this));
    return PubSub.subscribe('STATS.UNSUBSCRIBE', (function(_this) {
      return function(m, data) {};
    })(this));
  };

  TestData.prototype.generateLiveStats = function() {
    var j, len, metric, ref, stats;
    stats = [];
    ref = ["cpu", "ram", "swap", "disk"];
    for (j = 0, len = ref.length; j < len; j++) {
      metric = ref[j];
      stats.push({
        metric: metric,
        value: (Math.random() * 1.00) + 0.00
      });
    }
    return stats;
  };

  TestData.prototype.generateHistoricalStats = function() {
    var data, hour, j, k, len, metric, ref, stats;
    stats = [];
    ref = ["cpu", "ram", "swap", "disk"];
    for (j = 0, len = ref.length; j < len; j++) {
      metric = ref[j];
      data = [];
      for (hour = k = 0; k <= 24; hour = ++k) {
        data.push({
          time: "" + (("0" + hour).slice(-2)),
          value: (Math.random() * 1.00) + 0.00
        });
      }
      stats.push({
        metric: metric,
        data: data
      });
    }
    return stats;
  };

  TestData.prototype.generateHistoricalStat = function() {
    var data, hour, j, metric;
    metric = ["cpu", "ram", "swap", "disk"][Math.floor(Math.random() * 4) + 0];
    data = [];
    for (hour = j = 0; j <= 24; hour = ++j) {
      data.push({
        time: "" + (("0" + hour).slice(-2)),
        value: (Math.random() * 1.00) + 0.00
      });
    }
    return [
      {
        metric: metric,
        data: data
      }
    ];
  };

  return TestData;

})();

},{}],2:[function(require,module,exports){
var TestData;

TestData = require('./shim/test-data');

window.statsDataSimultor = new TestData();

window.init = function() {
  var expanded, micro, standard;
  statsDataSimultor.createFakeStatDataProvider();
  micro = new nanobox.HourlyStats($(".micro"), {
    view: "micro"
  });
  micro.build();
  standard = new nanobox.HourlyStats($(".standard"), {
    view: "standard"
  });
  standard.build();
  expanded = new nanobox.HourlyStats($(".expanded"), {
    view: "expanded"
  });
  return expanded.build();
};

},{"./shim/test-data":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS90ZXN0LWRhdGEuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgVGVzdERhdGE7XG5cbm1vZHVsZS5leHBvcnRzID0gVGVzdERhdGEgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFRlc3REYXRhKCkge31cblxuICBUZXN0RGF0YS5wcm90b3R5cGUuY3JlYXRlRmFrZVN0YXREYXRhUHJvdmlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICBQdWJTdWIuc3Vic2NyaWJlKCdTVEFUUy5TVUJTQ1JJQkUuTElWRScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgZGF0YS5jYWxsYmFjayhzdGF0c0RhdGFTaW11bHRvci5nZW5lcmF0ZUxpdmVTdGF0cygpKTtcbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh3aW5kb3cuZW5hYmxlVXBkYXRlcykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEuY2FsbGJhY2soc3RhdHNEYXRhU2ltdWx0b3IuZ2VuZXJhdGVMaXZlU3RhdHMoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCA1MDAwKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NUQVRTLlNVQlNDUklCRS5ISVNUT1JJQycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgZGF0YS5jYWxsYmFjayhzdGF0c0RhdGFTaW11bHRvci5nZW5lcmF0ZUhpc3RvcmljYWxTdGF0cygpKTtcbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBpLCBqLCByZXN1bHRzO1xuICAgICAgICAgIGlmICh3aW5kb3cuZW5hYmxlVXBkYXRlcykge1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChpID0gaiA9IDA7IGogPD0gNDsgaSA9ICsraikge1xuICAgICAgICAgICAgICByZXN1bHRzLnB1c2goc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5jYWxsYmFjayhzdGF0c0RhdGFTaW11bHRvci5nZW5lcmF0ZUhpc3RvcmljYWxTdGF0KCkpO1xuICAgICAgICAgICAgICB9LCBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTAwMCkgKyAyNTApKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgcmV0dXJuIFB1YlN1Yi5zdWJzY3JpYmUoJ1NUQVRTLlVOU1VCU0NSSUJFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge307XG4gICAgfSkodGhpcykpO1xuICB9O1xuXG4gIFRlc3REYXRhLnByb3RvdHlwZS5nZW5lcmF0ZUxpdmVTdGF0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBqLCBsZW4sIG1ldHJpYywgcmVmLCBzdGF0cztcbiAgICBzdGF0cyA9IFtdO1xuICAgIHJlZiA9IFtcImNwdVwiLCBcInJhbVwiLCBcInN3YXBcIiwgXCJkaXNrXCJdO1xuICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgbWV0cmljID0gcmVmW2pdO1xuICAgICAgc3RhdHMucHVzaCh7XG4gICAgICAgIG1ldHJpYzogbWV0cmljLFxuICAgICAgICB2YWx1ZTogKE1hdGgucmFuZG9tKCkgKiAxLjAwKSArIDAuMDBcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHM7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlSGlzdG9yaWNhbFN0YXRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEsIGhvdXIsIGosIGssIGxlbiwgbWV0cmljLCByZWYsIHN0YXRzO1xuICAgIHN0YXRzID0gW107XG4gICAgcmVmID0gW1wiY3B1XCIsIFwicmFtXCIsIFwic3dhcFwiLCBcImRpc2tcIl07XG4gICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBtZXRyaWMgPSByZWZbal07XG4gICAgICBkYXRhID0gW107XG4gICAgICBmb3IgKGhvdXIgPSBrID0gMDsgayA8PSAyNDsgaG91ciA9ICsraykge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIHRpbWU6IFwiXCIgKyAoKFwiMFwiICsgaG91cikuc2xpY2UoLTIpKSxcbiAgICAgICAgICB2YWx1ZTogKE1hdGgucmFuZG9tKCkgKiAxLjAwKSArIDAuMDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzdGF0cy5wdXNoKHtcbiAgICAgICAgbWV0cmljOiBtZXRyaWMsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHM7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlSGlzdG9yaWNhbFN0YXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YSwgaG91ciwgaiwgbWV0cmljO1xuICAgIG1ldHJpYyA9IFtcImNwdVwiLCBcInJhbVwiLCBcInN3YXBcIiwgXCJkaXNrXCJdW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMF07XG4gICAgZGF0YSA9IFtdO1xuICAgIGZvciAoaG91ciA9IGogPSAwOyBqIDw9IDI0OyBob3VyID0gKytqKSB7XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICB0aW1lOiBcIlwiICsgKChcIjBcIiArIGhvdXIpLnNsaWNlKC0yKSksXG4gICAgICAgIHZhbHVlOiAoTWF0aC5yYW5kb20oKSAqIDEuMDApICsgMC4wMFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG1ldHJpYzogbWV0cmljLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9XG4gICAgXTtcbiAgfTtcblxuICByZXR1cm4gVGVzdERhdGE7XG5cbn0pKCk7XG4iLCJ2YXIgVGVzdERhdGE7XG5cblRlc3REYXRhID0gcmVxdWlyZSgnLi9zaGltL3Rlc3QtZGF0YScpO1xuXG53aW5kb3cuc3RhdHNEYXRhU2ltdWx0b3IgPSBuZXcgVGVzdERhdGEoKTtcblxud2luZG93LmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGV4cGFuZGVkLCBtaWNybywgc3RhbmRhcmQ7XG4gIHN0YXRzRGF0YVNpbXVsdG9yLmNyZWF0ZUZha2VTdGF0RGF0YVByb3ZpZGVyKCk7XG4gIG1pY3JvID0gbmV3IG5hbm9ib3guSG91cmx5U3RhdHMoJChcIi5taWNyb1wiKSwge1xuICAgIHZpZXc6IFwibWljcm9cIlxuICB9KTtcbiAgbWljcm8uYnVpbGQoKTtcbiAgc3RhbmRhcmQgPSBuZXcgbmFub2JveC5Ib3VybHlTdGF0cygkKFwiLnN0YW5kYXJkXCIpLCB7XG4gICAgdmlldzogXCJzdGFuZGFyZFwiXG4gIH0pO1xuICBzdGFuZGFyZC5idWlsZCgpO1xuICBleHBhbmRlZCA9IG5ldyBuYW5vYm94LkhvdXJseVN0YXRzKCQoXCIuZXhwYW5kZWRcIiksIHtcbiAgICB2aWV3OiBcImV4cGFuZGVkXCJcbiAgfSk7XG4gIHJldHVybiBleHBhbmRlZC5idWlsZCgpO1xufTtcbiJdfQ==

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AppComponent;

module.exports = AppComponent = (function() {
  AppComponent.appComponentCount = 0;

  function AppComponent(kind, type, scalesHorizontally) {
    if (kind == null) {
      kind = 'web';
    }
    this.type = type != null ? type : "ruby";
    this.scalesHorizontally = scalesHorizontally != null ? scalesHorizontally : true;
    this.generationCount = 1;
    this.state = 'active';
    this.serverSpecsId = "b3";
    this.id = kind + "." + (++AppComponent.appComponentCount);
    this.name = kind + " " + AppComponent.appComponentCount;
    this.generations = [];
    this.addGeneration();
  }

  AppComponent.prototype.addGeneration = function(state) {
    if (state == null) {
      state = 'active';
    }
    return this.generations.push({
      state: state,
      id: this.id + ".gen" + (this.generationCount++)
    });
  };

  AppComponent.prototype.serialize = function() {
    return {
      generations: this.generations,
      state: this.state,
      serverSpecsId: this.serverSpecsId,
      id: this.id,
      name: this.name,
      serviceType: this.type,
      scalesHoriz: this.scalesHorizontally
    };
  };

  return AppComponent;

})();

},{}],2:[function(require,module,exports){
var AppComponent, Cluster, Host, x;

AppComponent = require('./app-component');

Host = require('./host');

module.exports = Cluster = (function() {
  Cluster.clusterCount = 0;

  function Cluster(totalMembers, totalGenerations) {
    var generation, i, j, k, ref, ref1;
    if (totalMembers == null) {
      totalMembers = 4;
    }
    if (totalGenerations == null) {
      totalGenerations = 1;
    }
    this.id = "cluster." + Cluster.clusterCount;
    this.name = "web " + (++AppComponent.appComponentCount);
    this.state = "active";
    this.serviceType = "ruby";
    this.scalesHoriz = true;
    this.scalesRedund = false;
    this.generations = [];
    for (i = j = 1, ref = totalGenerations; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      generation = {
        id: "web.main.gen" + i,
        state: "active",
        status: "online",
        instances: []
      };
      for (i = k = 1, ref1 = totalMembers; 1 <= ref1 ? k <= ref1 : k >= ref1; i = 1 <= ref1 ? ++k : --k) {
        generation.instances.push({
          id: i,
          hostId: "do." + i,
          hostName: "do." + i,
          state: "active",
          status: "online",
          role: "default",
          serverSpecsId: "b2"
        });
      }
      this.generations.push(generation);
    }
  }

  Cluster.prototype.serialize = function() {
    return {
      id: this.id,
      state: this.state,
      name: this.name,
      scalesHoriz: this.scalesHoriz,
      scalesRedund: this.scalesRedund,
      generations: this.generations,
      serviceType: this.serviceType
    };
  };

  return Cluster;

})();

x = {
  "id": "web.main",
  "name": "jade-jug",
  "state": "active",
  "serviceType": "default",
  "scalesHoriz": true,
  "scalesRedund": false,
  "generations": [
    {
      "id": "web.main.gen2",
      "state": "active",
      "status": "online",
      "instances": [
        {
          "id": 1,
          "hostId": "do.2",
          "hostName": "do.2",
          "state": "active",
          "status": "online",
          "role": "default",
          "serverSpecsId": "512mb"
        }
      ]
    }
  ]
};

},{"./app-component":1,"./host":5}],3:[function(require,module,exports){
var AppComponent, ClobberBoxDataShim, Cluster, Generation, Host, PlatformComponent;

AppComponent = require('./app-component');

PlatformComponent = require('./platform-component');

Host = require('./host');

Cluster = require('./cluster');

Generation = require('./generation');

module.exports = ClobberBoxDataShim = (function() {
  function ClobberBoxDataShim() {}

  ClobberBoxDataShim.prototype.getHost = function(makeLotsOfComponents) {
    if (makeLotsOfComponents == null) {
      makeLotsOfComponents = false;
    }
    return new Host(makeLotsOfComponents);
  };

  ClobberBoxDataShim.prototype.getCluster = function(totalMembers) {
    return new Cluster(totalMembers);
  };

  ClobberBoxDataShim.prototype.getAppComponent = function(kind, type, scalesHorizontally) {
    return new AppComponent(kind, type, scalesHorizontally);
  };

  ClobberBoxDataShim.prototype.getPlatformComponent = function(id, kind) {
    return new PlatformComponent(id, kind);
  };

  ClobberBoxDataShim.prototype.getGeneration = function(parentId, state) {
    return new Generation(parentId, state);
  };

  ClobberBoxDataShim.prototype.resetCounts = function() {
    Host.hostCount = 0;
    AppComponent.appComponentCount = 0;
    return Cluster.clusterCount = 0;
  };

  return ClobberBoxDataShim;

})();

},{"./app-component":1,"./cluster":2,"./generation":4,"./host":5,"./platform-component":6}],4:[function(require,module,exports){
var Generation;

module.exports = Generation = (function() {
  Generation.genericGenerationCount = 0;

  function Generation(parentId, state) {
    if (state == null) {
      state = 'active';
    }
    this.state = state;
    this.id = parentId + ".gen" + (Generation.genericGenerationCount++);
  }

  Generation.prototype.serialize = function() {
    return {
      state: this.state,
      id: this.id
    };
  };

  return Generation;

})();

},{}],5:[function(require,module,exports){
var AppComponent, Host, PlatformComponent;

AppComponent = require('./app-component');

PlatformComponent = require('./platform-component');

module.exports = Host = (function() {
  Host.hostCount = 0;

  function Host(makeLotsOfComponents) {
    if (makeLotsOfComponents == null) {
      makeLotsOfComponents = false;
    }
    this.state = "active";
    this.id = "host." + (++Host.hostCount);
    this.name = "ec2." + Host.hostCount;
    this.serverSpecsId = "b1";
    this.platformComponents = [new PlatformComponent("lb", "mesh"), new PlatformComponent("lg", "logger"), new PlatformComponent("hm", "monitor"), new PlatformComponent("mr", "pusher"), new PlatformComponent("gs", "warehouse")];
    this.appComponents = [];
    this.createComponents(makeLotsOfComponents);
  }

  Host.prototype.createComponents = function(makeLotsOfComponents) {
    if (!makeLotsOfComponents) {
      this.addComponent();
      return this.addComponent('db', 'mongo-db', false);
    } else {
      this.addComponent();
      this.addComponent('db', 'mongo-db', false);
      this.addComponent('web', 'node', true);
      this.addComponent('web', 'memcached', true);
      this.addComponent('web', 'python', true);
      this.addComponent('web', 'storage', true);
      this.addComponent('web', 'java', true);
      this.addComponent('web', 'php', true);
      this.addComponent('db', 'couch-db', false);
      this.addComponent('db', 'maria-db', false);
      this.addComponent('db', 'postgres-db', false);
      this.addComponent('db', 'redis', false);
      this.addComponent('db', 'percona-db', false);
      this.addComponent('web', 'default', true);
      return this.addComponent('db', 'default-db', false);
    }
  };

  Host.prototype.addComponent = function(kind, type, isHorizontallyScalable) {
    return this.appComponents.push(new AppComponent(kind, type, isHorizontallyScalable));
  };

  Host.prototype.serializeComponents = function(components) {
    var ar, component, i, len;
    ar = [];
    for (i = 0, len = components.length; i < len; i++) {
      component = components[i];
      ar.push(component.serialize());
    }
    return ar;
  };

  Host.prototype.serialize = function() {
    return {
      state: this.state,
      id: this.id,
      name: this.name,
      serverSpecsId: this.serverSpecsId,
      platformComponents: this.serializeComponents(this.platformComponents),
      appComponents: this.serializeComponents(this.appComponents)
    };
  };

  return Host;

})();

},{"./app-component":1,"./platform-component":6}],6:[function(require,module,exports){
var PlatformComponent;

module.exports = PlatformComponent = (function() {
  function PlatformComponent(id, kind) {
    this.id = id;
    this.kind = kind;
    this.isSplitable = Math.random() > 0.5;
    this.state = "active";
  }

  PlatformComponent.prototype.serialize = function() {
    return {
      id: this.id,
      kind: this.kind,
      isSplitable: this.isSplitable,
      state: this.state
    };
  };

  return PlatformComponent;

})();

},{}],7:[function(require,module,exports){
var $holder, ClobberBoxDataShim, UI, boxes;

UI = require('./test-ui/ui');

ClobberBoxDataShim = require('./shims/data-shim');

window.clobberBoxDataShim = new ClobberBoxDataShim();

boxes = [];

$holder = $(".holder");

window.init = (function(_this) {
  return function() {
    var addEventListeners, getBox, getParentOfComponent, getParentOfGeneration, removeBox, subscribeToRegistrations, ui;
    statsDataSimultor.createFakeStatDataProvider();
    ui = new UI($('body'));
    window.addGeneration = function(componentId, state) {
      var genData;
      if (state == null) {
        state = 'provisioning';
      }
      genData = clobberBoxDataShim.getGeneration(componentId, state).serialize();
      return getParentOfComponent(componentId).addGeneration(componentId, genData);
    };
    window.addComponent = function(hostId) {
      return getBox(hostId).addComponent(clobberBoxDataShim.getAppComponent().serialize());
    };
    window.removeComponent = function(componentId) {
      return getParentOfComponent(componentId).removeComponent(componentId);
    };
    window.removeGeneration = function(generationId) {
      return getParentOfGeneration(generationId).removeGeneration(generationId);
    };
    window.addHost = function() {
      var hostBox;
      hostBox = new nanobox.ClobberBox();
      hostBox.build($holder, nanobox.ClobberBox.HOST, clobberBoxDataShim.getHost(true).serialize());
      return ui.noteComponents(hostBox);
    };
    window.addCluster = function(clusterData) {
      var clusterBox, data, generation, j, len, ref, results;
      ref = clusterData.generations;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        generation = ref[j];
        data = {
          serviceId: clusterData.id,
          serviceState: clusterData.state,
          name: clusterData.name,
          serviceType: clusterData.serviceType,
          scalesHoriz: clusterData.scalesHoriz,
          scalesRedund: clusterData.scalesRedund,
          instances: clusterData.instances,
          id: generation.id,
          generationState: generation.state,
          generationStatus: generation.status,
          members: generation.instances,
          totalMembers: generation.instances.length
        };
        clusterBox = new nanobox.ClobberBox();
        results.push(clusterBox.build($holder, nanobox.ClobberBox.CLUSTER, data));
      }
      return results;
    };
    window.setState = function(id, state) {
      return getBox(id).setState(state);
    };
    window.setGenerationState = function(id, state) {
      return getParentOfGeneration(id).setGenerationState(id, state);
    };
    subscribeToRegistrations = function() {
      PubSub.subscribe('SCALE.GET_OPTIONS', function(m, cb) {
        return cb(scaleMachineTestData.getHostOptions());
      });
      PubSub.subscribe('REGISTER', (function(_this) {
        return function(m, box) {
          return boxes.push(box);
        };
      })(this));
      PubSub.subscribe('UNREGISTER', (function(_this) {
        return function(m, box) {
          return removeBox(box);
        };
      })(this));
      return PubSub.subscribe('SCALE', function(m, data) {
        console.log("New Scale:");
        return console.log(data);
      });
    };
    addEventListeners = function() {
      PubSub.subscribe('SHOW.APP_COMPONENTS', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('app-components', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.PLATFORM_COMPONENTS', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('platform-components', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.INSTANCES', (function(_this) {
        return function(m, data) {};
      })(this));
      PubSub.subscribe('SHOW.SCALE', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('scale-machine', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.STATS', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('stats', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.CONSOLE', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('console', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.SPLIT', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('split', data.el);
        };
      })(this));
      return PubSub.subscribe('SHOW.ADMIN', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('admin', data.el);
        };
      })(this));
    };
    getBox = function(id) {
      var box, j, len;
      for (j = 0, len = boxes.length; j < len; j++) {
        box = boxes[j];
        if (id === box.id) {
          return box;
        }
      }
    };
    getParentOfComponent = function(id) {
      var box, j, len;
      for (j = 0, len = boxes.length; j < len; j++) {
        box = boxes[j];
        if (box.hasComponentWithId(id)) {
          return box;
        }
      }
    };
    getParentOfGeneration = function(id) {
      var box, j, len;
      for (j = 0, len = boxes.length; j < len; j++) {
        box = boxes[j];
        if (box.hasGenerationWithId(id)) {
          return box;
        }
      }
    };
    removeBox = function(doomedBox) {
      var box, i, j, len;
      for (i = j = 0, len = boxes.length; j < len; i = ++j) {
        box = boxes[i];
        if (box.id === doomedBox.id) {
          boxes.splice(i, 1);
          return;
        }
      }
    };
    subscribeToRegistrations();
    addEventListeners();
    addHost();
    return addCluster(clobberBoxDataShim.getCluster().serialize());
  };
})(this);

},{"./shims/data-shim":3,"./test-ui/ui":8}],8:[function(require,module,exports){
var UI;

module.exports = UI = (function() {
  function UI() {
    this.initStateSelector($(".states"));
    this.initEvents();
    PubSub.subscribe('REGISTER', (function(_this) {
      return function(m, box) {
        return _this.registerBox(box);
      };
    })(this));
  }

  UI.prototype.registerBox = function(box) {
    if (box.data.id.includes('gen')) {
      return this.addToSelector($('.generations'), box);
    } else {
      return this.addToSelector($('.hosts'), box);
    }
  };

  UI.prototype.addToSelector = function($selector, box) {
    if ($("option[value='" + box.data.id + "']", $selector).length !== 0) {
      return;
    }
    return $selector.append("<option value='" + box.data.id + "'>" + box.data.id + "</option>");
  };

  UI.prototype.initStateSelector = function($selector) {
    var i, len, results, state, states;
    states = ['', 'created', 'initialized', 'ordered', 'provisioning', 'defunct', 'active', 'decomissioning', 'destroy', 'archived'];
    results = [];
    for (i = 0, len = states.length; i < len; i++) {
      state = states[i];
      results.push($selector.append("<option value='" + state + "'>" + state + "</option>"));
    }
    return results;
  };

  UI.prototype.initEvents = function() {
    $("button#hosts").on('click', (function(_this) {
      return function() {
        var id, state;
        id = $("select#hosts-state-selector").val();
        state = $("select#host-states").val();
        return setState(id, state);
      };
    })(this));
    $("button#generations").on('click', (function(_this) {
      return function() {
        var id, state;
        id = $("select#generations-state-selector").val();
        state = $("select#gen-states").val();
        return setGenerationState(id, state);
      };
    })(this));
    $("button#add-generation").on('click', (function(_this) {
      return function() {
        return addGeneration($("select#add-generation-select").val());
      };
    })(this));
    $("button#remove-generation").on('click', (function(_this) {
      return function() {
        return removeGeneration($("select#remove-generation-select").val());
      };
    })(this));
    $("button#add-component").on('click', (function(_this) {
      return function() {
        return addComponent($("select#add-component-select").val());
      };
    })(this));
    return $("button#remove-component").on('click', (function(_this) {
      return function() {
        return removeComponent($("select#remove-component-select").val());
      };
    })(this));
  };

  UI.prototype.noteComponents = function(box) {
    var $selector, component, i, len, ref, results;
    $selector = $("select.components");
    ref = box.data.appComponents;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      results.push($selector.append("<option value='" + component.id + "'>" + component.id + "</option>"));
    }
    return results;
  };

  return UI;

})();

},{}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvYXBwLWNvbXBvbmVudC5jb2ZmZWUiLCJzaGltcy9jbHVzdGVyLmNvZmZlZSIsInNoaW1zL2RhdGEtc2hpbS5jb2ZmZWUiLCJzaGltcy9nZW5lcmF0aW9uLmNvZmZlZSIsInNoaW1zL2hvc3QuY29mZmVlIiwic2hpbXMvcGxhdGZvcm0tY29tcG9uZW50LmNvZmZlZSIsInN0YWdlLmNvZmZlZSIsInRlc3QtdWkvdWkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHBDb21wb25lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwQ29tcG9uZW50ID0gKGZ1bmN0aW9uKCkge1xuICBBcHBDb21wb25lbnQuYXBwQ29tcG9uZW50Q291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIEFwcENvbXBvbmVudChraW5kLCB0eXBlLCBzY2FsZXNIb3Jpem9udGFsbHkpIHtcbiAgICBpZiAoa2luZCA9PSBudWxsKSB7XG4gICAgICBraW5kID0gJ3dlYic7XG4gICAgfVxuICAgIHRoaXMudHlwZSA9IHR5cGUgIT0gbnVsbCA/IHR5cGUgOiBcInJ1YnlcIjtcbiAgICB0aGlzLnNjYWxlc0hvcml6b250YWxseSA9IHNjYWxlc0hvcml6b250YWxseSAhPSBudWxsID8gc2NhbGVzSG9yaXpvbnRhbGx5IDogdHJ1ZTtcbiAgICB0aGlzLmdlbmVyYXRpb25Db3VudCA9IDE7XG4gICAgdGhpcy5zdGF0ZSA9ICdhY3RpdmUnO1xuICAgIHRoaXMuc2VydmVyU3BlY3NJZCA9IFwiYjNcIjtcbiAgICB0aGlzLmlkID0ga2luZCArIFwiLlwiICsgKCsrQXBwQ29tcG9uZW50LmFwcENvbXBvbmVudENvdW50KTtcbiAgICB0aGlzLm5hbWUgPSBraW5kICsgXCIgXCIgKyBBcHBDb21wb25lbnQuYXBwQ29tcG9uZW50Q291bnQ7XG4gICAgdGhpcy5nZW5lcmF0aW9ucyA9IFtdO1xuICAgIHRoaXMuYWRkR2VuZXJhdGlvbigpO1xuICB9XG5cbiAgQXBwQ29tcG9uZW50LnByb3RvdHlwZS5hZGRHZW5lcmF0aW9uID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgc3RhdGUgPSAnYWN0aXZlJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGlvbnMucHVzaCh7XG4gICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICBpZDogdGhpcy5pZCArIFwiLmdlblwiICsgKHRoaXMuZ2VuZXJhdGlvbkNvdW50KyspXG4gICAgfSk7XG4gIH07XG5cbiAgQXBwQ29tcG9uZW50LnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2VuZXJhdGlvbnM6IHRoaXMuZ2VuZXJhdGlvbnMsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIHNlcnZlclNwZWNzSWQ6IHRoaXMuc2VydmVyU3BlY3NJZCxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgc2VydmljZVR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHNjYWxlc0hvcml6OiB0aGlzLnNjYWxlc0hvcml6b250YWxseVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIEFwcENvbXBvbmVudDtcblxufSkoKTtcbiIsInZhciBBcHBDb21wb25lbnQsIENsdXN0ZXIsIEhvc3QsIHg7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5Ib3N0ID0gcmVxdWlyZSgnLi9ob3N0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2x1c3RlciA9IChmdW5jdGlvbigpIHtcbiAgQ2x1c3Rlci5jbHVzdGVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIENsdXN0ZXIodG90YWxNZW1iZXJzLCB0b3RhbEdlbmVyYXRpb25zKSB7XG4gICAgdmFyIGdlbmVyYXRpb24sIGksIGosIGssIHJlZiwgcmVmMTtcbiAgICBpZiAodG90YWxNZW1iZXJzID09IG51bGwpIHtcbiAgICAgIHRvdGFsTWVtYmVycyA9IDQ7XG4gICAgfVxuICAgIGlmICh0b3RhbEdlbmVyYXRpb25zID09IG51bGwpIHtcbiAgICAgIHRvdGFsR2VuZXJhdGlvbnMgPSAxO1xuICAgIH1cbiAgICB0aGlzLmlkID0gXCJjbHVzdGVyLlwiICsgQ2x1c3Rlci5jbHVzdGVyQ291bnQ7XG4gICAgdGhpcy5uYW1lID0gXCJ3ZWIgXCIgKyAoKytBcHBDb21wb25lbnQuYXBwQ29tcG9uZW50Q291bnQpO1xuICAgIHRoaXMuc3RhdGUgPSBcImFjdGl2ZVwiO1xuICAgIHRoaXMuc2VydmljZVR5cGUgPSBcInJ1YnlcIjtcbiAgICB0aGlzLnNjYWxlc0hvcml6ID0gdHJ1ZTtcbiAgICB0aGlzLnNjYWxlc1JlZHVuZCA9IGZhbHNlO1xuICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICBmb3IgKGkgPSBqID0gMSwgcmVmID0gdG90YWxHZW5lcmF0aW9uczsgMSA8PSByZWYgPyBqIDw9IHJlZiA6IGogPj0gcmVmOyBpID0gMSA8PSByZWYgPyArK2ogOiAtLWopIHtcbiAgICAgIGdlbmVyYXRpb24gPSB7XG4gICAgICAgIGlkOiBcIndlYi5tYWluLmdlblwiICsgaSxcbiAgICAgICAgc3RhdGU6IFwiYWN0aXZlXCIsXG4gICAgICAgIHN0YXR1czogXCJvbmxpbmVcIixcbiAgICAgICAgaW5zdGFuY2VzOiBbXVxuICAgICAgfTtcbiAgICAgIGZvciAoaSA9IGsgPSAxLCByZWYxID0gdG90YWxNZW1iZXJzOyAxIDw9IHJlZjEgPyBrIDw9IHJlZjEgOiBrID49IHJlZjE7IGkgPSAxIDw9IHJlZjEgPyArK2sgOiAtLWspIHtcbiAgICAgICAgZ2VuZXJhdGlvbi5pbnN0YW5jZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgaG9zdElkOiBcImRvLlwiICsgaSxcbiAgICAgICAgICBob3N0TmFtZTogXCJkby5cIiArIGksXG4gICAgICAgICAgc3RhdGU6IFwiYWN0aXZlXCIsXG4gICAgICAgICAgc3RhdHVzOiBcIm9ubGluZVwiLFxuICAgICAgICAgIHJvbGU6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgIHNlcnZlclNwZWNzSWQ6IFwiYjJcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2VuZXJhdGlvbnMucHVzaChnZW5lcmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBDbHVzdGVyLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIHNjYWxlc0hvcml6OiB0aGlzLnNjYWxlc0hvcml6LFxuICAgICAgc2NhbGVzUmVkdW5kOiB0aGlzLnNjYWxlc1JlZHVuZCxcbiAgICAgIGdlbmVyYXRpb25zOiB0aGlzLmdlbmVyYXRpb25zLFxuICAgICAgc2VydmljZVR5cGU6IHRoaXMuc2VydmljZVR5cGVcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBDbHVzdGVyO1xuXG59KSgpO1xuXG54ID0ge1xuICBcImlkXCI6IFwid2ViLm1haW5cIixcbiAgXCJuYW1lXCI6IFwiamFkZS1qdWdcIixcbiAgXCJzdGF0ZVwiOiBcImFjdGl2ZVwiLFxuICBcInNlcnZpY2VUeXBlXCI6IFwiZGVmYXVsdFwiLFxuICBcInNjYWxlc0hvcml6XCI6IHRydWUsXG4gIFwic2NhbGVzUmVkdW5kXCI6IGZhbHNlLFxuICBcImdlbmVyYXRpb25zXCI6IFtcbiAgICB7XG4gICAgICBcImlkXCI6IFwid2ViLm1haW4uZ2VuMlwiLFxuICAgICAgXCJzdGF0ZVwiOiBcImFjdGl2ZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJvbmxpbmVcIixcbiAgICAgIFwiaW5zdGFuY2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwiaWRcIjogMSxcbiAgICAgICAgICBcImhvc3RJZFwiOiBcImRvLjJcIixcbiAgICAgICAgICBcImhvc3ROYW1lXCI6IFwiZG8uMlwiLFxuICAgICAgICAgIFwic3RhdGVcIjogXCJhY3RpdmVcIixcbiAgICAgICAgICBcInN0YXR1c1wiOiBcIm9ubGluZVwiLFxuICAgICAgICAgIFwicm9sZVwiOiBcImRlZmF1bHRcIixcbiAgICAgICAgICBcInNlcnZlclNwZWNzSWRcIjogXCI1MTJtYlwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn07XG4iLCJ2YXIgQXBwQ29tcG9uZW50LCBDbG9iYmVyQm94RGF0YVNoaW0sIENsdXN0ZXIsIEdlbmVyYXRpb24sIEhvc3QsIFBsYXRmb3JtQ29tcG9uZW50O1xuXG5BcHBDb21wb25lbnQgPSByZXF1aXJlKCcuL2FwcC1jb21wb25lbnQnKTtcblxuUGxhdGZvcm1Db21wb25lbnQgPSByZXF1aXJlKCcuL3BsYXRmb3JtLWNvbXBvbmVudCcpO1xuXG5Ib3N0ID0gcmVxdWlyZSgnLi9ob3N0Jyk7XG5cbkNsdXN0ZXIgPSByZXF1aXJlKCcuL2NsdXN0ZXInKTtcblxuR2VuZXJhdGlvbiA9IHJlcXVpcmUoJy4vZ2VuZXJhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENsb2JiZXJCb3hEYXRhU2hpbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQ2xvYmJlckJveERhdGFTaGltKCkge31cblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldEhvc3QgPSBmdW5jdGlvbihtYWtlTG90c09mQ29tcG9uZW50cykge1xuICAgIGlmIChtYWtlTG90c09mQ29tcG9uZW50cyA9PSBudWxsKSB7XG4gICAgICBtYWtlTG90c09mQ29tcG9uZW50cyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEhvc3QobWFrZUxvdHNPZkNvbXBvbmVudHMpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0Q2x1c3RlciA9IGZ1bmN0aW9uKHRvdGFsTWVtYmVycykge1xuICAgIHJldHVybiBuZXcgQ2x1c3Rlcih0b3RhbE1lbWJlcnMpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0QXBwQ29tcG9uZW50ID0gZnVuY3Rpb24oa2luZCwgdHlwZSwgc2NhbGVzSG9yaXpvbnRhbGx5KSB7XG4gICAgcmV0dXJuIG5ldyBBcHBDb21wb25lbnQoa2luZCwgdHlwZSwgc2NhbGVzSG9yaXpvbnRhbGx5KTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldFBsYXRmb3JtQ29tcG9uZW50ID0gZnVuY3Rpb24oaWQsIGtpbmQpIHtcbiAgICByZXR1cm4gbmV3IFBsYXRmb3JtQ29tcG9uZW50KGlkLCBraW5kKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldEdlbmVyYXRpb24gPSBmdW5jdGlvbihwYXJlbnRJZCwgc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRpb24ocGFyZW50SWQsIHN0YXRlKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLnJlc2V0Q291bnRzID0gZnVuY3Rpb24oKSB7XG4gICAgSG9zdC5ob3N0Q291bnQgPSAwO1xuICAgIEFwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCA9IDA7XG4gICAgcmV0dXJuIENsdXN0ZXIuY2x1c3RlckNvdW50ID0gMDtcbiAgfTtcblxuICByZXR1cm4gQ2xvYmJlckJveERhdGFTaGltO1xuXG59KSgpO1xuIiwidmFyIEdlbmVyYXRpb247XG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJhdGlvbiA9IChmdW5jdGlvbigpIHtcbiAgR2VuZXJhdGlvbi5nZW5lcmljR2VuZXJhdGlvbkNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBHZW5lcmF0aW9uKHBhcmVudElkLCBzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XG4gICAgICBzdGF0ZSA9ICdhY3RpdmUnO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgdGhpcy5pZCA9IHBhcmVudElkICsgXCIuZ2VuXCIgKyAoR2VuZXJhdGlvbi5nZW5lcmljR2VuZXJhdGlvbkNvdW50KyspO1xuICB9XG5cbiAgR2VuZXJhdGlvbi5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgaWQ6IHRoaXMuaWRcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBHZW5lcmF0aW9uO1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgSG9zdCwgUGxhdGZvcm1Db21wb25lbnQ7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5QbGF0Zm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcGxhdGZvcm0tY29tcG9uZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSG9zdCA9IChmdW5jdGlvbigpIHtcbiAgSG9zdC5ob3N0Q291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIEhvc3QobWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICBpZiAobWFrZUxvdHNPZkNvbXBvbmVudHMgPT0gbnVsbCkge1xuICAgICAgbWFrZUxvdHNPZkNvbXBvbmVudHMgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gICAgdGhpcy5pZCA9IFwiaG9zdC5cIiArICgrK0hvc3QuaG9zdENvdW50KTtcbiAgICB0aGlzLm5hbWUgPSBcImVjMi5cIiArIEhvc3QuaG9zdENvdW50O1xuICAgIHRoaXMuc2VydmVyU3BlY3NJZCA9IFwiYjFcIjtcbiAgICB0aGlzLnBsYXRmb3JtQ29tcG9uZW50cyA9IFtuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJsYlwiLCBcIm1lc2hcIiksIG5ldyBQbGF0Zm9ybUNvbXBvbmVudChcImxnXCIsIFwibG9nZ2VyXCIpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJobVwiLCBcIm1vbml0b3JcIiksIG5ldyBQbGF0Zm9ybUNvbXBvbmVudChcIm1yXCIsIFwicHVzaGVyXCIpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJnc1wiLCBcIndhcmVob3VzZVwiKV07XG4gICAgdGhpcy5hcHBDb21wb25lbnRzID0gW107XG4gICAgdGhpcy5jcmVhdGVDb21wb25lbnRzKG1ha2VMb3RzT2ZDb21wb25lbnRzKTtcbiAgfVxuXG4gIEhvc3QucHJvdG90eXBlLmNyZWF0ZUNvbXBvbmVudHMgPSBmdW5jdGlvbihtYWtlTG90c09mQ29tcG9uZW50cykge1xuICAgIGlmICghbWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCk7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ21vbmdvLWRiJywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ21vbmdvLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdub2RlJywgdHJ1ZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ21lbWNhY2hlZCcsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdweXRob24nLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAnc3RvcmFnZScsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdqYXZhJywgdHJ1ZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ3BocCcsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ2NvdWNoLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ21hcmlhLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ3Bvc3RncmVzLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ3JlZGlzJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ3BlcmNvbmEtZGInLCBmYWxzZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ2RlZmF1bHQnLCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLmFkZENvbXBvbmVudCgnZGInLCAnZGVmYXVsdC1kYicsIGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgSG9zdC5wcm90b3R5cGUuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24oa2luZCwgdHlwZSwgaXNIb3Jpem9udGFsbHlTY2FsYWJsZSkge1xuICAgIHJldHVybiB0aGlzLmFwcENvbXBvbmVudHMucHVzaChuZXcgQXBwQ29tcG9uZW50KGtpbmQsIHR5cGUsIGlzSG9yaXpvbnRhbGx5U2NhbGFibGUpKTtcbiAgfTtcblxuICBIb3N0LnByb3RvdHlwZS5zZXJpYWxpemVDb21wb25lbnRzID0gZnVuY3Rpb24oY29tcG9uZW50cykge1xuICAgIHZhciBhciwgY29tcG9uZW50LCBpLCBsZW47XG4gICAgYXIgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBjb21wb25lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb21wb25lbnQgPSBjb21wb25lbnRzW2ldO1xuICAgICAgYXIucHVzaChjb21wb25lbnQuc2VyaWFsaXplKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXI7XG4gIH07XG5cbiAgSG9zdC5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBzZXJ2ZXJTcGVjc0lkOiB0aGlzLnNlcnZlclNwZWNzSWQsXG4gICAgICBwbGF0Zm9ybUNvbXBvbmVudHM6IHRoaXMuc2VyaWFsaXplQ29tcG9uZW50cyh0aGlzLnBsYXRmb3JtQ29tcG9uZW50cyksXG4gICAgICBhcHBDb21wb25lbnRzOiB0aGlzLnNlcmlhbGl6ZUNvbXBvbmVudHModGhpcy5hcHBDb21wb25lbnRzKVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIEhvc3Q7XG5cbn0pKCk7XG4iLCJ2YXIgUGxhdGZvcm1Db21wb25lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxhdGZvcm1Db21wb25lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBsYXRmb3JtQ29tcG9uZW50KGlkLCBraW5kKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMua2luZCA9IGtpbmQ7XG4gICAgdGhpcy5pc1NwbGl0YWJsZSA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG4gICAgdGhpcy5zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gIH1cblxuICBQbGF0Zm9ybUNvbXBvbmVudC5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAga2luZDogdGhpcy5raW5kLFxuICAgICAgaXNTcGxpdGFibGU6IHRoaXMuaXNTcGxpdGFibGUsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIFBsYXRmb3JtQ29tcG9uZW50O1xuXG59KSgpO1xuIiwidmFyICRob2xkZXIsIENsb2JiZXJCb3hEYXRhU2hpbSwgVUksIGJveGVzO1xuXG5VSSA9IHJlcXVpcmUoJy4vdGVzdC11aS91aScpO1xuXG5DbG9iYmVyQm94RGF0YVNoaW0gPSByZXF1aXJlKCcuL3NoaW1zL2RhdGEtc2hpbScpO1xuXG53aW5kb3cuY2xvYmJlckJveERhdGFTaGltID0gbmV3IENsb2JiZXJCb3hEYXRhU2hpbSgpO1xuXG5ib3hlcyA9IFtdO1xuXG4kaG9sZGVyID0gJChcIi5ob2xkZXJcIik7XG5cbndpbmRvdy5pbml0ID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYWRkRXZlbnRMaXN0ZW5lcnMsIGdldEJveCwgZ2V0UGFyZW50T2ZDb21wb25lbnQsIGdldFBhcmVudE9mR2VuZXJhdGlvbiwgcmVtb3ZlQm94LCBzdWJzY3JpYmVUb1JlZ2lzdHJhdGlvbnMsIHVpO1xuICAgIHN0YXRzRGF0YVNpbXVsdG9yLmNyZWF0ZUZha2VTdGF0RGF0YVByb3ZpZGVyKCk7XG4gICAgdWkgPSBuZXcgVUkoJCgnYm9keScpKTtcbiAgICB3aW5kb3cuYWRkR2VuZXJhdGlvbiA9IGZ1bmN0aW9uKGNvbXBvbmVudElkLCBzdGF0ZSkge1xuICAgICAgdmFyIGdlbkRhdGE7XG4gICAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgICBzdGF0ZSA9ICdwcm92aXNpb25pbmcnO1xuICAgICAgfVxuICAgICAgZ2VuRGF0YSA9IGNsb2JiZXJCb3hEYXRhU2hpbS5nZXRHZW5lcmF0aW9uKGNvbXBvbmVudElkLCBzdGF0ZSkuc2VyaWFsaXplKCk7XG4gICAgICByZXR1cm4gZ2V0UGFyZW50T2ZDb21wb25lbnQoY29tcG9uZW50SWQpLmFkZEdlbmVyYXRpb24oY29tcG9uZW50SWQsIGdlbkRhdGEpO1xuICAgIH07XG4gICAgd2luZG93LmFkZENvbXBvbmVudCA9IGZ1bmN0aW9uKGhvc3RJZCkge1xuICAgICAgcmV0dXJuIGdldEJveChob3N0SWQpLmFkZENvbXBvbmVudChjbG9iYmVyQm94RGF0YVNoaW0uZ2V0QXBwQ29tcG9uZW50KCkuc2VyaWFsaXplKCkpO1xuICAgIH07XG4gICAgd2luZG93LnJlbW92ZUNvbXBvbmVudCA9IGZ1bmN0aW9uKGNvbXBvbmVudElkKSB7XG4gICAgICByZXR1cm4gZ2V0UGFyZW50T2ZDb21wb25lbnQoY29tcG9uZW50SWQpLnJlbW92ZUNvbXBvbmVudChjb21wb25lbnRJZCk7XG4gICAgfTtcbiAgICB3aW5kb3cucmVtb3ZlR2VuZXJhdGlvbiA9IGZ1bmN0aW9uKGdlbmVyYXRpb25JZCkge1xuICAgICAgcmV0dXJuIGdldFBhcmVudE9mR2VuZXJhdGlvbihnZW5lcmF0aW9uSWQpLnJlbW92ZUdlbmVyYXRpb24oZ2VuZXJhdGlvbklkKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRIb3N0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaG9zdEJveDtcbiAgICAgIGhvc3RCb3ggPSBuZXcgbmFub2JveC5DbG9iYmVyQm94KCk7XG4gICAgICBob3N0Qm94LmJ1aWxkKCRob2xkZXIsIG5hbm9ib3guQ2xvYmJlckJveC5IT1NULCBjbG9iYmVyQm94RGF0YVNoaW0uZ2V0SG9zdCh0cnVlKS5zZXJpYWxpemUoKSk7XG4gICAgICByZXR1cm4gdWkubm90ZUNvbXBvbmVudHMoaG9zdEJveCk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkQ2x1c3RlciA9IGZ1bmN0aW9uKGNsdXN0ZXJEYXRhKSB7XG4gICAgICB2YXIgY2x1c3RlckJveCwgZGF0YSwgZ2VuZXJhdGlvbiwgaiwgbGVuLCByZWYsIHJlc3VsdHM7XG4gICAgICByZWYgPSBjbHVzdGVyRGF0YS5nZW5lcmF0aW9ucztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBnZW5lcmF0aW9uID0gcmVmW2pdO1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgIHNlcnZpY2VJZDogY2x1c3RlckRhdGEuaWQsXG4gICAgICAgICAgc2VydmljZVN0YXRlOiBjbHVzdGVyRGF0YS5zdGF0ZSxcbiAgICAgICAgICBuYW1lOiBjbHVzdGVyRGF0YS5uYW1lLFxuICAgICAgICAgIHNlcnZpY2VUeXBlOiBjbHVzdGVyRGF0YS5zZXJ2aWNlVHlwZSxcbiAgICAgICAgICBzY2FsZXNIb3JpejogY2x1c3RlckRhdGEuc2NhbGVzSG9yaXosXG4gICAgICAgICAgc2NhbGVzUmVkdW5kOiBjbHVzdGVyRGF0YS5zY2FsZXNSZWR1bmQsXG4gICAgICAgICAgaW5zdGFuY2VzOiBjbHVzdGVyRGF0YS5pbnN0YW5jZXMsXG4gICAgICAgICAgaWQ6IGdlbmVyYXRpb24uaWQsXG4gICAgICAgICAgZ2VuZXJhdGlvblN0YXRlOiBnZW5lcmF0aW9uLnN0YXRlLFxuICAgICAgICAgIGdlbmVyYXRpb25TdGF0dXM6IGdlbmVyYXRpb24uc3RhdHVzLFxuICAgICAgICAgIG1lbWJlcnM6IGdlbmVyYXRpb24uaW5zdGFuY2VzLFxuICAgICAgICAgIHRvdGFsTWVtYmVyczogZ2VuZXJhdGlvbi5pbnN0YW5jZXMubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICAgIGNsdXN0ZXJCb3ggPSBuZXcgbmFub2JveC5DbG9iYmVyQm94KCk7XG4gICAgICAgIHJlc3VsdHMucHVzaChjbHVzdGVyQm94LmJ1aWxkKCRob2xkZXIsIG5hbm9ib3guQ2xvYmJlckJveC5DTFVTVEVSLCBkYXRhKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIHdpbmRvdy5zZXRTdGF0ZSA9IGZ1bmN0aW9uKGlkLCBzdGF0ZSkge1xuICAgICAgcmV0dXJuIGdldEJveChpZCkuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH07XG4gICAgd2luZG93LnNldEdlbmVyYXRpb25TdGF0ZSA9IGZ1bmN0aW9uKGlkLCBzdGF0ZSkge1xuICAgICAgcmV0dXJuIGdldFBhcmVudE9mR2VuZXJhdGlvbihpZCkuc2V0R2VuZXJhdGlvblN0YXRlKGlkLCBzdGF0ZSk7XG4gICAgfTtcbiAgICBzdWJzY3JpYmVUb1JlZ2lzdHJhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NDQUxFLkdFVF9PUFRJT05TJywgZnVuY3Rpb24obSwgY2IpIHtcbiAgICAgICAgcmV0dXJuIGNiKHNjYWxlTWFjaGluZVRlc3REYXRhLmdldEhvc3RPcHRpb25zKCkpO1xuICAgICAgfSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdSRUdJU1RFUicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgYm94KSB7XG4gICAgICAgICAgcmV0dXJuIGJveGVzLnB1c2goYm94KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1VOUkVHSVNURVInLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGJveCkge1xuICAgICAgICAgIHJldHVybiByZW1vdmVCb3goYm94KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIHJldHVybiBQdWJTdWIuc3Vic2NyaWJlKCdTQ0FMRScsIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOZXcgU2NhbGU6XCIpO1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLkFQUF9DT01QT05FTlRTJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdhcHAtY29tcG9uZW50cycsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU0hPVy5QTEFURk9STV9DT01QT05FTlRTJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdwbGF0Zm9ybS1jb21wb25lbnRzJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLklOU1RBTkNFUycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge307XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlNDQUxFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdzY2FsZS1tYWNoaW5lJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlNUQVRTJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdzdGF0cycsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU0hPVy5DT05TT0xFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdjb25zb2xlJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlNQTElUJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdzcGxpdCcsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgcmV0dXJuIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuQURNSU4nLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ2FkbWluJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcbiAgICBnZXRCb3ggPSBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGJveCwgaiwgbGVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gYm94ZXMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgYm94ID0gYm94ZXNbal07XG4gICAgICAgIGlmIChpZCA9PT0gYm94LmlkKSB7XG4gICAgICAgICAgcmV0dXJuIGJveDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZ2V0UGFyZW50T2ZDb21wb25lbnQgPSBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGJveCwgaiwgbGVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gYm94ZXMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgYm94ID0gYm94ZXNbal07XG4gICAgICAgIGlmIChib3guaGFzQ29tcG9uZW50V2l0aElkKGlkKSkge1xuICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGdldFBhcmVudE9mR2VuZXJhdGlvbiA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgYm94LCBqLCBsZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSBib3hlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBib3ggPSBib3hlc1tqXTtcbiAgICAgICAgaWYgKGJveC5oYXNHZW5lcmF0aW9uV2l0aElkKGlkKSkge1xuICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJlbW92ZUJveCA9IGZ1bmN0aW9uKGRvb21lZEJveCkge1xuICAgICAgdmFyIGJveCwgaSwgaiwgbGVuO1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IGJveGVzLmxlbmd0aDsgaiA8IGxlbjsgaSA9ICsraikge1xuICAgICAgICBib3ggPSBib3hlc1tpXTtcbiAgICAgICAgaWYgKGJveC5pZCA9PT0gZG9vbWVkQm94LmlkKSB7XG4gICAgICAgICAgYm94ZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgc3Vic2NyaWJlVG9SZWdpc3RyYXRpb25zKCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRIb3N0KCk7XG4gICAgcmV0dXJuIGFkZENsdXN0ZXIoY2xvYmJlckJveERhdGFTaGltLmdldENsdXN0ZXIoKS5zZXJpYWxpemUoKSk7XG4gIH07XG59KSh0aGlzKTtcbiIsInZhciBVSTtcblxubW9kdWxlLmV4cG9ydHMgPSBVSSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVUkoKSB7XG4gICAgdGhpcy5pbml0U3RhdGVTZWxlY3RvcigkKFwiLnN0YXRlc1wiKSk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gICAgUHViU3ViLnN1YnNjcmliZSgnUkVHSVNURVInLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihtLCBib3gpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnJlZ2lzdGVyQm94KGJveCk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfVxuXG4gIFVJLnByb3RvdHlwZS5yZWdpc3RlckJveCA9IGZ1bmN0aW9uKGJveCkge1xuICAgIGlmIChib3guZGF0YS5pZC5pbmNsdWRlcygnZ2VuJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFRvU2VsZWN0b3IoJCgnLmdlbmVyYXRpb25zJyksIGJveCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFRvU2VsZWN0b3IoJCgnLmhvc3RzJyksIGJveCk7XG4gICAgfVxuICB9O1xuXG4gIFVJLnByb3RvdHlwZS5hZGRUb1NlbGVjdG9yID0gZnVuY3Rpb24oJHNlbGVjdG9yLCBib3gpIHtcbiAgICBpZiAoJChcIm9wdGlvblt2YWx1ZT0nXCIgKyBib3guZGF0YS5pZCArIFwiJ11cIiwgJHNlbGVjdG9yKS5sZW5ndGggIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICRzZWxlY3Rvci5hcHBlbmQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIGJveC5kYXRhLmlkICsgXCInPlwiICsgYm94LmRhdGEuaWQgKyBcIjwvb3B0aW9uPlwiKTtcbiAgfTtcblxuICBVSS5wcm90b3R5cGUuaW5pdFN0YXRlU2VsZWN0b3IgPSBmdW5jdGlvbigkc2VsZWN0b3IpIHtcbiAgICB2YXIgaSwgbGVuLCByZXN1bHRzLCBzdGF0ZSwgc3RhdGVzO1xuICAgIHN0YXRlcyA9IFsnJywgJ2NyZWF0ZWQnLCAnaW5pdGlhbGl6ZWQnLCAnb3JkZXJlZCcsICdwcm92aXNpb25pbmcnLCAnZGVmdW5jdCcsICdhY3RpdmUnLCAnZGVjb21pc3Npb25pbmcnLCAnZGVzdHJveScsICdhcmNoaXZlZCddO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBzdGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHN0YXRlID0gc3RhdGVzW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKCRzZWxlY3Rvci5hcHBlbmQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIHN0YXRlICsgXCInPlwiICsgc3RhdGUgKyBcIjwvb3B0aW9uPlwiKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIFVJLnByb3RvdHlwZS5pbml0RXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgJChcImJ1dHRvbiNob3N0c1wiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkLCBzdGF0ZTtcbiAgICAgICAgaWQgPSAkKFwic2VsZWN0I2hvc3RzLXN0YXRlLXNlbGVjdG9yXCIpLnZhbCgpO1xuICAgICAgICBzdGF0ZSA9ICQoXCJzZWxlY3QjaG9zdC1zdGF0ZXNcIikudmFsKCk7XG4gICAgICAgIHJldHVybiBzZXRTdGF0ZShpZCwgc3RhdGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgJChcImJ1dHRvbiNnZW5lcmF0aW9uc1wiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkLCBzdGF0ZTtcbiAgICAgICAgaWQgPSAkKFwic2VsZWN0I2dlbmVyYXRpb25zLXN0YXRlLXNlbGVjdG9yXCIpLnZhbCgpO1xuICAgICAgICBzdGF0ZSA9ICQoXCJzZWxlY3QjZ2VuLXN0YXRlc1wiKS52YWwoKTtcbiAgICAgICAgcmV0dXJuIHNldEdlbmVyYXRpb25TdGF0ZShpZCwgc3RhdGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgJChcImJ1dHRvbiNhZGQtZ2VuZXJhdGlvblwiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFkZEdlbmVyYXRpb24oJChcInNlbGVjdCNhZGQtZ2VuZXJhdGlvbi1zZWxlY3RcIikudmFsKCkpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgJChcImJ1dHRvbiNyZW1vdmUtZ2VuZXJhdGlvblwiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZUdlbmVyYXRpb24oJChcInNlbGVjdCNyZW1vdmUtZ2VuZXJhdGlvbi1zZWxlY3RcIikudmFsKCkpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgJChcImJ1dHRvbiNhZGQtY29tcG9uZW50XCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYWRkQ29tcG9uZW50KCQoXCJzZWxlY3QjYWRkLWNvbXBvbmVudC1zZWxlY3RcIikudmFsKCkpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgcmV0dXJuICQoXCJidXR0b24jcmVtb3ZlLWNvbXBvbmVudFwiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZUNvbXBvbmVudCgkKFwic2VsZWN0I3JlbW92ZS1jb21wb25lbnQtc2VsZWN0XCIpLnZhbCgpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9O1xuXG4gIFVJLnByb3RvdHlwZS5ub3RlQ29tcG9uZW50cyA9IGZ1bmN0aW9uKGJveCkge1xuICAgIHZhciAkc2VsZWN0b3IsIGNvbXBvbmVudCwgaSwgbGVuLCByZWYsIHJlc3VsdHM7XG4gICAgJHNlbGVjdG9yID0gJChcInNlbGVjdC5jb21wb25lbnRzXCIpO1xuICAgIHJlZiA9IGJveC5kYXRhLmFwcENvbXBvbmVudHM7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29tcG9uZW50ID0gcmVmW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKCRzZWxlY3Rvci5hcHBlbmQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIGNvbXBvbmVudC5pZCArIFwiJz5cIiArIGNvbXBvbmVudC5pZCArIFwiPC9vcHRpb24+XCIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgcmV0dXJuIFVJO1xuXG59KSgpO1xuIl19

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TestData;

module.exports = TestData = (function() {
  function TestData() {
    this.createFakeStatDataProvider();
  }

  TestData.prototype.createFakeStatDataProvider = function() {
    PubSub.subscribe('STATS.SUBSCRIBE.HOURLY_AVERAGE', (function(_this) {
      return function(m, data) {
        return hourlyAverageDataSimulator.waitForData(data);
      };
    })(this));
    return PubSub.subscribe('STATS.UNSUBSCRIBE', (function(_this) {
      return function(m, data) {};
    })(this));
  };

  TestData.prototype.waitForData = function(data) {
    data.callback(hourlyAverageDataSimulator.generateHourlyAverages());
    return setInterval(function() {
      if (window.enableUpdates) {
        return data.callback(hourlyAverageDataSimulator.generateHourlyAverages());
      }
    }, 5000);
  };

  TestData.prototype.generateHourlyAverages = function() {
    var data, hour, i, j, len, quarter, ref;
    data = [];
    for (hour = i = 0; i < 24; hour = ++i) {
      ref = [0, 15, 30, 45];
      for (j = 0, len = ref.length; j < len; j++) {
        quarter = ref[j];
        data.push({
          time: (("0" + hour).slice(-2)) + ":" + (("0" + quarter).slice(-2)),
          value: (Math.random() * 1.00) + 0.00
        });
      }
    }
    return data;
  };

  return TestData;

})();

},{}],2:[function(require,module,exports){
var TestData;

TestData = require('./shim/test-data');

window.hourlyAverageDataSimulator = new TestData();

window.init = function() {
  var hourly;
  hourly = new nanobox.HourlyAverage($("body"));
  return hourly.build();
};

},{"./shim/test-data":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS90ZXN0LWRhdGEuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBUZXN0RGF0YTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0RGF0YSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVGVzdERhdGEoKSB7XG4gICAgdGhpcy5jcmVhdGVGYWtlU3RhdERhdGFQcm92aWRlcigpO1xuICB9XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmNyZWF0ZUZha2VTdGF0RGF0YVByb3ZpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgUHViU3ViLnN1YnNjcmliZSgnU1RBVFMuU1VCU0NSSUJFLkhPVVJMWV9BVkVSQUdFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICByZXR1cm4gaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3Iud2FpdEZvckRhdGEoZGF0YSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICByZXR1cm4gUHViU3ViLnN1YnNjcmliZSgnU1RBVFMuVU5TVUJTQ1JJQkUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7fTtcbiAgICB9KSh0aGlzKSk7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLndhaXRGb3JEYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGRhdGEuY2FsbGJhY2soaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IuZ2VuZXJhdGVIb3VybHlBdmVyYWdlcygpKTtcbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAod2luZG93LmVuYWJsZVVwZGF0ZXMpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY2FsbGJhY2soaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IuZ2VuZXJhdGVIb3VybHlBdmVyYWdlcygpKTtcbiAgICAgIH1cbiAgICB9LCA1MDAwKTtcbiAgfTtcblxuICBUZXN0RGF0YS5wcm90b3R5cGUuZ2VuZXJhdGVIb3VybHlBdmVyYWdlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhLCBob3VyLCBpLCBqLCBsZW4sIHF1YXJ0ZXIsIHJlZjtcbiAgICBkYXRhID0gW107XG4gICAgZm9yIChob3VyID0gaSA9IDA7IGkgPCAyNDsgaG91ciA9ICsraSkge1xuICAgICAgcmVmID0gWzAsIDE1LCAzMCwgNDVdO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIHF1YXJ0ZXIgPSByZWZbal07XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZTogKChcIjBcIiArIGhvdXIpLnNsaWNlKC0yKSkgKyBcIjpcIiArICgoXCIwXCIgKyBxdWFydGVyKS5zbGljZSgtMikpLFxuICAgICAgICAgIHZhbHVlOiAoTWF0aC5yYW5kb20oKSAqIDEuMDApICsgMC4wMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgcmV0dXJuIFRlc3REYXRhO1xuXG59KSgpO1xuIiwidmFyIFRlc3REYXRhO1xuXG5UZXN0RGF0YSA9IHJlcXVpcmUoJy4vc2hpbS90ZXN0LWRhdGEnKTtcblxud2luZG93LmhvdXJseUF2ZXJhZ2VEYXRhU2ltdWxhdG9yID0gbmV3IFRlc3REYXRhKCk7XG5cbndpbmRvdy5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3VybHk7XG4gIGhvdXJseSA9IG5ldyBuYW5vYm94LkhvdXJseUF2ZXJhZ2UoJChcImJvZHlcIikpO1xuICByZXR1cm4gaG91cmx5LmJ1aWxkKCk7XG59O1xuIl19

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ScaleDataShim,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = ScaleDataShim = (function() {
  function ScaleDataShim() {
    this.getHostOptions = bind(this.getHostOptions, this);
    this.getServiceSpecs = bind(this.getServiceSpecs, this);
    var providers;
    providers = ["AWS", "LINODE", "DIGITAL_OCEAN", "JOYENT"];
    this.provider = providers[2];
    this.createHash();
  }

  ScaleDataShim.prototype.getSampleScaleId = function() {
    var randomIndex;
    randomIndex = Math.floor(this.providers[this.provider].plans[0].specs.length * Math.random());
    return this.providers[this.provider].plans[0].specs[randomIndex].id;
  };

  ScaleDataShim.prototype.getServiceSpecs = function() {
    var info;
    info = this.getCurrentSpecs();
    info.host = this.provider;
    return JSON.parse(JSON.stringify({
      data: info
    }));
  };

  ScaleDataShim.prototype.getHostOptions = function() {
    return this.getTEMP();
  };

  ScaleDataShim.prototype.getTEMP = function() {
    return {
      "meta": {
        "title": "DigitalOcean",
        "default": "512mb",
        "totalPlans": 9
      },
      "plans": [
        {
          "meta": {
            "title": "Standard"
          },
          "specs": [
            {
              "id": "512mb",
              "RAM": 512,
              "CPU": 1,
              "DISK": 20,
              "transfer": 1,
              "dollarsPerHr": 0.00744,
              "dollarsPerMo": 5
            }, {
              "id": "1gb",
              "RAM": 1024,
              "CPU": 1,
              "DISK": 30,
              "transfer": 2,
              "dollarsPerHr": 0.01488,
              "dollarsPerMo": 10
            }, {
              "id": "2gb",
              "RAM": 2048,
              "CPU": 2,
              "DISK": 40,
              "transfer": 3,
              "dollarsPerHr": 0.02976,
              "dollarsPerMo": 20
            }, {
              "id": "4gb",
              "RAM": 4096,
              "CPU": 2,
              "DISK": 60,
              "transfer": 4,
              "dollarsPerHr": 0.05952,
              "dollarsPerMo": 40
            }, {
              "id": "8gb",
              "RAM": 8192,
              "CPU": 4,
              "DISK": 80,
              "transfer": 5,
              "dollarsPerHr": 0.11905,
              "dollarsPerMo": 80
            }, {
              "id": "16gb",
              "RAM": 16384,
              "CPU": 8,
              "DISK": 160,
              "transfer": 6,
              "dollarsPerHr": 0.2381,
              "dollarsPerMo": 160
            }, {
              "id": "32gb",
              "RAM": 32768,
              "CPU": 12,
              "DISK": 320,
              "transfer": 7,
              "dollarsPerHr": 0.47619,
              "dollarsPerMo": 320
            }, {
              "id": "48gb",
              "RAM": 49152,
              "CPU": 16,
              "DISK": 480,
              "transfer": 8,
              "dollarsPerHr": 0.71429,
              "dollarsPerMo": 480
            }, {
              "id": "64gb",
              "RAM": 65536,
              "CPU": 20,
              "DISK": 640,
              "transfer": 9,
              "dollarsPerHr": 0.95238,
              "dollarsPerMo": 640
            }
          ]
        }
      ]
    };
  };

  ScaleDataShim.prototype.getCurrentSpecs = function() {
    var dict, i, j, len, len1, plan, ref, ref1, spec;
    dict = {
      LINODE: 'a',
      DIGITAL_OCEAN: 'b',
      JOYENT: 'c',
      AWS: 'd'
    };
    this.specId = dict[this.provider] + "2";
    ref = this.providers[this.provider].plans;
    for (i = 0, len = ref.length; i < len; i++) {
      plan = ref[i];
      ref1 = plan.specs;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        spec = ref1[j];
        if (spec.id === this.specId) {
          return {
            ram: spec.RAM,
            cpu: spec.CPU,
            disk: spec.DISK,
            id: spec.id
          };
        }
      }
    }
  };

  ScaleDataShim.prototype.createHash = function() {
    return this.providers = {
      LINODE: {
        meta: {
          title: "Linode",
          "default": "a1",
          totalPlans: 4
        },
        plans: [
          {
            meta: {
              title: "Standard Configuration"
            },
            specs: [
              {
                id: "a1",
                RAM: 1,
                CPU: 1,
                DISK: 24,
                dollarsPerHr: 0.1
              }, {
                id: "a2",
                RAM: 2,
                CPU: 2,
                DISK: 48,
                dollarsPerHr: 0.1
              }, {
                id: "a3",
                RAM: 4,
                CPU: 4,
                DISK: 96,
                dollarsPerHr: 0.1
              }, {
                id: "a4",
                RAM: 8,
                CPU: 6,
                DISK: 192,
                dollarsPerHr: 0.1
              }
            ]
          }
        ]
      },
      DIGITAL_OCEAN: {
        meta: {
          title: "Digital Ocean",
          "default": "b1",
          totalPlans: 9
        },
        plans: [
          {
            meta: {
              title: "Standard"
            },
            specs: [
              {
                id: "b1",
                RAM: 0.5,
                CPU: 1,
                DISK: 20,
                dollarsPerHr: 0.1
              }, {
                id: "b2",
                RAM: 1,
                CPU: 1,
                DISK: 30,
                dollarsPerHr: 0.1
              }, {
                id: "b3",
                RAM: 2,
                CPU: 2,
                DISK: 40,
                dollarsPerHr: 0.1
              }, {
                id: "b4",
                RAM: 4,
                CPU: 2,
                DISK: 60,
                dollarsPerHr: 0.1
              }, {
                id: "b5",
                RAM: 8,
                CPU: 4,
                DISK: 80,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High Volume"
            },
            specs: [
              {
                id: "b6",
                RAM: 16,
                CPU: 8,
                DISK: 160,
                dollarsPerHr: 0.1
              }, {
                id: "b7",
                RAM: 32,
                CPU: 12,
                DISK: 320,
                dollarsPerHr: 0.1
              }, {
                id: "b8",
                RAM: 48,
                CPU: 16,
                DISK: 480,
                dollarsPerHr: 0.1
              }, {
                id: "b9",
                RAM: 64,
                CPU: 20,
                DISK: 640,
                dollarsPerHr: 0.1
              }
            ]
          }
        ]
      },
      JOYENT: {
        meta: {
          title: "Joyent",
          "default": "c1",
          totalPlans: 24
        },
        plans: [
          {
            meta: {
              title: "Standard",
              "default": "c1"
            },
            specs: [
              {
                id: "c1",
                RAM: 1,
                CPU: 0.25,
                DISK: 33,
                dollarsPerHr: 0.1
              }, {
                id: "c2",
                RAM: 1.75,
                CPU: 1,
                DISK: 56,
                dollarsPerHr: 0.1
              }, {
                id: "c3",
                RAM: 2,
                CPU: 1,
                DISK: 66,
                dollarsPerHr: 0.1
              }, {
                id: "c4",
                RAM: 3.75,
                CPU: 1,
                DISK: 123,
                dollarsPerHr: 0.1
              }, {
                id: "c5",
                RAM: 4,
                CPU: 1,
                DISK: 131,
                dollarsPerHr: 0.1
              }, {
                id: "c6",
                RAM: 7.5,
                CPU: 2,
                DISK: 738,
                dollarsPerHr: 0.1
              }, {
                id: "c7",
                RAM: 8,
                CPU: 2,
                DISK: 789,
                dollarsPerHr: 0.1
              }, {
                id: "c8",
                RAM: 15,
                CPU: 4,
                DISK: 1467,
                dollarsPerHr: 0.1
              }, {
                id: "c9",
                RAM: 16,
                CPU: 4,
                DISK: 1575,
                dollarsPerHr: 0.1
              }, {
                id: "c10",
                RAM: 17.13,
                CPU: 5,
                DISK: 1683,
                dollarsPerHr: 0.1
              }, {
                id: "c11",
                RAM: 30,
                CPU: 8,
                DISK: 1683,
                dollarsPerHr: 0.1
              }, {
                id: "c12",
                RAM: 32,
                CPU: 8,
                DISK: 1683,
                dollarsPerHr: 0.1
              }, {
                id: "c13",
                RAM: 40,
                CPU: 10,
                DISK: 1683,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High Memory"
            },
            specs: [
              {
                id: "c14",
                RAM: 17.13,
                CPU: 2,
                DISK: 420,
                dollarsPerHr: 0.1
              }, {
                id: "c15",
                RAM: 34.25,
                CPU: 4,
                DISK: 843,
                dollarsPerHr: 0.1
              }, {
                id: "c16",
                RAM: 68.38,
                CPU: 8,
                DISK: 1122,
                dollarsPerHr: 0.1
              }, {
                id: "c17",
                RAM: 144,
                CPU: 18,
                DISK: 2363,
                dollarsPerHr: 0.1
              }, {
                id: "c18",
                RAM: 256,
                CPU: 32,
                DISK: 4200,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High CPU"
            },
            specs: [
              {
                id: "c19",
                RAM: 1.75,
                CPU: 2,
                DISK: 75,
                dollarsPerHr: 0.1
              }, {
                id: "c20",
                RAM: 7,
                CPU: 7,
                DISK: 263,
                dollarsPerHr: 0.1
              }, {
                id: "c21",
                RAM: 16,
                CPU: 16,
                DISK: 600,
                dollarsPerHr: 0.1
              }, {
                id: "c22",
                RAM: 24,
                CPU: 24,
                DISK: 900,
                dollarsPerHr: 0.1
              }, {
                id: "c23",
                RAM: 32,
                CPU: 32,
                DISK: 1200,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High IO"
            },
            specs: [
              {
                id: "c24",
                RAM: 60.5,
                CPU: 8,
                DISK: 1452,
                dollarsPerHr: 0.1
              }, {
                id: "c25",
                RAM: 128,
                CPU: 16,
                DISK: 3072,
                dollarsPerHr: 0.1
              }, {
                id: "c26",
                RAM: 256,
                CPU: 32,
                DISK: 6144,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High Storage"
            },
            specs: [
              {
                id: "c27",
                RAM: 32,
                CPU: 8,
                DISK: 7680,
                dollarsPerHr: 0.1
              }, {
                id: "c28",
                RAM: 64,
                CPU: 6,
                DISK: 15360,
                dollarsPerHr: 0.1
              }, {
                id: "c29",
                RAM: 128,
                CPU: 2,
                DISK: 30720,
                dollarsPerHr: 0.1
              }
            ]
          }
        ]
      },
      AWS: {
        meta: {
          title: "AWS",
          "default": "d1",
          totalPlans: 38
        },
        plans: [
          {
            meta: {
              title: "General Purpose"
            },
            specs: [
              {
                id: "d1",
                RAM: 1,
                CPU: 1,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d2",
                RAM: 2,
                CPU: 1,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d3",
                RAM: 4,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d4",
                RAM: 8,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d5",
                RAM: 8,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d6",
                RAM: 16,
                CPU: 4,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d7",
                RAM: 32,
                CPU: 8,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d8",
                RAM: 64,
                CPU: 16,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d9",
                RAM: 160,
                CPU: 40,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d10",
                RAM: 3.75,
                CPU: 1,
                DISK: 4,
                dollarsPerHr: 0.1
              }, {
                id: "d11",
                RAM: 7.5,
                CPU: 2,
                DISK: 64,
                dollarsPerHr: 0.1
              }, {
                id: "d12",
                RAM: 15,
                CPU: 4,
                DISK: 80,
                dollarsPerHr: 0.1
              }, {
                id: "d13",
                RAM: 30,
                CPU: 8,
                DISK: 160,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "Compute Optimized"
            },
            specs: [
              {
                id: "d14",
                RAM: 3.75,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d15",
                RAM: 7.5,
                CPU: 4,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d16",
                RAM: 15,
                CPU: 8,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d17",
                RAM: 30,
                CPU: 16,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d18",
                RAM: 60,
                CPU: 36,
                DISK: "EBS Only",
                dollarsPerHr: 0.1
              }, {
                id: "d19",
                RAM: 3.75,
                CPU: 2,
                DISK: 32,
                dollarsPerHr: 0.1
              }, {
                id: "d20",
                RAM: 7.5,
                CPU: 4,
                DISK: 80,
                dollarsPerHr: 0.1
              }, {
                id: "d21",
                RAM: 15,
                CPU: 8,
                DISK: 160,
                dollarsPerHr: 0.1
              }, {
                id: "d22",
                RAM: 30,
                CPU: 16,
                DISK: 320,
                dollarsPerHr: 0.1
              }, {
                id: "d23",
                RAM: 60,
                CPU: 32,
                DISK: 640,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High GPU"
            },
            specs: [
              {
                id: "d24",
                RAM: 15,
                CPU: 8,
                DISK: 60,
                dollarsPerHr: 0.1
              }, {
                id: "d25",
                RAM: 60,
                CPU: 32,
                DISK: 240,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High RAM"
            },
            specs: [
              {
                id: "d26",
                RAM: 15,
                CPU: 2,
                DISK: 64,
                dollarsPerHr: 0.1
              }, {
                id: "d27",
                RAM: 30.5,
                CPU: 4,
                DISK: 160,
                dollarsPerHr: 0.1
              }, {
                id: "d28",
                RAM: 61,
                CPU: 8,
                DISK: 320,
                dollarsPerHr: 0.1
              }, {
                id: "d29",
                RAM: 122,
                CPU: 16,
                DISK: 320,
                dollarsPerHr: 0.1
              }, {
                id: "d30",
                RAM: 244,
                CPU: 32,
                DISK: 640,
                dollarsPerHr: 0.1
              }
            ]
          }, {
            meta: {
              title: "High Storage"
            },
            specs: [
              {
                id: "d31",
                RAM: 30.5,
                CPU: 4,
                DISK: 800,
                dollarsPerHr: 0.1
              }, {
                id: "d32",
                RAM: 61,
                CPU: 8,
                DISK: 1600,
                dollarsPerHr: 0.1
              }, {
                id: "d33",
                RAM: 122,
                CPU: 16,
                DISK: 3200,
                dollarsPerHr: 0.1
              }, {
                id: "d34",
                RAM: 244,
                CPU: 32,
                DISK: 6400,
                dollarsPerHr: 0.1
              }, {
                id: "d35",
                RAM: 30.5,
                CPU: 4,
                DISK: 6000,
                dollarsPerHr: 0.1
              }, {
                id: "d36",
                RAM: 61,
                CPU: 8,
                DISK: 12000,
                dollarsPerHr: 0.1
              }, {
                id: "d37",
                RAM: 122,
                CPU: 16,
                DISK: 24000,
                dollarsPerHr: 0.1
              }, {
                id: "d38",
                RAM: 244,
                CPU: 36,
                DISK: 48000,
                dollarsPerHr: 0.1
              }
            ]
          }
        ]
      }
    };
  };

  return ScaleDataShim;

})();

},{}],2:[function(require,module,exports){
var ScaleMachineDataShim;

ScaleMachineDataShim = require('./shims/data-shim');

window.scaleMachineTestData = new ScaleMachineDataShim();

window.init = (function(_this) {
  return function() {
    var onTotalInstancesChanged, onUserSelectNewServer, totalInstances;
    onUserSelectNewServer = function(data) {
      return console.log("The user has clicked this server id : `" + data + "`");
    };
    onTotalInstancesChanged = function(data) {
      return console.log("The user has dragged : `" + data + "` new instances");
    };
    PubSub.subscribe('SCALE.GET_OPTIONS', function(m, cb) {
      return cb(scaleMachineTestData.getHostOptions());
    });
    totalInstances = 5;
    return window.app = new nanobox.ScaleMachine($(".holder"), scaleMachineTestData.getSampleScaleId(), onUserSelectNewServer, onTotalInstancesChanged, totalInstances);
  };
})(this);

},{"./shims/data-shim":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvZGF0YS1zaGltLmNvZmZlZSIsInN0YWdlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ253QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgU2NhbGVEYXRhU2hpbSxcbiAgYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH07XG5cbm1vZHVsZS5leHBvcnRzID0gU2NhbGVEYXRhU2hpbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gU2NhbGVEYXRhU2hpbSgpIHtcbiAgICB0aGlzLmdldEhvc3RPcHRpb25zID0gYmluZCh0aGlzLmdldEhvc3RPcHRpb25zLCB0aGlzKTtcbiAgICB0aGlzLmdldFNlcnZpY2VTcGVjcyA9IGJpbmQodGhpcy5nZXRTZXJ2aWNlU3BlY3MsIHRoaXMpO1xuICAgIHZhciBwcm92aWRlcnM7XG4gICAgcHJvdmlkZXJzID0gW1wiQVdTXCIsIFwiTElOT0RFXCIsIFwiRElHSVRBTF9PQ0VBTlwiLCBcIkpPWUVOVFwiXTtcbiAgICB0aGlzLnByb3ZpZGVyID0gcHJvdmlkZXJzWzJdO1xuICAgIHRoaXMuY3JlYXRlSGFzaCgpO1xuICB9XG5cbiAgU2NhbGVEYXRhU2hpbS5wcm90b3R5cGUuZ2V0U2FtcGxlU2NhbGVJZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByYW5kb21JbmRleDtcbiAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IodGhpcy5wcm92aWRlcnNbdGhpcy5wcm92aWRlcl0ucGxhbnNbMF0uc3BlY3MubGVuZ3RoICogTWF0aC5yYW5kb20oKSk7XG4gICAgcmV0dXJuIHRoaXMucHJvdmlkZXJzW3RoaXMucHJvdmlkZXJdLnBsYW5zWzBdLnNwZWNzW3JhbmRvbUluZGV4XS5pZDtcbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRTZXJ2aWNlU3BlY3MgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5mbztcbiAgICBpbmZvID0gdGhpcy5nZXRDdXJyZW50U3BlY3MoKTtcbiAgICBpbmZvLmhvc3QgPSB0aGlzLnByb3ZpZGVyO1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGRhdGE6IGluZm9cbiAgICB9KSk7XG4gIH07XG5cbiAgU2NhbGVEYXRhU2hpbS5wcm90b3R5cGUuZ2V0SG9zdE9wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRURU1QKCk7XG4gIH07XG5cbiAgU2NhbGVEYXRhU2hpbS5wcm90b3R5cGUuZ2V0VEVNUCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBcIm1ldGFcIjoge1xuICAgICAgICBcInRpdGxlXCI6IFwiRGlnaXRhbE9jZWFuXCIsXG4gICAgICAgIFwiZGVmYXVsdFwiOiBcIjUxMm1iXCIsXG4gICAgICAgIFwidG90YWxQbGFuc1wiOiA5XG4gICAgICB9LFxuICAgICAgXCJwbGFuc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm1ldGFcIjoge1xuICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlN0YW5kYXJkXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3BlY3NcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImlkXCI6IFwiNTEybWJcIixcbiAgICAgICAgICAgICAgXCJSQU1cIjogNTEyLFxuICAgICAgICAgICAgICBcIkNQVVwiOiAxLFxuICAgICAgICAgICAgICBcIkRJU0tcIjogMjAsXG4gICAgICAgICAgICAgIFwidHJhbnNmZXJcIjogMSxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVySHJcIjogMC4wMDc0NCxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVyTW9cIjogNVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBcImlkXCI6IFwiMWdiXCIsXG4gICAgICAgICAgICAgIFwiUkFNXCI6IDEwMjQsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDEsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiAzMCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiAyLFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjAxNDg4LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiAxMFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBcImlkXCI6IFwiMmdiXCIsXG4gICAgICAgICAgICAgIFwiUkFNXCI6IDIwNDgsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDIsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiA0MCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiAzLFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjAyOTc2LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiAyMFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBcImlkXCI6IFwiNGdiXCIsXG4gICAgICAgICAgICAgIFwiUkFNXCI6IDQwOTYsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDIsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiA2MCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiA0LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjA1OTUyLFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiA0MFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBcImlkXCI6IFwiOGdiXCIsXG4gICAgICAgICAgICAgIFwiUkFNXCI6IDgxOTIsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDQsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiA4MCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiA1LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjExOTA1LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiA4MFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBcImlkXCI6IFwiMTZnYlwiLFxuICAgICAgICAgICAgICBcIlJBTVwiOiAxNjM4NCxcbiAgICAgICAgICAgICAgXCJDUFVcIjogOCxcbiAgICAgICAgICAgICAgXCJESVNLXCI6IDE2MCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiA2LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjIzODEsXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1Blck1vXCI6IDE2MFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBcImlkXCI6IFwiMzJnYlwiLFxuICAgICAgICAgICAgICBcIlJBTVwiOiAzMjc2OCxcbiAgICAgICAgICAgICAgXCJDUFVcIjogMTIsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiAzMjAsXG4gICAgICAgICAgICAgIFwidHJhbnNmZXJcIjogNyxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVySHJcIjogMC40NzYxOSxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVyTW9cIjogMzIwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIFwiaWRcIjogXCI0OGdiXCIsXG4gICAgICAgICAgICAgIFwiUkFNXCI6IDQ5MTUyLFxuICAgICAgICAgICAgICBcIkNQVVwiOiAxNixcbiAgICAgICAgICAgICAgXCJESVNLXCI6IDQ4MCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiA4LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjcxNDI5LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiA0ODBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgXCJpZFwiOiBcIjY0Z2JcIixcbiAgICAgICAgICAgICAgXCJSQU1cIjogNjU1MzYsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDIwLFxuICAgICAgICAgICAgICBcIkRJU0tcIjogNjQwLFxuICAgICAgICAgICAgICBcInRyYW5zZmVyXCI6IDksXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1BlckhyXCI6IDAuOTUyMzgsXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1Blck1vXCI6IDY0MFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH07XG5cbiAgU2NhbGVEYXRhU2hpbS5wcm90b3R5cGUuZ2V0Q3VycmVudFNwZWNzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpY3QsIGksIGosIGxlbiwgbGVuMSwgcGxhbiwgcmVmLCByZWYxLCBzcGVjO1xuICAgIGRpY3QgPSB7XG4gICAgICBMSU5PREU6ICdhJyxcbiAgICAgIERJR0lUQUxfT0NFQU46ICdiJyxcbiAgICAgIEpPWUVOVDogJ2MnLFxuICAgICAgQVdTOiAnZCdcbiAgICB9O1xuICAgIHRoaXMuc3BlY0lkID0gZGljdFt0aGlzLnByb3ZpZGVyXSArIFwiMlwiO1xuICAgIHJlZiA9IHRoaXMucHJvdmlkZXJzW3RoaXMucHJvdmlkZXJdLnBsYW5zO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcGxhbiA9IHJlZltpXTtcbiAgICAgIHJlZjEgPSBwbGFuLnNwZWNzO1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHNwZWMgPSByZWYxW2pdO1xuICAgICAgICBpZiAoc3BlYy5pZCA9PT0gdGhpcy5zcGVjSWQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFtOiBzcGVjLlJBTSxcbiAgICAgICAgICAgIGNwdTogc3BlYy5DUFUsXG4gICAgICAgICAgICBkaXNrOiBzcGVjLkRJU0ssXG4gICAgICAgICAgICBpZDogc3BlYy5pZFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgU2NhbGVEYXRhU2hpbS5wcm90b3R5cGUuY3JlYXRlSGFzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3ZpZGVycyA9IHtcbiAgICAgIExJTk9ERToge1xuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgdGl0bGU6IFwiTGlub2RlXCIsXG4gICAgICAgICAgXCJkZWZhdWx0XCI6IFwiYTFcIixcbiAgICAgICAgICB0b3RhbFBsYW5zOiA0XG4gICAgICAgIH0sXG4gICAgICAgIHBsYW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJTdGFuZGFyZCBDb25maWd1cmF0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYTFcIixcbiAgICAgICAgICAgICAgICBSQU06IDEsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDI0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMixcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogNDgsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImEzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA5NixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYTRcIixcbiAgICAgICAgICAgICAgICBSQU06IDgsXG4gICAgICAgICAgICAgICAgQ1BVOiA2LFxuICAgICAgICAgICAgICAgIERJU0s6IDE5MixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgRElHSVRBTF9PQ0VBTjoge1xuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgdGl0bGU6IFwiRGlnaXRhbCBPY2VhblwiLFxuICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImIxXCIsXG4gICAgICAgICAgdG90YWxQbGFuczogOVxuICAgICAgICB9LFxuICAgICAgICBwbGFuczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhbmRhcmRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMC41LFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiAyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjJcIixcbiAgICAgICAgICAgICAgICBSQU06IDEsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDMwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMixcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogNDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImI0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjVcIixcbiAgICAgICAgICAgICAgICBSQU06IDgsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDgwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggVm9sdW1lXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjZcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2LFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImI3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMixcbiAgICAgICAgICAgICAgICBDUFU6IDEyLFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjhcIixcbiAgICAgICAgICAgICAgICBSQU06IDQ4LFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogNDgwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjQsXG4gICAgICAgICAgICAgICAgQ1BVOiAyMCxcbiAgICAgICAgICAgICAgICBESVNLOiA2NDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIEpPWUVOVDoge1xuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgdGl0bGU6IFwiSm95ZW50XCIsXG4gICAgICAgICAgXCJkZWZhdWx0XCI6IFwiYzFcIixcbiAgICAgICAgICB0b3RhbFBsYW5zOiAyNFxuICAgICAgICB9LFxuICAgICAgICBwbGFuczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhbmRhcmRcIixcbiAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiYzFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMSxcbiAgICAgICAgICAgICAgICBDUFU6IDAuMjUsXG4gICAgICAgICAgICAgICAgRElTSzogMzMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxLjc1LFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiA1NixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzNcIixcbiAgICAgICAgICAgICAgICBSQU06IDIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDY2LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMy43NSxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMTIzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMTMxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNy41LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA3MzgsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA4LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA3ODksXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNSxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogMTQ2NyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzlcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNTc1LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTBcIixcbiAgICAgICAgICAgICAgICBSQU06IDE3LjEzLFxuICAgICAgICAgICAgICAgIENQVTogNSxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjgzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTFcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjgzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTJcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjgzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTNcIixcbiAgICAgICAgICAgICAgICBSQU06IDQwLFxuICAgICAgICAgICAgICAgIENQVTogMTAsXG4gICAgICAgICAgICAgICAgRElTSzogMTY4MyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIE1lbW9yeVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTcuMTMsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDQyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzNC4yNSxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODQzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTZcIixcbiAgICAgICAgICAgICAgICBSQU06IDY4LjM4LFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxMTIyLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTdcIixcbiAgICAgICAgICAgICAgICBSQU06IDE0NCxcbiAgICAgICAgICAgICAgICBDUFU6IDE4LFxuICAgICAgICAgICAgICAgIERJU0s6IDIzNjMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjU2LFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNDIwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIENQVVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMS43NSxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogNzUsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNyxcbiAgICAgICAgICAgICAgICBDUFU6IDcsXG4gICAgICAgICAgICAgICAgRElTSzogMjYzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjFcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2LFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogNjAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjJcIixcbiAgICAgICAgICAgICAgICBSQU06IDI0LFxuICAgICAgICAgICAgICAgIENQVTogMjQsXG4gICAgICAgICAgICAgICAgRElTSzogOTAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjNcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogMTIwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIElPXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzI0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2MC41LFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNDUyLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjVcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyOCxcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IDMwNzIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjU2LFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNjE0NCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIFN0b3JhZ2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjdcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiA3NjgwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjhcIixcbiAgICAgICAgICAgICAgICBSQU06IDY0LFxuICAgICAgICAgICAgICAgIENQVTogNixcbiAgICAgICAgICAgICAgICBESVNLOiAxNTM2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzI5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMjgsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDMwNzIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBBV1M6IHtcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIHRpdGxlOiBcIkFXU1wiLFxuICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImQxXCIsXG4gICAgICAgICAgdG90YWxQbGFuczogMzhcbiAgICAgICAgfSxcbiAgICAgICAgcGxhbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkdlbmVyYWwgUHVycG9zZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA4LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA4LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNixcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMzIsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDhcIixcbiAgICAgICAgICAgICAgICBSQU06IDY0LFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYwLFxuICAgICAgICAgICAgICAgIENQVTogNDAsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTBcIixcbiAgICAgICAgICAgICAgICBSQU06IDMuNzUsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDQsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNy41LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDEyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNSxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMzAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJDb21wdXRlIE9wdGltaXplZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMy43NSxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTVcIixcbiAgICAgICAgICAgICAgICBSQU06IDcuNSxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTZcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1LFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMzAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzNixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMy43NSxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogMzIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNy41LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDIxXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNSxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjJcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogMzIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjNcIixcbiAgICAgICAgICAgICAgICBSQU06IDYwLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggR1BVXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDI0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNSxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogNjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiAyNDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBSQU1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjZcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDI3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMC41LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjEsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDI5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMjIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiAzMjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjQ0LFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggU3RvcmFnZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzAuNSxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzJcIixcbiAgICAgICAgICAgICAgICBSQU06IDYxLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzNcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyMixcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjQ0LFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMC41LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA2MDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzZcIixcbiAgICAgICAgICAgICAgICBSQU06IDYxLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxMjAwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMjIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiAyNDAwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNDQsXG4gICAgICAgICAgICAgICAgQ1BVOiAzNixcbiAgICAgICAgICAgICAgICBESVNLOiA0ODAwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gU2NhbGVEYXRhU2hpbTtcblxufSkoKTtcbiIsInZhciBTY2FsZU1hY2hpbmVEYXRhU2hpbTtcblxuU2NhbGVNYWNoaW5lRGF0YVNoaW0gPSByZXF1aXJlKCcuL3NoaW1zL2RhdGEtc2hpbScpO1xuXG53aW5kb3cuc2NhbGVNYWNoaW5lVGVzdERhdGEgPSBuZXcgU2NhbGVNYWNoaW5lRGF0YVNoaW0oKTtcblxud2luZG93LmluaXQgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvblRvdGFsSW5zdGFuY2VzQ2hhbmdlZCwgb25Vc2VyU2VsZWN0TmV3U2VydmVyLCB0b3RhbEluc3RhbmNlcztcbiAgICBvblVzZXJTZWxlY3ROZXdTZXJ2ZXIgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coXCJUaGUgdXNlciBoYXMgY2xpY2tlZCB0aGlzIHNlcnZlciBpZCA6IGBcIiArIGRhdGEgKyBcImBcIik7XG4gICAgfTtcbiAgICBvblRvdGFsSW5zdGFuY2VzQ2hhbmdlZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIlRoZSB1c2VyIGhhcyBkcmFnZ2VkIDogYFwiICsgZGF0YSArIFwiYCBuZXcgaW5zdGFuY2VzXCIpO1xuICAgIH07XG4gICAgUHViU3ViLnN1YnNjcmliZSgnU0NBTEUuR0VUX09QVElPTlMnLCBmdW5jdGlvbihtLCBjYikge1xuICAgICAgcmV0dXJuIGNiKHNjYWxlTWFjaGluZVRlc3REYXRhLmdldEhvc3RPcHRpb25zKCkpO1xuICAgIH0pO1xuICAgIHRvdGFsSW5zdGFuY2VzID0gNTtcbiAgICByZXR1cm4gd2luZG93LmFwcCA9IG5ldyBuYW5vYm94LlNjYWxlTWFjaGluZSgkKFwiLmhvbGRlclwiKSwgc2NhbGVNYWNoaW5lVGVzdERhdGEuZ2V0U2FtcGxlU2NhbGVJZCgpLCBvblVzZXJTZWxlY3ROZXdTZXJ2ZXIsIG9uVG90YWxJbnN0YW5jZXNDaGFuZ2VkLCB0b3RhbEluc3RhbmNlcyk7XG4gIH07XG59KSh0aGlzKTtcbiJdfQ==

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TestData;

module.exports = TestData = (function() {
  TestData.prototype.services = [
    {
      name: "web1",
      kind: "ruby"
    }, {
      name: "web2",
      kind: "node"
    }, {
      name: "web3",
      kind: "python"
    }, {
      name: "web4",
      kind: "java"
    }, {
      name: "web5",
      kind: "php"
    }, {
      name: "db1",
      kind: "maria-db"
    }, {
      name: "db2",
      kind: "postgres-db"
    }, {
      name: "db3",
      kind: "couch-db"
    }, {
      name: "db4",
      kind: "percona-db"
    }, {
      name: "storage",
      kind: "storage"
    }, {
      name: "db-8",
      kind: "redis"
    }, {
      name: "customers",
      kind: "default-db"
    }, {
      name: "admin",
      kind: "default"
    }
  ];

  TestData.prototype.services = [
    {
      name: "web1",
      kind: "ruby"
    }, {
      name: "web2",
      kind: "mongo-db"
    }, {
      name: "web3",
      kind: "python"
    }, {
      name: "web4",
      kind: "java"
    }
  ];

  TestData.prototype.internals = [
    {
      name: "platform",
      kind: "platform"
    }, {
      name: "system",
      kind: "system"
    }
  ];

  function TestData() {
    this.createFakeStatDataProvider();
  }

  TestData.prototype.createFakeStatDataProvider = function() {
    PubSub.subscribe('STATS.SUBSCRIBE.USAGE_BREAKDOWN', (function(_this) {
      return function(m, data) {
        return usageBreakdownDataSimulator.waitForData(data);
      };
    })(this));
    return PubSub.subscribe('STATS.UNSUBSCRIBE', (function(_this) {
      return function(m, data) {};
    })(this));
  };

  TestData.prototype.waitForData = function(data) {
    data.callback(usageBreakdownDataSimulator.generateUsageBreakdownNoData());
    return setTimeout(function() {
      return data.callback(usageBreakdownDataSimulator.generateUsageBreakdownData());
    }, 200);
  };

  TestData.prototype.generateUsageBreakdownNoData = function() {
    var data, i, j, len, len1, ref, ref1, service;
    data = [];
    ref = this.services;
    for (i = 0, len = ref.length; i < len; i++) {
      service = ref[i];
      data.push({
        type: "service",
        name: service.name,
        kind: service.kind,
        metrics: {
          ram: 0,
          cpu: 0
        }
      });
    }
    ref1 = this.internals;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      service = ref1[j];
      data.push({
        type: "internal",
        name: service.name,
        kind: service.kind,
        metrics: {
          ram: 0,
          cpu: 0
        }
      });
    }
    return data;
  };

  TestData.prototype.generateUsageBreakdownData = function() {
    var data, i, j, len, len1, metrics, n, ref, ref1, service;
    data = [];
    n = 1 / (this.services.length + this.internals.length + 1);
    ref = this.services;
    for (i = 0, len = ref.length; i < len; i++) {
      service = ref[i];
      metrics = {
        ram: (Math.random() * n) + 0.05,
        cpu: (Math.random() * n) + 0.05
      };
      data.push({
        type: "service",
        name: service.name,
        kind: service.kind,
        metrics: metrics
      });
    }
    ref1 = this.internals;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      service = ref1[j];
      metrics = {
        ram: (Math.random() * n) * 0.4,
        cpu: (Math.random() * n) * 0.2
      };
      data.push({
        type: "internal",
        name: service.name,
        kind: service.kind,
        metrics: metrics
      });
    }
    return data;
  };

  return TestData;

})();

},{}],2:[function(require,module,exports){
var TestData;

TestData = require('./shim/test-data');

window.usageBreakdownDataSimulator = new TestData();

window.init = function() {
  var usage;
  usage = new nanobox.UsageBreakdown($("body"));
  return usage.build();
};

},{"./shim/test-data":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS90ZXN0LWRhdGEuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFRlc3REYXRhO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlc3REYXRhID0gKGZ1bmN0aW9uKCkge1xuICBUZXN0RGF0YS5wcm90b3R5cGUuc2VydmljZXMgPSBbXG4gICAge1xuICAgICAgbmFtZTogXCJ3ZWIxXCIsXG4gICAgICBraW5kOiBcInJ1YnlcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwid2ViMlwiLFxuICAgICAga2luZDogXCJub2RlXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIndlYjNcIixcbiAgICAgIGtpbmQ6IFwicHl0aG9uXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIndlYjRcIixcbiAgICAgIGtpbmQ6IFwiamF2YVwiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJ3ZWI1XCIsXG4gICAgICBraW5kOiBcInBocFwiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJkYjFcIixcbiAgICAgIGtpbmQ6IFwibWFyaWEtZGJcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiZGIyXCIsXG4gICAgICBraW5kOiBcInBvc3RncmVzLWRiXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcImRiM1wiLFxuICAgICAga2luZDogXCJjb3VjaC1kYlwiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJkYjRcIixcbiAgICAgIGtpbmQ6IFwicGVyY29uYS1kYlwiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJzdG9yYWdlXCIsXG4gICAgICBraW5kOiBcInN0b3JhZ2VcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwiZGItOFwiLFxuICAgICAga2luZDogXCJyZWRpc1wiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJjdXN0b21lcnNcIixcbiAgICAgIGtpbmQ6IFwiZGVmYXVsdC1kYlwiXG4gICAgfSwge1xuICAgICAgbmFtZTogXCJhZG1pblwiLFxuICAgICAga2luZDogXCJkZWZhdWx0XCJcbiAgICB9XG4gIF07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLnNlcnZpY2VzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwid2ViMVwiLFxuICAgICAga2luZDogXCJydWJ5XCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcIndlYjJcIixcbiAgICAgIGtpbmQ6IFwibW9uZ28tZGJcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwid2ViM1wiLFxuICAgICAga2luZDogXCJweXRob25cIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6IFwid2ViNFwiLFxuICAgICAga2luZDogXCJqYXZhXCJcbiAgICB9XG4gIF07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmludGVybmFscyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiBcInBsYXRmb3JtXCIsXG4gICAgICBraW5kOiBcInBsYXRmb3JtXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiBcInN5c3RlbVwiLFxuICAgICAga2luZDogXCJzeXN0ZW1cIlxuICAgIH1cbiAgXTtcblxuICBmdW5jdGlvbiBUZXN0RGF0YSgpIHtcbiAgICB0aGlzLmNyZWF0ZUZha2VTdGF0RGF0YVByb3ZpZGVyKCk7XG4gIH1cblxuICBUZXN0RGF0YS5wcm90b3R5cGUuY3JlYXRlRmFrZVN0YXREYXRhUHJvdmlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICBQdWJTdWIuc3Vic2NyaWJlKCdTVEFUUy5TVUJTQ1JJQkUuVVNBR0VfQlJFQUtET1dOJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdXNhZ2VCcmVha2Rvd25EYXRhU2ltdWxhdG9yLndhaXRGb3JEYXRhKGRhdGEpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgcmV0dXJuIFB1YlN1Yi5zdWJzY3JpYmUoJ1NUQVRTLlVOU1VCU0NSSUJFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge307XG4gICAgfSkodGhpcykpO1xuICB9O1xuXG4gIFRlc3REYXRhLnByb3RvdHlwZS53YWl0Rm9yRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBkYXRhLmNhbGxiYWNrKHVzYWdlQnJlYWtkb3duRGF0YVNpbXVsYXRvci5nZW5lcmF0ZVVzYWdlQnJlYWtkb3duTm9EYXRhKCkpO1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGRhdGEuY2FsbGJhY2sodXNhZ2VCcmVha2Rvd25EYXRhU2ltdWxhdG9yLmdlbmVyYXRlVXNhZ2VCcmVha2Rvd25EYXRhKCkpO1xuICAgIH0sIDIwMCk7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlVXNhZ2VCcmVha2Rvd25Ob0RhdGEgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YSwgaSwgaiwgbGVuLCBsZW4xLCByZWYsIHJlZjEsIHNlcnZpY2U7XG4gICAgZGF0YSA9IFtdO1xuICAgIHJlZiA9IHRoaXMuc2VydmljZXM7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBzZXJ2aWNlID0gcmVmW2ldO1xuICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJzZXJ2aWNlXCIsXG4gICAgICAgIG5hbWU6IHNlcnZpY2UubmFtZSxcbiAgICAgICAga2luZDogc2VydmljZS5raW5kLFxuICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgcmFtOiAwLFxuICAgICAgICAgIGNwdTogMFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVmMSA9IHRoaXMuaW50ZXJuYWxzO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYxLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgc2VydmljZSA9IHJlZjFbal07XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICB0eXBlOiBcImludGVybmFsXCIsXG4gICAgICAgIG5hbWU6IHNlcnZpY2UubmFtZSxcbiAgICAgICAga2luZDogc2VydmljZS5raW5kLFxuICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgcmFtOiAwLFxuICAgICAgICAgIGNwdTogMFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlVXNhZ2VCcmVha2Rvd25EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEsIGksIGosIGxlbiwgbGVuMSwgbWV0cmljcywgbiwgcmVmLCByZWYxLCBzZXJ2aWNlO1xuICAgIGRhdGEgPSBbXTtcbiAgICBuID0gMSAvICh0aGlzLnNlcnZpY2VzLmxlbmd0aCArIHRoaXMuaW50ZXJuYWxzLmxlbmd0aCArIDEpO1xuICAgIHJlZiA9IHRoaXMuc2VydmljZXM7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBzZXJ2aWNlID0gcmVmW2ldO1xuICAgICAgbWV0cmljcyA9IHtcbiAgICAgICAgcmFtOiAoTWF0aC5yYW5kb20oKSAqIG4pICsgMC4wNSxcbiAgICAgICAgY3B1OiAoTWF0aC5yYW5kb20oKSAqIG4pICsgMC4wNVxuICAgICAgfTtcbiAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgIHR5cGU6IFwic2VydmljZVwiLFxuICAgICAgICBuYW1lOiBzZXJ2aWNlLm5hbWUsXG4gICAgICAgIGtpbmQ6IHNlcnZpY2Uua2luZCxcbiAgICAgICAgbWV0cmljczogbWV0cmljc1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJlZjEgPSB0aGlzLmludGVybmFscztcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIHNlcnZpY2UgPSByZWYxW2pdO1xuICAgICAgbWV0cmljcyA9IHtcbiAgICAgICAgcmFtOiAoTWF0aC5yYW5kb20oKSAqIG4pICogMC40LFxuICAgICAgICBjcHU6IChNYXRoLnJhbmRvbSgpICogbikgKiAwLjJcbiAgICAgIH07XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICB0eXBlOiBcImludGVybmFsXCIsXG4gICAgICAgIG5hbWU6IHNlcnZpY2UubmFtZSxcbiAgICAgICAga2luZDogc2VydmljZS5raW5kLFxuICAgICAgICBtZXRyaWNzOiBtZXRyaWNzXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgcmV0dXJuIFRlc3REYXRhO1xuXG59KSgpO1xuIiwidmFyIFRlc3REYXRhO1xuXG5UZXN0RGF0YSA9IHJlcXVpcmUoJy4vc2hpbS90ZXN0LWRhdGEnKTtcblxud2luZG93LnVzYWdlQnJlYWtkb3duRGF0YVNpbXVsYXRvciA9IG5ldyBUZXN0RGF0YSgpO1xuXG53aW5kb3cuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdXNhZ2U7XG4gIHVzYWdlID0gbmV3IG5hbm9ib3guVXNhZ2VCcmVha2Rvd24oJChcImJvZHlcIikpO1xuICByZXR1cm4gdXNhZ2UuYnVpbGQoKTtcbn07XG4iXX0=
