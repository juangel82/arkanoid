/*global define */
define (['models/options', 'models/puntuacion', 'collections/topscore', 'views/index', 'views/game', 'views/score', 'views/options', 'backbone','views/credits'], function(OptionsModel, PuntuacionModel, TopscoreCollection, IndexView, gameView, scoreView, optionsView, Backbone,creditsView) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '':   'indexAction',
      'game':  'gameAction',
      'score':    'scoreAction',
      'options':  'optionsAction',
      'inicio': 'indexAction',
      'creditos': 'creditsAction'
    },

    initialize: function() {
      //hidratar opciones
      var OPTIONS_ID = 1;
      this.optionsModel = new OptionsModel({id: OPTIONS_ID});
      this.optionsModel.fetch();
      //hidratar topscore
      this.topscoreCollection = new TopscoreCollection();
      this.topscoreCollection.hidratar();
      Backbone.history.start();
    },

    indexAction: function() {
      console.log('routers.js:indexAction');
      IndexView.render(this.optionsModel);
    },
    gameAction: function() {
      console.log('routers.js:gameAction');
       IndexView.apagar();
      gameView.render(this.optionsModel, this.topscoreCollection);
    },
    scoreAction: function() {
      console.log('routers.js:scoreAction');
      IndexView.apagar();
      scoreView.render(this.topscoreCollection, this.optionsModel);
    },
    optionsAction: function () {
      console.log('routers.js:optionAnction');
       IndexView.apagar();
      optionsView.render(this.optionsModel, this.topscoreCollection);
    },
    creditsAction: function () {
      console.log('routers.js:optionAnction');
      creditsView.render();
    }
  });
  return Router;
});
