/*global define*/
define (['backbone', 'localstorage'], function(Backbone, BlocalStorage) {
  'use strict';

  var puntuacion = Backbone.Model.extend({
    localStorage: new BlocalStorage('puntuacion'),
    defaults: {
      name: 'JAA',
      puntos: 0
    },
    initialize: function() {
      console.log('puntuacion.js:initialize');
    }
  });
  return puntuacion;
});
