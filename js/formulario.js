/* Formulario */

// Objeto Implicito
var formulario = {
  /* Atributos */
  campos_texto: null,
  valor_campo_texto: null,
  inicio : function() {
    formulario .campos_texto = document .querySelectorAll( '#formulario-home input.campos_texto' );     // Obtiene todos los campos input donde se ingresa texto

    // Recorre y aplica el evento 'focus' a cada uno de los campos obtenidos
    formulario .campos_texto .forEach( ( entrada ) => {
      entrada .addEventListener( 'focus', formulario .campoEnFoco );            // 'blur' evento que se dispara cuando un campo ha recibido su foco
      entrada .addEventListener( 'blur', formulario .campoFueraFoco );          // 'blur' evento que se dispara cuando un campo ha perdido su foco
      entrada .addEventListener( 'change', formulario .cambiaEntradaCampo );    // 'change' evento que se dispara cuando un campo de tipo input, select o textarea han cambiado su valor
    });
  },
  /* Función que realiza una acción cuando el campo esta en foco */
  campoEnFoco : function( event ) {
    console .group( 'Foco en el campo con' );
      console .log( 'id: ', event .target .id );
      console .log( 'value: ', event .target .value );
    console .groupEnd();

    // Asigna el valor que tiene el campo
    valor_campo_texto = event .target .value;

    if( valor_campo_texto == '' ) {
      // Selecciona el elemento con el 'class': 'obligatorio' para que lo muestre si el campo esta vacío
      document .querySelector( `[for=${ event .target .id }] .obligatorio` ) .style .opacity = 1;
      document .querySelector( `#${ event .target .id }` ) .style .background = 'rgba( 255, 255, 0, .5 )';
    }

    // Crea elemento personalizado para los mensajes de error
    document .querySelector( `[for=${ event .target .id }]` ) .appendChild( document .createElement( 'div' ) ) .setAttribute( 'class', 'error' );
  },
  /* Función que realiza una acción cuando el campo esta en foco */
  campoFueraFoco : function( event ) {
    console .group( 'Pierde Foco en el campo con' );
      console .log( 'id: ', event .target .id );
      console .log( 'value: ', event .target .value );
    console .groupEnd();

    // Asigna el valor que tiene el campo
    valor_campo_texto = event .target .value;

    // Selecciona el elemento con el 'class': 'obligatorio' para que lo muestre si el campo esta vacío
    document .querySelector( `[for=${ event .target .id }] .obligatorio` ) .style .opacity = 0;
    document .querySelector( `#${ event .target .id }` ) .style .background = 'white';

  },
  cambiaEntradaCampo : function( event ) {
    console .group( 'Pierde Foco en el campo con' );
      console .log( 'id: ', event .target .id );
      console .log( 'value: ', event .target .value );
    console .groupEnd();

    // Asigna el valor que tiene el campo
    valor_campo_texto = event .target .value;

    // Valida que el campo no esté vacío
    if( valor_campo_texto != '' ) {
      console .log( 'No esta vacio' );
      // Valida si la entrada es válida
      if( event .target .id == 'nombre' ) {
        // Valida que la longitud del valor sea inferior a 2 ni mayor a 6 caracteres
        if( valor_campo_texto .length < 2 || valor_campo_texto .length > 6 ) {
          // Agrega elemento que lanza mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .innerHTML = '<span style="color: red;"> * Error: El nombre de usuario debe tener entre 2 y 6 caracteres</span>';
        }
        else {
          // Elimina elemento que contiene el mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .parentNode .removeChild( document .querySelector( `[for=${ event .target .id }] .error` ) );
        }
      }

      // Valida si la entrada es válida
      if( event .target .id == 'clave' ) {
        // Valida que la longitud del valor sea inferior a 8 ni mayor a 16 caracteres
        if( valor_campo_texto .length < 8 || valor_campo_texto .length > 16 ) {
          // Agrega elemento que lanza mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .innerHTML = '<span style="color: red;"> * Error: El nombre de usuario debe tener entre 8 y 16 caracteres</span>';
        }
        else {
          // Elimina elemento que contiene el mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .parentNode .removeChild( document .querySelector( `[for=${ event .target .id }] .error` ) );
        }
      }

      // Valida si la entrada es válida
      if( event .target .id == 'email' ) {

      }

    }
  }
}

// Ejecuta el método inicial del objeto
formulario .inicio();
