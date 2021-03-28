const botonesAgregarCarrito = document.querySelectorAll(".agregarCarrito")
botonesAgregarCarrito.forEach(botonAgregarCarrito => {
    botonAgregarCarrito.addEventListener("click", agregarCarritoClicked)
})

const botonComprar = document.querySelector(".botonComprar")
botonComprar.addEventListener("click", botonComprarClicked) 

const contenedorCarritoItems = document.querySelector(".contenedorCarritoItems")


function agregarCarritoClicked(event) {
    const button = event.target
    const item = button.closest(".item")

    const nombreItem = item.querySelector(".nombre-item").textContent
    const precioItem = item.querySelector(".precio-item").textContent
    const imagenItem = item.querySelector(".imagen-item").src

    agregarItemAlCarrito(nombreItem, precioItem, imagenItem)
}

function agregarItemAlCarrito(nombreItem, precioItem, imagenItem) {
    
    const elementoNombre = contenedorCarritoItems.getElementsByClassName("carritoItemNombre")

    for(let i=0; i < elementoNombre.length; i++){
        if(elementoNombre[i].innerText === nombreItem)
        {
            let elementoCantidad = elementoNombre[i].parentElement.parentElement.parentElement.querySelector(".carritoItemCantidad")
            elementoCantidad.value++
            actualizarTotalCarrito()
            return
        }
    }



    const carritoRow = document.createElement("div")
    const contenidoCarrito = `
    <div class="row carritoItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">     
            <img src=${imagenItem} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title carritoItemNombre text-truncate ml-3 mb-0">${nombreItem}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 carritoItemPrecio">${precioItem}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input carritoItemCantidad" type="number"
                value="1">
            <button class="btn btn-danger botonBorrar" type="button">X</button>
        </div>
    </div>
    </div>
    `
    carritoRow.innerHTML = contenidoCarrito
    contenedorCarritoItems.append(carritoRow)


    carritoRow.querySelector(".botonBorrar").addEventListener("click", quitarItemCarrito)

    carritoRow.querySelector(".carritoItemCantidad").addEventListener("change", cambioCantidad)

    actualizarTotalCarrito()
}

function actualizarTotalCarrito(){
    let total = 0
    const totalCarrito = document.querySelector(".totalCarrito")
    const carritoItems = document.querySelectorAll(".carritoItem")
    carritoItems.forEach((carritoItem) => {
        const carritoItemPrecioElement = carritoItem.querySelector(".carritoItemPrecio")

    const carritoItemPrecio = Number(carritoItemPrecioElement.textContent.replace("$", ""))
    const carritoItemCantidadElement = carritoItem.querySelector(".carritoItemCantidad")
    const carritoItemCantidad = Number (carritoItemCantidadElement.value)
    total = total + carritoItemPrecio * carritoItemCantidad    
})
totalCarrito.innerHTML = `$${total}`
}

function quitarItemCarrito(event){
    const botonClicked = event.target
    botonClicked.closest(".carritoItem").remove()
    actualizarTotalCarrito()
}

function cambioCantidad(event){
    const cambio = event.target
    if(cambio.value <= 0){
        cambio.value = 1
    }
    actualizarTotalCarrito()
}

function botonComprarClicked() {
    contenedorCarritoItems.innerHTML = ""
    actualizarTotalCarrito()
}