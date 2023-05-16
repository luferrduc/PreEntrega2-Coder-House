
// Lista de ciudades con sus respectivos Hoteles y precios


// TOKYO
// - Sotetsu Fresa Inn Ginza-Nanachome 85.294
// - The square hotel GINZA = 117.280
// OSAKA
// - Sotetsu Fresa Inn Osaka Namba = 65.748
// - Nest Hotel Osaka Umeda = 58.569
// KYOTO
// - Hotel Resol Kyoto Kawaramachi Sanjo = 90.459
// - Hotel Resol Trinity Kyoto = 102.412
// NARA
// - Nara Royal Hotel = 41.403
// - Hotel Nikko Nara = 60.772

const ciudades = [
    {
        id: 1,
        nombre: "Tokyo",
        hoteles: [
            {
                id: 1,
                nombre: "Sotetsu Fresa Inn Ginza-Nanachome",
                precio: 85294

            },
            {
                id: 2,
                nombre: "The Square Hotel GINZA",
                precio: 117280
            },
        ],
        precio: 50000
    },
    {
        id: 2,
        nombre: "Kyoto",
        hoteles: [
            {
                id: 1,
                nombre: "Hotel Resol Kyoto Kawaramachi Sanjo",
                precio: 90459
            },
            {
                id: 2,
                nombre: "Hotel Resol Trinity Kyoto",
                precio: 102412
            },
        ],
        precio: 35000
    },
    {   
        id: 3,
        nombre: "Osaka", 
        hoteles: [
            {
                id: 1,
                nombre: "Sotetsu Fresa Inn Osaka Namba",
                precio: 65748
            },
            {
                id: 2,
                nombre: "Nest Hotel Osaka Umeda",
                precio: 58569
            },
        ],
        precio: 40000
    },
    {
        id: 4,
        nombre: "Nara",
        hoteles: [
            {
                id: 1,
                nombre: "Nara Royal Hotel",
                precio: 41403
            },
            {
                id: 2,
                nombre: "Hotel Nikko Nara",
                precio: 60772
            },
        ],
        precio: 25000
    }
]

const dbReservas = [
    {
        id: "b4gkn6isr4i",
        ciudad: "Tokyo",
        hotel: "Sotetsu Fresa Inn Ginza-Nanachome",
        cantPersonas: 2,
        precio: 160000,
        nombrePersona: "Luciano Ferrando",
        fechaEntrada: (new Date("December 26, 2023 14:00:00")).toLocaleString(),
        fechaSalida:(new Date("December 30, 2023 14:00:00")).toLocaleString()
    },
    {
        id: "0o6nbin4af0r",
        ciudad: "Osaka",
        hotel: "Nest Hotel Osaka Umeda",
        cantPersonas: 4,
        precio: 89923,
        nombrePersona: "José Pérez",
        fechaEntrada: (new Date("March 26, 2024 11:00:00")).toLocaleString(),
        fechaSalida:(new Date("March 30, 2024 14:00:00")).toLocaleString()
    }
]

const dbPersonas = [
    {
        nombre: "Luciano Ferrando",
        edad: 29,
        rut: "18621142-1"
    }
]

class Reserva{
    constructor(id, ciudad, hotel, cantPersonas, precio, nombrePersona, fechaEntrada, fechaSalida){
        this.id = id;
        this.ciudad = ciudad;
        this.hotel = hotel;
        this.cantPersonas = cantPersonas;
        this.precio = precio;
        this.nombrePersona = nombrePersona;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
    }


}

function generarID(){ 
    return Math.random().toString(30).substring(2);           
} 


class Persona{
    constructor(nombre, edad, rut){
        this.id = this.generarID()
        this.nombre = nombre;
        this.edad = edad;
        this.rut = rut;
    }
    generarID(){ 
        return Math.random().toString(30).substring(2);           
    } 
}
// Arrays de objetos
const reservas = []
const personas = []

