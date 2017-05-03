<?php
require 'load.php';
use \LeanCloud\Client;
use \LeanCloud\User;
use \LeanCloud\CloudException;
use \LeanCloud\Storage\CookieStorage;
if($_POST['ajax']==1||$_GET['ajax']==1){
	if(($_POST['username'] != ""||$_GET['username']!="")&&($_POST['password'] != ""||$_GET['password']!="")){
		if($_POST['username'] != "")$username=$_POST['username'];else $password=$_GET['username'];
		if($_POST['password'] != "")$password=$_POST['password'];else $password=$_GET['password'];
		try {
			User::logIn($username,$password);
			Client::setStorage(new CookieStorage(60 * 60 * 24 * 30, "/"));
			echo "<script type='text/javascript'>redirect();</script>";
		} catch (CloudException $ex) {
			echo "用户名或密码错误！";
		}
	}else{
		echo "请输入用户名和密码！";
	}
}else{
	if($_POST['url'] != ""){
		$url=$_POST['url'];
	}elseif($_GET['url'] != ""){
		$url=$_GET['url'];
	}else{
		$url='user.php';
	}
	$url=urldecode($url);
	$currentUser = User::getCurrentUser();
	if ($currentUser != null) {
		$username=$_POST['username'];
		$qqname=$currentUser->get("qqname");
		if($qqname==""){
			$qqname = $username;
			$qqname=substr($qqname,0,strpos($qqname,"@"));
		}
		setcookie('username',$username,time() + 259200);
		setcookie('qqname',$qqname,time() + 2592000);
		header('Location: '.$url);
		exit;
	} else {
	?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<?php include 'head.php';?>
	<script type="text/javascript" src="js/login.js"></script>
	<title>登陆 -- 化学e+</title>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">
<h2>登陆</h2>
<form method="post" action="login.php" id="form">
<input type='hidden' name='url' id="url" value="<?=urlencode($url);?>">
<table>
<tr><td><div class="output" id="output"></div></td></tr>
<tr>
     <td>用户名</td>
     <td><input type="text" name="username" id="username"></td>
</tr>
<tr>
     <td>密码</td>
     <td><input type="password" name="password" id="password"></td>
</tr>
<tr>
    <td colspan=2 style="text-align:center"><input type="submit" value="登陆" style="width:100%" style="border:1px #FFFFFF solid" ></td>
</tr>
<tr>
	<td colspan=2><a href="signup.php?url=<?=urlencode($url)?>">注册新账号</a></td>
</tr>
</table>
</form>		
<?php include 'foot.php';?>
    </section>
  </body>
</html>
	<?php
	}
}