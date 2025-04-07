document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const numero = document.getElementById('numeroLogin').value;
    const contrasena = document.getElementById('contrasenaLogin').value;

    const clientes = JSON.parse(localStorage.getItem('clientesNova')) || [];
    const cliente = clientes.find(c => c.numero === numero && c.contrasena === contrasena);

    if (cliente) {
        // Guardar en localStorage
        localStorage.setItem('usuarioActual', JSON.stringify(cliente));
        
        // Actualizar elementos directamente
        const nombreElement = document.getElementById('pedido-nombre');
        const direccionElement = document.getElementById('pedido-direccion');
        
        if (nombreElement && direccionElement) {
            nombreElement.textContent = cliente.nombre || 'No especificado';
            direccionElement.textContent = cliente.ubicacion || 'No especificada';
            
            // Esperar un momento antes de redirigir
            setTimeout(() => {
                window.location.hash = 'pedidos';
            }, 100);
            return; // Salir de la función para evitar el redireccionamiento duplicado
        }
    } else {
        document.getElementById('respuesta').textContent = 'Usuario o contraseña incorrectos';
    }
});

// Verificar y mostrar información del usuario al cargar cada sección
window.addEventListener('hashchange', function() {
    if (window.location.hash === '#pedidos') {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        if (usuarioActual) {
            const nombreElement = document.getElementById('pedido-nombre');
            const direccionElement = document.getElementById('pedido-direccion');
            
            if (nombreElement && direccionElement) {
                nombreElement.textContent = usuarioActual.nombre || 'No especificado';
                direccionElement.textContent = usuarioActual.ubicacion || 'No especificada';
            }
        }
    }
});

function cerrarSesion() {
    // Limpiar datos de sesión
    sessionStorage.removeItem('clienteActual');
    localStorage.removeItem('usuarioActual');
    
    // Limpiar información del cliente en la interfaz
    const nombreElement = document.getElementById('pedido-nombre');
    const direccionElement = document.getElementById('pedido-direccion');
    
    if (nombreElement && direccionElement) {
        nombreElement.textContent = '';
        direccionElement.textContent = '';
    }
    
    alert('cuenta cerrada');
    window.location.hash = '#nosotros';
}

// Asignar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Asignar evento al botón de cerrar sesión
    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', cerrarSesion);
        console.log('Evento de cerrar sesión asignado correctamente');
    } else {
        console.log('Botón cerrar-sesion no encontrado en el DOM');
    }
    
    // Asignar evento al formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            iniciarSesion();
        });
    }
});