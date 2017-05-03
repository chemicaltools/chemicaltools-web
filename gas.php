<?php
require 'load.php';
if($_POST['ajax'] =="1"||$_GET['ajax']=="1"){
	if($_POST['type']!=""||$_GET['type']!=""){
		if($_POST['type']!="")$type=$_POST['type'];else $type=$_GET['type'];
		$R=8.314;
		if($_POST['p']!="")$p=$_POST['p'];else $p=$_GET['p'];
		if($_POST['V']!="")$V=$_POST['V'];else $V=$_GET['V'];
		if($_POST['n']!="")$n=$_POST['n'];else $n=$_GET['n'];
		if($_POST['T']!="")$T=$_POST['T'];else $T=$_GET['T'];
		switch($type){
			case "p":
				$p=sprintf("%.3f",$n*$R*$T/$V);
				echo $p;
				break;
			case "V":
				$V=sprintf("%.3f",$n*$R*$T/$p);
				echo $V;
				break;
			case "n":
				$n=sprintf("%.3f",$p*$V/$R/$T);
				echo $n;
				break;
			case "T":
				$T=sprintf("%.3f",$p*$V/$n/$R);
				echo $T;
				break;
		}
	}
}else{
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>气体计算 -- 化学e+</title>
<?php include 'head.php';?>
<script type="text/javascript" src="js/gas.js"></script>
  </head>
  <body>
<?php include 'header.php';
?>
    <section class="main-content">
	<?	include 'title.php';?>
		<h2>气体计算</h2>
		<form method='post' action='gas.php' id="form">
		<table>
		<tr><td><input type="radio" name="type" value="p" checked>p</td><td><input type="text" name="p" id="p" placeholder="压强p/kPa"/></td></tr>
		<tr><td><input type="radio" name="type" value="V">V</td><td><input type="text" name="V" id="V" placeholder="体积V/L"/></td></tr>
		<tr><td><input type="radio" name="type" value="n">n</td><td><input type="text" name="n" id="n" placeholder="物质的量n/mol"/></td></tr>
		<tr><td><input type="radio" name="type" value="T">T</td><td><input type="text" name="T" id="T" placeholder="温度T/K"/></td></tr>
		<tr><td colspan=2><input type="submit" value="计算勾选的量"></td></tr>
		<tr><td colspan=2><div id="loading"></div></td></tr>
		</table></form>
	<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
}