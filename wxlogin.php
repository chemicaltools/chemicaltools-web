<?php
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if ($currentUser == null) {
	$url="login.php?url=".urlencode($_SERVER['REQUEST_URI']);   
	header('Location: '.$url);
	exit;
} else {
	if($_GET['openid'] != ""&&$_GET['time'] != ""){
		$con=mysql_connect("localhost","root","root");
		mysql_select_db("chemapp", $con);
		$result = mysql_query("SELECT * FROM wx_id
		WHERE openid='".$_GET['openid']."' limit 1");
		$row = mysql_fetch_array($result);
		if(mysql_num_rows($result)){				
			if($row['time']==$_GET['time']){
				try{
					$currentUser->set("wxid", $_GET['openid']);
					$currentUser->save();
					mysql_query("DELETE FROM wx_id  
								WHERE openid = '".$_GET['openid']."'");
					//$arr = ['errorcode' => '0'];
				} catch (CloudException $ex) {
					//$arr = ['errorcode' => '-1'];
				}
			}else{
				$error=true;
			}
		}else{
			$error=true;
		}
		mysql_close($con);
		if($error){
			$url="wxlogin.php?code=-1";   
		}else{
			$url="wxlogin.php?code=0";   
		}
		header('Location: '.$url);
		exit;
	}else if($_GET['code']==0||$_GET['code']==-1){				
	?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>微信账号绑定</title>
<?php include 'head.php';?>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  </head>
  <body>
  <?php include 'header.php';?>
      <section class="main-content">		
<?php
include 'title.php';
?>
<h2>微信账号绑定</h2>
<?php
		if($_GET['code']==0) echo"<p>绑定成功！</p>";else echo"<p>链接已失效，请重试。</p>";
		include 'foot.php';?>
    </section>
    </body>
</html>
<?php
	}else{
		$url="wxlogin.php?code=-1";   
		header('Location: '.$url);
		exit;
	}
}
