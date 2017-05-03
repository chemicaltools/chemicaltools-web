<?php
require 'load.php';
use \LeanCloud\User;
User::logOut();
if ($currentUser != null) {
	foreach($_COOKIE as $k => $v){
		setcookie($k, null);
	}
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
