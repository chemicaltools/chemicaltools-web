<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if($_POST['username'] != ""&&$_POST['password'] != "")
{
	try {
		User::logIn($_POST['username'],$_POST['password']);
		$token = User::getCurrentSessionToken();
		setcookie('token',$token,time() + 259200);
	} catch (CloudException $ex) {
		$error=true;
	}
}
if($_POST['url'] != "")
{
	$url=$_POST['url'];
}elseif($_GET['url'] != ""){
	$url=$_GET['url'];
}else{
	$url='user.php';
}
$currentUser = User::getCurrentUser();
if ($currentUser != null) {
	$qqname=$currentUser->get("qqname");
	if($qqname==""){
		$username=$currentUser->getUsername();
		$qqname = $username;
		$qqname=substr($qqname,0,strpos($qqname,"@"));
	}
	setcookie('qqname',$qqname,time() + 259200);
	header('Location: '.urldecode($url));
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
    echo "<input type='hidden' name='url' value='".$url."'>";
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
	 <td/>
     <td><input type="submit" value="登陆"></td>
</tr>
</table>
</form>		
<?php include 'foot.php';?>
    </section>
  </body>
</html>
	<?php
}