// Ingresar objetos de Reserva dentro del array para poblar con datos de prueba
dbReservas.map((dbReserva) => {
    let reserva = new Reserva(dbReserva.id, dbReserva.ciudad, dbReserva.hotel, dbReserva.cantPersonas, dbReserva.precio, dbReserva.nombrePersona, dbReserva.fechaEntrada, dbReserva.fechaSalida)
    
    reservas.push(reserva)
})
// Ingresar objetos de Persona dentro del array para poblar con datos de prueba
dbPersonas.map(dbPersona => {
    let persona = new Persona(dbPersona.nombre, dbPersona.edad, dbPersona.rut)
    personas.push(persona)
})

let seguir = true;


// Calcular el valor final 
// Cada ciudad tiene un valor base (VB)
// A este se le suma el valor del hotel correspondiente multiplicado por la cantidad de días (VN * P)
// Finalmente, se le agrega un valor extra por cada persona dependiendo de la cantidad (P * VP)
// Cada rango tiene un valor unitario extra por persona
// VB + VN*P + P*VP




// Funciones de Cálculo
function calcularTarifaPersonas(){
    let opcionValida = true;
    let valorPersonas;

    let cantPersonas = parseInt(prompt(`Ingrese la cantidad de personas que se alojarán en el Hotel: `))
    console.log(cantPersonas)
    while(opcionValida){
        if(cantPersonas < 1 || cantPersonas == undefined || isNaN(cantPersonas)){
            alert("La cantidad de personas no puede ser inferior a 1, inrgese nuevamente")
            cantPersonas = parseInt(prompt(`Ingrese la cantidad de personas que se alojarán en el Hotel: `))
        }else{
            if(cantPersonas <= 3){
                valorPersonas = 3500 * cantPersonas
            }else if(cantPersonas <= 6){
                valorPersonas = 5500 * cantPersonas
            }else{
                valorPersonas = 7000 * cantPersonas
            }
            opcionValida = false;
        }
    }
    return {valorPersonas, cantPersonas}
}

function crearPersona(){
    let edadInvalida = false
    let rutInvalido = false
    let nombreInvalido = false
    
    
    let nombre = prompt("Ingresa tu nombre:")
    while(!nombreInvalido){
        if(nombre){
            nombreInvalido = true
        }else{
            alert("El nombre es un campo obligatorio")
            nombre = prompt("Ingresa tu nombre: ")
        }
    }
    console.log("Nombre correcto", nombre)
    let edad = parseInt(prompt("Ingresa tu edad: "))
    while(!edadInvalida){
        if(edad > 1 && edad <= 100){
            edadInvalida = true
        }else{
            alert("La edad que ingresaste no es válida, ingresa nuevamente")
            edad = parseInt(prompt("Ingresa tu edad: "))
        }
    }
    let rut = prompt("Ingresa tu Rut (sin puntos y con guión) o DNI: ")
    while(!rutInvalido){
        if(rut){
            rutInvalido = true
        }else{
            alert("El campo es obligatorio")
            rut = prompt("Ingresa tu Rut (sin puntos y con guión) o DNI: ")
        }
    }


    let persona = buscarPersona(rut)
    if(!persona){
        persona = new Persona(nombre, edad, rut)
        personas.push(persona)
        console.log("Creando Persona")
    }
    return persona
}


