const game = document.querySelector(".container-game");
const info_close = document.querySelector(".info-close");
const modal_close = document.querySelector(".modal-close");
const jugabilidad = 2;
const solucion = document.querySelector(".solucion");
const info = document.querySelector(".info");
const intentosElement = document.querySelector(".intentos"); // Selecciona el elemento de los intentos

// Variables globales
const numeroCartas = 20;
let intentos = 0;
let parejasResueltas = 0;
let primeraCarta = null;
let segundaCarta = null;
let bloquearInput = false;
let tiempoModal;
let tiempoInterval = null;

// Listado de imágenes para las cartas
const imgs = [
  "./file/imagenes/Charcotacoron-Elhierro.jpg",
  "./file/imagenes/LaGraciosaG.png",
  "./file/imagenes/LaMacetaelHierro.jpg",
  "./file/imagenes/LaPalma.jpg",
  "./file/imagenes/LaPalma2.jpg",
  "./file/imagenes/LaurisilvaLaGomera.png",
  "./file/imagenes/PlayaCofeteFTV.png",
  "./file/imagenes/RoqueNubloGC.png",
  "./file/imagenes/TeideTNF.png",
  "./file/imagenes/TimanfayaLNZ.png",
];

const dorsos = [
  "./file/Dorso/DorsoComida.jpg",
  "./file/Dorso/DorsoComida2.jpg",
];

// Función para evitar parejas con la misma imagen
function obtenerParejasImagenes(imagenes, numeroCartas) {
  const imagenesParejas = imagenes.slice(0, numeroCartas / 2);
  return [...imagenesParejas, ...imagenesParejas];
}

// Lógica para el juego
// Lógica para el juego
function iniciarJuego() {
  const cartas = obtenerParejasImagenes(imgs, numeroCartas);
  cartas.sort(() => Math.random() - 0.5);

  const tablero = document.querySelector(".container-game");

  cartas.forEach((imagen, index) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.id = index;

    const imagenFrontal = document.createElement("img");
    imagenFrontal.src = "./file/Dorso/DorsoComida.jpg"; // Dorso como imagen inicial
    imagenFrontal.classList.add("frontal");

    const imagenTrasera = document.createElement("img");
    imagenTrasera.src = imagen;
    imagenTrasera.classList.add("trasera");

    carta.appendChild(imagenFrontal);
    carta.appendChild(imagenTrasera);

    tablero.appendChild(carta);

    carta.addEventListener("click", (e) => voltearCarta(e.currentTarget)); // Utilizamos currentTarget en lugar de target
  });
}

// Resto del código JavaScript
// ...
function voltearCarta(carta) {
  if (bloquearInput || carta.classList.contains("resuelta")) return;

  if (!primeraCarta) {
    primeraCarta = carta;
    mostrarCarta(primeraCarta);
  } else if (!segundaCarta && carta !== primeraCarta) {
    segundaCarta = carta;
    mostrarCarta(segundaCarta);
    bloquearInput = true;
    setTimeout(() => compararCartas(), 1000); // Espera 1 segundo antes de comparar
  }
}
function mostrarCarta(carta) {
  carta.classList.add("mostrar");
}

function ocultarCarta(carta) {
  carta.classList.remove("mostrar");
}

function openModal(imageUrl, islandName, islandInfo) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalInfo = document.getElementById("modalInfo");

  const decodedUrl = decodeURIComponent(
    imageUrl.replace('url("', "").replace('")', "")
  );
  modalImage.src = decodedUrl;

  // Agrega una clase a la imagen del modal
  modalImage.classList.add("modal-image");

  modalTitle.innerText = islandName;
  modalInfo.innerText = islandInfo;

  modal.style.display = "block";
}

