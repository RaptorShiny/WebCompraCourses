
class VentaOnline{
    constructor(namecourse,price){
        this.namecourse=namecourse
        this.price=price
    }
}

class UI{
    AgregarItemLista(Venta){
        let Box=document.createElement("div");
        Box.innerHTML=`<div class="card name="card_coursechoosen">
        <h5 class="card-header">${Venta.namecourse} <button type="button" class="btn btn-warning" name="deleteproduct" value="${Venta.price}">Eliminar</button> </h5>
        <div class="card-body">
          <h5 class="card-title">Descripcion</h5>
          <p class="card-text">Precio del Curso: <strong> $${Venta.price}<strong></p>
        </div>
      </div>`;

      let ListaId=document.getElementById('ListItemsContainer')
      ListaId.appendChild(Box);
    }

    
    EliminarItemsLista(Objeto){
        if(Objeto.name==="deleteproduct"){
            Objeto.parentElement.parentElement.parentElement.remove()
            /*Ahora podemos reducir el carrito*/
            return true;
        }
    }

    ActulizarCarrito(nuevoprecio){
        let carrito=document.getElementById("cantidadtotal")
        carrito.innerHTML=`$${nuevoprecio}`
    }

    ConfirmarCompra(valordelCarrito){
        alert(`TOTAL DE PAGO ${valordelCarrito}: Gracias por su Compra!!`)
        /*Limpiando Lista de Items*/
        let listaclean=document.getElementById("ListItemsContainer")
        //El children me devuelve un HMTLcollection , es cual lo conviero a array
        let arraydeloshijos=[...listaclean.children];
        for (const iterator of arraydeloshijos) {iterator.remove()}

        /*Limpiando Mostrador y Carrito a zero*/
        ValueCarrito=0
        document.getElementById("cantidadtotal").innerHTML="";
        console.log("Todo Limpio")
    }

}


/* INICIANDO MI CARRITO , esta sera una global que estara cambiando a cada rato*/
ValueCarrito=0

/* INSTANCIANDO MI UI , que permitira hacer todas las animaciones del proyecto*/
let INTERFAZ_UI=new UI()


document.addEventListener("DOMContentLoaded",function(event){

    /* El "getElementsByName" nos da un array de elementos(botones)*/
    let Botones=document.getElementsByName('btnBuy')

    /* Para que todos los botones esten listos con su evento*/
    Botones.forEach((element,index) => {
        element.addEventListener("click",function(event){
            /* Creando mi objeto , que tendra los atributos name,value del boton precionado*/
            let NuevaCompra=new VentaOnline(element.parentElement.parentElement.getAttribute("name"),parseInt(this.getAttribute("value")))


            INTERFAZ_UI.AgregarItemLista(NuevaCompra)
            console.log("Objeto Agregado")

            /*Actualizamos el Carrito*/
            ValueCarrito=ValueCarrito+parseInt(this.getAttribute("value"));
            console.log(ValueCarrito)
           
            INTERFAZ_UI.ActulizarCarrito(ValueCarrito)

        })
    });



    /*Si el usuario hace un click dentro del div llamdo "ListItemsContainer" */
    let EliminarItemList=document.getElementById("ListItemsContainer");

    EliminarItemList.addEventListener("click",function(e){
        /* Usando el target de nuestro div , para saber en que elemento fue precionado(debe ser uno de sus hijos)*/
        if(INTERFAZ_UI.EliminarItemsLista(e.target)){
            /* Si el target(elemento precionado que es un elemento de nuestro div) 
            posee un name llamado "deleteproduct"(confirmando que es el botom que
            estamos buscando) se eliminara al padre del padre(osea todo el card)*/
            ValueCarrito=ValueCarrito-parseInt(e.target.getAttribute("value"));
            /*Actualizamos el Carrito*/
            console.log(ValueCarrito)
            INTERFAZ_UI.ActulizarCarrito(ValueCarrito)
        }

    })


    let ConfirmarCompra=document.getElementById('confirmCompra')

    ConfirmarCompra.addEventListener("click",function(){
        INTERFAZ_UI.ConfirmarCompra(ValueCarrito)
    })

})