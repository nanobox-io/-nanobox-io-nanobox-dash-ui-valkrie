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

  TestData.prototype.generateLiveStats = function(isContainer) {
    var j, len, metric, ref, stats;
    stats = [];
    ref = this.getMetrics(isContainer);
    for (j = 0, len = ref.length; j < len; j++) {
      metric = ref[j];
      stats.push({
        metric: metric,
        value: (Math.random() * 1.00) + 0.00
      });
    }
    return stats;
  };

  TestData.prototype.generateHistoricalStats = function(isContainer) {
    var data, hour, j, k, len, metric, ref, stats;
    stats = [];
    ref = this.getMetrics(isContainer);
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

  TestData.prototype.generateHistoricalStat = function(isContainer) {
    var data, hour, j, metric, metrics;
    metrics = this.getMetrics(isContainer);
    metric = metrics[Math.floor(Math.random() * metrics.length)];
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

  TestData.prototype.getMetrics = function(isContainer) {
    if (isContainer) {
      return ["cpu", "ram"];
    } else {
      return ["cpu", "ram", "swap", "disk"];
    }
  };

  return TestData;

})();

},{}],2:[function(require,module,exports){
var TestData;

TestData = require('./shim/test-data');

window.statsDataSimultor = new TestData();

window.init = function() {
  var expanded, expanded2, micro, micro2, standard, standard2, standard3;
  statsDataSimultor.createFakeStatDataProvider();
  micro = new nanobox.HourlyStats($("#micro1"), {
    view: "micro",
    isContainer: false
  });
  micro.build();
  micro2 = new nanobox.HourlyStats($("#micro2  "), {
    view: "micro",
    isContainer: true,
    metrics: ['cpu', 'ram']
  });
  micro2.build();
  standard = new nanobox.HourlyStats($("#standard1"), {
    view: "standard",
    isContainer: false
  });
  standard.build();
  standard2 = new nanobox.HourlyStats($("#standard2"), {
    view: "standard",
    isContainer: true,
    metrics: ['cpu', 'ram']
  });
  standard2.build();
  standard3 = new nanobox.HourlyStats($("#standard3"), {
    view: "standard",
    compressView: true
  });
  standard3.build();
  expanded = new nanobox.HourlyStats($("#expanded1"), {
    view: "expanded",
    isContainer: false
  });
  expanded.build();
  expanded2 = new nanobox.HourlyStats($("#expanded2"), {
    view: "expanded",
    isContainer: true,
    metrics: ['cpu', 'ram']
  });
  return expanded2.build();
};

},{"./shim/test-data":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS90ZXN0LWRhdGEuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFRlc3REYXRhO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlc3REYXRhID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBUZXN0RGF0YSgpIHt9XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmNyZWF0ZUZha2VTdGF0RGF0YVByb3ZpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgUHViU3ViLnN1YnNjcmliZSgnU1RBVFMuU1VCU0NSSUJFLkxJVkUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgIGRhdGEuY2FsbGJhY2soc3RhdHNEYXRhU2ltdWx0b3IuZ2VuZXJhdGVMaXZlU3RhdHMoKSk7XG4gICAgICAgIHJldHVybiBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAod2luZG93LmVuYWJsZVVwZGF0ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmNhbGxiYWNrKHN0YXRzRGF0YVNpbXVsdG9yLmdlbmVyYXRlTGl2ZVN0YXRzKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICBQdWJTdWIuc3Vic2NyaWJlKCdTVEFUUy5TVUJTQ1JJQkUuSElTVE9SSUMnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgIGRhdGEuY2FsbGJhY2soc3RhdHNEYXRhU2ltdWx0b3IuZ2VuZXJhdGVIaXN0b3JpY2FsU3RhdHMoKSk7XG4gICAgICAgIHJldHVybiBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgaSwgaiwgcmVzdWx0cztcbiAgICAgICAgICBpZiAod2luZG93LmVuYWJsZVVwZGF0ZXMpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IGogPSAwOyBqIDw9IDQ7IGkgPSArK2opIHtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuY2FsbGJhY2soc3RhdHNEYXRhU2ltdWx0b3IuZ2VuZXJhdGVIaXN0b3JpY2FsU3RhdCgpKTtcbiAgICAgICAgICAgICAgfSwgTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwMDApICsgMjUwKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgfVxuICAgICAgICB9LCA1MDAwKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHJldHVybiBQdWJTdWIuc3Vic2NyaWJlKCdTVEFUUy5VTlNVQlNDUklCRScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHt9O1xuICAgIH0pKHRoaXMpKTtcbiAgfTtcblxuICBUZXN0RGF0YS5wcm90b3R5cGUuZ2VuZXJhdGVMaXZlU3RhdHMgPSBmdW5jdGlvbihpc0NvbnRhaW5lcikge1xuICAgIHZhciBqLCBsZW4sIG1ldHJpYywgcmVmLCBzdGF0cztcbiAgICBzdGF0cyA9IFtdO1xuICAgIHJlZiA9IHRoaXMuZ2V0TWV0cmljcyhpc0NvbnRhaW5lcik7XG4gICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBtZXRyaWMgPSByZWZbal07XG4gICAgICBzdGF0cy5wdXNoKHtcbiAgICAgICAgbWV0cmljOiBtZXRyaWMsXG4gICAgICAgIHZhbHVlOiAoTWF0aC5yYW5kb20oKSAqIDEuMDApICsgMC4wMFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzdGF0cztcbiAgfTtcblxuICBUZXN0RGF0YS5wcm90b3R5cGUuZ2VuZXJhdGVIaXN0b3JpY2FsU3RhdHMgPSBmdW5jdGlvbihpc0NvbnRhaW5lcikge1xuICAgIHZhciBkYXRhLCBob3VyLCBqLCBrLCBsZW4sIG1ldHJpYywgcmVmLCBzdGF0cztcbiAgICBzdGF0cyA9IFtdO1xuICAgIHJlZiA9IHRoaXMuZ2V0TWV0cmljcyhpc0NvbnRhaW5lcik7XG4gICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBtZXRyaWMgPSByZWZbal07XG4gICAgICBkYXRhID0gW107XG4gICAgICBmb3IgKGhvdXIgPSBrID0gMDsgayA8PSAyNDsgaG91ciA9ICsraykge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIHRpbWU6IFwiXCIgKyAoKFwiMFwiICsgaG91cikuc2xpY2UoLTIpKSxcbiAgICAgICAgICB2YWx1ZTogKE1hdGgucmFuZG9tKCkgKiAxLjAwKSArIDAuMDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzdGF0cy5wdXNoKHtcbiAgICAgICAgbWV0cmljOiBtZXRyaWMsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHM7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlSGlzdG9yaWNhbFN0YXQgPSBmdW5jdGlvbihpc0NvbnRhaW5lcikge1xuICAgIHZhciBkYXRhLCBob3VyLCBqLCBtZXRyaWMsIG1ldHJpY3M7XG4gICAgbWV0cmljcyA9IHRoaXMuZ2V0TWV0cmljcyhpc0NvbnRhaW5lcik7XG4gICAgbWV0cmljID0gbWV0cmljc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtZXRyaWNzLmxlbmd0aCldO1xuICAgIGRhdGEgPSBbXTtcbiAgICBmb3IgKGhvdXIgPSBqID0gMDsgaiA8PSAyNDsgaG91ciA9ICsraikge1xuICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgdGltZTogXCJcIiArICgoXCIwXCIgKyBob3VyKS5zbGljZSgtMikpLFxuICAgICAgICB2YWx1ZTogKE1hdGgucmFuZG9tKCkgKiAxLjAwKSArIDAuMDBcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBtZXRyaWM6IG1ldHJpYyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfVxuICAgIF07XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdldE1ldHJpY3MgPSBmdW5jdGlvbihpc0NvbnRhaW5lcikge1xuICAgIGlmIChpc0NvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIFtcImNwdVwiLCBcInJhbVwiXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtcImNwdVwiLCBcInJhbVwiLCBcInN3YXBcIiwgXCJkaXNrXCJdO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gVGVzdERhdGE7XG5cbn0pKCk7XG4iLCJ2YXIgVGVzdERhdGE7XG5cblRlc3REYXRhID0gcmVxdWlyZSgnLi9zaGltL3Rlc3QtZGF0YScpO1xuXG53aW5kb3cuc3RhdHNEYXRhU2ltdWx0b3IgPSBuZXcgVGVzdERhdGEoKTtcblxud2luZG93LmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGV4cGFuZGVkLCBleHBhbmRlZDIsIG1pY3JvLCBtaWNybzIsIHN0YW5kYXJkLCBzdGFuZGFyZDIsIHN0YW5kYXJkMztcbiAgc3RhdHNEYXRhU2ltdWx0b3IuY3JlYXRlRmFrZVN0YXREYXRhUHJvdmlkZXIoKTtcbiAgbWljcm8gPSBuZXcgbmFub2JveC5Ib3VybHlTdGF0cygkKFwiI21pY3JvMVwiKSwge1xuICAgIHZpZXc6IFwibWljcm9cIixcbiAgICBpc0NvbnRhaW5lcjogZmFsc2VcbiAgfSk7XG4gIG1pY3JvLmJ1aWxkKCk7XG4gIG1pY3JvMiA9IG5ldyBuYW5vYm94LkhvdXJseVN0YXRzKCQoXCIjbWljcm8yICBcIiksIHtcbiAgICB2aWV3OiBcIm1pY3JvXCIsXG4gICAgaXNDb250YWluZXI6IHRydWUsXG4gICAgbWV0cmljczogWydjcHUnLCAncmFtJ11cbiAgfSk7XG4gIG1pY3JvMi5idWlsZCgpO1xuICBzdGFuZGFyZCA9IG5ldyBuYW5vYm94LkhvdXJseVN0YXRzKCQoXCIjc3RhbmRhcmQxXCIpLCB7XG4gICAgdmlldzogXCJzdGFuZGFyZFwiLFxuICAgIGlzQ29udGFpbmVyOiBmYWxzZVxuICB9KTtcbiAgc3RhbmRhcmQuYnVpbGQoKTtcbiAgc3RhbmRhcmQyID0gbmV3IG5hbm9ib3guSG91cmx5U3RhdHMoJChcIiNzdGFuZGFyZDJcIiksIHtcbiAgICB2aWV3OiBcInN0YW5kYXJkXCIsXG4gICAgaXNDb250YWluZXI6IHRydWUsXG4gICAgbWV0cmljczogWydjcHUnLCAncmFtJ11cbiAgfSk7XG4gIHN0YW5kYXJkMi5idWlsZCgpO1xuICBzdGFuZGFyZDMgPSBuZXcgbmFub2JveC5Ib3VybHlTdGF0cygkKFwiI3N0YW5kYXJkM1wiKSwge1xuICAgIHZpZXc6IFwic3RhbmRhcmRcIixcbiAgICBjb21wcmVzc1ZpZXc6IHRydWVcbiAgfSk7XG4gIHN0YW5kYXJkMy5idWlsZCgpO1xuICBleHBhbmRlZCA9IG5ldyBuYW5vYm94LkhvdXJseVN0YXRzKCQoXCIjZXhwYW5kZWQxXCIpLCB7XG4gICAgdmlldzogXCJleHBhbmRlZFwiLFxuICAgIGlzQ29udGFpbmVyOiBmYWxzZVxuICB9KTtcbiAgZXhwYW5kZWQuYnVpbGQoKTtcbiAgZXhwYW5kZWQyID0gbmV3IG5hbm9ib3guSG91cmx5U3RhdHMoJChcIiNleHBhbmRlZDJcIiksIHtcbiAgICB2aWV3OiBcImV4cGFuZGVkXCIsXG4gICAgaXNDb250YWluZXI6IHRydWUsXG4gICAgbWV0cmljczogWydjcHUnLCAncmFtJ11cbiAgfSk7XG4gIHJldHVybiBleHBhbmRlZDIuYnVpbGQoKTtcbn07XG4iXX0=

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AppComponent;

module.exports = AppComponent = (function() {
  AppComponent.appComponentCount = 0;

  function AppComponent(kind, type, scalesHorizontally, scalesRedund) {
    if (kind == null) {
      kind = 'web';
    }
    this.type = type != null ? type : "ruby";
    this.scalesHorizontally = scalesHorizontally != null ? scalesHorizontally : true;
    this.scalesRedund = scalesRedund != null ? scalesRedund : false;
    this.generationCount = 1;
    this.state = 'active';
    this.serverSpecsId = "b3";
    this.id = kind + "." + (++AppComponent.appComponentCount);
    this.name = kind + " " + AppComponent.appComponentCount;
    this.generations = [];
    this.adminPath = "/some/path/to/admin";
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
      scalesHoriz: this.scalesHorizontally,
      scalesRedund: this.scalesRedund,
      adminPath: this.adminPath
    };
  };

  return AppComponent;

})();

},{}],2:[function(require,module,exports){
var AppComponent, DataCluster, Host;

AppComponent = require('./app-component');

Host = require('./host');

module.exports = DataCluster = (function() {
  DataCluster.clusterCount = 0;

  function DataCluster() {
    var generation, i, j, k, len, ref, role, roles, totalGenerations;
    totalGenerations = 1;
    this.id = "cluster." + DataCluster.clusterCount;
    this.name = "Customers DB";
    this.state = "active";
    this.serviceType = "mysql-db";
    this.scalesHoriz = false;
    this.scalesRedund = true;
    this.adminPath = "/some/path/to/admin";
    this.generations = [];
    for (i = j = 1, ref = totalGenerations; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      generation = {
        id: "db.main.gen" + i,
        state: "active",
        status: "online",
        instances: []
      };
      roles = ['primary', 'secondary', 'arbiter'];
      for (i = k = 0, len = roles.length; k < len; i = ++k) {
        role = roles[i];
        generation.instances.push({
          id: i,
          hostId: "do." + i,
          hostName: "do." + i,
          state: "active",
          status: "online",
          role: role,
          serverSpecsId: "b2"
        });
      }
      this.generations.push(generation);
    }
  }

  DataCluster.prototype.serialize = function() {
    return {
      id: this.id,
      state: this.state,
      name: this.name,
      scalesHoriz: this.scalesHoriz,
      scalesRedund: this.scalesRedund,
      generations: this.generations,
      serviceType: this.serviceType,
      adminPath: this.adminPath
    };
  };

  return DataCluster;

})();

},{"./app-component":1,"./host":6}],3:[function(require,module,exports){
var AppComponent, ClobberBoxDataShim, DataCluster, Generation, HorizCluster, Host, PlatformComponent;

AppComponent = require('./app-component');

PlatformComponent = require('./platform-component');

Host = require('./host');

HorizCluster = require('./horiz-cluster');

DataCluster = require('./data-cluster');

Generation = require('./generation');

module.exports = ClobberBoxDataShim = (function() {
  function ClobberBoxDataShim() {}

  ClobberBoxDataShim.prototype.getHost = function(makeLotsOfComponents) {
    if (makeLotsOfComponents == null) {
      makeLotsOfComponents = false;
    }
    return new Host(makeLotsOfComponents);
  };

  ClobberBoxDataShim.prototype.getHorizCluster = function(totalMembers) {
    return new HorizCluster(totalMembers);
  };

  ClobberBoxDataShim.prototype.getDataCluster = function() {
    return new DataCluster();
  };

  ClobberBoxDataShim.prototype.getAppComponent = function(kind, type, scalesHorizontally, scalesRedund) {
    return new AppComponent(kind, type, scalesHorizontally, scalesRedund);
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
    HorizCluster.clusterCount = 0;
    return DataCluster.clusterCount = 0;
  };

  return ClobberBoxDataShim;

})();

},{"./app-component":1,"./data-cluster":2,"./generation":4,"./horiz-cluster":5,"./host":6,"./platform-component":7}],4:[function(require,module,exports){
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
var AppComponent, HorizCluster, Host, x;

AppComponent = require('./app-component');

Host = require('./host');

module.exports = HorizCluster = (function() {
  HorizCluster.clusterCount = 0;

  function HorizCluster(totalMembers, totalGenerations) {
    var generation, i, j, k, ref, ref1;
    if (totalMembers == null) {
      totalMembers = 4;
    }
    if (totalGenerations == null) {
      totalGenerations = 1;
    }
    this.id = "cluster." + HorizCluster.clusterCount;
    this.name = "Main App";
    this.state = "active";
    this.serviceType = "python";
    this.scalesHoriz = true;
    this.scalesRedund = false;
    this.generations = [];
    this.adminPath = "/some/path/to/admin";
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

  HorizCluster.prototype.serialize = function() {
    return {
      id: this.id,
      state: this.state,
      name: this.name,
      scalesHoriz: this.scalesHoriz,
      scalesRedund: this.scalesRedund,
      generations: this.generations,
      serviceType: this.serviceType,
      adminPath: this.adminPath
    };
  };

  return HorizCluster;

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

},{"./app-component":1,"./host":6}],6:[function(require,module,exports){
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
    this.bunkhouseId = "bunkhouse";
    this.platformServices = [new PlatformComponent("lb", "mesh"), new PlatformComponent("lg", "logger"), new PlatformComponent("hm", "monitor"), new PlatformComponent("mr", "pusher"), new PlatformComponent("gs", "warehouse")];
    this.appComponents = [];
  }

  Host.prototype.createComponents = function(makeLotsOfComponents) {
    if (!makeLotsOfComponents) {
      this.addComponent('web', 'ruby', true, true);
      return this.addComponent('db', 'mongo-db', false, true);
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

  Host.prototype.addComponent = function(kind, type, isHorizontallyScalable, isRedundScalable) {
    return this.appComponents.push(new AppComponent(kind, type, isHorizontallyScalable, isRedundScalable));
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
      bunkhouseId: this.bunkhouseId,
      platformServices: this.serializeComponents(this.platformServices),
      appComponents: this.serializeComponents(this.appComponents)
    };
  };

  return Host;

})();

},{"./app-component":1,"./platform-component":7}],7:[function(require,module,exports){
var AppComponent, PlatformComponent;

AppComponent = require('./app-component');

module.exports = PlatformComponent = (function() {
  function PlatformComponent(id, kind) {
    this.id = id;
    this.kind = kind;
    this.isSplitable = true;
    this.mode = 'simple';
    this.adminPath = "/some/path/to/admin";
    this.components = [new AppComponent('web', 'web-db', true, true).serialize(), new AppComponent('db', 'default-db', false, false).serialize()];
  }

  PlatformComponent.prototype.serialize = function() {
    return {
      id: this.id,
      kind: this.kind,
      isSplitable: this.isSplitable,
      mode: this.mode,
      components: this.components
    };
  };

  return PlatformComponent;

})();

({
  id: "logger1",
  kind: "mesh",
  mode: "simple",
  isSplitable: true,
  components: [
    {
      id: "9e63d700-c84e-45ed-ba15-ed192fcf92b2",
      uid: "data.portal",
      name: "lucky-lime",
      state: "created",
      serviceType: "default-db",
      scalesHoriz: false,
      scalesRedund: false,
      isSplitable: true,
      generations: [
        {
          id: "data.portal.gen1",
          state: "created",
          status: "online",
          instances: [
            {
              id: 1,
              hostId: "test-host-name",
              hostName: "test-host-name",
              state: "created",
              status: "online",
              role: "default",
              serverSpecsId: "512mb"
            }
          ]
        }
      ]
    }
  ]
});

},{"./app-component":1}],8:[function(require,module,exports){
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
      hostBox.build($holder, nanobox.ClobberBox.HOST, clobberBoxDataShim.getHost(false).serialize());
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
          adminPath: clusterData.adminPath,
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
    window.manageComponent = function(componentId) {
      var box, boxHost, x;
      box = getBox(componentId);
      if (box != null) {
        x = 0;
        return;
      }
      boxHost = getParentOfComponent();
      if (boxHost != null) {
        return x = 0;
      }
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
      PubSub.subscribe('SCALE.SAVE', function(m, data) {
        console.log("New Scale:");
        return console.log(data);
      });
      return PubSub.subscribe('SPLIT.SAVE', function(m, data) {
        console.log("Split:");
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
      PubSub.subscribe('SHOW.HOST-INTANCES', (function(_this) {
        return function(m, data) {
          return getBox(data.id).switchSubContent('host-instances', data.el);
        };
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
    addCluster(clobberBoxDataShim.getHorizCluster().serialize());
    addCluster(clobberBoxDataShim.getDataCluster().serialize());
    return window.setNoDeploys = function() {
      return getBox("host.1").showAsReadyForDeploys();
    };
  };
})(this);

},{"./shims/data-shim":3,"./test-ui/ui":9}],9:[function(require,module,exports){
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
      return this.addToSelector($('.generations', '.ui-shim'), box);
    } else {
      return this.addToSelector($('.hosts', '.ui-shim'), box);
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

},{}]},{},[8])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvYXBwLWNvbXBvbmVudC5jb2ZmZWUiLCJzaGltcy9kYXRhLWNsdXN0ZXIuY29mZmVlIiwic2hpbXMvZGF0YS1zaGltLmNvZmZlZSIsInNoaW1zL2dlbmVyYXRpb24uY29mZmVlIiwic2hpbXMvaG9yaXotY2x1c3Rlci5jb2ZmZWUiLCJzaGltcy9ob3N0LmNvZmZlZSIsInNoaW1zL3BsYXRmb3JtLWNvbXBvbmVudC5jb2ZmZWUiLCJzdGFnZS5jb2ZmZWUiLCJ0ZXN0LXVpL3VpLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXBwQ29tcG9uZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcENvbXBvbmVudCA9IChmdW5jdGlvbigpIHtcbiAgQXBwQ29tcG9uZW50LmFwcENvbXBvbmVudENvdW50ID0gMDtcblxuICBmdW5jdGlvbiBBcHBDb21wb25lbnQoa2luZCwgdHlwZSwgc2NhbGVzSG9yaXpvbnRhbGx5LCBzY2FsZXNSZWR1bmQpIHtcbiAgICBpZiAoa2luZCA9PSBudWxsKSB7XG4gICAgICBraW5kID0gJ3dlYic7XG4gICAgfVxuICAgIHRoaXMudHlwZSA9IHR5cGUgIT0gbnVsbCA/IHR5cGUgOiBcInJ1YnlcIjtcbiAgICB0aGlzLnNjYWxlc0hvcml6b250YWxseSA9IHNjYWxlc0hvcml6b250YWxseSAhPSBudWxsID8gc2NhbGVzSG9yaXpvbnRhbGx5IDogdHJ1ZTtcbiAgICB0aGlzLnNjYWxlc1JlZHVuZCA9IHNjYWxlc1JlZHVuZCAhPSBudWxsID8gc2NhbGVzUmVkdW5kIDogZmFsc2U7XG4gICAgdGhpcy5nZW5lcmF0aW9uQ291bnQgPSAxO1xuICAgIHRoaXMuc3RhdGUgPSAnYWN0aXZlJztcbiAgICB0aGlzLnNlcnZlclNwZWNzSWQgPSBcImIzXCI7XG4gICAgdGhpcy5pZCA9IGtpbmQgKyBcIi5cIiArICgrK0FwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCk7XG4gICAgdGhpcy5uYW1lID0ga2luZCArIFwiIFwiICsgQXBwQ29tcG9uZW50LmFwcENvbXBvbmVudENvdW50O1xuICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmFkbWluUGF0aCA9IFwiL3NvbWUvcGF0aC90by9hZG1pblwiO1xuICAgIHRoaXMuYWRkR2VuZXJhdGlvbigpO1xuICB9XG5cbiAgQXBwQ29tcG9uZW50LnByb3RvdHlwZS5hZGRHZW5lcmF0aW9uID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgc3RhdGUgPSAnYWN0aXZlJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGlvbnMucHVzaCh7XG4gICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICBpZDogdGhpcy5pZCArIFwiLmdlblwiICsgKHRoaXMuZ2VuZXJhdGlvbkNvdW50KyspXG4gICAgfSk7XG4gIH07XG5cbiAgQXBwQ29tcG9uZW50LnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2VuZXJhdGlvbnM6IHRoaXMuZ2VuZXJhdGlvbnMsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIHNlcnZlclNwZWNzSWQ6IHRoaXMuc2VydmVyU3BlY3NJZCxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgc2VydmljZVR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHNjYWxlc0hvcml6OiB0aGlzLnNjYWxlc0hvcml6b250YWxseSxcbiAgICAgIHNjYWxlc1JlZHVuZDogdGhpcy5zY2FsZXNSZWR1bmQsXG4gICAgICBhZG1pblBhdGg6IHRoaXMuYWRtaW5QYXRoXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gQXBwQ29tcG9uZW50O1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgRGF0YUNsdXN0ZXIsIEhvc3Q7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5Ib3N0ID0gcmVxdWlyZSgnLi9ob3N0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YUNsdXN0ZXIgPSAoZnVuY3Rpb24oKSB7XG4gIERhdGFDbHVzdGVyLmNsdXN0ZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gRGF0YUNsdXN0ZXIoKSB7XG4gICAgdmFyIGdlbmVyYXRpb24sIGksIGosIGssIGxlbiwgcmVmLCByb2xlLCByb2xlcywgdG90YWxHZW5lcmF0aW9ucztcbiAgICB0b3RhbEdlbmVyYXRpb25zID0gMTtcbiAgICB0aGlzLmlkID0gXCJjbHVzdGVyLlwiICsgRGF0YUNsdXN0ZXIuY2x1c3RlckNvdW50O1xuICAgIHRoaXMubmFtZSA9IFwiQ3VzdG9tZXJzIERCXCI7XG4gICAgdGhpcy5zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gICAgdGhpcy5zZXJ2aWNlVHlwZSA9IFwibXlzcWwtZGJcIjtcbiAgICB0aGlzLnNjYWxlc0hvcml6ID0gZmFsc2U7XG4gICAgdGhpcy5zY2FsZXNSZWR1bmQgPSB0cnVlO1xuICAgIHRoaXMuYWRtaW5QYXRoID0gXCIvc29tZS9wYXRoL3RvL2FkbWluXCI7XG4gICAgdGhpcy5nZW5lcmF0aW9ucyA9IFtdO1xuICAgIGZvciAoaSA9IGogPSAxLCByZWYgPSB0b3RhbEdlbmVyYXRpb25zOyAxIDw9IHJlZiA/IGogPD0gcmVmIDogaiA+PSByZWY7IGkgPSAxIDw9IHJlZiA/ICsraiA6IC0taikge1xuICAgICAgZ2VuZXJhdGlvbiA9IHtcbiAgICAgICAgaWQ6IFwiZGIubWFpbi5nZW5cIiArIGksXG4gICAgICAgIHN0YXRlOiBcImFjdGl2ZVwiLFxuICAgICAgICBzdGF0dXM6IFwib25saW5lXCIsXG4gICAgICAgIGluc3RhbmNlczogW11cbiAgICAgIH07XG4gICAgICByb2xlcyA9IFsncHJpbWFyeScsICdzZWNvbmRhcnknLCAnYXJiaXRlciddO1xuICAgICAgZm9yIChpID0gayA9IDAsIGxlbiA9IHJvbGVzLmxlbmd0aDsgayA8IGxlbjsgaSA9ICsraykge1xuICAgICAgICByb2xlID0gcm9sZXNbaV07XG4gICAgICAgIGdlbmVyYXRpb24uaW5zdGFuY2VzLnB1c2goe1xuICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgIGhvc3RJZDogXCJkby5cIiArIGksXG4gICAgICAgICAgaG9zdE5hbWU6IFwiZG8uXCIgKyBpLFxuICAgICAgICAgIHN0YXRlOiBcImFjdGl2ZVwiLFxuICAgICAgICAgIHN0YXR1czogXCJvbmxpbmVcIixcbiAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgIHNlcnZlclNwZWNzSWQ6IFwiYjJcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2VuZXJhdGlvbnMucHVzaChnZW5lcmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBEYXRhQ2x1c3Rlci5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBzY2FsZXNIb3JpejogdGhpcy5zY2FsZXNIb3JpeixcbiAgICAgIHNjYWxlc1JlZHVuZDogdGhpcy5zY2FsZXNSZWR1bmQsXG4gICAgICBnZW5lcmF0aW9uczogdGhpcy5nZW5lcmF0aW9ucyxcbiAgICAgIHNlcnZpY2VUeXBlOiB0aGlzLnNlcnZpY2VUeXBlLFxuICAgICAgYWRtaW5QYXRoOiB0aGlzLmFkbWluUGF0aFxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIERhdGFDbHVzdGVyO1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgQ2xvYmJlckJveERhdGFTaGltLCBEYXRhQ2x1c3RlciwgR2VuZXJhdGlvbiwgSG9yaXpDbHVzdGVyLCBIb3N0LCBQbGF0Zm9ybUNvbXBvbmVudDtcblxuQXBwQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9hcHAtY29tcG9uZW50Jyk7XG5cblBsYXRmb3JtQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS1jb21wb25lbnQnKTtcblxuSG9zdCA9IHJlcXVpcmUoJy4vaG9zdCcpO1xuXG5Ib3JpekNsdXN0ZXIgPSByZXF1aXJlKCcuL2hvcml6LWNsdXN0ZXInKTtcblxuRGF0YUNsdXN0ZXIgPSByZXF1aXJlKCcuL2RhdGEtY2x1c3RlcicpO1xuXG5HZW5lcmF0aW9uID0gcmVxdWlyZSgnLi9nZW5lcmF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xvYmJlckJveERhdGFTaGltID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBDbG9iYmVyQm94RGF0YVNoaW0oKSB7fVxuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0SG9zdCA9IGZ1bmN0aW9uKG1ha2VMb3RzT2ZDb21wb25lbnRzKSB7XG4gICAgaWYgKG1ha2VMb3RzT2ZDb21wb25lbnRzID09IG51bGwpIHtcbiAgICAgIG1ha2VMb3RzT2ZDb21wb25lbnRzID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSG9zdChtYWtlTG90c09mQ29tcG9uZW50cyk7XG4gIH07XG5cbiAgQ2xvYmJlckJveERhdGFTaGltLnByb3RvdHlwZS5nZXRIb3JpekNsdXN0ZXIgPSBmdW5jdGlvbih0b3RhbE1lbWJlcnMpIHtcbiAgICByZXR1cm4gbmV3IEhvcml6Q2x1c3Rlcih0b3RhbE1lbWJlcnMpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0RGF0YUNsdXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IERhdGFDbHVzdGVyKCk7XG4gIH07XG5cbiAgQ2xvYmJlckJveERhdGFTaGltLnByb3RvdHlwZS5nZXRBcHBDb21wb25lbnQgPSBmdW5jdGlvbihraW5kLCB0eXBlLCBzY2FsZXNIb3Jpem9udGFsbHksIHNjYWxlc1JlZHVuZCkge1xuICAgIHJldHVybiBuZXcgQXBwQ29tcG9uZW50KGtpbmQsIHR5cGUsIHNjYWxlc0hvcml6b250YWxseSwgc2NhbGVzUmVkdW5kKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldFBsYXRmb3JtQ29tcG9uZW50ID0gZnVuY3Rpb24oaWQsIGtpbmQpIHtcbiAgICByZXR1cm4gbmV3IFBsYXRmb3JtQ29tcG9uZW50KGlkLCBraW5kKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldEdlbmVyYXRpb24gPSBmdW5jdGlvbihwYXJlbnRJZCwgc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRpb24ocGFyZW50SWQsIHN0YXRlKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLnJlc2V0Q291bnRzID0gZnVuY3Rpb24oKSB7XG4gICAgSG9zdC5ob3N0Q291bnQgPSAwO1xuICAgIEFwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCA9IDA7XG4gICAgSG9yaXpDbHVzdGVyLmNsdXN0ZXJDb3VudCA9IDA7XG4gICAgcmV0dXJuIERhdGFDbHVzdGVyLmNsdXN0ZXJDb3VudCA9IDA7XG4gIH07XG5cbiAgcmV0dXJuIENsb2JiZXJCb3hEYXRhU2hpbTtcblxufSkoKTtcbiIsInZhciBHZW5lcmF0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyYXRpb24gPSAoZnVuY3Rpb24oKSB7XG4gIEdlbmVyYXRpb24uZ2VuZXJpY0dlbmVyYXRpb25Db3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gR2VuZXJhdGlvbihwYXJlbnRJZCwgc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgc3RhdGUgPSAnYWN0aXZlJztcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuaWQgPSBwYXJlbnRJZCArIFwiLmdlblwiICsgKEdlbmVyYXRpb24uZ2VuZXJpY0dlbmVyYXRpb25Db3VudCsrKTtcbiAgfVxuXG4gIEdlbmVyYXRpb24ucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIGlkOiB0aGlzLmlkXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gR2VuZXJhdGlvbjtcblxufSkoKTtcbiIsInZhciBBcHBDb21wb25lbnQsIEhvcml6Q2x1c3RlciwgSG9zdCwgeDtcblxuQXBwQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9hcHAtY29tcG9uZW50Jyk7XG5cbkhvc3QgPSByZXF1aXJlKCcuL2hvc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb3JpekNsdXN0ZXIgPSAoZnVuY3Rpb24oKSB7XG4gIEhvcml6Q2x1c3Rlci5jbHVzdGVyQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIEhvcml6Q2x1c3Rlcih0b3RhbE1lbWJlcnMsIHRvdGFsR2VuZXJhdGlvbnMpIHtcbiAgICB2YXIgZ2VuZXJhdGlvbiwgaSwgaiwgaywgcmVmLCByZWYxO1xuICAgIGlmICh0b3RhbE1lbWJlcnMgPT0gbnVsbCkge1xuICAgICAgdG90YWxNZW1iZXJzID0gNDtcbiAgICB9XG4gICAgaWYgKHRvdGFsR2VuZXJhdGlvbnMgPT0gbnVsbCkge1xuICAgICAgdG90YWxHZW5lcmF0aW9ucyA9IDE7XG4gICAgfVxuICAgIHRoaXMuaWQgPSBcImNsdXN0ZXIuXCIgKyBIb3JpekNsdXN0ZXIuY2x1c3RlckNvdW50O1xuICAgIHRoaXMubmFtZSA9IFwiTWFpbiBBcHBcIjtcbiAgICB0aGlzLnN0YXRlID0gXCJhY3RpdmVcIjtcbiAgICB0aGlzLnNlcnZpY2VUeXBlID0gXCJweXRob25cIjtcbiAgICB0aGlzLnNjYWxlc0hvcml6ID0gdHJ1ZTtcbiAgICB0aGlzLnNjYWxlc1JlZHVuZCA9IGZhbHNlO1xuICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmFkbWluUGF0aCA9IFwiL3NvbWUvcGF0aC90by9hZG1pblwiO1xuICAgIGZvciAoaSA9IGogPSAxLCByZWYgPSB0b3RhbEdlbmVyYXRpb25zOyAxIDw9IHJlZiA/IGogPD0gcmVmIDogaiA+PSByZWY7IGkgPSAxIDw9IHJlZiA/ICsraiA6IC0taikge1xuICAgICAgZ2VuZXJhdGlvbiA9IHtcbiAgICAgICAgaWQ6IFwid2ViLm1haW4uZ2VuXCIgKyBpLFxuICAgICAgICBzdGF0ZTogXCJhY3RpdmVcIixcbiAgICAgICAgc3RhdHVzOiBcIm9ubGluZVwiLFxuICAgICAgICBpbnN0YW5jZXM6IFtdXG4gICAgICB9O1xuICAgICAgZm9yIChpID0gayA9IDEsIHJlZjEgPSB0b3RhbE1lbWJlcnM7IDEgPD0gcmVmMSA/IGsgPD0gcmVmMSA6IGsgPj0gcmVmMTsgaSA9IDEgPD0gcmVmMSA/ICsrayA6IC0taykge1xuICAgICAgICBnZW5lcmF0aW9uLmluc3RhbmNlcy5wdXNoKHtcbiAgICAgICAgICBpZDogaSxcbiAgICAgICAgICBob3N0SWQ6IFwiZG8uXCIgKyBpLFxuICAgICAgICAgIGhvc3ROYW1lOiBcImRvLlwiICsgaSxcbiAgICAgICAgICBzdGF0ZTogXCJhY3RpdmVcIixcbiAgICAgICAgICBzdGF0dXM6IFwib25saW5lXCIsXG4gICAgICAgICAgcm9sZTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgc2VydmVyU3BlY3NJZDogXCJiMlwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5nZW5lcmF0aW9ucy5wdXNoKGdlbmVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIEhvcml6Q2x1c3Rlci5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBzY2FsZXNIb3JpejogdGhpcy5zY2FsZXNIb3JpeixcbiAgICAgIHNjYWxlc1JlZHVuZDogdGhpcy5zY2FsZXNSZWR1bmQsXG4gICAgICBnZW5lcmF0aW9uczogdGhpcy5nZW5lcmF0aW9ucyxcbiAgICAgIHNlcnZpY2VUeXBlOiB0aGlzLnNlcnZpY2VUeXBlLFxuICAgICAgYWRtaW5QYXRoOiB0aGlzLmFkbWluUGF0aFxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIEhvcml6Q2x1c3RlcjtcblxufSkoKTtcblxueCA9IHtcbiAgXCJpZFwiOiBcIndlYi5tYWluXCIsXG4gIFwibmFtZVwiOiBcImphZGUtanVnXCIsXG4gIFwic3RhdGVcIjogXCJhY3RpdmVcIixcbiAgXCJzZXJ2aWNlVHlwZVwiOiBcImRlZmF1bHRcIixcbiAgXCJzY2FsZXNIb3JpelwiOiB0cnVlLFxuICBcInNjYWxlc1JlZHVuZFwiOiBmYWxzZSxcbiAgXCJnZW5lcmF0aW9uc1wiOiBbXG4gICAge1xuICAgICAgXCJpZFwiOiBcIndlYi5tYWluLmdlbjJcIixcbiAgICAgIFwic3RhdGVcIjogXCJhY3RpdmVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwib25saW5lXCIsXG4gICAgICBcImluc3RhbmNlc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImlkXCI6IDEsXG4gICAgICAgICAgXCJob3N0SWRcIjogXCJkby4yXCIsXG4gICAgICAgICAgXCJob3N0TmFtZVwiOiBcImRvLjJcIixcbiAgICAgICAgICBcInN0YXRlXCI6IFwiYWN0aXZlXCIsXG4gICAgICAgICAgXCJzdGF0dXNcIjogXCJvbmxpbmVcIixcbiAgICAgICAgICBcInJvbGVcIjogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgXCJzZXJ2ZXJTcGVjc0lkXCI6IFwiNTEybWJcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59O1xuIiwidmFyIEFwcENvbXBvbmVudCwgSG9zdCwgUGxhdGZvcm1Db21wb25lbnQ7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5QbGF0Zm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcGxhdGZvcm0tY29tcG9uZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSG9zdCA9IChmdW5jdGlvbigpIHtcbiAgSG9zdC5ob3N0Q291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIEhvc3QobWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICBpZiAobWFrZUxvdHNPZkNvbXBvbmVudHMgPT0gbnVsbCkge1xuICAgICAgbWFrZUxvdHNPZkNvbXBvbmVudHMgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gICAgdGhpcy5pZCA9IFwiaG9zdC5cIiArICgrK0hvc3QuaG9zdENvdW50KTtcbiAgICB0aGlzLm5hbWUgPSBcImVjMi5cIiArIEhvc3QuaG9zdENvdW50O1xuICAgIHRoaXMuc2VydmVyU3BlY3NJZCA9IFwiYjFcIjtcbiAgICB0aGlzLmJ1bmtob3VzZUlkID0gXCJidW5raG91c2VcIjtcbiAgICB0aGlzLnBsYXRmb3JtU2VydmljZXMgPSBbbmV3IFBsYXRmb3JtQ29tcG9uZW50KFwibGJcIiwgXCJtZXNoXCIpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJsZ1wiLCBcImxvZ2dlclwiKSwgbmV3IFBsYXRmb3JtQ29tcG9uZW50KFwiaG1cIiwgXCJtb25pdG9yXCIpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJtclwiLCBcInB1c2hlclwiKSwgbmV3IFBsYXRmb3JtQ29tcG9uZW50KFwiZ3NcIiwgXCJ3YXJlaG91c2VcIildO1xuICAgIHRoaXMuYXBwQ29tcG9uZW50cyA9IFtdO1xuICB9XG5cbiAgSG9zdC5wcm90b3R5cGUuY3JlYXRlQ29tcG9uZW50cyA9IGZ1bmN0aW9uKG1ha2VMb3RzT2ZDb21wb25lbnRzKSB7XG4gICAgaWYgKCFtYWtlTG90c09mQ29tcG9uZW50cykge1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdydWJ5JywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ21vbmdvLWRiJywgZmFsc2UsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ21vbmdvLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdub2RlJywgdHJ1ZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ21lbWNhY2hlZCcsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdweXRob24nLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAnc3RvcmFnZScsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdqYXZhJywgdHJ1ZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ3BocCcsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ2NvdWNoLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ21hcmlhLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ3Bvc3RncmVzLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ3JlZGlzJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ3BlcmNvbmEtZGInLCBmYWxzZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ2RlZmF1bHQnLCB0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLmFkZENvbXBvbmVudCgnZGInLCAnZGVmYXVsdC1kYicsIGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgSG9zdC5wcm90b3R5cGUuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24oa2luZCwgdHlwZSwgaXNIb3Jpem9udGFsbHlTY2FsYWJsZSwgaXNSZWR1bmRTY2FsYWJsZSkge1xuICAgIHJldHVybiB0aGlzLmFwcENvbXBvbmVudHMucHVzaChuZXcgQXBwQ29tcG9uZW50KGtpbmQsIHR5cGUsIGlzSG9yaXpvbnRhbGx5U2NhbGFibGUsIGlzUmVkdW5kU2NhbGFibGUpKTtcbiAgfTtcblxuICBIb3N0LnByb3RvdHlwZS5zZXJpYWxpemVDb21wb25lbnRzID0gZnVuY3Rpb24oY29tcG9uZW50cykge1xuICAgIHZhciBhciwgY29tcG9uZW50LCBpLCBsZW47XG4gICAgYXIgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBjb21wb25lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb21wb25lbnQgPSBjb21wb25lbnRzW2ldO1xuICAgICAgYXIucHVzaChjb21wb25lbnQuc2VyaWFsaXplKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXI7XG4gIH07XG5cbiAgSG9zdC5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBzZXJ2ZXJTcGVjc0lkOiB0aGlzLnNlcnZlclNwZWNzSWQsXG4gICAgICBidW5raG91c2VJZDogdGhpcy5idW5raG91c2VJZCxcbiAgICAgIHBsYXRmb3JtU2VydmljZXM6IHRoaXMuc2VyaWFsaXplQ29tcG9uZW50cyh0aGlzLnBsYXRmb3JtU2VydmljZXMpLFxuICAgICAgYXBwQ29tcG9uZW50czogdGhpcy5zZXJpYWxpemVDb21wb25lbnRzKHRoaXMuYXBwQ29tcG9uZW50cylcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBIb3N0O1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgUGxhdGZvcm1Db21wb25lbnQ7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXRmb3JtQ29tcG9uZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQbGF0Zm9ybUNvbXBvbmVudChpZCwga2luZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmtpbmQgPSBraW5kO1xuICAgIHRoaXMuaXNTcGxpdGFibGUgPSB0cnVlO1xuICAgIHRoaXMubW9kZSA9ICdzaW1wbGUnO1xuICAgIHRoaXMuYWRtaW5QYXRoID0gXCIvc29tZS9wYXRoL3RvL2FkbWluXCI7XG4gICAgdGhpcy5jb21wb25lbnRzID0gW25ldyBBcHBDb21wb25lbnQoJ3dlYicsICd3ZWItZGInLCB0cnVlLCB0cnVlKS5zZXJpYWxpemUoKSwgbmV3IEFwcENvbXBvbmVudCgnZGInLCAnZGVmYXVsdC1kYicsIGZhbHNlLCBmYWxzZSkuc2VyaWFsaXplKCldO1xuICB9XG5cbiAgUGxhdGZvcm1Db21wb25lbnQucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIGtpbmQ6IHRoaXMua2luZCxcbiAgICAgIGlzU3BsaXRhYmxlOiB0aGlzLmlzU3BsaXRhYmxlLFxuICAgICAgbW9kZTogdGhpcy5tb2RlLFxuICAgICAgY29tcG9uZW50czogdGhpcy5jb21wb25lbnRzXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gUGxhdGZvcm1Db21wb25lbnQ7XG5cbn0pKCk7XG5cbih7XG4gIGlkOiBcImxvZ2dlcjFcIixcbiAga2luZDogXCJtZXNoXCIsXG4gIG1vZGU6IFwic2ltcGxlXCIsXG4gIGlzU3BsaXRhYmxlOiB0cnVlLFxuICBjb21wb25lbnRzOiBbXG4gICAge1xuICAgICAgaWQ6IFwiOWU2M2Q3MDAtYzg0ZS00NWVkLWJhMTUtZWQxOTJmY2Y5MmIyXCIsXG4gICAgICB1aWQ6IFwiZGF0YS5wb3J0YWxcIixcbiAgICAgIG5hbWU6IFwibHVja3ktbGltZVwiLFxuICAgICAgc3RhdGU6IFwiY3JlYXRlZFwiLFxuICAgICAgc2VydmljZVR5cGU6IFwiZGVmYXVsdC1kYlwiLFxuICAgICAgc2NhbGVzSG9yaXo6IGZhbHNlLFxuICAgICAgc2NhbGVzUmVkdW5kOiBmYWxzZSxcbiAgICAgIGlzU3BsaXRhYmxlOiB0cnVlLFxuICAgICAgZ2VuZXJhdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBcImRhdGEucG9ydGFsLmdlbjFcIixcbiAgICAgICAgICBzdGF0ZTogXCJjcmVhdGVkXCIsXG4gICAgICAgICAgc3RhdHVzOiBcIm9ubGluZVwiLFxuICAgICAgICAgIGluc3RhbmNlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgaG9zdElkOiBcInRlc3QtaG9zdC1uYW1lXCIsXG4gICAgICAgICAgICAgIGhvc3ROYW1lOiBcInRlc3QtaG9zdC1uYW1lXCIsXG4gICAgICAgICAgICAgIHN0YXRlOiBcImNyZWF0ZWRcIixcbiAgICAgICAgICAgICAgc3RhdHVzOiBcIm9ubGluZVwiLFxuICAgICAgICAgICAgICByb2xlOiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgc2VydmVyU3BlY3NJZDogXCI1MTJtYlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICBdXG59KTtcbiIsInZhciAkaG9sZGVyLCBDbG9iYmVyQm94RGF0YVNoaW0sIFVJLCBib3hlcztcblxuVUkgPSByZXF1aXJlKCcuL3Rlc3QtdWkvdWknKTtcblxuQ2xvYmJlckJveERhdGFTaGltID0gcmVxdWlyZSgnLi9zaGltcy9kYXRhLXNoaW0nKTtcblxud2luZG93LmNsb2JiZXJCb3hEYXRhU2hpbSA9IG5ldyBDbG9iYmVyQm94RGF0YVNoaW0oKTtcblxuYm94ZXMgPSBbXTtcblxuJGhvbGRlciA9ICQoXCIuaG9sZGVyXCIpO1xuXG53aW5kb3cuaW5pdCA9IChmdW5jdGlvbihfdGhpcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFkZEV2ZW50TGlzdGVuZXJzLCBnZXRCb3gsIGdldFBhcmVudE9mQ29tcG9uZW50LCBnZXRQYXJlbnRPZkdlbmVyYXRpb24sIHJlbW92ZUJveCwgc3Vic2NyaWJlVG9SZWdpc3RyYXRpb25zLCB1aTtcbiAgICBzdGF0c0RhdGFTaW11bHRvci5jcmVhdGVGYWtlU3RhdERhdGFQcm92aWRlcigpO1xuICAgIHVpID0gbmV3IFVJKCQoJ2JvZHknKSk7XG4gICAgd2luZG93LmFkZEdlbmVyYXRpb24gPSBmdW5jdGlvbihjb21wb25lbnRJZCwgc3RhdGUpIHtcbiAgICAgIHZhciBnZW5EYXRhO1xuICAgICAgaWYgKHN0YXRlID09IG51bGwpIHtcbiAgICAgICAgc3RhdGUgPSAncHJvdmlzaW9uaW5nJztcbiAgICAgIH1cbiAgICAgIGdlbkRhdGEgPSBjbG9iYmVyQm94RGF0YVNoaW0uZ2V0R2VuZXJhdGlvbihjb21wb25lbnRJZCwgc3RhdGUpLnNlcmlhbGl6ZSgpO1xuICAgICAgcmV0dXJuIGdldFBhcmVudE9mQ29tcG9uZW50KGNvbXBvbmVudElkKS5hZGRHZW5lcmF0aW9uKGNvbXBvbmVudElkLCBnZW5EYXRhKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRDb21wb25lbnQgPSBmdW5jdGlvbihob3N0SWQpIHtcbiAgICAgIHJldHVybiBnZXRCb3goaG9zdElkKS5hZGRDb21wb25lbnQoY2xvYmJlckJveERhdGFTaGltLmdldEFwcENvbXBvbmVudCgpLnNlcmlhbGl6ZSgpKTtcbiAgICB9O1xuICAgIHdpbmRvdy5yZW1vdmVDb21wb25lbnQgPSBmdW5jdGlvbihjb21wb25lbnRJZCkge1xuICAgICAgcmV0dXJuIGdldFBhcmVudE9mQ29tcG9uZW50KGNvbXBvbmVudElkKS5yZW1vdmVDb21wb25lbnQoY29tcG9uZW50SWQpO1xuICAgIH07XG4gICAgd2luZG93LnJlbW92ZUdlbmVyYXRpb24gPSBmdW5jdGlvbihnZW5lcmF0aW9uSWQpIHtcbiAgICAgIHJldHVybiBnZXRQYXJlbnRPZkdlbmVyYXRpb24oZ2VuZXJhdGlvbklkKS5yZW1vdmVHZW5lcmF0aW9uKGdlbmVyYXRpb25JZCk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkSG9zdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhvc3RCb3g7XG4gICAgICBob3N0Qm94ID0gbmV3IG5hbm9ib3guQ2xvYmJlckJveCgpO1xuICAgICAgaG9zdEJveC5idWlsZCgkaG9sZGVyLCBuYW5vYm94LkNsb2JiZXJCb3guSE9TVCwgY2xvYmJlckJveERhdGFTaGltLmdldEhvc3QoZmFsc2UpLnNlcmlhbGl6ZSgpKTtcbiAgICAgIHJldHVybiB1aS5ub3RlQ29tcG9uZW50cyhob3N0Qm94KTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRDbHVzdGVyID0gZnVuY3Rpb24oY2x1c3RlckRhdGEpIHtcbiAgICAgIHZhciBjbHVzdGVyQm94LCBkYXRhLCBnZW5lcmF0aW9uLCBqLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgIHJlZiA9IGNsdXN0ZXJEYXRhLmdlbmVyYXRpb25zO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIGdlbmVyYXRpb24gPSByZWZbal07XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgc2VydmljZUlkOiBjbHVzdGVyRGF0YS5pZCxcbiAgICAgICAgICBzZXJ2aWNlU3RhdGU6IGNsdXN0ZXJEYXRhLnN0YXRlLFxuICAgICAgICAgIG5hbWU6IGNsdXN0ZXJEYXRhLm5hbWUsXG4gICAgICAgICAgc2VydmljZVR5cGU6IGNsdXN0ZXJEYXRhLnNlcnZpY2VUeXBlLFxuICAgICAgICAgIHNjYWxlc0hvcml6OiBjbHVzdGVyRGF0YS5zY2FsZXNIb3JpeixcbiAgICAgICAgICBzY2FsZXNSZWR1bmQ6IGNsdXN0ZXJEYXRhLnNjYWxlc1JlZHVuZCxcbiAgICAgICAgICBhZG1pblBhdGg6IGNsdXN0ZXJEYXRhLmFkbWluUGF0aCxcbiAgICAgICAgICBpbnN0YW5jZXM6IGNsdXN0ZXJEYXRhLmluc3RhbmNlcyxcbiAgICAgICAgICBpZDogZ2VuZXJhdGlvbi5pZCxcbiAgICAgICAgICBnZW5lcmF0aW9uU3RhdGU6IGdlbmVyYXRpb24uc3RhdGUsXG4gICAgICAgICAgZ2VuZXJhdGlvblN0YXR1czogZ2VuZXJhdGlvbi5zdGF0dXMsXG4gICAgICAgICAgbWVtYmVyczogZ2VuZXJhdGlvbi5pbnN0YW5jZXMsXG4gICAgICAgICAgdG90YWxNZW1iZXJzOiBnZW5lcmF0aW9uLmluc3RhbmNlcy5sZW5ndGhcbiAgICAgICAgfTtcbiAgICAgICAgY2x1c3RlckJveCA9IG5ldyBuYW5vYm94LkNsb2JiZXJCb3goKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNsdXN0ZXJCb3guYnVpbGQoJGhvbGRlciwgbmFub2JveC5DbG9iYmVyQm94LkNMVVNURVIsIGRhdGEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgd2luZG93LnNldFN0YXRlID0gZnVuY3Rpb24oaWQsIHN0YXRlKSB7XG4gICAgICByZXR1cm4gZ2V0Qm94KGlkKS5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB3aW5kb3cubWFuYWdlQ29tcG9uZW50ID0gZnVuY3Rpb24oY29tcG9uZW50SWQpIHtcbiAgICAgIHZhciBib3gsIGJveEhvc3QsIHg7XG4gICAgICBib3ggPSBnZXRCb3goY29tcG9uZW50SWQpO1xuICAgICAgaWYgKGJveCAhPSBudWxsKSB7XG4gICAgICAgIHggPSAwO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBib3hIb3N0ID0gZ2V0UGFyZW50T2ZDb21wb25lbnQoKTtcbiAgICAgIGlmIChib3hIb3N0ICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHggPSAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LnNldEdlbmVyYXRpb25TdGF0ZSA9IGZ1bmN0aW9uKGlkLCBzdGF0ZSkge1xuICAgICAgcmV0dXJuIGdldFBhcmVudE9mR2VuZXJhdGlvbihpZCkuc2V0R2VuZXJhdGlvblN0YXRlKGlkLCBzdGF0ZSk7XG4gICAgfTtcbiAgICBzdWJzY3JpYmVUb1JlZ2lzdHJhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NDQUxFLkdFVF9PUFRJT05TJywgZnVuY3Rpb24obSwgY2IpIHtcbiAgICAgICAgcmV0dXJuIGNiKHNjYWxlTWFjaGluZVRlc3REYXRhLmdldEhvc3RPcHRpb25zKCkpO1xuICAgICAgfSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdSRUdJU1RFUicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgYm94KSB7XG4gICAgICAgICAgcmV0dXJuIGJveGVzLnB1c2goYm94KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1VOUkVHSVNURVInLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGJveCkge1xuICAgICAgICAgIHJldHVybiByZW1vdmVCb3goYm94KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NDQUxFLlNBVkUnLCBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IFNjYWxlOlwiKTtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHViU3ViLnN1YnNjcmliZSgnU1BMSVQuU0FWRScsIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTcGxpdDpcIik7XG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuQVBQX0NPTVBPTkVOVFMnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ2FwcC1jb21wb25lbnRzJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlBMQVRGT1JNX0NPTVBPTkVOVFMnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ3BsYXRmb3JtLWNvbXBvbmVudHMnLCBkYXRhLmVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuSE9TVC1JTlRBTkNFUycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS5pZCkuc3dpdGNoU3ViQ29udGVudCgnaG9zdC1pbnN0YW5jZXMnLCBkYXRhLmVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuU0NBTEUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ3NjYWxlLW1hY2hpbmUnLCBkYXRhLmVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuU1RBVFMnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ3N0YXRzJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLkNPTlNPTEUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ2NvbnNvbGUnLCBkYXRhLmVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuU1BMSVQnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ3NwbGl0JywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICByZXR1cm4gUHViU3ViLnN1YnNjcmliZSgnU0hPVy5BRE1JTicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS5pZCkuc3dpdGNoU3ViQ29udGVudCgnYWRtaW4nLCBkYXRhLmVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9O1xuICAgIGdldEJveCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgYm94LCBqLCBsZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSBib3hlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBib3ggPSBib3hlc1tqXTtcbiAgICAgICAgaWYgKGlkID09PSBib3guaWQpIHtcbiAgICAgICAgICByZXR1cm4gYm94O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBnZXRQYXJlbnRPZkNvbXBvbmVudCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgYm94LCBqLCBsZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSBib3hlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBib3ggPSBib3hlc1tqXTtcbiAgICAgICAgaWYgKGJveC5oYXNDb21wb25lbnRXaXRoSWQoaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIGJveDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZ2V0UGFyZW50T2ZHZW5lcmF0aW9uID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBib3gsIGosIGxlbjtcbiAgICAgIGZvciAoaiA9IDAsIGxlbiA9IGJveGVzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIGJveCA9IGJveGVzW2pdO1xuICAgICAgICBpZiAoYm94Lmhhc0dlbmVyYXRpb25XaXRoSWQoaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIGJveDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmVtb3ZlQm94ID0gZnVuY3Rpb24oZG9vbWVkQm94KSB7XG4gICAgICB2YXIgYm94LCBpLCBqLCBsZW47XG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuID0gYm94ZXMubGVuZ3RoOyBqIDwgbGVuOyBpID0gKytqKSB7XG4gICAgICAgIGJveCA9IGJveGVzW2ldO1xuICAgICAgICBpZiAoYm94LmlkID09PSBkb29tZWRCb3guaWQpIHtcbiAgICAgICAgICBib3hlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBzdWJzY3JpYmVUb1JlZ2lzdHJhdGlvbnMoKTtcbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xuICAgIGFkZEhvc3QoKTtcbiAgICBhZGRDbHVzdGVyKGNsb2JiZXJCb3hEYXRhU2hpbS5nZXRIb3JpekNsdXN0ZXIoKS5zZXJpYWxpemUoKSk7XG4gICAgYWRkQ2x1c3RlcihjbG9iYmVyQm94RGF0YVNoaW0uZ2V0RGF0YUNsdXN0ZXIoKS5zZXJpYWxpemUoKSk7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXROb0RlcGxveXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBnZXRCb3goXCJob3N0LjFcIikuc2hvd0FzUmVhZHlGb3JEZXBsb3lzKCk7XG4gICAgfTtcbiAgfTtcbn0pKHRoaXMpO1xuIiwidmFyIFVJO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVJID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBVSSgpIHtcbiAgICB0aGlzLmluaXRTdGF0ZVNlbGVjdG9yKCQoXCIuc3RhdGVzXCIpKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICBQdWJTdWIuc3Vic2NyaWJlKCdSRUdJU1RFUicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGJveCkge1xuICAgICAgICByZXR1cm4gX3RoaXMucmVnaXN0ZXJCb3goYm94KTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9XG5cbiAgVUkucHJvdG90eXBlLnJlZ2lzdGVyQm94ID0gZnVuY3Rpb24oYm94KSB7XG4gICAgaWYgKGJveC5kYXRhLmlkLmluY2x1ZGVzKCdnZW4nKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVG9TZWxlY3RvcigkKCcuZ2VuZXJhdGlvbnMnLCAnLnVpLXNoaW0nKSwgYm94KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVG9TZWxlY3RvcigkKCcuaG9zdHMnLCAnLnVpLXNoaW0nKSwgYm94KTtcbiAgICB9XG4gIH07XG5cbiAgVUkucHJvdG90eXBlLmFkZFRvU2VsZWN0b3IgPSBmdW5jdGlvbigkc2VsZWN0b3IsIGJveCkge1xuICAgIGlmICgkKFwib3B0aW9uW3ZhbHVlPSdcIiArIGJveC5kYXRhLmlkICsgXCInXVwiLCAkc2VsZWN0b3IpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gJHNlbGVjdG9yLmFwcGVuZChcIjxvcHRpb24gdmFsdWU9J1wiICsgYm94LmRhdGEuaWQgKyBcIic+XCIgKyBib3guZGF0YS5pZCArIFwiPC9vcHRpb24+XCIpO1xuICB9O1xuXG4gIFVJLnByb3RvdHlwZS5pbml0U3RhdGVTZWxlY3RvciA9IGZ1bmN0aW9uKCRzZWxlY3Rvcikge1xuICAgIHZhciBpLCBsZW4sIHJlc3VsdHMsIHN0YXRlLCBzdGF0ZXM7XG4gICAgc3RhdGVzID0gWycnLCAnY3JlYXRlZCcsICdpbml0aWFsaXplZCcsICdvcmRlcmVkJywgJ3Byb3Zpc2lvbmluZycsICdkZWZ1bmN0JywgJ2FjdGl2ZScsICdkZWNvbWlzc2lvbmluZycsICdkZXN0cm95JywgJ2FyY2hpdmVkJ107XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHN0YXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbaV07XG4gICAgICByZXN1bHRzLnB1c2goJHNlbGVjdG9yLmFwcGVuZChcIjxvcHRpb24gdmFsdWU9J1wiICsgc3RhdGUgKyBcIic+XCIgKyBzdGF0ZSArIFwiPC9vcHRpb24+XCIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgVUkucHJvdG90eXBlLmluaXRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICAkKFwiYnV0dG9uI2hvc3RzXCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWQsIHN0YXRlO1xuICAgICAgICBpZCA9ICQoXCJzZWxlY3QjaG9zdHMtc3RhdGUtc2VsZWN0b3JcIikudmFsKCk7XG4gICAgICAgIHN0YXRlID0gJChcInNlbGVjdCNob3N0LXN0YXRlc1wiKS52YWwoKTtcbiAgICAgICAgcmV0dXJuIHNldFN0YXRlKGlkLCBzdGF0ZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICAkKFwiYnV0dG9uI2dlbmVyYXRpb25zXCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWQsIHN0YXRlO1xuICAgICAgICBpZCA9ICQoXCJzZWxlY3QjZ2VuZXJhdGlvbnMtc3RhdGUtc2VsZWN0b3JcIikudmFsKCk7XG4gICAgICAgIHN0YXRlID0gJChcInNlbGVjdCNnZW4tc3RhdGVzXCIpLnZhbCgpO1xuICAgICAgICByZXR1cm4gc2V0R2VuZXJhdGlvblN0YXRlKGlkLCBzdGF0ZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICAkKFwiYnV0dG9uI2FkZC1nZW5lcmF0aW9uXCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYWRkR2VuZXJhdGlvbigkKFwic2VsZWN0I2FkZC1nZW5lcmF0aW9uLXNlbGVjdFwiKS52YWwoKSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICAkKFwiYnV0dG9uI3JlbW92ZS1nZW5lcmF0aW9uXCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlR2VuZXJhdGlvbigkKFwic2VsZWN0I3JlbW92ZS1nZW5lcmF0aW9uLXNlbGVjdFwiKS52YWwoKSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICAkKFwiYnV0dG9uI2FkZC1jb21wb25lbnRcIikub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhZGRDb21wb25lbnQoJChcInNlbGVjdCNhZGQtY29tcG9uZW50LXNlbGVjdFwiKS52YWwoKSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICByZXR1cm4gJChcImJ1dHRvbiNyZW1vdmUtY29tcG9uZW50XCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlQ29tcG9uZW50KCQoXCJzZWxlY3QjcmVtb3ZlLWNvbXBvbmVudC1zZWxlY3RcIikudmFsKCkpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gIH07XG5cbiAgVUkucHJvdG90eXBlLm5vdGVDb21wb25lbnRzID0gZnVuY3Rpb24oYm94KSB7XG4gICAgdmFyICRzZWxlY3RvciwgY29tcG9uZW50LCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAkc2VsZWN0b3IgPSAkKFwic2VsZWN0LmNvbXBvbmVudHNcIik7XG4gICAgcmVmID0gYm94LmRhdGEuYXBwQ29tcG9uZW50cztcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb21wb25lbnQgPSByZWZbaV07XG4gICAgICByZXN1bHRzLnB1c2goJHNlbGVjdG9yLmFwcGVuZChcIjxvcHRpb24gdmFsdWU9J1wiICsgY29tcG9uZW50LmlkICsgXCInPlwiICsgY29tcG9uZW50LmlkICsgXCI8L29wdGlvbj5cIikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICByZXR1cm4gVUk7XG5cbn0pKCk7XG4iXX0=

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
    return this.providers[this.provider];
  };

  ScaleDataShim.prototype.getTEMP = function() {
    return {
      meta: {
        title: "DigitalOcean",
        serverTitle: "droplet",
        "default": "512mb",
        totalPlans: 9
      },
      plans: [
        {
          meta: {
            title: "Standard"
          },
          specs: [
            {
              id: "512mb",
              "RAM": 512,
              "CPU": 1,
              "DISK": 20,
              "transfer": 1,
              "dollarsPerHr": 0.00744,
              "dollarsPerMo": 5
            }, {
              id: "1gb",
              "RAM": 1024,
              "CPU": 1,
              "DISK": 30,
              "transfer": 2,
              "dollarsPerHr": 0.01488,
              "dollarsPerMo": 10
            }, {
              id: "2gb",
              "RAM": 2048,
              "CPU": 2,
              "DISK": 40,
              "transfer": 3,
              "dollarsPerHr": 0.02976,
              "dollarsPerMo": 20
            }, {
              id: "4gb",
              "RAM": 4096,
              "CPU": 2,
              "DISK": 60,
              "transfer": 4,
              "dollarsPerHr": 0.05952,
              "dollarsPerMo": 40
            }, {
              id: "8gb",
              "RAM": 8192,
              "CPU": 4,
              "DISK": 80,
              "transfer": 5,
              "dollarsPerHr": 0.11905,
              "dollarsPerMo": 80
            }, {
              id: "16gb",
              "RAM": 16384,
              "CPU": 8,
              "DISK": 160,
              "transfer": 6,
              "dollarsPerHr": 0.2381,
              "dollarsPerMo": 160
            }, {
              id: "32gb",
              "RAM": 32768,
              "CPU": 12,
              "DISK": 320,
              "transfer": 7,
              "dollarsPerHr": 0.47619,
              "dollarsPerMo": 320
            }, {
              id: "48gb",
              "RAM": 49152,
              "CPU": 16,
              "DISK": 480,
              "transfer": 8,
              "dollarsPerHr": 0.71429,
              "dollarsPerMo": 480
            }, {
              id: "64gb",
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
          serverTitle: "Server",
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
                RAM: 1000,
                CPU: 1,
                DISK: 24,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "a2",
                RAM: 2000,
                CPU: 2,
                DISK: 48,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "a3",
                RAM: 4000,
                CPU: 4,
                DISK: 96,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "a4",
                RAM: 8000,
                CPU: 6,
                DISK: 192,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }
        ]
      },
      DIGITAL_OCEAN: {
        meta: {
          title: "Digital Ocean",
          serverTitle: "Droplet",
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
                RAM: 512,
                CPU: 1,
                DISK: 20,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "b2",
                RAM: 1024,
                CPU: 1,
                DISK: 30,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "b3",
                RAM: 2048,
                CPU: 2,
                DISK: 40,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "b4",
                RAM: 4096,
                CPU: 2,
                DISK: 60,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "b5",
                RAM: 8192,
                CPU: 4,
                DISK: 80,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High Volume"
            },
            specs: [
              {
                id: "b6",
                RAM: 16384,
                CPU: 8,
                DISK: 160,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "b7",
                RAM: 32768,
                CPU: 12,
                DISK: 320,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "b8",
                RAM: 49152,
                CPU: 16,
                DISK: 480,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "b9",
                RAM: 65536,
                CPU: 20,
                DISK: 640,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }
        ]
      },
      JOYENT: {
        meta: {
          title: "Joyent",
          serverTitle: "server",
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
                RAM: 1000,
                CPU: 0.25,
                DISK: 33,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c2",
                RAM: 1750,
                CPU: 1,
                DISK: 56,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c3",
                RAM: 2000,
                CPU: 1,
                DISK: 66,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c4",
                RAM: 3750,
                CPU: 1,
                DISK: 123,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c5",
                RAM: 4000,
                CPU: 1,
                DISK: 131,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c6",
                RAM: 5000,
                CPU: 2,
                DISK: 738,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c7",
                RAM: 8000,
                CPU: 2,
                DISK: 789,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c8",
                RAM: 15000,
                CPU: 4,
                DISK: 1467,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c9",
                RAM: 16000,
                CPU: 4,
                DISK: 1575,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c10",
                RAM: 17000.13,
                CPU: 5,
                DISK: 1683,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c11",
                RAM: 30000,
                CPU: 8,
                DISK: 1683,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c12",
                RAM: 32000,
                CPU: 8,
                DISK: 1683,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c13",
                RAM: 40000,
                CPU: 10,
                DISK: 1683,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High Memory"
            },
            specs: [
              {
                id: "c14",
                RAM: 17000.13,
                CPU: 2,
                DISK: 420,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c15",
                RAM: 34000.25,
                CPU: 4,
                DISK: 843,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c16",
                RAM: 68000.38,
                CPU: 8,
                DISK: 1122,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c17",
                RAM: 144000,
                CPU: 18,
                DISK: 2363,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c18",
                RAM: 256000,
                CPU: 32,
                DISK: 4200,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High CPU"
            },
            specs: [
              {
                id: "c19",
                RAM: 1750,
                CPU: 2,
                DISK: 75,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c20",
                RAM: 7000,
                CPU: 7,
                DISK: 263,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c21",
                RAM: 16000,
                CPU: 16,
                DISK: 600,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c22",
                RAM: 24000,
                CPU: 24,
                DISK: 900,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c23",
                RAM: 32000,
                CPU: 32,
                DISK: 1200,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High IO"
            },
            specs: [
              {
                id: "c24",
                RAM: 65000,
                CPU: 8,
                DISK: 1452,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c25",
                RAM: 128000,
                CPU: 16,
                DISK: 3072,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c26",
                RAM: 256000,
                CPU: 32,
                DISK: 6144,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High Storage"
            },
            specs: [
              {
                id: "c27",
                RAM: 32000,
                CPU: 8,
                DISK: 7680,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c28",
                RAM: 64000,
                CPU: 6,
                DISK: 15360,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "c29",
                RAM: 128000,
                CPU: 2,
                DISK: 30720,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }
        ]
      },
      AWS: {
        meta: {
          serverTitle: "EC2",
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
                RAM: 1000,
                CPU: 1,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d2",
                RAM: 2000,
                CPU: 1,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d3",
                RAM: 4000,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d4",
                RAM: 8000,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d5",
                RAM: 8000,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d6",
                RAM: 16000,
                CPU: 4,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d7",
                RAM: 32000,
                CPU: 8,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d8",
                RAM: 64000,
                CPU: 16,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d9",
                RAM: 160000,
                CPU: 40,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d10",
                RAM: 3750,
                CPU: 1,
                DISK: 4,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d11",
                RAM: 5000,
                CPU: 2,
                DISK: 64,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d12",
                RAM: 15000,
                CPU: 4,
                DISK: 80,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d13",
                RAM: 30000,
                CPU: 8,
                DISK: 160,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "Compute Optimized"
            },
            specs: [
              {
                id: "d14",
                RAM: 3750,
                CPU: 2,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d15",
                RAM: 5000,
                CPU: 4,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d16",
                RAM: 15000,
                CPU: 8,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d17",
                RAM: 30000,
                CPU: 16,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d18",
                RAM: 60000,
                CPU: 36,
                DISK: "EBS Only",
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d19",
                RAM: 3750,
                CPU: 2,
                DISK: 32,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d20",
                RAM: 5000,
                CPU: 4,
                DISK: 80,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d21",
                RAM: 15000,
                CPU: 8,
                DISK: 160,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d22",
                RAM: 30000,
                CPU: 16,
                DISK: 320,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d23",
                RAM: 60000,
                CPU: 32,
                DISK: 640,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High GPU"
            },
            specs: [
              {
                id: "d24",
                RAM: 15000,
                CPU: 8,
                DISK: 60,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d25",
                RAM: 60000,
                CPU: 32,
                DISK: 240,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High RAM"
            },
            specs: [
              {
                id: "d26",
                RAM: 15000,
                CPU: 2,
                DISK: 64,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d27",
                RAM: 35000,
                CPU: 4,
                DISK: 160,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d28",
                RAM: 61000,
                CPU: 8,
                DISK: 320,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d29",
                RAM: 122000,
                CPU: 16,
                DISK: 320,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d30",
                RAM: 244000,
                CPU: 32,
                DISK: 640,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }
            ]
          }, {
            meta: {
              title: "High Storage"
            },
            specs: [
              {
                id: "d31",
                RAM: 35000,
                CPU: 4,
                DISK: 800,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d32",
                RAM: 61000,
                CPU: 8,
                DISK: 1600,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d33",
                RAM: 122000,
                CPU: 16,
                DISK: 3200,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d34",
                RAM: 244000,
                CPU: 32,
                DISK: 6400,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d35",
                RAM: 35000,
                CPU: 4,
                DISK: 6000,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d36",
                RAM: 61000,
                CPU: 8,
                DISK: 12000,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d37",
                RAM: 122000,
                CPU: 16,
                DISK: 24000,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
              }, {
                id: "d38",
                RAM: 244000,
                CPU: 36,
                DISK: 48000,
                dollarsPerHr: 0.1,
                transfer: 1,
                dollarsPerMo: 10
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

PubSub.subscribe('SCALE.GET_OPTIONS', function(m, cb) {
  return cb(scaleMachineTestData.getHostOptions());
});

window.init = (function(_this) {
  return function() {
    var config, config2, onSpecsChange, totalInstances;
    onSpecsChange = function(data) {
      console.log("The user has selected :");
      return console.log(data);
    };
    totalInstances = 5;
    config = {
      activeServerId: {
        primary: scaleMachineTestData.getSampleScaleId()
      },
      onSpecsChange: onSpecsChange,
      totalInstances: totalInstances,
      isHorizontallyScalable: true,
      isCluster: true
    };
    window.app = new nanobox.ScaleMachine($(".holder"), config);
    return config2 = {
      activeServerId: {
        primary: scaleMachineTestData.getSampleScaleId(),
        secondary: scaleMachineTestData.getSampleScaleId(),
        monitor: scaleMachineTestData.getSampleScaleId()
      },
      onSpecsChange: onSpecsChange,
      totalInstances: totalInstances,
      isHorizontallyScalable: false,
      isCluster: true
    };
  };
})(this);

},{"./shims/data-shim":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvZGF0YS1zaGltLmNvZmZlZSIsInN0YWdlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3g2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTY2FsZURhdGFTaGltLFxuICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY2FsZURhdGFTaGltID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBTY2FsZURhdGFTaGltKCkge1xuICAgIHRoaXMuZ2V0SG9zdE9wdGlvbnMgPSBiaW5kKHRoaXMuZ2V0SG9zdE9wdGlvbnMsIHRoaXMpO1xuICAgIHRoaXMuZ2V0U2VydmljZVNwZWNzID0gYmluZCh0aGlzLmdldFNlcnZpY2VTcGVjcywgdGhpcyk7XG4gICAgdmFyIHByb3ZpZGVycztcbiAgICBwcm92aWRlcnMgPSBbXCJBV1NcIiwgXCJMSU5PREVcIiwgXCJESUdJVEFMX09DRUFOXCIsIFwiSk9ZRU5UXCJdO1xuICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcnNbMl07XG4gICAgdGhpcy5jcmVhdGVIYXNoKCk7XG4gIH1cblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRTYW1wbGVTY2FsZUlkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJhbmRvbUluZGV4O1xuICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcih0aGlzLnByb3ZpZGVyc1t0aGlzLnByb3ZpZGVyXS5wbGFuc1swXS5zcGVjcy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKTtcbiAgICByZXR1cm4gdGhpcy5wcm92aWRlcnNbdGhpcy5wcm92aWRlcl0ucGxhbnNbMF0uc3BlY3NbcmFuZG9tSW5kZXhdLmlkO1xuICB9O1xuXG4gIFNjYWxlRGF0YVNoaW0ucHJvdG90eXBlLmdldFNlcnZpY2VTcGVjcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmZvO1xuICAgIGluZm8gPSB0aGlzLmdldEN1cnJlbnRTcGVjcygpO1xuICAgIGluZm8uaG9zdCA9IHRoaXMucHJvdmlkZXI7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgZGF0YTogaW5mb1xuICAgIH0pKTtcbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRIb3N0T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3ZpZGVyc1t0aGlzLnByb3ZpZGVyXTtcbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRURU1QID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgdGl0bGU6IFwiRGlnaXRhbE9jZWFuXCIsXG4gICAgICAgIHNlcnZlclRpdGxlOiBcImRyb3BsZXRcIixcbiAgICAgICAgXCJkZWZhdWx0XCI6IFwiNTEybWJcIixcbiAgICAgICAgdG90YWxQbGFuczogOVxuICAgICAgfSxcbiAgICAgIHBsYW5zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJTdGFuZGFyZFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogXCI1MTJtYlwiLFxuICAgICAgICAgICAgICBcIlJBTVwiOiA1MTIsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDEsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiAyMCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiAxLFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjAwNzQ0LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiA1XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGlkOiBcIjFnYlwiLFxuICAgICAgICAgICAgICBcIlJBTVwiOiAxMDI0LFxuICAgICAgICAgICAgICBcIkNQVVwiOiAxLFxuICAgICAgICAgICAgICBcIkRJU0tcIjogMzAsXG4gICAgICAgICAgICAgIFwidHJhbnNmZXJcIjogMixcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVySHJcIjogMC4wMTQ4OCxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVyTW9cIjogMTBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgaWQ6IFwiMmdiXCIsXG4gICAgICAgICAgICAgIFwiUkFNXCI6IDIwNDgsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDIsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiA0MCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiAzLFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjAyOTc2LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiAyMFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBpZDogXCI0Z2JcIixcbiAgICAgICAgICAgICAgXCJSQU1cIjogNDA5NixcbiAgICAgICAgICAgICAgXCJDUFVcIjogMixcbiAgICAgICAgICAgICAgXCJESVNLXCI6IDYwLFxuICAgICAgICAgICAgICBcInRyYW5zZmVyXCI6IDQsXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1BlckhyXCI6IDAuMDU5NTIsXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1Blck1vXCI6IDQwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGlkOiBcIjhnYlwiLFxuICAgICAgICAgICAgICBcIlJBTVwiOiA4MTkyLFxuICAgICAgICAgICAgICBcIkNQVVwiOiA0LFxuICAgICAgICAgICAgICBcIkRJU0tcIjogODAsXG4gICAgICAgICAgICAgIFwidHJhbnNmZXJcIjogNSxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVySHJcIjogMC4xMTkwNSxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVyTW9cIjogODBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgaWQ6IFwiMTZnYlwiLFxuICAgICAgICAgICAgICBcIlJBTVwiOiAxNjM4NCxcbiAgICAgICAgICAgICAgXCJDUFVcIjogOCxcbiAgICAgICAgICAgICAgXCJESVNLXCI6IDE2MCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiA2LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjIzODEsXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1Blck1vXCI6IDE2MFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBpZDogXCIzMmdiXCIsXG4gICAgICAgICAgICAgIFwiUkFNXCI6IDMyNzY4LFxuICAgICAgICAgICAgICBcIkNQVVwiOiAxMixcbiAgICAgICAgICAgICAgXCJESVNLXCI6IDMyMCxcbiAgICAgICAgICAgICAgXCJ0cmFuc2ZlclwiOiA3LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJIclwiOiAwLjQ3NjE5LFxuICAgICAgICAgICAgICBcImRvbGxhcnNQZXJNb1wiOiAzMjBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgaWQ6IFwiNDhnYlwiLFxuICAgICAgICAgICAgICBcIlJBTVwiOiA0OTE1MixcbiAgICAgICAgICAgICAgXCJDUFVcIjogMTYsXG4gICAgICAgICAgICAgIFwiRElTS1wiOiA0ODAsXG4gICAgICAgICAgICAgIFwidHJhbnNmZXJcIjogOCxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVySHJcIjogMC43MTQyOSxcbiAgICAgICAgICAgICAgXCJkb2xsYXJzUGVyTW9cIjogNDgwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGlkOiBcIjY0Z2JcIixcbiAgICAgICAgICAgICAgXCJSQU1cIjogNjU1MzYsXG4gICAgICAgICAgICAgIFwiQ1BVXCI6IDIwLFxuICAgICAgICAgICAgICBcIkRJU0tcIjogNjQwLFxuICAgICAgICAgICAgICBcInRyYW5zZmVyXCI6IDksXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1BlckhyXCI6IDAuOTUyMzgsXG4gICAgICAgICAgICAgIFwiZG9sbGFyc1Blck1vXCI6IDY0MFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH07XG5cbiAgU2NhbGVEYXRhU2hpbS5wcm90b3R5cGUuZ2V0Q3VycmVudFNwZWNzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpY3QsIGksIGosIGxlbiwgbGVuMSwgcGxhbiwgcmVmLCByZWYxLCBzcGVjO1xuICAgIGRpY3QgPSB7XG4gICAgICBMSU5PREU6ICdhJyxcbiAgICAgIERJR0lUQUxfT0NFQU46ICdiJyxcbiAgICAgIEpPWUVOVDogJ2MnLFxuICAgICAgQVdTOiAnZCdcbiAgICB9O1xuICAgIHRoaXMuc3BlY0lkID0gZGljdFt0aGlzLnByb3ZpZGVyXSArIFwiMlwiO1xuICAgIHJlZiA9IHRoaXMucHJvdmlkZXJzW3RoaXMucHJvdmlkZXJdLnBsYW5zO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcGxhbiA9IHJlZltpXTtcbiAgICAgIHJlZjEgPSBwbGFuLnNwZWNzO1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHNwZWMgPSByZWYxW2pdO1xuICAgICAgICBpZiAoc3BlYy5pZCA9PT0gdGhpcy5zcGVjSWQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFtOiBzcGVjLlJBTSxcbiAgICAgICAgICAgIGNwdTogc3BlYy5DUFUsXG4gICAgICAgICAgICBkaXNrOiBzcGVjLkRJU0ssXG4gICAgICAgICAgICBpZDogc3BlYy5pZFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgU2NhbGVEYXRhU2hpbS5wcm90b3R5cGUuY3JlYXRlSGFzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3ZpZGVycyA9IHtcbiAgICAgIExJTk9ERToge1xuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgdGl0bGU6IFwiTGlub2RlXCIsXG4gICAgICAgICAgc2VydmVyVGl0bGU6IFwiU2VydmVyXCIsXG4gICAgICAgICAgXCJkZWZhdWx0XCI6IFwiYTFcIixcbiAgICAgICAgICB0b3RhbFBsYW5zOiA0XG4gICAgICAgIH0sXG4gICAgICAgIHBsYW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJTdGFuZGFyZCBDb25maWd1cmF0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYTFcIixcbiAgICAgICAgICAgICAgICBSQU06IDEwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDI0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImEyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA0OCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogNDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogOTYsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYTRcIixcbiAgICAgICAgICAgICAgICBSQU06IDgwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA2LFxuICAgICAgICAgICAgICAgIERJU0s6IDE5MixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBESUdJVEFMX09DRUFOOiB7XG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICB0aXRsZTogXCJEaWdpdGFsIE9jZWFuXCIsXG4gICAgICAgICAgc2VydmVyVGl0bGU6IFwiRHJvcGxldFwiLFxuICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImIxXCIsXG4gICAgICAgICAgdG90YWxQbGFuczogOVxuICAgICAgICB9LFxuICAgICAgICBwbGFuczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhbmRhcmRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNTEyLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiAyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTAyNCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMzAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjNcIixcbiAgICAgICAgICAgICAgICBSQU06IDIwNDgsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImI0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0MDk2LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogODE5MixcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIFZvbHVtZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImI2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNjM4NCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImI3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMjc2OCxcbiAgICAgICAgICAgICAgICBDUFU6IDEyLFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNDkxNTIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiA0ODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjlcIixcbiAgICAgICAgICAgICAgICBSQU06IDY1NTM2LFxuICAgICAgICAgICAgICAgIENQVTogMjAsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIEpPWUVOVDoge1xuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgdGl0bGU6IFwiSm95ZW50XCIsXG4gICAgICAgICAgc2VydmVyVGl0bGU6IFwic2VydmVyXCIsXG4gICAgICAgICAgXCJkZWZhdWx0XCI6IFwiYzFcIixcbiAgICAgICAgICB0b3RhbFBsYW5zOiAyNFxuICAgICAgICB9LFxuICAgICAgICBwbGFuczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhbmRhcmRcIixcbiAgICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFwiYzFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDAuMjUsXG4gICAgICAgICAgICAgICAgRElTSzogMzMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzJcIixcbiAgICAgICAgICAgICAgICBSQU06IDE3NTAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDU2LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiA2NixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzc1MCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMTIzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiAxMzEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzZcIixcbiAgICAgICAgICAgICAgICBSQU06IDUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDczOCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogODAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogNzg5LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogMTQ2NyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDE1NzUsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzEwXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNzAwMC4xMyxcbiAgICAgICAgICAgICAgICBDUFU6IDUsXG4gICAgICAgICAgICAgICAgRElTSzogMTY4MyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTFcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwMDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjgzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzIwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2ODMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzEzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0MDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDEwLFxuICAgICAgICAgICAgICAgIERJU0s6IDE2ODMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIE1lbW9yeVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTcwMDAuMTMsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDQyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTVcIixcbiAgICAgICAgICAgICAgICBSQU06IDM0MDAwLjI1LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4NDMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2ODAwMC4zOCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTEyMixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTdcIixcbiAgICAgICAgICAgICAgICBSQU06IDE0NDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDE4LFxuICAgICAgICAgICAgICAgIERJU0s6IDIzNjMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNTYwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA0MjAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBDUFVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTlcIixcbiAgICAgICAgICAgICAgICBSQU06IDE3NTAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDc1LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNzAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDcsXG4gICAgICAgICAgICAgICAgRElTSzogMjYzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiA2MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzIyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDI0LFxuICAgICAgICAgICAgICAgIERJU0s6IDkwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjNcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogMTIwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggSU9cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjRcIixcbiAgICAgICAgICAgICAgICBSQU06IDY1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNDUyLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTI4MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogMzA3MixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjZcIixcbiAgICAgICAgICAgICAgICBSQU06IDI1NjAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDMyLFxuICAgICAgICAgICAgICAgIERJU0s6IDYxNDQsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIFN0b3JhZ2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjdcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiA3NjgwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA2LFxuICAgICAgICAgICAgICAgIERJU0s6IDE1MzYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTI4MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiAzMDcyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBBV1M6IHtcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIHNlcnZlclRpdGxlOiBcIkVDMlwiLFxuICAgICAgICAgIHRpdGxlOiBcIkFXU1wiLFxuICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImQxXCIsXG4gICAgICAgICAgdG90YWxQbGFuczogMzhcbiAgICAgICAgfSxcbiAgICAgICAgcGxhbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkdlbmVyYWwgUHVycG9zZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDJcIixcbiAgICAgICAgICAgICAgICBSQU06IDIwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogNDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA4MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDVcIixcbiAgICAgICAgICAgICAgICBSQU06IDgwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMzIwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDlcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2MDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDQwLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTBcIixcbiAgICAgICAgICAgICAgICBSQU06IDM3NTAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDQsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDExXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTJcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTNcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwMDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJDb21wdXRlIE9wdGltaXplZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzc1MCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTdcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjAwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzNixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDE5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzNzUwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiAzMixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjBcIixcbiAgICAgICAgICAgICAgICBSQU06IDUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDgwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjJcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogMzIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogNjAwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIEdQVVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjAwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiAyNDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIFJBTVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDY0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMzUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjhcIixcbiAgICAgICAgICAgICAgICBSQU06IDYxMDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAzMjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDI5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMjIwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiAzMjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDMwXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNDQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIFN0b3JhZ2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzFcIixcbiAgICAgICAgICAgICAgICBSQU06IDM1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDMyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2MTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTYwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzNcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyMjAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNDQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDYwMDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2MTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTIwMDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMjIwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiAyNDAwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzhcIixcbiAgICAgICAgICAgICAgICBSQU06IDI0NDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDM2LFxuICAgICAgICAgICAgICAgIERJU0s6IDQ4MDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIFNjYWxlRGF0YVNoaW07XG5cbn0pKCk7XG4iLCJ2YXIgU2NhbGVNYWNoaW5lRGF0YVNoaW07XG5cblNjYWxlTWFjaGluZURhdGFTaGltID0gcmVxdWlyZSgnLi9zaGltcy9kYXRhLXNoaW0nKTtcblxud2luZG93LnNjYWxlTWFjaGluZVRlc3REYXRhID0gbmV3IFNjYWxlTWFjaGluZURhdGFTaGltKCk7XG5cblB1YlN1Yi5zdWJzY3JpYmUoJ1NDQUxFLkdFVF9PUFRJT05TJywgZnVuY3Rpb24obSwgY2IpIHtcbiAgcmV0dXJuIGNiKHNjYWxlTWFjaGluZVRlc3REYXRhLmdldEhvc3RPcHRpb25zKCkpO1xufSk7XG5cbndpbmRvdy5pbml0ID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29uZmlnLCBjb25maWcyLCBvblNwZWNzQ2hhbmdlLCB0b3RhbEluc3RhbmNlcztcbiAgICBvblNwZWNzQ2hhbmdlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coXCJUaGUgdXNlciBoYXMgc2VsZWN0ZWQgOlwiKTtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9O1xuICAgIHRvdGFsSW5zdGFuY2VzID0gNTtcbiAgICBjb25maWcgPSB7XG4gICAgICBhY3RpdmVTZXJ2ZXJJZDoge1xuICAgICAgICBwcmltYXJ5OiBzY2FsZU1hY2hpbmVUZXN0RGF0YS5nZXRTYW1wbGVTY2FsZUlkKClcbiAgICAgIH0sXG4gICAgICBvblNwZWNzQ2hhbmdlOiBvblNwZWNzQ2hhbmdlLFxuICAgICAgdG90YWxJbnN0YW5jZXM6IHRvdGFsSW5zdGFuY2VzLFxuICAgICAgaXNIb3Jpem9udGFsbHlTY2FsYWJsZTogdHJ1ZSxcbiAgICAgIGlzQ2x1c3RlcjogdHJ1ZVxuICAgIH07XG4gICAgd2luZG93LmFwcCA9IG5ldyBuYW5vYm94LlNjYWxlTWFjaGluZSgkKFwiLmhvbGRlclwiKSwgY29uZmlnKTtcbiAgICByZXR1cm4gY29uZmlnMiA9IHtcbiAgICAgIGFjdGl2ZVNlcnZlcklkOiB7XG4gICAgICAgIHByaW1hcnk6IHNjYWxlTWFjaGluZVRlc3REYXRhLmdldFNhbXBsZVNjYWxlSWQoKSxcbiAgICAgICAgc2Vjb25kYXJ5OiBzY2FsZU1hY2hpbmVUZXN0RGF0YS5nZXRTYW1wbGVTY2FsZUlkKCksXG4gICAgICAgIG1vbml0b3I6IHNjYWxlTWFjaGluZVRlc3REYXRhLmdldFNhbXBsZVNjYWxlSWQoKVxuICAgICAgfSxcbiAgICAgIG9uU3BlY3NDaGFuZ2U6IG9uU3BlY3NDaGFuZ2UsXG4gICAgICB0b3RhbEluc3RhbmNlczogdG90YWxJbnN0YW5jZXMsXG4gICAgICBpc0hvcml6b250YWxseVNjYWxhYmxlOiBmYWxzZSxcbiAgICAgIGlzQ2x1c3RlcjogdHJ1ZVxuICAgIH07XG4gIH07XG59KSh0aGlzKTtcbiJdfQ==

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
