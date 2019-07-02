class Producto{
	//1) constructor
	constructor(n, p, s, d){
		this.nombre = n
		this.precio = p
		this.stock = s
		this. disponible = d
	}

	//2) metodos de instancia
	Mostrar(neto = true){
				let ficha = document.createElement("ul")

				let contenido =
								`<li>Nombre: ${this.nombre}</li>
								<li>Precio: ARS${neto ? this.precio : this.precioBruto}</li>
								<li>Stock: ${this.stock} unid.</li>
								<li>disponible: ${this.disponible ? "SI" : "NO"} </li>
								`

				ficha.innerHTML = contenido		

				document.body.appendChild( ficha )
	}
	precioBruto(){
		return (this.precio / 1.21).toFixed(2)

	}
	//3) metodos de clase o metodos estaticos
	static parse(data){
		console.log("Ahora debería convertir Object en Producto")
		data = JSON.parse(data)

		if (data instanceof Array){ // hay muchos objetos?

			let productos = new Array()
			data.forEach(item => {
				let producto = new Producto(item.nombre, item.precio, item.stock, item.disponible)
				productos.push( producto )

		})
			return productos

		} else if( data instanceof Object){// hay un solo object?
      
        let producto= new producto(data.nombre, data.precio, data.stock, data.disponible)
		
        return producto
		}else {// no hay ningun object (no sirve)

        return null
		}

	}
}

//////



