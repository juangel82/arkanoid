/*global define*/
define(['backbone', 'text!templates/inicio.html'], function(Backbone, html) {
  'use strict';
  var IndexView = Backbone.View.extend({
    el: '#container',
    render: function render(modelOptions) {
      this.model = modelOptions;
      this.$el.html(html);
      
       var musica = document.getElementById('musica');
      if(musica.src === ""){
        musica = new Media("file:///android_asset/www/assets/sound/musica.mp3");
      }

        if (this.model.get('music')){
         musica.play();
       } 
    
      else {
       musica.pause();
      }
    }
  });
  var indexview = new IndexView();
  return indexview;
});


