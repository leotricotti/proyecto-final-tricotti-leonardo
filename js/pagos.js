//Variable que recupera la informacion del local storage
let saldoCajaOperable = localStorage.getItem(saldo);
//Funcion que convierte el dato recuperado del localstorage a numero
const convertirStorageANumero = () => parseFloat(saldoCajaOperable);
//Variable que almacena el dato convertido a numero
let saldoOperable = convertirStorageANumero();
//Array que contiene los servicios proximos a vencer 
const serviciosPorVencer = [];
//Funcion que carga las cuentas habilitadas para recibir transferencias
const cargarServiciosPorVencer = (arr) => {
  arr.push({
    id: "01",
    servicio: "Edesur",
    vencimiento: "31/08/2022",
    importe: "$ 5.8056,23",
    numero: 5805.23
  });
  arr.push({
    id: "02",
    servicio: "AySA",
    vencimiento: "05/09/2022",
    importe: "$ 1.553,80",
    numero: 1553.80
  });
  arr.push({
    id: "03",
    servicio: "Movistar Hogar",
    vencimiento: "08/09/2022",
    importe: "$ 4.536,58",
    numero: 4536.58
  });
  arr.push({
    id: "04",
    servicio: "Metrogas",
    vencimiento: "29/08/2022",
    importe: "$ 2.256,48",
    numero: 2256.48
  });
  arr.push({
    id: "05",
    servicio: "Personal",
    vencimiento: "27/08/2022",
    importe: "$ 3.526,32",
    numero: 3526.32
  });
}
//Llamada a la funcion que carga las cuentas en el array de cuentas habilitadas
cargarServiciosPorVencer(serviciosPorVencer);
//Funcion que inyecta la tabla cuentas habilitadas a recibir transferencias en el html
function mostrarServicios(...array) {
  //Código que crea el elemento tabla y le asigna sus clases
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
  for (const cuenta of array) {
    console.log()
    tableBody.innerHTML += `
        <tr>
            <td>${cuenta.id}</td>
            <td>${cuenta.servicio}</td>
            <td>${cuenta.vencimiento}</td>
            <td>${cuenta.importe}</td>
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
//Funcion que coinvierte un numero al formato de pesos argentinos
numeroAPesos = (dinero) => {
  return (dinero = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(dinero));
}
//Llamada a la funcion que inyecta al html la tabla con las cuentas habilitadas
mostrarServicios(...serviciosPorVencer);
let pagosInput = document.getElementById("pagos-input");
//Codigo que captura el boton que confirma la operacion
let capturarValor = document.getElementById("pagos-submit");
//Operador que desestructura el array de objetos
const [a, b, c, d, e] = serviciosPorVencer;
//Funcion que captura la cuenta seleccionada y devuelve un campo para ingresar el importe que se desea transferir
const seleccionarServicio = (inputValue) =>{
  if(inputValue == "01"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${a.servicio} por el importe de ${numeroAPesos(a.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - a.numero; 
    actualizarSaldoStorage(); 
  }else if(inputValue == "02"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${b.servicio} por el importe de ${numeroAPesos(b.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - b.numero; 
    actualizarSaldoStorage(); 
  }else if(inputValue == "03"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${c.servicio} por el importe de ${numeroAPesos(c.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - c.numero; 
    actualizarSaldoStorage(); 
  }else if(inputValue == "04"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${d.servicio} por el importe de ${numeroAPesos(d.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - d.numero; 
    actualizarSaldoStorage(); 
  }else if(inputValue == "05"){
    //Codigo para cambiar el subtitulo del simulador y agrega el data del titular de la cuenta como medida de control
    const text = document.querySelector(".text");
    text.innerHTML = `<p class='text'> Desea pagar el servicio ${e.servicio} por el importe de ${numeroAPesos(e.numero)}? </p>`;
    //Codigo que quita la tabla con las cuentas habilitadas
    tableContainer.innerHTML = "";
    //Funcion que actualiza el saldo de la caja de ahorro
    actualizarSaldoCajaAhorro = () => saldoOperable - e.numero;
    actualizarSaldoStorage(); 
  }//Devuelve un alert si la opcion ingresada es invalida
  else{
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
  //Codigo que mantiene el contador de click en cero
  contadorClicks --;
  //Codigo que limpia el input
  pagosInput.value = ""; 
}
//Funcion que actualiza el saldo almacenado en el localstorage
const actualizarSaldoStorage = () =>
  (saldoCajaAhorro = localStorage.setItem(
    saldo,
    actualizarSaldoCajaAhorro()
  ));
//Codigo que establece un contador que permite armar el condicional
let contadorClicks = 0;
//Funcion que alterna las llamadas a las funciones sobre el mismo boton html
capturarValor.addEventListener('click', function() {
  if (contadorClicks == 0) {
    //Llamada a la funcion que selecciona la cuenta a la cual se desea transferir dinero
    seleccionarServicio(pagosInput.value);
    //Codigo que agrega una unidad al contador
    contadorClicks = 1;
    console.log(contadorClicks);
  }else if (contadorClicks == 1) {
    Swal.fire({
      icon: 'success',
      title: `Operación realizada con éxito. Su saldo es ${numeroAPesos(actualizarSaldoCajaAhorro())}`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      }
    }).then(function(){
      window.location.href = "opcion-pagos.html";
    });
  }
});
