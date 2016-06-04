/*global define*/
define(['backbone', 'text!templates/inicio.html'], function(Backbone, html) {
  'use strict';
  var IndexView = Backbone.View.extend({
    el: '#container',
    render: function render(modelOptions) {
      this.model = modelOptions;
      this.$el.html(html);
      
       this.musica = document.getElementById('musica');
      if(this.musica.src === ""){
        console.log('lo cambio');
        this.musica = new Media("file:///android_asset/www/assets/sound/musica.mp3");
      }

        if (this.model.get('music')){
        console.log('deberia sonar');
         this.musica.play();
       } 
    
      else {
        console.log('no deberia sonar');
       this.musica.pause();
      }
    },
    apagar: function (){
      if (this.musica!==null){
        console.log('apagar');
        this.musica.pause();
      }
    }
  });
  var indexview = new IndexView();
  return indexview;
});


