//Codigo que captura el boton que confirma la operacion
const captura = document.getElementById("depositos-submit");
//Codigo que captura el boton que modifica la operacion
const clean = document.getElementById("limpiar-campo");
// Funcion que limpia el campo input en caso de que el usuario quiera modificar el importe a depositar
clean.onclick = () => {
  inputDepositos.value = "";
};
//Codigo que captura el campo donde el usuario debe ingresar la cantidad de dinero que desea depsositar
let inputDepositos = document.getElementById("depositos-input");
//Funcion que separa el miles el numero ingresado por el usuario
const formatearNumero = () => new AutoNumeric('#depositos-input', {
  decimalCharacter : ',',
  digitGroupSeparator : '.',
});
//Llamada a la funcion
formatearNumero();
//Declaracion de la variable que va a almacenar el importe ingresado por el usuario
let unformatNumber;
//Funcion que captura la informacion brindada por el usuario y confirma la operacion
captura.onclick = () => {
  //Asignacion del valor a la variable creada anteriormente(remueve puntos y comas y divide por 100 para remover los decimales) 
  unformatNumber = inputDepositos.value.split( /\.|\,/).join("") / 100;
  //Llamada a las funciones declaradas
  confirmarOperacion();
  console.log(typeof(unformatNumber));
};
// Constructor del objeto depositos;
class Operacion {
  constructor(fecha, hora, operacion, monto, saldo) {
    this.fecha = fecha;
    this.hora = hora;
    this.operacion = operacion;
    this.monto = monto;
    this.saldo = saldo;
  }
}
//Funcion que utiliza el constructor Depositos para crear un nuevo objeto que contiene los datos de la operacion realizada
const crearOperacion = () => {
  nuevaOperacion = new Operacion(
    capturarDiaDeposito(),
    capturarHoraDeposito(),
    nombrarOperacion(),
    numeroADinero(unformatNumber),
    numeroADinero(saldoCajaAhorro)
  );
  return nuevaOperacion;
};
//Funcion que captura la fecha en que se realiza la operación
const capturarDiaDeposito = () => new Date().toLocaleDateString();
//Funcion que captura la hora en que se realiza la operacion
const capturarHoraDeposito = () => new Date().toLocaleTimeString();
//Codigo que informa el tipo de operacion
const nombrarOperacion = () => "Depósito";
//Funcion que dispara un alert que confirma o cancela la operación
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea depositar la suma de ${numeroADinero(unformatNumber)} ?`,
    confirmButtonText: "Save",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__fadeIn",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: `Operación realizada con exito. Su saldo es ${numeroADinero(
          saldoCajaAhorro
        )}`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeIn",
        },
      }).then(function () {
        crearOperacion();
        cargarOperacion();
        actualizarSaldoStorage();
        enviarDatos();
        setTimeout(function () {
          window.location.href = "../opcion/opcion.html";
        }, 1000);
      });
    } else if (result.isDismissed) {
      //Codigo que evita que el saldo se actualice si la operacion es rechazada
      saldoCajaAhorro = localStorage.getItem("saldo");
      Swal.fire({
        icon: "error",
        title: "Operación Cancelada",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeIn",
        },
      }).then(function () {
        window.location.href = "../opcion/opcion.html";
      });
    }
  });
};
//Funcion que almacena la nueva operaciones en una variable para luego ser enviada al servidor
const cargarOperacion = () => {
  depositoRealizado = crearOperacion();
};
//Funcion que envia la informacion generada por el usuario al servidor y la almacena en el localstorage
const enviarDatos = () => {
  const jsonplaceholder = "https://jsonplaceholder.typicode.com/posts";
  fetch(jsonplaceholder, {
    method: "POST",
    body: JSON.stringify(depositoRealizado),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      localStorage.setItem("depositoRealizado", JSON.stringify(datos));
    });
};


