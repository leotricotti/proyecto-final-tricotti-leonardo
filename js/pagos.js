//Variable que almacena los servicios por vencer provenientes del localstorage
let serviciosLocalStorage = JSON.parse(localStorage.getItem("servicios"));
//Funcion que inyecta la tabla con la informacion de los servicios por vencer
const mostrarServicios = (servicios) => {
  //Código que crea el elemento tabla y asigna sus clases
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
  for (const servicio of servicios) {
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
  //Codigo que asigna un padre a la tabla creada anteriormente
  tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
};
//Llamada a la funcion que inyecta al html la tabla con las cuentas habilitadas
mostrarServicios(serviciosLocalStorage);
//Operador que desestructura el array de objetos
const [a, b, c, d, e] = serviciosLocalStorage;
//Funcion que captura el servicios que se desea pagar y confirma por alert
const seleccionarServicio = (inputValue) => {
  if (inputValue == "01") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    saldoCajaAhorro -= a.numero;
    //Llamada a la funcion
    comprobarSaldo(a.servicio, a.numero);
    //Variable que retorna el monto abonado para formar parte del objeto opeacion que se envia al servidor
    monto = a.numero;
  } else if (inputValue == "02") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    saldoCajaAhorro -= b.numero;
    //Llamada a la funcion
    comprobarSaldo(b.servicio, b.numero);
    //Variable que retorna el monto abonado para formar parte del objeto opeacion que se envia al servidor
    monto = b.numero;
  } else if (inputValue == "03") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    saldoCajaAhorro -= c.numero;
    //Llamada a la funcion
    comprobarSaldo(c.servicio, c.numero);
    //Variable que retorna el monto abonado para formar parte del objeto opeacion que se envia al servidor
    monto = c.numero;
  } else if (inputValue == "04") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    saldoCajaAhorro -= d.numero;
    //Llamada a la funcion
    comprobarSaldo(d.servicio, d.numero);
    //Variable que retorna el monto abonado para formar parte del objeto opeacion que se envia al servidor
    monto = d.numero;
  } else if (inputValue == "05") {
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Variable que almacena el resultado de la operacion
    saldoCajaAhorro -= e.numero;
    //Llamada a la funcion
    comprobarSaldo(e.servicio, e.numero);
    //Variable que retorna el monto abonado para formar parte del objeto opeacion que se envia al servidor
    monto = e.numero;
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
const confirmarOperacion = (servicio, monto) => {
  Swal.fire({
    icon: "question",
    title: `Desea pagar el servicio ${servicio} por el importe de ${numeroADinero(
      monto
    )} ?`,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__fadeIn",
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        `Operación realizada con éxito. Su saldo es ${numeroADinero(
          saldoCajaAhorro
        )}`
      ).then(function () {
        actualizarSaldoStorage();
        crearOperacion();
        cargarOperacion();
        enviarDatos();
        setTimeout(function(){
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
      }
      }).then(function () {
        window.location.href = "../opcion/opcion.html"
      });
    }
  });
};
//Codigo que captura el campo input
let pagosInput = document.getElementById("pagos-input");
//Codigo que captura el boton que confirma la operacion
let capturarValor = document.getElementById("pagos-submit");
//Funcion que captura la seleccion realizada por el usuario
capturarValor.addEventListener("click", function () {
  //Llamada a la funcion que selecciona el servicio a pagar
  seleccionarServicio(pagosInput.value);
});
//Codigo que captura el boton que limpia el campo input
const clean = document.getElementById("limpiar-campo");
// Funcion que limpia el campo input
clean.onclick = () => {
  pagosInput.value = "";
};
//Funcion que confirma que el usuario tenga fondos suficientes antes de realizar la operacion
const comprobarSaldo = (servicio, monto) => {
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
      Swal.fire({
        icon: "error",  
        title: "Operación Cancelada",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__fadeIn",
        }
        }).then(function () {
          window.location.href = "../opcion/opcion.html"
        });
    });
  } else {
    confirmarOperacion(servicio, monto);
  }
};
// Constructor del objeto operaciones que será enviado jsonplaceholder
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
    numeroADinero(monto),
    numeroADinero(saldoCajaAhorro)
  );
  return nuevaOperacion;
};
//Funcion que almacena la nueva operaciones en una variable para luego ser enviada al servidor jsonplaceholder
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