function crearReserva(nombrePersona, hotel, ciudad, cantPersonas, tarifaPersona){
    let precioHotel = hotel.precio
    let nombreHotel = hotel.nombre
    let nombreCiudad = ciudad.nombre
    let precioCiudad = ciudad.precio

    // ENTRADA
    let fechaEntrada = prompt("Elija la fecha de entrada para su estadía (dd/mm/yyyy)")
    fechaEntrada = fechaEntrada.split('/')
    fechaEntrada.forEach( ele => {
        parseInt(ele)
    })

    let [diaE, mesE, anioE] = fechaEntrada
  
    let horaEntrada = prompt("Elige la hora de entrada (hh:mm:ss)")
    horaEntrada = horaEntrada.split(':')
    let [horaE, minE, segE] = horaEntrada

    let fechaE = new Date(anioE, mesE-1, diaE, horaE, minE, segE)
    

    // SALIDA
    let fechaSalida = prompt("Elija la fecha de salida para su estadía (dd/mm/yyyy)")
    fechaSalida = fechaSalida.split('/')
    fechaSalida.forEach( ele => {
        parseInt(ele)
    })
    let [diaS, mesS, anioS] = fechaSalida
   

    let horaSalida = prompt("Elige la hora de Salida (hh:mm:ss)")
    horaSalida = horaSalida.split(':')
    let [horaS, minS, segS] = horaSalida

    let fechaS = new Date(anioS, mesS-1, diaS, horaS, minS, segS)
    let milisegundosEnDia = 86400000


    let cantidadDias = Math.floor((fechaS - fechaE)/milisegundosEnDia)

    fechaE = fechaE.toLocaleString();
    fechaS = fechaS.toLocaleString();
    


    let valorHotelDias = precioHotel * cantidadDias

    let precioFinal = tarifaPersona + valorHotelDias + precioCiudad
    let id = generarID()


    let nuevaReserva = new Reserva(id, nombreCiudad, nombreHotel, cantPersonas, precioFinal,nombrePersona, fechaE, fechaS)
    reservas.push(nuevaReserva)
  
    alert(` Nueva reserva generada: 
            Nombre: ${nombrePersona}
            Hotel: ${nombreHotel}
            Cantidad de personas: ${cantPersonas}
            Fecha entrada: ${fechaE}
            Fecha Salida: ${fechaS}
            Total a pagar: $${precioFinal} 
            Tu código de reserva es: ${nuevaReserva.id}
           `)
    
}

function elegirReserva(){
    let ciudadValida = true;
    let hotelValido = true;
    let persona = crearPersona()
 
    let textoCiudades = "" 
    for (let ciudad of ciudades) {
        textoCiudades+= `${ciudad.id}. ${ciudad.nombre}:  $${ciudad.precio}\n`
    }

    // Encontrar la ciudad a la que se quiere ir y devolverla
    let ciudad = prompt(`En qué ciudad le gustaría hospedarse?\n${textoCiudades}`)
    while(ciudadValida){
        
        let ciudadEncontrada = ciudades.find( c => {
            return c.id == ciudad || c.nombre.toUpperCase() == ciudad.toUpperCase()
        }) 
        if(ciudadEncontrada){
            ciudadValida = false
        }else{
            alert("Esa ciudad no existe dentro de la lista, elija nuevamente")
            ciudad = prompt(`En qué ciudad le gustaría hospedarse?\n${textoCiudades}`)
        }
        let textoHoteles = "" 
        for (let hotel of ciudadEncontrada.hoteles) {
            textoHoteles+= `${hotel.id}. ${hotel.nombre}:  $${hotel.precio}\n`
        }

        while(hotelValido){
            let hotel = prompt(`En qué hotel le gustaría hospedarse?\n${textoHoteles}`)
            let hotelEncontrado = ciudadEncontrada.hoteles.find( h => {
                return h.id == hotel || h.nombre.toUpperCase() == hotel.toUpperCase()
            }) 
            if(hotelEncontrado){
                hotelValido = false
                let {valorPersonas, cantPersonas} = calcularTarifaPersonas()

                crearReserva(persona.nombre, hotelEncontrado, ciudadEncontrada, cantPersonas, valorPersonas)
            }else{
                alert("Ese hotel no existe dentro de la lista, elija nuevamente")
                hotel = prompt(`En qué hotel le gustaría hospedarse?\n${textoHoteles}`)
            }
        }
    }    
}

function comprarReserva(){
    let repetirProceso = true
   
    elegirReserva()
    while(repetirProceso){
        let opcion = prompt("Desea seguir?:\n1. Si\n2. No")
        
        switch(opcion){
            case "1":
                elegirReserva()
            case "2":
                repetirProceso = false
                break
            default:
        }

    }

    initProgram()

}

// Funciones de búsqueda
function buscarPersona(rut){
    let personaExiste = personas.find(persona => persona.rut == rut)

    return personaExiste
}


