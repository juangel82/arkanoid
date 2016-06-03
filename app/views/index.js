/*global define*/
define(['backbone', 'text!templates/inicio.html'], function(Backbone, html) {
  'use strict';
  var IndexView = Backbone.View.extend({
    el: '#container',
    render: function render(modelOptions) {
      this.model = modelOptions;
      this.$el.html(html);
      
       var tolo = document.getElementsByTagName('source')[0];

        if (this.model.get('music')){
       
        console.log('deberia sonar');
         if (tolo.src==="") {
         console.log('es nulo');
         var media = new Media("file:///android_asset/www/assets/sound/musica.mp3");
         media.play();
       } else{
         
          this.$('#musica').trigger('play');
       }
       
        }
      else {
        media.pause();
        this.$('#musica').trigger('pause');
      }
    }
  });
  var indexview = new IndexView(); //TODO: simplificar
  return indexview;
});


