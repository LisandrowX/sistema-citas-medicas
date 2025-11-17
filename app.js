let citas = [];
let contador = 1;

const btnAlerta = document.getElementById('btnAlerta');
const formCita = document.getElementById('formCita');
const tablaCitas = document.getElementById('tablaCitas');
const fechaActual = document.getElementById('fechaActual');

btnAlerta.addEventListener('click', function() {
    alert('Bienvenido al Sistema de Gestión de Citas Médicas\n\nAquí puedes:\n- Agendar nuevas citas\n- Ver todas tus citas\n- Gestionar tu información médica');
});

function mostrarFechaActual() {
    const hoy = new Date();
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    fechaActual.textContent = hoy.toLocaleDateString('es-ES', opciones);
}

formCita.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const doctor = document.getElementById('doctor').value;
    const motivo = document.getElementById('motivo').value;
    
    const nuevaCita = {
        id: contador++,
        nombre: nombre,
        cedula: cedula,
        telefono: telefono,
        correo: correo,
        fecha: fecha,
        hora: hora,
        doctor: doctor,
        motivo: motivo,
        estado: "Pendiente"
    };
    
    citas.push(nuevaCita);
    
    mostrarCitas();
    
    formCita.reset();
    
    alert('Cita agendada exitosamente para ' + nombre);
    
    guardarCitas();
});

function mostrarCitas() {
    tablaCitas.innerHTML = '';
    
    if (citas.length === 0) {
        tablaCitas.innerHTML = `
            <tr>
                <td colspan="10" class="text-center text-muted">No hay citas registradas</td>
            </tr>
        `;
        return;
    }
    
    citas.forEach((cita, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${cita.nombre}</td>
            <td>${cita.cedula}</td>
            <td>${cita.telefono}</td>
            <td>${cita.correo}</td>
            <td>${cita.doctor}</td>
            <td>${formatearFecha(cita.fecha)}</td>
            <td>${cita.hora}</td>
            <td>${cita.estado}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarCita(${cita.id})">
                    Eliminar
                </button>
            </td>
        `;
        tablaCitas.appendChild(fila);
    });
}

function eliminarCita(id) {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
        citas = citas.filter(cita => cita.id !== id);
        mostrarCitas();
        alert('Cita eliminada correctamente');
        guardarCitas();
    }
}

function formatearFecha(fecha) {
    const date = new Date(fecha + 'T00:00:00');
    const opciones = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', opciones);
}

function establecerFechaMinima() {
    const inputFecha = document.getElementById('fecha');
    const hoy = new Date().toISOString().split('T')[0];
    inputFecha.min = hoy;
}

function guardarCitas() {
    localStorage.setItem('citas', JSON.stringify(citas));
    localStorage.setItem('contador', contador);
}

function cargarCitas() {
    const citasGuardadas = localStorage.getItem('citas');
    const contadorGuardado = localStorage.getItem('contador');
    
    if (citasGuardadas) {
        citas = JSON.parse(citasGuardadas);
    }
    
    if (contadorGuardado) {
        contador = parseInt(contadorGuardado);
    }
    
    mostrarCitas();
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarFechaActual();
    establecerFechaMinima();
    cargarCitas();
});

let modoOscuro = false;

btnModoOscuro.addEventListener('click', function() {
    modoOscuro = !modoOscuro;
    
    if (modoOscuro) {
        document.body.classList.add('dark-mode');
        btnModoOscuro.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        btnModoOscuro.textContent = '🌙';
    }
});
