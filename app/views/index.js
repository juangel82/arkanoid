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
        console.log('lo cambio');
        musica = new Media("file:///android_asset/www/assets/sound/musica.mp3");
      }

        if (this.model.get('music')){
        console.log('deberia sonar');
         musica.play();
       } 
    
      else {
        console.log('no deberia sonar');
       musica.pause();
      }
    }
  });
  var indexview = new IndexView();
  return indexview;
});


