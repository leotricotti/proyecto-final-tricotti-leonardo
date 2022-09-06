//Codigo que captura el boton Modificar
const clean = document.getElementById("limpiar-campo");
//Funcion que limpia el campo input 
clean.onclick = () => {
  inputDepositos.value = "";
};
//Codigo que captura el campo input
let inputDepositos = document.getElementById("depositos-input");
//Funcion que separa en miles y agrega decimales
const formatearNumero = () => new AutoNumeric('#depositos-input', {
  decimalCharacter : ',',
  digitGroupSeparator : '.',
});
//Llamada a la funcion
formatearNumero();
//Declaracion de la variable que va a almacenar
let unformatNumber;
//Codigo que captura el boton Aceptar
const captura = document.getElementById("depositos-submit");
//Funcion que captura la informacion brindada por el usuario y confirma la operacion
captura.onclick = () => {
  //Asignacion del valor a la variable creada anteriormente(remueve puntos y comas y divide por 100 para remover los decimales) 
  unformatNumber = inputDepositos.value.split( /\.|\,/).join("") / 100;
  //Llamada a la funcion
  confirmarOperacion();
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
    capturarDia(),
    capturarHora(),
    nombrarOperacion(),
    numeroADinero(unformatNumber),
    numeroADinero(saldoCajaAhorro)
  );
  return nuevaOperacion;
};
//Funcion que captura la fecha en que se realiza la operación
const capturarDia = () => new Date().toLocaleDateString();
//Funcion que captura la hora en que se realiza la operacion
const capturarHora = () => new Date().toLocaleTimeString();
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
      //Codigo que actualiza el saldo 
      saldoCajaAhorro += unformatNumber;
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
        //Codigo que compenza la latencia del servidor
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
      localStorage.setItem("depositoRealizado", JSON.stringify(datos));
    });
};


