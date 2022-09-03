/** Creacion y recuperacion de la informacion del simulado **/

//Codigo que crea y asigna valor a la varible saldo
let saldoCajaAhorro = localStorage.getItem("saldo");
//Operador avanzado que verifica si existe el objeto saldo, si no es así lo crea
saldoCajaAhorro == null && localStorage.setItem("saldo", 150000);
saldoCajaAhorro = parseFloat(saldoCajaAhorro);
//Funcion que actualiza el saldo almacenado en el storage
const actualizarSaldoStorage = () => {
  localStorage.setItem("saldo", saldoCajaAhorro);
};

/* Funciones generales */

//Funcion que coinvierte un numero al formato de pesos argentinos
const numeroADinero = (dinero) => {
  return (dinero = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(dinero));
};

/** Carga de datos al localstorage **/

//Funcion que captura la informacion de los servicios por vencer del local json y la copia en el localstorage
function jsonToStorageServicios() {
  fetch("../../json/serviciosPorVencer.json")
    .then((resp) => resp.json())
    .then((data) => {
      servicios = data;
      guardarLocal("servicios", JSON.stringify(servicios));
    });
}
//Llamada a la funcion
jsonToStorageServicios();
//Funcion que captura la informacion de las operaciones simuladas del local json y la copia en el localstorage
function jsonToStorageOperaciones() {
  fetch("../../json/operaciones.json")
    .then((resp) => resp.json())
    .then((data) => {
      operaciones = data;
      guardarLocal("operaciones", JSON.stringify(operaciones));
    });
}
//Llamada a la funcion
jsonToStorageOperaciones();
//Funcion que captura la informacion de las operaciones simuladas del local json y la copia en el localstorage
function jsonToStorageCuentasHabilitadas() {
  fetch("../../json/cuentasHabilitadas.json")
    .then((resp) => resp.json())
    .then((data) => {
      cuentasHabilitadas = data;
      guardarLocal("cuentasHabilitadas", JSON.stringify(cuentasHabilitadas));
    });
}
//Llamada a la funcion
jsonToStorageCuentasHabilitadas();
//Creacion del array que va a contener las cuentas simuladas
const cuentas = [];
//Funcion que carga los objetos literales que contienen la informacion de las cuentas bancarias simuladas al array de cuentas
function cargarCuentas() {
  cuentas.push({
    tipo: "Caja de Ahorro",
    moneda: "$",
    cuenta: "5069-5689756/4",
    identificador: "Cuenta",
    saldo: `${numeroADinero(saldoCajaAhorro)}`,
  });
  cuentas.push({
    tipo: "Cta Corriente",
    moneda: "$",
    cuenta: "5069-5689652/4",
    identificador: "Cuenta",
    saldo: "$ 200.000,00",
  });
  cuentas.push({
    tipo: "Caja de Ahorro",
    moneda: "USD",
    cuenta: "5069-5685686/4",
    identificador: "Cuenta",
    saldo: "USD 5.000,00",
  });
}
//LLamada a la funcion
cargarCuentas();
//Funcion que convierte la informacion a JSON y la guarda en el localstorage para luego ser recuperada
const guardarLocal = (clave, valor) => localStorage.setItem(clave, valor);
//Llamadas a la funcion para guardar los datos necesarios para iniciar el programa
guardarLocal("cuentas", JSON.stringify(cuentas));
