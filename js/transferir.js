//Variable que recupera la informacion del local storage
let saldoCajaOperable = localStorage.getItem("saldo");
//Funcion que convierte el dato recuperado del localstorage a numero
const convertirStorageANumero = () => parseFloat(saldoCajaOperable);
//Variable que almacena el dato convertido a numero
let saldoOperable = convertirStorageANumero();
 //Codigo para cambiar el subtitulo del simulador 
const text = document.querySelector(".text");
text.innerHTML =
  '<p class="text"> Ingrese el monto que desea transferir: <input type="number" class="input" id="transferencia-input"></p>';
//Codigo que toma el nombre del titular de la cuenta almacenado en el localstorage
let cuentaSeleccionada = localStorage.getItem("destinatario");
//Codigo que captura el boton que confirma la operacion
let capturarValor = document.getElementById("transferencia-submit");
//Codigo que captura el campo donde el usuario debe ingresar la cantidad de dinerao que desea depsositar
let inputTransferencia = document.getElementById("transferencia-input");
//Codigo que captura el boton que modifica la operacion
const clean = document.getElementById("limpiar-campo");
//Codigo que captura el boton modificar
const opcionModificada = document.getElementById("limpiar-campo");
// Funcion que limpia el campo input si el usuario así lo requiere
opcionModificada.onclick = () => inputTransferencia.value = "";
//Funcion que descuenta el dinero transferido del saldo simulado
const operarTransferencia = () => saldoCajaOperable - parseFloat(inputTransferencia.value);
//Funcion que actualiza el saldo almacenado en el localstorage
const actualizarSaldoStorage = () =>
  (saldoCajaAhorro = localStorage.setItem("saldo", operarTransferencia()));
//Funcion que convierte un numero al formato de pesos argentinos
const numeroAPesos = (dinero) => {
  return (dinero = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(dinero));
};
//Codigo que dispara un alert que confirma o cancela la operación
const confirmar = () => {
  Swal.fire({
    icon: "question",
    title: `Desea transferir a ${cuentaSeleccionada} la suma de ${numeroAPesos(inputTransferencia.value)} ?`,
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
        'Operación realizada con exito. Su saldo es ' + numeroAPesos(operarTransferencia()), '', 'success'
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
//Codigo que establece un contador que permite armar el condicional
let contadorClicks = 0;
//Funcion que alterna las llamadas a las funciones sobre el mismo boton html
capturarValor.addEventListener("click", function () {
  confirmar();
  actualizarSaldoStorage();
});
