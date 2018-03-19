/* Scroll Effect */

// Objecto implicito
var scrollEffect = {
  /* Atributos */
  desplazamientoEnY: 0,
  articulos: null,
  elementScrollEffect: null,
  elementHeader: null,
  /* Inicializa las funcionalidades del 'Efecto Scroll' */
  inicio : function() {
    scrollEffect .elementHeader = document .querySelector( 'header' );                  // Obtiene el elemento 'header' del DOM
    scrollEffect .elementScrollEffect = document .querySelector( '#scroll-effect' );    // Obtiene el elemento con 'id':'scroll-effect'
    scrollEffect .articulos = document .querySelectorAll( '#scroll-effect article' );   // Obtiene todos los elementos 'article' contendos en el elemento con 'id':'scroll-effect'

    // 'scroll' aplica este evento para detectar el Scroll del Mouse sobre el DOM
    document .addEventListener( 'scroll', scrollEffect .parallaxEffect );
  },
  /* Implementa el Efecto Parallax a los artículos contenidos dentro del elemento 'scroll-effect' */
  parallaxEffect : function() {
    scrollEffect .desplazamientoEnY = window .pageYOffset;                              // 'window.pageYOffset' es un alias de 'scrollY' y devuelve al número de pixeles desplazados verticamente en el espacio del documento
    console .log( scrollEffect .desplazamientoEnY );

    // Valida si el deplazamiento es mayor al alto del elemento 'header' (Contenedor del: Logo y el Menú)
    if( scrollEffect .desplazamientoEnY > scrollEffect .elementHeader .clientHeight ) {
      scrollEffect .elementHeader .style .position = 'fixed';
      scrollEffect .elementHeader .style .zIndex = '10';
    }
    else {
      scrollEffect .elementHeader .style .position = 'relative';
      scrollEffect .elementHeader .style .zIndex = '0';
    }

    // Valida si el desplazamiento actual del 'scroll' es mayor a la distancia superior con su elemento padre
    if( scrollEffect .desplazamientoEnY > scrollEffect .elementScrollEffect .offsetTop - 200  ) {       // Elimina 200 pixeles de la altura superior con el elemento padre para queel desplazamiento ocurra más rápido
      scrollEffect .articulos .forEach( ( articulo ) => {
        articulo .style .marginLeft = '0';
      });
    }
    else {
      scrollEffect .articulos .forEach( ( articulo ) => {
        articulo .style .marginLeft = scrollEffect .desplazamientoEnY / 25 - 100 + '%';
      });
    }
    /* NOTA: 'offsetTop' Retorna la distancia del elemento actual respecto al borde superior del nodo padre ('offsetParent') */
  }
}

// Ejecuta el método inicial del objeto
scrollEffect .inicio();
