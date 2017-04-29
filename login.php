<?php
require 'load.php';
use \LeanCloud\Client;
use \LeanCloud\User;
use \LeanCloud\CloudException;
use \LeanCloud\Storage\CookieStorage;
if($_POST['username'] != ""&&$_POST['password'] != "")
{
	try {
		User::logIn($_POST['username'],$_POST['password']);
		//$token = User::getCurrentSessionToken();
		//setcookie('token',$token,time() + 2592000);
		Client::setStorage(new CookieStorage(60 * 60 * 24 * 30, "/"));
	} catch (CloudException $ex) {
		$error=true;
	}
}else{
	$error=true;
}
if($_POST['url'] != "")
{
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
<title>登陆 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">
<h2>登陆</h2>
<form method="post" action="login.php">
<?php
    echo "<input type='hidden' name='url' value='".urlencode($url)."'>";
	if($error==true)echo "用户名或密码错误！";
?>
<table>
<tr>
     <td>用户名</td>
     <td><input type="text" name="username"></td>
</tr>
<tr>
     <td>密码</td>
     <td><input type="password" name="password"></td>
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