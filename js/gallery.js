/* Gallery */

// Objecto Implicito
var gallery = {
  imagenes: null,
  pathImage: null,
  elementBody: null,
  lightbox: null,
  modal: null,
  /* Inicializa las funcionalidades de la Galeria */
  inicio: function() {
    gallery .imagenes = document .querySelectorAll( '#gallery ul li img' );        // Obtiene todas las imágenes de la galería
    console.log('gallery', gallery .imagenes );

    gallery .imagenes .forEach( ( image ) => {
      image .addEventListener( 'click', gallery .captura );
    });
  },
  /* Captura el elemento que contiene la imagen */
  captura : function ( event ) {
    gallery .pathImage = event .target;
    gallery .efecto_lightbox( gallery .pathImage );
  },
  /* Lanza el Lightbox */
  efecto_lightbox : function( elementImg ) {
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

    gallery .load_image( elementImg );
  },
  /* Despliega la imagen dentro del Lightbox */
  load_image : function( elementImg ) {
    let anchoImagen,
        altoImagen;

    gallery .lightbox .appendChild( document .createElement( 'div' ) ) .setAttribute( 'id', 'modal' );            // Crea y Agrega un elemento 'div' dentro del elemento 'div' con 'id': 'lightbox' creado y Agrega un atributo 'id' al nuevo elemento creado
    gallery .modal = document .querySelector( '#modal' );                                                         // Obtiene el elemento 'div' creado con el 'id': 'modal'

    /* Despliega la imagen en el DOM */
    gallery .modal .innerHTML = elementImg .outerHTML + '<div class="close-image">x</div>';                                                            // 'outerHTML' del interfaz DOM element obtiene el fragmento HTML serializado del objeto

    // 'childNodes' la propiedad retorna una colección (Array) de hijos que pertenecen al elemento. En este caso hace referencia al elemento 'img'
    gallery .modal .childNodes[ 0 ] .style . width = '100%';                    // Despliega la imagen al 100% del espacio del elemento con 'id' : 'modal'
    gallery .modal .childNodes[ 0 ] .style . border = '10px solid white';       // Agrega un borde a la imagen

    gallery .modal .style .display = 'block';
    gallery .modal .style .position = 'relative';
    gallery .modal .style .width = '60%';
    /* Las siguientes instrucciones ayudan a que la imagen se centre automáticamente independientemente del tamaño de la imagen */
    gallery .modal .style .top = '50%';                                         // Alinea la imagen al 50% verticalmente a partir de la parte superior del elemento con 'id' : 'lightbox'
    gallery .modal .style .left = '50%';                                        // Alinea la imagen al 50% horizontalmente a partir de la parte izquierda del elemento con 'id' : 'lightbox'

    anchoImagen = gallery .modal .childNodes[ 0 ] .width,                       // Obtiene el ancho de la imagen, que esta contenida en el elemento hijo del elemento con 'id' : 'modal'
    altoImagen = gallery .modal .childNodes[ 0 ] .height;                       // Obtiene el alto de la imagen, que esta contenida en el elemento hijo del elemento con 'id' : 'modal'

    console .log( 'ancho imagen: ', anchoImagen );
    console .log( 'alto imagen: ', altoImagen );

    gallery .modal .style .marginTop = -( altoImagen / 2 ) + 'px';              // Resta la mitad del alto de la imagen y lo agrega como margen negativo (a la parte superior) lo que hace que la imagen se centre verticalmente
    gallery .modal .style .marginLeft = -( anchoImagen / 2 ) + 'px';            // Resta la mitad del ancho de la imagen y lo agrega como margen negativo (a la izquierda) lo que hace que la imagen se centre horizontalmente

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
  }
}

// Ejecuta el método inicial del objeto
gallery .inicio();
