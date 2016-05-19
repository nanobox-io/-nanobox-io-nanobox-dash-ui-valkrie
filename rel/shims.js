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
var AppComponent, Cluster, Host;

AppComponent = require('./app-component');

Host = require('./host');

module.exports = Cluster = (function() {
  Cluster.clusterCount = 0;

  function Cluster(totalMembers) {
    var i, j, ref;
    if (totalMembers == null) {
      totalMembers = 4;
    }
    this.serverSpecsId = "b4";
    this.id = "cluster." + Cluster.clusterCount;
    this.name = "web " + (++AppComponent.appComponentCount);
    this.appComponent = new AppComponent();
    this.instances = [];
    for (i = j = 1, ref = totalMembers; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      this.instances.push({
        id: "web." + AppComponent.appComponentCount + "." + i,
        hostId: "ec2." + (++Host.hostCount),
        hostName: "ec2." + Host.hostCount
      });
    }
  }

  Cluster.prototype.serialize = function() {
    return {
      serverSpecsId: this.serverSpecsId,
      id: this.id,
      name: this.name,
      appComponents: [this.appComponent.serialize()],
      serviceType: this.appComponent.type,
      instances: this.instances
    };
  };

  return Cluster;

})();

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

  Generation.prototype.serialize = {
    state: Generation.state,
    id: Generation.id
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
    this.platformComponents = [new PlatformComponent("lb", "load-balancer"), new PlatformComponent("lg", "logger"), new PlatformComponent("hm", "health-monitor"), new PlatformComponent("mr", "router"), new PlatformComponent("gs", "glob-storage")];
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
    window.removeComponent = function(hostId) {
      return console.log(hostId);
    };
    window.removeGeneration = function(componentId) {
      return console.log(componentId);
    };
    window.addHost = function() {
      var hostBox;
      hostBox = new nanobox.ClobberBox();
      hostBox.build($holder, nanobox.ClobberBox.HOST, clobberBoxDataShim.getHost(true).serialize());
      return ui.noteComponents(hostBox);
    };
    window.addCluster = function() {
      var clusterBox;
      clusterBox = new nanobox.ClobberBox();
      return clusterBox.build($holder, nanobox.ClobberBox.CLUSTER, clobberBoxDataShim.getCluster().serialize());
    };
    window.setState = function(id, state) {
      return getBox(id).setState(state);
    };
    window.setGenerationState = function(id, state) {
      return getParentOfGeneration(id).setGenerationState(id, state);
    };
    subscribeToRegistrations = function() {
      PubSub.subscribe('STATS.GET_OPTIONS', function(m, cb) {
        return cb(scaleMachineTestData.getHostOptions());
      });
      PubSub.subscribe('REGISTER', (function(_this) {
        return function(m, box) {
          return boxes.push(box);
        };
      })(this));
      return PubSub.subscribe('UNREGISTER', (function(_this) {
        return function(m, box) {
          return removeBox(box);
        };
      })(this));
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
    return addCluster();
  };
})(this);

},{"./shims/data-shim":3,"./test-ui/ui":8}],8:[function(require,module,exports){
var UI;

module.exports = UI = (function() {
  function UI() {
    this.initStateSelector($("#host-states"));
    this.initStateSelector($("#gen-states"));
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
        id = $("select#hosts").val();
        state = $("select#host-states").val();
        return setState(id, state);
      };
    })(this));
    $("button#generations").on('click', (function(_this) {
      return function() {
        var id, state;
        id = $("select#generation").val();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvYXBwLWNvbXBvbmVudC5jb2ZmZWUiLCJzaGltcy9jbHVzdGVyLmNvZmZlZSIsInNoaW1zL2RhdGEtc2hpbS5jb2ZmZWUiLCJzaGltcy9nZW5lcmF0aW9uLmNvZmZlZSIsInNoaW1zL2hvc3QuY29mZmVlIiwic2hpbXMvcGxhdGZvcm0tY29tcG9uZW50LmNvZmZlZSIsInN0YWdlLmNvZmZlZSIsInRlc3QtdWkvdWkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEFwcENvbXBvbmVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBDb21wb25lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIEFwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gQXBwQ29tcG9uZW50KGtpbmQsIHR5cGUsIHNjYWxlc0hvcml6b250YWxseSkge1xuICAgIGlmIChraW5kID09IG51bGwpIHtcbiAgICAgIGtpbmQgPSAnd2ViJztcbiAgICB9XG4gICAgdGhpcy50eXBlID0gdHlwZSAhPSBudWxsID8gdHlwZSA6IFwicnVieVwiO1xuICAgIHRoaXMuc2NhbGVzSG9yaXpvbnRhbGx5ID0gc2NhbGVzSG9yaXpvbnRhbGx5ICE9IG51bGwgPyBzY2FsZXNIb3Jpem9udGFsbHkgOiB0cnVlO1xuICAgIHRoaXMuZ2VuZXJhdGlvbkNvdW50ID0gMTtcbiAgICB0aGlzLnN0YXRlID0gJ2FjdGl2ZSc7XG4gICAgdGhpcy5zZXJ2ZXJTcGVjc0lkID0gXCJiM1wiO1xuICAgIHRoaXMuaWQgPSBraW5kICsgXCIuXCIgKyAoKytBcHBDb21wb25lbnQuYXBwQ29tcG9uZW50Q291bnQpO1xuICAgIHRoaXMubmFtZSA9IGtpbmQgKyBcIiBcIiArIEFwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudDtcbiAgICB0aGlzLmdlbmVyYXRpb25zID0gW107XG4gICAgdGhpcy5hZGRHZW5lcmF0aW9uKCk7XG4gIH1cblxuICBBcHBDb21wb25lbnQucHJvdG90eXBlLmFkZEdlbmVyYXRpb24gPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XG4gICAgICBzdGF0ZSA9ICdhY3RpdmUnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZW5lcmF0aW9ucy5wdXNoKHtcbiAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgIGlkOiB0aGlzLmlkICsgXCIuZ2VuXCIgKyAodGhpcy5nZW5lcmF0aW9uQ291bnQrKylcbiAgICB9KTtcbiAgfTtcblxuICBBcHBDb21wb25lbnQucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZW5lcmF0aW9uczogdGhpcy5nZW5lcmF0aW9ucyxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgc2VydmVyU3BlY3NJZDogdGhpcy5zZXJ2ZXJTcGVjc0lkLFxuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBzZXJ2aWNlVHlwZTogdGhpcy50eXBlLFxuICAgICAgc2NhbGVzSG9yaXo6IHRoaXMuc2NhbGVzSG9yaXpvbnRhbGx5XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gQXBwQ29tcG9uZW50O1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgQ2x1c3RlciwgSG9zdDtcblxuQXBwQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9hcHAtY29tcG9uZW50Jyk7XG5cbkhvc3QgPSByZXF1aXJlKCcuL2hvc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDbHVzdGVyID0gKGZ1bmN0aW9uKCkge1xuICBDbHVzdGVyLmNsdXN0ZXJDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gQ2x1c3Rlcih0b3RhbE1lbWJlcnMpIHtcbiAgICB2YXIgaSwgaiwgcmVmO1xuICAgIGlmICh0b3RhbE1lbWJlcnMgPT0gbnVsbCkge1xuICAgICAgdG90YWxNZW1iZXJzID0gNDtcbiAgICB9XG4gICAgdGhpcy5zZXJ2ZXJTcGVjc0lkID0gXCJiNFwiO1xuICAgIHRoaXMuaWQgPSBcImNsdXN0ZXIuXCIgKyBDbHVzdGVyLmNsdXN0ZXJDb3VudDtcbiAgICB0aGlzLm5hbWUgPSBcIndlYiBcIiArICgrK0FwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCk7XG4gICAgdGhpcy5hcHBDb21wb25lbnQgPSBuZXcgQXBwQ29tcG9uZW50KCk7XG4gICAgdGhpcy5pbnN0YW5jZXMgPSBbXTtcbiAgICBmb3IgKGkgPSBqID0gMSwgcmVmID0gdG90YWxNZW1iZXJzOyAxIDw9IHJlZiA/IGogPD0gcmVmIDogaiA+PSByZWY7IGkgPSAxIDw9IHJlZiA/ICsraiA6IC0taikge1xuICAgICAgdGhpcy5pbnN0YW5jZXMucHVzaCh7XG4gICAgICAgIGlkOiBcIndlYi5cIiArIEFwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCArIFwiLlwiICsgaSxcbiAgICAgICAgaG9zdElkOiBcImVjMi5cIiArICgrK0hvc3QuaG9zdENvdW50KSxcbiAgICAgICAgaG9zdE5hbWU6IFwiZWMyLlwiICsgSG9zdC5ob3N0Q291bnRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIENsdXN0ZXIucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXJ2ZXJTcGVjc0lkOiB0aGlzLnNlcnZlclNwZWNzSWQsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGFwcENvbXBvbmVudHM6IFt0aGlzLmFwcENvbXBvbmVudC5zZXJpYWxpemUoKV0sXG4gICAgICBzZXJ2aWNlVHlwZTogdGhpcy5hcHBDb21wb25lbnQudHlwZSxcbiAgICAgIGluc3RhbmNlczogdGhpcy5pbnN0YW5jZXNcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBDbHVzdGVyO1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgQ2xvYmJlckJveERhdGFTaGltLCBDbHVzdGVyLCBHZW5lcmF0aW9uLCBIb3N0LCBQbGF0Zm9ybUNvbXBvbmVudDtcblxuQXBwQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9hcHAtY29tcG9uZW50Jyk7XG5cblBsYXRmb3JtQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS1jb21wb25lbnQnKTtcblxuSG9zdCA9IHJlcXVpcmUoJy4vaG9zdCcpO1xuXG5DbHVzdGVyID0gcmVxdWlyZSgnLi9jbHVzdGVyJyk7XG5cbkdlbmVyYXRpb24gPSByZXF1aXJlKCcuL2dlbmVyYXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDbG9iYmVyQm94RGF0YVNoaW0gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIENsb2JiZXJCb3hEYXRhU2hpbSgpIHt9XG5cbiAgQ2xvYmJlckJveERhdGFTaGltLnByb3RvdHlwZS5nZXRIb3N0ID0gZnVuY3Rpb24obWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICBpZiAobWFrZUxvdHNPZkNvbXBvbmVudHMgPT0gbnVsbCkge1xuICAgICAgbWFrZUxvdHNPZkNvbXBvbmVudHMgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBIb3N0KG1ha2VMb3RzT2ZDb21wb25lbnRzKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldENsdXN0ZXIgPSBmdW5jdGlvbih0b3RhbE1lbWJlcnMpIHtcbiAgICByZXR1cm4gbmV3IENsdXN0ZXIodG90YWxNZW1iZXJzKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldEFwcENvbXBvbmVudCA9IGZ1bmN0aW9uKGtpbmQsIHR5cGUsIHNjYWxlc0hvcml6b250YWxseSkge1xuICAgIHJldHVybiBuZXcgQXBwQ29tcG9uZW50KGtpbmQsIHR5cGUsIHNjYWxlc0hvcml6b250YWxseSk7XG4gIH07XG5cbiAgQ2xvYmJlckJveERhdGFTaGltLnByb3RvdHlwZS5nZXRQbGF0Zm9ybUNvbXBvbmVudCA9IGZ1bmN0aW9uKGlkLCBraW5kKSB7XG4gICAgcmV0dXJuIG5ldyBQbGF0Zm9ybUNvbXBvbmVudChpZCwga2luZCk7XG4gIH07XG5cbiAgQ2xvYmJlckJveERhdGFTaGltLnByb3RvdHlwZS5nZXRHZW5lcmF0aW9uID0gZnVuY3Rpb24ocGFyZW50SWQsIHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0aW9uKHBhcmVudElkLCBzdGF0ZSk7XG4gIH07XG5cbiAgQ2xvYmJlckJveERhdGFTaGltLnByb3RvdHlwZS5yZXNldENvdW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIEhvc3QuaG9zdENvdW50ID0gMDtcbiAgICBBcHBDb21wb25lbnQuYXBwQ29tcG9uZW50Q291bnQgPSAwO1xuICAgIHJldHVybiBDbHVzdGVyLmNsdXN0ZXJDb3VudCA9IDA7XG4gIH07XG5cbiAgcmV0dXJuIENsb2JiZXJCb3hEYXRhU2hpbTtcblxufSkoKTtcbiIsInZhciBHZW5lcmF0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyYXRpb24gPSAoZnVuY3Rpb24oKSB7XG4gIEdlbmVyYXRpb24uZ2VuZXJpY0dlbmVyYXRpb25Db3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gR2VuZXJhdGlvbihwYXJlbnRJZCwgc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgc3RhdGUgPSAnYWN0aXZlJztcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuaWQgPSBwYXJlbnRJZCArIFwiLmdlblwiICsgKEdlbmVyYXRpb24uZ2VuZXJpY0dlbmVyYXRpb25Db3VudCsrKTtcbiAgfVxuXG4gIEdlbmVyYXRpb24ucHJvdG90eXBlLnNlcmlhbGl6ZSA9IHtcbiAgICBzdGF0ZTogR2VuZXJhdGlvbi5zdGF0ZSxcbiAgICBpZDogR2VuZXJhdGlvbi5pZFxuICB9O1xuXG4gIHJldHVybiBHZW5lcmF0aW9uO1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgSG9zdCwgUGxhdGZvcm1Db21wb25lbnQ7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5QbGF0Zm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcGxhdGZvcm0tY29tcG9uZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSG9zdCA9IChmdW5jdGlvbigpIHtcbiAgSG9zdC5ob3N0Q291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIEhvc3QobWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICBpZiAobWFrZUxvdHNPZkNvbXBvbmVudHMgPT0gbnVsbCkge1xuICAgICAgbWFrZUxvdHNPZkNvbXBvbmVudHMgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gICAgdGhpcy5pZCA9IFwiaG9zdC5cIiArICgrK0hvc3QuaG9zdENvdW50KTtcbiAgICB0aGlzLm5hbWUgPSBcImVjMi5cIiArIEhvc3QuaG9zdENvdW50O1xuICAgIHRoaXMuc2VydmVyU3BlY3NJZCA9IFwiYjFcIjtcbiAgICB0aGlzLnBsYXRmb3JtQ29tcG9uZW50cyA9IFtuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJsYlwiLCBcImxvYWQtYmFsYW5jZXJcIiksIG5ldyBQbGF0Zm9ybUNvbXBvbmVudChcImxnXCIsIFwibG9nZ2VyXCIpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJobVwiLCBcImhlYWx0aC1tb25pdG9yXCIpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJtclwiLCBcInJvdXRlclwiKSwgbmV3IFBsYXRmb3JtQ29tcG9uZW50KFwiZ3NcIiwgXCJnbG9iLXN0b3JhZ2VcIildO1xuICAgIHRoaXMuYXBwQ29tcG9uZW50cyA9IFtdO1xuICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50cyhtYWtlTG90c09mQ29tcG9uZW50cyk7XG4gIH1cblxuICBIb3N0LnByb3RvdHlwZS5jcmVhdGVDb21wb25lbnRzID0gZnVuY3Rpb24obWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICBpZiAoIW1ha2VMb3RzT2ZDb21wb25lbnRzKSB7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgpO1xuICAgICAgcmV0dXJuIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdtb25nby1kYicsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdtb25nby1kYicsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAnbm9kZScsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdtZW1jYWNoZWQnLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAncHl0aG9uJywgdHJ1ZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ3N0b3JhZ2UnLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAnamF2YScsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdwaHAnLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdjb3VjaC1kYicsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdtYXJpYS1kYicsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdwb3N0Z3Jlcy1kYicsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdyZWRpcycsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdwZXJjb25hLWRiJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdkZWZhdWx0JywgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ2RlZmF1bHQtZGInLCBmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIEhvc3QucHJvdG90eXBlLmFkZENvbXBvbmVudCA9IGZ1bmN0aW9uKGtpbmQsIHR5cGUsIGlzSG9yaXpvbnRhbGx5U2NhbGFibGUpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBDb21wb25lbnRzLnB1c2gobmV3IEFwcENvbXBvbmVudChraW5kLCB0eXBlLCBpc0hvcml6b250YWxseVNjYWxhYmxlKSk7XG4gIH07XG5cbiAgSG9zdC5wcm90b3R5cGUuc2VyaWFsaXplQ29tcG9uZW50cyA9IGZ1bmN0aW9uKGNvbXBvbmVudHMpIHtcbiAgICB2YXIgYXIsIGNvbXBvbmVudCwgaSwgbGVuO1xuICAgIGFyID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gY29tcG9uZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50c1tpXTtcbiAgICAgIGFyLnB1c2goY29tcG9uZW50LnNlcmlhbGl6ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuXG4gIEhvc3QucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgc2VydmVyU3BlY3NJZDogdGhpcy5zZXJ2ZXJTcGVjc0lkLFxuICAgICAgcGxhdGZvcm1Db21wb25lbnRzOiB0aGlzLnNlcmlhbGl6ZUNvbXBvbmVudHModGhpcy5wbGF0Zm9ybUNvbXBvbmVudHMpLFxuICAgICAgYXBwQ29tcG9uZW50czogdGhpcy5zZXJpYWxpemVDb21wb25lbnRzKHRoaXMuYXBwQ29tcG9uZW50cylcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBIb3N0O1xuXG59KSgpO1xuIiwidmFyIFBsYXRmb3JtQ29tcG9uZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXRmb3JtQ29tcG9uZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQbGF0Zm9ybUNvbXBvbmVudChpZCwga2luZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmtpbmQgPSBraW5kO1xuICAgIHRoaXMuaXNTcGxpdGFibGUgPSBNYXRoLnJhbmRvbSgpID4gMC41O1xuICAgIHRoaXMuc3RhdGUgPSBcImFjdGl2ZVwiO1xuICB9XG5cbiAgUGxhdGZvcm1Db21wb25lbnQucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIGtpbmQ6IHRoaXMua2luZCxcbiAgICAgIGlzU3BsaXRhYmxlOiB0aGlzLmlzU3BsaXRhYmxlLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBQbGF0Zm9ybUNvbXBvbmVudDtcblxufSkoKTtcbiIsInZhciAkaG9sZGVyLCBDbG9iYmVyQm94RGF0YVNoaW0sIFVJLCBib3hlcztcblxuVUkgPSByZXF1aXJlKCcuL3Rlc3QtdWkvdWknKTtcblxuQ2xvYmJlckJveERhdGFTaGltID0gcmVxdWlyZSgnLi9zaGltcy9kYXRhLXNoaW0nKTtcblxud2luZG93LmNsb2JiZXJCb3hEYXRhU2hpbSA9IG5ldyBDbG9iYmVyQm94RGF0YVNoaW0oKTtcblxuYm94ZXMgPSBbXTtcblxuJGhvbGRlciA9ICQoXCIuaG9sZGVyXCIpO1xuXG53aW5kb3cuaW5pdCA9IChmdW5jdGlvbihfdGhpcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFkZEV2ZW50TGlzdGVuZXJzLCBnZXRCb3gsIGdldFBhcmVudE9mQ29tcG9uZW50LCBnZXRQYXJlbnRPZkdlbmVyYXRpb24sIHJlbW92ZUJveCwgc3Vic2NyaWJlVG9SZWdpc3RyYXRpb25zLCB1aTtcbiAgICBzdGF0c0RhdGFTaW11bHRvci5jcmVhdGVGYWtlU3RhdERhdGFQcm92aWRlcigpO1xuICAgIHVpID0gbmV3IFVJKCQoJ2JvZHknKSk7XG4gICAgd2luZG93LmFkZEdlbmVyYXRpb24gPSBmdW5jdGlvbihjb21wb25lbnRJZCwgc3RhdGUpIHtcbiAgICAgIHZhciBnZW5EYXRhO1xuICAgICAgaWYgKHN0YXRlID09IG51bGwpIHtcbiAgICAgICAgc3RhdGUgPSAncHJvdmlzaW9uaW5nJztcbiAgICAgIH1cbiAgICAgIGdlbkRhdGEgPSBjbG9iYmVyQm94RGF0YVNoaW0uZ2V0R2VuZXJhdGlvbihjb21wb25lbnRJZCwgc3RhdGUpLnNlcmlhbGl6ZSgpO1xuICAgICAgcmV0dXJuIGdldFBhcmVudE9mQ29tcG9uZW50KGNvbXBvbmVudElkKS5hZGRHZW5lcmF0aW9uKGNvbXBvbmVudElkLCBnZW5EYXRhKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRDb21wb25lbnQgPSBmdW5jdGlvbihob3N0SWQpIHtcbiAgICAgIHJldHVybiBnZXRCb3goaG9zdElkKS5hZGRDb21wb25lbnQoY2xvYmJlckJveERhdGFTaGltLmdldEFwcENvbXBvbmVudCgpLnNlcmlhbGl6ZSgpKTtcbiAgICB9O1xuICAgIHdpbmRvdy5yZW1vdmVDb21wb25lbnQgPSBmdW5jdGlvbihob3N0SWQpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhob3N0SWQpO1xuICAgIH07XG4gICAgd2luZG93LnJlbW92ZUdlbmVyYXRpb24gPSBmdW5jdGlvbihjb21wb25lbnRJZCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGNvbXBvbmVudElkKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRIb3N0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaG9zdEJveDtcbiAgICAgIGhvc3RCb3ggPSBuZXcgbmFub2JveC5DbG9iYmVyQm94KCk7XG4gICAgICBob3N0Qm94LmJ1aWxkKCRob2xkZXIsIG5hbm9ib3guQ2xvYmJlckJveC5IT1NULCBjbG9iYmVyQm94RGF0YVNoaW0uZ2V0SG9zdCh0cnVlKS5zZXJpYWxpemUoKSk7XG4gICAgICByZXR1cm4gdWkubm90ZUNvbXBvbmVudHMoaG9zdEJveCk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkQ2x1c3RlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNsdXN0ZXJCb3g7XG4gICAgICBjbHVzdGVyQm94ID0gbmV3IG5hbm9ib3guQ2xvYmJlckJveCgpO1xuICAgICAgcmV0dXJuIGNsdXN0ZXJCb3guYnVpbGQoJGhvbGRlciwgbmFub2JveC5DbG9iYmVyQm94LkNMVVNURVIsIGNsb2JiZXJCb3hEYXRhU2hpbS5nZXRDbHVzdGVyKCkuc2VyaWFsaXplKCkpO1xuICAgIH07XG4gICAgd2luZG93LnNldFN0YXRlID0gZnVuY3Rpb24oaWQsIHN0YXRlKSB7XG4gICAgICByZXR1cm4gZ2V0Qm94KGlkKS5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB3aW5kb3cuc2V0R2VuZXJhdGlvblN0YXRlID0gZnVuY3Rpb24oaWQsIHN0YXRlKSB7XG4gICAgICByZXR1cm4gZ2V0UGFyZW50T2ZHZW5lcmF0aW9uKGlkKS5zZXRHZW5lcmF0aW9uU3RhdGUoaWQsIHN0YXRlKTtcbiAgICB9O1xuICAgIHN1YnNjcmliZVRvUmVnaXN0cmF0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU1RBVFMuR0VUX09QVElPTlMnLCBmdW5jdGlvbihtLCBjYikge1xuICAgICAgICByZXR1cm4gY2Ioc2NhbGVNYWNoaW5lVGVzdERhdGEuZ2V0SG9zdE9wdGlvbnMoKSk7XG4gICAgICB9KTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1JFR0lTVEVSJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBib3gpIHtcbiAgICAgICAgICByZXR1cm4gYm94ZXMucHVzaChib3gpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgcmV0dXJuIFB1YlN1Yi5zdWJzY3JpYmUoJ1VOUkVHSVNURVInLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGJveCkge1xuICAgICAgICAgIHJldHVybiByZW1vdmVCb3goYm94KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9O1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLkFQUF9DT01QT05FTlRTJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdhcHAtY29tcG9uZW50cycsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU0hPVy5QTEFURk9STV9DT01QT05FTlRTJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdwbGF0Zm9ybS1jb21wb25lbnRzJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLklOU1RBTkNFUycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge307XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlNDQUxFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdzY2FsZS1tYWNoaW5lJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlNUQVRTJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdzdGF0cycsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU0hPVy5DT05TT0xFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdjb25zb2xlJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlNQTElUJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLmlkKS5zd2l0Y2hTdWJDb250ZW50KCdzcGxpdCcsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgcmV0dXJuIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuQURNSU4nLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEuaWQpLnN3aXRjaFN1YkNvbnRlbnQoJ2FkbWluJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcbiAgICBnZXRCb3ggPSBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGJveCwgaiwgbGVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gYm94ZXMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgYm94ID0gYm94ZXNbal07XG4gICAgICAgIGlmIChpZCA9PT0gYm94LmlkKSB7XG4gICAgICAgICAgcmV0dXJuIGJveDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZ2V0UGFyZW50T2ZDb21wb25lbnQgPSBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGJveCwgaiwgbGVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gYm94ZXMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgYm94ID0gYm94ZXNbal07XG4gICAgICAgIGlmIChib3guaGFzQ29tcG9uZW50V2l0aElkKGlkKSkge1xuICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGdldFBhcmVudE9mR2VuZXJhdGlvbiA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgYm94LCBqLCBsZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSBib3hlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBib3ggPSBib3hlc1tqXTtcbiAgICAgICAgaWYgKGJveC5oYXNHZW5lcmF0aW9uV2l0aElkKGlkKSkge1xuICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJlbW92ZUJveCA9IGZ1bmN0aW9uKGRvb21lZEJveCkge1xuICAgICAgdmFyIGJveCwgaSwgaiwgbGVuO1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IGJveGVzLmxlbmd0aDsgaiA8IGxlbjsgaSA9ICsraikge1xuICAgICAgICBib3ggPSBib3hlc1tpXTtcbiAgICAgICAgaWYgKGJveC5pZCA9PT0gZG9vbWVkQm94LmlkKSB7XG4gICAgICAgICAgYm94ZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgc3Vic2NyaWJlVG9SZWdpc3RyYXRpb25zKCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRIb3N0KCk7XG4gICAgcmV0dXJuIGFkZENsdXN0ZXIoKTtcbiAgfTtcbn0pKHRoaXMpO1xuIiwidmFyIFVJO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVJID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBVSSgpIHtcbiAgICB0aGlzLmluaXRTdGF0ZVNlbGVjdG9yKCQoXCIjaG9zdC1zdGF0ZXNcIikpO1xuICAgIHRoaXMuaW5pdFN0YXRlU2VsZWN0b3IoJChcIiNnZW4tc3RhdGVzXCIpKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICBQdWJTdWIuc3Vic2NyaWJlKCdSRUdJU1RFUicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGJveCkge1xuICAgICAgICByZXR1cm4gX3RoaXMucmVnaXN0ZXJCb3goYm94KTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9XG5cbiAgVUkucHJvdG90eXBlLnJlZ2lzdGVyQm94ID0gZnVuY3Rpb24oYm94KSB7XG4gICAgaWYgKGJveC5kYXRhLmlkLmluY2x1ZGVzKCdnZW4nKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVG9TZWxlY3RvcigkKCcuZ2VuZXJhdGlvbnMnKSwgYm94KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkVG9TZWxlY3RvcigkKCcuaG9zdHMnKSwgYm94KTtcbiAgICB9XG4gIH07XG5cbiAgVUkucHJvdG90eXBlLmFkZFRvU2VsZWN0b3IgPSBmdW5jdGlvbigkc2VsZWN0b3IsIGJveCkge1xuICAgIGlmICgkKFwib3B0aW9uW3ZhbHVlPSdcIiArIGJveC5kYXRhLmlkICsgXCInXVwiLCAkc2VsZWN0b3IpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gJHNlbGVjdG9yLmFwcGVuZChcIjxvcHRpb24gdmFsdWU9J1wiICsgYm94LmRhdGEuaWQgKyBcIic+XCIgKyBib3guZGF0YS5pZCArIFwiPC9vcHRpb24+XCIpO1xuICB9O1xuXG4gIFVJLnByb3RvdHlwZS5pbml0U3RhdGVTZWxlY3RvciA9IGZ1bmN0aW9uKCRzZWxlY3Rvcikge1xuICAgIHZhciBpLCBsZW4sIHJlc3VsdHMsIHN0YXRlLCBzdGF0ZXM7XG4gICAgc3RhdGVzID0gWycnLCAnY3JlYXRlZCcsICdpbml0aWFsaXplZCcsICdvcmRlcmVkJywgJ3Byb3Zpc2lvbmluZycsICdkZWZ1bmN0JywgJ2FjdGl2ZScsICdkZWNvbWlzc2lvbmluZycsICdkZXN0cm95JywgJ2FyY2hpdmVkJ107XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHN0YXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbaV07XG4gICAgICByZXN1bHRzLnB1c2goJHNlbGVjdG9yLmFwcGVuZChcIjxvcHRpb24gdmFsdWU9J1wiICsgc3RhdGUgKyBcIic+XCIgKyBzdGF0ZSArIFwiPC9vcHRpb24+XCIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgVUkucHJvdG90eXBlLmluaXRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICAkKFwiYnV0dG9uI2hvc3RzXCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWQsIHN0YXRlO1xuICAgICAgICBpZCA9ICQoXCJzZWxlY3QjaG9zdHNcIikudmFsKCk7XG4gICAgICAgIHN0YXRlID0gJChcInNlbGVjdCNob3N0LXN0YXRlc1wiKS52YWwoKTtcbiAgICAgICAgcmV0dXJuIHNldFN0YXRlKGlkLCBzdGF0ZSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgICAkKFwiYnV0dG9uI2dlbmVyYXRpb25zXCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWQsIHN0YXRlO1xuICAgICAgICBpZCA9ICQoXCJzZWxlY3QjZ2VuZXJhdGlvblwiKS52YWwoKTtcbiAgICAgICAgc3RhdGUgPSAkKFwic2VsZWN0I2dlbi1zdGF0ZXNcIikudmFsKCk7XG4gICAgICAgIHJldHVybiBzZXRHZW5lcmF0aW9uU3RhdGUoaWQsIHN0YXRlKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgICQoXCJidXR0b24jYWRkLWdlbmVyYXRpb25cIikub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhZGRHZW5lcmF0aW9uKCQoXCJzZWxlY3QjYWRkLWdlbmVyYXRpb24tc2VsZWN0XCIpLnZhbCgpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgICQoXCJidXR0b24jcmVtb3ZlLWdlbmVyYXRpb25cIikub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVHZW5lcmF0aW9uKCQoXCJzZWxlY3QjcmVtb3ZlLWdlbmVyYXRpb24tc2VsZWN0XCIpLnZhbCgpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgICQoXCJidXR0b24jYWRkLWNvbXBvbmVudFwiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFkZENvbXBvbmVudCgkKFwic2VsZWN0I2FkZC1jb21wb25lbnQtc2VsZWN0XCIpLnZhbCgpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHJldHVybiAkKFwiYnV0dG9uI3JlbW92ZS1jb21wb25lbnRcIikub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVDb21wb25lbnQoJChcInNlbGVjdCNyZW1vdmUtY29tcG9uZW50LXNlbGVjdFwiKS52YWwoKSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfTtcblxuICBVSS5wcm90b3R5cGUubm90ZUNvbXBvbmVudHMgPSBmdW5jdGlvbihib3gpIHtcbiAgICB2YXIgJHNlbGVjdG9yLCBjb21wb25lbnQsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICAgICRzZWxlY3RvciA9ICQoXCJzZWxlY3QuY29tcG9uZW50c1wiKTtcbiAgICByZWYgPSBib3guZGF0YS5hcHBDb21wb25lbnRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbXBvbmVudCA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaCgkc2VsZWN0b3IuYXBwZW5kKFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyBjb21wb25lbnQuaWQgKyBcIic+XCIgKyBjb21wb25lbnQuaWQgKyBcIjwvb3B0aW9uPlwiKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIHJldHVybiBVSTtcblxufSkoKTtcbiJdfQ==

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
    return {
      data: this.providers[this.provider],
      activeSpecsId: this.specId
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
    PubSub.subscribe('STATS.GET_OPTIONS', function(m, cb) {
      return cb(scaleMachineTestData.getHostOptions());
    });
    totalInstances = 5;
    return window.app = new nanobox.ScaleMachine($(".holder"), scaleMachineTestData.getSampleScaleId(), onUserSelectNewServer, onTotalInstancesChanged, totalInstances);
  };
})(this);

},{"./shims/data-shim":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvZGF0YS1zaGltLmNvZmZlZSIsInN0YWdlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBTY2FsZURhdGFTaGltLFxuICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY2FsZURhdGFTaGltID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBTY2FsZURhdGFTaGltKCkge1xuICAgIHRoaXMuZ2V0SG9zdE9wdGlvbnMgPSBiaW5kKHRoaXMuZ2V0SG9zdE9wdGlvbnMsIHRoaXMpO1xuICAgIHRoaXMuZ2V0U2VydmljZVNwZWNzID0gYmluZCh0aGlzLmdldFNlcnZpY2VTcGVjcywgdGhpcyk7XG4gICAgdmFyIHByb3ZpZGVycztcbiAgICBwcm92aWRlcnMgPSBbXCJBV1NcIiwgXCJMSU5PREVcIiwgXCJESUdJVEFMX09DRUFOXCIsIFwiSk9ZRU5UXCJdO1xuICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcnNbMl07XG4gICAgdGhpcy5jcmVhdGVIYXNoKCk7XG4gIH1cblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRTYW1wbGVTY2FsZUlkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJhbmRvbUluZGV4O1xuICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcih0aGlzLnByb3ZpZGVyc1t0aGlzLnByb3ZpZGVyXS5wbGFuc1swXS5zcGVjcy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKTtcbiAgICByZXR1cm4gdGhpcy5wcm92aWRlcnNbdGhpcy5wcm92aWRlcl0ucGxhbnNbMF0uc3BlY3NbcmFuZG9tSW5kZXhdLmlkO1xuICB9O1xuXG4gIFNjYWxlRGF0YVNoaW0ucHJvdG90eXBlLmdldFNlcnZpY2VTcGVjcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmZvO1xuICAgIGluZm8gPSB0aGlzLmdldEN1cnJlbnRTcGVjcygpO1xuICAgIGluZm8uaG9zdCA9IHRoaXMucHJvdmlkZXI7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgZGF0YTogaW5mb1xuICAgIH0pKTtcbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRIb3N0T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB0aGlzLnByb3ZpZGVyc1t0aGlzLnByb3ZpZGVyXSxcbiAgICAgIGFjdGl2ZVNwZWNzSWQ6IHRoaXMuc3BlY0lkXG4gICAgfTtcbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRDdXJyZW50U3BlY3MgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGljdCwgaSwgaiwgbGVuLCBsZW4xLCBwbGFuLCByZWYsIHJlZjEsIHNwZWM7XG4gICAgZGljdCA9IHtcbiAgICAgIExJTk9ERTogJ2EnLFxuICAgICAgRElHSVRBTF9PQ0VBTjogJ2InLFxuICAgICAgSk9ZRU5UOiAnYycsXG4gICAgICBBV1M6ICdkJ1xuICAgIH07XG4gICAgdGhpcy5zcGVjSWQgPSBkaWN0W3RoaXMucHJvdmlkZXJdICsgXCIyXCI7XG4gICAgcmVmID0gdGhpcy5wcm92aWRlcnNbdGhpcy5wcm92aWRlcl0ucGxhbnM7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwbGFuID0gcmVmW2ldO1xuICAgICAgcmVmMSA9IHBsYW4uc3BlY3M7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgc3BlYyA9IHJlZjFbal07XG4gICAgICAgIGlmIChzcGVjLmlkID09PSB0aGlzLnNwZWNJZCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYW06IHNwZWMuUkFNLFxuICAgICAgICAgICAgY3B1OiBzcGVjLkNQVSxcbiAgICAgICAgICAgIGRpc2s6IHNwZWMuRElTSyxcbiAgICAgICAgICAgIGlkOiBzcGVjLmlkXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5jcmVhdGVIYXNoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvdmlkZXJzID0ge1xuICAgICAgTElOT0RFOiB7XG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICB0aXRsZTogXCJMaW5vZGVcIixcbiAgICAgICAgICBcImRlZmF1bHRcIjogXCJhMVwiLFxuICAgICAgICAgIHRvdGFsUGxhbnM6IDRcbiAgICAgICAgfSxcbiAgICAgICAgcGxhbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIlN0YW5kYXJkIENvbmZpZ3VyYXRpb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMSxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMjQsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImEyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA0OCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYTNcIixcbiAgICAgICAgICAgICAgICBSQU06IDQsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDk2LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogOCxcbiAgICAgICAgICAgICAgICBDUFU6IDYsXG4gICAgICAgICAgICAgICAgRElTSzogMTkyLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBESUdJVEFMX09DRUFOOiB7XG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICB0aXRsZTogXCJEaWdpdGFsIE9jZWFuXCIsXG4gICAgICAgICAgXCJkZWZhdWx0XCI6IFwiYjFcIixcbiAgICAgICAgICB0b3RhbFBsYW5zOiA5XG4gICAgICAgIH0sXG4gICAgICAgIHBsYW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJTdGFuZGFyZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImIxXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAwLjUsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMSxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMzAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImIzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA0MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjRcIixcbiAgICAgICAgICAgICAgICBSQU06IDQsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogOCxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBWb2x1bWVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjdcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyLFxuICAgICAgICAgICAgICAgIENQVTogMTIsXG4gICAgICAgICAgICAgICAgRElTSzogMzIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNDgsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiA0ODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImI5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2NCxcbiAgICAgICAgICAgICAgICBDUFU6IDIwLFxuICAgICAgICAgICAgICAgIERJU0s6IDY0MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgSk9ZRU5UOiB7XG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICB0aXRsZTogXCJKb3llbnRcIixcbiAgICAgICAgICBcImRlZmF1bHRcIjogXCJjMVwiLFxuICAgICAgICAgIHRvdGFsUGxhbnM6IDI0XG4gICAgICAgIH0sXG4gICAgICAgIHBsYW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJTdGFuZGFyZFwiLFxuICAgICAgICAgICAgICBcImRlZmF1bHRcIjogXCJjMVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxLFxuICAgICAgICAgICAgICAgIENQVTogMC4yNSxcbiAgICAgICAgICAgICAgICBESVNLOiAzMyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzJcIixcbiAgICAgICAgICAgICAgICBSQU06IDEuNzUsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDU2LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMixcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogNjYsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzLjc1LFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiAxMjMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0LFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiAxMzEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA3LjUsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDczOCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzdcIixcbiAgICAgICAgICAgICAgICBSQU06IDgsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDc4OSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzhcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNDY3LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDE1NzUsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTcuMTMsXG4gICAgICAgICAgICAgICAgQ1BVOiA1LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2ODMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2ODMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzIsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2ODMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogNDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxMCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjgzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggTWVtb3J5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNy4xMyxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogNDIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTVcIixcbiAgICAgICAgICAgICAgICBSQU06IDM0LjI1LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4NDMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjguMzgsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDExMjIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMTQ0LFxuICAgICAgICAgICAgICAgIENQVTogMTgsXG4gICAgICAgICAgICAgICAgRElTSzogMjM2MyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNTYsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA0MjAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggQ1BVXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxLjc1LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA3NSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzIwXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA3LFxuICAgICAgICAgICAgICAgIENQVTogNyxcbiAgICAgICAgICAgICAgICBESVNLOiAyNjMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiA2MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjQsXG4gICAgICAgICAgICAgICAgQ1BVOiAyNCxcbiAgICAgICAgICAgICAgICBESVNLOiA5MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMzIsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiAxMjAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggSU9cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjRcIixcbiAgICAgICAgICAgICAgICBSQU06IDYwLjUsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE0NTIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTI4LFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogMzA3MixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzI2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNTYsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2MTQ0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggU3RvcmFnZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMzIsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDc2ODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjQsXG4gICAgICAgICAgICAgICAgQ1BVOiA2LFxuICAgICAgICAgICAgICAgIERJU0s6IDE1MzYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjlcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyOCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogMzA3MjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIEFXUzoge1xuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgdGl0bGU6IFwiQVdTXCIsXG4gICAgICAgICAgXCJkZWZhdWx0XCI6IFwiZDFcIixcbiAgICAgICAgICB0b3RhbFBsYW5zOiAzOFxuICAgICAgICB9LFxuICAgICAgICBwbGFuczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiR2VuZXJhbCBQdXJwb3NlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDFcIixcbiAgICAgICAgICAgICAgICBSQU06IDEsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDJcIixcbiAgICAgICAgICAgICAgICBSQU06IDIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDNcIixcbiAgICAgICAgICAgICAgICBSQU06IDQsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDRcIixcbiAgICAgICAgICAgICAgICBSQU06IDgsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDVcIixcbiAgICAgICAgICAgICAgICBSQU06IDgsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDZcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMixcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjQsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNjAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0MCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMy43NSxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogNCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDExXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA3LjUsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDY0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTJcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDEzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkNvbXB1dGUgT3B0aW1pemVkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDE0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzLjc1LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNy41LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTUsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDE3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMCxcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDE4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2MCxcbiAgICAgICAgICAgICAgICBDUFU6IDM2LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDE5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzLjc1LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiAzMixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDIwXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA3LjUsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDgwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjFcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1LFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiAzMjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogNjAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBHUFVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjRcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1LFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiA2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDI1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2MCxcbiAgICAgICAgICAgICAgICBDUFU6IDMyLFxuICAgICAgICAgICAgICAgIERJU0s6IDI0MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIFJBTVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTUsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDY0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjdcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwLjUsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDI4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2MSxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMzIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjlcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyMixcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDMwXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNDQsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBTdG9yYWdlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDMxXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMC41LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjEsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMTIyLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogMzIwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNDQsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzVcIixcbiAgICAgICAgICAgICAgICBSQU06IDMwLjUsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDYwMDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjFcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjEsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDEyMDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzdcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyMixcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IDI0MDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzhcIixcbiAgICAgICAgICAgICAgICBSQU06IDI0NCxcbiAgICAgICAgICAgICAgICBDUFU6IDM2LFxuICAgICAgICAgICAgICAgIERJU0s6IDQ4MDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBTY2FsZURhdGFTaGltO1xuXG59KSgpO1xuIiwidmFyIFNjYWxlTWFjaGluZURhdGFTaGltO1xuXG5TY2FsZU1hY2hpbmVEYXRhU2hpbSA9IHJlcXVpcmUoJy4vc2hpbXMvZGF0YS1zaGltJyk7XG5cbndpbmRvdy5zY2FsZU1hY2hpbmVUZXN0RGF0YSA9IG5ldyBTY2FsZU1hY2hpbmVEYXRhU2hpbSgpO1xuXG53aW5kb3cuaW5pdCA9IChmdW5jdGlvbihfdGhpcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uVG90YWxJbnN0YW5jZXNDaGFuZ2VkLCBvblVzZXJTZWxlY3ROZXdTZXJ2ZXIsIHRvdGFsSW5zdGFuY2VzO1xuICAgIG9uVXNlclNlbGVjdE5ld1NlcnZlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIlRoZSB1c2VyIGhhcyBjbGlja2VkIHRoaXMgc2VydmVyIGlkIDogYFwiICsgZGF0YSArIFwiYFwiKTtcbiAgICB9O1xuICAgIG9uVG90YWxJbnN0YW5jZXNDaGFuZ2VkID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiVGhlIHVzZXIgaGFzIGRyYWdnZWQgOiBgXCIgKyBkYXRhICsgXCJgIG5ldyBpbnN0YW5jZXNcIik7XG4gICAgfTtcbiAgICBQdWJTdWIuc3Vic2NyaWJlKCdTVEFUUy5HRVRfT1BUSU9OUycsIGZ1bmN0aW9uKG0sIGNiKSB7XG4gICAgICByZXR1cm4gY2Ioc2NhbGVNYWNoaW5lVGVzdERhdGEuZ2V0SG9zdE9wdGlvbnMoKSk7XG4gICAgfSk7XG4gICAgdG90YWxJbnN0YW5jZXMgPSA1O1xuICAgIHJldHVybiB3aW5kb3cuYXBwID0gbmV3IG5hbm9ib3guU2NhbGVNYWNoaW5lKCQoXCIuaG9sZGVyXCIpLCBzY2FsZU1hY2hpbmVUZXN0RGF0YS5nZXRTYW1wbGVTY2FsZUlkKCksIG9uVXNlclNlbGVjdE5ld1NlcnZlciwgb25Ub3RhbEluc3RhbmNlc0NoYW5nZWQsIHRvdGFsSW5zdGFuY2VzKTtcbiAgfTtcbn0pKHRoaXMpO1xuIl19

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

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ValkrieDataShim;

module.exports = ValkrieDataShim = (function() {
  function ValkrieDataShim() {
    this.initUI();
  }

  ValkrieDataShim.prototype.getApp = function(id, resetApp) {
    var returner;
    if (resetApp == null) {
      resetApp = false;
    }
    if (resetApp) {
      this.app = this.basicApp();
    }
    this.app = (function() {
      switch (id) {
        case 'host-state-change':
          return this.hostStateChange();
        case 'component-state-change':
          return this.componentStateChange();
        case 'add-component':
          return this.addComponent();
        case 'remove-component':
          return this.destroyComponent();
        case 'add-generation':
          return this.addGeneration();
        case 'remove-generation':
          return this.destroyGeneration();
        case 'basic':
          break;
        default:
          return this.basicApp();
      }
    }).call(this);
    returner = this.serialize();
    return returner;
  };

  ValkrieDataShim.prototype.basicApp = function() {
    clobberBoxDataShim.resetCounts();
    return {
      clusters: [clobberBoxDataShim.getCluster()],
      hosts: [clobberBoxDataShim.getHost()]
    };
  };

  ValkrieDataShim.prototype.hostStateChange = function() {
    this.app.hosts[0].state = 'provisioning';
    return this.app;
  };

  ValkrieDataShim.prototype.componentStateChange = function() {
    this.app.hosts[0].appComponents[0].generations[0].state = 'provisioning';
    return this.app;
  };

  ValkrieDataShim.prototype.addComponent = function() {
    this.app.hosts[0].addComponent('web', 'node', true);
    return this.app;
  };

  ValkrieDataShim.prototype.destroyComponent = function() {
    this.app.hosts[0].appComponents.pop();
    return this.app;
  };

  ValkrieDataShim.prototype.addGeneration = function() {
    this.app.hosts[0].appComponents[0].addGeneration('provisioning');
    return this.app;
  };

  ValkrieDataShim.prototype.destroyGeneration = function() {
    this.app.hosts[0].appComponents[0].generations.pop();
    return this.app;
  };

  ValkrieDataShim.prototype.serialize = function() {
    var cluster, data, host, i, j, len, len1, ref, ref1;
    data = {
      clusters: [],
      hosts: []
    };
    ref = this.app.clusters;
    for (i = 0, len = ref.length; i < len; i++) {
      cluster = ref[i];
      data.clusters.push(cluster.serialize());
    }
    ref1 = this.app.hosts;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      host = ref1[j];
      data.hosts.push(host.serialize());
    }
    data = JSON.parse(JSON.stringify(data));
    return data;
  };

  ValkrieDataShim.prototype.initUI = function() {
    return $('select').on('change', (function(_this) {
      return function(e) {
        var val;
        val = $(e.currentTarget).val();
        return valkrie.update(_this.getApp(val));
      };
    })(this));
  };

  return ValkrieDataShim;

})();

},{}],2:[function(require,module,exports){
var ValkrieDataShim;

ValkrieDataShim = require('./shims/data-shims');

window.dataShim = new ValkrieDataShim();

statsDataSimultor.createFakeStatDataProvider();

window.valkrieTesterInit = function() {
  var params;
  params = {
    updateUrl: "htpp://nanobox.io/apps/3in0vsia0an3",
    callbacks: {
      onScaleHost: function() {},
      onSplitService: function() {}
    }
  };
  window.valkrie = new nanobox.Valkrie($("body"), params);
  return valkrie.refresh(dataShim.getApp());
};

},{"./shims/data-shims":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvZGF0YS1zaGltcy5jb2ZmZWUiLCJzdGFnZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgVmFsa3JpZURhdGFTaGltO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbGtyaWVEYXRhU2hpbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVmFsa3JpZURhdGFTaGltKCkge1xuICAgIHRoaXMuaW5pdFVJKCk7XG4gIH1cblxuICBWYWxrcmllRGF0YVNoaW0ucHJvdG90eXBlLmdldEFwcCA9IGZ1bmN0aW9uKGlkLCByZXNldEFwcCkge1xuICAgIHZhciByZXR1cm5lcjtcbiAgICBpZiAocmVzZXRBcHAgPT0gbnVsbCkge1xuICAgICAgcmVzZXRBcHAgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHJlc2V0QXBwKSB7XG4gICAgICB0aGlzLmFwcCA9IHRoaXMuYmFzaWNBcHAoKTtcbiAgICB9XG4gICAgdGhpcy5hcHAgPSAoZnVuY3Rpb24oKSB7XG4gICAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICAgIGNhc2UgJ2hvc3Qtc3RhdGUtY2hhbmdlJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5ob3N0U3RhdGVDaGFuZ2UoKTtcbiAgICAgICAgY2FzZSAnY29tcG9uZW50LXN0YXRlLWNoYW5nZSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50U3RhdGVDaGFuZ2UoKTtcbiAgICAgICAgY2FzZSAnYWRkLWNvbXBvbmVudCc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ29tcG9uZW50KCk7XG4gICAgICAgIGNhc2UgJ3JlbW92ZS1jb21wb25lbnQnOlxuICAgICAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3lDb21wb25lbnQoKTtcbiAgICAgICAgY2FzZSAnYWRkLWdlbmVyYXRpb24nOlxuICAgICAgICAgIHJldHVybiB0aGlzLmFkZEdlbmVyYXRpb24oKTtcbiAgICAgICAgY2FzZSAncmVtb3ZlLWdlbmVyYXRpb24nOlxuICAgICAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3lHZW5lcmF0aW9uKCk7XG4gICAgICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5iYXNpY0FwcCgpO1xuICAgICAgfVxuICAgIH0pLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuZXIgPSB0aGlzLnNlcmlhbGl6ZSgpO1xuICAgIHJldHVybiByZXR1cm5lcjtcbiAgfTtcblxuICBWYWxrcmllRGF0YVNoaW0ucHJvdG90eXBlLmJhc2ljQXBwID0gZnVuY3Rpb24oKSB7XG4gICAgY2xvYmJlckJveERhdGFTaGltLnJlc2V0Q291bnRzKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsdXN0ZXJzOiBbY2xvYmJlckJveERhdGFTaGltLmdldENsdXN0ZXIoKV0sXG4gICAgICBob3N0czogW2Nsb2JiZXJCb3hEYXRhU2hpbS5nZXRIb3N0KCldXG4gICAgfTtcbiAgfTtcblxuICBWYWxrcmllRGF0YVNoaW0ucHJvdG90eXBlLmhvc3RTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYXBwLmhvc3RzWzBdLnN0YXRlID0gJ3Byb3Zpc2lvbmluZyc7XG4gICAgcmV0dXJuIHRoaXMuYXBwO1xuICB9O1xuXG4gIFZhbGtyaWVEYXRhU2hpbS5wcm90b3R5cGUuY29tcG9uZW50U3RhdGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFwcC5ob3N0c1swXS5hcHBDb21wb25lbnRzWzBdLmdlbmVyYXRpb25zWzBdLnN0YXRlID0gJ3Byb3Zpc2lvbmluZyc7XG4gICAgcmV0dXJuIHRoaXMuYXBwO1xuICB9O1xuXG4gIFZhbGtyaWVEYXRhU2hpbS5wcm90b3R5cGUuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hcHAuaG9zdHNbMF0uYWRkQ29tcG9uZW50KCd3ZWInLCAnbm9kZScsIHRydWUpO1xuICAgIHJldHVybiB0aGlzLmFwcDtcbiAgfTtcblxuICBWYWxrcmllRGF0YVNoaW0ucHJvdG90eXBlLmRlc3Ryb3lDb21wb25lbnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFwcC5ob3N0c1swXS5hcHBDb21wb25lbnRzLnBvcCgpO1xuICAgIHJldHVybiB0aGlzLmFwcDtcbiAgfTtcblxuICBWYWxrcmllRGF0YVNoaW0ucHJvdG90eXBlLmFkZEdlbmVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFwcC5ob3N0c1swXS5hcHBDb21wb25lbnRzWzBdLmFkZEdlbmVyYXRpb24oJ3Byb3Zpc2lvbmluZycpO1xuICAgIHJldHVybiB0aGlzLmFwcDtcbiAgfTtcblxuICBWYWxrcmllRGF0YVNoaW0ucHJvdG90eXBlLmRlc3Ryb3lHZW5lcmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hcHAuaG9zdHNbMF0uYXBwQ29tcG9uZW50c1swXS5nZW5lcmF0aW9ucy5wb3AoKTtcbiAgICByZXR1cm4gdGhpcy5hcHA7XG4gIH07XG5cbiAgVmFsa3JpZURhdGFTaGltLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2x1c3RlciwgZGF0YSwgaG9zdCwgaSwgaiwgbGVuLCBsZW4xLCByZWYsIHJlZjE7XG4gICAgZGF0YSA9IHtcbiAgICAgIGNsdXN0ZXJzOiBbXSxcbiAgICAgIGhvc3RzOiBbXVxuICAgIH07XG4gICAgcmVmID0gdGhpcy5hcHAuY2x1c3RlcnM7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjbHVzdGVyID0gcmVmW2ldO1xuICAgICAgZGF0YS5jbHVzdGVycy5wdXNoKGNsdXN0ZXIuc2VyaWFsaXplKCkpO1xuICAgIH1cbiAgICByZWYxID0gdGhpcy5hcHAuaG9zdHM7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBob3N0ID0gcmVmMVtqXTtcbiAgICAgIGRhdGEuaG9zdHMucHVzaChob3N0LnNlcmlhbGl6ZSgpKTtcbiAgICB9XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIFZhbGtyaWVEYXRhU2hpbS5wcm90b3R5cGUuaW5pdFVJID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICQoJ3NlbGVjdCcpLm9uKCdjaGFuZ2UnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciB2YWw7XG4gICAgICAgIHZhbCA9ICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKTtcbiAgICAgICAgcmV0dXJuIHZhbGtyaWUudXBkYXRlKF90aGlzLmdldEFwcCh2YWwpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9O1xuXG4gIHJldHVybiBWYWxrcmllRGF0YVNoaW07XG5cbn0pKCk7XG4iLCJ2YXIgVmFsa3JpZURhdGFTaGltO1xuXG5WYWxrcmllRGF0YVNoaW0gPSByZXF1aXJlKCcuL3NoaW1zL2RhdGEtc2hpbXMnKTtcblxud2luZG93LmRhdGFTaGltID0gbmV3IFZhbGtyaWVEYXRhU2hpbSgpO1xuXG5zdGF0c0RhdGFTaW11bHRvci5jcmVhdGVGYWtlU3RhdERhdGFQcm92aWRlcigpO1xuXG53aW5kb3cudmFsa3JpZVRlc3RlckluaXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhcmFtcztcbiAgcGFyYW1zID0ge1xuICAgIHVwZGF0ZVVybDogXCJodHBwOi8vbmFub2JveC5pby9hcHBzLzNpbjB2c2lhMGFuM1wiLFxuICAgIGNhbGxiYWNrczoge1xuICAgICAgb25TY2FsZUhvc3Q6IGZ1bmN0aW9uKCkge30sXG4gICAgICBvblNwbGl0U2VydmljZTogZnVuY3Rpb24oKSB7fVxuICAgIH1cbiAgfTtcbiAgd2luZG93LnZhbGtyaWUgPSBuZXcgbmFub2JveC5WYWxrcmllKCQoXCJib2R5XCIpLCBwYXJhbXMpO1xuICByZXR1cm4gdmFsa3JpZS5yZWZyZXNoKGRhdGFTaGltLmdldEFwcCgpKTtcbn07XG4iXX0=
