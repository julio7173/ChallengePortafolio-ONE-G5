// Obtener una referencia al formulario y a los campos de entrada
let formulario = document.querySelector("[data-formulario]");
let campos = formulario.elements; // Obtiene todos los elementos del formulario
let error = document.getElementsByClassName("error"); // Obtiene todos los elementos con la clase error
let enviar = document.querySelector("[data-type='enviar']"); // Obtiene el elemento con el atributo data-type='enviar'

// Función para validar si un campo está vacío
function validarVacio(campo) {
  // Si el valor del campo es una cadena vacía
  if (campo.value.trim() === "") {
    // Devolver false, indicando que el campo si está vacío
    return false;
  }// Si el valor del campo no es una cadena vacía
  else {
    // Devolver true, indicando que el campo no está vacío
    return true;
  }
}

// Función para validar el número de caracteres de un campo
function validarCaracteres(campo, min, max) {
  // Si el valor del campo tiene menos caracteres que el mínimo
  if (campo.value.length < min) {
    return "El mínimo de caracteres es de " + min;
  }
  // Si el valor del campo tiene más caracteres que el máximo
  if (campo.value.length > max) {
    return "El máximo de caracteres es de " + max;
  }
  return "";
}

// Función para validar el formato de correo electrónico de un campo
function validarCorreo(campo) {
  // Definir una expresión regular para comprobar el formato de correo electrónico
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // Si el valor del campo no coincide con la expresión regular
  if (!regex.test(campo.value)) {
    return "Debe contener el símbolo '@' seguido de su proveedor y un punto";
  }
  return "";
}

function validarCampo(campo, i) {
  /* Esta función recibe un campo del formulario y su índice
     y aplica las validaciones correspondientes según el tipo de campo*/
  let mensaje = ""; // Almacena el mensaje de error si lo hay
  if (!validarVacio(campo)) {
    mensaje = "Este campo no puede estar en blanco o vacío";
  } else {
    switch (campo.dataset.type) {
      case "nombre":
        mensaje = validarCaracteres(campo, 20, 80);
        break;
      case "email":
        mensaje = validarCorreo(campo);
        break;
      case "asunto":
        mensaje = validarCaracteres(campo, 20, 50);
        break;
      case "mensaje":
        mensaje = validarCaracteres(campo, 50, 300);
        break;
      default:
        break;
    }
  }
  if (mensaje !== "") {
    // Si hay un mensaje de error, lo muestra en el elemento span correspondiente
    error[i].textContent = mensaje;
    error[i].style.color = "#FFFFFF";
    error[i].style.marginBottom = "10px";
  } else {
    // Si no hay un mensaje de error, oculta el elemento span
    error[i].textContent = "";
    error[i].style.marginBottom = "0";
  }
}

for (let i = 0; i < campos.length - 1; i++) {
  // Recorre todos los campos del formulario menos el botón de enviar
  campos[i].addEventListener("blur", function () {
    // Añade un evento blur a cada campo para validar cuando pierde el foco
    validarCampo(campos[i], i); // Llama a la función validarCampo con el campo y su índice
  });
}


function habilitarEnviar() {
  // Comprueba si todos los campos están rellenos
  let todosLlenos = true;
  for (let i = 0; i < campos.length; i++) {
  if (campos[i].value.trim() === "") {
  todosLlenos = false;
  break;
  }
  }
  
  // Si todos los campos están rellenos, habilita el botón Enviar y cambia el color a rojo
  if (todosLlenos) {
  enviar.disabled = false;
  enviar.style.width = "500px";
  enviar.style.color = "gold";
  } else {
  enviar.disabled = true;
  }
  }
  
  // Añade un evento blur a cada campo para habilitar el botón Enviar cuando todos los campos estén rellenos
  for (let i = 0; i < campos.length; i++) {
  campos[i].addEventListener("blur", habilitarEnviar);
  }