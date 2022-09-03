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
    capturarDiaExtraccion(),
    capturarHoraExtraccion(),
    nombrarOperacion(),
    numeroADinero(inputExtraccion.value),
    numeroADinero(saldoCajaAhorro)
  );
  return nuevaOperacion;
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
    title: `Desea extraer la suma de ${numeroADinero(inputExtraccion.value)} ?`,
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
      Swal.fire(
        "Operación realizada con exito. Su saldo es " +
          numeroADinero(saldoCajaAhorro),
        "",
        "success"
      ).then(function () {
        actualizarSaldoStorage();
        cargarOperacion();
        enviarDatos();
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
const comprobarSaldo = () => {
  //Funcion que actualiza el saldo si los fondos son suficientes
  saldoCajaAhorro -= parseFloat(inputExtraccion.value);
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
    //Llamada a la funcion
    confirmarOperacion();
  }
};
//Codigo que captura el boton que confirma la operacion
const captura = document.getElementById("extracciones-submit");
//Funcion que captura la informacion brindada por el usuario y la convierte en un objeto
captura.onclick = () => {
  //Llamada a las funciones declaradas
  comprobarSaldo();
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
