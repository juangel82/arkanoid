/*global define*/
define(['backbone', 'text!templates/inicio.html'], function(Backbone, html) {
  'use strict';
  var IndexView = Backbone.View.extend({
    el: '#container',
    render: function render(modelOptions) {
      this.model = modelOptions;
      this.$el.html(html);
      var tonto = new Media('file:///android_asset/www/assets/sound/musica.mp3');
      console.log('tonto ' + tonto);
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