// Funciones de muestra de datos
function verPreciosHoteles(){

    let ciudad = prompt("Ingresa el nombre de la ciudad que buscas: ") 
    const ciudadEncontrada  = ciudades.find( city => {
        return city.nombre.toUpperCase() == ciudad.toUpperCase()
    })
    let textoHoteles = '';
    if(ciudadEncontrada){   
        let contador = 1;
        for (const hotel of ciudadEncontrada.hoteles) {
            textoHoteles+= `${contador}. ${hotel.nombre}: $${hotel.precio} \n`;
            contador++;
        }
        alert(textoHoteles);
    }else{
        alert(`La ciudad "${ciudad}" no se encuentra en nuestra base de datos`)
    }
    initProgram()
}

function verPrecioCiudades(){
    let textoCiudades = 'El valor que se muestra a continuación es un precio base por ciudad: \n';
    let contador = 1;
    for (let ciudad of ciudades) {
        textoCiudades+= `${contador}. ${ciudad.nombre}:  $${ciudad.precio}\n`
        contador++;
    }
    alert(textoCiudades);
    initProgram()
}

function verTarifasPersona(){
    let textoTarifas = 'El valor que se muestra a continuación una tarifa por rango de personas: \n';
    textoTarifas+= '1. Entre 1 y 3:   $3500 por persona\n2. Entre 4 y 6:   $5500 por persona\n3. Más de 6:     $7000 por persona'
    alert(textoTarifas)
    initProgram()
}

function mostrarReservas(){
     
    if(reservas.length < 1){
        alert("No existen reservas")
    }else{
        let nombre = prompt("Indique su nombre para listar sus reservas")
        let reservasEncontradas = reservas.some( reservaEncontrada => reservaEncontrada.nombrePersona.toUpperCase() == nombre.toUpperCase())
        if(reservasEncontradas){
            let textoReservas = ''  
            for (let reserva of reservas) {
                if(reserva.nombrePersona.toUpperCase() == nombre.toUpperCase()){
                    textoReservas+= `Codigo Reserva: ${reserva.id}\nHotel: ${reserva.hotel}\nFecha Entrada: ${reserva.fechaEntrada}\nFecha Salida: ${reserva.fechaSalida}\nPrecio: ${reserva.precio}\n
                    -------------------------------------------------\n`
                }
            }
            alert(textoReservas)
        }else{
            alert(`No existen reservas a nombre de ${nombre}`)
        }
    }
}

function buscarReservaID(idReserva){
    console.log(idReserva)
    let reservaEncontrada = reservas.find((reserva) =>  {return reserva.id == idReserva})
    return reservaEncontrada
}

function mostarReservaID(){
    
    let id = prompt("Ingresa el codigo de tu reserva: ")

        if(id!=undefined && id != null){
            let reserva = buscarReservaID(id)
            if(reserva==undefined){
                alert("No existe una reserva con ese id, ingrese nuevamente")
            }else{
                let textoReserva = `La reserva con código ${id} es:\n`
                textoReserva+= `Nombre: ${reserva.nombrePersona}\nHotel: ${reserva.hotel}\nCantidad personas: ${reserva.cantPersonas}\nFecha llegada: ${reserva.fechaEntrada}\nFecha salida: ${reserva.fechaSalida}\nPrecio: $${reserva.precio}`
                alert(textoReserva)
                initProgram()
            }
        }
    
}

// Función Principal

function initProgram(){

    while (seguir) {
        let opcion = prompt("¿Qué quieres hacer? \n 1. Ver precio Ciudades \n 2. Ver precio Hoteles por ciudad \n 3. Ver tarifas valor por persona \n 4. Ver Reservas \n 5. Buscar una reserva por ID/Código \n 6. Comprar Reserva \n 7. Salir");
        switch (opcion) {
            case "1":
                verPrecioCiudades()
                break
            case "2":
                verPreciosHoteles()
                break
            case "3":
                verTarifasPersona()
                break
            case "4":
                mostrarReservas()
                break
            case "5":
                mostarReservaID()
                break
            case "6":
                comprarReserva()
                break
            case "7":
                seguir = false;
                break
            default:
                alert("No ingresaste una opción valida, selecciona nuevamente")
                break
        }
    }
}



initProgram();






