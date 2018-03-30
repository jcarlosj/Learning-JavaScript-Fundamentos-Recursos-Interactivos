/* Menú Móvil (RWD) */

// Objecto Implicito
var MenuMovil = {
  /* Atributos */
  btnMenu : null,
  menu: null,
  items: null,
  menuDesplegado: false,
  /* Metodo con el que se inicializan las funciones del menú */
  inicio : () => {
    this .btnMenu = document .querySelector( '#btn-movil-menu span' );          // Obtiene el elemento que representa el menú hamburguesa en el DOM
    this .menu = document .querySelector( 'nav' );                              // Obtiene el elemento que contiene la estructura del menú principal en el DOM
    this .items = document .querySelectorAll( 'nav ul li a' );                  // Obtiene cada uno de los elementos que representan los ítems del menú

    // Agrega evento 'click' al elemento del ícono del menú hamburguesa
    this .btnMenu .addEventListener( 'click', MenuMovil .mostrarMenu );

    // Recorre cada uno de los ítems del Menú
    this .items .forEach( ( item ) => {
      // Asigna evento 'click' a cada uno de los ítems del Menú
      item .addEventListener( 'click', MenuMovil .ocultarMenu );
    });
  },
  /* Función que despliega el menú oculto (Crea un evento Evento Toogle: intercambio de estado entre dos valores) */
  mostrarMenu : () => {
    // Valida si el menú no esta desplegado
    if( !this .menuDesplegado ) {
        this .menuDesplegado = true;                                            // Cambia el estado
        this .menu .className = 'col-lg-6 col-md-7 col-sm-8 col-xs-12';         // Modifica la última clase para que se despliegue el menú oculto en pantallas pequeñas
    }
    else {
      this .menuDesplegado = false;                                             // Cambia el estado
      this .menu .className = 'col-lg-6 col-md-7 col-sm-8 col-xs-0';            // Modifica la última clase para que se oculte el menú en pantallas pequeñas
    }
    console .log( 'Menú desplegado: ', this .menuDesplegado );
  },
  /* Función que oculta el menú cuando se ha hecho 'click' en cada ítem del menú */
  ocultarMenu : () => {
    /* Si el tamaño de la ventana es menor a 768px
       Crea un nuevo MediaQuery desde JavaScript de acuerdo al 'mediaQueryString' que se le pasa para crear la regla, en este caso '( min-width : 767px )'
      'window.matchMedia' Retorna un nuevo objeto MediaQuerylist. */
    if( window .matchMedia( '(max-width:767px)') .matches ) {
      this .menuDesplegado = false;                                             // Cambia el estado
      this .menu .className = 'col-lg-6 col-md-7 col-sm-8 col-xs-0';            // Modifica la última clase para que se oculte el menú en pantallas pequeñas
    }
  }
}

// Ejecuta el método inicial del objeto
MenuMovil .inicio();
