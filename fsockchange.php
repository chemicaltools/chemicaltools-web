<?php
require "fsock.php";
$FsockService=new FsockService();
$FsockService->get("http://chemapp.njzjz.win/wxchange.php",array('openid'=>$_GET['openid']));
