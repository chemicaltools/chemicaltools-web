<?php
function wmzz_static_cdn_core() {
	ob_start('wmzz_static_cdn_processor');
}
function wmzz_static_cdn_processor($str) {
	return str_replace(
		array(
			'js/jquery-3.1.1.min.js',
			//'js/','stylesheets/','ico/','img/'
		), 
		array(
			'//cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
			//'//njzjz.oicp.net/js/',
			//'//njzjz.oicp.net/stylesheets/',
			//'//njzjz.oicp.net/ico/',
			//'//njzjz.oicp.net/img/',
		), $str);
}
wmzz_static_cdn_core();