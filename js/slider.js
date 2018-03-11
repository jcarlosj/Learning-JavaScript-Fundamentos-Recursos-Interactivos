/* Slider */

// Objecto Implicito
var slider = {
  paginador: null,
  inicio : function() {
    slider .paginacion();
  },
  paginacion : function() {
    slider .paginador = document .querySelectorAll( '#pager li' );      // Obtiene todos los elementos que componen el paginador del Slider

    // Recorre cada uno de los elementos que representan cada una de las diapositivas del Slider y asigna dinámicamente el evento click a cada uno de ellos
    slider .paginador .forEach( ( slide ) => {
      slide .addEventListener( 'click', slider .accionPaginador );
    });
  },
  accionPaginador : function ( event ) {
    console .log( event .target. parentNode .getAttribute( 'data-page' ) );
  }
}

// Ejecuta el método inicial del objeto
slider .inicio();
