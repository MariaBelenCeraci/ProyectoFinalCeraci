const containerProductos = document.querySelector(".productos-container")

function generarCards(producto){  
    return `<div class="card-producto">
                <div class="img-producto-container">
                    <img src="${producto.imagen}" alt="" class="img-producto">
                </div>
                <h5 class="card-nombre-producto">${producto.nombre}</h5>
                <p class="descripcion">${producto.descripcion}</p>
                <div class="card-cta">
                    <h4 class="card-precio">$${producto.precio}</h4>
                    <button id="${producto.codigo}" class="btn-card">Agregar</button>
                </div>
            </div>`
}

function activarClickEnBotones(){
    const botones = document.querySelectorAll (".btn-card") 
    for (let boton of botones){
        boton.addEventListener("click", (e)=>{   
            const eleccion = productos.find((producto)=> producto.codigo === parseInt(e.target.id))  
            const existe = carrito.some((producto)=> eleccion.codigo === producto.codigo) 

            if(existe){
                carrito.map((prod)=>{
                    if (prod.codigo === eleccion.codigo){
                        prod.cantidad++
                        localStorage.setItem ("carrito", JSON.stringify(carrito)) 
                    
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Se ha agregado <span class="pop-up-color">${eleccion.nombre}</span> al carrito` ,
                            showConfirmButton: false,
                            timer: 3000,
                            toast: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                    }
                })
            }else{
                carrito.push (eleccion)
                eleccion.cantidad++
                localStorage.setItem ("carrito", JSON.stringify(carrito)) 
                cambiarCantidadCarrito()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Se ha agregado <span class="pop-up-color">${eleccion.nombre}</span> al carrito` ,
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }  
                })
            }
        }) 
    }
}

function cargarProductos(array){
    array.forEach((producto) => {containerProductos.innerHTML += generarCards(producto)})
    activarClickEnBotones()
}

function obtenerProductosJson(){
    fetch (URL)
        .then((response)=> response.json())
        .then((data)=> productos.push(...data))
        .then(()=> cargarProductos(productos))
        .catch((error)=> containerProductos.innerHTML = `<h4 class="error">Ha ocurrido un error. No se han cargado los datos correctamente.</h4>`)
}

obtenerProductosJson()

// Filtros y busqueda de productos

const categorias = document.querySelectorAll(".categoria")
const todos = document.querySelector(".vertodos")
const inputBusqueda = document.querySelector("#input-busqueda")
const botonBusqueda = document.querySelector("#buscar")

function verTodos(){
    todos.addEventListener("click", ()=>{
        containerProductos.innerHTML = ""
        cargarProductos(productos)
    })
}

function filtrarCategoria(){
    for (let categoria of categorias){
        categoria.addEventListener("click", ()=>{
            const filtrado = productos.filter ((producto)=> {return producto.categoria === categoria.id.toUpperCase()}) 
            containerProductos.innerHTML = ""
            cargarProductos(filtrado)
        })
    }
}

verTodos()
filtrarCategoria()

function buscarProducto(){
    botonBusqueda.addEventListener("click", ()=>{
        let busqueda = inputBusqueda.value
        const resultadoBusqueda = productos.filter ((producto)=>{return producto.nombre.toUpperCase().includes(busqueda.toUpperCase())}) 

        resultadoBusqueda.length > 0 ? (containerProductos.innerHTML = "", cargarProductos(resultadoBusqueda))
                                    : containerProductos.innerHTML = `<p>Ningún resultado coincide con tu búsqueda.</p>`

    })
}

buscarProducto()

//Animaciones
AOS.init();
window.addEventListener('load', AOS.refresh)