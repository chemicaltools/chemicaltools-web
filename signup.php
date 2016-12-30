<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if($_POST['username'] != ""&&$_POST['password'] != "")
{
	$username=$_POST['username'];
	$password=$_POST['password'];
	if(filter_var($username, FILTER_VALIDATE_EMAIL)){
		try {
			$user = new User();              // 新建 User 对象实例
			$user->setUsername($username);           // 设置用户名
			$user->setPassword($password);     // 设置密码
			$user->setEmail($username); // 设置邮箱
			$user->signUp();
			$token = User::getCurrentSessionToken();
			setcookie('token',$token);
			$currentUser->set("examMode", "2");
			$currentUser->save();
		} catch (CloudException $ex) {
			$error=true;
		}
	}else{
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
	header('Location: '.urldecode($url));
	exit;
} else {
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>注册 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">
<h2>注册</h2>
<form method="post" action="signup.php">
<?php
    echo "<input type='hidden' name='url' value='".$url."'>";
	if($error==true)echo "用户名非法！";
?>
<table>
<tr>
     <td>Email</td>
     <td><input type="text" name="username"></td>
</tr>
<tr>
     <td>密码</td>
     <td><input type="password" name="password"></td>
</tr>
<tr>
	 <td/>
     <td><input type="submit" value="注册"></td>
</tr>
</table>
</form>		
<?php include 'foot.php';?>
    </section>
  </body>
</html>
	<?php
}