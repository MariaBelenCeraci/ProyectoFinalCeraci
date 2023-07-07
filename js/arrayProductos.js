const URL = "js/productos.json"

const productos = []

function recuperarCarrito(){
    if(localStorage.getItem("carrito")){   
        return  JSON.parse(localStorage.getItem("carrito"))
    } else {
        return []
    }
}

const carrito = recuperarCarrito()

// Mostrar cantidad del carrito

const cantidadCarrito = document.querySelector(".carrito-boton")

function cambiarCantidadCarrito(){
    cantidadCarrito.innerHTML = `<img class="icon-carrito" src="./img/carrito-icono.svg" alt="">
                                <p>${carrito.length} items</p>`
}  

cambiarCantidadCarrito()