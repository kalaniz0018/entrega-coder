// Clase que define las características y acciones de un personaje

class Personaje {
    // Inicializa las propiedades del personaje
    constructor(nombre, raza, clase) {
        this.nombre = nombre; // Nombre del personaje
        this.raza = raza; // Raza del personaje
        this.clase = clase; // Clase del personaje
        this.karma = 0; // Nivel de karma inicial del personaje
    }
    // Método para ajustar el karma del personaje
    ajustarKarma(valor) {
        // Incrementa o decrementa el karma según el valor proporcionado
        if (valor === "bueno") {
            this.karma += 1;
        } else if (valor === "malo") {
            this.karma -= 1;
        }
        // Guarda el estado actualizado del personaje en el almacenamiento local
        localStorage.setItem("personaje", JSON.stringify(this));
    }
    // Método para determinar el final basado en el karma del personaje
    obtenerFinal() {
        if (this.karma >= 3) {
            return "Has logrado una puntuación que te posiciona como un ser de elevada integridad moral.";
        } else if (this.karma < 1 && this.karma > 2) {
            return "Terminas tu viaje... No lograste ni gloria, ni desgracia. Pasaste desapercibido, sin destacar.";
        } else {
            return "Tu puntuación refleja una moralidad tan baja que te has convertido en una paria de la sociedad, rechazado y despreciado por todos.";
        }
    }
}

// Variables globales
let personaje = null; // Instancia del personaje actual
let historias = []; // Lista de historias cargadas

// Referencias a elementos del DOM

const jugarBtn = document.getElementById("jugar-btn");
const textoHistoria = document.getElementById("texto-historia");
const opcionesContainer = document.getElementById("opciones");
const volverAJugarBtn = document.createElement("button");
volverAJugarBtn.id = "volver-a-jugar-btn";
volverAJugarBtn.innerText = "Volver a Jugar";
volverAJugarBtn.style.display = "none";

// Contenedor de la historia donde se agrega el botón de reinicio

const historiaContainer = document.getElementById("historia-container");
historiaContainer.appendChild(volverAJugarBtn);
// Carga las historias desde un archivo JSON
async function cargarHistorias() {
    try {
        const response = await fetch("historias.json");
        historias = await response.json(); // Asigna las historias cargadas a la variable global
    } catch (error) {
        console.error("Error al cargar historias:", error);
    }
}

// Evento para iniciar el juego y crear un personaje
jugarBtn.addEventListener("click", () => {

    // Oculta el título y la imagen inicial
    const titulo = document.querySelector("h1");
    const imagen = document.querySelector("img");
    if (titulo) {
        titulo.style.display = "none";
    }
    if (imagen) {
        imagen.style.display = "none";
    }
    // Muestra un formulario para crear el personaje usando SweetAlert
    Swal.fire({
        title: 'Crea tu personaje',
        html:
            '<input type="text" id="nombre" class="swal2-input" placeholder="Nombre del personaje">' +
            '<select id="raza" class="swal2-input">' +
            '<option value="Humano">Humano</option>' +
            '<option value="Elfo">Elfo</option>' +
            '<option value="Enano">Enano</option>' +
            '</select>' +
            '<select id="clase" class="swal2-input">' +
            '<option value="Guerrero">Guerrero</option>' +
            '<option value="Mago">Mago</option>' +
            '<option value="Arquero">Arquero</option>' +
            '</select>',
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
            // Recoge los valores ingresados o seleccionados
            const nombre = Swal.getPopup().querySelector('#nombre').value || "Aventurero";
            const raza = Swal.getPopup().querySelector('#raza').value;
            const clase = Swal.getPopup().querySelector('#clase').value;
            return { nombre, raza, clase };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Crea un nuevo personaje con los datos ingresados
            personaje = new Personaje(result.value.nombre, result.value.raza, result.value.clase);
            localStorage.setItem("personaje", JSON.stringify(personaje));

            jugarBtn.style.display = "none"; //Oculta el botón de inicio
            mostrarHistoria(1);  // Muestra la primera historia
        }
    });
});

// Función para mostrar el botón de volver a jugar
function mostrarBotonVolverAJugar() {
    volverAJugarBtn.style.display = "block";
}

// Evento para reiniciar el juego al presionar el botón de reinicio
volverAJugarBtn.addEventListener("click", () => {
    localStorage.removeItem("personaje"); // Elimina el personaje guardado
    jugarBtn.style.display = "block"; // Muestra el botón de inicio
    textoHistoria.style.display = "none"; // Oculta la historia
    opcionesContainer.innerHTML = ""; // Limpia las opciones
    volverAJugarBtn.style.display = "none"; // Oculta el botón de reinicio

    // Reinicia el proceso de creación del personaje

    Swal.fire({
        title: 'Crea tu personaje',
        html:
            '<input type="text" id="nombre" class="swal2-input" placeholder="Nombre del personaje">' +
            '<select id="raza" class="swal2-input">' +
            '<option value="Humano">Humano</option>' +
            '<option value="Elfo">Elfo</option>' +
            '<option value="Enano">Enano</option>' +
            '</select>' +
            '<select id="clase" class="swal2-input">' +
            '<option value="Guerrero">Guerrero</option>' +
            '<option value="Mago">Mago</option>' +
            '<option value="Arquero">Arquero</option>' +
            '</select>',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value || "Aventurero";
            const raza = Swal.getPopup().querySelector('#raza').value;
            const clase = Swal.getPopup().querySelector('#clase').value;
            return { nombre, raza, clase };
        }
    }).then((result) => {
        if (result.isConfirmed) {

            personaje = new Personaje(result.value.nombre, result.value.raza, result.value.clase);
            localStorage.setItem("personaje", JSON.stringify(personaje));
            jugarBtn.style.display = "none";
            mostrarHistoria(1);
        }
    });
});

