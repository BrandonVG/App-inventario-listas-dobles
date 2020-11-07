var aux = null;
var codigo = document.querySelector("#codigo");
var nombre = document.querySelector("#nombre");
var desc = document.querySelector("#descripcion");
var cantidad = document.querySelector("#cant");
var costo = document.querySelector("#cost");
var pos = document.querySelector("#pos");
var btnAgregar = document.querySelector("#agregar");
var btnBorrar = document.querySelector("#borrar");
var btnBuscar = document.querySelector("#buscar");
var btnListar = document.querySelector("#listar");
var btnListarI = document.querySelector("#listarInv");
var btnAgregarIn = document.querySelector("#agregarIn");
var btnBorrarIn = document.querySelector("#borrarIn")
var div = document.querySelector("#result");
class Inventario{
    constructor(){
        this.inicio = null;
    }
    agregar(producto){
        if (this.inicio == null){
            this.inicio = producto;
        }
        else{
            aux = this.inicio;
            while (aux != null){
                if (producto.codigo == aux.codigo){
                    return false;
                }
                aux = aux.siguiente;
            }
            aux = this.inicio;
            while(aux.siguiente != null){
                aux = aux.siguiente;
            }
            aux.siguiente = producto;
        }
    }
    agregarInicio(producto){
        aux = this.inicio;
        while(aux != null){
            if (aux.codigo == producto.codigo){
                return false;
            }
            aux = aux.siguiente;
        }
        producto.siguiente = this.inicio;
        this.inicio = producto;
    }
    borrarInicio(){
        aux =this.inicio;
        this.inicio = this.inicio.siguiente;
        aux.siguiente = null;
        return aux;
    }
    borrarCodigo(codigo){
        if(this.inicio == null){
            return null;
        }
        else if(this.inicio.codigo == codigo){
            return this.borrarInicio();
        }
        else{
            aux = this.inicio;
            while (aux.siguiente.codigo != codigo && aux.siguiente != null){
                aux= aux.siguiente;
            }
            if (aux.siguiente != null){
                let temp = aux.siguiente;
                aux.siguiente = temp.siguiente;
                temp.siguiente = null;
                return temp;
            }
            else{
                return null;
            }
        }
    }
    buscarCodigo(codigo){
        if(this.inicio == null){
            return null
        }
        else if(this.inicio.codigo == codigo){
            return this.inicio;
        }
        else{
            aux = this.inicio;
            while(aux.codigo != codigo && aux.siguiente != null){
                aux = aux.siguiente;
            }
            if(aux.siguiente == null && aux.codigo != codigo){
                return null;
            }
            else{
                return aux;
            }
            
        }
    }
    listar(){
        crearTabla();
        let valMer = 0;
        let tabla = document.querySelector("#tabla");
        let merc = document.querySelector("#merc");
        if (this.inicio == null){
            div.textContent="";
            div.insertAdjacentHTML("beforeend","No hay productos");
            return false;
        }
        aux = this.inicio;
        while (aux != null){
            let ren = tabla.insertRow(-1);
            let col = ren.insertCell(0);
            let col1 = ren.insertCell(1);
            let col2 = ren.insertCell(2);
            let col3 = ren.insertCell(3);
            let col4 = ren.insertCell(4);
            col.textContent = aux.codigo;
            col1.textContent = aux.nombre;
            col2.textContent = aux.desc;
            col3.textContent = aux.cantidad;
            col4.textContent = aux.costo;
            valMer += (parseInt(aux.cantidad) * parseInt(aux.costo));
            aux = aux.siguiente;
        }
        merc.textContent = "El valor de la mercancia es: $"+valMer;
    }
    listarInverso(){
        crearTabla();
        let valMer = 0;
        let tabla = document.querySelector("#tabla");
        let merc = document.querySelector("#merc");
        if (this.inicio == null){
            div.textContent="";
            div.insertAdjacentHTML("beforeend","No hay productos");
            return false;
        }
        aux = this.inicio;
        while (aux != null){
            let ren = tabla.insertRow(0);
            let col = ren.insertCell(0);
            let col1 = ren.insertCell(1);
            let col2 = ren.insertCell(2);
            let col3 = ren.insertCell(3);
            let col4 = ren.insertCell(4);
            col.textContent = aux.codigo;
            col1.textContent = aux.nombre;
            col2.textContent = aux.desc;
            col3.textContent = aux.cantidad;
            col4.textContent = aux.costo;
            valMer += (parseInt(aux.cantidad) * parseInt(aux.costo));
            aux = aux.siguiente;
        }
        merc.textContent = "El valor de la mercancia es: $"+valMer;
    }
    agregarPos(producto,posicion){
        if(this.inicio == null){
            return false;
        }
        aux = this.inicio;
        while (aux != null){
            if (producto.codigo == aux.codigo){
                return false;
            }
            aux = aux.siguiente;
        }
        aux = this.inicio;
        let i = 1;
        while(i < posicion-1 && aux != null){
            aux = aux.siguiente;
            i++;
        }
        if(aux == null){
            return false;
        }
        let temp = aux.siguiente;
        aux.siguiente = producto;
        aux.siguiente.siguiente = temp;
    }
}
class Producto{
    constructor(codigo,nombre,desc,cantidad,costo,posicion){
        this.codigo = codigo;
        this.nombre = nombre;
        this.desc = desc;
        this.cantidad = cantidad;
        this.costo = costo;
        this.posicion = posicion;
        this.siguiente = null;
    }
}
function crearTabla(){
    div.textContent="";
    div.insertAdjacentHTML("beforeend",`<table id="t1" style="text-align:center">
    <thead>
    <th>Código</th>
    <th>Nombre</th>
    <th>Descripción</th>
    <th>Cantidad</th>
    <th>Costo</th>
    <thead>
    <tbody id="tabla" style="text-align:center"></tbody>
    <p id ="merc"></p>`);
}
function validar(){
    if (codigo.value == "" || nombre.value == "" || desc.value == "" || cantidad.value =="" || costo.value ==""){
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>Algún campo esta vacío.</p>");
        return false;
    }
    else{
        return 1;
    }
}
let inv = new Inventario();
btnAgregar.addEventListener("click",()=>{
    if (pos.value == ""){
        let validacion = validar();
        if (validacion == 1){
            let nuevo = new Producto(codigo.value,nombre.value,desc.value,cantidad.value,costo.value);
            let agrgar = inv.agregar(nuevo);
            if (agrgar == false){
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>El codigo del producto ya existe.</p>");
            }
            else{
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>Producto agregado.</p>");
            }
        }
    }
    else if (pos.value == 1){
        let validacion = validar();
        if (validacion == 1){
            let nuevo = new Producto(codigo.value,nombre.value,desc.value,cantidad.value,costo.value);
            let agrg = inv.agregarInicio(nuevo);
            if (agrg == false){
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>El codigo del producto ya existe.</p>");
            }
            else{
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>Producto agregado.</p>");
            }
        }
    }
    else{
        let validacion = validar();
        if (validacion == 1){
            let nuevo = new Producto(codigo.value,nombre.value,desc.value,cantidad.value,costo.value);
            let agregarpos = inv.agregarPos(nuevo,pos.value);
            if (agregarpos == false){
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>No se ha podido agregar, no hay un elemento en la posicion indicada o el codigo ya existe.</p>");  
            }
            else{
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>Producto agregado.</p>");
            }
        }
    }
});
btnBorrar.addEventListener("click",()=>{
    producto = inv.borrarCodigo(codigo.value);
    if (producto == null){
        div.textContent="";
        div.insertAdjacentHTML("beforeend","El producto no existe: "+producto);
        return false;
    }
    let atributos =["codigo","nombre","desc","cantidad","costo"];
    let labels = ["Código","Nombre","Descripción","Cantidad","Costo"];
    div.textContent="";
    div.insertAdjacentHTML("beforeend","<p>Producto eliminado.</p>");
    div.insertAdjacentHTML("beforeend","<ul id='lista'></ul>");
    let lista = document.querySelector("#lista");
    for(let i = 0; i<5; i++){
        let item = document.createElement("li");
        item.textContent=labels[i]+": "+producto[atributos[i]];
        lista.appendChild(item);
    }
});
btnBuscar.addEventListener("click",()=>{
    producto = inv.buscarCodigo(codigo.value);
    if (producto == null){
        div.textContent="";
        div.insertAdjacentHTML("beforeend","El producto no existe: "+producto);
        return false;
    }
    let atributos =["codigo","nombre","desc","cantidad","costo"];
    let labels = ["Código","Nombre","Descripción","Cantidad","Costo"];
    div.textContent="";
    div.insertAdjacentHTML("beforeend","<ul id='lista'></ul>");
    let lista = document.querySelector("#lista");
    for(let i = 0; i<5; i++){
        let item = document.createElement("li");
        item.textContent=labels[i]+": "+producto[atributos[i]];
        lista.appendChild(item);
    }
})
btnListar.addEventListener("click",()=>{
    inv.listar();
})
btnListarI.addEventListener("click",()=>{
    inv.listarInverso();
})
btnAgregarIn.addEventListener("click",()=>{
    let validacion = validar();
        if (validacion == 1){
            let nuevo = new Producto(codigo.value,nombre.value,desc.value,cantidad.value,costo.value);
            let agregar = inv.agregarInicio(nuevo);
            if (agregar == false){
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>El codigo del producto ya existe.</p>");
            }
            else{
                div.textContent="";
                div.insertAdjacentHTML("beforeend","<p>Producto agregado.</p>");
            }
            
        }
})
btnBorrarIn.addEventListener("click",()=>{
    let producto = inv.borrarInicio();
    if (producto == null){
        div.textContent="";
        div.insertAdjacentHTML("beforeend","El producto no existe: "+producto);
        return false;
    }
    let atributos =["codigo","nombre","desc","cantidad","costo"];
    let labels = ["Código","Nombre","Descripción","Cantidad","Costo"];
    div.textContent="";
    div.insertAdjacentHTML("beforeend","<p>Producto eliminado.</p>");
    div.insertAdjacentHTML("beforeend","<ul id='lista'></ul>");
    let lista = document.querySelector("#lista");
    for(let i = 0; i<5; i++){
        let item = document.createElement("li");
        item.textContent=labels[i]+": "+producto[atributos[i]];
        lista.appendChild(item);
    }
})