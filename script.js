const d = document;
const textArea = d.querySelector(".formulario__input"); 
const ImagenMuñeco = d.querySelector(".resultado__Muñeco");
const ResultadoTitulo = d.querySelector(".resultado__title");        
const ResultadoTexto = d.querySelector(".resultado__texto");
const BotonEncriptar = d.querySelector(".form__btn");
const BotonDesencriptar = d.querySelector(".form__btn--segundary");
const BotonCopiar = d.querySelector(".resultado__btn");
const ResultadoInstruccion = d.querySelector(".resultado__instruccion")

const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"]
];

// Función para encriptar el mensaje
function encriptarmensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1]; 
        break;
      }
    }
    mensajeEncriptado += encriptada;
  }
  return mensajeEncriptado;
}

// Función para desencriptar el mensaje
function DesencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;
  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], 'g');
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
  }
  return mensajeDesencriptado;
}

// Función para mostrar solo el resultado
function mostrarSoloResultado() {
  ImagenMuñeco.style.display = "none";
  ResultadoTitulo.style.display = "none";
  ResultadoInstruccion.style.display = "none";
  BotonCopiar.classList.remove("hidden");
}

// Función para validar el texto ingresado
function validarTexto(texto) {
  const regex = /^[a-z\s]+$/; // Solo letras minúsculas y espacios
  return regex.test(texto);
}

// Evento para encriptar el mensaje
BotonEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textArea.value;

  // Validar el texto antes de encriptar
  if (!validarTexto(mensaje)) {
    alert("El texto ingresado solo debe contener letras minúsculas sin acentos ni caracteres especiales.");
    return; // No hacer nada más si el texto no es válido
  }

  mensaje = mensaje.toLowerCase();
  let mensajeEncriptado = encriptarmensaje(mensaje);
  ResultadoTexto.textContent = mensajeEncriptado;
  textArea.value = ""; // Limpiar el área de texto
  mostrarSoloResultado();
});

// Evento para desencriptar el mensaje
BotonDesencriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textArea.value;

  // Validar el texto antes de desencriptar
  if (!validarTexto(mensaje)) {
    alert("El texto ingresado solo debe contener letras minúsculas sin acentos ni caracteres especiales.");
    return; // No hacer nada más si el texto no es válido
  }

  mensaje = mensaje.toLowerCase();
  let mensajeDesencriptado = DesencriptarMensaje(mensaje);
  ResultadoTexto.textContent = mensajeDesencriptado;
  textArea.value = ""; // Limpiar el área de texto
  mostrarSoloResultado();
});

/*BotonCopiar.addEventListener('click', () => {
  let textoCopiado = ResultadoTexto.textContent;

  // Copia el texto al portapapeles
  navigator.clipboard.writeText(textoCopiado).then(() => {
    // Mostrar la imagen del muñeco
    ImagenMuñeco.style.display = "block";

    // Mostrar el título y texto de resultado
    ResultadoTitulo.style.display = "block";
    ResultadoTitulo.textContent = "Ningún mensaje fue encontrado";
    ResultadoTexto.style.display = "block";
    ResultadoTexto.textContent = "";
    ResultadoInstruccion.style.display = "block";
    ResultadoInstruccion.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
    
    // Ocultar el botón de copiar
    BotonCopiar.classList.add("hidden");
  }).catch(err => {
    console.error('Error al copiar al portapapeles: ', err);
  });
});*/


BotonCopiar.addEventListener('click', () => {
  let textoCopiado = ResultadoTexto.textContent;

  // Copia el texto al portapapeles
  navigator.clipboard.writeText(textoCopiado).then(() => {
    // Si no es pantalla pequeña, mostrar la imagen del muñeco
    if (!esPantallaPequeña()) {
      ImagenMuñeco.style.display = "block";
    } else {
      ImagenMuñeco.style.display = "none";
    }

    // Mostrar el título y texto de resultado
    ResultadoTitulo.style.display = "block";
    ResultadoTitulo.textContent = "Ningún mensaje fue encontrado";
    ResultadoTexto.style.display = "block";
    ResultadoTexto.textContent = "";
    ResultadoInstruccion.style.display = "block";
    ResultadoInstruccion.textContent = "Ingresa el texto que desees encriptar o desencriptar.";

    // Ocultar el botón de copiar
    BotonCopiar.classList.add("hidden");
  }).catch(err => {
    console.error('Error al copiar al portapapeles: ', err);
  });
});

// Función para verificar si la pantalla es pequeña
function esPantallaPequeña() {
  return window.innerWidth < 768;
}


