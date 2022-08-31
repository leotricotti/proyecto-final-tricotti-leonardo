/** Carga de datos al localstorage **/

//Funcion que captura la informacion de los servicios por vencer del local json y la copia en el localstorage 
function jsonToStorage(){fetch("../../json/serviciosPorVencer.json")
  .then((resp) => resp.json())
  .then((data) => {
    servicios = data;
    guardarLocal("servicios", JSON.stringify(servicios));
})}
//Llamada a la funcion
jsonToStorage();

/** Recuperacion informacion saldo localstorage **/

//Variable que recupera el saldo de la caja de ahorro del local storage
let saldoCajaOperable = localStorage.getItem("saldo");
//Funcion que convierte el dato recuperado del localstorage a numero
const convertirStorageANumero = () => parseFloat(saldoCajaOperable);
//Variable que almacena el dato convertido a numero
let saldoOperable = convertirStorageANumero();


//Funcion que coinvierte un numero al formato de pesos argentinos
const numeroADinero = (dinero) => {
  return (dinero = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(dinero));
}
//Codigo que crea la variable donde se almacenará el saldo simulado
let saldoCajaAhorro = (localStorage.getItem("saldo"));
//Operador avanzado que verifica si existe el objeto saldo, si no es así lo crea
saldoCajaAhorro == null && localStorage.setItem("saldo", 150000);
//Creacion del array que va a contener las cuentas simuladas
const cuentas = [];
//Funcion que carga los objetos literales que contienen la informacion de las cuentas bancarias simuladas al array de cuentas
function cargarCuentas() {
  cuentas.push({tipo: "Caja de Ahorro", moneda: "$", cuenta: "5069-5689756/4", identificador: "Cuenta", saldo: `${numeroADinero(saldoCajaAhorro)}`});
  cuentas.push({tipo: "Cta Corriente", moneda: "$", cuenta: "5069-5689652/4", identificador: "Cuenta", saldo: "$ 200.000,00"});
  cuentas.push({tipo: "Caja de Ahorro", moneda: "USD", cuenta: "5069-5685686/4", identificador: "Cuenta", saldo: "USD 5.000,00"});
}  
//LLamada a la funcion
cargarCuentas();
//Funcion que convierte la informacion a JSON y la guarda en el localstorage para luego ser recuperada
const guardarLocal = (clave, valor) => localStorage.setItem(clave, valor);
//Llamadas a la funcion para guardar los datos necesarios para iniciar el programa
guardarLocal("cuentas", JSON.stringify(cuentas));

//Funcion que actualiza el saldo almacenado en el storage
const actualizarSaldoStorage = () =>
  (saldoCajaAhorro = localStorage.setItem(
    "saldo",
    nuevoSaldo
  ));
