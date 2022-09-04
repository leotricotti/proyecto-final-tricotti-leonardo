//Codigo para cambiar el subtitulo del simulador
const text = document.querySelector(".text");
text.innerHTML =
  '<p class="text"> Ingrese el monto que desea transferir: <input type="number" class="input" id="transferencia-input"></p>';
//Codigo que toma el nombre del titular de la cuenta almacenado en el localstorage
let cuentaSeleccionada = localStorage.getItem("destinatario");
//Codigo que captura el boton que confirma la operacion
let capturarValor = document.getElementById("transferencia-submit");
//Codigo que captura el campo donde el usuario debe ingresar la cantidad de dinero que desea transferir
let inputTransferencia = document.getElementById("transferencia-input");
//Codigo que captura el boton que modifica la operacion
const clean = document.getElementById("limpiar-campo");
//Codigo que captura el boton modificar
const opcionModificada = document.getElementById("limpiar-campo");
// Funcion que limpia el campo input si el usuario así lo requiere
opcionModificada.onclick = () => (inputTransferencia.value = "");
//Codigo que dispara un alert que confirma o cancela la operación
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea transferir a ${cuentaSeleccionada} la suma de ${numeroADinero(
      inputTransferencia.value
    )} ?`,
    confirmButtonText: "Save",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__fadeIn",
    },
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
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
        actualizarSaldoStorage();
        cargarOperacion();
        enviarDatos();
        //Funcion que compensa la latencia del servidor
        setTimeout(function () {
          window.location.href = "../opcion/opcion.html";
        }, 1000);
      });
    } else if (result.isDismissed) {
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
//Funcion que confirma que el usuario tenga fondos suficientes antes de realizar la operacion
const comprobarSaldo = (valor) => {
  //Funcion que actualiza el saldo si los fondos son suficientes
  saldoCajaAhorro -= parseFloat(valor);
  if (saldoCajaAhorro <= 0) {
    //Codigo que evita que el saldo se actualice si el saldo es menor a 0S
    saldoCajaAhorro = localStorage.getItem("saldo");
    Swal.fire({
      icon: "warning",
      title: "Saldo Insuficiente",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then(() => {
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
    });
  } else {
    confirmarOperacion();
  }
};
//Codigo que establece un contador que permite armar el condicional
let contadorClicks = 0;
//Funcion que alterna las llamadas a las funciones sobre el mismo boton html
capturarValor.addEventListener("click", function () {
  comprobarSaldo(inputTransferencia.value);
});
const capturarDia = () => new Date().toLocaleDateString();
//Funcion que captura la hora en que se realiza la operacion
const capturarHora = () => new Date().toLocaleTimeString();
//Codigo que informa el tipo de operacion
const nombrarOperacion = () => "Transferencia";
//Funcion que captura la informacion sobre la operacion provista por el usuario
const transferirDinero = () => inputTransferencia.value;
//Funcion que parsea el numero ingresado por el usuario
const parsearDineroTransferido = () => parseFloat(transferirDinero());
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
//Codigo que utiliza el constructor Depositos para crear un nuevo objeto que contiene los datos de la operacion realizada
const crearOperacion = () => {
  nuevaOperacion = new Operacion(
    capturarDia(),
    capturarHora(),
    nombrarOperacion(),
    numeroADinero(inputTransferencia.value),
    numeroADinero(saldoCajaAhorro)
  );
  return nuevaOperacion;
};
//Funcion que almacena la nueva operaciones en una variable para luego ser enviada al servidor
const cargarOperacion = () => {
  dineroTransferido = crearOperacion();
};
//Funcion que envia la informacion generada por el usuario al servidor y la almacena en el localstorage
const enviarDatos = () => {
  const jsonplaceholder = "https://jsonplaceholder.typicode.com/posts";
  fetch(jsonplaceholder, {
    method: "POST",
    body: JSON.stringify(dineroTransferido),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      localStorage.setItem("dineroTransferido", JSON.stringify(datos));
    });
};
