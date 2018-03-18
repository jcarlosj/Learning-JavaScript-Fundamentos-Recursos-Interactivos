/* Mouse Effect */

// Objecto Implicito
var mouseEffect = {
  /* Atributos */
  zona: null,
  figures: null,
  x: 0,
  y: 0,
  horizontal: true,
  vertical: true,
  /* Inicializa las funcionalidades de la Galeria */
  inicio : function() {
    mouseEffect .zona = document .querySelector( '#mouse-effect' );               // Obtiene el elemento con el 'id' : 'mouse-effect'
    mouseEffect .figures = document .querySelectorAll( '#mouse-effect figure' );  // Obtiene todos los elementos 'figure' contenidos dentro del elemento con 'id' : 'mouse-effect'

    mouseEffect .addImages();// Agrega las imágenes al DOM dentro de cada uno de los elementos 'figure'

    // 'mousemove' aplica este evento para detectar el movimiento dentro del elemento con 'id' : 'mouse-effect' en el DOM
    mouseEffect .zona .addEventListener( 'mousemove', mouseEffect .mover );
  },
  mover : function( event ) {
    // Obtiene las coordenadas X y Y del puntero
    mouseEffect .x = event .offsetX;
    mouseEffect .y = event .offsetY;

    // Recorre cada uno de los elementos 'figure'
    mouseEffect .figures .forEach( ( figure, index ) => {

      // Valida si esta permitido el movimiento horizontal
      if( mouseEffect .horizontal ) {
        figure .style .left = -mouseEffect .x / ( index * 100 + 50 ) + '%';
      }

      // Valida si esta permitido el movimiento vertical
      if( mouseEffect .vertical ) {
        figure .style .top = mouseEffect .y / ( index * 100 + 50 ) + '%';
      }

    });

  },
  addImages : function() {
    // Recorre cada uno de los elementos 'figure'
    mouseEffect .figures .forEach( ( figure, index ) => {

      figure .innerHTML = `<img src="images/mouse_effect/plano0${ index }.png">`;   // Agrega el elemento 'img' con el path de cada una de las imágenes a elemento 'figure'
      figure .style .zIndex = -index;                                               // Define el orden de cada una de las imagenes como capas para superponeras unas sobre las otras en un orden adecuado

      setTimeout( () => {
        // Calcula la altura de la imágen y asigna la altura real de la imagen dinámicamente
        //console .log( 'Altura imagen: ', figure .style .height = figure .childNodes[ 0 ] .height + 'px' );
        figure .style .height = figure .childNodes[ 0 ] .height + 'px';             // Aplica la altura a cada elemento 'figure' que contiene cada una de las imágenes
        figure .parentNode .style .height = figure .childNodes[ 0 ] .height + 'px'; // Aplica la altura a el elemento padre de los elementos 'figure' (Elemento con 'id' : 'mouse-effect')
      }, 50 );
      /* NOTA : Debemos esperar a que todos los elementos del DOM incluidas las imagenes para poder calcular su altura de lo contrario
                no será posible, pues no existiran cuando se realice el calculo. Por eso se usa un temporizador. Otra forma de hacerlo
                es usar 'window .onload' para calcular la altura de la imágen solo cuando todo el DOM este cargado */

    });

  }
}

// Ejecuta el método inicial del objeto
mouseEffect .inicio();
