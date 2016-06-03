/*global define, document, clearInterval, setInterval, window*/
define (['backbone', 'models/puntuacion'], function(Backbone, PuntuacionModel) {
  'use strict';
  var Juego = Backbone.Model.extend({
    start: function(optionsModel, topscoreCollection){
    this.topscore = topscoreCollection;
    //CANVAS
    this.w = window.innerWidth - 20;
    this.h = window.innerHeight / 1.5;
    //BOLA
    this.ballX = this.w / 2;
    this.ballY = this.h / 2;
    this.ballVX = -1;
    this.ballVY = -1;
    this.ballRadio = 5;
    this.colors=['#E50F01', '#F46801', '#F4C401', '#74FF00', '#04DBD9','#DB04A4'];
    //PLATAFORMA
    this.plaX = '';
    this.plaY = '';
    this.plaW = 100;
    this.plaH = 5;
    this.plaVX = 10;
    //BLOQUES
    this.bloW = '';
    this.bloH = 10;
    this.bloRow = 6;
    this.bloCol = 10;
    this.bloPad = 2;
    this.bloObj= '';
    //JUEGO
    this.puntuacion = 0;
    this.vidas = 2;
    this.sonidoP = document.getElementById('golpeP');
    this.sonidoL = document.getElementById('golpeL');

    if (this.sonidoP.src===""){
      console.log('cambiadoP');
      this.sonidoP = new Media(("file:///android_asset/www/assets/sound/plata.mp3"));
    }
    if (this.sonidoL.src===""){
      console.log('cambiadoL');
      this.sonidoL = new Media(("file:///android_asset/www/assets/sound/ladri.mp3"));
    }
    this.canvas = document.getElementById('canvas');
    this.auxiliar = document.getElementById('auxiliar');
    this.canvas.width = this.w ;
    this.canvas.height = this.h;
    this.auxiliar.width = this.w;
    this.auxiliar.height = this.h/7;
    this.ctx = this.canvas.getContext('2d');
    this.ctxaux = this.auxiliar.getContext('2d');

    this.plaX = this.w / 2;
    this.plaY = this.h - 20;
    this.bloW = (this.w / 10) - 2;

    this.bloObj = [];
    for (var i = 0; i < this.bloRow; i++) {
      this.bloObj[i] = [];
      for (var j = 0; j < this.bloCol; j++) {
        this.bloObj[i][j] = 1;
      }
    }

      this.fxactivo = optionsModel.get('efects');
      this.identificador = setInterval(function() { juego.pintarJuego(); }, 1);
  },

    pintarJuego: function() {
      this.borrarCanvas();
      this.pintaBarra();
      this.pintaBloques();
      this.pintaBola();
      this.pintaInfo();
  },

  pintaBola: function() {
    //calcular nueva posicion bola
    this.ballX += this.ballVX;
    this.ballY += this.ballVY;
    //rebote eje X
    if ((this.ballX + this.ballRadio) + this.ballVX > this.w || (this.ballX - this.ballRadio + this.ballVX < 0)) {
      this.ballVX = -this.ballVX;
    }
    //rebote eje Y
    if ((this.ballY-this.ballRadio) + this.ballVY < 0) {
      this.ballVY = -this.ballVY;
    }
    //rebote Barra
    else if ((this.ballY + this.ballRadio + this.ballVY) >= (this.h - this.plaH - 10) &&(this.ballY + this.ballRadio) + this.ballVY < this.h) {
      if (this.ballX + this.ballRadio >= this.plaX && this.ballX + this.ballRadio <= (this.plaX + this.plaW)) {
        if (this.fxactivo == 1){
        this.sonidoP.load();
        this.sonidoP.play();
      }
        this.ballVY = -this.ballVY;
        this.ballVX = 10 * (this.ballX - (this.plaX + this.plaW / 2)) / this.plaW;
      }
      else { //si no le damos
        if (this.vidas > 0) {
          this.vidas -= 1;
          this.ballX = 30;
          this.ballY = 100;
          this.ballVX = -1;
          this.ballVY = -1;
          this.ballX = this.w / 2;
          this.ballY = this.h / 2;
      }
      else {
        this.terminarJuego();
       }
     }
    }
    this.ctx.fillStyle ='#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(this.ballX, this.ballY, this.ballRadio, 0, 2*Math.PI, true);
    this.ctx.closePath();
    this.ctx.fill();
  },

  borrarCanvas: function () {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctxaux.clearRect(0, 0, this.auxiliar.width,  this.auxiliar.height);
  },

  pintaBarra: function() {
    this.ctx.fillStyle = '#00FF00';
    this.ctx.beginPath();
    this.ctx.fillRect(this.plaX, this.plaY, this.plaW, this.plaH);
    this.ctx.closePath();
  },

  pintaBloques: function() {
    //romper ladrillos
    var rowHeight = this.bloH + this.bloPad;
    var row = Math.floor(this.ballY / (rowHeight));
    var col = Math.floor(this.ballX / (this.bloW + this.bloPad));
    if (this.ballY < this.bloRow * rowHeight && row >= 0 && col >= 0 && this.bloObj[row][col] === 1) {
      if (this.fxactivo == 1){
        this.sonidoL.load();
        this.sonidoL.play();
      }
      this.bloObj[row][col] = 0;
      this.ballVY = -this.ballVY;
      this.puntuacion += 1;
    }
     for (var i = 0; i < this.bloRow; i++) {
       this.ctx.fillStyle = this.colors[i];
       for (var j = 0; j < this.bloCol; j++) {
         if(this.bloObj[i][j] === 1){
           this.ctx.beginPath();
           this.ctx.rect(j * (this.bloW + this.bloPad), i * (this.bloH + this.bloPad), this.bloW, this.bloH);
           this.ctx.strokeRect(j * (this.bloW + this.bloPad), i * (this.bloH + this.bloPad), this.bloW, this.bloH);
           this.ctx.closePath();
           this.ctx.fill();
           this.ctx.stroke();
         }
       }
     }
  },

  pintaInfo: function() {
    this.ctxaux.font = "30px digital";
    this.ctxaux.fillText('puntuacion: ' + this.puntuacion, 20, this.auxiliar.height/1.5);
    this.ctxaux.fillText('vidas: ' + this.vidas , this.auxiliar.width-100, this.auxiliar.height/1.5);
    this.ctxaux.fillStyle = '#FFFB00';
  },

  guardarJugador: function (nombre){
     var ganador= new PuntuacionModel({name:nombre,puntos:this.puntuacion});
      this.topscore.sustituir(ganador);
  },

  terminarJuego: function() {
    clearInterval(this.identificador);
    this.ctx.font = '60px digital';
    this.ctx.fillText('GAME OVER', this.w / 6, this.h / 2);
  },

  moverPla: function (pos) {
    if (pos + this.plaW <= this.w) {
      this.plaX = pos;
    }
  },
});

  var juego = new Juego(); //TODO: simplificar
  return juego;
});
