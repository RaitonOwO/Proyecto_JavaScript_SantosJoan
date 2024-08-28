document.addEventListener('DOMContentLoaded', () => {
    mostrarPeliculas(); 
});

let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];

function mostrarPeliculas(filtros = {}) {
    const listaPeliculas = document.getElementById('lista-peliculas');
    listaPeliculas.innerHTML = '';

    const peliculasFiltradas = peliculas.filter(pelicula => {
        return (
            (!filtros.nombre || pelicula.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
            (!filtros.genero || pelicula.genero === filtros.genero) &&
            (!filtros.estado || pelicula.estados === filtros.estado) &&
            (!filtros.plataforma || pelicula.plataforma === filtros.plataforma)
        );
    });

    peliculasFiltradas.forEach((pelicula, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-formulario');
        tarjeta.innerHTML = `
            <h3>${pelicula.nombre}</h3>
            <p><strong>Género:</strong> ${pelicula.genero}</p>
            <p><strong>Formato:</strong> ${pelicula.formato}</p>
            <p><strong>Plataforma:</strong> ${pelicula.plataforma}</p>
            <p><strong>Estado:</strong> ${pelicula.estados}</p>
            ${pelicula.estados === 'Terminada' && pelicula.calificacion ? `
                <p><strong>Calificación:</strong> ${pelicula.calificacion}</p>
                <p><strong>Reseña:</strong> ${pelicula.resena}</p>
            ` : ''}
            <button onclick="modificarPelicula(${index})">Modificar</button>
            <button onclick="eliminarPelicula(${index})">Eliminar</button>
            ${pelicula.estados === 'Terminada' && !pelicula.calificacion ? `
                <form onsubmit="agregarCalificacion(event, ${index})">
                    <label for="calificacion-${index}">Calificación:</label>
                    <input type="number" id="calificacion-${index}" name="calificacion" min="1" max="10" required>
                    <label for="resena-${index}">Reseña:</label>
                    <textarea id="resena-${index}" name="resena"></textarea>
                    <button type="submit">Guardar</button>
                </form>
            ` : ''}
        `;
        listaPeliculas.appendChild(tarjeta);
    });
}

function agregarPelicula() {
    const nombre = document.getElementById('nombre').value;
    const genero = document.getElementById('genero').value;
    const formato = document.getElementById('formato').value;
    const plataforma = document.getElementById('plataforma').value;
    const estados = document.getElementById('estados').value;

    // Solo agrega calificación y reseña si el estado es 'Terminada'
    const calificacion = estados === 'Terminada' ? document.getElementById('calificacion').value : '';
    const resena = estados === 'Terminada' ? document.getElementById('resena').value : '';

    const nuevaPelicula = { estados, nombre, genero, formato, plataforma, calificacion, resena };

    const index = localStorage.getItem('indiceEdicion');
    if (index !== null) {
        peliculas[index] = nuevaPelicula;
        localStorage.removeItem('indiceEdicion');
        document.getElementById('btn-agregar').textContent = 'Agregar';
    } else {
        peliculas.push(nuevaPelicula);
    }

    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    location.href = 'tusPeliculasYSeries.html';
}

function eliminarPelicula(index) {
    peliculas.splice(index, 1);
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    mostrarPeliculas();
}

function modificarPelicula(index) {
    localStorage.setItem('indiceEdicion', index);
    location.href = 'gestor.html';
}

function agregarCalificacion(event, index) {
    event.preventDefault();
    const calificacion = event.target.querySelector(`#calificacion-${index}`).value;
    const resena = event.target.querySelector(`#resena-${index}`).value;

    peliculas[index].calificacion = calificacion;
    peliculas[index].resena = resena;

    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    mostrarPeliculas(); // Actualiza la lista después de guardar
}

function filtrarPeliculas() {
    const nombre = document.getElementById('filtro-nombre').value;
    const genero = document.getElementById('filtro-genero').value;
    const estado = document.getElementById('filtro-estado').value;
    const plataforma = document.getElementById('filtro-plataforma').value;

    const filtros = {
        nombre,
        genero,
        estado,
        plataforma
    };

    mostrarPeliculas(filtros); 
}

function toggleCalificacionResena() {
    const estado = document.getElementById('estados').value;
    const calificacionContainer = document.getElementById('calificacion-container');
    const resenaContainer = document.getElementById('resena-container');

    if (estado === 'Terminada') {
        calificacionContainer.style.display = 'block';
        resenaContainer.style.display = 'block';
    } else {
        calificacionContainer.style.display = 'none';
        resenaContainer.style.display = 'none';
    }
}

document.getElementById('estados').addEventListener('change', toggleCalificacionResena);
