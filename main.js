class Inventario{
    constructor(){

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