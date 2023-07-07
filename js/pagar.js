const inputNombre = document.querySelector(".container-nombre").getElementsByTagName("input")[0]
const inputEmail = document.querySelector(".container-email").getElementsByTagName("input")[0]
const inputDireccion = document.querySelector(".container-direccion").getElementsByTagName("input")[0]

const errorNombre =  document.querySelector("#error-nombre")
const errorEmail =  document.querySelector("#error-email")
const errorDireccion =  document.querySelector("#error-direccion")
const errorMedioPago = document.querySelector("#error-medio-pago")

const medioPago = document.getElementsByName("medio-pago")
const botonPagar = document.querySelector("#boton-pagar")
const totalPagar = document.querySelector("span")

const autocompletarBoton = document.querySelector("#autocompletar")

let nombreValido
let emailValido
let direccionValida
let medioPagoValido


// Verificar medio de pago
function verificarMedio(){
    for (i = 0; i < medioPago.length; i++){
        if (medioPago[i].checked) {
            return medioPago[i].value;
        }
    }
}

class Cliente {
    constructor(nombre,email,direccion,mediopago){
        this.nombre = nombre
        this.email = email
        this.direccion = direccion
        this.mediopago = mediopago
    }

    validarNombre(){
        inputNombre.value !== "" && isNaN(inputNombre.value) ? 
        (nombreValido = true, this.nombre = inputNombre.value, errorNombre.textContent = "") 
        : (nombreValido = false, errorNombre.textContent = "Ingresa un nombre válido")
    }

    validarEmail(){
        let validacionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        inputEmail.value !== "" &&  validacionEmail.test(inputEmail.value) ?  
        (emailValido = true, this.email = inputEmail.value, errorEmail.textContent = "")
        : (emailValido = false , errorEmail.textContent = "Ingresa un email válido")
    }

    validarDireccion(){
        inputDireccion.value !== "" ? 
        (direccionValida = true, this.direccion = inputDireccion.value, errorDireccion.textContent = "")
        : (direccionValida = false, errorDireccion.textContent = "Ingresa una dirección")
    }

    validarMedioDePago(){
        verificarMedio() !== undefined ?  
        (medioPagoValido = true, this.mediopago = verificarMedio(), errorMedioPago.textContent = "")
        : (medioPagoValido = false, errorMedioPago.textContent = "Elige una opcion")
    }

    validarDatosCliente(){ 
        botonPagar.addEventListener("click", (e)=>{
            e.preventDefault()
            this.validarNombre()
            this.validarEmail()
            this.validarDireccion()
            this.validarMedioDePago()

            if (nombreValido == true &&  emailValido == true && direccionValida == true && medioPagoValido == true){
                localStorage.setItem ("Cliente",JSON.stringify(nuevoCliente))
                localStorage.removeItem("carrito");
                carrito.length = 0
                cambiarCantidadCarrito()

                botonPagar.innerText = "Procesando..."
                setTimeout (()=>{
                    botonPagar.innerText = "Pagar"
                    Swal.fire({
                        icon: "success",
                        title: "¡Éxito!" ,
                        text:  "Tu compra se ha realizado exitosamente",
                        confirmButtonColor: "#F04B52",
                    }).then(function() {window.location = "index.html"})
                },3000)
            } 
        })
    }
}

const nuevoCliente = new Cliente
nuevoCliente.validarDatosCliente()

function mostrarTotalPagar(){
    let totalCarrito = carrito.reduce ((acc,producto)=> acc + producto.precio*producto.cantidad, 0) 
    totalPagar.innerHTML = "$" + totalCarrito
}

function completarFormulario(){
    autocompletar.addEventListener("click", ()=> {
        inputNombre.value = "Luciana Santillán"
        inputEmail.value = "lucianasantillan@gmail.com"
        inputDireccion.value = "Avenida Belgrano 321"
    }) 
}

mostrarTotalPagar()
completarFormulario()

// Animaciones
AOS.init();
window.addEventListener('load', AOS.refresh)