// Función para cerrar la ventana modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function getIslandInfo(imageUrl) {
  const islandInfoMap = {
    "Charcotacoron-Elhierro.jpg": {
      name: "El Hierro",
      info: "El Hierro: Conocida por su compromiso con la sostenibilidad y la conservación del medio ambiente. Tiene un paisaje volcánico único y ha implementado políticas ecológicas y de energía renovable.",
    },
    "LaGraciosaG.png": {
      name: "La Graciosa",
      info: "La Graciosa: Es la isla más pequeña y se destaca por su ambiente tranquilo. No se permite el acceso de automóviles particulares, lo que contribuye a una atmósfera de paz. Es un lugar ideal para actividades de buceo y snorkel.",
    },
    "LaMacetaelHierro.jpg": {
      name: "La Maceta - El Hierro",
      info: "La Maceta es una formación costera única en la isla de El Hierro. Con su peculiar formación rocosa, es un lugar popular para los turistas y los amantes de la naturaleza. Sus piscinas naturales, esculpidas por la lava volcánica, ofrecen un entorno impresionante para nadar y relajarse. Este sitio es conocido por su belleza natural, que combina acantilados, aguas cristalinas y formaciones rocosas únicas, convirtiéndolo en un lugar destacado para visitar en la isla de El Hierro.",
    },
    "LaPalma.jpg": {
      name: "La Palma",
      info: 'Conocida como "La Isla Bonita", ofrece impresionantes paisajes, acantilados y una exuberante vegetación. Es famosa por ser uno de los mejores lugares del mundo para la observación de estrellas.',
    },
    "LaPalma2.jpg": {
      name: "La Palma",
      info: 'Conocida como "La Isla Bonita", ofrece impresionantes paisajes, acantilados y una exuberante vegetación. Es famosa por ser uno de los mejores lugares del mundo para la observación de estrellas.',
    },
    "LaurisilvaLaGomera.png": {
      name: "La Gomera",
      info: "Destacada por sus bosques subtropicales húmedos. La laurisilva, su exuberante vegetación, ha sido declarada Patrimonio de la Humanidad por la UNESCO..",
    },
    "PlayaCofeteFTV.png": {
      name: "Fuerteventura",
      info: "Famosa por sus playas de arena dorada y su paisaje volcánico. Gran parte de la isla ha sido declarada Reserva de la Biosfera debido a su singularidad ecológica.",
    },
    "RoqueNubloGC.png": {
      name: "Gran Canaria",
      info: "Destaca por sus Dunas de Maspalomas y el Parque Nacional de Garajonay. Posee una gran variedad de microclimas debido a su topografía diversa.",
    },
    "TeideTNF.png": {
      name: "Tenerife",
      info: "Alberga el Pico del Teide, el pico más alto de España y uno de los volcanes más grandes del mundo. Gran parte de la isla es Reserva de la Biosfera y sus aguas son ideales para la observación de ballenas y delfines.",
    },
    "TimanfayaLNZ.png": {
      name: "Lanzarote",
      info: "Conocida por su paisaje volcánico y lunar. El Parque Nacional de Timanfaya es uno de sus puntos destacados, creado por una serie de erupciones volcánicas.",
    },
  };
  console.log(islandInfoMap);

  const imageName = imageUrl.split("/").pop();
  const islandInfo = islandInfoMap[imageName];

  if (islandInfo) {
    return {
      name: islandInfo.name || "Nombre Desconocido",
      info: islandInfo.info || "Información no disponible.",
    };
  } else {
    return {
      name: "Nombre Desconocido",
      info: "Información no disponible.",
    };
  }
}

function compararCartas() {
  intentos++;

  // Actualiza el contador de intentos en el elemento HTML
  intentosElement.textContent = intentos;
  guardarIntentos(intentos);

  const idPrimeraCarta = parseInt(primeraCarta.dataset.id);
  const idSegundaCarta = parseInt(segundaCarta.dataset.id);

  if (idPrimeraCarta === idSegundaCarta) {
    reiniciarCartas();
    return;
  }

  const imgPrimeraCarta = primeraCarta.querySelector(".trasera").src;
  const imgSegundaCarta = segundaCarta.querySelector(".trasera").src;

  if (imgPrimeraCarta === imgSegundaCarta) {
    parejasResueltas++;
    primeraCarta.classList.add("resuelta"); // Marcar la primera carta como resuelta
    segundaCarta.classList.add("resuelta"); // Marcar la segunda carta como resuelta

    // Agregar una clase para resaltar las cartas acertadas
     primeraCarta.querySelector(".trasera").classList.add("carta-acertada");
        segundaCarta.querySelector(".trasera").classList.add("carta-acertada");

    const islandInfo = getIslandInfo(imgPrimeraCarta);
    openModal(imgPrimeraCarta, islandInfo.name, islandInfo.info); // Mostrar el modal con la imagen acertada

    if (parejasResueltas === numeroCartas / 2) {
      mostrarMensajeVictoria();
      detenerTiempo();
    }
    reiniciarCartas();
  } else {
    ocultarCartasDesiguales();
  }
}

