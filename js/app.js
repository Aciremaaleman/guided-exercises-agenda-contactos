
  //Traer elementos del HTML
  var $name = $("#name-input");
  var $phone = $("#phone-input");
  var contacs = []; // esta variable se declara vacia para almacenar los datos de los inputs

  var loadPage = function () {
    $('.modal').modal();

    $name.keyup(validateContact);//el metodo keyup detecta la presion del teclado es decir el ingreso de caracteres
    $phone.keyup(validateContact);
    $("#form").submit(addContact); //
    $("#searcher").keyup(filterContact);
  };

  var validateContact = function () {
    //En esta funcion tenemos que validar que el usuario ingrese datos y no valores vacios
    //this es el elemento que detona el evento ya sea phone-input o name-input
    if($(this).val().trim().length > 0) {
      $('#add-contact').removeAttr('disabled') //quita el atributo desabilitado cuando length es mayor que 0 es decir cuando se han ingresado caracteres al input
    } else {
      $('#add-contact').attr('disabled',true) //si se no se han ingresado caracteres se mantiene deshabilitado
    }
  };

  var addContact = function (e) {
    e.preventDefault(); //el evento submit por default recarga la pagina y corta el flujo del codigo, eso se corrige con .preventDefault
    //Las siguientes lineas toman el valor que el usuario agrega en los inputs y los guardan en variables
    var newName =  $name.val(); //guarda en una variabble el valor de los inputs por medio del metodo .val
    var newPhone = $phone.val();

    //Con las variables separadas que obtuvimos creamos una estructura de datos unica, un objeto por cada contacto
      var contact= {  // guarda en una variable la estructura de datos en forma de arreglo de objetos
        "name" : newName,
        "phone" : newPhone
      }

    /*Agregamos el contacto a nuestra data (arreglo declarado) para poderla filtrar y eliminar posteriormente*/
       contacs.push(contact); //crea un arreglo de objetos. El metodo push agrega un elemento al final de un arreglo

    //La siguiente funcion se encarga de pintar los contactos en el html
     paintContactsInHTML(contact);


    /* Limpiando valores de formulario*/
      // $name.val(" ");
      // $phone.val(" ");
      $("#form")[0].reset(); //es para limpiar los datos de los inputs
      $('.modal').modal('close');
  };

  var paintContactsInHTML = function(contact) {

    /* Crear elementos con DOM html al publicar contacto */
    var $newContact = $('<article />', {'class' : 'card-panel hoverable'});
    var $nameContact = $('<h4 />');
    var $deleteContactBtn = $('<button type="button" />');
    var $removeIcone = $('<i />', {'class' : 'material-icons'});
    var $phoneContact = $('<p />');

    //Asignando atributos y/o eventos
     $deleteContactBtn.addClass('btn right');
     $removeIcone.text('delete');
     $deleteContactBtn.click(removeContact);


    /* Asignando valores a los elementos*/
    $deleteContactBtn.append($removeIcone);
    $nameContact.append(contact.name);
    $phoneContact.append(contact.phone);


    //Agregamos lo que creamos con el DOM a un elemento existente del HTML
    $newContact.append($nameContact);
    $newContact.append($deleteContactBtn);
    $newContact.append($phoneContact);

    $('#publish-contacts').prepend($newContact);
  };




  var filterContacts = function() {
    //Esta funcion debe de filtrar la data segun el valor que el usuario ingrese en el input de busqueda
    var searchContact= $("#searcher").val().toLowerCase();

    if ($("#searcher").val().trim().length > 0) {
      var filtederedContacts = contacts.filter(function(contact) {
        return contact.name.toLowerCase().indexOf(searchContact) > 0;
      });
      $("#publish-contacs").empty();
      filtederedContacts.forEach(function(contact){
      paintContactsInHTML(contact);
    });
  } else {
    $("#publish-contacs").empty();
    filtederedContacts.forEach(function(contact){
    paintContactsInHTML(contact);
    });
  }


  };


  var removeContact = function () {
    //esta funcion como primer alcance debe de poer borrar la tarjeta que se crea desde el DOM
    //como segundo alcance borrar el elemento de la data
  };




  $(document).ready(loadPage);
