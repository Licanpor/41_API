var btnAgregar = document.getElementById('btnAgregar');//Boton a;adir lista
var paLista = document.getElementById('paLista');//Div del form-grop
var divPrincipal = document.getElementById('divPrincipal');//Div que anida todo.

var añadirLista = function (){
	
	var input = document.createElement('input');//crea elemento input
		input.type = 'text';//con un atributo type="text"
		input.id = 'input'//y un id="input"
		input.className = 'form-control';// y una class="form-control"
		input.setAttribute('placeholder','Nombre de la lista');//otro que sea un plaholder="Nombre de la lista"
	
	var botonLi = document.createElement('button');//crea elemento button
		botonLi.type = 'button';//con estos atributos
		botonLi.id = 'botonLi';
		botonLi.className = 'btn btn-default mg ';
		botonLi.innerHTML = 'Listo!';// y un texto.

	paLista.appendChild(input);//incrusta el input dentro del form-group
	paLista.appendChild(botonLi);//incrusta el button dentro del form-group
	paLista.replaceChild(input, btnAgregar);//remplaza el boton A;adir Lista por el inpu dentro del form-group

	botonLi.addEventListener('click', function(){});
//cuando den click en el boton Listo! ejecutara la funcion a;adirLista declarada arriba.

	var crearTarjeta = function(){

		if(input.value==""){
			input.setAttribute('placeholder', 'Espera! Cuál es el título?');
		
			return false;
		}//condicion para validar que el campo esta lleno.

		paLista.replaceChild(btnAgregar, botonLi);//remplaza el boton Listo! por el boton A;adir Lista en el form-group.
		paLista.removeChild(input);//elimina el input.

		//VARIABLE DESTINO
		var divLista = document.createElement('div');//crea un div correspondiente a la Lista
			divLista.id = 'paTarjeta';//con un id="paTarjeta"(caja gris)
/*DRAGOVER*/divLista.ondragover = function(evt){
				evt.preventDefault();
				this.classList.add('over');
				console.log('ondragover');
			}
/*ONDROP*/	divLista.ondrop = function(e){
				e.preventDefault();
				var datos = e.dataTransfer.getData("text");
				var ta = this.getElementsByClassName("form-group")[0];
				var cajaRosa = document.getElementById(datos);
				console.log(ta);
				this.insertBefore(cajaRosa, ta);
				limpiar();
				console.log('ondrop');
				
			}
		var h4 = document.createElement('h4');//crea un h4
			h4.id = 'h4';//con este id="h4"
		var titulo = document.createTextNode(input.value);//hace del valor del input un nodo de texto

		var divForm = document.createElement('div');//crea un div correspondiente a un form-group
			divForm.className = 'form-group';//con esta clase="form-group"
		var textarea = document.createElement('textarea');//crea un textarea
			textarea.className = 'form-control';//con esta clase="fors	m-control"
		var botonTar = document.createElement('button');//crea un button
			botonTar.id = 'botonTar';//con estos atributos
			botonTar.type = 'button';
			botonTar.className = 'btn btn-info';
			botonTar.innerHTML = 'Añadir Tarjeta';// y un texto
	
		divPrincipal.insertBefore(divLista, divPrincipal.childNodes[0]);
/*El div correspondiente a la Lista insertala en el div que anida todo antes de su nodo hijo primero[0]*/
		divLista.appendChild(h4);//incrusta el h4 en el divLista
		h4.appendChild(titulo);//incrusta el valor del titulo en el h4
		divLista.appendChild(divForm);//incrusta el nuevo form-group en el divLista
		divForm.appendChild(textarea);//incrusta el textarea en el div form-group
		divForm.appendChild(botonTar);//incrusta el boton para a;adir la tarjeta en el div form-group

		var añadirTarjeta = function(){
			if(textarea.value==""){
			textarea.setAttribute('placeholder', '*o* Falta tu tarjeta aquí!');
		
			return false;
			}
			//VARIABLE FUENTE
			var divTarjeta = document.createElement('div');//crea div blanco
				divTarjeta.className = 'draggable';
				divTarjeta.id = "" + (new Date()).getTime();
				divTarjeta.setAttribute('draggable', 'true');

/*DRAGSTART*/	divTarjeta.ondragstart = function drag(ev){
					ev.dataTransfer.setData("text", divTarjeta.id);
					ev.target.style.border = "2px dashed white";
				}

/*DRAGEND*/		divTarjeta.ondragend = function dragended(e){
					e.target.style.border = "none";
					limpiar();
				}
			var tarjeta = document.createTextNode(textarea.value);//convierte el valor del textarea en un nodo de texto
			var ultimoChild = divLista.childNodes.length - 1;//Para acceder al ultimo hijo de divLista utilizamos este metodo y lu guardamos en una variable.

			textarea.value = "";//limpia el valor del textarea

			divLista.insertBefore(divTarjeta, divLista.childNodes[ultimoChild]);//inserte divTarjeta antes de el ultimo hijo de divLista en divLista.
			divTarjeta.appendChild(tarjeta);//inserta la el textpo del textarea en el div.
		}
		botonTar.addEventListener('click', añadirTarjeta);//cuando den click en el botonTar ejecutara la funcion a;adir Tarjeta
	}
	botonLi.addEventListener('click', crearTarjeta);//cuando den click en el botonLi ejecutara la funcion crear tarjeta
}
btnAgregar.addEventListener('click', añadirLista);//cuando den click en el botonAgregar ejecutara la funcion a;adir Lista.


function limpiar() {
	var divs = document.getElementsByClassName('over');
	console.log("Quitando la clase a " + divs.length + " elementos");
	for (var i = 0; i < divs.length; i++){
		divs[i].classList.remove('over');
	}
}