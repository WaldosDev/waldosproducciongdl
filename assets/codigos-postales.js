
// --- Variables
const btnAplicar = document.querySelector('#btnAplicar');
const inputCP = document.querySelector('#code_p');
const urlParams = new URLSearchParams(location.search);
const cpParam = urlParams.get('cp');

// Obtener valor del localstorage
const cp = localStorage.getItem('cp');

// --- Funciones
// Crear elemento para mostrar el cp 
const showCP = codecp => {
    // obtener elemento cp
    const divCP = document.querySelector("#divCP");

    // eliminar el boton de ingresa tu cp
    divCP.removeChild(divCP.firstChild);

    // crear link para mostrar codigo postal
    const linkCP = document.createElement('a');
    linkCP.href = "#modal-cp";
    linkCP.textContent = `Enviar a CP ${codecp}`;

    // agregar elemento link al elemento cp
    divCP.appendChild(linkCP);
}

// Mostrar cp en input
const showCPInput = codecp => {
    // Si ya ingreso un codigo postal anteriormente, mostrarlo
    const inputCP = document.querySelector('#code_p');
    inputCP.value = codecp;
}

// Obtener código postal desde localStorage y mostrarlo 
const getCP = () => {
    // Si hay un cp almacenado en localStorage...
    if(cp != null) {
        showCP(cp);
        showCPInput(cp);
    } else {
        if(location.pathname == '/')  {
            location.href = '#modal-cp';
        }
    }
}

const getCP_url = () => {
    // almacenar cp en local storage
    localStorage.setItem('cp', cpParam);

    showCP(cpParam);
    showCPInput(cpParam);

    if(cp == null)
        location.href = '#';
}

const validarCP = () => {
    // Seleccionar input text del codigo postal
    const inputCP = document.querySelector('#code_p');

    // Obtener el valor ingresado
    const valInputCP = parseInt(inputCP.value.trim());

    // Validar si hay un codigo postal
    if(valInputCP == "" || !Number.isInteger(valInputCP) || valInputCP.toString().length < 5)  {
        const span_msj = document.querySelector(".modal-content-cp span");
        const inputCP = document.querySelector(".modal-content-cp input[type=text]");

        // Mostrar mensaje de codigo postal valido
        span_msj.textContent = 'Ingresa un código postal valido';
        span_msj.classList.add('error-msj');
        inputCP.classList.add('show-errores');
        return;
    }

    // Validar que exista el codigo postal (pendiente)

    // Obtener valores de configuración desde un atributo data
    const CP_Guadalajara = btnAplicar.dataset.codigospostales;
    const urlStore = btnAplicar.dataset.urlstore;

    // Convertir los valores de códigos postales a un array
    const CP_Guadalajara_array = CP_Guadalajara.split(',').map(Number);

    // Si el código postal es de la zona de Guadalajara, redireccionar a esa tienda
    // Si es el caso contrario almacenar el código postal
    if(CP_Guadalajara_array.includes(valInputCP)) {
        // Almacenar en localStorage
        localStorage.setItem('cp', valInputCP);
        location.replace(`http://${window.location.host}`);
    } else {
        location.href = `${urlStore}?cp=${valInputCP}`;
    }
}

// --- Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Ejecutar funcion getCP_url si existe el parametro cp en la url
    if(cpParam != null) {
        getCP_url();
    } else {
        getCP();
    }
});
    
// Evento al dar clic en el botón Aplicar
btnAplicar.addEventListener('click', validarCP);
// Evento al dar enter al input de cp
inputCP.addEventListener('keyup', e => {
    if(e.code === 'Enter')
        validarCP();
});
    
// Si no hay un código postal, ejecutar cada ocho minutos (480000 milisengundos)

// mostrar modal si no ha ingresado ningún codigo postal  y si esta en el home de la página
// console.log(location.pathname == '/')
// console.log(cp == null && location.pathname == '/')
// if(cp == null && location.pathname == '/')  {
//     location.href = '#modal-cp';
// }