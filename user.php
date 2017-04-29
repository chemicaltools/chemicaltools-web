<?php
require 'load.php';
use \LeanCloud\User;
if ($currentUser == null) {
	$url="login.php?url=".urlencode($_SERVER['REQUEST_URI']);   
	header('Location: '.$url);
	exit;
} else {
	if($_POST['ajax'] =="1"||$_GET['ajax']=="1"){
		if($_POST['mode'] != ""&&$_POST['elementnumber'] != ""){
			$mode=$_POST['mode'];
			$elementnumber=$_POST['elementnumber'];
			$pKw=$_POST['pKw'];
			$currentUser->set("examMode", $mode);
			$currentUser->set("elementnumber_limit", $elementnumber);
			$currentUser->set("pKw", $pKw);
			setcookie('examMode',$examMode,time() + 259200);
			setcookie('elementnumber_limit',(string)$elementnumber_limit,time() + 259200);
			setcookie('pKw',(string)$pKw,time() + 259200);			
			$currentUser->save();
			echo "保存成功！";
		}else{
			echo "保存失败！";
		}
	}else{
		if(isset($_COOKIE['username'])){
			$username=$_COOKIE['username'];
		}else{
			$username=$currentUser->getUsername();
			setcookie('username',$username,time() + 2592000);
		}
		if(isset($_COOKIE['qqname'])){
			$qqname=$_COOKIE['qqname'];
		}else{
			$qqname=$currentUser->get("qqname");
			if($qqname==""){
				$qqname = $username;
				$qqname=substr($qqname,0,strpos($qqname,"@"));
			}
			setcookie('qqname',$qqname,time() + 2592000);
		}
		$score=$currentUser->get("examCorrectNumber");
		if($score=="")$score="0";
		$mode=(int)($currentUser->get("examMode"));
		$elementnumber=(int)($currentUser->get("elementnumber_limit"));
		$pKwstr=($currentUser->get("pKw"));
		if($mode==0)$mode=2;
		if($elementnumber==0)$elementnumber=118;
		if($pKwstr=="")$pKw=14;else $pKw=(double)$pKwstr;
		setcookie('examMode',$mode,time() + 259200);
		setcookie('elementnumber_limit',(string)$elementnumber,time() + 259200);
		setcookie('pKw',(string)$pKw,time() + 259200);
	?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>用户中心 -- 化学e+</title>
<?php include 'head.php';?>
<script type="text/javascript" src="js/user.js"></script>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">
<?php include 'title.php';?>
<h2>用户中心</h2>
<div id="success"></div>
<form method="post" action="user.php" id="form"><table>
<input type="hidden" id="elementnumberold" name="elementnumberold" value="<?=$elementnumber;?>"  />  
<input type="hidden" id="pKwold" name="pKwold" value="<?=$pKw;?>" /> 
<input type="hidden" id="modeold" name="modeold" value="<?=$mode;?>" /> 
<tr><td colspan=2><h3>个人信息</h3></td></tr>
<tr><td>用户名</td><td><?=$username;?></td></tr>
<tr><td>昵称</td><td><?=$qqname;?></td></tr>
<tr><td>积分</td><td><?=$score;?></td></tr>
<tr><td>授权登陆QQ</td><td><a href="qq.php">
 <img src="/ico/qq.png"></a></td></tr>
<tr><td colspan=2><h3>元素测试</h3></td></tr>
<tr><td>测试模式</td><td><select name="mode" id="mode">
<option value="0">根据元素名称回答元素符号</option>
<option value="1">根据元素名称回答原子序数</option>
<option value="2">根据元素名称回答IUPAC名</option>
<option value="3">根据元素符号回答元素名称</option>
<option value="4">根据元素符号回答原子序数</option>
<option value="5">根据元素符号回答IUPAC名</option>
<option value="6">根据原子序数回答元素名称</option>
<option value="7">根据原子序数回答元素符号</option>
<option value="8">根据原子序数回答IUPAC名</option>
<option value="9">根据IUPAC名回答元素名称</option>
<option value="10">根据IUPAC名回答元素符号</option>
<option value="11">根据IUPAC名回答原子序数</option>
</select></td></tr>
<tr><td>原子序数上限</td><td>
<select name="elementnumber" id="elementnumber">
<option value="18">18</option>
<option value="36">36</option>
<option value="54">54</option>
<option value="86">86</option>
<option value="118">118</option></select></td></tr>
<tr><td colspan=2><h3>酸碱计算</h3></td></tr>
<tr><td>pK<sub>w</sub></td><td><input type="text" name="pKw" id="pKw"></td></tr>
<tr><td colspan=2><input type="submit" value="保存"></td></tr>
</table>
</form>
<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
	}
}