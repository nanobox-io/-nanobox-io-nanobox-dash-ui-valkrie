(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AppComponent;

module.exports = AppComponent = (function() {
  AppComponent.appComponentCount = 0;

  function AppComponent(kind, type, scalesHorizontally, scalesRedund, hostId) {
    if (kind == null) {
      kind = 'web';
    }
    this.type = type != null ? type : "ruby";
    if (scalesHorizontally == null) {
      scalesHorizontally = true;
    }
    if (scalesRedund == null) {
      scalesRedund = false;
    }
    this.generationCount = 1;
    this.state = 'active';
    this.status = 'online';
    this.serverSpecsId = "b3";
    this.id = kind + "." + (++AppComponent.appComponentCount);
    this.name = kind + " " + AppComponent.appComponentCount;
    this.generations = [];
    this.adminPath = "/some/path/to/admin";
    this.actionPath = "/some/path/to/action";
    this.category = scalesHorizontally ? 'web' : 'data';
    this.clusterable = scalesRedund;
    this.clusterShapeIs = '';
    this.clusterShapeCanBe = clobbershim.getClusterPotential(scalesHorizontally);
    this.topology = 'bunkhouse';
    this.uri = hostId + "/" + this.id;
    this.addGeneration();
  }

  AppComponent.prototype.addGeneration = function(state) {
    var obj;
    if (state == null) {
      state = 'provisioning';
    }
    obj = {
      state: state,
      status: 'online',
      id: this.id + ".gen" + (this.generationCount++)
    };
    if (Math.random() > 0.5) {
      obj.state = 'active';
    }
    return this.generations.push(obj);
  };

  AppComponent.prototype.serialize = function() {
    var data;
    data = {
      generations: this.generations,
      state: this.state,
      status: this.status,
      serverSpecsId: this.serverSpecsId,
      id: this.id,
      name: this.name,
      uid: this.id,
      serviceType: this.type,
      adminPath: this.adminPath,
      actionPath: this.actionPath,
      category: this.category,
      clusterable: this.clusterable,
      uri: this.uri,
      clusterShapeIs: this.clusterShapeIs,
      clusterShapeCanBe: this.clusterShapeCanBe,
      topology: this.topology
    };
    if (this.category === 'data') {
      data.tunnelCredentials = {
        DB_HOST: '127.0.0.1',
        DB_PORT: '4000',
        DB_USER: 'nanobox',
        DB_PASS: 'yYBavcCUWuz',
        DB_NAME: 'data.db'
      };
    }
    return data;
  };

  return AppComponent;

})();

},{}],2:[function(require,module,exports){
var DataCluster, Host;

Host = require('./host');

module.exports = DataCluster = (function() {
  DataCluster.clusterCount = 0;

  function DataCluster() {
    var generation, i, j, k, len, ref, role, roles, totalGenerations;
    totalGenerations = 1;
    this.id = "cluster." + DataCluster.clusterCount;
    this.name = "Customers DB";
    this.state = "active";
    this.status = "online";
    this.running = false;
    this.serviceType = "mysql-db";
    this.category = "data";
    this.clusterable = true;
    this.adminPath = "/some/path/to/admin";
    this.uri = this.id;
    this.generations = [];
    this.clusterShapeIs = 'data-single';
    this.clusterShapeCanBe = clobbershim.getClusterPotential(false);
    this.topology = 'cluster';
    this.tunnelCredentials = {
      host: "127.0.0.1",
      port: "provided in tunnel command output"
    };
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
          serverSpecsId: "d16",
          running: true
        });
      }
      this.generations.push(generation);
    }
  }

  DataCluster.prototype.serialize = function() {
    return {
      id: this.id,
      uid: this.id,
      state: this.state,
      status: this.status,
      running: this.running,
      name: this.name,
      category: this.category,
      clusterable: this.clusterable,
      generations: this.generations,
      serviceType: this.serviceType,
      adminPath: this.adminPath,
      uri: this.uri,
      clusterShapeIs: this.clusterShapeIs,
      clusterShapeCanBe: this.clusterShapeCanBe,
      topology: this.topology,
      tunnelCredentials: this.tunnelCredentials
    };
  };

  return DataCluster;

})();

},{"./host":6}],3:[function(require,module,exports){
var AppComponent, ClobberBoxDataShim, DataCluster, Generation, HorizCluster, Host, PlatformComponent;

AppComponent = require('./app-component');

PlatformComponent = require('./platform-component');

Host = require('./host');

HorizCluster = require('./horiz-cluster');

DataCluster = require('./data-cluster');

Generation = require('./generation');

module.exports = ClobberBoxDataShim = (function() {
  function ClobberBoxDataShim() {
    window.clobbershim = {
      getClusterPotential: this.getClusterPotential
    };
  }

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

  ClobberBoxDataShim.prototype.getAppComponent = function(kind, type, scalesHorizontally, scalesRedund, uri) {
    return new AppComponent(kind, type, scalesHorizontally, scalesRedund, uri);
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

  ClobberBoxDataShim.prototype.getClusterPotential = function(scalesHorizontally) {
    if (scalesHorizontally) {
      return ['horizontal'];
    } else {
      return ['data-single'];
    }
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
var HorizCluster, Host;

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
    this.running = true;
    this.state = "active";
    this.status = "online";
    this.serviceType = "golang";
    this.category = "web";
    this.clusterable = true;
    this.generations = [];
    this.adminPath = "/some/path/to/admin";
    this.uri = this.id;
    this.clusterShapeIs = 'horizontal';
    this.clusterShapeCanBe = clobbershim.getClusterPotential(true);
    this.topology = 'cluster';
    for (i = j = 1, ref = totalGenerations; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      generation = {
        id: "web.main.gen" + i,
        state: 'active',
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
          serverSpecsId: "d16"
        });
      }
      this.generations.push(generation);
    }
  }

  HorizCluster.prototype.serialize = function() {
    return {
      id: this.id,
      uid: this.id,
      state: this.state,
      running: this.running,
      status: this.status,
      name: this.name,
      scalesHoriz: this.scalesHoriz,
      category: this.category,
      clusterable: this.clusterable,
      scalesRedund: this.scalesRedund,
      generations: this.generations,
      serviceType: this.serviceType,
      adminPath: this.adminPath,
      uri: this.uri,
      state: this.state,
      clusterShapeIs: this.clusterShapeIs,
      clusterShapeCanBe: this.clusterShapeCanBe,
      topology: this.topology
    };
  };

  return HorizCluster;

})();

},{"./host":6}],6:[function(require,module,exports){
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
    this.running = true;
    this.status = 'online';
    this.id = "host." + (++Host.hostCount);
    this.name = "ec2." + Host.hostCount;
    this.serverSpecsId = "d16";
    this.bunkhouseId = "bunkhouse";
    this.actionPath = "/some/path/to/actions";
    this.platformServices = [new PlatformComponent("lb", "mesh", "nanobox/portal", this.id), new PlatformComponent("lg", "logger", "nanobox/logvac", this.id), new PlatformComponent("hm", "monitor", "nanobox/pulse", this.id), new PlatformComponent("mr", "pusher", "nanobox/mist", this.id), new PlatformComponent("gs", "warehouse", "nanobox/hoarder", this.id)];
    this.appComponents = [];
    this.createComponents(makeLotsOfComponents);
  }

  Host.prototype.createComponents = function(makeLotsOfComponents) {
    if (!makeLotsOfComponents) {
      this.addComponent('web', 'tolmark3', true, true);
      return this.addComponent('db', 'mongo12', false, true);
    } else {
      this.addComponent();
      this.addComponent('db', 'mongo-engine', false);
      this.addComponent('web', 'node-engine', true);
      this.addComponent('web', 'memcached-engine', true);
      this.addComponent('web', 'python-engine', true);
      this.addComponent('web', 'storage-engine', true);
      this.addComponent('web', 'java-engine', true);
      this.addComponent('web', 'php-engine', true);
      this.addComponent('db', 'couch-engine', false);
      this.addComponent('db', 'maria-engine', false);
      this.addComponent('db', 'postgres-engine', false);
      this.addComponent('db', 'redis-engine', false);
      this.addComponent('db', 'percona-engine', false);
      this.addComponent('web', 'somerandomdb', true);
      return this.addComponent('db', 'nothingwillmatch', false);
    }
  };

  Host.prototype.addComponent = function(kind, type, isHorizontallyScalable, isRedundScalable) {
    return this.appComponents.push(new AppComponent(kind, type, isHorizontallyScalable, isRedundScalable, this.id));
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
      status: this.status,
      id: this.id,
      running: this.running,
      name: this.name,
      serverSpecsId: this.serverSpecsId,
      bunkhouseId: this.bunkhouseId,
      actionPath: this.actionPath,
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
  function PlatformComponent(id, kind, componentKind, hostId) {
    this.id = id;
    this.kind = kind;
    if (componentKind == null) {
      componentKind = 'mist';
    }
    this.isSplitable = true;
    this.mode = 'simple';
    this.adminPath = "/some/path/to/admin";
    this.components = [new AppComponent('web', componentKind, true, true, hostId).serialize()];
  }

  PlatformComponent.prototype.serialize = function() {
    return {
      id: this.id,
      kind: this.kind,
      isSplitable: this.isSplitable,
      mode: this.mode,
      components: this.components,
      status: 'online'
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

nanobox.noDeploys = false;

nanobox.appName = 'fishfeather';

nanobox.fqAppName = 'flock/fishfeather';

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
    window.addHost = function(lotsOfIcons) {
      var hostBox;
      hostBox = new nanobox.ClobberBox();
      hostBox.build($holder, nanobox.ClobberBox.HOST, clobberBoxDataShim.getHost(lotsOfIcons).serialize());
      return ui.noteComponents(hostBox);
    };
    window.addCluster = function(clusterData) {
      var clusterBox, data, generation, j, len, ref, results;
      ref = clusterData.generations;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        generation = ref[j];
        data = nanobox.ClobberBox.joinClusterData(clusterData, generation);
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
    window.setGenerationStatus = function(id, status) {
      return getParentOfGeneration(id).setGenerationStatus(id, status);
    };
    subscribeToRegistrations = function() {
      PubSub.subscribe('SCALE.GET_OPTIONS', function(m, cb) {
        return cb(scaleMachineTestData.getHostOptions());
      });
      PubSub.subscribe('GET_BUNKHOUSES', function(m, data) {
        return data.cb([
          {
            id: "a",
            name: "EC2 1",
            current: true,
            state: 'active'
          }, {
            id: "c",
            name: "EC2 3",
            state: "active"
          }
        ]);
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
        console.log(data);
        return data.submitCb();
      });
      PubSub.subscribe('SPLIT.SAVE', function(m, data) {
        console.log("Split:");
        console.log(data);
        return data.submitCb();
      });
      PubSub.subscribe('HOST.RUN-ACTION', function(m, data) {
        console.log("running host action `" + data.action + "` on host `" + data.hostId + "`");
        return setTimeout(data.onComplete, Math.random() * 1000);
      });
      return PubSub.subscribe('COMPONENT.RUN-ACTION', function(m, data) {
        console.log("running component action `" + data.action + "` on component `" + data.componentId + "`");
        return setTimeout(data.onComplete, Math.random() * 1000);
      });
    };
    addEventListeners = function() {
      PubSub.subscribe('SHOW.APP_COMPONENTS', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('app-components', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.PLATFORM_COMPONENTS', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('platform-components', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.HOST-INTANCES', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('host-instances', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.SCALE', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('scale-machine', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.STATS', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('stats', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.CONSOLE', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('console', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.TUNNEL', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('tunnel', data.el);
        };
      })(this));
      PubSub.subscribe('SHOW.SPLIT', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('split', data.el);
        };
      })(this));
      return PubSub.subscribe('SHOW.ADMIN', (function(_this) {
        return function(m, data) {
          return getBox(data.uri).switchSubContent('admin', data.el);
        };
      })(this));
    };
    getBox = function(uri) {
      var box, j, len;
      for (j = 0, len = boxes.length; j < len; j++) {
        box = boxes[j];
        if (uri === box.uri) {
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
    nanobox.noDeploys = true;
    nanobox.clobberConfig = {};
    nanobox.clobberConfig.hostActions = [
      {
        action: 'delete',
        permission: true
      }, {
        action: 'reboot',
        permission: true
      }, {
        action: 'stop',
        permission: true
      }, {
        action: 'start',
        permission: true
      }
    ];
    nanobox.clobberConfig.componentActions = [
      {
        action: 'refresh',
        permission: true
      }, {
        action: 'reboot',
        permission: false
      }, {
        action: 'rebuild',
        permission: true
      }, {
        action: 'update',
        permission: true
      }, {
        action: 'manage',
        permission: true
      }, {
        action: 'delete',
        permission: true
      }, {
        action: 'stop',
        permission: true
      }, {
        action: 'start',
        permission: true
      }
    ];
    addHost(false);
    addCluster(clobberBoxDataShim.getHorizCluster().serialize());
    addCluster(clobberBoxDataShim.getDataCluster().serialize());
    window.setNoDeploys = function() {
      return getBox("host.1").setReadinessState('no-deploys', 'nbx');
    };
    window.setPlatformBuilding = function() {
      return getBox("host.1").setReadinessState('platform-building');
    };
    return window.getComponentData = function() {
      return getBox("host.1").getDataForUsageBreakdown();
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
    $("button#gen-status-go").on('click', (function(_this) {
      return function() {
        var id, status;
        id = $("select#generations-status-selector").val();
        status = $("select#gen-status").val();
        return setGenerationStatus(id, status);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzaGltcy9hcHAtY29tcG9uZW50LmNvZmZlZSIsInNoaW1zL2RhdGEtY2x1c3Rlci5jb2ZmZWUiLCJzaGltcy9kYXRhLXNoaW0uY29mZmVlIiwic2hpbXMvZ2VuZXJhdGlvbi5jb2ZmZWUiLCJzaGltcy9ob3Jpei1jbHVzdGVyLmNvZmZlZSIsInNoaW1zL2hvc3QuY29mZmVlIiwic2hpbXMvcGxhdGZvcm0tY29tcG9uZW50LmNvZmZlZSIsInN0YWdlLmNvZmZlZSIsInRlc3QtdWkvdWkuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEFwcENvbXBvbmVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBDb21wb25lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIEFwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gQXBwQ29tcG9uZW50KGtpbmQsIHR5cGUsIHNjYWxlc0hvcml6b250YWxseSwgc2NhbGVzUmVkdW5kLCBob3N0SWQpIHtcbiAgICBpZiAoa2luZCA9PSBudWxsKSB7XG4gICAgICBraW5kID0gJ3dlYic7XG4gICAgfVxuICAgIHRoaXMudHlwZSA9IHR5cGUgIT0gbnVsbCA/IHR5cGUgOiBcInJ1YnlcIjtcbiAgICBpZiAoc2NhbGVzSG9yaXpvbnRhbGx5ID09IG51bGwpIHtcbiAgICAgIHNjYWxlc0hvcml6b250YWxseSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChzY2FsZXNSZWR1bmQgPT0gbnVsbCkge1xuICAgICAgc2NhbGVzUmVkdW5kID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGlvbkNvdW50ID0gMTtcbiAgICB0aGlzLnN0YXRlID0gJ2FjdGl2ZSc7XG4gICAgdGhpcy5zdGF0dXMgPSAnb25saW5lJztcbiAgICB0aGlzLnNlcnZlclNwZWNzSWQgPSBcImIzXCI7XG4gICAgdGhpcy5pZCA9IGtpbmQgKyBcIi5cIiArICgrK0FwcENvbXBvbmVudC5hcHBDb21wb25lbnRDb3VudCk7XG4gICAgdGhpcy5uYW1lID0ga2luZCArIFwiIFwiICsgQXBwQ29tcG9uZW50LmFwcENvbXBvbmVudENvdW50O1xuICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcbiAgICB0aGlzLmFkbWluUGF0aCA9IFwiL3NvbWUvcGF0aC90by9hZG1pblwiO1xuICAgIHRoaXMuYWN0aW9uUGF0aCA9IFwiL3NvbWUvcGF0aC90by9hY3Rpb25cIjtcbiAgICB0aGlzLmNhdGVnb3J5ID0gc2NhbGVzSG9yaXpvbnRhbGx5ID8gJ3dlYicgOiAnZGF0YSc7XG4gICAgdGhpcy5jbHVzdGVyYWJsZSA9IHNjYWxlc1JlZHVuZDtcbiAgICB0aGlzLmNsdXN0ZXJTaGFwZUlzID0gJyc7XG4gICAgdGhpcy5jbHVzdGVyU2hhcGVDYW5CZSA9IGNsb2JiZXJzaGltLmdldENsdXN0ZXJQb3RlbnRpYWwoc2NhbGVzSG9yaXpvbnRhbGx5KTtcbiAgICB0aGlzLnRvcG9sb2d5ID0gJ2J1bmtob3VzZSc7XG4gICAgdGhpcy51cmkgPSBob3N0SWQgKyBcIi9cIiArIHRoaXMuaWQ7XG4gICAgdGhpcy5hZGRHZW5lcmF0aW9uKCk7XG4gIH1cblxuICBBcHBDb21wb25lbnQucHJvdG90eXBlLmFkZEdlbmVyYXRpb24gPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgIHZhciBvYmo7XG4gICAgaWYgKHN0YXRlID09IG51bGwpIHtcbiAgICAgIHN0YXRlID0gJ3Byb3Zpc2lvbmluZyc7XG4gICAgfVxuICAgIG9iaiA9IHtcbiAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgIHN0YXR1czogJ29ubGluZScsXG4gICAgICBpZDogdGhpcy5pZCArIFwiLmdlblwiICsgKHRoaXMuZ2VuZXJhdGlvbkNvdW50KyspXG4gICAgfTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgb2JqLnN0YXRlID0gJ2FjdGl2ZSc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdlbmVyYXRpb25zLnB1c2gob2JqKTtcbiAgfTtcblxuICBBcHBDb21wb25lbnQucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhO1xuICAgIGRhdGEgPSB7XG4gICAgICBnZW5lcmF0aW9uczogdGhpcy5nZW5lcmF0aW9ucyxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHNlcnZlclNwZWNzSWQ6IHRoaXMuc2VydmVyU3BlY3NJZCxcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgdWlkOiB0aGlzLmlkLFxuICAgICAgc2VydmljZVR5cGU6IHRoaXMudHlwZSxcbiAgICAgIGFkbWluUGF0aDogdGhpcy5hZG1pblBhdGgsXG4gICAgICBhY3Rpb25QYXRoOiB0aGlzLmFjdGlvblBhdGgsXG4gICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgIGNsdXN0ZXJhYmxlOiB0aGlzLmNsdXN0ZXJhYmxlLFxuICAgICAgdXJpOiB0aGlzLnVyaSxcbiAgICAgIGNsdXN0ZXJTaGFwZUlzOiB0aGlzLmNsdXN0ZXJTaGFwZUlzLFxuICAgICAgY2x1c3RlclNoYXBlQ2FuQmU6IHRoaXMuY2x1c3RlclNoYXBlQ2FuQmUsXG4gICAgICB0b3BvbG9neTogdGhpcy50b3BvbG9neVxuICAgIH07XG4gICAgaWYgKHRoaXMuY2F0ZWdvcnkgPT09ICdkYXRhJykge1xuICAgICAgZGF0YS50dW5uZWxDcmVkZW50aWFscyA9IHtcbiAgICAgICAgREJfSE9TVDogJzEyNy4wLjAuMScsXG4gICAgICAgIERCX1BPUlQ6ICc0MDAwJyxcbiAgICAgICAgREJfVVNFUjogJ25hbm9ib3gnLFxuICAgICAgICBEQl9QQVNTOiAneVlCYXZjQ1VXdXonLFxuICAgICAgICBEQl9OQU1FOiAnZGF0YS5kYidcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIHJldHVybiBBcHBDb21wb25lbnQ7XG5cbn0pKCk7XG4iLCJ2YXIgRGF0YUNsdXN0ZXIsIEhvc3Q7XG5cbkhvc3QgPSByZXF1aXJlKCcuL2hvc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhQ2x1c3RlciA9IChmdW5jdGlvbigpIHtcbiAgRGF0YUNsdXN0ZXIuY2x1c3RlckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBEYXRhQ2x1c3RlcigpIHtcbiAgICB2YXIgZ2VuZXJhdGlvbiwgaSwgaiwgaywgbGVuLCByZWYsIHJvbGUsIHJvbGVzLCB0b3RhbEdlbmVyYXRpb25zO1xuICAgIHRvdGFsR2VuZXJhdGlvbnMgPSAxO1xuICAgIHRoaXMuaWQgPSBcImNsdXN0ZXIuXCIgKyBEYXRhQ2x1c3Rlci5jbHVzdGVyQ291bnQ7XG4gICAgdGhpcy5uYW1lID0gXCJDdXN0b21lcnMgREJcIjtcbiAgICB0aGlzLnN0YXRlID0gXCJhY3RpdmVcIjtcbiAgICB0aGlzLnN0YXR1cyA9IFwib25saW5lXCI7XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZXJ2aWNlVHlwZSA9IFwibXlzcWwtZGJcIjtcbiAgICB0aGlzLmNhdGVnb3J5ID0gXCJkYXRhXCI7XG4gICAgdGhpcy5jbHVzdGVyYWJsZSA9IHRydWU7XG4gICAgdGhpcy5hZG1pblBhdGggPSBcIi9zb21lL3BhdGgvdG8vYWRtaW5cIjtcbiAgICB0aGlzLnVyaSA9IHRoaXMuaWQ7XG4gICAgdGhpcy5nZW5lcmF0aW9ucyA9IFtdO1xuICAgIHRoaXMuY2x1c3RlclNoYXBlSXMgPSAnZGF0YS1zaW5nbGUnO1xuICAgIHRoaXMuY2x1c3RlclNoYXBlQ2FuQmUgPSBjbG9iYmVyc2hpbS5nZXRDbHVzdGVyUG90ZW50aWFsKGZhbHNlKTtcbiAgICB0aGlzLnRvcG9sb2d5ID0gJ2NsdXN0ZXInO1xuICAgIHRoaXMudHVubmVsQ3JlZGVudGlhbHMgPSB7XG4gICAgICBob3N0OiBcIjEyNy4wLjAuMVwiLFxuICAgICAgcG9ydDogXCJwcm92aWRlZCBpbiB0dW5uZWwgY29tbWFuZCBvdXRwdXRcIlxuICAgIH07XG4gICAgZm9yIChpID0gaiA9IDEsIHJlZiA9IHRvdGFsR2VuZXJhdGlvbnM7IDEgPD0gcmVmID8gaiA8PSByZWYgOiBqID49IHJlZjsgaSA9IDEgPD0gcmVmID8gKytqIDogLS1qKSB7XG4gICAgICBnZW5lcmF0aW9uID0ge1xuICAgICAgICBpZDogXCJkYi5tYWluLmdlblwiICsgaSxcbiAgICAgICAgc3RhdGU6IFwiYWN0aXZlXCIsXG4gICAgICAgIHN0YXR1czogXCJvbmxpbmVcIixcbiAgICAgICAgaW5zdGFuY2VzOiBbXVxuICAgICAgfTtcbiAgICAgIHJvbGVzID0gWydwcmltYXJ5JywgJ3NlY29uZGFyeScsICdhcmJpdGVyJ107XG4gICAgICBmb3IgKGkgPSBrID0gMCwgbGVuID0gcm9sZXMubGVuZ3RoOyBrIDwgbGVuOyBpID0gKytrKSB7XG4gICAgICAgIHJvbGUgPSByb2xlc1tpXTtcbiAgICAgICAgZ2VuZXJhdGlvbi5pbnN0YW5jZXMucHVzaCh7XG4gICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgaG9zdElkOiBcImRvLlwiICsgaSxcbiAgICAgICAgICBob3N0TmFtZTogXCJkby5cIiArIGksXG4gICAgICAgICAgc3RhdGU6IFwiYWN0aXZlXCIsXG4gICAgICAgICAgc3RhdHVzOiBcIm9ubGluZVwiLFxuICAgICAgICAgIHJvbGU6IHJvbGUsXG4gICAgICAgICAgc2VydmVyU3BlY3NJZDogXCJkMTZcIixcbiAgICAgICAgICBydW5uaW5nOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5nZW5lcmF0aW9ucy5wdXNoKGdlbmVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIERhdGFDbHVzdGVyLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICB1aWQ6IHRoaXMuaWQsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBydW5uaW5nOiB0aGlzLnJ1bm5pbmcsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgIGNsdXN0ZXJhYmxlOiB0aGlzLmNsdXN0ZXJhYmxlLFxuICAgICAgZ2VuZXJhdGlvbnM6IHRoaXMuZ2VuZXJhdGlvbnMsXG4gICAgICBzZXJ2aWNlVHlwZTogdGhpcy5zZXJ2aWNlVHlwZSxcbiAgICAgIGFkbWluUGF0aDogdGhpcy5hZG1pblBhdGgsXG4gICAgICB1cmk6IHRoaXMudXJpLFxuICAgICAgY2x1c3RlclNoYXBlSXM6IHRoaXMuY2x1c3RlclNoYXBlSXMsXG4gICAgICBjbHVzdGVyU2hhcGVDYW5CZTogdGhpcy5jbHVzdGVyU2hhcGVDYW5CZSxcbiAgICAgIHRvcG9sb2d5OiB0aGlzLnRvcG9sb2d5LFxuICAgICAgdHVubmVsQ3JlZGVudGlhbHM6IHRoaXMudHVubmVsQ3JlZGVudGlhbHNcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBEYXRhQ2x1c3RlcjtcblxufSkoKTtcbiIsInZhciBBcHBDb21wb25lbnQsIENsb2JiZXJCb3hEYXRhU2hpbSwgRGF0YUNsdXN0ZXIsIEdlbmVyYXRpb24sIEhvcml6Q2x1c3RlciwgSG9zdCwgUGxhdGZvcm1Db21wb25lbnQ7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5QbGF0Zm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcGxhdGZvcm0tY29tcG9uZW50Jyk7XG5cbkhvc3QgPSByZXF1aXJlKCcuL2hvc3QnKTtcblxuSG9yaXpDbHVzdGVyID0gcmVxdWlyZSgnLi9ob3Jpei1jbHVzdGVyJyk7XG5cbkRhdGFDbHVzdGVyID0gcmVxdWlyZSgnLi9kYXRhLWNsdXN0ZXInKTtcblxuR2VuZXJhdGlvbiA9IHJlcXVpcmUoJy4vZ2VuZXJhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENsb2JiZXJCb3hEYXRhU2hpbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQ2xvYmJlckJveERhdGFTaGltKCkge1xuICAgIHdpbmRvdy5jbG9iYmVyc2hpbSA9IHtcbiAgICAgIGdldENsdXN0ZXJQb3RlbnRpYWw6IHRoaXMuZ2V0Q2x1c3RlclBvdGVudGlhbFxuICAgIH07XG4gIH1cblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldEhvc3QgPSBmdW5jdGlvbihtYWtlTG90c09mQ29tcG9uZW50cykge1xuICAgIGlmIChtYWtlTG90c09mQ29tcG9uZW50cyA9PSBudWxsKSB7XG4gICAgICBtYWtlTG90c09mQ29tcG9uZW50cyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEhvc3QobWFrZUxvdHNPZkNvbXBvbmVudHMpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0SG9yaXpDbHVzdGVyID0gZnVuY3Rpb24odG90YWxNZW1iZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBIb3JpekNsdXN0ZXIodG90YWxNZW1iZXJzKTtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldERhdGFDbHVzdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRhQ2x1c3RlcigpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0QXBwQ29tcG9uZW50ID0gZnVuY3Rpb24oa2luZCwgdHlwZSwgc2NhbGVzSG9yaXpvbnRhbGx5LCBzY2FsZXNSZWR1bmQsIHVyaSkge1xuICAgIHJldHVybiBuZXcgQXBwQ29tcG9uZW50KGtpbmQsIHR5cGUsIHNjYWxlc0hvcml6b250YWxseSwgc2NhbGVzUmVkdW5kLCB1cmkpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0UGxhdGZvcm1Db21wb25lbnQgPSBmdW5jdGlvbihpZCwga2luZCkge1xuICAgIHJldHVybiBuZXcgUGxhdGZvcm1Db21wb25lbnQoaWQsIGtpbmQpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUuZ2V0R2VuZXJhdGlvbiA9IGZ1bmN0aW9uKHBhcmVudElkLCBzdGF0ZSkge1xuICAgIHJldHVybiBuZXcgR2VuZXJhdGlvbihwYXJlbnRJZCwgc3RhdGUpO1xuICB9O1xuXG4gIENsb2JiZXJCb3hEYXRhU2hpbS5wcm90b3R5cGUucmVzZXRDb3VudHMgPSBmdW5jdGlvbigpIHtcbiAgICBIb3N0Lmhvc3RDb3VudCA9IDA7XG4gICAgQXBwQ29tcG9uZW50LmFwcENvbXBvbmVudENvdW50ID0gMDtcbiAgICBIb3JpekNsdXN0ZXIuY2x1c3RlckNvdW50ID0gMDtcbiAgICByZXR1cm4gRGF0YUNsdXN0ZXIuY2x1c3RlckNvdW50ID0gMDtcbiAgfTtcblxuICBDbG9iYmVyQm94RGF0YVNoaW0ucHJvdG90eXBlLmdldENsdXN0ZXJQb3RlbnRpYWwgPSBmdW5jdGlvbihzY2FsZXNIb3Jpem9udGFsbHkpIHtcbiAgICBpZiAoc2NhbGVzSG9yaXpvbnRhbGx5KSB7XG4gICAgICByZXR1cm4gWydob3Jpem9udGFsJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbJ2RhdGEtc2luZ2xlJ107XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDbG9iYmVyQm94RGF0YVNoaW07XG5cbn0pKCk7XG4iLCJ2YXIgR2VuZXJhdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBHZW5lcmF0aW9uID0gKGZ1bmN0aW9uKCkge1xuICBHZW5lcmF0aW9uLmdlbmVyaWNHZW5lcmF0aW9uQ291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIEdlbmVyYXRpb24ocGFyZW50SWQsIHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlID09IG51bGwpIHtcbiAgICAgIHN0YXRlID0gJ2FjdGl2ZSc7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmlkID0gcGFyZW50SWQgKyBcIi5nZW5cIiArIChHZW5lcmF0aW9uLmdlbmVyaWNHZW5lcmF0aW9uQ291bnQrKyk7XG4gIH1cblxuICBHZW5lcmF0aW9uLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICBpZDogdGhpcy5pZFxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIEdlbmVyYXRpb247XG5cbn0pKCk7XG4iLCJ2YXIgSG9yaXpDbHVzdGVyLCBIb3N0O1xuXG5Ib3N0ID0gcmVxdWlyZSgnLi9ob3N0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSG9yaXpDbHVzdGVyID0gKGZ1bmN0aW9uKCkge1xuICBIb3JpekNsdXN0ZXIuY2x1c3RlckNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBIb3JpekNsdXN0ZXIodG90YWxNZW1iZXJzLCB0b3RhbEdlbmVyYXRpb25zKSB7XG4gICAgdmFyIGdlbmVyYXRpb24sIGksIGosIGssIHJlZiwgcmVmMTtcbiAgICBpZiAodG90YWxNZW1iZXJzID09IG51bGwpIHtcbiAgICAgIHRvdGFsTWVtYmVycyA9IDQ7XG4gICAgfVxuICAgIGlmICh0b3RhbEdlbmVyYXRpb25zID09IG51bGwpIHtcbiAgICAgIHRvdGFsR2VuZXJhdGlvbnMgPSAxO1xuICAgIH1cbiAgICB0aGlzLmlkID0gXCJjbHVzdGVyLlwiICsgSG9yaXpDbHVzdGVyLmNsdXN0ZXJDb3VudDtcbiAgICB0aGlzLm5hbWUgPSBcIk1haW4gQXBwXCI7XG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXRlID0gXCJhY3RpdmVcIjtcbiAgICB0aGlzLnN0YXR1cyA9IFwib25saW5lXCI7XG4gICAgdGhpcy5zZXJ2aWNlVHlwZSA9IFwiZ29sYW5nXCI7XG4gICAgdGhpcy5jYXRlZ29yeSA9IFwid2ViXCI7XG4gICAgdGhpcy5jbHVzdGVyYWJsZSA9IHRydWU7XG4gICAgdGhpcy5nZW5lcmF0aW9ucyA9IFtdO1xuICAgIHRoaXMuYWRtaW5QYXRoID0gXCIvc29tZS9wYXRoL3RvL2FkbWluXCI7XG4gICAgdGhpcy51cmkgPSB0aGlzLmlkO1xuICAgIHRoaXMuY2x1c3RlclNoYXBlSXMgPSAnaG9yaXpvbnRhbCc7XG4gICAgdGhpcy5jbHVzdGVyU2hhcGVDYW5CZSA9IGNsb2JiZXJzaGltLmdldENsdXN0ZXJQb3RlbnRpYWwodHJ1ZSk7XG4gICAgdGhpcy50b3BvbG9neSA9ICdjbHVzdGVyJztcbiAgICBmb3IgKGkgPSBqID0gMSwgcmVmID0gdG90YWxHZW5lcmF0aW9uczsgMSA8PSByZWYgPyBqIDw9IHJlZiA6IGogPj0gcmVmOyBpID0gMSA8PSByZWYgPyArK2ogOiAtLWopIHtcbiAgICAgIGdlbmVyYXRpb24gPSB7XG4gICAgICAgIGlkOiBcIndlYi5tYWluLmdlblwiICsgaSxcbiAgICAgICAgc3RhdGU6ICdhY3RpdmUnLFxuICAgICAgICBzdGF0dXM6IFwib25saW5lXCIsXG4gICAgICAgIGluc3RhbmNlczogW11cbiAgICAgIH07XG4gICAgICBmb3IgKGkgPSBrID0gMSwgcmVmMSA9IHRvdGFsTWVtYmVyczsgMSA8PSByZWYxID8gayA8PSByZWYxIDogayA+PSByZWYxOyBpID0gMSA8PSByZWYxID8gKytrIDogLS1rKSB7XG4gICAgICAgIGdlbmVyYXRpb24uaW5zdGFuY2VzLnB1c2goe1xuICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgIGhvc3RJZDogXCJkby5cIiArIGksXG4gICAgICAgICAgaG9zdE5hbWU6IFwiZG8uXCIgKyBpLFxuICAgICAgICAgIHN0YXRlOiBcImFjdGl2ZVwiLFxuICAgICAgICAgIHN0YXR1czogXCJvbmxpbmVcIixcbiAgICAgICAgICByb2xlOiBcImRlZmF1bHRcIixcbiAgICAgICAgICBzZXJ2ZXJTcGVjc0lkOiBcImQxNlwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5nZW5lcmF0aW9ucy5wdXNoKGdlbmVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIEhvcml6Q2x1c3Rlci5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgdWlkOiB0aGlzLmlkLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICBydW5uaW5nOiB0aGlzLnJ1bm5pbmcsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgc2NhbGVzSG9yaXo6IHRoaXMuc2NhbGVzSG9yaXosXG4gICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeSxcbiAgICAgIGNsdXN0ZXJhYmxlOiB0aGlzLmNsdXN0ZXJhYmxlLFxuICAgICAgc2NhbGVzUmVkdW5kOiB0aGlzLnNjYWxlc1JlZHVuZCxcbiAgICAgIGdlbmVyYXRpb25zOiB0aGlzLmdlbmVyYXRpb25zLFxuICAgICAgc2VydmljZVR5cGU6IHRoaXMuc2VydmljZVR5cGUsXG4gICAgICBhZG1pblBhdGg6IHRoaXMuYWRtaW5QYXRoLFxuICAgICAgdXJpOiB0aGlzLnVyaSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgY2x1c3RlclNoYXBlSXM6IHRoaXMuY2x1c3RlclNoYXBlSXMsXG4gICAgICBjbHVzdGVyU2hhcGVDYW5CZTogdGhpcy5jbHVzdGVyU2hhcGVDYW5CZSxcbiAgICAgIHRvcG9sb2d5OiB0aGlzLnRvcG9sb2d5XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gSG9yaXpDbHVzdGVyO1xuXG59KSgpO1xuIiwidmFyIEFwcENvbXBvbmVudCwgSG9zdCwgUGxhdGZvcm1Db21wb25lbnQ7XG5cbkFwcENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYXBwLWNvbXBvbmVudCcpO1xuXG5QbGF0Zm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vcGxhdGZvcm0tY29tcG9uZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSG9zdCA9IChmdW5jdGlvbigpIHtcbiAgSG9zdC5ob3N0Q291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIEhvc3QobWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICBpZiAobWFrZUxvdHNPZkNvbXBvbmVudHMgPT0gbnVsbCkge1xuICAgICAgbWFrZUxvdHNPZkNvbXBvbmVudHMgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9IFwiYWN0aXZlXCI7XG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXR1cyA9ICdvbmxpbmUnO1xuICAgIHRoaXMuaWQgPSBcImhvc3QuXCIgKyAoKytIb3N0Lmhvc3RDb3VudCk7XG4gICAgdGhpcy5uYW1lID0gXCJlYzIuXCIgKyBIb3N0Lmhvc3RDb3VudDtcbiAgICB0aGlzLnNlcnZlclNwZWNzSWQgPSBcImQxNlwiO1xuICAgIHRoaXMuYnVua2hvdXNlSWQgPSBcImJ1bmtob3VzZVwiO1xuICAgIHRoaXMuYWN0aW9uUGF0aCA9IFwiL3NvbWUvcGF0aC90by9hY3Rpb25zXCI7XG4gICAgdGhpcy5wbGF0Zm9ybVNlcnZpY2VzID0gW25ldyBQbGF0Zm9ybUNvbXBvbmVudChcImxiXCIsIFwibWVzaFwiLCBcIm5hbm9ib3gvcG9ydGFsXCIsIHRoaXMuaWQpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJsZ1wiLCBcImxvZ2dlclwiLCBcIm5hbm9ib3gvbG9ndmFjXCIsIHRoaXMuaWQpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJobVwiLCBcIm1vbml0b3JcIiwgXCJuYW5vYm94L3B1bHNlXCIsIHRoaXMuaWQpLCBuZXcgUGxhdGZvcm1Db21wb25lbnQoXCJtclwiLCBcInB1c2hlclwiLCBcIm5hbm9ib3gvbWlzdFwiLCB0aGlzLmlkKSwgbmV3IFBsYXRmb3JtQ29tcG9uZW50KFwiZ3NcIiwgXCJ3YXJlaG91c2VcIiwgXCJuYW5vYm94L2hvYXJkZXJcIiwgdGhpcy5pZCldO1xuICAgIHRoaXMuYXBwQ29tcG9uZW50cyA9IFtdO1xuICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50cyhtYWtlTG90c09mQ29tcG9uZW50cyk7XG4gIH1cblxuICBIb3N0LnByb3RvdHlwZS5jcmVhdGVDb21wb25lbnRzID0gZnVuY3Rpb24obWFrZUxvdHNPZkNvbXBvbmVudHMpIHtcbiAgICBpZiAoIW1ha2VMb3RzT2ZDb21wb25lbnRzKSB7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ3RvbG1hcmszJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ21vbmdvMTInLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnZGInLCAnbW9uZ28tZW5naW5lJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdub2RlLWVuZ2luZScsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ3dlYicsICdtZW1jYWNoZWQtZW5naW5lJywgdHJ1ZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnd2ViJywgJ3B5dGhvbi1lbmdpbmUnLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAnc3RvcmFnZS1lbmdpbmUnLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAnamF2YS1lbmdpbmUnLCB0cnVlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAncGhwLWVuZ2luZScsIHRydWUpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ2NvdWNoLWVuZ2luZScsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdtYXJpYS1lbmdpbmUnLCBmYWxzZSk7XG4gICAgICB0aGlzLmFkZENvbXBvbmVudCgnZGInLCAncG9zdGdyZXMtZW5naW5lJywgZmFsc2UpO1xuICAgICAgdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ3JlZGlzLWVuZ2luZScsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCdkYicsICdwZXJjb25hLWVuZ2luZScsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50KCd3ZWInLCAnc29tZXJhbmRvbWRiJywgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDb21wb25lbnQoJ2RiJywgJ25vdGhpbmd3aWxsbWF0Y2gnLCBmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIEhvc3QucHJvdG90eXBlLmFkZENvbXBvbmVudCA9IGZ1bmN0aW9uKGtpbmQsIHR5cGUsIGlzSG9yaXpvbnRhbGx5U2NhbGFibGUsIGlzUmVkdW5kU2NhbGFibGUpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBDb21wb25lbnRzLnB1c2gobmV3IEFwcENvbXBvbmVudChraW5kLCB0eXBlLCBpc0hvcml6b250YWxseVNjYWxhYmxlLCBpc1JlZHVuZFNjYWxhYmxlLCB0aGlzLmlkKSk7XG4gIH07XG5cbiAgSG9zdC5wcm90b3R5cGUuc2VyaWFsaXplQ29tcG9uZW50cyA9IGZ1bmN0aW9uKGNvbXBvbmVudHMpIHtcbiAgICB2YXIgYXIsIGNvbXBvbmVudCwgaSwgbGVuO1xuICAgIGFyID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gY29tcG9uZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50c1tpXTtcbiAgICAgIGFyLnB1c2goY29tcG9uZW50LnNlcmlhbGl6ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuXG4gIEhvc3QucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIHJ1bm5pbmc6IHRoaXMucnVubmluZyxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIHNlcnZlclNwZWNzSWQ6IHRoaXMuc2VydmVyU3BlY3NJZCxcbiAgICAgIGJ1bmtob3VzZUlkOiB0aGlzLmJ1bmtob3VzZUlkLFxuICAgICAgYWN0aW9uUGF0aDogdGhpcy5hY3Rpb25QYXRoLFxuICAgICAgcGxhdGZvcm1TZXJ2aWNlczogdGhpcy5zZXJpYWxpemVDb21wb25lbnRzKHRoaXMucGxhdGZvcm1TZXJ2aWNlcyksXG4gICAgICBhcHBDb21wb25lbnRzOiB0aGlzLnNlcmlhbGl6ZUNvbXBvbmVudHModGhpcy5hcHBDb21wb25lbnRzKVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIEhvc3Q7XG5cbn0pKCk7XG4iLCJ2YXIgQXBwQ29tcG9uZW50LCBQbGF0Zm9ybUNvbXBvbmVudDtcblxuQXBwQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9hcHAtY29tcG9uZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxhdGZvcm1Db21wb25lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBsYXRmb3JtQ29tcG9uZW50KGlkLCBraW5kLCBjb21wb25lbnRLaW5kLCBob3N0SWQpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5raW5kID0ga2luZDtcbiAgICBpZiAoY29tcG9uZW50S2luZCA9PSBudWxsKSB7XG4gICAgICBjb21wb25lbnRLaW5kID0gJ21pc3QnO1xuICAgIH1cbiAgICB0aGlzLmlzU3BsaXRhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLm1vZGUgPSAnc2ltcGxlJztcbiAgICB0aGlzLmFkbWluUGF0aCA9IFwiL3NvbWUvcGF0aC90by9hZG1pblwiO1xuICAgIHRoaXMuY29tcG9uZW50cyA9IFtuZXcgQXBwQ29tcG9uZW50KCd3ZWInLCBjb21wb25lbnRLaW5kLCB0cnVlLCB0cnVlLCBob3N0SWQpLnNlcmlhbGl6ZSgpXTtcbiAgfVxuXG4gIFBsYXRmb3JtQ29tcG9uZW50LnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBraW5kOiB0aGlzLmtpbmQsXG4gICAgICBpc1NwbGl0YWJsZTogdGhpcy5pc1NwbGl0YWJsZSxcbiAgICAgIG1vZGU6IHRoaXMubW9kZSxcbiAgICAgIGNvbXBvbmVudHM6IHRoaXMuY29tcG9uZW50cyxcbiAgICAgIHN0YXR1czogJ29ubGluZSdcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBQbGF0Zm9ybUNvbXBvbmVudDtcblxufSkoKTtcblxuKHtcbiAgaWQ6IFwibG9nZ2VyMVwiLFxuICBraW5kOiBcIm1lc2hcIixcbiAgbW9kZTogXCJzaW1wbGVcIixcbiAgaXNTcGxpdGFibGU6IHRydWUsXG4gIGNvbXBvbmVudHM6IFtcbiAgICB7XG4gICAgICBpZDogXCI5ZTYzZDcwMC1jODRlLTQ1ZWQtYmExNS1lZDE5MmZjZjkyYjJcIixcbiAgICAgIHVpZDogXCJkYXRhLnBvcnRhbFwiLFxuICAgICAgbmFtZTogXCJsdWNreS1saW1lXCIsXG4gICAgICBzdGF0ZTogXCJjcmVhdGVkXCIsXG4gICAgICBzZXJ2aWNlVHlwZTogXCJkZWZhdWx0LWRiXCIsXG4gICAgICBzY2FsZXNIb3JpejogZmFsc2UsXG4gICAgICBzY2FsZXNSZWR1bmQ6IGZhbHNlLFxuICAgICAgaXNTcGxpdGFibGU6IHRydWUsXG4gICAgICBnZW5lcmF0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6IFwiZGF0YS5wb3J0YWwuZ2VuMVwiLFxuICAgICAgICAgIHN0YXRlOiBcImNyZWF0ZWRcIixcbiAgICAgICAgICBzdGF0dXM6IFwib25saW5lXCIsXG4gICAgICAgICAgaW5zdGFuY2VzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBob3N0SWQ6IFwidGVzdC1ob3N0LW5hbWVcIixcbiAgICAgICAgICAgICAgaG9zdE5hbWU6IFwidGVzdC1ob3N0LW5hbWVcIixcbiAgICAgICAgICAgICAgc3RhdGU6IFwiY3JlYXRlZFwiLFxuICAgICAgICAgICAgICBzdGF0dXM6IFwib25saW5lXCIsXG4gICAgICAgICAgICAgIHJvbGU6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICBzZXJ2ZXJTcGVjc0lkOiBcIjUxMm1iXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn0pO1xuIiwidmFyICRob2xkZXIsIENsb2JiZXJCb3hEYXRhU2hpbSwgVUksIGJveGVzO1xuXG5VSSA9IHJlcXVpcmUoJy4vdGVzdC11aS91aScpO1xuXG5DbG9iYmVyQm94RGF0YVNoaW0gPSByZXF1aXJlKCcuL3NoaW1zL2RhdGEtc2hpbScpO1xuXG53aW5kb3cuY2xvYmJlckJveERhdGFTaGltID0gbmV3IENsb2JiZXJCb3hEYXRhU2hpbSgpO1xuXG5ib3hlcyA9IFtdO1xuXG4kaG9sZGVyID0gJChcIi5ob2xkZXJcIik7XG5cbm5hbm9ib3gubm9EZXBsb3lzID0gZmFsc2U7XG5cbm5hbm9ib3guYXBwTmFtZSA9ICdmaXNoZmVhdGhlcic7XG5cbm5hbm9ib3guZnFBcHBOYW1lID0gJ2Zsb2NrL2Zpc2hmZWF0aGVyJztcblxud2luZG93LmluaXQgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhZGRFdmVudExpc3RlbmVycywgZ2V0Qm94LCBnZXRQYXJlbnRPZkNvbXBvbmVudCwgZ2V0UGFyZW50T2ZHZW5lcmF0aW9uLCByZW1vdmVCb3gsIHN1YnNjcmliZVRvUmVnaXN0cmF0aW9ucywgdWk7XG4gICAgc3RhdHNEYXRhU2ltdWx0b3IuY3JlYXRlRmFrZVN0YXREYXRhUHJvdmlkZXIoKTtcbiAgICB1aSA9IG5ldyBVSSgkKCdib2R5JykpO1xuICAgIHdpbmRvdy5hZGRHZW5lcmF0aW9uID0gZnVuY3Rpb24oY29tcG9uZW50SWQsIHN0YXRlKSB7XG4gICAgICB2YXIgZ2VuRGF0YTtcbiAgICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XG4gICAgICAgIHN0YXRlID0gJ3Byb3Zpc2lvbmluZyc7XG4gICAgICB9XG4gICAgICBnZW5EYXRhID0gY2xvYmJlckJveERhdGFTaGltLmdldEdlbmVyYXRpb24oY29tcG9uZW50SWQsIHN0YXRlKS5zZXJpYWxpemUoKTtcbiAgICAgIHJldHVybiBnZXRQYXJlbnRPZkNvbXBvbmVudChjb21wb25lbnRJZCkuYWRkR2VuZXJhdGlvbihjb21wb25lbnRJZCwgZ2VuRGF0YSk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24oaG9zdElkKSB7XG4gICAgICByZXR1cm4gZ2V0Qm94KGhvc3RJZCkuYWRkQ29tcG9uZW50KGNsb2JiZXJCb3hEYXRhU2hpbS5nZXRBcHBDb21wb25lbnQoKS5zZXJpYWxpemUoKSk7XG4gICAgfTtcbiAgICB3aW5kb3cucmVtb3ZlQ29tcG9uZW50ID0gZnVuY3Rpb24oY29tcG9uZW50SWQpIHtcbiAgICAgIHJldHVybiBnZXRQYXJlbnRPZkNvbXBvbmVudChjb21wb25lbnRJZCkucmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgICB9O1xuICAgIHdpbmRvdy5yZW1vdmVHZW5lcmF0aW9uID0gZnVuY3Rpb24oZ2VuZXJhdGlvbklkKSB7XG4gICAgICByZXR1cm4gZ2V0UGFyZW50T2ZHZW5lcmF0aW9uKGdlbmVyYXRpb25JZCkucmVtb3ZlR2VuZXJhdGlvbihnZW5lcmF0aW9uSWQpO1xuICAgIH07XG4gICAgd2luZG93LmFkZEhvc3QgPSBmdW5jdGlvbihsb3RzT2ZJY29ucykge1xuICAgICAgdmFyIGhvc3RCb3g7XG4gICAgICBob3N0Qm94ID0gbmV3IG5hbm9ib3guQ2xvYmJlckJveCgpO1xuICAgICAgaG9zdEJveC5idWlsZCgkaG9sZGVyLCBuYW5vYm94LkNsb2JiZXJCb3guSE9TVCwgY2xvYmJlckJveERhdGFTaGltLmdldEhvc3QobG90c09mSWNvbnMpLnNlcmlhbGl6ZSgpKTtcbiAgICAgIHJldHVybiB1aS5ub3RlQ29tcG9uZW50cyhob3N0Qm94KTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRDbHVzdGVyID0gZnVuY3Rpb24oY2x1c3RlckRhdGEpIHtcbiAgICAgIHZhciBjbHVzdGVyQm94LCBkYXRhLCBnZW5lcmF0aW9uLCBqLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgIHJlZiA9IGNsdXN0ZXJEYXRhLmdlbmVyYXRpb25zO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIGdlbmVyYXRpb24gPSByZWZbal07XG4gICAgICAgIGRhdGEgPSBuYW5vYm94LkNsb2JiZXJCb3guam9pbkNsdXN0ZXJEYXRhKGNsdXN0ZXJEYXRhLCBnZW5lcmF0aW9uKTtcbiAgICAgICAgY2x1c3RlckJveCA9IG5ldyBuYW5vYm94LkNsb2JiZXJCb3goKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNsdXN0ZXJCb3guYnVpbGQoJGhvbGRlciwgbmFub2JveC5DbG9iYmVyQm94LkNMVVNURVIsIGRhdGEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgd2luZG93LnNldFN0YXRlID0gZnVuY3Rpb24oaWQsIHN0YXRlKSB7XG4gICAgICByZXR1cm4gZ2V0Qm94KGlkKS5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB3aW5kb3cubWFuYWdlQ29tcG9uZW50ID0gZnVuY3Rpb24oY29tcG9uZW50SWQpIHtcbiAgICAgIHZhciBib3gsIGJveEhvc3QsIHg7XG4gICAgICBib3ggPSBnZXRCb3goY29tcG9uZW50SWQpO1xuICAgICAgaWYgKGJveCAhPSBudWxsKSB7XG4gICAgICAgIHggPSAwO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBib3hIb3N0ID0gZ2V0UGFyZW50T2ZDb21wb25lbnQoKTtcbiAgICAgIGlmIChib3hIb3N0ICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHggPSAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LnNldEdlbmVyYXRpb25TdGF0ZSA9IGZ1bmN0aW9uKGlkLCBzdGF0ZSkge1xuICAgICAgcmV0dXJuIGdldFBhcmVudE9mR2VuZXJhdGlvbihpZCkuc2V0R2VuZXJhdGlvblN0YXRlKGlkLCBzdGF0ZSk7XG4gICAgfTtcbiAgICB3aW5kb3cuc2V0R2VuZXJhdGlvblN0YXR1cyA9IGZ1bmN0aW9uKGlkLCBzdGF0dXMpIHtcbiAgICAgIHJldHVybiBnZXRQYXJlbnRPZkdlbmVyYXRpb24oaWQpLnNldEdlbmVyYXRpb25TdGF0dXMoaWQsIHN0YXR1cyk7XG4gICAgfTtcbiAgICBzdWJzY3JpYmVUb1JlZ2lzdHJhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NDQUxFLkdFVF9PUFRJT05TJywgZnVuY3Rpb24obSwgY2IpIHtcbiAgICAgICAgcmV0dXJuIGNiKHNjYWxlTWFjaGluZVRlc3REYXRhLmdldEhvc3RPcHRpb25zKCkpO1xuICAgICAgfSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdHRVRfQlVOS0hPVVNFUycsIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY2IoW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImFcIixcbiAgICAgICAgICAgIG5hbWU6IFwiRUMyIDFcIixcbiAgICAgICAgICAgIGN1cnJlbnQ6IHRydWUsXG4gICAgICAgICAgICBzdGF0ZTogJ2FjdGl2ZSdcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogXCJjXCIsXG4gICAgICAgICAgICBuYW1lOiBcIkVDMiAzXCIsXG4gICAgICAgICAgICBzdGF0ZTogXCJhY3RpdmVcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgICB9KTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1JFR0lTVEVSJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBib3gpIHtcbiAgICAgICAgICByZXR1cm4gYm94ZXMucHVzaChib3gpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnVU5SRUdJU1RFUicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgYm94KSB7XG4gICAgICAgICAgcmV0dXJuIHJlbW92ZUJveChib3gpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU0NBTEUuU0FWRScsIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOZXcgU2NhbGU6XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGEuc3VibWl0Q2IoKTtcbiAgICAgIH0pO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU1BMSVQuU0FWRScsIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTcGxpdDpcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YS5zdWJtaXRDYigpO1xuICAgICAgfSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdIT1NULlJVTi1BQ1RJT04nLCBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicnVubmluZyBob3N0IGFjdGlvbiBgXCIgKyBkYXRhLmFjdGlvbiArIFwiYCBvbiBob3N0IGBcIiArIGRhdGEuaG9zdElkICsgXCJgXCIpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChkYXRhLm9uQ29tcGxldGUsIE1hdGgucmFuZG9tKCkgKiAxMDAwKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFB1YlN1Yi5zdWJzY3JpYmUoJ0NPTVBPTkVOVC5SVU4tQUNUSU9OJywgZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcgY29tcG9uZW50IGFjdGlvbiBgXCIgKyBkYXRhLmFjdGlvbiArIFwiYCBvbiBjb21wb25lbnQgYFwiICsgZGF0YS5jb21wb25lbnRJZCArIFwiYFwiKTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZGF0YS5vbkNvbXBsZXRlLCBNYXRoLnJhbmRvbSgpICogMTAwMCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLkFQUF9DT01QT05FTlRTJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLnVyaSkuc3dpdGNoU3ViQ29udGVudCgnYXBwLWNvbXBvbmVudHMnLCBkYXRhLmVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuUExBVEZPUk1fQ09NUE9ORU5UUycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS51cmkpLnN3aXRjaFN1YkNvbnRlbnQoJ3BsYXRmb3JtLWNvbXBvbmVudHMnLCBkYXRhLmVsKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ1NIT1cuSE9TVC1JTlRBTkNFUycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS51cmkpLnN3aXRjaFN1YkNvbnRlbnQoJ2hvc3QtaW5zdGFuY2VzJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlNDQUxFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEJveChkYXRhLnVyaSkuc3dpdGNoU3ViQ29udGVudCgnc2NhbGUtbWFjaGluZScsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU0hPVy5TVEFUUycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS51cmkpLnN3aXRjaFN1YkNvbnRlbnQoJ3N0YXRzJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLkNPTlNPTEUnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Qm94KGRhdGEudXJpKS5zd2l0Y2hTdWJDb250ZW50KCdjb25zb2xlJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICBQdWJTdWIuc3Vic2NyaWJlKCdTSE9XLlRVTk5FTCcsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS51cmkpLnN3aXRjaFN1YkNvbnRlbnQoJ3R1bm5lbCcsIGRhdGEuZWwpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgUHViU3ViLnN1YnNjcmliZSgnU0hPVy5TUExJVCcsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS51cmkpLnN3aXRjaFN1YkNvbnRlbnQoJ3NwbGl0JywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICByZXR1cm4gUHViU3ViLnN1YnNjcmliZSgnU0hPVy5BRE1JTicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiBnZXRCb3goZGF0YS51cmkpLnN3aXRjaFN1YkNvbnRlbnQoJ2FkbWluJywgZGF0YS5lbCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcbiAgICBnZXRCb3ggPSBmdW5jdGlvbih1cmkpIHtcbiAgICAgIHZhciBib3gsIGosIGxlbjtcbiAgICAgIGZvciAoaiA9IDAsIGxlbiA9IGJveGVzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIGJveCA9IGJveGVzW2pdO1xuICAgICAgICBpZiAodXJpID09PSBib3gudXJpKSB7XG4gICAgICAgICAgcmV0dXJuIGJveDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZ2V0UGFyZW50T2ZDb21wb25lbnQgPSBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGJveCwgaiwgbGVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gYm94ZXMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgYm94ID0gYm94ZXNbal07XG4gICAgICAgIGlmIChib3guaGFzQ29tcG9uZW50V2l0aElkKGlkKSkge1xuICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGdldFBhcmVudE9mR2VuZXJhdGlvbiA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgYm94LCBqLCBsZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSBib3hlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBib3ggPSBib3hlc1tqXTtcbiAgICAgICAgaWYgKGJveC5oYXNHZW5lcmF0aW9uV2l0aElkKGlkKSkge1xuICAgICAgICAgIHJldHVybiBib3g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJlbW92ZUJveCA9IGZ1bmN0aW9uKGRvb21lZEJveCkge1xuICAgICAgdmFyIGJveCwgaSwgaiwgbGVuO1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IGJveGVzLmxlbmd0aDsgaiA8IGxlbjsgaSA9ICsraikge1xuICAgICAgICBib3ggPSBib3hlc1tpXTtcbiAgICAgICAgaWYgKGJveC5pZCA9PT0gZG9vbWVkQm94LmlkKSB7XG4gICAgICAgICAgYm94ZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgc3Vic2NyaWJlVG9SZWdpc3RyYXRpb25zKCk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBuYW5vYm94Lm5vRGVwbG95cyA9IHRydWU7XG4gICAgbmFub2JveC5jbG9iYmVyQ29uZmlnID0ge307XG4gICAgbmFub2JveC5jbG9iYmVyQ29uZmlnLmhvc3RBY3Rpb25zID0gW1xuICAgICAge1xuICAgICAgICBhY3Rpb246ICdkZWxldGUnLFxuICAgICAgICBwZXJtaXNzaW9uOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIGFjdGlvbjogJ3JlYm9vdCcsXG4gICAgICAgIHBlcm1pc3Npb246IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgYWN0aW9uOiAnc3RvcCcsXG4gICAgICAgIHBlcm1pc3Npb246IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgYWN0aW9uOiAnc3RhcnQnLFxuICAgICAgICBwZXJtaXNzaW9uOiB0cnVlXG4gICAgICB9XG4gICAgXTtcbiAgICBuYW5vYm94LmNsb2JiZXJDb25maWcuY29tcG9uZW50QWN0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgYWN0aW9uOiAncmVmcmVzaCcsXG4gICAgICAgIHBlcm1pc3Npb246IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgYWN0aW9uOiAncmVib290JyxcbiAgICAgICAgcGVybWlzc2lvbjogZmFsc2VcbiAgICAgIH0sIHtcbiAgICAgICAgYWN0aW9uOiAncmVidWlsZCcsXG4gICAgICAgIHBlcm1pc3Npb246IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgYWN0aW9uOiAndXBkYXRlJyxcbiAgICAgICAgcGVybWlzc2lvbjogdHJ1ZVxuICAgICAgfSwge1xuICAgICAgICBhY3Rpb246ICdtYW5hZ2UnLFxuICAgICAgICBwZXJtaXNzaW9uOiB0cnVlXG4gICAgICB9LCB7XG4gICAgICAgIGFjdGlvbjogJ2RlbGV0ZScsXG4gICAgICAgIHBlcm1pc3Npb246IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgYWN0aW9uOiAnc3RvcCcsXG4gICAgICAgIHBlcm1pc3Npb246IHRydWVcbiAgICAgIH0sIHtcbiAgICAgICAgYWN0aW9uOiAnc3RhcnQnLFxuICAgICAgICBwZXJtaXNzaW9uOiB0cnVlXG4gICAgICB9XG4gICAgXTtcbiAgICBhZGRIb3N0KGZhbHNlKTtcbiAgICBhZGRDbHVzdGVyKGNsb2JiZXJCb3hEYXRhU2hpbS5nZXRIb3JpekNsdXN0ZXIoKS5zZXJpYWxpemUoKSk7XG4gICAgYWRkQ2x1c3RlcihjbG9iYmVyQm94RGF0YVNoaW0uZ2V0RGF0YUNsdXN0ZXIoKS5zZXJpYWxpemUoKSk7XG4gICAgd2luZG93LnNldE5vRGVwbG95cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGdldEJveChcImhvc3QuMVwiKS5zZXRSZWFkaW5lc3NTdGF0ZSgnbm8tZGVwbG95cycsICduYngnKTtcbiAgICB9O1xuICAgIHdpbmRvdy5zZXRQbGF0Zm9ybUJ1aWxkaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0Qm94KFwiaG9zdC4xXCIpLnNldFJlYWRpbmVzc1N0YXRlKCdwbGF0Zm9ybS1idWlsZGluZycpO1xuICAgIH07XG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wb25lbnREYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0Qm94KFwiaG9zdC4xXCIpLmdldERhdGFGb3JVc2FnZUJyZWFrZG93bigpO1xuICAgIH07XG4gIH07XG59KSh0aGlzKTtcbiIsInZhciBVSTtcblxubW9kdWxlLmV4cG9ydHMgPSBVSSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVUkoKSB7XG4gICAgdGhpcy5pbml0U3RhdGVTZWxlY3RvcigkKFwiLnN0YXRlc1wiKSk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gICAgUHViU3ViLnN1YnNjcmliZSgnUkVHSVNURVInLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihtLCBib3gpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnJlZ2lzdGVyQm94KGJveCk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfVxuXG4gIFVJLnByb3RvdHlwZS5yZWdpc3RlckJveCA9IGZ1bmN0aW9uKGJveCkge1xuICAgIGlmIChib3guZGF0YS5pZC5pbmNsdWRlcygnZ2VuJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFRvU2VsZWN0b3IoJCgnLmdlbmVyYXRpb25zJywgJy51aS1zaGltJyksIGJveCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFRvU2VsZWN0b3IoJCgnLmhvc3RzJywgJy51aS1zaGltJyksIGJveCk7XG4gICAgfVxuICB9O1xuXG4gIFVJLnByb3RvdHlwZS5hZGRUb1NlbGVjdG9yID0gZnVuY3Rpb24oJHNlbGVjdG9yLCBib3gpIHtcbiAgICBpZiAoJChcIm9wdGlvblt2YWx1ZT0nXCIgKyBib3guZGF0YS5pZCArIFwiJ11cIiwgJHNlbGVjdG9yKS5sZW5ndGggIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuICRzZWxlY3Rvci5hcHBlbmQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIGJveC5kYXRhLmlkICsgXCInPlwiICsgYm94LmRhdGEuaWQgKyBcIjwvb3B0aW9uPlwiKTtcbiAgfTtcblxuICBVSS5wcm90b3R5cGUuaW5pdFN0YXRlU2VsZWN0b3IgPSBmdW5jdGlvbigkc2VsZWN0b3IpIHtcbiAgICB2YXIgaSwgbGVuLCByZXN1bHRzLCBzdGF0ZSwgc3RhdGVzO1xuICAgIHN0YXRlcyA9IFsnJywgJ2NyZWF0ZWQnLCAnaW5pdGlhbGl6ZWQnLCAnb3JkZXJlZCcsICdwcm92aXNpb25pbmcnLCAnZGVmdW5jdCcsICdhY3RpdmUnLCAnZGVjb21pc3Npb25pbmcnLCAnZGVzdHJveScsICdhcmNoaXZlZCddO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBzdGF0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHN0YXRlID0gc3RhdGVzW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKCRzZWxlY3Rvci5hcHBlbmQoXCI8b3B0aW9uIHZhbHVlPSdcIiArIHN0YXRlICsgXCInPlwiICsgc3RhdGUgKyBcIjwvb3B0aW9uPlwiKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIFVJLnByb3RvdHlwZS5pbml0RXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgJChcImJ1dHRvbiNob3N0c1wiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkLCBzdGF0ZTtcbiAgICAgICAgaWQgPSAkKFwic2VsZWN0I2hvc3RzLXN0YXRlLXNlbGVjdG9yXCIpLnZhbCgpO1xuICAgICAgICBzdGF0ZSA9ICQoXCJzZWxlY3QjaG9zdC1zdGF0ZXNcIikudmFsKCk7XG4gICAgICAgIHJldHVybiBzZXRTdGF0ZShpZCwgc3RhdGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgJChcImJ1dHRvbiNnZW5lcmF0aW9uc1wiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkLCBzdGF0ZTtcbiAgICAgICAgaWQgPSAkKFwic2VsZWN0I2dlbmVyYXRpb25zLXN0YXRlLXNlbGVjdG9yXCIpLnZhbCgpO1xuICAgICAgICBzdGF0ZSA9ICQoXCJzZWxlY3QjZ2VuLXN0YXRlc1wiKS52YWwoKTtcbiAgICAgICAgcmV0dXJuIHNldEdlbmVyYXRpb25TdGF0ZShpZCwgc3RhdGUpO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gICAgJChcImJ1dHRvbiNnZW4tc3RhdHVzLWdvXCIpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWQsIHN0YXR1cztcbiAgICAgICAgaWQgPSAkKFwic2VsZWN0I2dlbmVyYXRpb25zLXN0YXR1cy1zZWxlY3RvclwiKS52YWwoKTtcbiAgICAgICAgc3RhdHVzID0gJChcInNlbGVjdCNnZW4tc3RhdHVzXCIpLnZhbCgpO1xuICAgICAgICByZXR1cm4gc2V0R2VuZXJhdGlvblN0YXR1cyhpZCwgc3RhdHVzKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgICQoXCJidXR0b24jYWRkLWdlbmVyYXRpb25cIikub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhZGRHZW5lcmF0aW9uKCQoXCJzZWxlY3QjYWRkLWdlbmVyYXRpb24tc2VsZWN0XCIpLnZhbCgpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgICQoXCJidXR0b24jcmVtb3ZlLWdlbmVyYXRpb25cIikub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVHZW5lcmF0aW9uKCQoXCJzZWxlY3QjcmVtb3ZlLWdlbmVyYXRpb24tc2VsZWN0XCIpLnZhbCgpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgICQoXCJidXR0b24jYWRkLWNvbXBvbmVudFwiKS5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFkZENvbXBvbmVudCgkKFwic2VsZWN0I2FkZC1jb21wb25lbnQtc2VsZWN0XCIpLnZhbCgpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHJldHVybiAkKFwiYnV0dG9uI3JlbW92ZS1jb21wb25lbnRcIikub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVDb21wb25lbnQoJChcInNlbGVjdCNyZW1vdmUtY29tcG9uZW50LXNlbGVjdFwiKS52YWwoKSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfTtcblxuICBVSS5wcm90b3R5cGUubm90ZUNvbXBvbmVudHMgPSBmdW5jdGlvbihib3gpIHtcbiAgICB2YXIgJHNlbGVjdG9yLCBjb21wb25lbnQsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICAgICRzZWxlY3RvciA9ICQoXCJzZWxlY3QuY29tcG9uZW50c1wiKTtcbiAgICByZWYgPSBib3guZGF0YS5hcHBDb21wb25lbnRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbXBvbmVudCA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaCgkc2VsZWN0b3IuYXBwZW5kKFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyBjb21wb25lbnQuaWQgKyBcIic+XCIgKyBjb21wb25lbnQuaWQgKyBcIjwvb3B0aW9uPlwiKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIHJldHVybiBVSTtcblxufSkoKTtcbiJdfQ==

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "meta":{
    "title":"AWS",
    "serverTitle":"Server",
    "default":"a1",
    "totalPlans":37
  },
	"id": "us-east-1",
	"title": "US East (N. Virginia)",
	"plans": [{
		"id": "general_purpose",
		"meta":{"title": "General purpose"},
		"specs": [{
			"id": "m1.small",
			"RAM": 1740,
			"CPU": 0.25,
			"DISK": 30,
			"transfer": "unlimited",
			"dollarsPerHr": 0.04816666666666666,
			"dollarsPerMo": 34.68
		}, {
			"id": "m1.medium",
			"RAM": 3840,
			"CPU": 0.25,
			"DISK": 40,
			"transfer": "unlimited",
			"dollarsPerHr": 0.09255555555555554,
			"dollarsPerMo": 66.63999999999999
		}, {
			"id": "m1.large",
			"RAM": 7680,
			"CPU": 0.5,
			"DISK": 60,
			"transfer": "unlimited",
			"dollarsPerHr": 0.18333333333333332,
			"dollarsPerMo": 132.0
		}, {
			"id": "m1.xlarge",
			"RAM": 15360,
			"CPU": 1.0,
			"DISK": 150,
			"transfer": "unlimited",
			"dollarsPerHr": 0.3708333333333333,
			"dollarsPerMo": 267.0
		}, {
			"id": "t2.nano",
			"RAM": 512,
			"CPU": 0.25,
			"DISK": 20,
			"transfer": "unlimited",
			"dollarsPerHr": 0.008677777777777777,
			"dollarsPerMo": 6.248
		}, {
			"id": "t2.micro",
			"RAM": 1024,
			"CPU": 0.25,
			"DISK": 30,
			"transfer": "unlimited",
			"dollarsPerHr": 0.016166666666666666,
			"dollarsPerMo": 11.64
		}, {
			"id": "t2.small",
			"RAM": 2048,
			"CPU": 0.25,
			"DISK": 40,
			"transfer": "unlimited",
			"dollarsPerHr": 0.028555555555555556,
			"dollarsPerMo": 20.56
		}, {
			"id": "t2.medium",
			"RAM": 4096,
			"CPU": 0.5,
			"DISK": 60,
			"transfer": "unlimited",
			"dollarsPerHr": 0.05533333333333333,
			"dollarsPerMo": 39.84
		}, {
			"id": "t2.large",
			"RAM": 8192,
			"CPU": 0.5,
			"DISK": 80,
			"transfer": "unlimited",
			"dollarsPerHr": 0.10511111111111111,
			"dollarsPerMo": 75.68
		}, {
			"id": "t2.xlarge",
			"RAM": 16384,
			"CPU": 1.0,
			"DISK": 160,
			"transfer": "unlimited",
			"dollarsPerHr": 0.21022222222222223,
			"dollarsPerMo": 151.36
		}, {
			"id": "t2.2xlarge",
			"RAM": 32768,
			"CPU": 2.0,
			"DISK": 320,
			"transfer": "unlimited",
			"dollarsPerHr": 0.42044444444444445,
			"dollarsPerMo": 302.72
		}, {
			"id": "m4.large",
			"RAM": 8192,
			"CPU": 0.5,
			"DISK": 80,
			"transfer": "unlimited",
			"dollarsPerHr": 0.11911111111111111,
			"dollarsPerMo": 85.76
		}, {
			"id": "m4.xlarge",
			"RAM": 16384,
			"CPU": 1.0,
			"DISK": 160,
			"transfer": "unlimited",
			"dollarsPerHr": 0.23722222222222222,
			"dollarsPerMo": 170.8
		}, {
			"id": "m4.2xlarge",
			"RAM": 32768,
			"CPU": 2.0,
			"DISK": 320,
			"transfer": "unlimited",
			"dollarsPerHr": 0.47544444444444445,
			"dollarsPerMo": 342.32
		}, {
			"id": "m4.4xlarge",
			"RAM": 65536,
			"CPU": 4.0,
			"DISK": 640,
			"transfer": "unlimited",
			"dollarsPerHr": 0.9508888888888889,
			"dollarsPerMo": 684.64
		}, {
			"id": "m4.10xlarge",
			"RAM": 163840,
			"CPU": 10.0,
			"DISK": 1600,
			"transfer": "unlimited",
			"dollarsPerHr": 2.377222222222222,
			"dollarsPerMo": 1711.6
		}, {
			"id": "m4.16xlarge",
			"RAM": 262144,
			"CPU": 16.0,
			"DISK": 2560,
			"transfer": "unlimited",
			"dollarsPerHr": 3.8025555555555557,
			"dollarsPerMo": 2737.84
		}, {
			"id": "m3.medium",
			"RAM": 3840,
			"CPU": 0.25,
			"DISK": 40,
			"transfer": "unlimited",
			"dollarsPerHr": 0.07255555555555555,
			"dollarsPerMo": 52.24
		}, {
			"id": "m3.large",
			"RAM": 7680,
			"CPU": 0.5,
			"DISK": 60,
			"transfer": "unlimited",
			"dollarsPerHr": 0.14133333333333334,
			"dollarsPerMo": 101.76
		}, {
			"id": "m3.xlarge",
			"RAM": 15360,
			"CPU": 1.0,
			"DISK": 150,
			"transfer": "unlimited",
			"dollarsPerHr": 0.28683333333333333,
			"dollarsPerMo": 206.52
		}, {
			"id": "m3.2xlarge",
			"RAM": 30720,
			"CPU": 2.0,
			"DISK": 300,
			"transfer": "unlimited",
			"dollarsPerHr": 0.5736666666666667,
			"dollarsPerMo": 413.04
		}]
	}, {
		"id": "compute_optimized",
		"meta":{"title": "Compute optimized"},
		"specs": [{
			"id": "c1.medium",
			"RAM": 1740,
			"CPU": 0.5,
			"DISK": 30,
			"transfer": "unlimited",
			"dollarsPerHr": 0.13416666666666668,
			"dollarsPerMo": 96.60000000000001
		}, {
			"id": "c1.xlarge",
			"RAM": 7168,
			"CPU": 2.0,
			"DISK": 60,
			"transfer": "unlimited",
			"dollarsPerHr": 0.5283333333333333,
			"dollarsPerMo": 380.40000000000003
		}, {
			"id": "cc2.8xlarge",
			"RAM": 61952,
			"CPU": 8.0,
			"DISK": 600,
			"transfer": "unlimited",
			"dollarsPerHr": 2.0833333333333335,
			"dollarsPerMo": 1500.0
		}, {
			"id": "c4.large",
			"RAM": 3840,
			"CPU": 0.5,
			"DISK": 40,
			"transfer": "unlimited",
			"dollarsPerHr": 0.10555555555555556,
			"dollarsPerMo": 76.0
		}, {
			"id": "c4.xlarge",
			"RAM": 7680,
			"CPU": 1.0,
			"DISK": 60,
			"transfer": "unlimited",
			"dollarsPerHr": 0.20733333333333334,
			"dollarsPerMo": 149.28
		}, {
			"id": "c4.2xlarge",
			"RAM": 15360,
			"CPU": 2.0,
			"DISK": 150,
			"transfer": "unlimited",
			"dollarsPerHr": 0.41883333333333334,
			"dollarsPerMo": 301.56
		}, {
			"id": "c4.4xlarge",
			"RAM": 30720,
			"CPU": 4.0,
			"DISK": 300,
			"transfer": "unlimited",
			"dollarsPerHr": 0.8376666666666667,
			"dollarsPerMo": 603.12
		}, {
			"id": "c4.8xlarge",
			"RAM": 61440,
			"CPU": 9.0,
			"DISK": 600,
			"transfer": "unlimited",
			"dollarsPerHr": 1.6743333333333332,
			"dollarsPerMo": 1205.52
		}, {
			"id": "c3.large",
			"RAM": 3840,
			"CPU": 0.5,
			"DISK": 40,
			"transfer": "unlimited",
			"dollarsPerHr": 0.11055555555555555,
			"dollarsPerMo": 79.6
		}, {
			"id": "c3.xlarge",
			"RAM": 7680,
			"CPU": 1.0,
			"DISK": 60,
			"transfer": "unlimited",
			"dollarsPerHr": 0.21833333333333332,
			"dollarsPerMo": 157.2
		}, {
			"id": "c3.2xlarge",
			"RAM": 15360,
			"CPU": 2.0,
			"DISK": 150,
			"transfer": "unlimited",
			"dollarsPerHr": 0.4408333333333333,
			"dollarsPerMo": 317.4
		}, {
			"id": "c3.4xlarge",
			"RAM": 30720,
			"CPU": 4.0,
			"DISK": 300,
			"transfer": "unlimited",
			"dollarsPerHr": 0.8816666666666666,
			"dollarsPerMo": 634.8
		}, {
			"id": "c3.8xlarge",
			"RAM": 61440,
			"CPU": 8.0,
			"DISK": 600,
			"transfer": "unlimited",
			"dollarsPerHr": 1.7633333333333332,
			"dollarsPerMo": 1269.6
		}]
	}, {
		"id": "gpu_instances",
		"meta":{"title": "GPU instances"},
		"specs": [{
			"id": "cg1.4xlarge",
			"RAM": 23040,
			"CPU": 4.0,
			"DISK": 220,
			"transfer": "unlimited",
			"dollarsPerHr": 2.1305555555555555,
			"dollarsPerMo": 1534.0
		}]
	}, {
		"id": "memory_optimized",
		"meta":{"title": "Memory optimized"},
		"specs": [{
			"id": "m2.xlarge",
			"RAM": 17510,
			"CPU": 0.5,
			"DISK": 170,
			"transfer": "unlimited",
			"dollarsPerHr": 0.26861111111111113,
			"dollarsPerMo": 193.4
		}, {
			"id": "m2.2xlarge",
			"RAM": 35020,
			"CPU": 1.0,
			"DISK": 340,
			"transfer": "unlimited",
			"dollarsPerHr": 0.5372222222222223,
			"dollarsPerMo": 386.8
		}, {
			"id": "m2.4xlarge",
			"RAM": 70041,
			"CPU": 2.0,
			"DISK": 680,
			"transfer": "unlimited",
			"dollarsPerHr": 1.0744444444444445,
			"dollarsPerMo": 773.6
		}, {
			"id": "cr1.8xlarge",
			"RAM": 249856,
			"CPU": 8.0,
			"DISK": 2440,
			"transfer": "unlimited",
			"dollarsPerHr": 3.838888888888889,
			"dollarsPerMo": 2764.0
		}, {
			"id": "x1.16xlarge",
			"RAM": 999424,
			"CPU": 16.0,
			"DISK": 9760,
			"transfer": "unlimited",
			"dollarsPerHr": 8.024555555555555,
			"dollarsPerMo": 5777.679999999999
		}, {
			"id": "x1.32xlarge",
			"RAM": 1998848,
			"CPU": 32.0,
			"DISK": 19520,
			"transfer": "unlimited",
			"dollarsPerHr": 16.04911111111111,
			"dollarsPerMo": 11555.359999999999
		}, {
			"id": "r4.large",
			"RAM": 15616,
			"CPU": 0.5,
			"DISK": 150,
			"transfer": "unlimited",
			"dollarsPerHr": 0.15383333333333335,
			"dollarsPerMo": 110.76
		}, {
			"id": "r4.xlarge",
			"RAM": 31232,
			"CPU": 1.0,
			"DISK": 300,
			"transfer": "unlimited",
			"dollarsPerHr": 0.3076666666666667,
			"dollarsPerMo": 221.52
		}, {
			"id": "r4.2xlarge",
			"RAM": 62464,
			"CPU": 2.0,
			"DISK": 610,
			"transfer": "unlimited",
			"dollarsPerHr": 0.6167222222222223,
			"dollarsPerMo": 444.04
		}, {
			"id": "r4.4xlarge",
			"RAM": 124928,
			"CPU": 4.0,
			"DISK": 1220,
			"transfer": "unlimited",
			"dollarsPerHr": 1.2334444444444446,
			"dollarsPerMo": 888.08
		}, {
			"id": "r4.8xlarge",
			"RAM": 249856,
			"CPU": 8.0,
			"DISK": 2440,
			"transfer": "unlimited",
			"dollarsPerHr": 2.466888888888889,
			"dollarsPerMo": 1776.16
		}, {
			"id": "r4.16xlarge",
			"RAM": 499712,
			"CPU": 16.0,
			"DISK": 4880,
			"transfer": "unlimited",
			"dollarsPerHr": 4.933777777777778,
			"dollarsPerMo": 3552.32
		}, {
			"id": "r3.large",
			"RAM": 15616,
			"CPU": 0.5,
			"DISK": 150,
			"transfer": "unlimited",
			"dollarsPerHr": 0.18683333333333335,
			"dollarsPerMo": 134.52
		}, {
			"id": "r3.xlarge",
			"RAM": 31232,
			"CPU": 1.0,
			"DISK": 300,
			"transfer": "unlimited",
			"dollarsPerHr": 0.3746666666666667,
			"dollarsPerMo": 269.76
		}, {
			"id": "r3.2xlarge",
			"RAM": 62464,
			"CPU": 2.0,
			"DISK": 610,
			"transfer": "unlimited",
			"dollarsPerHr": 0.7497222222222223,
			"dollarsPerMo": 539.8
		}, {
			"id": "r3.4xlarge",
			"RAM": 124928,
			"CPU": 4.0,
			"DISK": 1220,
			"transfer": "unlimited",
			"dollarsPerHr": 1.4994444444444446,
			"dollarsPerMo": 1079.6
		}, {
			"id": "r3.8xlarge",
			"RAM": 249856,
			"CPU": 8.0,
			"DISK": 2440,
			"transfer": "unlimited",
			"dollarsPerHr": 2.998888888888889,
			"dollarsPerMo": 2159.2
		}]
	}, {
		"id": "storage_optimized",
		"meta":{"title": "Storage optimized"},
		"specs": [{
			"id": "hi1.4xlarge",
			"RAM": 61952,
			"CPU": 4.0,
			"DISK": 600,
			"transfer": "unlimited",
			"dollarsPerHr": 3.1833333333333336,
			"dollarsPerMo": 2292.0
		}, {
			"id": "hs1.8xlarge",
			"RAM": 119808,
			"CPU": 4.0,
			"DISK": 1170,
			"transfer": "unlimited",
			"dollarsPerHr": 4.762499999999999,
			"dollarsPerMo": 3428.9999999999995
		}, {
			"id": "i2.xlarge",
			"RAM": 31232,
			"CPU": 1.0,
			"DISK": 300,
			"transfer": "unlimited",
			"dollarsPerHr": 0.8946666666666666,
			"dollarsPerMo": 644.16
		}, {
			"id": "i2.2xlarge",
			"RAM": 62464,
			"CPU": 2.0,
			"DISK": 610,
			"transfer": "unlimited",
			"dollarsPerHr": 1.7897222222222222,
			"dollarsPerMo": 1288.6000000000001
		}, {
			"id": "i2.4xlarge",
			"RAM": 124928,
			"CPU": 4.0,
			"DISK": 1220,
			"transfer": "unlimited",
			"dollarsPerHr": 3.5794444444444444,
			"dollarsPerMo": 2577.2000000000003
		}, {
			"id": "i2.8xlarge",
			"RAM": 249856,
			"CPU": 8.0,
			"DISK": 2440,
			"transfer": "unlimited",
			"dollarsPerHr": 7.158888888888889,
			"dollarsPerMo": 5154.400000000001
		}, {
			"id": "d2.xlarge",
			"RAM": 31232,
			"CPU": 1.0,
			"DISK": 300,
			"transfer": "unlimited",
			"dollarsPerHr": 0.7316666666666666,
			"dollarsPerMo": 526.8
		}, {
			"id": "d2.2xlarge",
			"RAM": 62464,
			"CPU": 2.0,
			"DISK": 610,
			"transfer": "unlimited",
			"dollarsPerHr": 1.464722222222222,
			"dollarsPerMo": 1054.6
		}, {
			"id": "d2.4xlarge",
			"RAM": 124928,
			"CPU": 4.0,
			"DISK": 1220,
			"transfer": "unlimited",
			"dollarsPerHr": 2.929444444444444,
			"dollarsPerMo": 2109.2
		}, {
			"id": "d2.8xlarge",
			"RAM": 249856,
			"CPU": 9.0,
			"DISK": 2440,
			"transfer": "unlimited",
			"dollarsPerHr": 5.858888888888888,
			"dollarsPerMo": 4218.4
		}]
	}, {
		"id": "micro",
		"meta":{"title": "Micro"},
		"specs": [{
			"id": "t1.micro",
			"RAM": 627,
			"CPU": 0.25,
			"DISK": 20,
			"transfer": "unlimited",
			"dollarsPerHr": 0.02277777777777778,
			"dollarsPerMo": 16.4
		}]
	}, {
		"id": "accelerated_computing",
		"meta":{"title": "Accelerated computing"},
		"specs": [{
			"id": "p2.xlarge",
			"RAM": 62464,
			"CPU": 1.0,
			"DISK": 610,
			"transfer": "unlimited",
			"dollarsPerHr": 0.9847222222222223,
			"dollarsPerMo": 709.0
		}, {
			"id": "p2.8xlarge",
			"RAM": 499712,
			"CPU": 8.0,
			"DISK": 4880,
			"transfer": "unlimited",
			"dollarsPerHr": 7.877777777777778,
			"dollarsPerMo": 5672.0
		}, {
			"id": "p2.16xlarge",
			"RAM": 749568,
			"CPU": 16.0,
			"DISK": 7320,
			"transfer": "unlimited",
			"dollarsPerHr": 15.416666666666668,
			"dollarsPerMo": 11100.0
		}, {
			"id": "g2.2xlarge",
			"RAM": 15360,
			"CPU": 2.0,
			"DISK": 150,
			"transfer": "unlimited",
			"dollarsPerHr": 0.6708333333333334,
			"dollarsPerMo": 483.0
		}, {
			"id": "g2.8xlarge",
			"RAM": 61440,
			"CPU": 8.0,
			"DISK": 600,
			"transfer": "unlimited",
			"dollarsPerHr": 2.6833333333333336,
			"dollarsPerMo": 1932.0
		}]
	}]
}

},{}],2:[function(require,module,exports){
var ScaleDataShim,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = ScaleDataShim = (function() {
  function ScaleDataShim() {
    this.getHostOptions = bind(this.getHostOptions, this);
    this.getServiceSpecs = bind(this.getServiceSpecs, this);
    var providers;
    providers = ["AWS_NEW", "LINODE", "DIGITAL_OCEAN", "JOYENT"];
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
    var AWS_NEW;
    AWS_NEW = require('./aws.json');
    return this.providers = {
      AWS_NEW: AWS_NEW,
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
      DIGITAL_OCEAN_OLD: {
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
      DIGITAL_OCEAN: {
        meta: {
          title: "DigitalOcean",
          "default": "512mb",
          totalPlans: 14
        },
        plans: [
          {
            meta: {
              title: "Standard"
            },
            specs: [
              {
                id: "512mb",
                RAM: 512,
                CPU: 1,
                DISK: 20,
                transfer: 1,
                dollarsPerHr: 0.00744,
                dollarsPerMo: 5
              }, {
                id: "1gb",
                RAM: 1024,
                CPU: 1,
                DISK: 30,
                transfer: 2,
                dollarsPerHr: 0.01488,
                dollarsPerMo: 10
              }, {
                id: "2gb",
                RAM: 2048,
                CPU: 2,
                DISK: 40,
                transfer: 3,
                dollarsPerHr: 0.02976,
                dollarsPerMo: 20
              }, {
                id: "4gb",
                RAM: 4096,
                CPU: 2,
                DISK: 60,
                transfer: 4,
                dollarsPerHr: 0.05952,
                dollarsPerMo: 40
              }, {
                id: "8gb",
                RAM: 8192,
                CPU: 4,
                DISK: 80,
                transfer: 5,
                dollarsPerHr: 0.11905,
                dollarsPerMo: 80
              }, {
                id: "16gb",
                RAM: 16384,
                CPU: 8,
                DISK: 160,
                transfer: 6,
                dollarsPerHr: 0.2381,
                dollarsPerMo: 16
              }, {
                id: "32gb",
                RAM: 32768,
                CPU: 12,
                DISK: 320,
                transfer: 7,
                dollarsPerHr: 0.47619,
                dollarsPerMo: 32
              }, {
                id: "48gb",
                RAM: 49152,
                CPU: 16,
                DISK: 480,
                transfer: 8,
                dollarsPerHr: 0.71429,
                dollarsPerMo: 48
              }, {
                id: "64gb",
                RAM: 65536,
                CPU: 20,
                DISK: 640,
                transfer: 9,
                dollarsPerHr: 0.95238,
                dollarsPerMo: 640
              }
            ]
          }, {
            meta: {
              title: "High Memory"
            },
            specs: [
              {
                id: "m-16gb",
                RAM: 16384,
                CPU: 2,
                DISK: 30,
                transfer: 6,
                dollarsPerHr: 0.17857,
                dollarsPerMo: 12
              }, {
                id: "m-32gb",
                RAM: 32768,
                CPU: 4,
                DISK: 90,
                transfer: 7,
                dollarsPerHr: 0.35714,
                dollarsPerMo: 24
              }, {
                id: "m-64gb",
                RAM: 65536,
                CPU: 8,
                DISK: 200,
                transfer: 8,
                dollarsPerHr: 0.71429,
                dollarsPerMo: 48
              }, {
                id: "m-128gb",
                RAM: 131072,
                CPU: 16,
                DISK: 340,
                transfer: 9,
                dollarsPerHr: 1.42857,
                dollarsPerMo: 96
              }, {
                id: "m-224gb",
                RAM: 229376,
                CPU: 32,
                DISK: 500,
                transfer: 10,
                dollarsPerHr: 2.5,
                dollarsPerMo: 1680
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

},{"./aws.json":1}],3:[function(require,module,exports){
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
      isHorizontallyScalable: false,
      isCluster: false
    };
    window.app = new nanobox.ScaleMachine($(".holder"), config);
    return config2 = {
      activeServerId: {
        primary: scaleMachineTestData.getSampleScaleId(),
        secondary: scaleMachineTestData.getSampleScaleId(),
        arbiter: scaleMachineTestData.getSampleScaleId()
      },
      onSpecsChange: onSpecsChange,
      totalInstances: totalInstances,
      isHorizontallyScalable: true,
      isCluster: true
    };
  };
})(this);

},{"./shims/data-shim":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbXMvYXdzLmpzb24iLCJzaGltcy9kYXRhLXNoaW0uY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdDlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIm1ldGFcIjp7XG4gICAgXCJ0aXRsZVwiOlwiQVdTXCIsXG4gICAgXCJzZXJ2ZXJUaXRsZVwiOlwiU2VydmVyXCIsXG4gICAgXCJkZWZhdWx0XCI6XCJhMVwiLFxuICAgIFwidG90YWxQbGFuc1wiOjM3XG4gIH0sXG5cdFwiaWRcIjogXCJ1cy1lYXN0LTFcIixcblx0XCJ0aXRsZVwiOiBcIlVTIEVhc3QgKE4uIFZpcmdpbmlhKVwiLFxuXHRcInBsYW5zXCI6IFt7XG5cdFx0XCJpZFwiOiBcImdlbmVyYWxfcHVycG9zZVwiLFxuXHRcdFwibWV0YVwiOntcInRpdGxlXCI6IFwiR2VuZXJhbCBwdXJwb3NlXCJ9LFxuXHRcdFwic3BlY3NcIjogW3tcblx0XHRcdFwiaWRcIjogXCJtMS5zbWFsbFwiLFxuXHRcdFx0XCJSQU1cIjogMTc0MCxcblx0XHRcdFwiQ1BVXCI6IDAuMjUsXG5cdFx0XHRcIkRJU0tcIjogMzAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjA0ODE2NjY2NjY2NjY2NjY2LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMzQuNjhcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTEubWVkaXVtXCIsXG5cdFx0XHRcIlJBTVwiOiAzODQwLFxuXHRcdFx0XCJDUFVcIjogMC4yNSxcblx0XHRcdFwiRElTS1wiOiA0MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuMDkyNTU1NTU1NTU1NTU1NTQsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiA2Ni42Mzk5OTk5OTk5OTk5OVxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJtMS5sYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNzY4MCxcblx0XHRcdFwiQ1BVXCI6IDAuNSxcblx0XHRcdFwiRElTS1wiOiA2MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuMTgzMzMzMzMzMzMzMzMzMzIsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxMzIuMFxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJtMS54bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDE1MzYwLFxuXHRcdFx0XCJDUFVcIjogMS4wLFxuXHRcdFx0XCJESVNLXCI6IDE1MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuMzcwODMzMzMzMzMzMzMzMyxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDI2Ny4wXG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcInQyLm5hbm9cIixcblx0XHRcdFwiUkFNXCI6IDUxMixcblx0XHRcdFwiQ1BVXCI6IDAuMjUsXG5cdFx0XHRcIkRJU0tcIjogMjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjAwODY3Nzc3Nzc3Nzc3Nzc3Nyxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDYuMjQ4XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcInQyLm1pY3JvXCIsXG5cdFx0XHRcIlJBTVwiOiAxMDI0LFxuXHRcdFx0XCJDUFVcIjogMC4yNSxcblx0XHRcdFwiRElTS1wiOiAzMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuMDE2MTY2NjY2NjY2NjY2NjY2LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTEuNjRcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwidDIuc21hbGxcIixcblx0XHRcdFwiUkFNXCI6IDIwNDgsXG5cdFx0XHRcIkNQVVwiOiAwLjI1LFxuXHRcdFx0XCJESVNLXCI6IDQwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC4wMjg1NTU1NTU1NTU1NTU1NTYsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAyMC41NlxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJ0Mi5tZWRpdW1cIixcblx0XHRcdFwiUkFNXCI6IDQwOTYsXG5cdFx0XHRcIkNQVVwiOiAwLjUsXG5cdFx0XHRcIkRJU0tcIjogNjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjA1NTMzMzMzMzMzMzMzMzMzLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMzkuODRcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwidDIubGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDgxOTIsXG5cdFx0XHRcIkNQVVwiOiAwLjUsXG5cdFx0XHRcIkRJU0tcIjogODAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjEwNTExMTExMTExMTExMTExLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNzUuNjhcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwidDIueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxNjM4NCxcblx0XHRcdFwiQ1BVXCI6IDEuMCxcblx0XHRcdFwiRElTS1wiOiAxNjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjIxMDIyMjIyMjIyMjIyMjIzLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTUxLjM2XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcInQyLjJ4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDMyNzY4LFxuXHRcdFx0XCJDUFVcIjogMi4wLFxuXHRcdFx0XCJESVNLXCI6IDMyMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuNDIwNDQ0NDQ0NDQ0NDQ0NDUsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAzMDIuNzJcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTQubGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDgxOTIsXG5cdFx0XHRcIkNQVVwiOiAwLjUsXG5cdFx0XHRcIkRJU0tcIjogODAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjExOTExMTExMTExMTExMTExLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogODUuNzZcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTQueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxNjM4NCxcblx0XHRcdFwiQ1BVXCI6IDEuMCxcblx0XHRcdFwiRElTS1wiOiAxNjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjIzNzIyMjIyMjIyMjIyMjIyLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTcwLjhcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTQuMnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogMzI3NjgsXG5cdFx0XHRcIkNQVVwiOiAyLjAsXG5cdFx0XHRcIkRJU0tcIjogMzIwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC40NzU0NDQ0NDQ0NDQ0NDQ0NSxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDM0Mi4zMlxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJtNC40eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiA2NTUzNixcblx0XHRcdFwiQ1BVXCI6IDQuMCxcblx0XHRcdFwiRElTS1wiOiA2NDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjk1MDg4ODg4ODg4ODg4ODksXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiA2ODQuNjRcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTQuMTB4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDE2Mzg0MCxcblx0XHRcdFwiQ1BVXCI6IDEwLjAsXG5cdFx0XHRcIkRJU0tcIjogMTYwMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDIuMzc3MjIyMjIyMjIyMjIyLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTcxMS42XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcIm00LjE2eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAyNjIxNDQsXG5cdFx0XHRcIkNQVVwiOiAxNi4wLFxuXHRcdFx0XCJESVNLXCI6IDI1NjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAzLjgwMjU1NTU1NTU1NTU1NTcsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAyNzM3Ljg0XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcIm0zLm1lZGl1bVwiLFxuXHRcdFx0XCJSQU1cIjogMzg0MCxcblx0XHRcdFwiQ1BVXCI6IDAuMjUsXG5cdFx0XHRcIkRJU0tcIjogNDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjA3MjU1NTU1NTU1NTU1NTU1LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNTIuMjRcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTMubGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDc2ODAsXG5cdFx0XHRcIkNQVVwiOiAwLjUsXG5cdFx0XHRcIkRJU0tcIjogNjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjE0MTMzMzMzMzMzMzMzMzM0LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTAxLjc2XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcIm0zLnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogMTUzNjAsXG5cdFx0XHRcIkNQVVwiOiAxLjAsXG5cdFx0XHRcIkRJU0tcIjogMTUwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC4yODY4MzMzMzMzMzMzMzMzMyxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDIwNi41MlxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJtMy4yeGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAzMDcyMCxcblx0XHRcdFwiQ1BVXCI6IDIuMCxcblx0XHRcdFwiRElTS1wiOiAzMDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjU3MzY2NjY2NjY2NjY2NjcsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiA0MTMuMDRcblx0XHR9XVxuXHR9LCB7XG5cdFx0XCJpZFwiOiBcImNvbXB1dGVfb3B0aW1pemVkXCIsXG5cdFx0XCJtZXRhXCI6e1widGl0bGVcIjogXCJDb21wdXRlIG9wdGltaXplZFwifSxcblx0XHRcInNwZWNzXCI6IFt7XG5cdFx0XHRcImlkXCI6IFwiYzEubWVkaXVtXCIsXG5cdFx0XHRcIlJBTVwiOiAxNzQwLFxuXHRcdFx0XCJDUFVcIjogMC41LFxuXHRcdFx0XCJESVNLXCI6IDMwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC4xMzQxNjY2NjY2NjY2NjY2OCxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDk2LjYwMDAwMDAwMDAwMDAxXG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImMxLnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNzE2OCxcblx0XHRcdFwiQ1BVXCI6IDIuMCxcblx0XHRcdFwiRElTS1wiOiA2MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuNTI4MzMzMzMzMzMzMzMzMyxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDM4MC40MDAwMDAwMDAwMDAwM1xuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJjYzIuOHhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNjE5NTIsXG5cdFx0XHRcIkNQVVwiOiA4LjAsXG5cdFx0XHRcIkRJU0tcIjogNjAwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMi4wODMzMzMzMzMzMzMzMzM1LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTUwMC4wXG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImM0LmxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAzODQwLFxuXHRcdFx0XCJDUFVcIjogMC41LFxuXHRcdFx0XCJESVNLXCI6IDQwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC4xMDU1NTU1NTU1NTU1NTU1Nixcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDc2LjBcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwiYzQueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiA3NjgwLFxuXHRcdFx0XCJDUFVcIjogMS4wLFxuXHRcdFx0XCJESVNLXCI6IDYwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC4yMDczMzMzMzMzMzMzMzMzNCxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDE0OS4yOFxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJjNC4yeGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxNTM2MCxcblx0XHRcdFwiQ1BVXCI6IDIuMCxcblx0XHRcdFwiRElTS1wiOiAxNTAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjQxODgzMzMzMzMzMzMzMzM0LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMzAxLjU2XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImM0LjR4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDMwNzIwLFxuXHRcdFx0XCJDUFVcIjogNC4wLFxuXHRcdFx0XCJESVNLXCI6IDMwMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuODM3NjY2NjY2NjY2NjY2Nyxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDYwMy4xMlxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJjNC44eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiA2MTQ0MCxcblx0XHRcdFwiQ1BVXCI6IDkuMCxcblx0XHRcdFwiRElTS1wiOiA2MDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAxLjY3NDMzMzMzMzMzMzMzMzIsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxMjA1LjUyXG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImMzLmxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAzODQwLFxuXHRcdFx0XCJDUFVcIjogMC41LFxuXHRcdFx0XCJESVNLXCI6IDQwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC4xMTA1NTU1NTU1NTU1NTU1NSxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDc5LjZcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwiYzMueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiA3NjgwLFxuXHRcdFx0XCJDUFVcIjogMS4wLFxuXHRcdFx0XCJESVNLXCI6IDYwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC4yMTgzMzMzMzMzMzMzMzMzMixcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDE1Ny4yXG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImMzLjJ4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDE1MzYwLFxuXHRcdFx0XCJDUFVcIjogMi4wLFxuXHRcdFx0XCJESVNLXCI6IDE1MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuNDQwODMzMzMzMzMzMzMzMyxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDMxNy40XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImMzLjR4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDMwNzIwLFxuXHRcdFx0XCJDUFVcIjogNC4wLFxuXHRcdFx0XCJESVNLXCI6IDMwMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuODgxNjY2NjY2NjY2NjY2Nixcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDYzNC44XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImMzLjh4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDYxNDQwLFxuXHRcdFx0XCJDUFVcIjogOC4wLFxuXHRcdFx0XCJESVNLXCI6IDYwMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDEuNzYzMzMzMzMzMzMzMzMzMixcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDEyNjkuNlxuXHRcdH1dXG5cdH0sIHtcblx0XHRcImlkXCI6IFwiZ3B1X2luc3RhbmNlc1wiLFxuXHRcdFwibWV0YVwiOntcInRpdGxlXCI6IFwiR1BVIGluc3RhbmNlc1wifSxcblx0XHRcInNwZWNzXCI6IFt7XG5cdFx0XHRcImlkXCI6IFwiY2cxLjR4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDIzMDQwLFxuXHRcdFx0XCJDUFVcIjogNC4wLFxuXHRcdFx0XCJESVNLXCI6IDIyMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDIuMTMwNTU1NTU1NTU1NTU1NSxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDE1MzQuMFxuXHRcdH1dXG5cdH0sIHtcblx0XHRcImlkXCI6IFwibWVtb3J5X29wdGltaXplZFwiLFxuXHRcdFwibWV0YVwiOntcInRpdGxlXCI6IFwiTWVtb3J5IG9wdGltaXplZFwifSxcblx0XHRcInNwZWNzXCI6IFt7XG5cdFx0XHRcImlkXCI6IFwibTIueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxNzUxMCxcblx0XHRcdFwiQ1BVXCI6IDAuNSxcblx0XHRcdFwiRElTS1wiOiAxNzAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjI2ODYxMTExMTExMTExMTEzLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTkzLjRcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTIuMnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogMzUwMjAsXG5cdFx0XHRcIkNQVVwiOiAxLjAsXG5cdFx0XHRcIkRJU0tcIjogMzQwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC41MzcyMjIyMjIyMjIyMjIzLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMzg2Ljhcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwibTIuNHhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNzAwNDEsXG5cdFx0XHRcIkNQVVwiOiAyLjAsXG5cdFx0XHRcIkRJU0tcIjogNjgwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMS4wNzQ0NDQ0NDQ0NDQ0NDQ1LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNzczLjZcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwiY3IxLjh4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDI0OTg1Nixcblx0XHRcdFwiQ1BVXCI6IDguMCxcblx0XHRcdFwiRElTS1wiOiAyNDQwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMy44Mzg4ODg4ODg4ODg4ODksXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAyNzY0LjBcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwieDEuMTZ4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDk5OTQyNCxcblx0XHRcdFwiQ1BVXCI6IDE2LjAsXG5cdFx0XHRcIkRJU0tcIjogOTc2MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDguMDI0NTU1NTU1NTU1NTU1LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNTc3Ny42Nzk5OTk5OTk5OTlcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwieDEuMzJ4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDE5OTg4NDgsXG5cdFx0XHRcIkNQVVwiOiAzMi4wLFxuXHRcdFx0XCJESVNLXCI6IDE5NTIwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMTYuMDQ5MTExMTExMTExMTEsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxMTU1NS4zNTk5OTk5OTk5OTlcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjQubGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDE1NjE2LFxuXHRcdFx0XCJDUFVcIjogMC41LFxuXHRcdFx0XCJESVNLXCI6IDE1MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuMTUzODMzMzMzMzMzMzMzMzUsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxMTAuNzZcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjQueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAzMTIzMixcblx0XHRcdFwiQ1BVXCI6IDEuMCxcblx0XHRcdFwiRElTS1wiOiAzMDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjMwNzY2NjY2NjY2NjY2NjcsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAyMjEuNTJcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjQuMnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNjI0NjQsXG5cdFx0XHRcIkNQVVwiOiAyLjAsXG5cdFx0XHRcIkRJU0tcIjogNjEwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC42MTY3MjIyMjIyMjIyMjIzLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNDQ0LjA0XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcInI0LjR4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDEyNDkyOCxcblx0XHRcdFwiQ1BVXCI6IDQuMCxcblx0XHRcdFwiRElTS1wiOiAxMjIwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMS4yMzM0NDQ0NDQ0NDQ0NDQ2LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogODg4LjA4XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcInI0Ljh4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDI0OTg1Nixcblx0XHRcdFwiQ1BVXCI6IDguMCxcblx0XHRcdFwiRElTS1wiOiAyNDQwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMi40NjY4ODg4ODg4ODg4ODksXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxNzc2LjE2XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcInI0LjE2eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiA0OTk3MTIsXG5cdFx0XHRcIkNQVVwiOiAxNi4wLFxuXHRcdFx0XCJESVNLXCI6IDQ4ODAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiA0LjkzMzc3Nzc3Nzc3Nzc3OCxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDM1NTIuMzJcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjMubGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDE1NjE2LFxuXHRcdFx0XCJDUFVcIjogMC41LFxuXHRcdFx0XCJESVNLXCI6IDE1MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDAuMTg2ODMzMzMzMzMzMzMzMzUsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxMzQuNTJcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjMueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAzMTIzMixcblx0XHRcdFwiQ1BVXCI6IDEuMCxcblx0XHRcdFwiRElTS1wiOiAzMDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjM3NDY2NjY2NjY2NjY2NjcsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAyNjkuNzZcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjMuMnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNjI0NjQsXG5cdFx0XHRcIkNQVVwiOiAyLjAsXG5cdFx0XHRcIkRJU0tcIjogNjEwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC43NDk3MjIyMjIyMjIyMjIzLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNTM5Ljhcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjMuNHhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogMTI0OTI4LFxuXHRcdFx0XCJDUFVcIjogNC4wLFxuXHRcdFx0XCJESVNLXCI6IDEyMjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAxLjQ5OTQ0NDQ0NDQ0NDQ0NDYsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxMDc5LjZcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicjMuOHhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogMjQ5ODU2LFxuXHRcdFx0XCJDUFVcIjogOC4wLFxuXHRcdFx0XCJESVNLXCI6IDI0NDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAyLjk5ODg4ODg4ODg4ODg4OSxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDIxNTkuMlxuXHRcdH1dXG5cdH0sIHtcblx0XHRcImlkXCI6IFwic3RvcmFnZV9vcHRpbWl6ZWRcIixcblx0XHRcIm1ldGFcIjp7XCJ0aXRsZVwiOiBcIlN0b3JhZ2Ugb3B0aW1pemVkXCJ9LFxuXHRcdFwic3BlY3NcIjogW3tcblx0XHRcdFwiaWRcIjogXCJoaTEuNHhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNjE5NTIsXG5cdFx0XHRcIkNQVVwiOiA0LjAsXG5cdFx0XHRcIkRJU0tcIjogNjAwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMy4xODMzMzMzMzMzMzMzMzM2LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMjI5Mi4wXG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImhzMS44eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxMTk4MDgsXG5cdFx0XHRcIkNQVVwiOiA0LjAsXG5cdFx0XHRcIkRJU0tcIjogMTE3MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDQuNzYyNDk5OTk5OTk5OTk5LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMzQyOC45OTk5OTk5OTk5OTk1XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImkyLnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogMzEyMzIsXG5cdFx0XHRcIkNQVVwiOiAxLjAsXG5cdFx0XHRcIkRJU0tcIjogMzAwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC44OTQ2NjY2NjY2NjY2NjY2LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNjQ0LjE2XG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImkyLjJ4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDYyNDY0LFxuXHRcdFx0XCJDUFVcIjogMi4wLFxuXHRcdFx0XCJESVNLXCI6IDYxMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDEuNzg5NzIyMjIyMjIyMjIyMixcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDEyODguNjAwMDAwMDAwMDAwMVxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJpMi40eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxMjQ5MjgsXG5cdFx0XHRcIkNQVVwiOiA0LjAsXG5cdFx0XHRcIkRJU0tcIjogMTIyMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDMuNTc5NDQ0NDQ0NDQ0NDQ0NCxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDI1NzcuMjAwMDAwMDAwMDAwM1xuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJpMi44eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAyNDk4NTYsXG5cdFx0XHRcIkNQVVwiOiA4LjAsXG5cdFx0XHRcIkRJU0tcIjogMjQ0MCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDcuMTU4ODg4ODg4ODg4ODg5LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNTE1NC40MDAwMDAwMDAwMDFcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwiZDIueGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAzMTIzMixcblx0XHRcdFwiQ1BVXCI6IDEuMCxcblx0XHRcdFwiRElTS1wiOiAzMDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjczMTY2NjY2NjY2NjY2NjYsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiA1MjYuOFxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJkMi4yeGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiA2MjQ2NCxcblx0XHRcdFwiQ1BVXCI6IDIuMCxcblx0XHRcdFwiRElTS1wiOiA2MTAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAxLjQ2NDcyMjIyMjIyMjIyMixcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDEwNTQuNlxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJkMi40eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxMjQ5MjgsXG5cdFx0XHRcIkNQVVwiOiA0LjAsXG5cdFx0XHRcIkRJU0tcIjogMTIyMCxcblx0XHRcdFwidHJhbnNmZXJcIjogXCJ1bmxpbWl0ZWRcIixcblx0XHRcdFwiZG9sbGFyc1BlckhyXCI6IDIuOTI5NDQ0NDQ0NDQ0NDQ0LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMjEwOS4yXG5cdFx0fSwge1xuXHRcdFx0XCJpZFwiOiBcImQyLjh4bGFyZ2VcIixcblx0XHRcdFwiUkFNXCI6IDI0OTg1Nixcblx0XHRcdFwiQ1BVXCI6IDkuMCxcblx0XHRcdFwiRElTS1wiOiAyNDQwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogNS44NTg4ODg4ODg4ODg4ODgsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiA0MjE4LjRcblx0XHR9XVxuXHR9LCB7XG5cdFx0XCJpZFwiOiBcIm1pY3JvXCIsXG5cdFx0XCJtZXRhXCI6e1widGl0bGVcIjogXCJNaWNyb1wifSxcblx0XHRcInNwZWNzXCI6IFt7XG5cdFx0XHRcImlkXCI6IFwidDEubWljcm9cIixcblx0XHRcdFwiUkFNXCI6IDYyNyxcblx0XHRcdFwiQ1BVXCI6IDAuMjUsXG5cdFx0XHRcIkRJU0tcIjogMjAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjAyMjc3Nzc3Nzc3Nzc3Nzc4LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTYuNFxuXHRcdH1dXG5cdH0sIHtcblx0XHRcImlkXCI6IFwiYWNjZWxlcmF0ZWRfY29tcHV0aW5nXCIsXG5cdFx0XCJtZXRhXCI6e1widGl0bGVcIjogXCJBY2NlbGVyYXRlZCBjb21wdXRpbmdcIn0sXG5cdFx0XCJzcGVjc1wiOiBbe1xuXHRcdFx0XCJpZFwiOiBcInAyLnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNjI0NjQsXG5cdFx0XHRcIkNQVVwiOiAxLjAsXG5cdFx0XHRcIkRJU0tcIjogNjEwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMC45ODQ3MjIyMjIyMjIyMjIzLFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogNzA5LjBcblx0XHR9LCB7XG5cdFx0XHRcImlkXCI6IFwicDIuOHhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNDk5NzEyLFxuXHRcdFx0XCJDUFVcIjogOC4wLFxuXHRcdFx0XCJESVNLXCI6IDQ4ODAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiA3Ljg3Nzc3Nzc3Nzc3Nzc3OCxcblx0XHRcdFwiZG9sbGFyc1Blck1vXCI6IDU2NzIuMFxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJwMi4xNnhsYXJnZVwiLFxuXHRcdFx0XCJSQU1cIjogNzQ5NTY4LFxuXHRcdFx0XCJDUFVcIjogMTYuMCxcblx0XHRcdFwiRElTS1wiOiA3MzIwLFxuXHRcdFx0XCJ0cmFuc2ZlclwiOiBcInVubGltaXRlZFwiLFxuXHRcdFx0XCJkb2xsYXJzUGVySHJcIjogMTUuNDE2NjY2NjY2NjY2NjY4LFxuXHRcdFx0XCJkb2xsYXJzUGVyTW9cIjogMTExMDAuMFxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJnMi4yeGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiAxNTM2MCxcblx0XHRcdFwiQ1BVXCI6IDIuMCxcblx0XHRcdFwiRElTS1wiOiAxNTAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAwLjY3MDgzMzMzMzMzMzMzMzQsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiA0ODMuMFxuXHRcdH0sIHtcblx0XHRcdFwiaWRcIjogXCJnMi44eGxhcmdlXCIsXG5cdFx0XHRcIlJBTVwiOiA2MTQ0MCxcblx0XHRcdFwiQ1BVXCI6IDguMCxcblx0XHRcdFwiRElTS1wiOiA2MDAsXG5cdFx0XHRcInRyYW5zZmVyXCI6IFwidW5saW1pdGVkXCIsXG5cdFx0XHRcImRvbGxhcnNQZXJIclwiOiAyLjY4MzMzMzMzMzMzMzMzMzYsXG5cdFx0XHRcImRvbGxhcnNQZXJNb1wiOiAxOTMyLjBcblx0XHR9XVxuXHR9XVxufVxuIiwidmFyIFNjYWxlRGF0YVNoaW0sXG4gIGJpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNjYWxlRGF0YVNoaW0gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFNjYWxlRGF0YVNoaW0oKSB7XG4gICAgdGhpcy5nZXRIb3N0T3B0aW9ucyA9IGJpbmQodGhpcy5nZXRIb3N0T3B0aW9ucywgdGhpcyk7XG4gICAgdGhpcy5nZXRTZXJ2aWNlU3BlY3MgPSBiaW5kKHRoaXMuZ2V0U2VydmljZVNwZWNzLCB0aGlzKTtcbiAgICB2YXIgcHJvdmlkZXJzO1xuICAgIHByb3ZpZGVycyA9IFtcIkFXU19ORVdcIiwgXCJMSU5PREVcIiwgXCJESUdJVEFMX09DRUFOXCIsIFwiSk9ZRU5UXCJdO1xuICAgIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcnNbMl07XG4gICAgdGhpcy5jcmVhdGVIYXNoKCk7XG4gIH1cblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRTYW1wbGVTY2FsZUlkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJhbmRvbUluZGV4O1xuICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcih0aGlzLnByb3ZpZGVyc1t0aGlzLnByb3ZpZGVyXS5wbGFuc1swXS5zcGVjcy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKTtcbiAgICByZXR1cm4gdGhpcy5wcm92aWRlcnNbdGhpcy5wcm92aWRlcl0ucGxhbnNbMF0uc3BlY3NbcmFuZG9tSW5kZXhdLmlkO1xuICB9O1xuXG4gIFNjYWxlRGF0YVNoaW0ucHJvdG90eXBlLmdldFNlcnZpY2VTcGVjcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmZvO1xuICAgIGluZm8gPSB0aGlzLmdldEN1cnJlbnRTcGVjcygpO1xuICAgIGluZm8uaG9zdCA9IHRoaXMucHJvdmlkZXI7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgZGF0YTogaW5mb1xuICAgIH0pKTtcbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRIb3N0T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3ZpZGVyc1t0aGlzLnByb3ZpZGVyXTtcbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5nZXRDdXJyZW50U3BlY3MgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGljdCwgaSwgaiwgbGVuLCBsZW4xLCBwbGFuLCByZWYsIHJlZjEsIHNwZWM7XG4gICAgZGljdCA9IHtcbiAgICAgIExJTk9ERTogJ2EnLFxuICAgICAgRElHSVRBTF9PQ0VBTjogJ2InLFxuICAgICAgSk9ZRU5UOiAnYycsXG4gICAgICBBV1M6ICdkJ1xuICAgIH07XG4gICAgdGhpcy5zcGVjSWQgPSBkaWN0W3RoaXMucHJvdmlkZXJdICsgXCIyXCI7XG4gICAgcmVmID0gdGhpcy5wcm92aWRlcnNbdGhpcy5wcm92aWRlcl0ucGxhbnM7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwbGFuID0gcmVmW2ldO1xuICAgICAgcmVmMSA9IHBsYW4uc3BlY3M7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmMS5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgc3BlYyA9IHJlZjFbal07XG4gICAgICAgIGlmIChzcGVjLmlkID09PSB0aGlzLnNwZWNJZCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByYW06IHNwZWMuUkFNLFxuICAgICAgICAgICAgY3B1OiBzcGVjLkNQVSxcbiAgICAgICAgICAgIGRpc2s6IHNwZWMuRElTSyxcbiAgICAgICAgICAgIGlkOiBzcGVjLmlkXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBTY2FsZURhdGFTaGltLnByb3RvdHlwZS5jcmVhdGVIYXNoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIEFXU19ORVc7XG4gICAgQVdTX05FVyA9IHJlcXVpcmUoJy4vYXdzLmpzb24nKTtcbiAgICByZXR1cm4gdGhpcy5wcm92aWRlcnMgPSB7XG4gICAgICBBV1NfTkVXOiBBV1NfTkVXLFxuICAgICAgTElOT0RFOiB7XG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICB0aXRsZTogXCJMaW5vZGVcIixcbiAgICAgICAgICBzZXJ2ZXJUaXRsZTogXCJTZXJ2ZXJcIixcbiAgICAgICAgICBcImRlZmF1bHRcIjogXCJhMVwiLFxuICAgICAgICAgIHRvdGFsUGxhbnM6IDRcbiAgICAgICAgfSxcbiAgICAgICAgcGxhbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIlN0YW5kYXJkIENvbmZpZ3VyYXRpb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMjQsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYTJcIixcbiAgICAgICAgICAgICAgICBSQU06IDIwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDQ4LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImEzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA5NixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJhNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogODAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDYsXG4gICAgICAgICAgICAgICAgRElTSzogMTkyLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIERJR0lUQUxfT0NFQU5fT0xEOiB7XG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICB0aXRsZTogXCJEaWdpdGFsIE9jZWFuXCIsXG4gICAgICAgICAgc2VydmVyVGl0bGU6IFwiRHJvcGxldFwiLFxuICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImIxXCIsXG4gICAgICAgICAgdG90YWxQbGFuczogOVxuICAgICAgICB9LFxuICAgICAgICBwbGFuczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhbmRhcmRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNTEyLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiAyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTAyNCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMzAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjNcIixcbiAgICAgICAgICAgICAgICBSQU06IDIwNDgsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImI0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0MDk2LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogODE5MixcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIFZvbHVtZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImI2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNjM4NCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImI3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMjc2OCxcbiAgICAgICAgICAgICAgICBDUFU6IDEyLFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJiOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogNDkxNTIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiA0ODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYjlcIixcbiAgICAgICAgICAgICAgICBSQU06IDY1NTM2LFxuICAgICAgICAgICAgICAgIENQVTogMjAsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIERJR0lUQUxfT0NFQU46IHtcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIHRpdGxlOiBcIkRpZ2l0YWxPY2VhblwiLFxuICAgICAgICAgIFwiZGVmYXVsdFwiOiBcIjUxMm1iXCIsXG4gICAgICAgICAgdG90YWxQbGFuczogMTRcbiAgICAgICAgfSxcbiAgICAgICAgcGxhbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIlN0YW5kYXJkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiNTEybWJcIixcbiAgICAgICAgICAgICAgICBSQU06IDUxMixcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMjAsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjAwNzQ0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogNVxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiMWdiXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMDI0LFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiAzMCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMDE0ODgsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiMmdiXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyMDQ4LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA0MCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMDI5NzYsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAyMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiNGdiXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA0MDk2LFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2MCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogNCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMDU5NTIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiA0MFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiOGdiXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA4MTkyLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4MCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogNSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMTE5MDUsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiA4MFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiMTZnYlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYzODQsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogNixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMjM4MSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDE2XG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCIzMmdiXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMjc2OCxcbiAgICAgICAgICAgICAgICBDUFU6IDEyLFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogNyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuNDc2MTksXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAzMlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiNDhnYlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNDkxNTIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiA0ODAsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDgsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjcxNDI5LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogNDhcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIjY0Z2JcIixcbiAgICAgICAgICAgICAgICBSQU06IDY1NTM2LFxuICAgICAgICAgICAgICAgIENQVTogMjAsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiA5LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC45NTIzOCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDY0MFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIE1lbW9yeVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BlY3M6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIm0tMTZnYlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTYzODQsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDMwLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiA2LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xNzg1NyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEyXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJtLTMyZ2JcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyNzY4LFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA5MCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogNyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMzU3MTQsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAyNFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwibS02NGdiXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2NTUzNixcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMjAwLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiA4LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC43MTQyOSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDQ4XG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJtLTEyOGdiXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMzEwNzIsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiAzNDAsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDksXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAxLjQyODU3LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogOTZcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcIm0tMjI0Z2JcIixcbiAgICAgICAgICAgICAgICBSQU06IDIyOTM3NixcbiAgICAgICAgICAgICAgICBDUFU6IDMyLFxuICAgICAgICAgICAgICAgIERJU0s6IDUwMCxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMTAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAyLjUsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxNjgwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBKT1lFTlQ6IHtcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIHRpdGxlOiBcIkpveWVudFwiLFxuICAgICAgICAgIHNlcnZlclRpdGxlOiBcInNlcnZlclwiLFxuICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImMxXCIsXG4gICAgICAgICAgdG90YWxQbGFuczogMjRcbiAgICAgICAgfSxcbiAgICAgICAgcGxhbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIlN0YW5kYXJkXCIsXG4gICAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBcImMxXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzFcIixcbiAgICAgICAgICAgICAgICBSQU06IDEwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAwLjI1LFxuICAgICAgICAgICAgICAgIERJU0s6IDMzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNzUwLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiA1NixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMjAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogNjYsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzRcIixcbiAgICAgICAgICAgICAgICBSQU06IDM3NTAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxLFxuICAgICAgICAgICAgICAgIERJU0s6IDEyMyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjNVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogMTMxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImM2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA3MzgsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzdcIixcbiAgICAgICAgICAgICAgICBSQU06IDgwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IDc4OSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IDE0NjcsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzlcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNTc1LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTcwMDAuMTMsXG4gICAgICAgICAgICAgICAgQ1BVOiA1LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2ODMsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzExXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTY4MyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTJcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjgzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxM1wiLFxuICAgICAgICAgICAgICAgIFJBTTogNDAwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxMCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjgzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBNZW1vcnlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMTRcIixcbiAgICAgICAgICAgICAgICBSQU06IDE3MDAwLjEzLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA0MjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzNDAwMC4yNSxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODQzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjgwMDAuMzgsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDExMjIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNDQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxOCxcbiAgICAgICAgICAgICAgICBESVNLOiAyMzYzLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMxOFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjU2MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNDIwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkhpZ2ggQ1BVXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzE5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNzUwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA3NSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjBcIixcbiAgICAgICAgICAgICAgICBSQU06IDcwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA3LFxuICAgICAgICAgICAgICAgIERJU0s6IDI2MyxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjFcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogNjAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImMyMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyNCxcbiAgICAgICAgICAgICAgICBESVNLOiA5MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzIzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMjAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDMyLFxuICAgICAgICAgICAgICAgIERJU0s6IDEyMDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJIaWdoIElPXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzI0XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2NTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTQ1MixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjVcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyODAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IDMwNzIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzI2XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNTYwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzMixcbiAgICAgICAgICAgICAgICBESVNLOiA2MTQ0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBTdG9yYWdlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiYzI3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMjAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogNzY4MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjhcIixcbiAgICAgICAgICAgICAgICBSQU06IDY0MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNixcbiAgICAgICAgICAgICAgICBESVNLOiAxNTM2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJjMjlcIixcbiAgICAgICAgICAgICAgICBSQU06IDEyODAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogMzA3MjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgQVdTOiB7XG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBzZXJ2ZXJUaXRsZTogXCJFQzJcIixcbiAgICAgICAgICB0aXRsZTogXCJBV1NcIixcbiAgICAgICAgICBcImRlZmF1bHRcIjogXCJkMVwiLFxuICAgICAgICAgIHRvdGFsUGxhbnM6IDM4XG4gICAgICAgIH0sXG4gICAgICAgIHBsYW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgICB0aXRsZTogXCJHZW5lcmFsIFB1cnBvc2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDEsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDNcIixcbiAgICAgICAgICAgICAgICBSQU06IDQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogODAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ1XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA4MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDZcIixcbiAgICAgICAgICAgICAgICBSQU06IDE2MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDdcIixcbiAgICAgICAgICAgICAgICBSQU06IDMyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDhcIixcbiAgICAgICAgICAgICAgICBSQU06IDY0MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQ5XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNjAwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0MCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDEwXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzNzUwLFxuICAgICAgICAgICAgICAgIENQVTogMSxcbiAgICAgICAgICAgICAgICBESVNLOiA0LFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxMVwiLFxuICAgICAgICAgICAgICAgIFJBTTogNTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogNjQsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDEyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxNTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDEzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMTYwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiQ29tcHV0ZSBPcHRpbWl6ZWRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTRcIixcbiAgICAgICAgICAgICAgICBSQU06IDM3NTAsXG4gICAgICAgICAgICAgICAgQ1BVOiAyLFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTVcIixcbiAgICAgICAgICAgICAgICBSQU06IDUwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA0LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMTZcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiBcIkVCUyBPbmx5XCIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDE3XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IFwiRUJTIE9ubHlcIixcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMThcIixcbiAgICAgICAgICAgICAgICBSQU06IDYwMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMzYsXG4gICAgICAgICAgICAgICAgRElTSzogXCJFQlMgT25seVwiLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQxOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMzc1MCxcbiAgICAgICAgICAgICAgICBDUFU6IDIsXG4gICAgICAgICAgICAgICAgRElTSzogMzIsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDIwXCIsXG4gICAgICAgICAgICAgICAgUkFNOiA1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA4MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjFcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDIyXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzMDAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDE2LFxuICAgICAgICAgICAgICAgIERJU0s6IDMyMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjNcIixcbiAgICAgICAgICAgICAgICBSQU06IDYwMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBHUFVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjRcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogOCxcbiAgICAgICAgICAgICAgICBESVNLOiA2MCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjVcIixcbiAgICAgICAgICAgICAgICBSQU06IDYwMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogMjQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBSQU1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNwZWNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjZcIixcbiAgICAgICAgICAgICAgICBSQU06IDE1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMixcbiAgICAgICAgICAgICAgICBESVNLOiA2NCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMjdcIixcbiAgICAgICAgICAgICAgICBSQU06IDM1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiAxNjAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDI4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiA2MTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDgsXG4gICAgICAgICAgICAgICAgRElTSzogMzIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQyOVwiLFxuICAgICAgICAgICAgICAgIFJBTTogMTIyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogMzIwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzMFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjQ0MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiSGlnaCBTdG9yYWdlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDMxXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAzNTAwMCxcbiAgICAgICAgICAgICAgICBDUFU6IDQsXG4gICAgICAgICAgICAgICAgRElTSzogODAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzMlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjEwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDE2MDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDMzXCIsXG4gICAgICAgICAgICAgICAgUkFNOiAxMjIwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAxNixcbiAgICAgICAgICAgICAgICBESVNLOiAzMjAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzNFwiLFxuICAgICAgICAgICAgICAgIFJBTTogMjQ0MDAwLFxuICAgICAgICAgICAgICAgIENQVTogMzIsXG4gICAgICAgICAgICAgICAgRElTSzogNjQwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogXCJkMzVcIixcbiAgICAgICAgICAgICAgICBSQU06IDM1MDAwLFxuICAgICAgICAgICAgICAgIENQVTogNCxcbiAgICAgICAgICAgICAgICBESVNLOiA2MDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzNlwiLFxuICAgICAgICAgICAgICAgIFJBTTogNjEwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiA4LFxuICAgICAgICAgICAgICAgIERJU0s6IDEyMDAwLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJIcjogMC4xLFxuICAgICAgICAgICAgICAgIHRyYW5zZmVyOiAxLFxuICAgICAgICAgICAgICAgIGRvbGxhcnNQZXJNbzogMTBcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiBcImQzN1wiLFxuICAgICAgICAgICAgICAgIFJBTTogMTIyMDAwLFxuICAgICAgICAgICAgICAgIENQVTogMTYsXG4gICAgICAgICAgICAgICAgRElTSzogMjQwMDAsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1BlckhyOiAwLjEsXG4gICAgICAgICAgICAgICAgdHJhbnNmZXI6IDEsXG4gICAgICAgICAgICAgICAgZG9sbGFyc1Blck1vOiAxMFxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZDM4XCIsXG4gICAgICAgICAgICAgICAgUkFNOiAyNDQwMDAsXG4gICAgICAgICAgICAgICAgQ1BVOiAzNixcbiAgICAgICAgICAgICAgICBESVNLOiA0ODAwMCxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVySHI6IDAuMSxcbiAgICAgICAgICAgICAgICB0cmFuc2ZlcjogMSxcbiAgICAgICAgICAgICAgICBkb2xsYXJzUGVyTW86IDEwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBTY2FsZURhdGFTaGltO1xuXG59KSgpO1xuIiwidmFyIFNjYWxlTWFjaGluZURhdGFTaGltO1xuXG5TY2FsZU1hY2hpbmVEYXRhU2hpbSA9IHJlcXVpcmUoJy4vc2hpbXMvZGF0YS1zaGltJyk7XG5cbndpbmRvdy5zY2FsZU1hY2hpbmVUZXN0RGF0YSA9IG5ldyBTY2FsZU1hY2hpbmVEYXRhU2hpbSgpO1xuXG5QdWJTdWIuc3Vic2NyaWJlKCdTQ0FMRS5HRVRfT1BUSU9OUycsIGZ1bmN0aW9uKG0sIGNiKSB7XG4gIHJldHVybiBjYihzY2FsZU1hY2hpbmVUZXN0RGF0YS5nZXRIb3N0T3B0aW9ucygpKTtcbn0pO1xuXG53aW5kb3cuaW5pdCA9IChmdW5jdGlvbihfdGhpcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbmZpZywgY29uZmlnMiwgb25TcGVjc0NoYW5nZSwgdG90YWxJbnN0YW5jZXM7XG4gICAgb25TcGVjc0NoYW5nZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHVzZXIgaGFzIHNlbGVjdGVkIDpcIik7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coZGF0YSk7XG4gICAgfTtcbiAgICB0b3RhbEluc3RhbmNlcyA9IDU7XG4gICAgY29uZmlnID0ge1xuICAgICAgYWN0aXZlU2VydmVySWQ6IHtcbiAgICAgICAgcHJpbWFyeTogc2NhbGVNYWNoaW5lVGVzdERhdGEuZ2V0U2FtcGxlU2NhbGVJZCgpXG4gICAgICB9LFxuICAgICAgb25TcGVjc0NoYW5nZTogb25TcGVjc0NoYW5nZSxcbiAgICAgIHRvdGFsSW5zdGFuY2VzOiB0b3RhbEluc3RhbmNlcyxcbiAgICAgIGlzSG9yaXpvbnRhbGx5U2NhbGFibGU6IGZhbHNlLFxuICAgICAgaXNDbHVzdGVyOiBmYWxzZVxuICAgIH07XG4gICAgd2luZG93LmFwcCA9IG5ldyBuYW5vYm94LlNjYWxlTWFjaGluZSgkKFwiLmhvbGRlclwiKSwgY29uZmlnKTtcbiAgICByZXR1cm4gY29uZmlnMiA9IHtcbiAgICAgIGFjdGl2ZVNlcnZlcklkOiB7XG4gICAgICAgIHByaW1hcnk6IHNjYWxlTWFjaGluZVRlc3REYXRhLmdldFNhbXBsZVNjYWxlSWQoKSxcbiAgICAgICAgc2Vjb25kYXJ5OiBzY2FsZU1hY2hpbmVUZXN0RGF0YS5nZXRTYW1wbGVTY2FsZUlkKCksXG4gICAgICAgIGFyYml0ZXI6IHNjYWxlTWFjaGluZVRlc3REYXRhLmdldFNhbXBsZVNjYWxlSWQoKVxuICAgICAgfSxcbiAgICAgIG9uU3BlY3NDaGFuZ2U6IG9uU3BlY3NDaGFuZ2UsXG4gICAgICB0b3RhbEluc3RhbmNlczogdG90YWxJbnN0YW5jZXMsXG4gICAgICBpc0hvcml6b250YWxseVNjYWxhYmxlOiB0cnVlLFxuICAgICAgaXNDbHVzdGVyOiB0cnVlXG4gICAgfTtcbiAgfTtcbn0pKHRoaXMpO1xuIl19
