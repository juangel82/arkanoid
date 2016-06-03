/*global define*/
define(['backbone', 'text!templates/opciones.html'], function(Backbone, html) {
  'use strict';
   var OptionsView = Backbone.View.extend({
     el: '#container',

     events: {
       'click .soundon': 'sonidoON',
       'click .soundoff': 'sonidoOFF',
       'click .fxon': 'fxON',
       'click .fxoff': 'fxOFF',
       'click #reset': 'resetScore'
     },
    render: function render(model, topscore) {

      if (model !== undefined){
        this.model = model;
        this.topscore = topscore;
      }
      this.$el.html(html);
      if (this.model.get('music')) {
        this.$('#music').trigger('play');
        this.$('.soundon').addClass('resaltar');
        this.$('.soundoff').removeClass('resaltar');
      }
      else {
        this.$('#music').trigger('pause');
        this.$('.soundoff').addClass('resaltar');
        this.$('.soundon').removeClass('resaltar');
      }
       if (this.model.get('efects')) {
        this.$('#fx').trigger('play');
       this.$('.fxon').addClass('resaltar');
        this.$('.fxoff').removeClass('resaltar');
      }
      else {
        this.$('.fxoff').addClass('resaltar');
        this.$('.fxon').removeClass('resaltar');
      }
    },
     
    sonidoON: function sonidoON() {
      console.log('sonido on');
      this.model.set('music',true);
      this.model.save();
      this.render();
    },
     
    sonidoOFF: function sonidoOFF() {
      this.model.set('music', false);
      this.model.save();
      this.render();
    },
     
     fxON: function() {
      this.model.set('efects', true);
      this.model.save();
      this.render();
     },
     
     fxOFF: function() {
       this.model.set('efects', false);
      this.model.save();
       this.render();

     },
     resetScore: function() {
       this.$('#magia').trigger('play');
       this.topscore.reset();
   }
  });
  var optionsview = new OptionsView(); //TODO: simplificar
  return optionsview;
});
