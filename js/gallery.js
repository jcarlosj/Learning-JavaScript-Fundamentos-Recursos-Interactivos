/* Gallery */

// Objecto Implicito
var gallery = {
  imagenes: null,
  pathImage: null,
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
    console .log( gallery .pathImage );
  }
}

// Ejecuta el método inicial del objeto
gallery .inicio();
