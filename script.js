// Limpiar el localStorage al cargar la página
localStorage.clear();

// Clase para el personaje
class Personaje {
    constructor(nombre, raza, clase) {
        // Inicializa las propiedades del personaje
        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.karma = 0; // Inicializa el karma del personaje
    }

    // Método para ajustar el karma del personaje
    ajustarKarma(valor) {
        if (valor === "bueno") {
            this.karma += 1; // Incrementa karma si es "bueno"
        } else if (valor === "malo") {
            this.karma -= 1; // Decrementa karma si es "malo"
        }
        // Guardar el personaje actualizado en localStorage
        localStorage.setItem("personaje", JSON.stringify(this));
    }

    // Método para obtener el final de la historia según el karma
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
let personaje = null;  // Variable que guardará el personaje creado
let historias = [];  // Array que guardará las historias cargadas desde el archivo JSON

// Elementos del DOM
const jugarBtn = document.getElementById("jugar-btn");  // Botón de jugar
const textoHistoria = document.getElementById("texto-historia");  // Contenedor del texto de la historia
const opcionesContainer = document.getElementById("opciones");  // Contenedor de las opciones del jugador

// Verifica si el botón de jugar está presente en el DOM
if (jugarBtn) {
    console.log("Botón 'Jugar' encontrado en el DOM.");
} else {
    console.error("Botón 'Jugar' no encontrado. Revisa el HTML.");
}

// Cargar historias desde un archivo JSON
fetch("historias.json")
    .then(response => response.json())  // Convierte la respuesta en JSON
    .then(data => {
        historias = data;  // Guarda las historias en la variable global 'historias'
        console.log("Historias cargadas exitosamente:", historias);  // Confirmar que se cargaron correctamente
    })
    .catch(error => console.error("Error al cargar historias:", error));  // En caso de error, lo muestra en consola

// Evento cuando el usuario hace clic en el botón de jugar
jugarBtn.addEventListener("click", () => {
    const titulo = document.querySelector("h1");  // Buscar el título de la página
    const imagen = document.querySelector("img");  // Buscar una imagen en la página

    // Ocultar el título y la imagen
    if (titulo) {
        titulo.style.display = "none";
    }
    if (imagen) {
        imagen.style.display = "none";
    }

    // Mostrar un formulario para crear el personaje usando SweetAlert
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
            const nombre = Swal.getPopup().querySelector('#nombre').value || "Aventurero";  // Valor del nombre, si está vacío, asigna "Aventurero"
            const raza = Swal.getPopup().querySelector('#raza').value;  // Valor de la raza seleccionada
            const clase = Swal.getPopup().querySelector('#clase').value;  // Valor de la clase seleccionada
            return { nombre, raza, clase };  // Devuelve un objeto con los valores ingresados
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Crear un nuevo personaje con los datos proporcionados
            personaje = new Personaje(result.value.nombre, result.value.raza, result.value.clase);
            // Guardar el personaje en localStorage
            localStorage.setItem("personaje", JSON.stringify(personaje));

            // Ocultar el botón de jugar y comenzar la historia
            jugarBtn.style.display = "none";
            mostrarHistoria(1);  // Mostrar el primer nodo de la historia
        }
    });
});

// Crear el botón para volver a jugar
const volverAJugarBtn = document.createElement("button");
volverAJugarBtn.id = "volver-a-jugar-btn";
volverAJugarBtn.innerText = "Volver a Jugar";
volverAJugarBtn.style.display = "none";  // Inicialmente oculto

// Agregar el botón al contenedor de la historia
const historiaContainer = document.getElementById("historia-container");
historiaContainer.appendChild(volverAJugarBtn);

// Función para mostrar el botón de volver a jugar
function mostrarBotonVolverAJugar() {
    volverAJugarBtn.style.display = "block";
}

