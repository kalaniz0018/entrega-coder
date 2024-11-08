// Limpiar el localStorage al cargar la página
localStorage.clear();
// Clase para el personaje
class Personaje {
    constructor(nombre, raza, clase) {
        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
        this.karma = 0;
    }

    ajustarKarma(valor) {
        if (valor === "bueno") {
            this.karma += 1;
        } else if (valor === "malo") {
            this.karma -= 1;
        }
        // Guardar el personaje actualizado en localStorage
        localStorage.setItem("personaje", JSON.stringify(this));
    }

    obtenerFinal() {
        if (this.karma >= 3) {
            return "Has logrado una puntuación que te posiciona como un ser de elevada integridad moral. ";
        } else if (this.karma < 1 && this.karma > 2) {
            return "Terminas tu viaje... No lograste ni gloria, ni desgracia. Pasaste desapercibido, sin destacar.";
        } else {
            return "Tu puntuación refleja una moralidad tan baja que te has convertido en una paria de la sociedad, rechazado y despreciado por todos.";
        }
    }
}

// Variables globales
let personaje = null;
let historias = [];

// Elementos del DOM
const jugarBtn = document.getElementById("jugar-btn");
const textoHistoria = document.getElementById("texto-historia");
const opcionesContainer = document.getElementById("opciones");

// Verifica si el botón se encontró en el DOM
if (jugarBtn) {
    console.log("Botón 'Jugar' encontrado en el DOM.");
} else {
    console.error("Botón 'Jugar' no encontrado. Revisa el HTML.");
}

// Cargar historias desde JSON
fetch("historias.json")
    .then(response => response.json())
    .then(data => {
        historias = data;
        console.log("Historias cargadas exitosamente:", historias); // Confirmar que el JSON se cargó
    })
    .catch(error => console.error("Error al cargar historias:", error));

jugarBtn.addEventListener("click", () => {
    const titulo = document.querySelector("h1"); 
    const imagen = document.querySelector("img"); 

    if (titulo) {
        titulo.style.display = "none"; 
    }

    if (imagen) {
        imagen.style.display = "none"; 
    }

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
            // Crear personaje y guardarlo en localStorage
            personaje = new Personaje(result.value.nombre, result.value.raza, result.value.clase);
            localStorage.setItem("personaje", JSON.stringify(personaje));

            // Ocultar el botón de jugar y comenzar la historia
            jugarBtn.style.display = "none";
            mostrarHistoria(1); // Mostrar el primer nodo de la historia
        }
    });
});





// Elemento para el botón de volver a jugar
const volverAJugarBtn = document.createElement("button");
volverAJugarBtn.id = "volver-a-jugar-btn";
volverAJugarBtn.innerText = "Volver a Jugar";
volverAJugarBtn.style.display = "none"; // Inicialmente oculto

// Agregar el botón al contenedor de texto de la historia
const historiaContainer = document.getElementById("historia-container");
historiaContainer.appendChild(volverAJugarBtn);

// Mostrar el botón de volver a jugar
function mostrarBotonVolverAJugar() {
    volverAJugarBtn.style.display = "block";
}

// Al hacer clic en "Volver a Jugar"
volverAJugarBtn.addEventListener("click", () => {
    // Limpiar el localStorage
    localStorage.removeItem("personaje");

    // Reiniciar la interfaz
    jugarBtn.style.display = "block"; // Mostrar el botón de jugar
    textoHistoria.style.display = "none"; // Ocultar el texto de la historia
    opcionesContainer.innerHTML = ""; // Limpiar las opciones
    volverAJugarBtn.style.display = "none"; // Ocultar el botón de volver a jugar
});

// Llama a esta función al final de la historia cuando se complete
function finDeLaHistoria() {
    const final = personaje.obtenerFinal();
    // Mostrar el final en el contenedor de texto (sin usar Swal)
    const finalContainer = document.createElement("div");
    finalContainer.classList.add("final-container");
    finalContainer.innerHTML = `<p><strong>Fin de la Aventura</strong></p><p>${final}</p>`;
    // Agregar el final debajo del texto de la historia
    textoHistoria.appendChild(finalContainer);
    mostrarBotonVolverAJugar(); // Mostrar el botón para volver a jugar
}




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

              // Verificar si hay imagen y mostrarla
              if (historia.imagen) {
                const imagenElement = document.createElement("img");
                imagenElement.src = historia.imagen;
                textoHistoria.appendChild(imagenElement); // Añadir la imagen al contenedor de texto
            }

        // Renderizar opciones
        opcionesContainer.innerHTML = "";
        historia.opciones.forEach((opcion) => {
            const botonOpcion = document.createElement("button");
            botonOpcion.classList.add("opcion");
            botonOpcion.textContent = opcion.texto;
            botonOpcion.addEventListener("click", () => {
                personaje.ajustarKarma(opcion.karma || 0); // Asignar karma si está definido en JSON
                mostrarHistoria(opcion.siguiente);
            });
            opcionesContainer.appendChild(botonOpcion);
        });

        // Si no hay más opciones, finalizar la historia
        if (historia.opciones.length === 0) {
            finDeLaHistoria(); // Llama a la función para finalizar la historia
        }
    }
}


// Recuperar personaje del localStorage al cargar la página
function cargarPersonaje() {
    const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));
    if (personajeGuardado) {
        personaje = new Personaje(personajeGuardado.nombre, personajeGuardado.raza, personajeGuardado.clase);
        personaje.karma = personajeGuardado.karma; // Restaurar karma desde el localStorage


        // Ocultar el botón de jugar y comenzar la historia
        jugarBtn.style.display = "none";
        mostrarHistoria(1); // Comienza desde la introducción
    }
}

// Ejecutar cargarPersonaje para restablecer la sesión de usuario
cargarPersonaje();
