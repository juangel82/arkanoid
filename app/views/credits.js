/*global define*/
define(['backbone', 'text!templates/creditos.html'], function(Backbone, html) {
  'use strict';
   var CreditsView = Backbone.View.extend({
      el: '#container',
      render: function() {
        this.$el.html(html);
      }
  });
  var creditsview = new CreditsView();
  return creditsview;
});
