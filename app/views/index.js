/*global define*/
define(['backbone', 'text!templates/inicio.html'], function(Backbone, html) {
  'use strict';
  var IndexView = Backbone.View.extend({
    el: '#container',
    render: function render(modelOptions) {
      this.model = modelOptions;
      this.$el.html(html);
      
       var tolo = document.getElementById('musica');
       var src = tolo.getAttribute('rsc');
       
       if (tolo.src==="") {
         console.log('es nulo');
         var media = new Media("file:///android_asset/www/assets/sound/musica.mp3");
         media.play();
       }
      
        if (this.model.get('music')){
        //this.$('#musica').trigger('play');
        console.log('deberia sonar');
        document.getElementById('musica').play();
        }
      else {
        this.$('#musica').trigger('pause');
      }
    }
  });
  var indexview = new IndexView(); //TODO: simplificar
  return indexview;
});


