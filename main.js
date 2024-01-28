//índice de recargo por metodo de pago
const inflacionPago = {
    "efectivo": 0,
    "pagadios": 35,
    "patacones": 9,
    "lecops": 10,
    "dolares": 25
};

//calculadora de cuotas
function calcularCuotas (precio, cuotas, metodo) {
    const interesPorcentaje = inflacionPago[metodo] || 0;
    const interes = precio * (interesPorcentaje / 100);
    const totalConInteres = precio + interes;
    const valorCuota = totalConInteres / cuotas;
    return valorCuota;
}

//clase constructora
class Compu {
    constructor(id, tipo, marca, modelo, memoria, info, precio){
        this.id = id;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.memoria = memoria;
        this.info = info;
        this.precio = precio;
    }
}

//creación del array de compus
const listaCompus = [
    new Compu(1, 'Notebook', 'Dell', 'Dell Inspiron', '8 GB', 'Una notebbok que es UN CAÑO.', 1200000 ),
    new Compu(2, 'Notebook', 'Clon', 'Asus TUF F15', '16 GB', 'PC para jueguitos.', 3450000 ),
    new Compu(3, 'Netbook', 'Lenovo', 'PC para estudio','16 GB', 'La Netbook que usó L-gante.', 540000 ),
    new Compu(4, 'PC de Escritorio 1', 'PC Clon', 'Tower', '16 GB', 'PC especial para edicion de video.', 8560230 ),
    new Compu(5, 'PC de Escritorio 2', 'Rejunte', 'XR260', '32 GB', 'PC para minería, virginidad asegurada lince.', 12560880 ),
];


//listar caractérísticas completas de la compu seleccionada
function mostrarPCxId(id) {
    const Compu = listaCompus.find(prod => prod.id === id);
    
    if (Compu) {
    const infoProducto = `
    ID: ${Compu.id}
    Tipo: ${Compu.tipo}
    Marca: ${Compu.marca}
    Modelo: ${Compu.modelo}
    Memoria: ${Compu.memoria}
    Información: ${Compu.info}

    Precio: $${Compu.precio.toLocaleString('es-AR')} ARS `; // info de internet para que aparezcan como moneda.
    alert(`Esta es la compu que seleccionó:\n${infoProducto}`);

    } else {
        alert(`No se encontró ninguna PC con ese ID doña: ${id}`);
    }
}

function selMetodo() {
    const promptMetodo = prompt(`Seleccione el método de pago:\n${Object.keys(inflacionPago).join(", ")}`); // buscado en internet
    const metodoPago = promptMetodo.toLowerCase();
    
    if(inflacionPago.hasOwnProperty(metodoPago)){
        return metodoPago
    }else{ 
        alert ("Ingrese un método de pago.")
        return selMetodo();
    }
    
}

function seleccionarCuotas() {
    let cuotas;
    do{
        cuotas = parseInt(prompt("Por favor, ingrese la cantidad de cuotas que desea abonar, sólo tenemos entre 1, 3, 6 y 12 cuotas"))
        if (cuotas != 1 && cuotas != 3 && cuotas != 6 && cuotas != 12){
            alert("Sólo puede pagar en: 1 / 3 / 6 y/o 12 cuotas señora")
        }
    } while(isNaN(cuotas) || (cuotas != 1 && cuotas != 3 && cuotas != 6 && cuotas != 12));
    
    return cuotas;
}

function mostrarCompus() {
    let booleano = true
    while(booleano){
    alert("BUENAS NOCHES, pase y vea estas computadoras señora: ")
    let lista = "Éstas son nuestras ofertas tecnológicas del finde: \n \n"

    for (const Compu of listaCompus) {
        lista += `${Compu.id}  -  ${Compu.info} \n `
    }
    const idInicial = parseInt(prompt(lista + '\n En qué compu está interesada doña? (prersione su respectivo ID): \n "9" si quiere salir de este menú'));
    const productoSeleccionado = listaCompus.find(prod => prod.id === idInicial);
    

    if (idInicial === 9){
        alert("Gracias, vuelva pronto!")
        return booleano = false
    } else if (productoSeleccionado) {
        mostrarPCxId(idInicial);

        const metodo = selMetodo();
        const cuotas = seleccionarCuotas();

        const valorCuota = calcularCuotas(productoSeleccionado.precio, cuotas, metodo);
        alert(`Señora, su cuota será de: $${valorCuota.toLocaleString('es-AR')} ARS`);
    } else {
        alert(`No hay nada con ese ID: ${idInicial}`);
    }

    booleano = volverInicio();

    function volverInicio(){
        const nose = prompt("Empezamos de nuevo doña? (si o no) ")
        if (nose === "no"){
            alert("Gracias por utilizar este mini Js para consulta precios de Compus, esperamos, en futuras prer-entregas, tener algo mejorcito.")
            return booleano = false;
        } else if (nose === "si"){
            return mostrarCompus();
        } else {
            alert("Porfavor ingresa si o no:");
            return volverInicio();
        }
    }
    
    }
}

mostrarCompus();