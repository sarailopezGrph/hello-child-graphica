// CUSTOM SCRIPT

(function($) {
	$(document).ready(function() {

		// ********************
		// Estilizar selectores 
		// ********************


		var $yo =  $('.form_style').find('.elementor-field-type-select,.elementor-field-type-tel,.elementor-field-type-email,.elementor-field-type-text,.elementor-field-type-textarea, .elementor-field-type-number, .elementor-field-type-date, .elementor-field-type-time,.elementor-field-type-number');
		for (var i=0; i<$yo.length; i++){
			var red = $yo.eq(i).find('label');
			$yo.eq(i).append(red);
		}

		$('form').attr("autocomplete","off");

		$( document ).on( 'change', '.form_style input, .form_style textarea,.form_style select', function(){
			let input_valor = $(this).val();

			if( !input_valor ){
				$(this).closest('.elementor-field-group').removeClass('active');
				return true;
			}	

			$(this).closest('.elementor-field-group').addClass('active');
		});
		
		$('option[value=""]').attr('disabled','true');




		// ********************
		// INPUT FILE /
		// ********************

		$('.elementor-field-type-upload .elementor-field-label').html('<div class="input"><strong>Sube un archivo</strong></div> <span></span>');

		$( document ).on('change', '.elementor-field-type-upload input', function(){
			var get_input_val = $(this).val();
			$(this).closest('.elementor-field-type-upload').find('.elementor-field-label').find('strong').html(get_input_val)
		});


		// **************************************
		// CODIGO SOLO PARA DESKTOP
		// **************************************

		if( proyecto.is_mobile == 0 ){

			//Arma los select personalizados
			setTimeout(function(){ 
				$('select').customA11ySelect();
			}, 2500);		
		}

		//************************
		// Validaciones
		//************************

		// Validación solo Alfabética
		$('.elementor-field-type-text input').bind('keyup blur',function(){
				let node = $(this);
				node.val( cleanInput(node.val())  );
			}
		);
		function cleanInput(value){return value.replace(/[^a-zA-Z-wÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ]+/,'')}

		// Validación solo Numerico
		$('.elementor-field-type-tel input').bind('keyup blur',function(){
				let node = $(this);
				node.val( cleanInputNum(node.val())  );
			}
		);

		function cleanInputNum(value){
			return value.replace(/[^0-9]+/,'')
		}
		
		// Validación correo electrónico
		$('.elementor-field-type-email input').on('blur', function(){
			let result = $(this).val();

			let el = document.getElementById($(this).attr('id'))

			if (!validateEmail(result)) {
				el.setCustomValidity("Ingrese un correo electrónico válido");
				$(el).attr('onclick', 'setCustomValidity("")')
			}
		})

		function validateEmail(email) {
			const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
		
		// Validación numero y letras con maximo de 500 textarea
		$('.elementor-field-type-textarea textarea').attr('maxlength','500');
		
		// Validación numero y letras con maximo de 50 textarea
		$('.elementor-field-type-text input').attr('maxlength','50');

		


	}); //Cerrar function
})(jQuery); //Cerrar jquery