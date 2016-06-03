/*global define*/
define(['backbone', 'text!templates/puntuacion.html', 'collections/topscore', 'underscore'], function(Backbone, html, Topscore, _) {
  'use strict';
   var ScoreView = Backbone.View.extend({
      el: '#container',
      my_template: _.template("<%= name %> --- <%= puntos %> "),

     render: function(model,optionsModel) {
       this.$el.html(html);
       if (optionsModel.get('music')) {
       this.$('#musica').trigger('play');
      }
      else {
         this.$('#musica').trigger('pause');
      }
       var texto = '';
       for (var i = 1; i <= model.length; ++i) {
         texto += '<li>' + this.my_template(model.get(i).toJSON()) + '</li>';
       }
      this.$('#lista').html(texto);
    }
  });
  var scoreview = new ScoreView(); //TODO: simplificar
  return scoreview;
});
