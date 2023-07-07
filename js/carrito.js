const containerCarrito = document.querySelector(".container-carrito")
const containerTotal = document.querySelector(".container-total")
const textoCantidadItems = document.querySelector(".carrito-items")
const containerVaciar = document.querySelector(".container-vaciar")

class MiCarrito {
    constructor(carrito) {
        this.carrito = carrito
    }

    generarCardsCarrito(producto){
        return `<div class="card-carrito">
                    <img class="carrito-imagen" src="${producto.imagen}" alt="">
                    <div class="carrito-producto">
                        <h4 class="nombre-producto">${producto.nombre}</h4>
                        <p class="descripcion-producto">${producto.descripcion}</p>
                    </div>
                    <div class="cantidad-container">
                        <div class="cantidad" id="${producto.codigo}">${producto.cantidad}</div>
                    </div>
                    <h4 class="precio-producto">$${producto.precio*producto.cantidad}</h4>
                    <img  id="${producto.codigo}" class="eliminar-icono" src="./img/delete-icon.svg" alt="">
                </div>`
    }

    generarTotalCarrito(){
        let totalCarrito = this.carrito.reduce ((acc,producto)=> acc + producto.precio * producto.cantidad, 0) 
        return `<h4 class="total-texto">Total a pagar: <span class="color-total"> $${totalCarrito}</span></h4>
                <div class="botones-checkout">
                    <a  href=index.html#tienda>
                        <button class="seguir-comprando">Seguir comprando</button>
                    </a>
                    <a  href=pagar.html>
                        <button class="seguir-comprando pagar-boton">Pagar</button>
                    </a>
                </div>`
    }

    mostrarCardsCarrito(){
        if (this.carrito.length > 0){
            this.carrito.forEach ((producto) => {containerCarrito.innerHTML += this.generarCardsCarrito(producto)})
        }
    }

    mostrarTotalCarrito(){
        this.carrito.length > 0 ? containerTotal.innerHTML = this.generarTotalCarrito()
                                : containerTotal.innerHTML = ""
    } 

    mostrarEstadoCarrito(){
        this.carrito.length > 0 ? textoCantidadItems.textContent = "Tu carrito tiene " + this.carrito.length + " items."
                                :textoCantidadItems.textContent = "Tu carrito está vacío."
    }

    vaciarCarrito(){
        if (carrito.length > 0){
            containerVaciar.innerHTML = `<button class="vaciar-carrito" id"vaciar">Vaciar carrito<img src="./img/delete-icon.svg" class="icono-vaciar"></button>`
            containerVaciar.addEventListener("click", ()=> {
                localStorage.removeItem("carrito")
                containerCarrito.innerHTML =  ""
                this.carrito.length = 0
                cambiarCantidadCarrito()
                this.mostrarEstadoCarrito()
                this.mostrarTotalCarrito()
                containerVaciar.innerHTML = ""
            })
        }
    }

    eliminarDelCarrito(){
        const botonesEliminar = document.querySelectorAll(".eliminar-icono")
        for (let boton of botonesEliminar){
            boton.addEventListener("click", (e)=>{   
                const indice = this.carrito.findIndex((producto)=> producto.codigo === parseInt(e.target.id))   
                this.carrito.splice (indice, 1) 
    
                cambiarCantidadCarrito()
                this.mostrarEstadoCarrito()
                this.mostrarTotalCarrito()
    
                localStorage.setItem ("carrito", JSON.stringify(this.carrito))
                containerCarrito.innerHTML = ""
                this.mostrarCardsCarrito()
                this.eliminarDelCarrito()
            }) 
        }
        if(carrito.length === 0){
            containerVaciar.innerHTML = ""
        }
    }
}

const nuevaCompra = new MiCarrito(carrito)

nuevaCompra.mostrarCardsCarrito()
nuevaCompra.mostrarTotalCarrito()
nuevaCompra.mostrarEstadoCarrito()
nuevaCompra.eliminarDelCarrito()
nuevaCompra.vaciarCarrito()