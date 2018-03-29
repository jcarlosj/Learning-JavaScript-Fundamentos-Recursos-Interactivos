/* Formulario */

// Objeto Implicito
var formulario = {
  /* Atributos */
  campos_texto: null,
  valor_campo_texto: null,
  regExp: null,
  validaUsuario: false,
  validaClave: false,
  validaEmail: false,
  validaTerminosYCondiciones: false,
  id: null,
  btnEnviar: null,
  /* Función que inicializa la funcionalidad del Formulario */
  inicio : function() {
    formulario .campos_texto = document .querySelectorAll( '#formulario-home input.campos_texto' );     // Obtiene todos los campos input donde se ingresa texto
    formulario .id = document .querySelector( '#formulario-registro' );                                 // Obtiene el elemento 'form' del formulario a través de su ID.
    formulario .btnEnviar = document .querySelector( '#btn-enviar' );                                   // Obtiene el elemento 'button' del formulario a través de su ID.

    // Evento al elemento 'button' del formulario
    formulario .btnEnviar .addEventListener( 'click', formulario .validaFormulario );

    // Limpia los campos
    formulario .id .reset();

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
  /* Función que realiza validacion de los campos cuando se producen cambios en los valores del formulario */
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
      // Valida si la entrada del campo 'nombre' es válida
      if( event .target .id == 'nombre' ) {
        // Valida que la longitud del valor sea inferior a 2 ni mayor a 6 caracteres
        if( valor_campo_texto .length < 2 || valor_campo_texto .length > 6 ) {
          // Agrega elemento que lanza mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .innerHTML = '<span style="color: red;"> * Error: El nombre de usuario debe tener entre 2 y 6 caracteres</span>';
          formulario .validaUsuario = false;        // Cambia el estado de validación del campo
        }
        else {
          // Elimina elemento que contiene el mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .parentNode .removeChild( document .querySelector( `[for=${ event .target .id }] .error` ) );
          formulario .validaUsuario = true;         // Cambia el estado de validación del campo
        }
      }

      // Valida si la entrada del campo 'clave' es válida
      if( event .target .id == 'clave' ) {
        // Implemento una expresión regular que me permita filtrar una cadena de texto adecuada para el formato de contraseña.
        formulario .regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

        // Valida si la expresión regular no se cumple
        if( !formulario .regExp .test( valor_campo_texto ) ) {
          // Hay un error en el formato de la contraseña
          document .querySelector( `[for=${ event .target .id }] .error` ) .innerHTML = '<span style="color: red;"> * Error: La contraseña debe tene mínimo 8 caracteres e incluir: letras mayúsculas, minúsculas y números</span>';
          formulario .validaClave = false;          // Cambia el estado de validación del campo
        }
        else {
          // Elimina elemento que contiene el mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .parentNode .removeChild( document .querySelector( `[for=${ event .target .id }] .error` ) );
          formulario .validaClave = true;           // Cambia el estado de validación del campo
        }
      }

      // Valida si la entrada es válida
      if( event .target .id == 'email' ) {
        // Implemento una expresión regular que me permita filtrar una cadena de texto adecuada para el formato de correo electrónico.
        formulario .regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        // Valida si la expresión regular no se cumple
        if( !formulario .regExp .test( valor_campo_texto ) ) {
          // Hay un error en el formato de la contraseña
          document .querySelector( `[for=${ event .target .id }] .error` ) .innerHTML = '<span style="color: red;"> * Error: La cadena de texto introducida no es un correo electrónico válido</span>';
          formulario .validaEmail = false;          // Cambia el estado de validación del campo
        }
        else {
          // Elimina elemento que contiene el mensaje de ERROR
          document .querySelector( `[for=${ event .target .id }] .error` ) .parentNode .removeChild( document .querySelector( `[for=${ event .target .id }] .error` ) );
          formulario .validaEmail = true;           // Cambia el estado de validación del campo
        }
      }
    }
    else {
      /* Si el campo está vacío */
      // Elimina elemento que contiene el mensaje de ERROR
      document .querySelector( `[for=${ event .target .id }] .error` ) .parentNode .removeChild( document .querySelector( `[for=${ event .target .id }] .error` ) );
    }
  },
  /* Función que valida el Formulario antes de ser enviado */
  validaFormulario : function ( event ) {

    formulario .validaTerminosYCondiciones = document .querySelector( '#terminos' ) .checked;

    console .group( 'Valida Formulario para envio de los datos' );
      console .log( 'usuario: ', formulario .validaUsuario );
      console .log( 'contraseña: ', formulario .validaClave );
      console .log( 'email: ', formulario .validaEmail );
      console .log( 'terminos: ', formulario .validaTerminosYCondiciones );
    console .groupEnd();

    // Valida si los campos obligatorios del formulario NO han sido validados correctamente
    if( !formulario .validaUsuario || !formulario .validaClave || !formulario .validaEmail ) {
      event .preventDefault();                      // Evitamos que los eventos predeterminados se disparen, en nuestro caso el submit
      console .log( 'Error Campos' );
      document .querySelector( '#mensaje-formulario' ) .innerHTML = '<span style="color: red;">El formulario posee errores, favor revise de nuevo!</span>';
    }
    // Valida si NO ha checado el campo donde se ACEPTAN los "Términos y condiciones" del formulario
    else if( !formulario .validaTerminosYCondiciones ) {
      event .preventDefault();                      // Evitamos que los eventos predeterminados se disparen, en nuestro caso el submit
      console .log( 'No acepto términos y condiciones' );
      document .querySelector( '#mensaje-formulario' ) .innerHTML = '<span style="color: red;">Debe aceptar los términos y condiciones para poder enviar sus datos</span>';
    }
    else {
      console .log( 'Envia los datos' );
      document .querySelector( '#mensaje-formulario' ) .innerHTML = '<span>Los datos han sido enviados</span>';
    }

  }
}

// Ejecuta el método inicial del objeto
formulario .inicio();
