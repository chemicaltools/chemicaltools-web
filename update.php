<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if ($currentUser != null) {
	if($_POST['name'] != ""){
		try{
			$value=$currentUser->get($_POST['name']);
			setcookie($_POST['name'],$value,time() + 259200);
			//$arr = ['errorcode' => '0'];
		} catch (CloudException $ex) {
			//$arr = ['errorcode' => '-1'];
		}
	}else{
		//$arr = ['errorcode' => '-1'];
	}
} else {
	//$arr = ['errorcode' => '-1'];
}
//$json= json_encode($arr);
//echo $json;