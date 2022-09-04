//Funcion que carga la funcion que inyecta la tabla con la cotizacion del dolar en tiempo real
window.onload = () => {
  obtenerValorDolar();
};
//Variables necesarias para operar
let valorDolarCompra;
let valorDolarVenta;
let costoDolarComprado;
//Codigo que captura el campo para ingresar los dolares que se desean comprar
const cantidadDolares = document.getElementById("monedas-input");
//Codigo que captura el boton que confirma la operacion
const dolaresComprados = document.getElementById("monedas-submit");
//Codigo que captura el boton que modifica el valor ingresado
const clean = document.getElementById("limpiar-campo");
//Funcion que limpia el campo input en caso de que el usuario quiera modificar el numero ingresado
clean.onclick = () => {
  cantidadDolares.value = "";
};
//Funcion que calcula la compra de dolares
const comprarDolares = () => {
  costoDolarComprado = (
    parseFloat(cantidadDolares.value) * parseFloat(valorDolarVenta)
  ).toFixed(2);
  return costoDolarComprado;
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
          <td>${numeroADinero(valorDolarCompra)}</td>
          <td>${numeroADinero(valorDolarVenta)}</td>
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
  const dolar = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
  const resp = await fetch(dolar);
  const data = await resp.json();
  //Codigo que permite que los datos del servidor y el input carguen en simultaneo
  subtitulo.classList.remove("text-disable");
  valorDolarCompra = data.compra;
  valorDolarVenta = data.venta;
  mostrarCotizacion();
  comprarDolares();
}
//Funcion que dispara un alert que confirma o cancela la operación
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea adquirir ${numeroADolar(
      cantidadDolares.value
    )} a  ${numeroADinero(comprarDolares())} ?`,
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
        //Llamada a las funciones
        actualizarSaldoStorage();
        cargarOperacion();
        crearOperacion();
        enviarDatos();
        setTimeout(function () {
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
//Funcion que confirma que el usuario tenga fondos suficientes y no exceda el limite de compra por operacion
const comprobarCompra = () => {
  //Funcion que actualiza el saldo si los fondos son suficientes
  saldoCajaAhorro -= parseFloat(comprarDolares());
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
  } else if (cantidadDolares.value <= 0 || cantidadDolares.value > 200) {
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
        cantidadDolares.value = "";
      });
    });
  } else {
    confirmarOperacion();
  }
};
//Funcion que llama a las funciones que validan la operacion
dolaresComprados.onclick = () => {
  comprobarCompra();
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
      console.log(datos);
      localStorage.setItem("comprarDolar", JSON.stringify(datos));
    });
};

