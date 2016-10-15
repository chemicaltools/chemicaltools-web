<?php
if ($currentUser != null) {
	$username=$currentUser->getUsername();
	$qqname=$currentUser->get("qqname");
	if($qqname==""){
		$qqname = $username;
		$qqname=substr($qqname,0,strpos($qqname,"@"));
	}
	echo "欢迎您，".$qqname."|<a href='signout.php'>注销</a>|<a href='user.php'>用户中心</a>";
}else{
	echo "<a href='login.php'>登陆</a>|<a href='signup.php'>注册</a>";
}
	?>|<a href="/">首页</a>|<a href="element.php">元素查询</a>|<a href="mass.php">质量计算</a>|<a href="acid.php">酸碱计算</a>|<a href="exam.php">元素记忆</a>|<a href="rank.php">排行榜</a>