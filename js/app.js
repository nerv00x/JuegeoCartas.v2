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

const informacionIslas = {
  "./file/imagenes/Charcotacoron-Elhierro.jpg": {
    nombre: "El Hierro",
    informacion: "El Hierro es la isla más occidental y meridional de las Islas Canarias. Es conocida por su biodiversidad y entorno natural."
  },
  "./file/imagenes/LaGraciosaG.png": {
    nombre: "La Graciosa",
    informacion: "La Graciosa es una isla situada al norte de Lanzarote. Destaca por sus playas de arena blanca y aguas cristalinas."
  },
  "./file/imagenes/LaMacetaelHierro.jpg": {
    nombre: "La Maceta",
    informacion: "La Maceta es una formación rocosa en la costa de El Hierro. Es un lugar emblemático para disfrutar de la naturaleza."
  },
  "./file/imagenes/LaPalma.jpg": {
    nombre: "La Palma",
    informacion: "La Palma es conocida como la 'Isla Bonita'. Destaca por su naturaleza exuberante y el Observatorio Astrofísico."
  },
  "./file/imagenes/LaPalma2.jpg": {
    nombre: "La Palma",
    informacion: "La Palma es una isla rica en contrastes paisajísticos, desde playas hasta bosques y montañas impresionantes."
  },
  "./file/imagenes/LaurisilvaLaGomera.png": {
    nombre: "La Gomera",
    informacion: "La Gomera es famosa por su bosque de laurisilva, un ecosistema único y Patrimonio de la Humanidad."
  },
  "./file/imagenes/PlayaCofeteFTV.png": {
    nombre: "Playa de Cofete",
    informacion: "La Playa de Cofete es una de las playas más extensas y vírgenes de Fuerteventura. Ofrece un paisaje salvaje y bello."
  },
  "./file/imagenes/RoqueNubloGC.png": {
    nombre: "Roque Nublo",
    informacion: "El Roque Nublo es un símbolo de Gran Canaria. Es un monumento natural y punto de referencia para senderistas."
  },
  "./file/imagenes/TeideTNF.png": {
    nombre: "El Teide",
    informacion: "El Teide es un volcán situado en Tenerife y el punto más alto de España. Ofrece vistas espectaculares desde la cima."
  },
  "./file/imagenes/TimanfayaLNZ.png": {
    nombre: "Parque Nacional de Timanfaya",
    informacion: "El Parque Nacional de Timanfaya en Lanzarote es un paisaje volcánico impactante y un lugar de interés geológico."
  },
  // Puedes seguir añadiendo más entradas para cada imagen con su información
};


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

function mostrarModal(imagen) {
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-img');
  const modalClose = document.querySelector('.modal-close');

  // Obtener la información de la isla basada en la imagen
  const islaInfo = informacionIslas[imagen];

  // Verificar si se encontró información para esa imagen
  if (islaInfo) {
    modalImg.src = imagen;
    modal.querySelector('.isla-nombre').textContent = islaInfo.nombre;
    modal.querySelector('.informacion').textContent = islaInfo.informacion;

    modal.style.display = 'block';

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  } else {
    // Si no se encontró información para la imagen, muestra un mensaje genérico
    modal.querySelector('.isla-nombre').textContent = "Nombre de la Isla";
    modal.querySelector('.informacion').textContent = "Información sobre la Isla no disponible";

    modal.style.display = 'block';

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
}

function compararCartas() {
  intentos++;

  // Actualiza el contador de intentos en el elemento HTML
  intentosElement.textContent = intentos;

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

    mostrarModal(imgPrimeraCarta); // Mostrar el modal con la imagen acertada

    if (parejasResueltas === numeroCartas / 2) {
      mostrarMensajeVictoria();
    }
    reiniciarCartas();
  } else {
    ocultarCartasDesiguales();
  }
}

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
  const mensajeVictoria = document.querySelector(".victoria-mensaje");
  mensajeVictoria.style.display = "block"; // Muestra el mensaje de victoria
}

// Resto de la lógica para la ventana modal, gestión de tiempo y localStorage

// Ejecutar la función para iniciar el juego
iniciarJuego();
