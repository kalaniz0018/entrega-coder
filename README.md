# Aventura Interactiva: Juego de Rol

Este es un juego interactivo en el que el usuario puede crear su propio personaje y tomar decisiones que influirán en el desarrollo de la historia. Basado en elecciones de moralidad (karma), el jugador puede experimentar diferentes finales según sus decisiones a lo largo del juego. La historia y las opciones se cargan desde un archivo JSON, lo que permite ampliar fácilmente el contenido del juego.

## Características del Proyecto

- **Creación de Personaje**: El jugador puede crear un personaje personalizado con un nombre, raza y clase (Guerrero, Mago, Arquero, etc.).
- **Interacción con la Historia**: El jugador toma decisiones que afectan el karma del personaje y el desarrollo de la historia.
- **Variabilidad en los Finales**: El karma del personaje determina el final de la aventura, con opciones que van desde un final heroico hasta uno trágico.
- **Persistencia de Datos**: El personaje y su karma se guardan en el `localStorage`, lo que permite continuar la aventura en futuras sesiones.
- **Botón para Reintentar**: Al finalizar la historia, el jugador tiene la opción de volver a jugar, creando un nuevo personaje y comenzando desde el principio.

## Herramientas y Tecnologías Utilizadas

- **HTML**: Para la estructura básica de la página web.
- **CSS**: Para el diseño y la apariencia del juego.
- **JavaScript**:
  - Para la lógica del juego, incluyendo la creación de personajes, el manejo del karma y la interacción con la historia.
  - **SweetAlert2**: Para la creación de cuadros de diálogo interactivos donde el jugador crea su personaje.
  - **Fetch API**: Para cargar historias desde un archivo JSON, lo que facilita la expansión del contenido sin necesidad de modificar el código.
  - **localStorage**: Para guardar el estado del personaje, permitiendo que el progreso se conserve entre sesiones.
  



### Instrucciones

1. Clona este repositorio en tu máquina local: 
    git clone https://github.com/tu-usuario/nombre-del-repositorio.git
2. Abre el archivo `index.html` en tu navegador para comenzar a jugar.
3. Crea tu personaje y comienza la aventura. Las decisiones que tomes influirán en el desarrollo y el final de la historia.

## Estructura del Proyecto

/juego-de-rol
│
├── index.html        # Página principal del juego
├── script.js         # Lógica del juego en JavaScript
├── historias.json    # Archivo JSON que contiene las historias y opciones
├── styles.css        # Archivo de estilos para la apariencia del juego
└── README.md         # Este archivo de documentación
