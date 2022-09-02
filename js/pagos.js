//Declaracion de variable que va a almacenar los servicios por vencer que provienen del json
let serviciosLocalStorage;
//Funcion que inyecta la tabla con la informacion de los servicios por vencer
const mostrarServicios = () => {
  //Codigo que recupera los servicios a pagar almacenados en el localstorage
  serviciosLocalStorage = JSON.parse(localStorage.getItem("servicios"));
  //Código que crea el elemento tabla y le asigna clases de bootstrap
  let table = document.createElement("table");
  table.className = "table table-hover";
  //Código que crea la cabeza de la tabla
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Servicio</th>
            <th scope="col">Vencimiento</th>
            <th scope="col">Importe</th>
        </tr>
        </thead>
    `;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que crea el cuerpo de la tabla
  for (const servicio of serviciosLocalStorage) {
    tableBody.innerHTML += `
        <tr>
            <td>${servicio.id}</td>
            <td>${servicio.servicio}</td>
            <td>${servicio.vencimiento}</td>
            <td>${servicio.importe}</td>
        </tr>
        `;
  }
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
};
//Llamada a la funcion que inyecta al html la tabla con las cuentas habilitadas
mostrarServicios();
//Codigo que captura el campo input
let pagosInput = document.getElementById("pagos-input");
//Codigo que captura el boton que confirma la operacion
let capturarValor = document.getElementById("pagos-submit");
//Operador que desestructura el array de objetos
const [a, b, c, d, e] = serviciosLocalStorage;
//Funcion que captura la cuenta seleccionada y devuelve un campo para ingresar el importe que se desea transferir
const seleccionarServicio = (inputValue) => {
  if (inputValue == "01") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    actualizarSaldoCajaAhorro = () => saldoOperable - a.numero;
    //Llamada a la funcion
    comprobarSaldo(a.servicio, a.numero);
    //Funcion que retorna el monto abonado como componente del objeto operacion
    cargarMonto = () => a.numero;
  } else if (inputValue == "02") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    actualizarSaldoCajaAhorro = () => saldoOperable - b.numero;
    //Llamada a la funcion
    comprobarSaldo(b.servicio, b.numero);
    //Funcion que retorna el monto abonado como componente del objeto operacion
    cargarMonto = () => b.numero;
  } else if (inputValue == "03") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    actualizarSaldoCajaAhorro = () => saldoOperable - c.numero;
    //Llamada a la funcion
    comprobarSaldo(c.servicio, c.numero);
    //Funcion que retorna el monto abonado como componente del objeto operacion
    cargarMonto = () => c.numero;
  } else if (inputValue == "04") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    actualizarSaldoCajaAhorro = () => saldoOperable - d.numero;
    //Llamada a la funcion
    comprobarSaldo(d.servicio, d.numero);
    //Funcion que retorna el monto abonado como componente del objeto operacion
    cargarMonto = () => d.numero;
  } else if (inputValue == "05") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    actualizarSaldoCajaAhorro = () => saldoOperable - e.numero;
    //Llamada a la funcion
    comprobarSaldo(e.servicio, e.numero);
    //Funcion que retorna el monto abonado como componente del objeto operacion
    cargarMonto = () => e.numero;
  } else {
    Swal.fire({
      icon: "warning",
      title: "Ingrese una opción valida",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__fadeIn",
      },
    });
  }
};
//Funcion que confirma la operacion via un alert
const confirmarOperacion = (a, b) => {
  Swal.fire({
    icon: "question",
    title: `Desea pagar el servicio ${a} por el importe de ${numeroADinero(
      b
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
      Swal.fire(
        `Operación realizada con éxito. Su saldo es ${numeroADinero(
          actualizarSaldoCajaAhorro()
        )}`
      ).then(function () {
        actualizarSaldoCajaAhorro();
        actualizarSaldoStorage();
        crearOperacion();
        cargarOperacion();
        enviarDatos();
        // window.location.href = "../opcion/opcion.html";
      });
    } else if (result.isDismissed) {
      Swal.fire("Operación Cancelada", "", "error").then(function () {
        window.location.href = "../opcion/opcion.html";
      });
    }
  });
};
//Funcion que captura la seleccion realizada por el usuario
capturarValor.addEventListener("click", function () {
  seleccionarServicio(pagosInput.value);
});
//Codigo que captura el boton que modifica la operacion
const clean = document.getElementById("limpiar-campo");
// Funcion que limpia el campo input en caso de que el usuario quiera modificar el importe a depositar
clean.onclick = () => {
  pagosInput.value = "";
};
//Funcion que confirma que el usuario tenga fondos suficientes antes de realizar la operacion
const comprobarSaldo = (a, b) => {
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
    confirmarOperacion(a, b);
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
};
//Codigo que informa el tipo de operacion
const nombrarOperacion = () => "Pago Servicio";
//Funcion que captura la fecha en que se realiza la operación
const capturarDia = () => new Date().toLocaleDateString();
//Funcion que captura la hora en que se realiza la operacion
const capturarHora = () => new Date().toLocaleTimeString();
//Funcion que crea la nueva operacion
const crearOperacion = () => {
  nuevaOperacion = new Operacion(
    capturarDia(),
    capturarHora(),
    nombrarOperacion(),
    numeroADinero(cargarMonto()),
    numeroADinero(actualizarSaldoCajaAhorro())
  );
  return nuevaOperacion;
};
//Funcion que almacena la nueva operaciones en una variable para luego ser enviada al servidor
const cargarOperacion = () => {
  serviciosPagados = crearOperacion();
};
//Funcion que envia la informacion generada por el usuario al servidor y la almacena en el localstorage
const enviarDatos = () => {
  const jsonplaceholder = "https://jsonplaceholder.typicode.com/posts";
  fetch(jsonplaceholder, {
    method: "POST",
    body: JSON.stringify(serviciosPagados),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      localStorage.setItem("servicioPagado", JSON.stringify(datos));
    });
};
