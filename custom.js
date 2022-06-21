// CUSTOM SCRIPT

(function($) {
	$(document).ready(function() {
		

		
		// ****************************
		// QUITAR DRAG A LAS IMAGENES (+ CSS)
		// ****************************
		
		$('img').attr('draggable','false');
		$('img').attr('onmousedown','return false');
		

		// ********************
		// FOOTER MOBILE /
		// ********************

		$( document ).on('click', '.clickToggle', function(){
			if($(this).hasClass('active')){
				var a = true;
			}
			$('.clickToggle').removeClass('active');
			if(!a){
				$(this).addClass('active');
			}
			$('.bodyToggle').stop(false).slideUp().css('height', 'auto');
			$(this).siblings('.bodyToggle').stop(false).slideToggle();
		});

		// QUITAR SIMBOLO
		$('.p .woocommerce-Price-currencySymbol').remove();

		
		
		// ****************************
		// AÑADIR PRODUCTOS A FORM
		// ****************************

		var arProductos = [];

		// AGREGAR
		$('.p-agregar').click(function(){
			//Producto + cantidad + cantidad sumada
			var p   = $(this).parent().find('.p-titulo').text(),
				c   = $(this).parent().find('.p-count').text(),
				cM  = parseFloat(c) + 1;
			//Precio + precio sumado + precio venta
			var pr  = $(this).parent().find('.p-precio').text(),
				pM  = parseFloat(pr) * parseFloat(cM),
				pV  = pM.toFixed(2),
				iD  = $(this).closest('section').attr('id');

			$(this).parent().find(".p-quitar").addClass('active');
			$(this).parent().find(".p-count p").html(cM);
			$(this).parent().find(".p-status span").html(cM+' <i>x</i> S/'+pV);

			filtrarDevolver(iD);
			arProductos.push({ cantidad: cM, total: pV, titulo: p, id: iD });
			actualizar_pedido();
		});

		$('.p-quitar').click(function(){
			//Producto + cantidad + cantidad sumada
			var p   = $(this).parent().find('.p-titulo').text(),
				c   = $(this).parent().find('.p-count').text(),
				cR  = parseFloat(c) - 1;
			//Precio unidad + precio restado + precio de venta
			var pU  = $(this).parent().find('.p-precio').text(),
				pR  = parseFloat(pU) * parseFloat(cR),
				pV  = pR.toFixed(2),
				iD  = $(this).closest('section').attr('id');

			$(this).parent().find(".p-count p").html(cR);
			$(this).parent().find(".p-status span").html(cR+' <i>x</i> S/'+pV);

			if( c == 1){
				$(this).removeClass('active');
				$(this).parent().find('.p-status span').text('Agrega productos');
			}

			//Formulario
			filtrarDevolver(iD);
			arProductos.push({ cantidad: cR, total: pV, titulo: p, id: iD });
			actualizar_pedido();
		});

		// ********************
		// FUNCIONES
		// ********************
		
		function ctnFormVacio(){
			if ($('.pedido_ctn').html() == '') {
					$(".pedido_ctn").html('<a href="#paso2" class="cart_empty"><b>No has seleccionado ningún producto</b> Selecciona en el icono <i>+</i> para añadir productos</a>');
				}
		}
		ctnFormVacio();

		function filtrarDevolver(idToDelete){
			arProductos = arProductos.filter(function( obj ) {
				return obj.id !== idToDelete.toString();
			});
		}
		function borrarF(){
			$('.borrarF').on('click',function(e){
				var idToDelete = $(this).parent().attr("data-id");

				//Ubicar Array y eliminar   
				filtrarDevolver(idToDelete);

				$('section[id="'+idToDelete+'"]').find('.p-count p').text('0');
				$('section[id="'+idToDelete+'"]').find('.p-status span').text('Agrega productos');
				$('section[id="'+idToDelete+'"]').find('.p-quitar').removeClass('active');
				
				actualizar_pedido();
				ctnFormVacio();
			});
		}
		function actualizar_pedido(){
			$('.pedido_ctn').empty();

			var html
			var arHtml = "";

			arProductos.forEach( function(element, index){
				arHtml += ' '+element['titulo'].trim()+' '+element['cantidad']+' x S/ '+element['total']+','
				$('.pedido_ctn').append( '<span class="itemF" data-id="'+element['id']+'"><span class="producF">'+element['titulo']+'</span>&nbsp;'+element['cantidad']+'&nbsp;x&nbsp;<span class="precioF">'+element['total']+'</span><a class="borrarF">,</a></span>' );
			});
			$( "#form-field-pedidoArr" ).val(arHtml);

			calcTotal();
			borrarF();
		}

		function calcTotal(){
			var total = 0;

			$('.precioF').each(function (index, element) {
				total = total + parseFloat($(element).text());
			});
			var motoDelivery = $('.delivery').text();
			var decimales = parseFloat(total).toFixed(2);
			var delivery = parseFloat(decimales)+ parseFloat(motoDelivery);
			var totalConDelivery = parseFloat(delivery).toFixed(2);

			$('.subtotal').text(decimales);
			$('.total').text(totalConDelivery);
			$('#form-field-pedido_total_pago').val(totalConDelivery);
		};

	
		
		
		// function onkeyup() {	
		//  $('#fiel-name-p3').val($('#fiel-name').val());
		// $(this).parent().addClass('active');
		//}

		

		$('.nombre').on('keyup', function(){
			$('.nombre').val($(this).val());
			$('.nombre').parent().addClass('active');
		});
		$('.wsp').on('keyup', function(){
			$('.wsp').val($(this).val());
			$('.wsp').parent().addClass('active');
		});
		$('.correo').on('keyup', function(){
			$('.correo').val($(this).val());
			$('.correo').parent().addClass('active');
		});

		// ********************
		// FUNCION DE DRAG
		// ********************

		const slider = document.querySelector('.jet-listing-grid__items');
		let isDown = false;
		let startX;
		let scrollLeft;

		slider.addEventListener('mousedown', (e) => {
			isDown = true;
			slider.classList.add('active');
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});
		slider.addEventListener('mouseleave', () => {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mouseup', () => {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mousemove', (e) => {
			if(!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 1; //scroll-velocidad
			slider.scrollLeft = scrollLeft - walk;
		});


	}); //Cerrar function
})(jQuery); //Cerrar jquery