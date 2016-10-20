<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>偏差计算 -- 化学e+</title>
<?php include 'head.php';?>
  </head>
  <body>
<?php include 'header.php';
?>
    <section class="main-content">
	<? require 'load.php';
	include 'title.php';
?>
		<h2>偏差计算</h2>
		<form method='post' action='deviation.php'>
		<table>
		<tr><td><textarea name="input" placeholder="请输入数据，每行一个" rows="5"></textarea></td></tr>
		<tr><td colspan=2><input type="submit" value="计算"></td></tr></table></form>
<?php
if($_POST['input']!=""){
	$input=$_POST['input'];
	$x=explode("\n",trim($input));
	$t=count($x);
	if($t>1){
	for($i=0;$i<$t;$i++){
		$sum=$sum+$x[$i];
		$len=strlen($x[$i]);
		if(substr($x[$i],0,1)=="-")$len=$len-1;
		if(strpos($x[$i],".")){
			$len=$len-1;
			$pointlen=$len-strpos($x[$i],".");
			if(abs($x[$i])<1){
				$zeronum=floor(log10(abs($x[$i])));
				$len=$len+$zeronum;
			}
		}
		if($i>0){
			if($len<$numnum)$numnum=$len;
			if($pointlen<$pointnum)$pointnum=$pointlen;
		}else{
			$numnum=$len;
			$pointnum=$pointlen;
		}
	}
	$average=$sum/$t;
	for($i=0;$i<$t;$i++){
		$xabs=abs($x[$i]-$average);
		$xsqure=pow($x[$i]-$average,2);
		$abssum=$abssum+$xabs;
		$squresum=$squrasum+$xsqure;
	}
	$deviation=$abssum/$t;
	$deviation_relatibe=$deviation/$average*1000;
	$s=sqrt($squresum/($t-1));
	$s_relatibe=$s/$deviation*1000;
	$output="您输入的数据：".str_replace(array("\r\n","\r","\n"),"，",trim($input))."\n平均数：".sprintf("%.".$pointnum."f",$average).
			"\n平均偏差：".sprintf("%.".$pointnum."f",$deviation)."\n相对平均偏差：".sprintf("%.".($numnum-1)."e",$deviation_relatibe).
			"‰\n标准偏差：".sprintf("%.".($numnum-1)."e",$s)."\n相对标准偏差：".sprintf("%.".($numnum-1)."e",$s_relatibe)."‰";
	echo "<p>".nl2br($output)."</p>";
	if ($currentUser != null) {
		$currentUser->set("historyDeviation", $output);
		$currentUser->save();
	}
	}else{
		echo "请输入多个数据！";
	}
}else{
	if ($currentUser != null) {
		$output=$currentUser->get("historyDeviation");
		echo "<p>".nl2br($output)."</p>";
	}
}
?>
<?php include 'foot.php';?>
    </section>
  </body>
</html>