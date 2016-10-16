<?php 
require 'load.php';
use \LeanCloud\User;
use \LeanCloud\CloudException;
if ($currentUser == null) {
	$url="login.php?url=qq.php";   
	header('Location: '.$url);
	exit;
}
  $app_id = "1105651247";
  $app_secret = "P4CtQZJ1Sb5wRKus";
  $my_url = "http://chemapp.njzjz.win/qq.php";
  //Step1：获取Authorization Code
  
  session_start();
  $code = $_REQUEST["code"];
  if(empty($code)) 
  {
     //state参数用于防止CSRF攻击，成功授权后回调时会原样带回
     $_SESSION['state'] = md5(uniqid(rand(), TRUE)); 
     //拼接URL     
     $dialog_url = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=" 
        . $app_id . "&redirect_uri=" . urlencode($my_url) . "&state="
        . $_SESSION['state'];
     echo("<script> top.location.href='" . $dialog_url . "'</script>");
  }
 
  //Step2：通过Authorization Code获取Access Token
  if($_REQUEST['state'] == $_SESSION['state']) 
  {
     //拼接URL   
     $token_url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&"
     . "client_id=" . $app_id . "&redirect_uri=" . urlencode($my_url)
     . "&client_secret=" . $app_secret . "&code=" . $code;
     $response = file_get_contents($token_url);
	 
     if (strpos($response, "callback") !== false)
     {
        $lpos = strpos($response, "(");
        $rpos = strrpos($response, ")");
        $response  = substr($response, $lpos + 1, $rpos - $lpos -1);
        $msg = json_decode($response);
        if (isset($msg->error))
        {
           echo "<h3>error:</h3>" . $msg->error;
           echo "<h3>msg  :</h3>" . $msg->error_description;
           exit;
        }
     }

     //Step3：使用Access Token来获取用户的OpenID
     $params = array();
     parse_str($response, $params);
     $graph_url = "https://graph.qq.com/oauth2.0/me?access_token=".$params['access_token'];
     $str  = file_get_contents($graph_url);
	  
     if (strpos($str, "callback") !== false)
     {
        $lpos = strpos($str, "(");
        $rpos = strrpos($str, ")");
        $str  = substr($str, $lpos + 1, $rpos - $lpos -1);
     }
     $user = json_decode($str);
     if (isset($user->error))
     {
        echo "<h3>error:</h3>" . $user->error;
        echo "<h3>msg  :</h3>" . $user->error_description;
        exit;
     }
	 //4
     $graph_url = "https://graph.qq.com/user/get_user_info?access_token=".$params['access_token']."&oauth_consumer_key=".$app_id."&openid=".$user->openid;
     $str  = file_get_contents($graph_url);
     if (strpos($str, "callback") !== false)
     {
        $lpos = strpos($str, "(");
        $rpos = strrpos($str, ")");
        $str  = substr($str, $lpos + 1, $rpos - $lpos -1);
     }
     $user2 = json_decode($str);
     if ($user2->ret<0)
     {
        echo "<h3>msg  :</h3>" . $user2->msg;
        exit;
     }
	$qqid=$user->openid;
	$qqname=$user2->nickname;
	require 'load.php';
	$currentUser->set("qqid", $qqid);
	$currentUser->set("qqname", $qqname);
	try{$currentUser->save();}catch (CloudException $ex) {echo $ex;}
	$url="user.php";
	header('Location: '.$url);
	exit;
  }
  else{
     echo("The state does not match. You may be a victim of CSRF.");
  }