function finDeLaHistoria() {
    // Obtiene el texto final basado en el karma del personaje
    const final = personaje.obtenerFinal();

    // Crea un contenedor para mostrar el texto final
    const finalContainer = document.createElement("div");
    finalContainer.classList.add("final-container");
    finalContainer.innerHTML = `<p><strong>Fin de la Aventura</strong></p><p>${final}</p>`;

    // Agrega el contenedor final al elemento de historia en el DOM
    textoHistoria.appendChild(finalContainer);

    // Muestra el botón para volver a jugar
    mostrarBotonVolverAJugar();
}

// Función para mostrar una historia específica por ID
function mostrarHistoria(id) {
    // Verifica si las historias ya están cargadas
    if (historias.length === 0) {
        // Si no están cargadas, las carga primero y luego procesa la historia
        cargarHistorias().then(() => {
            procesarHistoria(id);
        });
        return;
    }
    // Si las historias ya están cargadas, procesa directamente la historia
    procesarHistoria(id);
}
// Función para procesar y mostrar una historia en el DOM
function procesarHistoria(id) {
    // Busca la historia por su ID en la lista de historias
    const historia = historias.find((item) => item.id === id);

    if (historia) {
        // Reemplaza los marcadores en el texto de la historia con los datos del personaje
        let textoConDatos = historia.texto
            .replaceAll("${personaje.nombre}", personaje.nombre)
            .replaceAll("${personaje.raza}", personaje.raza)
            .replaceAll("${personaje.clase}", personaje.clase);

        // Muestra el texto de la historia en el contenedor correspondiente
        textoHistoria.style.display = "block";
        textoHistoria.innerText = textoConDatos;

        // Si la historia incluye una imagen, la agrega al contenedor
        if (historia.imagen) {
            const imagenElement = document.createElement("img");
            imagenElement.src = historia.imagen;
            textoHistoria.appendChild(imagenElement);
            // Guarda el estado actual de la historia en el almacenamiento local
            localStorage.setItem("estadoHistoria", JSON.stringify({ id: historia.id, imagen: historia.imagen }));
        }
        // Limpia las opciones anteriores en el contenedor de opciones
        opcionesContainer.innerHTML = "";

        // Genera botones para cada opción disponible en la historia
        historia.opciones.forEach((opcion) => {
            const botonOpcion = document.createElement("button");
            botonOpcion.classList.add("opcion");
            botonOpcion.textContent = opcion.texto;

            // Agrega un evento al botón para ajustar el karma y mostrar la siguiente historia
            botonOpcion.addEventListener("click", () => {
                personaje.ajustarKarma(opcion.karma || 0); // Ajusta el karma según la opción seleccionada
                mostrarHistoria(opcion.siguiente); // Muestra la historia siguiente
            });
            opcionesContainer.appendChild(botonOpcion); // Agrega el botón al contenedor
        });
        // Si no hay más opciones, llama a la función para finalizar la historia
        if (historia.opciones.length === 0) {
            finDeLaHistoria();
        }
    }
}

// Función para cargar un personaje guardado y restaurar el estado de la historia
function cargarPersonajeYEstado() {
    // Obtiene los datos del personaje guardado en localStorage

    const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));
    if (personajeGuardado) {
        // Restaura el personaje y sus propiedades

        personaje = new Personaje(personajeGuardado.nombre, personajeGuardado.raza, personajeGuardado.clase);
        personaje.karma = personajeGuardado.karma;
        // Oculta el título y la imagen inicial
        const titulo = document.querySelector("h1");
        const imagen = document.querySelector("img");
        jugarBtn.style.display = "none";
        if (titulo) {
            titulo.style.display = "none";
        }
        if (imagen) {
            imagen.style.display = "none";
        }

        // Restaura el estado de la historia desde localStorage
        const estadoHistoria = JSON.parse(localStorage.getItem("estadoHistoria"));
        if (estadoHistoria) {
            mostrarHistoria(estadoHistoria.id);
        } else {
            // Si no hay estado guardado, inicia con la primera historia
            mostrarHistoria(1);
        }
    } else {
        console.error("No se encontró personaje guardado.");
    }
}
// Evento que se ejecuta cuando el documento está completamente cargado

document.addEventListener('DOMContentLoaded', () => {
    cargarPersonajeYEstado();// Carga el personaje y el estado de la historia al inicio
});
// Función auxiliar para cargar únicamente el personaje guardado
function cargarPersonaje() {
    // Obtiene los datos del personaje desde localStorage

    const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));
    if (personajeGuardado) {
        // Restaura las propiedades del personaje
        personaje = new Personaje(personajeGuardado.nombre, personajeGuardado.raza, personajeGuardado.clase);
        personaje.karma = personajeGuardado.karma;
        // Oculta el botón de inicio del juego
        jugarBtn.style.display = "none";
    }

}





