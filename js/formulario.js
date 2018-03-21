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

  }
}

// Ejecuta el método inicial del objeto
formulario .inicio();