function reiniciarPartida() {
  // Reiniciar todas las variables y elementos necesarios para iniciar el juego nuevamente
  intentos = 0;
  parejasResueltas = 0;
  primeraCarta = null;
  segundaCarta = null;
  bloquearInput = false;
  tiempoTranscurrido = 0;
  clearInterval(tiempoInterval); // Detener el intervalo de tiempo
  document.getElementById("tiempo").textContent = tiempoTranscurrido; // Reiniciar el contador de tiempo en pantalla
  intentosElement.textContent = intentos; // Reiniciar el contador de intentos en pantalla

  // Quitar el mensaje de victoria si está siendo mostrado
  const mensajeVictoria = document.querySelector(".victoria-mensaje");
  mensajeVictoria.style.display = "none";

  // Limpiar el tablero
  const tablero = document.querySelector(".container-game");
  tablero.innerHTML = "";

  // Volver a iniciar el juego
  iniciarJuego();
  tiempoInterval = setInterval(actualizarTiempo, 1000);
}

// Obtener el botón de reiniciar
const btnReiniciar = document.getElementById("btnReiniciar");

// Agregar un event listener para reiniciar la partida al hacer clic en el botón
btnReiniciar.addEventListener("click", reiniciarPartida);

function ocultarCartasDesiguales() {
  bloquearInput = true;
  tiempoModal = setTimeout(() => {
    ocultarCarta(primeraCarta);
    ocultarCarta(segundaCarta);
    reiniciarCartas();
  }, 1500); // Espera 2 segundos antes de ocultar las cartas desiguales
}

function reiniciarCartas() {
  primeraCarta = null;
  segundaCarta = null;
  bloquearInput = false;
}

function mostrarMensajeVictoria() {
  const mensaje = `¡Felicidades! Has resuelto todas las parejas en ${intentos} intentos y ${tiempoTranscurrido} segundos.`;
  alert(mensaje);
  reiniciarContadorTiempo();
  detenerTiempo();
}

// Función para obtener y mostrar el récord en pantalla
function mostrarRecord() {
  const recordExistente = JSON.parse(localStorage.getItem("record"));
  const intentosGuardados =
    parseInt(localStorage.getItem("intentosGuardados")) || 0;

  if (recordExistente) {
    const intentosRecord = recordExistente.intentos;
    const tiempoRecord = recordExistente.tiempoTotal;

    const recordHTML = document.querySelector(".record");
    recordHTML.innerHTML = ` <div><p id="recordInfo"> Mejor Record:</p></div>  <div id="intentos"> <p>Intentos: ${intentosGuardados}</p></div>  <div id="tiempo"> <p> Tiempo: ${tiempoRecord} segundos </p> </div>`;

    const recordInfo = document.getElementById("recordInfo");
    recordInfo.id = "recordInfo"; // Asignando el id al elemento creado dinámicamente
  } else {
    const recordHTML = document.querySelector(".record");
    recordHTML.innerHTML = `<div id="intentosGuardados"> <br> Intentos Guardados: ${intentosGuardados}</div>`;

    const intentosGuardadosEl = document.getElementById("intentosGuardados");
    intentosGuardadosEl.id = "intentosGuardados"; // Asignando el id al elemento creado dinámicamente
  }
}

let tiempoTranscurrido = 0;

// Función para actualizar el tiempo en pantalla
function actualizarTiempo() {
  tiempoTranscurrido++;
  document.getElementById("tiempo").textContent = tiempoTranscurrido;
}

// Ejemplo: actualización del tiempo cada segundo
tiempoInterval = setInterval(actualizarTiempo, 1000);

// Resto de tu código...

// Cuando termina el juego o en el momento adecuado, detén el intervalo
function detenerTiempo() {
  // const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000); // Calcula el tiempo transcurrido en segundos
  clearInterval(tiempoInterval); // Detiene el intervalo de tiempo
  clearInterval(tiempoModal); // Detiene el tiempo del modal si está en espera
  console.log(`Tiempo transcurrido: ${tiempoTranscurrido} segundos`);
  guardarTiempoRecord(tiempoTranscurrido);
}
function reiniciarContadorTiempo() {
  detenerTiempo(); // Detiene el tiempo si está en ejecución
  tiempo = 0; // Reinicia el tiempo a cero
  actualizarTiempo(); // Actualiza el tiempo en pantalla
}

function guardarTiempoRecord(tiempo, intentos) {
  const recordExistente = JSON.parse(localStorage.getItem("record"));

  if (!recordExistente || tiempo < recordExistente.tiempoTotal) {
    const record = {
      intentos: intentos,
      tiempoTotal: tiempo,
    };
    localStorage.setItem("record", JSON.stringify(record));
  }
}
function guardarIntentos(intentos) {
  localStorage.setItem("intentosGuardados", intentos);
}

// Ejecutar la función para mostrar el récord al cargar la página
window.onload = function () {
  mostrarRecord();
};
// Ejecutar la función para iniciar el juego
iniciarJuego();
