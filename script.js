const personaje = {}
const razas = ["Humano", "Elfo", "Enano"]

const clases = ["Guerrero", "Mago", "Arquero"]


function elegirNombre() {
    let nombre = prompt("Coloque un nombre para su personaje")

    if (nombre === null) {
        alert("Lamento que no hayas tenido paciencia en terminar de armar el personaje");
        app();
        return;
    }

    while (!nombre) {
        alert("Es obligatorio que el personaje tenga un nombre!!")
        nombre = prompt("Coloque un nombre para su personaje")
    }

    personaje.nombre = nombre
    alert("Tu personaje se llamará: " + personaje.nombre)

}

function seleccionarRaza() {
    let opciones = "Seleccione una raza: \n"
    for (let i = 0; i < razas.length; i++) {
        opciones += (i + 1) + '.' + razas[i] + '\n'
    }
    let seleccionDeRaza
    let datoValido = false

    while (!datoValido) {
        seleccionDeRaza = prompt(opciones)


        if (seleccionDeRaza === null) {
            alert("Lamento que no hayas tenido paciencia en terminar de armar el personaje");
            app();
            return;
        }
        if (seleccionDeRaza > 0 && seleccionDeRaza <= razas.length) {

            personaje.raza = razas[seleccionDeRaza - 1]
            alert("Elegiste la raza: " + personaje.raza)
            datoValido = true
        } else {
            alert("La opcion elegida no esta disponible ó no elegiste ninguna, por favor coloque una opcion de la lista para poder continuar")
        }
    }

}

function seleccionarClase() {
    let opciones = "Seleccionar  una clase: \n"

    for (let i = 0; i < clases.length; i++) {
        opciones += (i + 1) + '.' + clases[i] + '\n'
    }

    let seleccionDeClase
    let datoValido = false
    while (!datoValido) {
        seleccionDeClase = prompt(opciones)

        if (seleccionDeClase === null) {
            alert("Lamento que no hayas tenido paciencia en terminar de armar el personaje");
            app();
            return;
        }
        if (seleccionDeClase > 0 && seleccionDeClase <= clases.length) {
            personaje.clase = clases[seleccionDeClase - 1]
            alert("Seleccionaste la clase: " + personaje.clase)
            datoValido = true
        } else {
            alert("La opcion elegida no esta disponible ó no elegiste ninguna, por favor coloque una opcion de la lista para poder continuar")
        }
    }
}

function generarHistoria() {

    let historia = `En un mundo donde la magia y la aventura se entrelazan, ${personaje.nombre}, un ${personaje.raza} ${personaje.clase}, se prepara para una jornada de aventura. \n`;
    historia += `Con su astucia y habilidades, ${personaje.nombre} se embarcará en una misión para encontrar un antiguo artefacto que puede cambiar el destino de su reino. \n`;
    historia += `Pero, ¿qué desafíos le esperan en su camino? Solo el tiempo lo dirá...`;
    return historia;
}

function personajeElegido() {
    let confirmacion = confirm(`Éstas fueron las opciones que elegiste :\n Nombre: ${personaje.nombre} \n Raza: ${personaje.raza} \n Clase: ${personaje.clase} \n Te gustaria ver la historia que armamos para vos con las características que elegiste? `)
    if (confirmacion) {
        alert(generarHistoria())
    } else {

        alert("Qué aburrido que no quisiste leerla :(");
    }
}

function app() {
    alert("¡Bienvenido! \nEn este lugar lleno de magia y aventura, estás a punto de embarcarte en una historia única. Antes de comenzar tu viaje, es momento de crear tu personaje. Podrás elegir su raza, su clase y habilidades especiales.\n¡Vayamos a forjar tu leyenda!");
    elegirNombre();
    seleccionarRaza();
    seleccionarClase()
    personajeElegido()
}

app()

