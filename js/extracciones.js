//Variable que recupera la informacion del local storage
let saldoCajaOperable = localStorage.getItem("saldo");
//Funcion que convierte el dato recuperado del localstorage a numero
const convertirStorageANumero = () => parseFloat(saldoCajaOperable);
//Codigo que captura el boton que confirma la operacion
const captura = document.getElementById("extracciones-submit");
//Codigo que captura el boton que modifica la operacion 
const clean = document.getElementById("limpiar-campo");
//Codigo que captura el campo donde el usuario debe ingresar la cantidad de dinerao que desea depsositar
let inputExtraccion = document.getElementById("extracciones-input");
//Funcion que captura la fecha en que se realiza la operación
const capturarDiaExtraccion = () => new Date().toLocaleDateString();
//Funcion que captura la hora en que se realiza la operacion
const capturarHoraExtraccion = () => new Date().toLocaleTimeString();
//Codigo que informa el tipo de operacion
const nombrarOperacion = () => "Extraccion Adelanto";
//Funcion que captura la informacion sobre la operacion provista por el usuario
const extraerDinero = () => inputExtraccion.value;
//Funcion que parsea el numero ingresado por el usuario
const parsearDineroExtraido = () => parseInt(extraerDinero());
//Codigo que actualiza el saldo de la caja de ahorro simulada
const actualizarSaldoCajaAhorro = () => {
  saldoCajaAhorro = convertirStorageANumero() - parsearDineroExtraido();
  return saldoCajaAhorro;
}
//Funcion que actualiza el saldo almacenado en el localstorage
const actualizarSaldoStorage = () =>
  (saldoCajaAhorro = localStorage.setItem(
    saldo,
    actualizarSaldoCajaAhorro()
  ));
//Funcion que convierte al formato de moneda local el dato parseado
const numeroAPesos = () => numeroADinero(extraerDinero());
//Codigo que convierte al formato de moneda local el saldo simulado
const convertirSaldoADinero = () => numeroADinero(actualizarSaldoCajaAhorro());
//Funcion que captura la informacion brindada por el usuario y la convierte en un objeto
captura.onclick = () => {
  // Constructor del objeto depositos;
  class Extraccion {
    constructor(fecha, hora, operacion, monto, saldo) {
      this.fecha = fecha;
      this.hora = hora;
      this.operacion = operacion;
      this.monto = monto;
      this.saldo = saldo;
    }
  }
  //Codigo que utiliza el constructor Depositos para crear un nuevo objeto que contiene los datos de la operacion realizada
  operarExtraccion = new Extraccion(
    capturarDiaExtraccion(),
    capturarHoraExtraccion(),
    nombrarOperacion(),
    numeroAPesos(),
    convertirSaldoADinero(),
  );
  //Llamada a las funciones declaradas 
  confirmarOperacion();
  actualizarSaldoStorage();
};
//Codigo que dispara un alerta que confirma o cancela la operación
const text = document.querySelector(".text");
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea extraer la suma de ${numeroAPesos()} ?`,
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
// Funcion que limpia el campo input en caso de que el usuario quiera modificar el importe a extraer
clean.onclick = () => {
  inputExtraccion.value = "";
 }


