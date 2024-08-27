let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];

function agregarPelicula() {
    const nombre = document.getElementById('nombre').value;
    const genero = document.getElementById('genero').value;
    const formato = document.getElementById('formato').value;
    const plataforma = document.getElementById('plataforma').value;
    const estados = document.getElementById('estados').value;
    const calificacion = document.getElementById('calificacion').value;
    const resena = document.getElementById('resena').value;


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

function mostrarPeliculas() {
    var listaPeliculas = document.getElementById('lista-peliculas');
    listaPeliculas = '';
    peliculas.forEach((pelicula, index) => {
        console.log(pelicula.estados)
        listaPeliculas.innerHTML = `
            <div class="tarjeta-formulario">
                <h3>${pelicula.nombre}</h3>
                <p><strong>Género:</strong> ${pelicula.genero}</p>
                <p><strong>Formato:</strong> ${pelicula.formato}</p>
                <p><strong>Plataforma:</strong> ${pelicula.plataforma}</p>
                <p><strong>Estado:</strong> ${pelicula.estados}</p>
                <p><strong>Calificación:</strong> ${pelicula.calificacion}</p>
                <p><strong>Reseña:</strong> ${pelicula.resena}</p>
                <button onclick="eliminarPelicula(${index})">Eliminar</button>
                <button onclick="modificarPelicula(${index})">Modificar</button>
            </div>
        `;
    });
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

document.addEventListener('DOMContentLoaded', mostrarPeliculas);
