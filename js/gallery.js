/* Gallery */

// Objecto Implicito
var gallery = {
  imagenes: null,
  pathImage: null,
  elementBody: null,
  lightbox: null,
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
  }
}

// Ejecuta el método inicial del objeto
gallery .inicio();
