/*global define*/
define(['backbone', 'text!templates/inicio.html'], function(Backbone, html) {
  'use strict';
  var IndexView = Backbone.View.extend({
    el: '#container',
    render: function render(modelOptions) {
      this.model = modelOptions;
      this.$el.html(html);
      var tonto = document.getElementById('musica');
      console.log('tonto ' + tonto.getAttribute('currentSrc'));
      tonto.play();
      if (this.model.get('music')){
       var prueba = this.$('#musica');//.trigger('play');
       console.log('esta'+prueba.getAttribute('src'));
      }
      else {
        this.$('#musica').trigger('pause');
      }
    }
  });
  var indexview = new IndexView(); //TODO: simplificar
  return indexview;
});


