// Clase para el personaje
class Personaje {
    constructor(nombre, raza, clase) {
        this.nombre = nombre;
        this.raza = raza;
        this.clase = clase;
    }
}

// Crear el personaje y almacenarlo en localStorage
function crearPersonaje() {
    const nombre = document.getElementById("nombre").value;
    const raza = document.getElementById("raza").value;
    const clase = document.getElementById("clase").value;

    if (!nombre) {
        Swal.fire("Error", "Por favor, ingresa un nombre para tu personaje.", "error");
        return;
    }

    const personaje = new Personaje(nombre, raza, clase);
    localStorage.setItem("personaje", JSON.stringify(personaje));

    Swal.fire({
        title: "Personaje Creado",
        text: `Bienvenido ${nombre}, un ${raza} ${clase}. ¡Tu aventura comienza ahora!`,
        icon: "success",
        confirmButtonText: "Comenzar"
    }).then(() => {
        document.getElementById("creacion-personaje").style.display = "none";
        document.getElementById("juego").style.display = "block";
        cargarHistorias();
    });
}

// Cargar historias desde JSON usando fetch
async function cargarHistorias() {
    try {
        const response = await fetch("historias.json");
        const historias = await response.json();
        localStorage.setItem("historias", JSON.stringify(historias));
        mostrarEscena(1);  // Comenzar en la primera escena
    } catch (error) {
        console.error("Error al cargar las historias:", error);
    }
}

// Mostrar una escena basada en su ID
function mostrarEscena(escenaId) {
    const historias = JSON.parse(localStorage.getItem("historias"));
    const escena = historias.find(h => h.id === escenaId);
    const personaje = JSON.parse(localStorage.getItem("personaje"));

    document.getElementById("historia-texto").innerText = escena.texto.replace("${personaje.nombre}", personaje.nombre);

    const opcionesContenedor = document.getElementById("opciones");
    opcionesContenedor.innerHTML = "";

    escena.opciones.forEach(opcion => {
        const boton = document.createElement("button");
        boton.innerText = opcion.texto;
        boton.onclick = () => {
            localStorage.setItem("progreso", opcion.siguiente);
            mostrarEscena(opcion.siguiente);
        };
        opcionesContenedor.appendChild(boton);
    });
}

// Reiniciar juego
function reiniciarJuego() {
    localStorage.clear();
    document.getElementById("creacion-personaje").style.display = "block";
    document.getElementById("juego").style.display = "none";
}
