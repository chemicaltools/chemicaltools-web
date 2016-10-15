<?php
$xmlstring = <<<XML
<?xml version="1.0" encoding="utf-8"?>
    <string-array>
        <item>《三国演义》中，诸葛亮七擒孟获中遇到的哑泉中含有的物质是硫酸铜(CuSO4)。</item>
        <item>不锈钢之所以不锈，是因为里面含有镉(Cd)。</item>
        <item>豆腐不能和菠菜一起煮着吃的原因是容易形成草酸钙(CaC2O4)。</item>
        <item>古代宝刀削铁如泥，主要是因为其中含有钨(W)、钼(Mo)两种元素。</item>
        <item>现榨的苹果汁在空气中会由淡绿色变成棕黄色，因为苹果汁中的二价铁离子(Fe2+)被空气氧化为三价铁离子(Fe3+)。</item>
        <item>长期使用铝制品作为食品容器会引发老年痴呆病。</item>
        <item>弄破了鱼胆，只要在沾了胆汁的鱼肉上抹些纯碱粉（Na2CO3），稍等片刻再用水冲洗干净，苦味便可消除。</item>
        <item>医疗上用作收敛剂，可使机体组织收缩，减少腺体的分泌的物质是锆矾。</item>
    </string-array>
XML;
$xml=simplexml_load_string($xmlstring);
$doyouknowarray=$xml->item; 
$i=rand(0,count($doyouknowarray)-1);
$doyouknow=$doyouknowarray[$i];