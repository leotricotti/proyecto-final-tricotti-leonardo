//Funcion que inyecta la tabla con la informacion de los servicios por vencer 
function mostrarServicios() {
  //Codigo que recupera los servicios a pagar almacenados en el localstorage
  serviciosLocalStorage = JSON.parse(localStorage.getItem("servicios"));
  //Código que crea el elemento tabla y le asigna sus clases de bootstrap
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
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de cuentas creado anteriormente y asigna cada elemento a su culumna
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
}
//Llamada a la funcion que inyecta al html la tabla con las cuentas habilitadas
mostrarServicios();
//Codigo que captura el campo input
let pagosInput = document.getElementById("pagos-input");
//Codigo que captura el boton que confirma la operacion
let capturarValor = document.getElementById("pagos-submit");
//Operador que desestructura el array de objetos
const [a, b, c, d, e] = serviciosLocalStorage;
//Funcion que actualiza el saldo de la caja de ahorro
const actualizarSaldoCajaAhorro = (saldo, importe) => saldo - importe;
//Funcion que captura la cuenta seleccionada y devuelve un campo para ingresar el importe que se desea transferir
const seleccionarServicio = (inputValue) =>{
  if(inputValue == "01"){
    confirmarOperacion();
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Llamado a la funcion que actualiza el saldo de la caja de ahorro
    nuevoSaldo = actualizarSaldoCajaAhorro(saldoOperable, a.numero); 
    comprobarSaldo();
  }else if(inputValue == "02"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${b.servicio} por el importe de ${numeroADinero(b.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - b.numero; 
    actualizarSaldoStorage(); 
  }else if(inputValue == "03"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${c.servicio} por el importe de ${numeroADinero(c.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - c.numero; 
    actualizarSaldoStorage(); 
  }else if(inputValue == "04"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${d.servicio} por el importe de ${numeroADinero(d.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - d.numero; 
    actualizarSaldoStorage(); 
  }else if(inputValue == "05"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${e.servicio} por el importe de ${numeroADinero(e.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - e.numero;
    actualizarSaldoStorage(); 
  }else{
    Swal.fire({
      icon: 'warning',
      title: 'Ingrese una opción valida',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      }
    });
  }
}
const confirmarOperacion = () => {
  Swal.fire({
    icon: "question",
    title: `Desea pagar el servicio ${a.servicio} por el importe de ${numeroADinero(a.numero)}?`,
    confirmButtonText: 'Save',
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
        `Operación realizada con éxito. Su saldo es ${numeroADinero(nuevoSaldo)}`
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
//Funcion que alterna las llamadas a las funciones sobre el mismo boton html
capturarValor.addEventListener('click', function() {
  seleccionarServicio(pagosInput.value);
});

const comprobarSaldo = () => {
  if(nuevoSaldo <= 0){     
    Swal.fire({
    icon: 'warning',
    title: 'Saldo insuficiente',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Aceptar',
    showClass: {
      popup: 'animate__animated animate__fadeIn'
    }
  })}else{
    actualizarSaldoStorage(); 
  }
}