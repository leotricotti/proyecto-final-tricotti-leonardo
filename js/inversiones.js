// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f',
// 		'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
// 	}
// };

// fetch('https://google-finance4.p.rapidapi.com/search/?q=nasdaq&hl=en&gl=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response[1].price.previous_close))
// 	.catch(err => console.error(err));

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f',
// 		'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
// 	}
// };

// fetch('https://google-finance4.p.rapidapi.com/search/?q=ftse&hl=en&gl=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//Funcion que captura datos del servidor
async function getDatosNikkei() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0fc78676efmsh63b6bb59f51558fp1d14fbjsn748e1845fb4f",
      "X-RapidAPI-Host": "google-finance4.p.rapidapi.com",
    },
  };
  fetch(
    "https://google-finance4.p.rapidapi.com/search/?q=nikkei&hl=en&gl=US",
    options
  )
    .then((response) => response.json())
    .then((response) => llamarApi(response))
    .catch((err) => console.error(err));
};

const llamarApi = (respuesta) => {
  //Codigo que cambia el subtitulo del simulador
  let text = document.querySelector(".text");
  text.innerText = "Indice NIKKEI";
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
//Codigo que captura el boton nikkei
const btnFtse = document.getElementById("nikkei");
//Funcion que mustra la informacion requerida por el usuario
btnNikkei.onclick = () => {
  getDatosNikkei();
};
//Codigo que captura el boton nikkei
const btnNikkei = document.getElementById("nikkei");
//Funcion que mustra la informacion requerida por el usuario
btnNikkei.onclick = () => {
  getDatosNikkei();
};
//Funcion que da formato de dinero al dato recibido
function formatearPrecio(precio){
  if(precio == null){
    precio = "S/C";
  }else{
    precio = numeroADinero(precio);
  }
  return precio;
}; 
//Funcion ajusta la cantidad de decimales recibidos de la api
const quitarDecimales = (num) => {
  if(num == 0){
    num = "S/C";
  }else{
    num = parseFloat(num).toFixed(2);
  }
  return num;
}
  