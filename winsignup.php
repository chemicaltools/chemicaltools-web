<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if($_GET['username'] != ""&&$_GET['password'] != "")
{
	$username=$_GET['username'];
	$password=$_GET['password'];
	if(filter_var($username, FILTER_VALIDATE_EMAIL)){
		try {
			$user = new User();              // 新建 User 对象实例
			$user->setUsername($username);           // 设置用户名
			$user->setPassword($password);     // 设置密码
			$user->setEmail($username); // 设置邮箱
			$user->signUp();
			$currentUser->set("examMode", "2");
			$currentUser->save();
		} catch (CloudException $ex) {
			$error=true;
		}
	}else{
	$error=true;
}
if ($error) {
	$arr = ['errorcode' => '-1'];
} else {
	$arr = ['errorcode' => '0'];
}
$json= json_encode($arr);
echo $json;