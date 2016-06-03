/*global define*/
define (['backbone', 'models/puntuacion','localstorage','underscore'], function (Backbone, Puntuacion,BlocalStorage,_){
  var topscore = Backbone.Collection.extend({
  localStorage: new BlocalStorage('topscore'),
  model: Puntuacion,

  hidratar: function() {
    var j1 = new Puntuacion({id: 1});
    var j2 = new Puntuacion({id: 2});
    var j3 = new Puntuacion({id: 3});
    var j4 = new Puntuacion({id: 4});
    var j5 = new Puntuacion({id: 5});
    var j6 = new Puntuacion({id: 6});
    var j7 = new Puntuacion({id: 7});
    var j8 = new Puntuacion({id: 8});
    var j9 = new Puntuacion({id: 9});
    var j10 = new Puntuacion({id: 10});
    j1.fetch();
    j2.fetch();
    j3.fetch();
    j4.fetch();
    j5.fetch();
    j6.fetch();
    j7.fetch();
    j8.fetch();
    j9.fetch();
    j10.fetch();
    this.add(j1);
    this.add(j2);
    this.add(j3);
    this.add(j4);
    this.add(j5);
    this.add(j6);
    this.add(j7);
    this.add(j8);
    this.add(j9);
    this.add(j10);
  },
    
  sustituir: function(nuevo) {
    var encontrado = false;
    var donde = 0;
    var indice = this.length;
    console.log('indice ='+indice );
    _.each(this.models,function(jugador){
      if (!encontrado){
        donde ++;
        if(nuevo.get('puntos') >= jugador.get('puntos')){
          encontrado = true;
        }
      }
    });

    for( var i = indice; i>donde;i--){
      var j = i - 1;
      this.get(i).set('name',this.get(j).get('name'));
      this.get(i).set('puntos',this.get(j).get('puntos'));
      this.get(i).save();
    }
    this.get(donde).set('name',nuevo.get('name'));
    this.get(donde).set('puntos',nuevo.get('puntos'));
    this.get(donde).save();

  },
    
  escandidato: function(puntuacion) {
    var ultimo = this.length;
    var worst = this.get(ultimo).get('puntos');
    return (puntuacion > worst);
  },
    
  reset: function() {
    for( var i = 1; i<=this.length;i++){
      this.get(i).set('name','JAA');
      this.get(i).set('puntos',10-i);
      this.get(i).save();
     }
  },
    
  initialize: function() {
    this.on('add',function(model) {
    model.save();
    });
  }
  });
  return topscore;
});

