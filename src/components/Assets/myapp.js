import shaka from 'shaka-player';

var manifestUri =
    'https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd';
var licenseServer = 'https://cwip-shaka-proxy.appspot.com/param_auth';

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}
function MyManifestParser() {
  this.curId_ = 0;
  this.config_ = null;
}

MyManifestParser.prototype.configure = function(config) {
  this.config_ = config;
};

MyManifestParser.prototype.start = function(uri, playerInterface) {
  var type = shaka.net.NetworkingEngine.RequestType.MANIFEST;
  console.log(type);
  var request = {
    uris: [uri],
    method: 'GET',
    retryParameters: this.config_.retryParameters
  };
  return playerInterface.networkingEngine.request(type, request).promise
    .then(function(response) {
      return this.loadManifest_(response.data);
    });
};

MyManifestParser.prototype.stop = function() {
  return Promise.resolve();
};


shaka.media.ManifestParser.registerParserByExtension('json', MyManifestParser);
shaka.media.ManifestParser.registerParserByMime(
    'application/json', MyManifestParser);

function initPlayer() {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);
  player.configure({
    drm: {
      servers: {
        'com.widevine.alpha': licenseServer,
      }
    }
  });
  player.getNetworkingEngine().registerRequestFilter(function(type, request) {
    console.log(request);
    // Only add headers to license requests:
    if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
      // This is the specific parameter name and value the server wants:
      // Note that all network requests can have multiple URIs (for fallback),
      // and therefore this is an array. But there should only be one license
      // server URI in this tutorial.
      request.uris[0] += '?CWIP-Auth-Param=VGhpc0lzQVRlc3QK';
    }
  });
  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);
  player.getConfiguration();
  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);