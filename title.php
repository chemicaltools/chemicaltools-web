<?php
if ($currentUser != null) {
	if(isset($_COOKIE['qqname'])){
		$qqname=$_COOKIE['qqname'];
	}else{
		$qqname=$currentUser->get("qqname");
		if($qqname==""){
			$username=$currentUser->getUsername();
			$qqname = $username;
			$qqname=substr($qqname,0,strpos($qqname,"@"));
		}
		setcookie('qqname',$qqname,time() + 259200);
	}
	echo "欢迎您，".$qqname."|<a href='signout.php?url=".urlencode($_SERVER['REQUEST_URI'])."'>注销</a>|<a href='user.php'>用户中心</a>";
}else{
	echo "<a href='login.php?url=".urlencode($_SERVER['REQUEST_URI'])."'>登陆</a>|<a href='signup.php?url=".urlencode($_SERVER['PHP_SELF'])."'>注册</a>";
}
	?>|<a href="/">首页</a>|<a href="element.php">元素查询</a>|<a href="mass.php">质量计算</a>|<a href="acid.php">酸碱计算</a>|<a href="gas.php">气体计算</a>|<a href="exam.php">元素记忆</a>|<a href="deviation.php">偏差计算</a>|<a href="rank.php">排行榜</a>