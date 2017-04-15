<?php
require 'load.php';
use \LeanCloud\Query;
use \LeanCloud\Client;
use \LeanCloud\User;
use \LeanCloud\CloudException;
use \LeanCloud\Storage\CookieStorage;
if ($currentUser == null) {
	$url="login.php?url=".urlencode($_SERVER['REQUEST_URI']);   
	header('Location: '.$url);
	exit;
} else {
	if($_POST['ajax'] =="1"||$_GET['ajax']=="1"){
		$admin=$currentUser->get("Admin");
		if(!$admin){
			echo "<p>权限不足，请返回<a href='/'>首页</a>！</p>";
		}else{
			$userQuery = new Query("_User");
			if($_POST['id'] ==""&&$_GET['id']==""){
				$userQuery->select("username","qqname","examCorrectNumber");
				$todos = $userQuery->find();
				echo "<table><tr><th></th><th>用户名</th><th>昵称</th><th>分数</th></tr>";
				$i=0;
				forEach($todos as $todo) {
					$qqname = $todo->get("qqname");
					$username = $todo->get("username");
					$score=$todo->get("examCorrectNumber");
					$i=$i+1;
					echo "<tr><td>".$i."</td><td><a href='?id=".$todo->get("objectId")."'>".$username."</a></td><td>".$qqname."</td><td>".$score."</td></tr>";
				}
				echo "</table>";
			}else{
				if($_POST['id'] !="")$id=$_POST['id'];else $id=$_GET['id'];
				$userQuery->select("username","qqname","examCorrectNumber");
				$todo  = $userQuery->get($id);
				$qqname = $todo->get("qqname");
				$username = $todo->get("username");
				$score=$todo->get("examCorrectNumber");
				echo "<table><tr><td>用户名</td><td>".$username."</td></tr><tr><td>昵称</td><td>".$qqname."</td></tr><tr><td>分数</td><td>".$score."</td></tr><tr><td colspan=2><a href='?'>返回</a></td></tr></table>";
			}
		}
	}else{
		if($_POST['id']!=""||$_GET['id']!=""){
			if($_POST['id']!="")$id=$_POST['id'];else $id=$_GET['id'];
		}
?>
<!DOCTYPE html>
<html lang="zh-cn">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<?php include 'head.php';?>
		<script type="text/javascript" src="/js/admin.js"></script>
		<title>用户管理 -- 化学e+</title>
	</head>
	<body>
		<?php include 'header.php';?>
		<section class="main-content">
		<?include 'title.php';?>
		<h2>用户管理</h2>
		<table>	<input type="hidden" id="id" name="id" value="<?=$id;?>"  />  
		<tr><td><div class="output" id="output"><img src="\ico\loading.gif">加载中，请稍后……</div><td></tr>
		</table>
<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
	}
}