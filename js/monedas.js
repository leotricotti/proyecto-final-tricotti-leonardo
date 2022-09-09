//Funcion que carga la funcion que inyecta la tabla con la cotizacion del dolar en tiempo real
window.onload = () => obtenerValorDolar();

//Variables necesarias para operar
let valorDolarCompra;
let valorDolarVenta;
//Codigo que captura el boton que modifica el valor ingresado
const modificar = document.getElementById("modificar");
//Funcion que limpia el campo input en caso de que el usuario quiera modificar el numero ingresado
modificar.onclick = () => location.reload();
//Codigo que captura el campo input
const inputDolares = document.getElementById("input");
//Funcion que separa el miles el numero ingresado por el usuario
const formatearNumero = () =>
  new AutoNumeric("#input", {
    decimalCharacter: ",",
    digitGroupSeparator: ".",
    modifyValueOnWheel: "false",
  });
//Llamada a la funcion
formatearNumero();
//Declaracion de la variable que va a almacenar el numero ingresado
let unformatNumber;
//Codigo que captura el boton que confirma la operacion
const operar = document.getElementById("submit");
//Funcion que llama a las funciones que validan la operacion
operar.onclick = () => {
  //Asignacion del valor a la variable creada anteriormente(remueve puntos y comas y divide por 100 para remover los decimales)
  unformatNumber = inputDolares.value.split(/\.|\,/).join("") / 100;
  comprobarCompra();
}
//Funcion que calcula la compra de dolares
const comprarDolares = (input, valor) => {
  return (
    parseFloat(input) * parseFloat(valor)
  );
};

//Funcion que coinvierte un numero al formato a dolar
const numeroADolar = (dinero) => {
  return (dinero = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "name",
  }).format(dinero));
};
//Funcion que inyecta la tabla con la cotizacion del dolar en tiempo real
const mostrarCotizacion = () => {
  //Código que crea el elemento tabla y le asigna sus clases
  let table = document.createElement("table");
  table.className = "table table-hover";
  //Código que crea la cabeza de la tabla
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Moneda</th>
            <th scope="col">Compra</th>
            <th scope="col">Venta</th>
          </tr>
        </thead>
      `;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de cuentas creado anteriormente y asigna cada elemento a su columna
  tableBody.innerHTML += `
        <tr>
          <td>${new Date().toLocaleDateString()}</td>
          <td>${new Date().toLocaleTimeString()}</td>
          <td>Dolar Estadounidense</td>
          <td>${numeroADinero(parseFloat(valorDolarCompra))}</td>
          <td>${numeroADinero(parseFloat(valorDolarVenta))}</td>
        </tr>
      `;
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  let tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
};
const subtitulo = document.querySelector(".text-container");
//Funcion que obtiene el valor del dolar blue en tiempo real
async function obtenerValorDolar() {
  const dolar = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
  const resp = await fetch(dolar);
  const data = await resp.json();
  //Codigo que permite que los datos del servidor y el input carguen en simultaneo
  subtitulo.classList.remove("text-disable");
  valorDolarCompra = data[1].casa.compra;
  valorDolarVenta = data[1].casa.venta;
  mostrarCotizacion();
  comprarDolares();
}
//Funcion que dispara un alert que confirma o cancela la operación
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea adquirir ${numeroADolar(unformatNumber)} a  ${numeroADinero(
      comprarDolares(unformatNumber, valorDolarVenta)
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
    if (result.isConfirmed) {
      saldoCajaAhorro -= comprarDolares(unformatNumber, valorDolarVenta);
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
        //Llamada a las funciones
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
//Funcion que confirma que el usuario tenga fondos suficientes y no exceda el limite de compra por operacion
const comprobarCompra = () => {
  //Codigo que realiza la operacion
  if (inputDolares.value <= 0 || inputDolares.value > 200) {
    //Codigo que evita que el saldo se actualice si el saldo es menor a 0S
    Swal.fire({
      icon: "warning",
      title: "Verifique la cantidad ingresada",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then(() => {
      Swal.fire({
        icon: "error",
        title: "Operacion Cancelada",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeIn",
        },
      }).then(function () {
        window.location.href = "../opcion/opcion.html";
      });
    });
  } else if (saldoCajaAhorro <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Saldo insuficiente",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
    }).then(() => {
      Swal.fire({
        icon: "error",
        title: "Operacion Cancelada",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeIn",
        },
      }).then(function () {
        //Codigo que evita que el saldo se actualice
        saldoCajaAhorro = localStorage.getItem("saldo");
        window.location.href = "../opcion/opcion.html";
      });
    });
  } else {
    confirmarOperacion();
  }
};
// Constructor del objeto operaciones
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
    numeroADinero(comprarDolares()),
    numeroADinero(saldoCajaAhorro)
  );
  return nuevaOperacion;
};
//Funcion que captura la fecha en que se realiza la operación
const capturarDia = () => new Date().toLocaleDateString();
//Funcion que captura la hora en que se realiza la operacion
const capturarHora = () => new Date().toLocaleTimeString();
//Codigo que informa el tipo de operacion
const nombrarOperacion = () => "Compra dolares";
//Funcion que almacena la nueva operaciones en una variable para luego ser enviada al servidor
let comprarDolar;
const cargarOperacion = () => {
  comprarDolar = crearOperacion();
};
//Funcion que envia la informacion generada por el usuario al servidor y la almacena en el localstorage
const enviarDatos = () => {
  const jsonplaceholder = "https://jsonplaceholder.typicode.com/posts";
  fetch(jsonplaceholder, {
    method: "POST",
    body: JSON.stringify(comprarDolar),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      localStorage.setItem("comprarDolar", JSON.stringify(datos));
    });
};
