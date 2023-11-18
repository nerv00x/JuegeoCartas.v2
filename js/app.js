

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

const informacionIslas = [
  {
    url: "./file/imagenes/RoqueNubloGC.png",
    isla: "Gran Canaria: ",
    descripcion: "Uno de los puntos destacados de la isla son las Dunas de Maspalomas, un paisaje de dunas de arena que se extiende hasta el mar y se asemeja a un desierto. En el centro de la isla se encuentra el Parque Nacional de Garajonay, declarado Patrimonio de la Humanidad por la UNESCO. Es un bosque de laurisilva subtropical con una gran biodiversidad. La ciudad de Las Palmas, la capital de la isla, cuenta con un casco antiguo encantador con arquitectura colonial bien conservada, como la Casa de Colón.",
  },
  {
    url: "./file/imagenes/TimanfayaLNZ.png",
    isla: "Lanzarote: ",
    descripcion: "El Parque Nacional de Timanfaya es el parque nacional más destacado de la isla de Lanzarote, que forma parte de las Islas Canarias en España. Este parque nacional es famoso por su paisaje volcánico y lunar. Timanfaya se creó como resultado de una serie de erupciones volcánicas que ocurrieron entre 1730 y 1736, y aún se considera una zona geotérmica activa. En el Parque Nacional de Timanfaya, los visitantes pueden admirar una variedad de formaciones volcánicas, campos de lava, cráteres y cenizas.",
  }, {
    url: "./file/imagenes/Charcotacoron-Elhierro.jpg",
    isla: "El Hierro: ",
    descripcion: "El Hierro ha sido declarada Reserva de la Biosfera por la UNESCO debido a su compromiso con la sostenibilidad y la conservación del medio ambiente. La isla ha implementado políticas ecológicas y de energía renovable, incluyendo un innovador sistema de generación de energía a partir de fuentes renovables. El Sabinar es uno de los bosques de sabinas más antiguos de Europa. Estos árboles retorcidos por los vientos alisios son un elemento distintivo del paisaje de la isla.",
  },
  {
    url: "./file/imagenes/TeideTNF.png",
    isla: "Tenerife: ",
    descripcion: "Tiene el Pico del Teide que es el pico más alto de España y uno de los volcanes más grandes del mundo. El Parque Nacional del Teide es un destino imprescindible para los amantes de la naturaleza y ofrece una gran variedad de senderos y vistas panorámicas espectaculares. Gran parte de la isla ha sido declarada Reserva de la Biosfera por la UNESCO debido a su diversidad natural y sus esfuerzos de conservación. Las aguas alrededor de Tenerife son un lugar importante para la observación de ballenas y delfines.",
  },
  {
    url: "./file/imagenes/LaPalma.jpg",
    isla: "La Palma: ",
    descripcion: "La Palma se conoce comúnmente como 'La Isla Bonita' debido a su asombrosa belleza natural, que incluye impresionantes paisajes, acantilados y exuberante vegetación. La Palma es uno de los mejores lugares del mundo para la observación de estrellas, gracias a su cielo limpio y su baja contaminación lumínica. El Observatorio del Roque de los Muchachos es uno de los principales observatorios astronómicos del hemisferio norte.",
  },
  {
    url: "./file/imagenes/LaMacetaelHierro.jpg",
    isla: "El Hierro: ",
    descripcion: "El Hierro ha sido declarada Reserva de la Biosfera por la UNESCO debido a su compromiso con la sostenibilidad y la conservación del medio ambiente. La isla ha implementado políticas ecológicas y de energía renovable, incluyendo un innovador sistema de generación de energía a partir de fuentes renovables. El Sabinar es uno de los bosques de sabinas más antiguos de Europa. Estos árboles retorcidos por la acción de los vientos alisios son un elemento distintivo del paisaje de la isla.",
  },
  {
    url: "./file/imagenes/LaurisilvaLaGomera.png",
    isla: "La Gomera: ",
    descripcion: "La laurisilva es un bosque subtropical húmedo que se caracteriza por su exuberante vegetación, que incluye árboles perennes de hojas verdes brillantes, helechos, musgos y líquenes. Estos bosques suelen estar envueltos en niebla y reciben una cantidad significativa de lluvia, lo que contribuye a su biodiversidad. Ha sido declarado Patrimonio de la Humanidad por la UNESCO.",
  },
  {
    url: "./file/imagenes/LaPalma2.jpg",
    isla: "La Palma: ",
    descripcion: "La isla de La Palma, también conocida como 'La Isla Bonita', es famosa por su belleza natural y sus impresionantes paisajes volcánicos. Conocida por su observatorio astronómico, el Roque de los Muchachos ofrece una vista panorámica espectacular del cielo nocturno. El Parque Nacional de la Caldera de Taburiente presenta un cráter gigantesco y es un lugar popular para los entusiastas del senderismo.",
  },
  {
    url: "./file/imagenes/LaGraciosaG.png",
    isla: "La Graciosa: ",
    descripcion: "La Graciosa, ubicada en el archipiélago canario, es una isla de gran belleza natural y serenidad que forma parte del archipiélago Chinijo. Reconocida por sus playas de arenas blancas y aguas cristalinas, como la Playa de las Conchas o la Playa de la Francesa, ofrece un entorno paradisíaco para los amantes de la naturaleza y los deportes acuáticos. Con un ambiente tranquilo y pintoresco, el pueblo de Caleta del Sebo es el corazón de la isla, donde se puede disfrutar de su gastronomía local y la hospitalidad de sus habitantes."
  },
  {
    url: "./file/imagenes/PlayaCofeteFTV.png",
    isla: "Fuerteventura: ",
    descripcion: "Fuerteventura es famosa por sus impresionantes playas de arena dorada que se extienden a lo largo de la costa. Algunas de las más populares incluyen Playa de Corralejo, Playa de Sotavento y Playa de Cofete. Fuerteventura tiene un paisaje volcánico único, con vastas extensiones de lava petrificada que se asemejan a un desierto lunar. Gran parte de Fuerteventura ha sido declarada Reserva de la Biosfera por la UNESCO debido a su singularidad ecológica. Encontrarás una amplia variedad de ecosistemas desérticos.",
  }
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

function mostrarModal(imagen) {
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-img');
  const modalNombre = document.querySelector('.isla-nombre');
  const modalInformacion = document.querySelector('.informacion');
  const modalClose = document.querySelector('.modal-close-btn');

  console.log('Imagen recibida:', imagen); // Agregamos este console.log para verificar la URL recibida

  // Obtener la información de la isla basada en la imagen
  console.log('Imagen recibida:', imagen); // Verificamos la URL recibida


  // Obtener la información de la isla basada en la imagen
  const islaInfo = informacionIslas.find(isla => isla.url === imagen);

  console.log('Información de isla encontrada:', islaInfo); // Verificamos la información encontrada

  // Comparamos las rutas de las imágenes en los arreglos imgs e informacionIslas
  console.log('Imágenes de imgs:', imgs);
  console.log('Imágenes de informacionIslas:', informacionIslas.map(isla => isla.url));

  if (islaInfo) {
    console.log('Asignando información al modal...');
    modalImg.src = islaInfo.url;
    modalNombre.textContent = islaInfo.isla;
    modalInformacion.textContent = islaInfo.descripcion;

    modal.style.display = 'block';

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  } else {
    console.log('Información de isla no disponible');
    modalNombre.textContent = "Nombre de la Isla";
    modalInformacion.textContent = "Información sobre la Isla no disponible";

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
      detenerTiempo();
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
  reiniciarContadorTiempo()
}


// Función para obtener y mostrar el récord en pantalla
function mostrarRecord() {
  const recordExistente = JSON.parse(localStorage.getItem('record'));

  if (recordExistente) {
    const intentosRecord = recordExistente.intentos;
    const aciertosRecord = recordExistente.aciertos;
    const tiempoRecord = recordExistente.tiempoTotal;

    // Mostrar el récord en el HTML, por ejemplo:
    const recordHTML = document.querySelector('.record');
    recordHTML.innerHTML = `Mejor Record:<br>Intentos: ${intentosRecord}, Aciertos: ${aciertosRecord}, Tiempo: ${tiempoRecord} segundos`;
  }
}

let tiempoTranscurrido = 0;
let tiempoInterval;

// Función para actualizar el tiempo en pantalla
function actualizarTiempo() {
  tiempoTranscurrido++;
  document.getElementById('tiempo').textContent = tiempoTranscurrido;
}

// Ejemplo: actualización del tiempo cada segundo
tiempoInterval = setInterval(actualizarTiempo, 1000);

// Resto de tu código...

// Cuando termina el juego o en el momento adecuado, detén el intervalo
function detenerTiempo() {
  const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000); // Calcula el tiempo transcurrido en segundos
  clearInterval(tiempoModal); // Detiene el tiempo del modal si está en espera
  console.log(`Tiempo transcurrido: ${tiempoTranscurrido} segundos`);
  guardarTiempoRecord(tiempoTranscurrido);
}
function reiniciarContadorTiempo() {
  detenerTiempo(); // Detiene el tiempo si está en ejecución
  tiempo = 0; // Reinicia el tiempo a cero
  actualizarTiempo(); // Actualiza el tiempo en pantalla
}
function guardarTiempoRecord(tiempo) {
  const recordExistente = JSON.parse(localStorage.getItem('record'));

  if (!recordExistente) {
    const record = {
      intentos,
      aciertos,
      tiempoTotal: tiempo // Guarda el tiempo transcurrido como tiempoTotal
    };
    localStorage.setItem('record', JSON.stringify(record));
  } else {
    if (tiempo < recordExistente.tiempoTotal) {
      const record = {
        intentos,
        aciertos,
        tiempoTotal: tiempo // Guarda el tiempo transcurrido como tiempoTotal
      };
      localStorage.setItem('record', JSON.stringify(record));
    }
  }
}

// Ejecutar la función para mostrar el récord al cargar la página
window.onload = function () {
  mostrarRecord();
};
// Ejecutar la función para iniciar el juego
iniciarJuego();
