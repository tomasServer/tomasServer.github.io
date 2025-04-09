
document.addEventListener('DOMContentLoaded', function() {
    function verificarSesion() {
        const clienteActual = sessionStorage.getItem('clienteActual');
        return clienteActual !== null;
    }
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const numero = document.getElementById('numeroLogin').value;
            const contrasena = document.getElementById('contrasenaLogin').value;


            if (numero === 'admin' && contrasena === '1234') {
                document.getElementById('admin-panel').style.display = 'block';
                window.location.hash = '#admin-panel';
                return;
            }




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
    }


    const registroForm = document.getElementById('registroClienteForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
  
            const numero = document.getElementById('numero').value;
            const contrasena = document.getElementById('contrasena').value;
            const contrasena2 = document.getElementById('contrasena2').value;
            const nombre = document.getElementById('nombre').value;
            const ubicacion = document.getElementById('ubicacion').value;
            

            if (contrasena !== contrasena2) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            // Create user object
            const nuevoCliente = {
                id: Date.now(),
                numero: numero,
                contrasena: contrasena,
                nombre: nombre,
                ubicacion: ubicacion,
                fechaRegistro: new Date().toISOString()
            };
            
            // Get existing clients or create empty array
            const clientes = JSON.parse(localStorage.getItem('clientesNova')) || [];
            
            // Check if user already exists
            const clienteExistente = clientes.find(c => c.numero === numero);
            if (clienteExistente) {
                alert('Este número ya está registrado');
                return;
            }
            
            // Add new client
            clientes.push(nuevoCliente);
            
            // Save to localStorage
            localStorage.setItem('clientesNova', JSON.stringify(clientes));
            
            alert('Usuario registrado correctamente');
            window.location.hash = 'login';
        });
    }

    // Cerrar sesión button event
    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', cerrarSesion);
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
    localStorage.removeItem('usuarioActual');
    
    // Limpiar información del cliente en la interfaz
    const nombreElement = document.getElementById('pedido-nombre');
    const direccionElement = document.getElementById('pedido-direccion');
    
    if (nombreElement && direccionElement) {
        nombreElement.textContent = '';
        direccionElement.textContent = '';
    }
    
    alert('Sesión cerrada correctamente');
    window.location.hash = '#nosotros';
}



// ... existing code ...





