<?php
require "fsock.php";
$FsockService=new FsockService();
$FsockService->get("https://chemapp.njzjz.win/wxchange.php",array('openid'=>$_GET['openid'],'update'=>$_GET['update']));
