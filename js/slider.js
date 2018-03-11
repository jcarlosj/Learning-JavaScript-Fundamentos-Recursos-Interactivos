/* Slider */

// Objecto Implicito
var slider = {
  paginador: null,
  pagina: null,
  contenedor: null,
  li: null,
  inicio : function() {
    slider .paginacion();
  },
  paginacion : function() {
    slider .paginador = document .querySelectorAll( '#pager li' );      // Obtiene todos los elementos que componen el paginador del Slider
    slider .contenedor = document .querySelector( '#slider ul' );       // Obtiene el contenedor donde se despliegan cada uno de los Slides
    slider .li = document .querySelectorAll( '#slider ul li' );

    // Recorre cada uno de los elementos que representan cada una de las diapositivas del Slider y asigna dinámicamente el evento click a cada uno de ellos
    slider .paginador .forEach( ( slide ) => {
      slide .addEventListener( 'click', slider .accionPaginador );      // Agrega el evento 'click' a cada uno de los elementos

    });
  },
  accionPaginador : function ( event ) {
    slider .pagina = event .target. parentNode .getAttribute( 'data-page' );    // Captura el atributo otorgado a la propiedad 'data-page' del elemento padre que posee el manejador (span)
    slider .cambiaEstadoPaginador( event );
    slider .animacion( 'fade' );
  },
  mover : function( pagina ) {
    console .log( ( 'left: ', pagina * 100 * -1 ) + '%' );
    slider .contenedor .style .left = ( pagina * 100 * -1 ) + '%';                                               // Agrega Animación al contenedor
  },
  cambiaEstadoPaginador : function ( event ) {
    // Recorre cada uno de los elementos que representan las páginas del Slider y cambia el atributo CSS de opacidad
    slider .paginador .forEach( ( item_pagina ) => {
      item_pagina .style .opacity = .5;
    });
    // Cambia el atributo de opacidad al elemento actual o activo
    event .target .parentNode .style .opacity = 1;
  },
  animacion : function( tipo ) {

    setTimeout( () => {
      slider .mover( slider .pagina );
    }, 450 );

    if( tipo == 'slide' ) {
      slider .contenedor .style .transition = '.7s left ease-in-out';
    }
    if( tipo == 'fade' ) {
      let  i = 0;

      slider .li .forEach( ( slide ) => {
        if( slider .pagina == i ) {
          slide .style .opacity = 0.2;
          slide .style .transition = '.9s opacity ease-in-out';
        }
        i++;
      });

      setTimeout( () => {
        slider .li .forEach( ( slide ) => {
          slide .style .opacity = 1;
          slide .style .transition = '.9s opacity ease-in-out';
        });
      }, 900 );

    }

  }
}

// Ejecuta el método inicial del objeto
slider .inicio();
