/* Slider */

// Objecto Implicito
var slider = {
  paginador: null,
  pagina: null,
  contenedor: null,
  li: null,
  avanzar: null,
  retroceder: null,
  inicio : function() {
    slider .li = document .querySelectorAll( '#slider ul li' );         // Todos los elementos LI que contienen un slide
    slider .paginacion();
    slider .flechas();
  },
  flechas : function() {
    // Obtiene los elementos de las flechas (derecha, izquierda) del Slider
    slider .avanzar = document .querySelector( '#forward-arrow' );
    slider .retroceder = document .querySelector( '#back-arrow' );

    /* Agrega evento 'click' a las flechas */
    slider .avanzar .addEventListener( 'click', slider .avanza );
    slider .retroceder .addEventListener( 'click', slider .retrocede );
  },
  avanza : function() {
    // Valida si la cantidad de 'diapositivas' es igual a la página actual
    if( slider .pagina == ( slider .li .length -1 ) ) {
      // Es 4, Reinicia
      slider .pagina = 0;
    }
    else {
      slider .pagina ++;
    }

    slider .mover( slider .pagina );
    console .log( 'pagina: ', slider .pagina );
  },
  retrocede : function () {
    // Valida si la cantidad de 'diapositivas' es igual a la página actual
    if( slider .pagina == 0 || slider .pagina == null ) {
      // Es O, Retrocede
      slider .pagina = slider .li .length -1;
    }
    else {
      slider .pagina --;
    }

    slider .mover( slider .pagina );
    console .log( 'pagina: ', slider .pagina );
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

    slider .mover( slider .pagina );
  },
  mover : function( pagina ) {
    console .log( ( 'left: ', pagina * 100 * -1 ) + '%' );
    slider .contenedor .style .left = ( pagina * 100 * -1 ) + '%';
    slider .animacion( 'fade' );                                            // Agrega Animación al contenedor
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
    // Valida el tipo de animación que se aplicará al Slider
    if( tipo == 'slide' ) {
      slider .contenedor .style .transition = '.7s left ease-in-out';
    }
    if( tipo == 'fade' ) {
      let  i = 0;

      // Desaparece
      slider .li .forEach( ( slide ) => {
        if( slider .pagina == i ) {
          slide .style .opacity = 0.2;
          slide .style .transition = '.9s opacity ease-in-out';
        }
        i++;
      });

      // Aparece
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
