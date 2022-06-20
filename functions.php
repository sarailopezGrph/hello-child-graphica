<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN HELLO ELEMENTOR
// AUTOGENERADO - NO MODIFICAR:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );
         
if ( !function_exists( 'child_theme_configurator_css' ) ):
    function child_theme_configurator_css() {
        wp_enqueue_style( 'chld_thm_cfg_child', trailingslashit( get_stylesheet_directory_uri() ) . 'style.css', array( 'hello-elementor','hello-elementor','hello-elementor-theme-style' ) );
    }
endif;
add_action( 'wp_enqueue_scripts', 'child_theme_configurator_css', 10 );

// END HELLO ELEMENTOR


// AGREGAR CUTOM JS/CSS
function add_scripts_proyecto() {
	wp_enqueue_script( 'script_select', get_stylesheet_directory_uri() . '/lib/form/select.js', array ( 'jquery' ));
	wp_enqueue_script( 'script_form', get_stylesheet_directory_uri() . '/lib/form/form.js', array ( 'jquery' ));
	wp_enqueue_script( 'script_custom', get_stylesheet_directory_uri() . '/custom.js', array ( 'jquery' ));
	
	// CSS
    wp_enqueue_style( 'style_select',  get_stylesheet_directory_uri() . '/lib/form/select.css' );
    wp_enqueue_style( 'style_form',  get_stylesheet_directory_uri() . '/lib/form/form.css' );
   	wp_enqueue_style( 'style_slick',  get_stylesheet_directory_uri() . '/lib/user.css' );
	
    wp_localize_script( 'script_custom', 'proyecto', [
        'is_mobile' => intval( wp_is_mobile() ),
    ]);
}
add_action( 'wp_enqueue_scripts', 'add_scripts_proyecto' );
// AGREGAR CUTOM JS/CSS


// QUITAR GUTENBERG

add_filter( 'gutenberg_can_edit_post_type', '__return_false' );
add_filter('use_block_editor_for_post_type', '__return_false', 100);

//-/QUITAR GUTENBERG


// Elementor Forms Widget Activar Clases en input
require_once('lib/form/class-input.php');

//Funcion Extra editor custom para Elementor Forms
add_action( 'elementor_pro/init', function() {
    require_once( get_stylesheet_directory() . '/lib/form/html-form.php' );
    new html_v2();
} );


// Obtener número de likes plugin Ulike por post

add_shortcode('ulike_counter', 'ulike_counter');

function ulike_counter(){
	global $wpdb;
	
	$table = $wpdb->prefix . "ulike";
	
	$post = get_post();
	$post_id = $post->ID;
	$result = $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE post_id = $post_id");
	
	return $result;
}
