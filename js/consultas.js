//Funcion que al consultar el saldo devuelve una tabla con el saldo de las cuentas bancarias simuladas
function mostarSaldo() {
  //Codigo que recupera la informacion de las cuentas simuladas del local storage
  const cuentasLocalStorage = JSON.parse(localStorage.getItem("cuentas"));
  //Codigo que cambia el subtitulo del simulador
  let text = document.querySelector(".text");
  text.innerText = "Cuentas";
  //Código que crea el elemento tabla y le asigna sus clases
  let table = document.createElement("table");
  table.className = "table table-hover";
  //Código que crea la cabeza de la tabla
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Tipo de Cuenta</th>
          <th scope="col">Moneda</th>
          <th scope="col">Cuenta</th>
          <th scope="col">Identificacion</th>
          <th scope="col">Saldo</th>
        </tr>
      </thead>
    `;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de cuentas creado anteriormente y asigna cada elemento a su columna
  for (const cuenta of cuentasLocalStorage){
    tableBody.innerHTML += `
        <tr>
          <td>${cuenta.tipo}</td>
          <td>${cuenta.moneda}</td>
          <td>${cuenta.cuenta}</td>
          <td>${cuenta.identificador}</td>
          <td>${cuenta.saldo}</td>
        </tr>
      `;
  }
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  let tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
}
//Funcion que captura la informacion de las cuentas simuladas y lo inserta en el local storage 
function capturarOperaciones(){fetch("../../json/operaciones.json")
  .then((resp) => resp.json())
  .then((data) => {
    let operaciones = data;
    guardarLocal("operaciones", JSON.stringify(operaciones));
})}

capturarOperaciones();
//Funcion que al consultar los movimientos devuelve una tabla con los movimientos de las cuentas bancarias simuladas
function mostarMovimientos() {
  //Codigo que recupera los movimientos simulados almacenados en el local storage
  const movimientosLocalStorage = JSON.parse(localStorage.getItem("operaciones"));
  //Codigo para cambiar el subtitulo del simulador
  let text = document.querySelector(".text");
  text.innerText = "Ultimos Movimientos";
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
        <th scope="col">Operacion</th>
        <th scope="col">Monto</th>
        <th scope="col">Saldo</th>
      </tr>
    </thead>
  `;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de operaciones creado anteriormente
  for (const operacion of movimientosLocalStorage) {
    tableBody.innerHTML += `
      <tr>
        <td>${operacion.fecha}</td>
        <td>${operacion.hora}</td>
        <td>${operacion.operacion}</td>
        <td>${operacion.monto}</td>
        <td>${operacion.saldo}</td>
      </tr>
    `;
  }
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a la tabla creada un padre
  let tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
}
//Funcion que modifica el HTML al momento de devolver la operacion solicitada por el usuario
function quitarTexto() {
  //Codigo que quita texto que no se usa del html
  let quitarMovimientos = document.querySelector(".quitar-texto");
  quitarMovimientos.innerText = "";
  //Codigo que quita texto que no se usa del html
  let quitarMovimientosDos = document.querySelector(".quitar-texto-dos");
  quitarMovimientosDos.innerText = "";
}
//Funcion que modifica el HTML al momento de devolver la operacion solicitada por el usuario
function agregarTexto() {
  //Codigo que agrega texto al html
  let textoAgregado = document.querySelector(".agregar-texto");
  textoAgregado.innerText = "Desea realizar otra operacion?";
}
//Funcion que modifica el HTML al momento de devolver la operacion solicitada por el usuario
function modificarOpcion() {
  //Codigo que cambia texto del html
  let opcionModificada = document.getElementById("opcion-modificada");
  opcionModificada.innerHTML =
    "<p>Si</p> <a href='../cajero/cajero.html'> <div class='btn-derecha' id='btn-saldo'></div></a></li>";
  //Codigo que cambia texto del html
  let opcionModificadaDos = document.getElementById("opcion-modificada-dos");
  opcionModificadaDos.innerHTML =
    '<p>No</p> <a href="../salir/salir.html" class="link"> <div class="btn-derecha"></div></a>';
}
//Funcion que modifica el HTML al momento de devolver la operacion solicitada por el usuario
function desactivarBtn(){
  //Codigo desactiva un boton del html
  let btnDesactivado = document.getElementById("tecla-disable");
  btnDesactivado.innerHTML = 
  '<a href="#" class="link link-disable"> <div class="btn-izquierda btn-disable" id="btn-movimientos"></div></a>'
}
//Evento que recibe informacion del mouse provista por el usuario y ejecuta un afuncion que devuelve el saldo disponible simulado y modifica el html
let btnSaldo = document.getElementById("btn-saldo");
btnSaldo.addEventListener("click", respuestaClick);
function respuestaClick() {
  mostarSaldo();
  quitarTexto();
  agregarTexto();
  modificarOpcion();
  desactivarBtn();
}
//Evento que recibe informacion del mouse provista por el usuario y ejecuta una funcion que devuelve los movimientos bancarios simulados y modifica el html
let btnMovimientos = document.getElementById("btn-movimientos");
btnMovimientos.addEventListener("click", respuestaClick2);
function respuestaClick2() {
  mostarMovimientos();
  quitarTexto();
  agregarTexto();
  modificarOpcion();
  desactivarBtn();
}
