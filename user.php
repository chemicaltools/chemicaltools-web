<?php
require 'load.php';
if ($currentUser == null) {
	$url="login.php?url=user.php";   
	header('Location: '.$url);
	exit;
} else {
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>用户中心 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">
<?php include 'title.php';?>
<h2>用户中心</h2>
<table>
<?php
$username=$currentUser->getUsername();
$qqname=$currentUser->get("qqname");
if($qqname==""){
		$qqname = $username;
		$qqname=substr($qqname,0,strpos($qqname,"@"));
	}
$score=$currentUser->get("examCorrectNumber");
if($score=="")$score="0";
echo "<tr><td>用户名</td><td>".$username."</td></tr>";
echo "<tr><td>昵称</td><td>".$qqname."</td></tr>";
echo "<tr><td>积分</td><td>".$score."</td></tr>";
?>
</table>
<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
}