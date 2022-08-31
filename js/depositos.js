//Variable que recupera la informacion del local storage
let saldoCajaOperable = localStorage.getItem(saldo);
console.log(saldoCajaOperable);
//Funcion que convierte el dato recuperado del localstorage a numero
const convertirStorageANumero = () => parseFloat(saldoCajaOperable);
console.log(convertirStorageANumero());
//Codigo que captura el boton que confirma la operacion
const captura = document.getElementById("depositos-submit");
//Codigo que captura el boton que modifica la operacion
const clean = document.getElementById("limpiar-campo");
//Codigo que captura el campo donde el usuario debe ingresar la cantidad de dinerao que desea depsositar
let inputDepositos = document.getElementById("depositos-input");
//Funcion que captura la informacion brindada por el usuario y la convierte en un objeto
captura.onclick = () => {
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
  nuevaOperacion = new Operacion(
    capturarDiaDeposito(),
    capturarHoraDeposito(),
    nombrarOperacion(),
    numeroADinero(),
    convertirSaldoADinero()
  );
  //Llamada a las funciones declaradas
  confirmarOperacion();
  actualizarSaldoStorage();
};
//Funcion que captura la fecha en que se realiza la operación
const capturarDiaDeposito = () => new Date().toLocaleDateString();
//Funcion que captura la hora en que se realiza la operacion
const capturarHoraDeposito = () => new Date().toLocaleTimeString();
//Codigo que informa el tipo de operacion
const nombrarOperacion = () => "Depósito";
//Funcion que captura la informacion sobre la operacion provista por el usuari
const depositar = () => inputDepositos.value;
//Funcion que parsea el numero ingresado por el usuario
const parsearDineroDepositado = () => parseInt(depositar());
//Codigo que actualiza el saldo de la caja de ahorro simulada
const actualizarSaldoCajaAhorro = () => {
  saldoCajaAhorro = parsearDineroDepositado() + convertirStorageANumero();
  return saldoCajaAhorro;
};
//Funcion que actualiza el saldo almacenado en el localstorage
const actualizarSaldoStorage = () =>
  (saldoCajaAhorro = localStorage.setItem(
    saldo,
    actualizarSaldoCajaAhorro()
  ));
//Funcion que convierte a pesos el dato parseado
const numeroADinero = () => numeroAPesos(depositar());
//Codigo que convierte a pesos el saldo simulado
const convertirSaldoADinero = () => numeroAPesos(actualizarSaldoCajaAhorro());
//Funcion que dispara un alert que confirma o cancela la operación
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea depositar la suma de ${numeroADinero()} ?`,
    confirmButtonText: 'Save',
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__fadeIn",
    }
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire(
        'Operación realizada con exito. Su saldo es ' + convertirSaldoADinero(), '', 'success'
      ).then(function () {
        window.location.href = "../opcion/opcion.html";
      })
    } else if (result.isDismissed) {
      Swal.fire(
        'Operación cancelada', '', 'info'
      ).then(function () {
        window.location.href = "../opcion/opcion.html";
      })
    }
  })
}
// Funcion que limpia el campo input en caso de que el usuario quiera modificar el importe a depositar
clean.onclick = () => {
  inputDepositos.value = "";
};
