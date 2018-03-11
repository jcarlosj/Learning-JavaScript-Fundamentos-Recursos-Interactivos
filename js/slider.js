/* Slider */

// Objecto Implicito
var slider = {
  paginador: null,
  pagina: null,
  contenedor: null,
  inicio : function() {
    slider .paginacion();
  },
  paginacion : function() {
    slider .paginador = document .querySelectorAll( '#pager li' );      // Obtiene todos los elementos que componen el paginador del Slider
    slider .contenedor = document .querySelector( '#slider ul' );       // Obtiene el contenedor donde se despliegan cada uno de los Slides

    // Recorre cada uno de los elementos que representan cada una de las diapositivas del Slider y asigna dinámicamente el evento click a cada uno de ellos
    slider .paginador .forEach( ( slide ) => {
      slide .addEventListener( 'click', slider .accionPaginador );      // Agrega el evento 'click' a cada uno de los elementos

    });
  },
  accionPaginador : function ( event ) {
    slider .pagina = event .target. parentNode .getAttribute( 'data-page' );    // Captura el atributo otorgado a la propiedad 'data-page' del elemento padre que posee el manejador (span)
    slider .cambiaEstadoPaginador( event );
    slider .mover( slider .pagina );                                            // Cambia el Slide
  },
  mover : function( pagina ) {
    console .log( ( 'left: ', pagina * 100 * -1 ) + '%' );
    slider .contenedor .style .left = ( pagina * 100 * -1 ) + '%';
  },
  cambiaEstadoPaginador : function ( event ) {
    // Recorre cada uno de los elementos que representan las páginas del Slider y cambia el atributo CSS de opacidad
    slider .paginador .forEach( ( item_pagina ) => {
      item_pagina .style .opacity = .5;
    });
    // Cambia el atributo de opacidad al elemento actual o activo
    event .target .parentNode .style .opacity = 1;
  }
}

// Ejecuta el método inicial del objeto
slider .inicio();
