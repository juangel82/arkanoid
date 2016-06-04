/*global define*/
define(['backbone', 'text!templates/juego.html', 'models/juego', 'jquery'], function(Backbone, html, juego, $) {
  'use strict';
  var GameView = Backbone.View.extend({
    el: $('#container'),
    events: {
      'mousemove': 'mover',
      'click #boton': 'enviar',
    },

    render: function(optionsModel, topScoreCollection) {
      console.log('game.js:render');
      this.$el.html(html);
       this.$('#canvas').bind('touchmove',function(e){
      e.preventDefault();
     var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

      juego.moverPla(touch.pageX - 50);

});


       this.musica = new Media("file:///android_asset/www/assets/sound/musica.mp3");
    

        if (this.optionsModel.get('music')){
         this.musica.play();
       } 
    
      else {
       this.musica.pause();
      }

    juego.start(optionsModel, topScoreCollection);
    },
    apagar(): function(){
      this.musica.pause();
    }
    mover: function(event) {
      juego.moverPla(event.offsetX);
  },

    enviar: function () {
      var nombre = this.$('#nombre').val();
      var iniciales = nombre.slice(0,3);
      juego.guardarJugador(iniciales);

    }

  });
  var gameView = new GameView(); //TODO: simplificar
  return gameView;
});
