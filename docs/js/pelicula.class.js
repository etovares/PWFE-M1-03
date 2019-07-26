    class Pelicula {

	constructor(i, t, e, d, p, tr){
		this.ID = i
		this.Titulo = t
		this.Estreno = e
		this.Descripcion = d
		this.Poster = p
		this.Trailer = tr
	}

	Mostrar(){
		//1) Capturar el elemento (y clonarlo)
		let elemento = document.querySelector(".pelicula").cloneNode(true)

		//2) Reemplazar/llenar con los datos de "esta" pelicula

			elemento.querySelector("h4").innerText = this.Titulo
			elemento.querySelector("p").innerText = this.Estreno
			elemento.querySelector("img").src = this.Poster

		//3) generar el comportamiento de "Reproductor" mediante un "clousure"
        elemento.querySelector("a").onclick = (event) =>{
        //desactivar el hipervinculo
        event.preventDefault()
        //El this es la pelicula
        

        if( window.auth2.currentUser.get().isSignedIn() ){ 
        let reproductor = document.querySelector("#playMovie")

        reproductor.querySelector("#titulo").innerText = `${this.Titulo} (${this.Estreno})`
        reproductor.querySelector("#descripcion").innerText= this.Descripcion
        reproductor.querySelector("#imagen").src= this.Poster
        reproductor.querySelector("iframe").src= this.Trailer

        window.scroll({
        	behavior : "smooth",
        	top : reproductor.offsetTop
        })
    } else {
         auth2.signIn().then(function (){
         	let usuario = auth2.currentUser.get().getBasicProfile()
         	//alert(`Bienvenido ${usuario.getGivenName()}`)// body...
         	document.querySelector("#user-data").classList.remove("hide")
         	document.querySelector("#user-data strong").innerText = usuario.getGivenName()
         	document.querySelector("#user-data button").onclick = function  () {
         		auth2.signOut()
         		document.querySelector("#user-data").classList.add("hide")
         		
         	}
         })


        
        }
        
       } 

		//3) Desocultar el elemento clonado
			elemento.classList.remove("hide")

		//4) Anexar el elemento en el contenedor (padre)
		document.querySelector("#peliculas").appendChild(elemento)

		
		
	}

	static parse(data){
		console.log("Ahora deberia convertir Object en Producto")
		data = JSON.parse(data)

		if( data instanceof Array ){ //<-- Hay muchos Object
		/* Vieja forma
			let peliculas = new Array()
			data.forEach(item => {
				let pelicula = new Pelicula(
					item.idPelicula,
					item.Titulo,
					item.Estreno,
					item.Descripcion,
					item.Poster,
					item.Trailer
				)
				peliculas.push( pelicula )
			})
			return peliculas
		*/
			/* Nueva Forma */
			return data.map(item => 
				new Pelicula(
					item.idPelicula,
					item.Titulo,
					item.Estreno,
					item.Descripcion,
					item.Poster,
					item.Trailer
				)
			)

		} else if( data instanceof Object ){ //<-- Hay un solo Object
			
			return new Pelicula(
					data.idPelicula,
					data.Titulo,
					data.Estreno,
					data.Descripcion,
					data.Poster,
					data.Trailer
				)

		} else { //<-- No hay ningún Object (No sirve nada...)
			return null
		}

	}

}
   