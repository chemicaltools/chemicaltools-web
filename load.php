<?php
require 'leancloud/src/autoload.php';
use \LeanCloud\Client;
use \LeanCloud\Object;
use \LeanCloud\Query;
use \LeanCloud\User;
use \LeanCloud\CloudException;
// 参数依次为 AppId, AppKey, MasterKey
Client::initialize("wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz", "QiyXtJjBHFJCIVYQRbrKFiB7", "cnW0tSpfljie0GIfqT19iBD5");
if(isset($_COOKIE['token'])){
	$token=$_COOKIE['token'];
	User::become($token);
}
$currentUser = User::getCurrentUser();