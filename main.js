var productos = new Array(20);
let contador = 0;
let cond = 0;
var codigo = document.querySelector("#codigo");
var nombre = document.querySelector("#nombre");
var desc = document.querySelector("#descripcion");
var cantidad = document.querySelector("#cant");
var costo = document.querySelector("#cost");
var btnAgregar = document.querySelector("#agregar");
var btnBorrar = document.querySelector("#borrar");
var btnBuscar = document.querySelector("#buscar");
var btnListar = document.querySelector("#listar");
var div = document.querySelector("#result");
btnAgregar.addEventListener("click",()=>{
    cond = 0;
    var objeto = {
        "id":codigo.value,
        "nombre":nombre.value,
        "desc":desc.value,
        "cant":cantidad.value,
        "cost":costo.value
    }
    if (contador < 20){
        productos.forEach(p =>{
            if (objeto.id == p.id){
                cond = 1;
            }
        })
        if(cond == 0){
            productos[contador] = objeto;
            contador++;
            div.textContent="";
            div.insertAdjacentHTML("beforeend","<p>Producto agregado.</p>");
        }
        else{
            div.textContent="";
            div.insertAdjacentHTML("beforeend","<p>Producto ya agregado.</p>");
        }
    }
    else{
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>Máximo de productos</p>");
    }
})
btnBorrar.addEventListener("click",()=>{
    cond = 0;
    let index = 0;
    productos.forEach((p,i) =>{
        if (codigo.value == p.id){
            cond = 1;
            index = i;
        }
    })
    if (cond == 1){
        delete productos[index];
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>Producto eliminado.</p>");
    }
    else{
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>El producto no existe</p>");
    }
})
btnBuscar.addEventListener("click",()=>{
    
})
btnListar.addEventListener("click",()=>{
    div.textContent="";
    div.insertAdjacentHTML("beforeend",`<table id="t1" style="text-align:center">
    <thead>
    <th>Código</th>
    <th>Nombre</th>
    <th>Descripción</th>
    <th>Cantidad</th>
    <th>Costo</th>
    <thead>
    <tbody id="tabla" style="text-align:center"></tbody>`);
    let tabla = document.querySelector("#tabla");
    productos.forEach(p =>{
        let ren = tabla.insertRow(-1);
        let col = ren.insertCell(0);
        let col1 = ren.insertCell(1);
        let col2 = ren.insertCell(2);
        let col3 = ren.insertCell(3);
        let col4 = ren.insertCell(4);
        col.textContent = p.id;
        col1.textContent = p.nombre;
        col2.textContent = p.desc;
        col3.textContent = p.cant;
        col4.textContent = p.cost;
    })
})