const personaje = {} // Objeto vacío

const razas = ["Humano", "Elfo", "Enano"] // Array de strings

const clases = ["Guerrero", "Mago", "Arquero"] // Array de strings

// Función para pedir el nombre del personaje
function elegirNombre() {
    let nombre = prompt("Coloque un nombre para su personaje") // Solicita al usuario que ingrese un nombre

    // Si el usuario presiona "Cancelar" (lo que devuelve `null`), corta el flujo y se reinicia la aplicación
    if (nombre === null) {
        alert("Lamento que no hayas tenido paciencia en terminar de armar el personaje");
        app(); // Reinicia la aplicación
        return;
    }
    // si el nombre sea vacío o nulo, pedirá al usuario ingresar un nombre válido
    while (!nombre) {
        alert("Es obligatorio que el personaje tenga un nombre!!")// Advertencia de que el nombre es obligatorio
        nombre = prompt("Coloque un nombre para su personaje")// Solicita nuevamente el nombre
    }

    personaje.nombre = nombre// Asignar el nombre al personaje
    alert("Tu personaje se llamará: " + personaje.nombre) // Muestra el nombre asignado

}

// Función para seleccionar la raza del personaje
function seleccionarRaza() {
    let opciones = "Seleccione una raza: \n" // Muestra las opciones de razas disponibles
    for (let i = 0; i < razas.length; i++) {
        opciones += (i + 1) + '.' + razas[i] + '\n'  // arma los items con las opciones válidas (1. Humano, 2. Elfo, etc.)
    }
    let seleccionDeRaza // Variable para almacenar la selección del usuario
    let datoValido = false // Flag que controlará si el dato ingresado es válido


    // Mientras no se reciba una opción válida
    while (!datoValido) {
        seleccionDeRaza = prompt(opciones)// Muestra las opciones y recibe la selección del usuario

        // Si el usuario presiona "Cancelar" (lo que devuelve `null`), se reinicia la aplicación
        if (seleccionDeRaza === null) {
            alert("Lamento que no hayas tenido paciencia en terminar de armar el personaje");
            app(); // Reinicia la aplicación
            return; // Termina la función
        }

        // Verifica si la opción ingresada es válida (debe ser un número dentro del rango de opciones disponibles)
        if (seleccionDeRaza > 0 && seleccionDeRaza <= razas.length) {
            //Estoy creando la propiedad raza dentro del objeto personaje y asignandole un valor
            personaje.raza = razas[seleccionDeRaza - 1]// Asigna la raza seleccionada al personaje
            alert("Elegiste la raza: " + personaje.raza);// Muestra la raza seleccionada
            datoValido = true// Marca que se ha ingresado un dato válido y sale del bucle
            //alert(`elegiste ${personaje.raza} como raza`)

        } else {
            // Mensaje de error si la opción ingresada no es válida
            alert("La opcion elegida no esta disponible ó no elegiste ninguna, por favor coloque una opcion de la lista para poder continuar")
        }
    }

}

// Función para seleccionar la clase del personaje
function seleccionarClase() {
    let opciones = "Seleccionar  una clase: \n" // Variable para listar las opciones de clases

    for (let i = 0; i < clases.length; i++) {
        opciones += (i + 1) + '.' + clases[i] + '\n' // Construye el string con las clases disponibles (1. Guerrero, 2. Mago, etc.)
    }

    let seleccionDeClase // Variable para almacenar la selección de clase del usuario
    let datoValido = false // Flag que controlará si la opción ingresada es válida
    while (!datoValido) {
        seleccionDeClase = prompt(opciones) // Muestra las opciones y recibe la selección del usuario
        // Si el usuario presiona "Cancelar" (lo que devuelve `null`), se reinicia la aplicación
        if (seleccionDeClase === null) {
            alert("Lamento que no hayas tenido paciencia en terminar de armar el personaje");
            app(); // Reinicia la aplicación
            return; // Termina la función
        }

        // Verifica si la opción ingresada es válida (debe ser un número dentro del rango de opciones disponibles)

        if (seleccionDeClase > 0 && seleccionDeClase <= clases.length) {
            personaje.clase = clases[seleccionDeClase - 1] // Asigna la clase seleccionada al personaje
            alert("Seleccionaste la clase: " + personaje.clase) // Muestra la clase seleccionada
            datoValido = true // Marca que se ha ingresado un dato válido y sale del bucle
        } else {
            // Mensaje de error si la opción ingresada no es válida
            alert("La opcion elegida no esta disponible ó no elegiste ninguna, por favor coloque una opcion de la lista para poder continuar")
        }
    }
}

// Función para generar la historia del personaje basado en las selecciones anteriores
function generarHistoria() {
    // Crea una historia personalizada usando los valores almacenados en el objeto `personaje`
    let historia = `En un mundo donde la magia y la aventura se entrelazan, ${personaje.nombre}, un ${personaje.raza} ${personaje.clase}, se prepara para una jornada de aventura. \n`;
    historia += `Con su astucia y habilidades, ${personaje.nombre} se embarcará en una misión para encontrar un antiguo artefacto que puede cambiar el destino de su reino. \n`;
    historia += `Pero, ¿qué desafíos le esperan en su camino? Solo el tiempo lo dirá...`;
    return historia; // Devuelve la historia generada
}

// Función para confirmar las elecciones del usuario y mostrar la historia
function personajeElegido() {
    // Muestra un mensaje con las elecciones del usuario y pregunta si desea ver la historia
    let confirmacion = confirm(`Éstas fueron las opciones que elegiste :\n Nombre: ${personaje.nombre} \n Raza: ${personaje.raza} \n Clase: ${personaje.clase} \n Te gustaria ver la historia que armamos para vos con las características que elegiste? `)
    // Si el usuario confirma, muestra la historia generada
    if (confirmacion) {
        alert(generarHistoria())
    } else {
        // Si el usuario no quiere ver la historia
        alert("Qué aburrido que no quisiste leerla :(");
    }
}


// Función principal que inicia todo el proceso de creación de personaje
function app() {
    // Muestra la bienvenida
    alert("¡Bienvenido! \nEn este lugar lleno de magia y aventura, estás a punto de embarcarte en una historia única. Antes de comenzar tu viaje, es momento de crear tu personaje. Podrás elegir su raza, su clase y habilidades especiales.\n¡Vayamos a forjar tu leyenda!");
    elegirNombre(); // Llama a la función para elegir el nombre del personaje
    seleccionarRaza(); // Llama a la función para seleccionar la raza
    seleccionarClase() // Llama a la función para seleccionar la clase
    personajeElegido() // Llama a la función para confirmar las elecciones y mostrar la historia
}
// Inicia la aplicación llamando a la función `app()`

app()

