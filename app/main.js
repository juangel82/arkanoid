/*global require*/
require.config({
  baseUrl: 'app',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    backbone: 'vendors/backbone/backbone',
    underscore: 'vendors/underscore/underscore',
    jquery: 'vendors/jquery-dist/jquery.min',
    templates:'../assets/templates',
    localstorage:'vendors/backbone.localStorage/backbone.localStorage',
   text:'vendors/text/text'
  },
  shim: {
    backbone: {
      deps: ['jquery']
    }
  }
});

//aqui empieza mi programa
require(['routers/router'], function(Router) {
  console.log('main.js');
  new Router();
});
