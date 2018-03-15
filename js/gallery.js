/* Gallery */

// Objecto Implicito
var gallery = {
  imagenes: null,
  pathImage: null,
  elementBody: null,
  lightbox: null,
  modal: null,
  tipo_animacion: 'fade',
  /* Inicializa las funcionalidades de la Galeria */
  inicio: function() {
    gallery .imagenes = document .querySelectorAll( '#gallery ul li img' );        // Obtiene todas las imágenes de la galería
    // console.log('gallery', gallery .imagenes );

    gallery .imagenes .forEach( ( image ) => {
      image .addEventListener( 'click', gallery .captura );
    });
  },
  /* Captura el elemento que contiene la imagen */
  captura : function ( event ) {
    gallery .pathImage = event .target;
    gallery .open_lightbox( gallery .pathImage );
  },
  /* Lanza el Lightbox */
  open_lightbox : function( elementImg ) {
    gallery .elementBody = document .querySelector( 'body' );                                                     // Obtiene el elemento 'body' del DOM
    gallery .elementBody .appendChild( document .createElement( 'div' ) ) .setAttribute( 'id', 'lightbox' );      // Crea y Agrega un elemento 'div' dentro del elemento 'body del DOM y Agrega un atributo 'id' al elemento creado
    gallery .lightbox = document .querySelector( '#lightbox' );                                                   // Obtiene el elemento 'div' creado con el 'id': 'lightbox'

    gallery .lightbox .style .width = '100%';
    gallery .lightbox .style .height = '100%';
    gallery .lightbox .style .position = 'fixed';
    gallery .lightbox .style .zIndex = '10';
    gallery .lightbox .style .background = 'rgba( 0, 0, 0, .8 )';
    gallery .lightbox .style .top = 0;
    gallery .lightbox .style .left = 0;

    gallery .load_image( elementImg );                                          // Carga la imagen sobre el 'lightbox'
  },
  /* Despliega la imagen dentro del Lightbox */
  load_image : function( elementImg ) {
    gallery .lightbox .appendChild( document .createElement( 'div' ) ) .setAttribute( 'id', 'modal' );            // Crea y Agrega un elemento 'div' dentro del elemento 'div' con 'id': 'lightbox' creado y Agrega un atributo 'id' al nuevo elemento creado
    gallery .modal = document .querySelector( '#modal' );                                                         // Obtiene el elemento 'div' creado con el 'id': 'modal'

    /* Despliega la imagen en el DOM */
    gallery .modal .innerHTML = elementImg .outerHTML + '<div class="close-image">x</div>';                                                            // 'outerHTML' del interfaz DOM element obtiene el fragmento HTML serializado del objeto

    // 'childNodes' la propiedad retorna una colección (Array) de hijos que pertenecen al elemento. En este caso hace referencia al elemento 'img'
    gallery .modal .childNodes[ 0 ] .style . width = '100%';                    // Despliega la imagen al 100% del espacio del elemento con 'id' : 'modal'
    gallery .modal .childNodes[ 0 ] .style . border = '10px solid white';       // Agrega un borde a la imagen

    gallery .createMediaQuery();
    gallery .animate();

    gallery .modal .style .display = 'block';
    gallery .modal .style .position = 'relative';

    // 'childNodes' la propiedad retorna una colección (Array) de hijos que pertenecen al elemento. En este caso hace referencia al elemento 'div', con 'class' : 'close-image'
    gallery .modal .childNodes[ 1 ] .style .position = 'absolute';
    gallery .modal .childNodes[ 1 ] .style . right = '5px';
    gallery .modal .childNodes[ 1 ] .style . top = '5px';
    gallery .modal .childNodes[ 1 ] .style . color = 'sliver';
    gallery .modal .childNodes[ 1 ] .style . cursor = 'pointer';
    gallery .modal .childNodes[ 1 ] .style . fontSize = '30px';
    gallery .modal .childNodes[ 1 ] .style . width = '40px';
    gallery .modal .childNodes[ 1 ] .style . height = '40px';
    gallery .modal .childNodes[ 1 ] .style . textAlign = 'center';
    gallery .modal .childNodes[ 1 ] .style . background = 'white';
    gallery .modal .childNodes[ 1 ] .style . borderRadius = '0 0 0 5px';

    // Agrega evento 'click' al elemento 'div', con 'class' : 'close-image'
    gallery .modal .childNodes[ 1 ] .addEventListener( 'click', gallery .close_lightbox );
  },
  /* Función que crea un Media Query desde JavaScript */
  createMediaQuery : function() {
    /* Crea un nuevo MediaQuery desde JavaScript de acuerdo al 'mediaQueryString' que se le pasa para crear la regla, en este caso '( min-width : 1000px )'
      'window.matchMedia' Retorna un nuevo objeto MediaQuerylist. */
    if( window .matchMedia( '( min-width : 1000px )' ) .matches ) {     // 'matches' permite hacer la verificación del resultado del 'mediaQueryString'
      gallery .modal .style .width = '60%';
    }
    else {
      gallery .modal .style .width = '90%';
    }
  },
  /* Función que cierra el 'lightbox' */
  close_lightbox : function () {
    gallery .lightbox .parentNode .removeChild( gallery .lightbox );
  },
  /* Función que anima el despliegue de las imagenes sobre el 'lightbox' */
  animate : function() {
    let anchoImagen,
        altoImagen;

    // Valida el tipo de animación para el Lightbox es 'desplazamiento de izquierda a derecha'
    if( gallery .tipo_animacion == 'slide_left' ) {
      gallery .modal .style .top = '50%';                                       // Alinea la imagen al 50% verticalmente a partir de la parte superior del elemento con 'id' : 'lightbox'
      gallery .modal .style .left = 0;
      gallery .modal .style .opacity = 0;

      // Agrega un temporizador para el despliegue de la animación
      setTimeout( () => {
        gallery .modal .style .transition = '.5s left ease';                    // Debe ponerse al principio, para que la animación se realice
        gallery .modal .style .left = '50%';
        gallery .modal .style .opacity = 1;
      }, 50 );
    }

    // Valida el tipo de animación para el Lightbox es 'desplazamiento de derecha a izquierda'
    if( gallery .tipo_animacion == 'slide_right' ) {
      gallery .modal .style .top = '50%';                                       // Alinea la imagen al 50% verticalmente a partir de la parte superior del elemento con 'id' : 'lightbox'
      gallery .modal .style .right = '-100%';
      gallery .modal .style .opacity = 0;

      // Agrega un temporizador para el despliegue de la animación
      setTimeout( () => {
        gallery .modal .style .transition = '.5s right ease';                   // Debe ponerse al principio, para que la animación se realice
        gallery .modal .style .right = '-50%';
        gallery .modal .style .opacity = 1;
      }, 50 );
    }

    // Valida el tipo de animación para el Lightbox es 'desplazamiento de arriba a abajo'
    if( gallery .tipo_animacion == 'slide_top' ) {
      gallery .modal .style .top = '-100%';                                       // Alinea la imagen al 50% verticalmente a partir de la parte superior del elemento con 'id' : 'lightbox'
      gallery .modal .style .left = '50%';
      gallery .modal .style .opacity = 0;

      // Agrega un temporizador para el despliegue de la animación
      setTimeout( () => {
        gallery .modal .style .transition = '.5s top ease';                    // Debe ponerse al principio, para que la animación se realice
        gallery .modal .style .top = '50%';
        gallery .modal .style .opacity = 1;
      }, 50 );
    }

    // Valida el tipo de animación para el Lightbox es 'desplazamiento de abajo a arriba'
    if( gallery .tipo_animacion == 'slide_bottom' ) {
      gallery .modal .style .bottom = '-100%';                                       // Alinea la imagen al 50% verticalmente a partir de la parte superior del elemento con 'id' : 'lightbox'
      gallery .modal .style .left = '50%';
      gallery .modal .style .opacity = 0;

      // Agrega un temporizador para el despliegue de la animación
      setTimeout( () => {
        gallery .modal .style .transition = '.5s bottom ease';                    // Debe ponerse al principio, para que la animación se realice
        gallery .modal .style .bottom = '-50%';
        gallery .modal .style .opacity = 1;
      }, 50 );
    }

    if( gallery .tipo_animacion == 'fade' ) {
      gallery .modal .style .top = '50%';                                       // Alinea la imagen al 50% verticalmente a partir de la parte superior del elemento con 'id' : 'lightbox'
      gallery .modal .style .left = '50%';
      gallery .modal .style .opacity = 0;

      // Agrega un temporizador para el despliegue de la animación
      setTimeout( () => {
        gallery .modal .style .transition = '.9s opacity ease';                 // Debe ponerse al principio, para que la animación se realice
        gallery .modal .style .opacity = 1;
      }, 50 );
    }

    anchoImagen = gallery .modal .childNodes[ 0 ] .width,                   // Obtiene el ancho de la imagen, que esta contenida en el elemento hijo del elemento con 'id' : 'modal'
    altoImagen = gallery .modal .childNodes[ 0 ] .height;                   // Obtiene el alto de la imagen, que esta contenida en el elemento hijo del elemento con 'id' : 'modal'

    /*
    console .log( 'ancho imagen: ', anchoImagen );
    console .log( 'alto imagen: ', altoImagen );*/

    gallery .modal .style .marginTop = -( altoImagen / 2 ) + 'px';          // Resta la mitad del alto de la imagen y lo agrega como margen negativo (a la parte superior) lo que hace que la imagen se centre verticalmente
    gallery .modal .style .marginLeft = -( anchoImagen / 2 ) + 'px';        // Resta la mitad del ancho de la imagen y lo agrega como margen negativo (a la izquierda) lo que hace que la imagen se centre horizontalmente

  }
}

// Ejecuta el método inicial del objeto
gallery .inicio();
