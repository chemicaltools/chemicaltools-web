<?php
require 'leancloud/src/autoload.php';
use \LeanCloud\Client;
use \LeanCloud\Object;
use \LeanCloud\Query;
use \LeanCloud\User;
use \LeanCloud\CloudException;
use \LeanCloud\Storage\CookieStorage;
// 参数依次为 AppId, AppKey, MasterKey
Client::initialize("wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz", "QiyXtJjBHFJCIVYQRbrKFiB7", "cnW0tSpfljie0GIfqT19iBD5");
//if(isset($_COOKIE['token'])){
//	$token=$_COOKIE['token'];
//	User::become($token);
//}
Client::setStorage(new CookieStorage(60 * 60 * 24 * 30, "/"));
$currentUser = User::getCurrentUser();