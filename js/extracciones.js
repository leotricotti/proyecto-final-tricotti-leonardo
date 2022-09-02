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
};
//Funcion que convierte al formato de moneda local el dato parseado
const numeroAPesos = () => numeroADinero(extraerDinero());
//Codigo que convierte al formato de moneda local el saldo simulado
const convertirSaldoADinero = () => numeroADinero(actualizarSaldoCajaAhorro());
//Funcion que captura la informacion brindada por el usuario y la convierte en un objeto
captura.onclick = () => {
  //Llamada a las funciones declaradas
  actualizarSaldoCajaAhorro();
  comprobarSaldo();
};
// Funcion que limpia el campo input en caso de que el usuario quiera modificar el importe a extraer
clean.onclick = () => {
  inputExtraccion.value = "";
};
//Codigo que dispara un alerta que confirma o cancela la operación
const text = document.querySelector(".text");
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea extraer la suma de ${numeroAPesos()} ?`,
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
      Swal.fire(
        "Operación realizada con exito. Su saldo es " + convertirSaldoADinero(),
        "",
        "success"
      ).then(function () {
        actualizarSaldoCajaAhorro();
        actualizarSaldoStorage();
        cargarOperacion();
        enviarDatos();
        setTimeout(function(){
          window.location.href = "../opcion/opcion.html";
        }, 1000);
      });
    } else if (result.isDismissed) {
      Swal.fire("Operación cancelada", "", "info").then(function () {
        window.location.href = "../opcion/opcion.html";
      });
    }
  });
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
//Codigo que utiliza el constructor Depositos para crear un nuevo objeto que contiene los datos de la operacion realizada
const crearOperacion = () => {
  nuevaOperacion = new  Operacion (
    capturarDiaExtraccion(),
    capturarHoraExtraccion(),
    nombrarOperacion(),
    numeroAPesos(),
    convertirSaldoADinero()
  );
  return nuevaOperacion;
}
//Funcion que confirma que el usuario tenga fondos suficientes antes de realizar la operacion
const comprobarSaldo = () => {
  if (saldoCajaAhorro <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Saldo Insuficiente",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then(() => {
      Swal.fire("Operación Cancelada", "", "error").then(function () {
        window.location.href = "../opcion/opcion.html";
      });
    });
  } else {
    confirmarOperacion();
  }
};
//Funcion que almacena la nueva operaciones en una variable para luego ser enviada al servidor
const cargarOperacion = () => {
  extraccionRealizada = crearOperacion();
};
//Funcion que envia la informacion generada por el usuario al servidor y la almacena en el localstorage
const enviarDatos = () => {
  const jsonplaceholder = "https://jsonplaceholder.typicode.com/posts";
  fetch(jsonplaceholder, {
    method: "POST",
    body: JSON.stringify(extraccionRealizada),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      localStorage.setItem("extraccionRealizada", JSON.stringify(datos));
    });
};