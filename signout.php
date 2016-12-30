<?php
require 'load.php';
use \LeanCloud\User;
if ($currentUser != null) {
	//User->logOut();
	setcookie('token','');
} 
if($_POST['url'] != "")
{
	$url=$_POST['url'];
}elseif($_GET['url'] != ""){
	$url=$_GET['url'];
}else{
	$url='index.php';
}
header('Location:'.urldecode($url));
exit;
