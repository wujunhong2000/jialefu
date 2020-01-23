<?php
header('Access-Control-Allow-Origin:*');//允许跨域的域名，*代表所有域名。
header('Access-Control-Allow-Method:POST,GET');//允许跨域的请求的方式。
header('content-type:text/html;charset=utf-8');
define('HOST', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', '');
define('DBNAME', 'jialefu');
$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if ($conn->connect_error) {
    die('数据库连接错误,错误信息'.$conn->connect_error);
}
$conn->query('SET NAMES UTF8');

$result = $conn->query("SELECT * FROM huanqiumeishi");
$arrdata = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arrdata[$i] = $result->fetch_assoc();
}
echo json_encode($arrdata);
