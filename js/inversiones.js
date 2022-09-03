//Funcion que captura datos del servidor
async function getDatosNasdaq() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f",
      "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
    },
  };

  let espera = await fetch(
    "https://google-finance4.p.rapidapi.com/search/?q=nasdaq&hl=en&gl=US",
    options
  )
    .then((response) => response.json())
    .then((response) => inyectarTabla(response));
  espera = cambiarSubtitulo("Cotizacion Indice Nasdaq");
}
//Funcion que captura datos del servidor
async function getDatosFtse() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f",
      "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
    },
  };

  let espera = await fetch(
    "https://google-finance4.p.rapidapi.com/search/?q=ftse&hl=en&gl=US",
    options
  )
    .then((response) => response.json())
    .then((response) => inyectarTabla(response));
  espera = cambiarSubtitulo("Cotizacion Indice Ftse");
}
//Funcion que solicita datos al servidor
async function getDatosNikkei() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f",
      "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
    },
  };
  let espera = await fetch(
    "https://google-finance4.p.rapidapi.com/search/?q=nikkei&hl=en&gl=US",
    options
  )
    .then((response) => response.json())
    .then((response) => inyectarTabla(response));
  espera = cambiarSubtitulo("Cotizacion Indice Nikkei");
}
//Funcion que crea e inyecta la tabla con la informacion provista por la API
const inyectarTabla = (respuesta) => {
  //Código que crea el elemento tabla y le asigna sus clases
  let table = document.createElement("table");
  table.className = "table table-hover";
  //Código que crea la cabeza de la tabla
  let tableHead = document.createElement("thead");
  tableHead.innerHTML = `
  <thead>
    <tr>
      <th scope="col">Título</th>
      <th scope="col">Apertura</th>
      <th scope="col">Variacion</th>
      <th scope="col">Porcentaje</th>
      <th scope="col">Cierre</th>
    </tr>
  </thead>
`;
  //Codigo que crea el cuerpo de la tabla y agrega el divisor entre cabeza y cuerpo
  let tableBody = document.createElement("tbody");
  tableBody.className = "table-group-divider";
  //Codigo que recorre el array de cuentas creado anteriormente y asigna cada elemento a su columna
  for (const dato of respuesta) {
    tableBody.innerHTML += `
    <tr>
      <td>${dato.info.ticker_symbols[0]}</td>
      <td>${formatearPrecio(dato.price.previous_close)}</td>
      <td>${quitarDecimales(dato.price.last.today_change)}</td>
      <td>${quitarDecimales(dato.price.last.today_change_percent)}</td>
      <td>${formatearPrecio(dato.price.previous_close)}</td>
    </tr>
  `;
  }
  //Codigo que agrega la cabeza y el cuerpo a la tabla creada anteriormente
  table.append(tableHead);
  table.append(tableBody);
  //Codigo que asigna a un padre la tabla creada anteriormente
  let tableContainer = document.querySelector(".table-container");
  tableContainer.append(table);
};
//Funcion que cambia el subtitulo del simulador
const cambiarSubtitulo = (texto) => {
  let text = document.querySelector(".text");
  text.innerText = texto;
};
//Funcion que da formato de dinero al dato recibido
function formatearPrecio(precio) {
  if (precio == null) {
    precio = "S/C";
  } else {
    precio = numeroADinero(precio);
  }
  return precio;
}
//Funcion ajusta la cantidad de decimales recibidos de la api
const quitarDecimales = (num) => {
  if (num == 0) {
    num = "S/C";
  } else {
    num = parseFloat(num).toFixed(2);
  }
  return num;
};
//Funcion que limpia la tabla y evita que se repita la misma
const clearTable = () => {
  const table = document.querySelector(".table-container");
  table.innerHTML = "";
};
//Funcion que limpia el texo
const clearText = () => {
  const text = document.querySelector(".text");
  text.innerHTML = "";
};
//Codigo que captura el boton Nasdaq
const btnNasdaq = document.getElementById("nasdaq");
//Funcion que mustra la informacion requerida por el usuario
btnNasdaq.onclick = () => {
  clearTable();
  clearText();
  getDatosNasdaq();
};
//Codigo que captura el boton FTSE
const btnFtse = document.getElementById("ftse");
//Funcion que mustra la informacion requerida por el usuario
btnFtse.onclick = () => {
  clearTable();
  clearText();
  getDatosFtse();
};
//Codigo que captura el boton nikkei
const btnNikkei = document.getElementById("nikkei");
//Funcion que mustra la informacion requerida por el usuario
btnNikkei.onclick = () => {
  clearTable();
  clearText();
  getDatosNikkei();
};
