<?php
require 'load.php';
use \LeanCloud\User;
if ($currentUser != null) {
	//User->logOut();
	setcookie('token','');
} 
header('Location: index.php');
exit;
