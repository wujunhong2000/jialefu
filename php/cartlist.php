<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

header('content-type:text/html;charset=utf-8');
define('HOST', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', '');
define('DBNAME', 'jialefu');
$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if ($conn->connect_error) {
    die('数据库连接错误,错误信息：'.$conn->connect_error);
}
$conn->query('SET NAMES UTF8');

$arr=array();
$result=$conn->query("select * from huanqiumeishi");
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}
echo json_encode($arr);