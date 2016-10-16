<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>气体计算 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';
?>
    <section class="main-content">
	<? require 'load.php';
	include 'title.php';
if($_POST['type']!=""){
	$type=$_POST['type'];
	$R=8.314;
	$p=$_POST['p'];
	$V=$_POST['V'];
	$n=$_POST['n'];
	$T=$_POST['T'];
	switch($type){
		case "p":
			$p=sprintf("%.3f",$n*$R*$T/$V);
			break;
		case "V":
			$V=sprintf("%.3f",$n*$R*$T/$p);
			break;
		case "n":
			$n=sprintf("%.3f",$p*$V/$R/$T);
			break;
		case "T":
			$T=sprintf("%.3f",$p*$V/$n/$R);
			break;
	}
}
?>
		<h2>气体计算</h2>
		<form method='post' action='gas.php'>
		<table>
		<tr><td><input type="radio" name="type" value="p" checked>p</td><td><input type="text" name="p" value="<?=$p?>" placeholder="压强p/kPa"/></td></tr>
		<tr><td><input type="radio" name="type" value="V">V</td><td><input type="text" name="V" value="<?=$V?>" placeholder="体积V/L"/></td></tr>
		<tr><td><input type="radio" name="type" value="n">n</td><td><input type="text" name="n" value="<?=$n?>" placeholder="物质的量n/mol"/></td></tr>
		<tr><td><input type="radio" name="type" value="T">T</td><td><input type="text" name="T" value="<?=$T?>" placeholder="温度T/K"/></td></tr>
		<tr><td colspan=2><input type="submit" value="计算勾选的量"></td></tr></table></form>

<?php include 'foot.php';?>
    </section>
  </body>
</html>