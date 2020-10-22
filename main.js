var productos = [];
var contador = 0;
let cond = 0;
let index = 0;
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
var div = document.querySelector("#result");
btnAgregar.addEventListener("click",()=>{
    if(pos.value == ""){
        cond = 0;
        let validacion = validar();
        contador = productos.length;
        if (validacion == 1){
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
        }
        else{
            div.textContent="";
            div.insertAdjacentHTML("beforeend","<p>Algún campo esta vacío.</p>");
        }
    }
    else{
        cond = 0;
        let validacion = validar();
        contador = productos.length;
        if (validacion == 1 && (pos.value-1) < contador){
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
                    
                    let a = pos.value - 1;
                    for (let i = productos.length; i > a;i--){
                        productos[i] = productos[i-1];
                    }
                    productos[a] = objeto;
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
        }
        else{
            div.textContent="";
            div.insertAdjacentHTML("beforeend","<p>Algún campo esta vacío o no se puede insertar en el espacio indicado.</p>");
        }
    }
})
btnBorrar.addEventListener("click",()=>{
    index = encontrar(productos,codigo);
    if (index == 0){
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>El producto no existe</p>");
    }
    else{
        index--
        borrar(productos,index);
        div.textContent="";
        div.insertAdjacentHTML("beforeend","<p>Producto eliminado.</p>");
    }
})
btnBuscar.addEventListener("click",()=>{
   index = encontrar(productos,codigo)
   if (index == 0){
       div.textContent="";
       div.insertAdjacentHTML("beforeend","<p>El producto no existe</p>");
   }
   else{
       index--;
       let atributos =["id","nombre","desc","cant","cost"];
       let labels = ["Código","Nombre","Descripción","Cantidad","Costo"];
       div.textContent="";
       div.insertAdjacentHTML("beforeend","<ul id='lista'></ul>")
       let lista = document.querySelector("#lista");
       for (let j = 0; j<5;j++){
        let item = document.createElement("li");
        item.textContent=labels[j]+": "+productos[index][atributos[j]];
        lista.appendChild(item);
       }
   }
})
btnListar.addEventListener("click",()=>{
    crearTabla();
    console.log(productos);
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
btnListarI.addEventListener("click",()=>{
    crearTabla();
    invertir(productos);
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
    invertir(productos);
})
function encontrar(vector,codigo){
    let index = 0;
    vector.forEach((p,i) =>{
        if (p.id == codigo.value){
            index = i+1;
        }
    })
    return index;
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
    <tbody id="tabla" style="text-align:center"></tbody>`);
}
function invertir(vector){
    let temp;
    let n = vector.length
    for (let i = 0; i < n/2; i++){
        temp = vector[i];
        vector[i] = vector[n-i-1];
        vector[n-i-1] = temp;
    }
    for(let j = 0;j<n;j++){
        if (productos[j] == undefined){
            delete productos[j]
        }
    }
    return vector;
}
function validar(){
    if (codigo.value == "" || nombre.value == "" || desc.value == "" || cantidad.value =="" || costo.value ==""){
        return 0;
    }
    else{
        return 1;
    }
}
function borrar(vector,id){
    delete vector[id]
    for(let j = id;j<vector.length;j++){
        vector[j] = vector[j+1];
    }
    vector.length--;
    return vector;
}