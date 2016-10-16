<?php
require 'load.php';
use \LeanCloud\User;
if ($currentUser == null) {
	$url="login.php?url=user.php";   
	header('Location: '.$url);
	exit;
} else {
	if($_POST['mode'] != ""&&$_POST['elementnumber'] != ""){
		$mode=$_POST['mode'];
		$elementnumber=$_POST['elementnumber'];
		$pKw=$_POST['pKw'];
		$currentUser->set("examMode", $mode);
		$currentUser->set("elementnumber_limit", $elementnumber);
		$currentUser->set("pKw", $pKw);
		$currentUser->save();
		$success=true;
	}
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
<?php if($success==true)echo'<p>保存成功！</p>';?>
<form method="post" action="user.php"><table>
<tr><td colspan=2><h3>个人信息</h3></td></tr>
<?php
$username=$currentUser->getUsername();
$qqname=$currentUser->get("qqname");
if($qqname==""){
		$qqname = $username;
		$qqname=substr($qqname,0,strpos($qqname,"@"));
	}
$score=$currentUser->get("examCorrectNumber");
if($score=="")$score="0";
$mode=(int)($currentUser->get("examMode"));
$elementnumber=(int)($currentUser->get("elementnumber_limit"));
$pKwstr=($currentUser->get("pKw"));
if($mode==0)$mode=2;
if($elementnumber==0)$elementnumber=118;
if($pKwstr=="")$pKw=14;else $pKw=(double)$pKwstr;
echo "<tr><td>用户名</td><td>".$username."</td></tr>";
echo "<tr><td>昵称</td><td>".$qqname."</td></tr>";
echo "<tr><td>积分</td><td>".$score."</td></tr>";
?><tr><td colspan=2><h3>元素测试</h3></td></tr>
<tr><td>测试模式</td><td><select name="mode" id="mode">
<?php
$modetext=array("根据元素名称回答元素符号","根据元素名称回答原子序数","根据元素名称回答IUPAC名","根据元素符号回答元素名称","根据元素符号回答原子序数",
"根据元素符号回答IUPAC名","根据原子序数回答元素名称","根据原子序数回答元素符号","根据原子序数回答IUPAC名","根据IUPAC名回答元素名称",
"根据IUPAC名回答元素符号","根据IUPAC名回答原子序数");
for($i=0;$i<12;$i++){
	if($mode==$i)$selecttext="selected";else $selecttext="";
	echo '<option value="'.$i.'"'.$selecttext.'>'.$modetext[$i].'</option>';
}
?>
</select></td></tr>
<tr><td>原子序数上限</td><td><select name="elementnumber" id="elementnumber">
<?php
$elementnumbertext=array("18","36","54","86","118");
for($i=0;$i<5;$i++){
	if($elementnumber==$elementnumbertext[$i])$selecttext="selected";else $selecttext="";
	echo '<option value="'.$elementnumbertext[$i].'"'.$selecttext.'>'.$elementnumbertext[$i].'</option>';
}
?>
<tr><td colspan=2><h3>酸碱计算</h3></td></tr>
<tr><td>pK<sub>w</sub></td><td><input type="text" name="pKw" id="pKw" value="<?=$pKw?>"></td></tr>
<tr><td colspan=2><input type="submit" value="保存"></td></tr>
</table>
</form>

<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
}