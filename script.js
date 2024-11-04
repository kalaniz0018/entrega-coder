// Clase para el personaje
class Personaje {
    constructor(nombre, raza, clase) {
        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
    }
}

// Variables globales y simulador
let personaje = null; // ahora personaje es un objeto de la clase Personaje
let historias = [];

// Elementos del DOM
const crearPersonajeBtn = document.getElementById("crear-personaje-btn");
const nombreInput = document.getElementById("nombre");
const razaSelect = document.getElementById("raza");
const claseSelect = document.getElementById("clase");
const textoHistoria = document.getElementById("texto-historia");
const opcionesContainer = document.getElementById("opciones");

// Cargar historias desde JSON local (simulado)
fetch("historias.json")
    .then((response) => response.json())
    .then((data) => {
        historias = data;
    })
    .catch((error) => console.error("Error al cargar historias:", error));

// Crear y guardar personaje en localStorage
crearPersonajeBtn.addEventListener("click", () => {
    // Crear una instancia de Personaje
    personaje = new Personaje(
        nombreInput.value || "Aventurero",
        razaSelect.value,
        claseSelect.value
    );

    // Guardar personaje en localStorage
    localStorage.setItem("personaje", JSON.stringify(personaje));

    // Iniciar historia desde el primer nodo
    mostrarHistoria(1);
});

// Mostrar historia y opciones
function mostrarHistoria(id) {
    const historia = historias.find((item) => item.id === id);

    if (historia) {
        let textoConDatos = historia.texto
        .replaceAll("${personaje.nombre}", personaje.nombre)
        .replaceAll("${personaje.raza}", personaje.raza)
        .replaceAll("${personaje.clase}", personaje.clase);

    // Mostrar el texto de la historia
    textoHistoria.style.display = "block";
    textoHistoria.innerText = textoConDatos;


        // Renderizar opciones
        opcionesContainer.innerHTML = "";
        historia.opciones.forEach((opcion) => {
            const botonOpcion = document.createElement("button");
            botonOpcion.classList.add("opcion");
            botonOpcion.textContent = opcion.texto;
            botonOpcion.addEventListener("click", () => mostrarHistoria(opcion.siguiente));
            opcionesContainer.appendChild(botonOpcion);
        });
    }
}

// Recuperar personaje del localStorage al cargar la página
function cargarPersonaje() {
    const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));
    if (personajeGuardado) {
        personaje = new Personaje(personajeGuardado.nombre, personajeGuardado.raza, personajeGuardado.clase);
        mostrarHistoria(1); // Iniciar desde el primer paso de la historia
    }
}

// Ejecutar cargarPersonaje para restablecer la sesión de usuario
cargarPersonaje();
