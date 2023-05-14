
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
        nombre: "Tokyo",
        hoteles: [
            {
                nombre: "Sotetsu Fresa Inn Ginza-Nanachome",
                precio: 85294

            },
            {
                nombre: "The Square Hotel GINZA",
                precio: 117280
            },
        ],
        precio: 50000
    },
    {
        nombre: "Kyoto",
        hoteles: [
            {
                nombre: "Hotel Resol Kyoto Kawaramachi Sanjo",
                precio: 90459
            },
            {
                nombre: "Hotel Resol Trinity Kyoto",
                precio: 102412
            },
        ],
        precio: 35000
    },
    {
        nombre: "Osaka", 
        hoteles: [
            {
                nombre: "Sotetsu Fresa Inn Osaka Namba",
                precio: 65748
            },
            {
                nombre: "Nest Hotel Osaka Umeda",
                precio: 58569
            },
        ],
        precio: 40000
    },
    {
        nombre: "Nara",
        hoteles: [
            {
                nombre: "Nara Royal Hotel",
                precio: 41403
            },
            {
                nombre: "Hotel Nikko Nara",
                precio: 60772
            },
        ],
        precio: 25000
    }
]

const dbReservas = [
    {
        id: 123670123,
        ciudad: "Tokyo",
        hotel: "Sotetsu Fresa Inn Ginza-Nanachome",
        cantPersonas: 2,
        precio: 160000,
        nombrePersona: "Luciano Ferrando",
        fechaEntrada: (new Date("December 26, 2023 14:00:00")).toLocaleString(),
        fechaSalida:(new Date("December 30, 2023 14:00:00")).toLocaleString()
    },
    {
        id: 211367812,
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
    constructor(ciudad, hotel, cantPersonas, precio, nombrePersona, fechaEntrada, fechaSalida){
        this.id = this.generarID();
        this.ciudad = ciudad;
        this.hotel = hotel;
        this.cantPersonas = cantPersonas;
        this.precio = precio;
        this.nombrePersona = nombrePersona;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
    }
    generarID(){ 
        return Math.random().toString(30).substring(2);           
    } 


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
    let opcionValida = false;
    let valorPersonas;
    while(!opcionValida){
        let cantPersonas = parseInt(prompt(`Ingrese la cantidad de personas que se alojarán en el Hotel: `))
        // console.log(cantPersonas)
        if(cantPersonas < 1 || cantPersonas == undefined){
            alert("La cantidad de personas no puede ser inferior a 1, inrgese nuevamente")
        }else{
            if(cantPersonas <= 3){
                valorPersonas = 3500
            }else if(cantPersonas <= 6){
                valorPersonas = 5500
            }else{
                valorPersonas = 7000
            }
            opcionValida = true;
        }
    }
    return valorPersonas
}

function crearPersona(){
    let personaExiste = false
    let persona;
    while(!personaExiste){
        let nombre = prompt("Ingresa tu nombre:")
        let edad = parseInt(prompt("Ingresa tu edad: "))
        while(true){
            if(edad > 1){
                break
            }else{
                alert("La edad que ingresaste no es válida, ingresa nuevamente")
                edad = parseInt(prompt("Ingresa tu edad: "))
            }
        }
        let rut = prompt("Ingresa tu Rut (sin puntos y con guión) o DNI: ")
        let per = buscarPersona(rut)
        if(per){
            // alert("Persona ya existe")
            persona = per
            personaExiste = true
        }else{
            // alert("Creando persona")
            persona = new Persona(nombre, edad, rut)
            personas.push(persona)
        }
    }
    return persona
}

function comprarReserva(){

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

}

function buscarReservaID(idReserva){
    let reservaEncontrada = reservas.find((reserva) => reserva.id == idReserva)
    return reservaEncontrada
}

function mostarReservaID(){
    
    let id = parseInt(prompt("Ingresa el codigo de tu reserva: "))
        if(id!=undefined){
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
                let persona = crearPersona()
                console.log(persona)
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







// let finalizar = false



// var IVA = 0.19;

// function calcularTotalIVA(total, IVA){
//     const totalIVA = total*(1+IVA)
//     console.log("Total sin IVA: " + total)
//     console.log("Total IVA:" + totalIVA)
//     return totalIVA
// }

// function calcularTotal(valorPersonas, valorCiudad, valorHotel){
//     const valorFinal = valorPersonas + valorCiudad + valorHotel
//     console.log(valorPersonas, valorCiudad, valorHotel)
//     console.log("Valor final: " + valorFinal)
//     return valorFinal
    
// }



// function valorPorCiudad(){
//     let opcionValida = false;
//     let valorCiudad;
//     let ciudad = prompt(`Elija la ciudad en donde quiere hospedarse. Por favor, ingrese el número corresponiente a la ciudad:   
//     1. Osaka: $40.000
//     2. Kyoto: $35.000
//     3. Tokyo: $50.000
//     4. Nara:  $25.000`)
//     while(!opcionValida){
//         if(ciudad == "1"){
//             ciudad = "Osaka"
//             valorCiudad = 40000
//             opcionValida = true
//         }else if(ciudad == "2"){
//             ciudad = "Kyoto"
//             valorCiudad = 35000
//             opcionValida = true
//         }else if(ciudad == "3"){
//             ciudad = "Tokyo"
//             valorCiudad = 50000
//             opcionValida = true
//         }else if(ciudad == "4"){
//             ciudad = "Nara"
//             valorCiudad = 25000
//             opcionValida = true
//         }else{
//             alert("Opción inváldia, ingrese nuevamente")
//             ciudad = prompt(`Elija la ciudad en donde quiere hospedarse. Por favor, ingrese el número corresponiente a la ciudad:   
//             1. Osaka: $40.000
//             2. Kyoto: $35.000
//             3. Tokyo: $50.000
//             4. Nara:  $25.000`)
//         }
       
        
//     }

//     return {ciudad, valorCiudad}


// }       


// // TOKYO
// // - Sotetsu Fresa Inn Ginza-Nanachome 85.294
// // - The square hotel GINZA = 117.280
// // OSAKA
// // - Sotetsu Fresa Inn Osaka Namba = 65.748
// // - Nest Hotel Osaka Umeda = 58.569
// // KYOTO
// // - Hotel Resol Kyoto Kawaramachi Sanjo = 90.459
// // - Hotel Resol Trinity Kyoto = 102.412
// // NARA
// // - Nara Royal Hotel = 41.403
// // - Hotel Nikko Nara = 60.772

// function valorPorHotel(ciudad){

//     let hotel;
//     let valorHotel;
//     if(ciudad == "Osaka"){
//         hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//          1. Sotetsu Fresa Inn Osaka Namba: $65.748
//          2. Nest Hotel Osaka Umeda: $58.569`)

//         while(hotel != "1" && hotel!= "2" && hotel == null){
//             alert("Debe inrgesar un número de hotel válido")
//             hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//             1. Sotetsu Fresa Inn Osaka Namba: $65.748
//             2. Nest Hotel Osaka Umeda: $58.569`)
//         }
//         if(hotel == "1"){
//             valorHotel = 65748
//             hotel ="Sotetsu Fresa Inn Osaka Namba"
//         }else{
//             valorHotel = 58569
//             hotel ="Nest Hotel Osaka Umeda"
//         }
//     }else if(ciudad == "Kyoto"){
//         hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//         1. Hotel Resol Kyoto Kawaramachi Sanjo: $90.459
//         2. Hotel Resol Trinity Kyoto: $102.412`)

//         while(hotel != "1" && hotel!= "2" && hotel == null){
//            alert("Debe inrgesar un número de hotel válido")
//            hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//            1. Hotel Resol Kyoto Kawaramachi Sanjo: $90.459
//            2. Hotel Resol Trinity Kyoto: $102.412`
//            )
//         }
//         if(hotel == "1"){
//             valorHotel = 90459
//             hotel ="Hotel Resol Kyoto Kawaramachi Sanjo"
//         }else{
//             valorHotel = 102412
//             hotel ="Hotel Resol Trinity Kyoto"
//         }
//     }else if(ciudad == "Tokyo"){
//         hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//         1. Sotetsu Fresa Inn Ginza-Nanachome: $85.294
//         2. The square hotel Ginza: $117.280`)
//         while(hotel != "1" && hotel!= "2" && hotel == null){

//             alert("Debe inrgesar un número de hotel válido")
//             hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//                 1. Sotetsu Fresa Inn Ginza-Nanachome: $85.294
//                 2. The Square Hotel Ginza: $117.280`)
//         }
//         if(hotel == "1"){
//             valorHotel = 85294
//             hotel ="Sotetsu Fresa Inn Ginza-Nanachome"
//         }else{
//             valorHotel = 117280
//             hotel ="The Square Hotel Ginza"
//         }
//     }else if(ciudad == "Nara"){
//         hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//         1. Nara Royal Hotel = $41.403
//         2. Hotel Nikko Nara = $60.772`)
//        while(hotel != "1" && hotel!= "2" && hotel == null){
//            alert("Debe inrgesar un número de hotel válido")
//            hotel = prompt(`Elija el hotel en donde quiere hospedarse. Por favor, ingrese el número corresponiente hotel:   
//            1. Nara Royal Hotel = $41.403
//            2. Hotel Nikko Nara = $60.772`)
//        }

//        if(hotel == "1"){
//             valorHotel = 41403
//             hotel ="Nara Royal Hotel"
//         }else{
//             valorHotel = 60772
//             hotel ="Hotel Nikko Nara"
//         }
//     }
    
//     return {hotel, valorHotel}
    
// }





// function valorCantidadPersonas(){
//     let opcionValida = false;
//     let valorPersonas;
//     while(!opcionValida){
//         let cantPersonas = parseInt(prompt(`Ingrese la cantidad de personas que se alojarán en el Hotel`))
//         console.log(cantPersonas)
//         if(cantPersonas < 1 || cantPersonas == undefined){
//             alert("La cantidad de personas no puede ser inferior a 1, inrgese nuevamente")
//         }else{
          
//             if(cantPersonas <= 3){
//                 valorPersonas = 3500
//             }else if(cantPersonas <= 6){
//                 valorPersonas = 5500
//             }else{
//                 valorPersonas = 7000
//             }
//             opcionValida = true;
//         }

//     }

//     return valorPersonas
// }






// function reservarHotel(){

        
//     while (!finalizar) {
//         let opcion = prompt(`Elige una opción: 
            
//         1. Listar precios base por ciudades
//         2. Listar valores por persona 
//         3. Reservar hospedaje
//         4. Salir
//         `)
//         switch (opcion) {
//             case "1":
//                 alert(`
//                     1. Osaka: $40.000
//                     2. Kyoto: $35.000
//                     3. Tokyo: $50.000
//                     4. Nara:  $25.000
//                     5. Atras 
//                 `)
//                 break;
//             case "2":
//                 alert(`Valores base por cantidad de personas
//                     1. Entre 1 y 3: $3.500 adicional por persona
//                     2. Entre 4 y 6: $5.500 adicional por persona
//                     3. Más de 6: $7.000 adicional por persona
//                 `)
//                 break;
//             case "3":
//                 const {ciudad, valorCiudad} = valorPorCiudad()
//                 const {hotel, valorHotel} = valorPorHotel(ciudad)
//                 const valorPersona = valorCantidadPersonas()
//                 const valorTotal = calcularTotal(valorPersona, valorCiudad, valorHotel)
//                 const valorFinal = calcularTotalIVA(valorTotal, IVA)
//                 alert(`Reserva lograda con éxito.
//                 Usted ha reservado una habitación en el Hotel ${hotel} de la ciudad de ${ciudad}, por un total de $${Math.round(valorFinal)}`)
//                 break;
//             case "4":
//                 finalizar = true
//                 break;
//             default:
//                 alert("La opción elegida no es válida")
//                 opcion = prompt(`Elige una opción: 
//                     1. Listar ciudades
//                     2. Listar valores por persona 
//                     3. Reservar hospedaje
//                     4. Salir
//                 `)          
//                 break;
//         }

//     }
// }

// alert(`Bienvenidos a hospedajes Nippon
//        日本のの宿へようこそ`)


// reservarHotel();