//Array que contiene las cuentas habilitadas para recibir transferencias
const cuentasHabilitadas = [];
//Funcion que carga las cuentas habilitadas para recibir transferencias
const cargarCuentasHabilitadas = (arr) => {
  arr.push({
    id: "01",
    titular: "Gómez, Sandra",
    tipo: "Caja de Ahorro",
    moneda: "$",
    cuenta: "4069-5689756/5",
    entidad: "Banco Galicia",
  });
  arr.push({
    id: "02",
    titular: "Suarez, Analía",
    tipo: "Cuenta Corriente",
    moneda: "$",
    cuenta: "5879-789700/4",
    entidad: "Banco Hipotecario",
  });
  arr.push({
    id: "03",
    titular: "Castro, Cintia",
    tipo: "Cuenta Corriente",
    moneda: "$",
    cuenta: "4565-991626/8",
    entidad: "Banco Provincia",
  });
  arr.push({
    id: "04",
    titular: "Alonso, Juan",
    tipo: "Caja de Ahorro",
    moneda: "$",
    cuenta: "2356-123055/5",
    entidad: "Banco Santander",
  });
  arr.push({
    id: "05",
    titular: "Villareal, Susana",
    tipo: "Cuenta Corriente",
    moneda: "$",
    cuenta: "4566-978600/4",
    entidad: "Banco Galicia",
  });
};
//Llamada a la funcion que carga las cuentas en el array de cuentas habilitadas
cargarCuentasHabilitadas(cuentasHabilitadas);
//Funcion que inyecta la tabla cuentas habilitadas a recibir transferencias en el html
function mostrarCuentas(...array) {
  //Código que crea el elemento tabla y le asigna sus clases
  let table = document.createElement("table");
  table.className = "table table-hover";
  //Código que crea la cabeza de la tabla
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Titular</th>
            <th scope="col">Cuenta</th>
            <th scope="col">Moneda</th>
            <th scope="col">Número</th>
            <th scope="col">Entidad</th>
        </tr>
        </thead>
    `;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de cuentas creado anteriormente y asigna cada elemento a su culumna
  for (const cuenta of array) {
    console.log();
    tableBody.innerHTML += `
        <tr>
            <td>${cuenta.id}</td>
            <td>${cuenta.titular}</td>
            <td>${cuenta.tipo}</td>
            <td>${cuenta.moneda}</td>
            <td>${cuenta.cuenta}</td>
            <td>${cuenta.entidad}</td>
        </tr>
        `;
  }
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
}
//Llamada a la funcion que inyecta al html la tabla con las cuentas habilitadas
mostrarCuentas(...cuentasHabilitadas);
//Codigo que captura el campo donde el usuario debe ingresar la cantidad de dinero que desea transferir
let inputTransferencia = document.getElementById("transferencia-input");
//Codigo que captura el boton que confirma la operacion
let capturarValor = document.getElementById("transferencia-submit");
//Operador que desestructura el array de objetos
const [a, b, c, d, e] = cuentasHabilitadas;
//Funcion que captura la cuenta seleccionada 
const seleccionarCuenta = (inputValue) => {
  if (inputValue == "01") {
    //Codigo que almacena en localstorage el nombre del titular de la cuenta a la que se va a enviar dinero para luego ser reutilizado como confirmacion 
    destinatario = localStorage.setItem("destinatario", `${a.titular}`);
    //Codigo que cambia al html siguiente
    document.location.href = "monto.html";
  } else if (inputValue == "02") {
    //Codigo que almacena en localstorage el nombre del titular de la cuenta a la que se va a enviar dinero para luego ser reutilizado como confirmacion 
    destinatario = localStorage.setItem("destinatario", `${b.titular}`);
    //Codigo que cambia al html siguiente
    document.location.href = "monto.html";
  } else if (inputValue == "03") {
    //Codigo que almacena en localstorage el nombre del titular de la cuenta a la que se va a enviar dinero para luego ser reutilizado como confirmacion 
    destinatario = localStorage.setItem("destinatario", `${c.titular}`);
    //Codigo que cambia al html siguiente
    document.location.href = "monto.html";
  } else if (inputValue == "04") {
    //Codigo que almacena en localstorage el nombre del titular de la cuenta a la que se va a enviar dinero para luego ser reutilizado como confirmacion 
    destinatario = localStorage.setItem("destinatario", `${d.titular}`);
    //Codigo que cambia al html siguiente
    document.location.href = "monto.html";
  } else if (inputValue == "05") {
    //Codigo que almacena en localstorage el titular de la cuenta a la que se va a enviar dinero para ser reutilizado como confirmacion 
    destinatario = localStorage.setItem("destinatario", `${e.titular}`);
    //Codigo que cambia al html siguiente
    document.location.href = "monto.html";   
  } else {
    //Funcion que devuelve un alert si la opcion ingresada es invalida
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
//Codigo que captura el boton modificar
const opcionModificada = document.getElementById("limpiar-campo");
// Funcion que limpia el campo input si el usuario así lo requiere
opcionModificada.onclick = () => {
  inputTransferencia.value = "";
};
//Funcion que alterna las llamadas a las funciones sobre el mismo boton html
capturarValor.addEventListener("click", function () {
  seleccionarCuenta(inputTransferencia.value);
});


