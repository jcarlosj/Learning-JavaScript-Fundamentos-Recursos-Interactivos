/* Scroll Effect */

// Objecto implicito
var scrollEffect = {
  /* Atributos */
  desplazamientoEnY: 0,
  articulos: null,
  elementScrollEffect: null,
  elementHeader: null,
  enlacesMenu: null,
  path: null,
  intervaloScroll: null,
  destinoScroll: 0,
  paddingEncabezadoSeccion: 0,
  /* Inicializa las funcionalidades del 'Efecto Scroll' */
  inicio : function() {
    scrollEffect .elementHeader = document .querySelector( 'header' );                  // Obtiene el elemento 'header' del DOM
    scrollEffect .enlacesMenu = document .querySelectorAll( 'header nav ul li a' );    // Obtiene todos los elementos 'a' del menú principal del DOM
    scrollEffect .elementScrollEffect = document .querySelector( '#scroll-effect' );    // Obtiene el elemento con 'id':'scroll-effect'
    scrollEffect .articulos = document .querySelectorAll( '#scroll-effect article' );   // Obtiene todos los elementos 'article' contendos en el elemento con 'id':'scroll-effect'

    // 'scroll' aplica este evento para detectar el Scroll del Mouse sobre el DOM
    document .addEventListener( 'scroll', scrollEffect .parallaxEffect );

    // Recorre cada enlace para asignarle un evento 'click' a cada uno
    scrollEffect .enlacesMenu .forEach( ( enlace ) => {
      enlace .addEventListener( 'click', scrollEffect .desplazamientoSeccion );
    });

  },
  /* Realiza el desplazamiento de sección dentro del DOM usando el Menú  */
  desplazamientoSeccion : function( event ) {
    event .preventDefault();                                                                // Elimino los eventos por defecto del navegador (No se desplaza el scroll)
    scrollEffect .path = event .target .getAttribute( 'href' );                             // Obtiene el atributo 'href' del elemento 'a' al que se le ha dado 'click'
    scrollEffect .destinoScroll = document .querySelector( scrollEffect .path ) .offsetTop - scrollEffect .paddingEncabezadoSeccion; // Obtiene la distancia desde el elemento que contiene la ruta de destino y su elemento padre (Su limite superior)
    /* NOTA: 'offsetTop' Retorna la distancia del elemento actual respecto al borde superior del nodo padre ('offsetParent') */

    console .log( 'Ruta ', scrollEffect .path );
    console .log( 'Límite superior ', scrollEffect .destinoScroll );

    // Creo un intervalo de tiempo para ejecutar el desplazamiento
    scrollEffect .intervaloScroll = setInterval( () => {
      // Valida si la posición del Scroll en el eje Y es  menos al límite superior del destino del Scroll
      if( scrollEffect .desplazamientoEnY < scrollEffect .destinoScroll ) {
        // Incremento 50 pixeles cada 50 milisegundos para que el scroll baje
        scrollEffect .desplazamientoEnY += 50;

        if( scrollEffect .desplazamientoEnY >= scrollEffect .destinoScroll ) {
          scrollEffect .desplazamientoEnY = scrollEffect .destinoScroll;
          clearInterval( scrollEffect .intervaloScroll );
          console .log( 'Llego al destino (bajaba)' );
        }
      }
      else {
        // Decremento 50 pixeles cada 50 milisegundos para que el scroll suba
        scrollEffect .desplazamientoEnY -= 50;

        if( scrollEffect .desplazamientoEnY <= scrollEffect .destinoScroll ) {
          scrollEffect .desplazamientoEnY = scrollEffect .destinoScroll;
          clearInterval( scrollEffect .intervaloScroll );
          console .log( 'Llego al destino (subia)' );
        }
      }

      // 'window.scrollTo' Desplaza el visor a un conjunto específico de coordenadas en el DOM
      window .scrollTo( 0, scrollEffect .desplazamientoEnY );
    }, 50 );    // 50 milisegundos

  },
  /* Implementa el Efecto Parallax a los artículos contenidos dentro del elemento 'scroll-effect' */
  parallaxEffect : function() {
    scrollEffect .desplazamientoEnY = window .pageYOffset;                              // 'window.pageYOffset' es un alias de 'scrollY' y devuelve al número de pixeles desplazados verticamente en el espacio del documento
    console .log( scrollEffect .desplazamientoEnY );

    // Valida si el deplazamiento es mayor al alto del elemento 'header' (Contenedor del: Logo y el Menú)
    if( scrollEffect .desplazamientoEnY > scrollEffect .elementHeader .clientHeight ) {
      scrollEffect .elementHeader .style .position = 'fixed';
      scrollEffect .elementHeader .style .zIndex = '10';
      /* Si el tamaño de la ventana es mayor a 768px agrega el padding (Corrección)
         Crea un nuevo MediaQuery desde JavaScript de acuerdo al 'mediaQueryString' que se le pasa para crear la regla, en este caso '( min-width : 767px )'
        'window.matchMedia' Retorna un nuevo objeto MediaQuerylist. */
      if( window .matchMedia( '(min-width:768px)' ) .matches ) {
          scrollEffect .paddingEncabezadoSeccion = scrollEffect .elementHeader .clientHeight;
      }
      else {
        scrollEffect .paddingEncabezadoSeccion = scrollEffect .elementHeader .clientHeight;
      }
    }
    else {
      scrollEffect .elementHeader .style .position = 'relative';
      scrollEffect .elementHeader .style .zIndex = '0';
      /* Si el tamaño de la ventana es mayor a 768px agrega el padding (Corrección)
         Crea un nuevo MediaQuery desde JavaScript de acuerdo al 'mediaQueryString' que se le pasa para crear la regla, en este caso '( min-width : 767px )'
        'window.matchMedia' Retorna un nuevo objeto MediaQuerylist. */
      if( window .matchMedia( '(min-width:768px)' ) .matches ) {
          scrollEffect .paddingEncabezadoSeccion = scrollEffect .elementHeader .clientHeight*2;
      }
      else {
        scrollEffect .paddingEncabezadoSeccion = scrollEffect .elementHeader .clientHeight;
      }
    }

    // Valida si el desplazamiento actual del 'scroll' es mayor a la distancia superior con su elemento padre
    if( scrollEffect .desplazamientoEnY > scrollEffect .elementScrollEffect .offsetTop - 200  ) {       // Elimina 200 pixeles de la altura superior con el elemento padre para queel desplazamiento ocurra más rápido
      scrollEffect .articulos .forEach( ( articulo ) => {
        articulo .style .marginLeft = '0';
      });
    }
    else {
      scrollEffect .articulos .forEach( ( articulo ) => {
        /* Si el tamaño de la ventana es mayor a 768px agrega el padding (Corrección)
           Crea un nuevo MediaQuery desde JavaScript de acuerdo al 'mediaQueryString' que se le pasa para crear la regla, en este caso '( min-width : 767px )'
          'window.matchMedia' Retorna un nuevo objeto MediaQuerylist. */
        if( window .matchMedia( '(min-width:768px)' ) .matches ) {
            articulo .style .marginLeft = scrollEffect .desplazamientoEnY / 22.8 - 100 + '%';
        }
      });
    }
    /* NOTA: 'offsetTop' Retorna la distancia del elemento actual respecto al borde superior del nodo padre ('offsetParent') */
  }
}

// Ejecuta el método inicial del objeto
scrollEffect .inicio();
