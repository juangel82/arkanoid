/*global define*/
define (['backbone', 'localstorage'], function (Backbone, BlocalStorage){
  'use strict';
  var options = Backbone.Model.extend({
    defaults: {
    music: true,
    efects: true,
  },
    
  localStorage: new BlocalStorage('options'),
  initialize: function() {
    console.log('options.js:initialize');
     //FIXME no va :(
    //this.on('change',this.save,this)
  },

});
return options;
});

//TODO no dejar funciones anónimas !!!
