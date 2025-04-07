// ... existing code ...

// Función para verificar si hay una sesión activa
export function verificarSesion() {
    const clienteActual = sessionStorage.getItem('clienteActual');
    return clienteActual !== null;
}

// Agregar evento al botón de enviar pedido
document.getElementById('enviar-pedido').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (!verificarSesion()) {
        alert('Por favor inicia sesión para realizar un pedido');
        window.location.hash = 'login';
        return;
    }
    
    // Aquí continúa el código existente para enviar el pedido
    // ... resto del código para procesar el pedido ...
});

// ... existing code ...





// Estructura para almacenar clientes
let clientes = JSON.parse(localStorage.getItem('clientesNova')) || [];

// Estructura para almacenar pedidos
let pedidos = JSON.parse(localStorage.getItem('pedidosNova')) || [];


/// Función para registrar un nuevo cliente
function registrarCliente() {
    const numeroTelefono = document.getElementById('numero').value;
    const contrasena = document.getElementById('contrasena').value;
    const nombre = document.getElementById('nombre').value;    // Obtener el nombre
    const ubicacion = document.getElementById('ubicacion').value;
    
    // Validar datos incluyendo el nombre
    if (!numeroTelefono || !contrasena || !nombre || !ubicacion) {
        mostrarAlerta('Por favor completa todos los campos', 'error');
        return false;
    }
    
    // Verificar si el cliente ya existe
    const clienteExistente = clientes.find(cliente => cliente.numero === numeroTelefono);
    if (clienteExistente) {
        alert('Este número ya está registrado', 'error');
        return false;
    }
    
    // Crear nuevo cliente con nombre
    const nuevoCliente = {
        id: Date.now(),
        numero: numeroTelefono,
        contrasena: contrasena,
        nombre: nombre,
        ubicacion: ubicacion,
        fechaRegistro: new Date().toISOString()
    };
    
    // Verificar que el cliente tiene todos los datos antes de guardar
    console.log('Cliente a registrar:', nuevoCliente);



    // Agregar al array y guardar en localStorage
    clientes.push(nuevoCliente);
    localStorage.setItem('clientesNova', JSON.stringify(clientes));
    
    alert('Cliente registrado correctamente');
    document.getElementById('registroClienteForm').reset();
    
    return true;
}

// Asignar evento al formulario
document.getElementById('registroClienteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    registrarCliente();
});

// Función para iniciar sesión
function iniciarSesion() {
    const numeroTelefono = document.getElementById('numeroLogin').value;
    const contrasena = document.getElementById('contrasenaLogin').value;
    
    const cliente = clientes.find(c => c.numero === numeroTelefono && c.contrasena === contrasena);
    
    if (cliente) {
     // Guardar información de sesión
     sessionStorage.setItem('clienteActual', JSON.stringify(cliente));
     localStorage.setItem('usuarioActual', JSON.stringify(cliente));
        
          // Actualizar elementos directamente
          const nombreElement = document.getElementById('pedido-nombre');
          const direccionElement = document.getElementById('pedido-direccion');
        
        if (nombreElement && direccionElement) {
            nombreElement.textContent = cliente.nombre;  // Usar ubicación para ambos
            direccionElement.textContent = cliente.ubicacion;
            console.log('Datos del cliente:', cliente);
        }
        
        mostrarAlerta('Inicio de sesión exitoso', 'success');
        document.getElementById('loginForm').reset();
        window.location.hash = 'pedidos';
        
        return true;
    }else {
        mostrarAlerta('Número o contraseña incorrectos', 'error');
        return false;
    }
}

// Añadir este evento para actualizar cuando se carga la sección de pedidos
window.addEventListener('hashchange', function() {
    if (window.location.hash === '#pedidos') {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        if (usuarioActual) {
            const nombreElement = document.getElementById('pedido-nombre');
            const direccionElement = document.getElementById('pedido-direccion');
            
            if (nombreElement && direccionElement) {
                nombreElement.textContent = usuarioActual.nombre || '';
                direccionElement.textContent = usuarioActual.ubicacion || '';
            }
        }
    }
});

