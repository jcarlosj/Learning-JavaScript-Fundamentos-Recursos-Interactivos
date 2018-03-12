/* Slider */

// Objecto Implicito
var slider = {
  paginador: null,
  pagina: null,
  contenedor: null,
  li: null,
  avanzar: null,
  retroceder: null,
  velocidad: 3000,
  reiniciar_loop: false,
  tamanioSlide: null,
  /* Inicializa las funcionalidades del Slider */
  inicio : function() {
    slider .contenedor = document .querySelector( '#slider ul' );       // Obtiene el contenedor donde se despliegan cada uno de los Slides
    slider .li = document .querySelectorAll( '#slider ul li' );         // Todos los elementos LI que contienen un slide
    slider .paginador = document .querySelectorAll( '#pager li' );      // Obtiene todos los elementos que componen el paginador del Slider
    slider .automatico();
    slider .paginacion();
    slider .flechas();

    slider .calcularElementosSlider();
  },
  // Función que permite que el Slider sea dinámico y puedan agregarse elementos en el DOm y calcular las dimensiones de cada elemento automáticamente
  calcularElementosSlider : function () {
    let cantidadPaginas = slider .li .length;                                   // Calcula cantidad de elementos LI o (Diapositivas) en el DOM

    slider .contenedor .style .width = ( slider .li .length * 100 ) + '%';      // Calcula y Modifica Dinámicamente el tamaño del contenedor de diapositivas (Slides) de acuerdo a la cantidad de elementos en el DOM

    // Recorre cada 'Slide' del DOM, Calcula y Modifica Dinámicamente el tamaño de cada uno de ellos
    slider .li .forEach( ( slider ) => {
      slider .style .width = ( 100 / cantidadPaginas ) + '%';
    });
  },
  // Agrega la funcionalidad de desplazamiento de 'diapositivas' usando las Flechas laterales del Slider
  flechas : function() {
    // Obtiene los elementos de las flechas (derecha, izquierda) del Slider
    slider .avanzar = document .querySelector( '#forward-arrow' );
    slider .retroceder = document .querySelector( '#back-arrow' );

    /* Agrega evento 'click' a las flechas */
    slider .avanzar .addEventListener( 'click', slider .avanza );
    slider .retroceder .addEventListener( 'click', slider .retrocede );

  },
  // Avanza al hacer uso de la flecha del lado derecho del Slider
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
    // console .log( 'pagina: ', slider .pagina );

    slider .mueveIndicadorPagina( slider .pagina );
  },
  // Retrocede al hacer uso de la flecha del lado derecho del Slider
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
    // console .log( 'pagina: ', slider .pagina );

    slider .mueveIndicadorPagina( slider .pagina );
  },
  // Agrega la funcionalidad de desplazamiento de 'diapositivas' usando el paginador inferior del Slider laterales
  paginacion : function() {
    // Recorre cada uno de los elementos que representan cada una de las diapositivas del Slider y asigna dinámicamente el evento click a cada uno de ellos
    slider .paginador .forEach( ( slide ) => {
      slide .addEventListener( 'click', slider .accionPaginador );      // Agrega el evento 'click' a cada uno de los elementos
    });
  },
  // Ejecuta el movimiento del Slider y cambio de estado del Paginador
  accionPaginador : function ( event ) {
    slider .pagina = event .target. parentNode .getAttribute( 'data-page' );    // Captura el atributo otorgado a la propiedad 'data-page' del elemento padre que posee el manejador (span)
    slider .cambiaIndicadorPagina( event .target .parentNode );

    slider .mover( slider .pagina );
  },
  // Agrega la funcioalidad de movimiento al Slider
  mover : function( pagina ) {
    slider .reiniciar_loop = true;                                              // Reinicial el Loop del desplazamiento automático
    slider .contenedor .style .left = ( pagina * 100 * -1 ) + '%';
    slider .animacion( 'slide' );                                               // Agrega Animación al contenedor
  },
  // Cambia el estilos de item activo del paginador del Slider
  cambiaIndicadorPagina : function ( li ) {
    // Recorre cada uno de los elementos que representan las páginas del Slider y cambia el atributo CSS de opacidad
    slider .paginador .forEach( ( item_pagina ) => {
      item_pagina .style .opacity = .5;
    });
    // Cambia el atributo de opacidad al elemento actual o activo
    li .style .opacity = 1;
  },
  // Ejecuta el cambio o movimiento activo del paginador del Slider
  mueveIndicadorPagina : function () {
    // Recorre las páginas del paginador
    slider .paginador .forEach( ( slide ) => {
      //console .log( 'data-page', slide .getAttribute( 'data-page' ) );

      // Valida que el número de la diapositiva sea igual al número de pagina actual
      if( slide .getAttribute( 'data-page' ) == slider .pagina ) {
        slider .cambiaIndicadorPagina( slide );
      }
    });
  },
  // Agrega animación personalizada al Slider
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

  },
  // Agrega la manera en que el Slider Avance automáticamente
  automatico : function() {
    setInterval( () => {

        // Valida si se ha reiniciado el Loop (o intervalo)
        if( slider .reiniciar_loop ) {
          // Si ha sido reiniciado cambia el valor de la bandera y no avanza hasta el siguiente intervalo
          slider .reiniciar_loop = false;
        }
        else {
          // No ha sido reiniciado y continua avanzando
          slider .avanza();

          // Recorre las páginas del paginador
          slider .mueveIndicadorPagina( slider .pagina );
        }

    }, slider .velocidad );
  }
}

// Ejecuta el método inicial del objeto
slider .inicio();
