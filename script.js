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

        localStorage.setItem("personaje", JSON.stringify(this));
    }
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

let personaje = null;
let historias = [];

const jugarBtn = document.getElementById("jugar-btn");
const textoHistoria = document.getElementById("texto-historia");
const opcionesContainer = document.getElementById("opciones");
const volverAJugarBtn = document.createElement("button");
volverAJugarBtn.id = "volver-a-jugar-btn";
volverAJugarBtn.innerText = "Volver a Jugar";
volverAJugarBtn.style.display = "none";

const historiaContainer = document.getElementById("historia-container");
historiaContainer.appendChild(volverAJugarBtn);

async function cargarHistorias() {
    try {
        const response = await fetch("historias.json");
        historias = await response.json();
    } catch (error) {
        console.error("Error al cargar historias:", error);
    }
}

cargarHistorias();

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
        allowOutsideClick: false,
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

function mostrarBotonVolverAJugar() {
    volverAJugarBtn.style.display = "block";
}
volverAJugarBtn.addEventListener("click", () => {
    localStorage.removeItem("personaje");
    jugarBtn.style.display = "block";
    textoHistoria.style.display = "none";
    opcionesContainer.innerHTML = "";
    volverAJugarBtn.style.display = "none";

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
    const final = personaje.obtenerFinal();

    const finalContainer = document.createElement("div");
    finalContainer.classList.add("final-container");
    finalContainer.innerHTML = `<p><strong>Fin de la Aventura</strong></p><p>${final}</p>`;
    textoHistoria.appendChild(finalContainer);
    mostrarBotonVolverAJugar();
}

function mostrarHistoria(id) {
    if (historias.length === 0) {
        cargarHistorias().then(() => {
            procesarHistoria(id);
        });
        return;
    }
    procesarHistoria(id);
}

function procesarHistoria(id) {
    const historia = historias.find((item) => item.id === id);

    if (historia) {
        let textoConDatos = historia.texto
            .replaceAll("${personaje.nombre}", personaje.nombre)
            .replaceAll("${personaje.raza}", personaje.raza)
            .replaceAll("${personaje.clase}", personaje.clase);

        textoHistoria.style.display = "block";
        textoHistoria.innerText = textoConDatos;

        if (historia.imagen) {
            const imagenElement = document.createElement("img");
            imagenElement.src = historia.imagen;
            textoHistoria.appendChild(imagenElement);
            localStorage.setItem("estadoHistoria", JSON.stringify({ id: historia.id, imagen: historia.imagen }));
        }

        opcionesContainer.innerHTML = "";
        historia.opciones.forEach((opcion) => {
            const botonOpcion = document.createElement("button");
            botonOpcion.classList.add("opcion");
            botonOpcion.textContent = opcion.texto;
            botonOpcion.addEventListener("click", () => {
                personaje.ajustarKarma(opcion.karma || 0);
                mostrarHistoria(opcion.siguiente);
            });
            opcionesContainer.appendChild(botonOpcion);
        });
        if (historia.opciones.length === 0) {
            finDeLaHistoria();
        }
    }
}

function cargarPersonajeYEstado() {

    const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));
    if (personajeGuardado) {
        personaje = new Personaje(personajeGuardado.nombre, personajeGuardado.raza, personajeGuardado.clase);
        personaje.karma = personajeGuardado.karma;
        const titulo = document.querySelector("h1");
        const imagen = document.querySelector("img");
        jugarBtn.style.display = "none";
        if (titulo) {
            titulo.style.display = "none";
        }
        if (imagen) {
            imagen.style.display = "none";
        }


        const estadoHistoria = JSON.parse(localStorage.getItem("estadoHistoria"));
        if (estadoHistoria) {
            mostrarHistoria(estadoHistoria.id);
        } else {
            mostrarHistoria(1);
        }
    } else {
        console.error("No se encontró personaje guardado.");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    cargarPersonajeYEstado();
});
function cargarPersonaje() {
    const personajeGuardado = JSON.parse(localStorage.getItem("personaje"));
    if (personajeGuardado) {
        personaje = new Personaje(personajeGuardado.nombre, personajeGuardado.raza, personajeGuardado.clase);
        personaje.karma = personajeGuardado.karma;

        jugarBtn.style.display = "none";
    }

}





