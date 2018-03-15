/* Mouse Effect */

// Objecto Implicito
var mouseEffect = {
  /* Atributos */
  zona: null,
  /* Inicializa las funcionalidades de la Galeria */
  inicio : function() {
    mouseEffect .zona = document .querySelector( '#mouse-effect' );             // Obtiene el elemento con el 'id' : 'mouse-effect'

    // 'mousemove' aplica este evento para detectar el movimiento dentro del elemento con 'id' : 'mouse-effect' en el DOM
    mouseEffect .zona .addEventListener( 'mousemove', mouseEffect .mover );
  },
  mover : function( event ) {
    console .group( 'Dentro del elemento con "id: mouse-effect"' );
      console .log( 'coordenada X: ', event .offsetX );
      console .log( 'coordenada Y: ', event .offsetY );
    console .groupEnd();
  }
}

// Ejecuta el método inicial del objeto
mouseEffect .inicio();
