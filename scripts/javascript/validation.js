function addEventToSubmit() {
	var button = document.getElementById("send")
	button.addEventListener('click', function(event) {
		validateSubmit(event);
	});
}

function validateSubmit(event) {
	var valid = true;

	valid &= validateNombreApellidos(this.document.getElementsByName("nombre")[0]);
	valid &= validateNombreApellidos(this.document.getElementsByName("apellidos")[0]);
	valid &= validateDireccion(this.document.getElementsByName("direccion")[0]);
	valid &= validateNif(this.document.getElementsByName("nif")[0]);
	valid &= validateCodigoPostal(this.document.getElementsByName("codigopostal")[0]);
	valid &= validateEmailTelefono();

	cuponDescuento(this.document.getElementsByName("descuento")[0])

	if ( !valid ) {
		event.preventDefault();
	}
	else {
		event.preventDefault();
	}
}

var countIngredientes=0

function validateIngredientes(checkbox) {
	if (countIngredientes >= 3) {
		checkbox.checked = false;
		this.document.getElementById("alertaingredientes").style.display = "block";
		var self = this;
		setInterval(function() {
				self.document.getElementById('alertaingredientes').style.display = 'none';
			}, 2000);
	}
	else {
		countIngredientes++;
	}
}

function validateNombreApellidos(textfield) {
	var res = true;
	if (textfield.value.match(/[0-9]/) && textfield.value != "") {
		res = false;
		if (textfield.name == "nombre")
			this.document.getElementById("alertanombre").style.display = "none";
		else if(textfield.name == "apellidos")
			this.document.getElementById("alertaapellidos").style.display = "none";
	}
	else {
		if (textfield.name == "nombre")
			this.document.getElementById("alertanombre").style.display = "block";
		else if(textfield.name == "apellidos")
			this.document.getElementById("alertaapellidos").style.display = "block";
	}

	return res
}

function validateNif(textfield) {
	var res = false;
	var regx = /^(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))/i;
	if (regx.test(textfield.value)) {
		res = true;
		this.document.getElementById("alertanif").style.display = "none";
	}
	else {
		this.document.getElementById("alertanif").style.display = "block";
	}

}

function validateCodigoPostal(textfield) {
	var res = false;

	if (textfield.value.match(/[0-9]/g) && textfield.value.length == 5) {
		res = true;
		this.document.getElementById("alertacodigopostal").style.display = "none";
	}
	else {
		this.document.getElementById("alertacodigopostal").style.display = "block";
	}

	return res;
}

function validateTelefono(textfield) {
	var res = false;

	if (textfield.value.match(/[0-9]/g) && textfield.value.length == 5) {
		res = true;
		this.document.getElementById("alertatelefono").style.display = "none";
	}
	else {
		this.document.getElementById("alertatelefono").style.display = "block";
	}

	return res;
}

function validateEmail(emailfield) {
	var res = false;
	var regxemail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if (regxemail.test(emailfield.value)) {
		res = true;
		this.document.getElementById("alertaemail").style.display = "none";
	}
	else {
		this.document.getElementById("alertaemail").style.display = "block";
	}

	return res;
}

function validateDireccion(textfield) {
	var res = false;

	if ( textfield.value != "" ) {
		res = true;
		this.document.getElementById("alertadireccion").style.display = "none";
	}
	else {
		this.document.getElementById("alertadireccion").style.display = "block";
	}

	return res;
}

function validateEmailTelefono() {
	var res = true;

	res &= (validateTelefono(this.document.getElementsByName("telefono")[0]) || validateEmail(this.document.getElementsByName("email")[0]));

	if (!res) {
		this.document.getElementById("alertadatos").style.display = "block";
	}
	else {
		this.document.getElementById("alertadatos").style.display = "none";
	}

	return res
}

function cuponDescuento(textfield) {
	var regx = /[A-Z]{2}[0-9]{3}/;
	if(textfield.value != "" && regx.test(textfield.value)) {

		var alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		var letras = textfield.value.split('');
		var sum = 0;
		sum += (alfabeto.indexOf(letras[0])+1)*10;
		sum += (alfabeto.indexOf(letras[1])+1)*10;
		for(var i = 2; i<5;i++) {
			sum+= parseInt(letras[i]);
		}
		if(sum==101) {
			validado = true;
			this.document.getElementById("preciototal").value = 100*0.75;
			this.document.getElementById("alertadescuento").style.display = "none"
		}
		else{
			validado = false;
			this.document.getElementById("preciototal").value = 100;
			this.document.getElementById("alertadescuento").style.display = "block"
		}
	}
}