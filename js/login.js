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