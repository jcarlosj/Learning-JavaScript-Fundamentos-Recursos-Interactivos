/* Scroll Effect */

// Objecto implicito
var scrollEffect = {
  /* Atributos */
  desplazamientoEnY: 0,
  /* Inicializa las funcionalidades del 'Efecto Scroll' */
  inicio : function() {
    // 'scroll' aplica este evento para detectar el Scroll del Mouse sobre el DOM
    document .addEventListener( 'scroll', scrollEffect .parallaxEffect );
  },
  parallaxEffect : function() {
    // 'window.pageYOffset' es un alias de 'scrollY' y devuelve al número de pixeles desplazados verticamente en el espacio del documento
    scrollEffect .desplazamientoEnY = window .pageYOffset;
    console .log( scrollEffect .desplazamientoEnY );
  }
}

// Ejecuta el método inicial del objeto
scrollEffect .inicio();
