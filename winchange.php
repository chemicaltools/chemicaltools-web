<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if($_GET['token'] != "")
{
	$token=$_GET['token'];
	User::become($token);
}
$currentUser = User::getCurrentUser();
if ($currentUser != null) {
	if($_GET['name'] != ""&&$_GET['value'] != ""){
		try{
			$currentUser->set($_GET['name'], $_GET['value']);
			$currentUser->save();
			$arr = ['errorcode' => '0'];
		} catch (CloudException $ex) {
			$arr = ['errorcode' => '-1'];
		}
	}else{
		$arr = ['errorcode' => '-1'];
	}
} else {
	$arr = ['errorcode' => '-1'];
}
$json= json_encode($arr);
echo $json;