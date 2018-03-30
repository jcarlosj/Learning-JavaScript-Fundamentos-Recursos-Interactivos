/* Menú Móvil (RWD) */

// Objecto Implicito
var MenuMovil = {
  /* Atributos */
  btnMenu : null,
  menuDesplegado: false,
  /* Metodo con el que se inicializan las funciones del menú */
  inicio : () => {
    this .btnMenu = document .querySelector( '#btn-movil-menu span' );          // Obtiene el elemento que representa el menú hamburguesa en el DOM

    // Agrega evento 'click' al elemento del ícono del menú hamburguesa
    this .btnMenu .addEventListener( 'click', MenuMovil .mostrarMenu );
  },
  /* Función que despliega el menú oculto (Crea un evento Evento Toogle: intercambio de estado entre dos valores) */
  mostrarMenu : () => {
    // Valida si el menú no esta desplegado
    if( !this .menuDesplegado ) {
        this .menuDesplegado = true;
    }
    else {
      this .menuDesplegado = false;
    }
    console .log( 'Menú desplegado: ', this .menuDesplegado );
  }
}

// Ejecuta el método inicial del objeto
MenuMovil .inicio();