// Evento cuando el jugador hace clic en "Volver a Jugar"
volverAJugarBtn.addEventListener("click", () => {
    // Limpiar el localStorage
    localStorage.removeItem("personaje");

    // Reiniciar la interfaz
    jugarBtn.style.display = "block";  // Mostrar el botón de jugar
    textoHistoria.style.display = "none";  // Ocultar el texto de la historia
    opcionesContainer.innerHTML = "";  // Limpiar las opciones
    volverAJugarBtn.style.display = "none";  // Ocultar el botón de volver a jugar

    // Mostrar nuevamente el formulario para crear el personaje
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
            const nombre = Swal.getPopup().querySelector('#nombre').value || "Aventurero";  // Valor del nombre
            const raza = Swal.getPopup().querySelector('#raza').value;  // Valor de la raza
            const clase = Swal.getPopup().querySelector('#clase').value;  // Valor de la clase
            return { nombre, raza, clase };  // Devuelve los valores
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Crear personaje y guardarlo en localStorage
            personaje = new Personaje(result.value.nombre, result.value.raza, result.value.clase);
            localStorage.setItem("personaje", JSON.stringify(personaje));

            // Ocultar el botón de jugar y comenzar la historia
            jugarBtn.style.display = "none";
            mostrarHistoria(1);  // Mostrar la historia desde el principio
        }
    });
});

// Función para finalizar la historia
function finDeLaHistoria() {
    const final = personaje.obtenerFinal();  // Obtener el final basado en el karma
    // Mostrar el final en un contenedor
    const finalContainer = document.createElement("div");
    finalContainer.classList.add("final-container");
    finalContainer.innerHTML = `<p><strong>Fin de la Aventura</strong></p><p>${final}</p>`;
    textoHistoria.appendChild(finalContainer);  // Añadir el final al contenedor de la historia
    mostrarBotonVolverAJugar();  // Mostrar el botón para volver a jugar
}

// Función para mostrar la historia y las opciones
function mostrarHistoria(id) {
    const historia = historias.find((item) => item.id === id);  // Buscar la historia por su id

    if (historia) {
        // Sustituir variables en el texto de la historia con los datos del personaje
        let textoConDatos = historia.texto
            .replaceAll("${personaje.nombre}", personaje.nombre)
            .replaceAll("${personaje.raza}", personaje.raza)
            .replaceAll("${personaje.clase}", personaje.clase);

        // Mostrar el texto de la historia
        textoHistoria.style.display = "block";
        textoHistoria.innerText = textoConDatos;

        // Si hay imagen, mostrarla
        if (historia.imagen) {
            const imagenElement = document.createElement("img");
            imagenElement.src = historia.imagen;
            textoHistoria.appendChild(imagenElement);
        }

        // Renderizar opciones
        opcionesContainer.innerHTML = "";
        historia.opciones.forEach((opcion) => {
            const botonOpcion = document.createElement("button");
            botonOpcion.classList.add("opcion");
            botonOpcion.textContent = opcion.texto;
            botonOpcion.addEventListener("click", () => {
                personaje.ajustarKarma(opcion.karma || 0);  // Ajustar karma según la opción seleccionada
                mostrarHistoria(opcion.siguiente);  // Mostrar la siguiente parte de la historia
            });
            opcionesContainer.appendChild(botonOpcion);  // Añadir el botón de opción
        });

        // Si no hay opciones, finalizar la historia
        if (historia.opciones.length === 0) {
            finDeLaHistoria();  // Llamar a la función para finalizar
        }
    }
}

// Función para cargar el personaje desde localStorage cuando la página se recarga
function cargarPersonaje() {
    const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));  // Recuperar personaje del localStorage
    if (personajeGuardado) {
        // Crear el personaje con los datos guardados
        personaje = new Personaje(personajeGuardado.nombre, personajeGuardado.raza, personajeGuardado.clase);
        personaje.karma = personajeGuardado.karma;  // Restaurar el karma del personaje

        // Ocultar el botón de jugar y comenzar la historia
        jugarBtn.style.display = "none";
        mostrarHistoria(1);  // Comenzar la historia desde el principio
    }
}

// Ejecutar la función para cargar el personaje si está guardado
cargarPersonaje();
