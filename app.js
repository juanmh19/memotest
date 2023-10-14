let nombres = [
    "avion",
    "automovil",
    "pescado",
    "perro",
    "gato",
    "lengua",
    "avion", // se repite
    "automovil",
    "pescado",
    "perro",
    "gato",
    "lengua",
];
let botones = document.querySelectorAll(".botones");
var iniciado = null;
var botonTocado = null;
var tocados = [];
var terminado = 0;
var tiempo = 0;
function mezclar() {
  iniciar.addEventListener("click", e=>{
    //se resetea el contador
    pifiados = 0
    tiempo = 0;
    iniciado = true;
    // AL HACER CLICK HACE VISIBLE LA LETRA
    botones.forEach(boton => {
      boton.style.color="black";
    });

    //ALGORITMO DE FISHER-YATE PARA EL AZAR
    for (let i = 0; i < nombres.length; i++) {
    //GENERA NUMEROS AL AZAR DEL 0 AL 11
    let j = Math.floor(Math.random() * (i + 1));
    // INTERCAMBIA LOS LUGARES DE LOS VALORES, (MEZCLA)
    [nombres[i], nombres[j]] = [nombres[j], nombres[i]];
  }

   //bucle para recorrer todo el array y colocar nombre en las cartas y remover efecto de correcto
   for (var i = 0; i < botones.length; i++) {
    //COLOCAR LOS NOMBRES EN LAS CARTAS
    botones[i].textContent = nombres[i];
    // REMOVER EL EFECTO CORRECTO / verde
    botones[i].style.backgroundColor="#fff";
  }

  TimeoutActivo = false;
  // DESPUES DE 5 SEGUNDOS HACE INVISIBLE LA LETRA
setTimeout(() => {
      botones.forEach(boton => {
      boton.style.color="transparent";
      TimeoutActivo = true;
    });
  }, 5000);
  })
}
mezclar(); 
let pifiados = 0
botones.forEach(boton => {
  boton.addEventListener("click", (event)=>{
    // guardamos el boton mas reciente que fue tocado
      const botonActual = event.target;
      // al tocar el boton lo muestra
      botonActual.style.color="black";
      //al tocarlo en medio segundo lo oculta/hace transparente
      setTimeout(() => {
        botonActual.style.color="transparent";
      }, 500);
      // si tienen el mismo valor y no son el mismo boton se les añadira el color verde
      if (botonTocado && botonTocado.textContent === botonActual.textContent && botonTocado !== botonActual && TimeoutActivo) {
        if (iniciado === true) {
          //añade color verde de correcto
        botonTocado.style.backgroundColor="#4eb64e"; 
        botonActual.style.backgroundColor="#4eb64e";
        //contador para saber si gano, aumenta si toco dos pares iguales
        terminado++;
        // si el boton es correcto no aumenta el valor de los botones errados
        pifiados--;
        botonTocado = null
        ganaste()
        console.log(terminado)
        console.log(pifiados)
        };
      } 
      else {
        //el boton tocado primero reemplaza el valor del boton tocado
        botonTocado = botonActual;
        //al tocar botones aumentan los errados de forma individual
        pifiados++
        console.log(terminado)
        console.log(pifiados + "pifiados")
        perdiste()
      };
  });
});

function ganaste() {
  if (terminado >= 6) {
    //desaparece todo el contenido
    caja.style.display ="none";
    //cambia el titulo
    titulo.textContent =`Ganaste!!! tardaste ${tiempo}s en conseguirlo`;
    //lo transforma en verde
    titulo.style.color ="#4eb64e"
  };
};

function perdiste() {
  if (pifiados >= 6) {
        //desaparece todo el contenido
        caja.style.display ="none";
        //cambia el titulo
        titulo.textContent =`Perdiste!!! agotaste tus 3 intentos`;
        //lo transforma en verde
        titulo.style.color ="red"
  }
}

//tiempo que tardo en encontrar los pares
setInterval(() => {
  tiempo++
}, 1000);

//resetear juego al ganar o perder
iniciar.addEventListener("click", e=> {
  //lo vuelve a mostrar/default
  caja.style.display ="block";
  // cambia el titulo al default
  titulo.textContent="Juego de memoria";
  // color default
  titulo.style.color ="#fff"
  //resetea los pares encontrados
  terminado = 0;
});