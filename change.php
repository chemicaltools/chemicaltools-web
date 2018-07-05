<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if ($currentUser != null) {
	if($_POST['name'] != ""&&$_POST['value'] != ""){
		try{
			$currentUser->set($_POST['name'], $_POST['value']);
			$currentUser->save();
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