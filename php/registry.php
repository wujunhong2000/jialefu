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

if(isset($_POST['phonenum'])){
    $phonenum=$_POST['phonenum'];
    $result = $conn->query("select * from registry where phonenum='$phonenum'");//如果存在结果，注册的用户名存在。
    if($result->fetch_assoc()){
        echo true;//显示1 
    }else{
        echo false;//空隙
    }
}

if(isset($_POST['submit'])){
    $phonenum=$_POST['phonenum'];
    $password1=$_POST['password1'];
    $password2=$_POST['password2'];
    $conn->query("insert registry values(null,'$phonenum','$password1','$password2') ");
    header('location:http://localhost/jialefu2/src/login.html');
}