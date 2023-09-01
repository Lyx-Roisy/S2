<?php 
// 获取提交的用户名+密码
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$input_username = $_POST["username"];
$input_password = $_POST["password"];

// 查询用户是否存在
$sql_server = "localhost";
$sql_username = "root";
$sql_password = "10070818Lyx";
$sql_database = "mydb";
$con = new mysqli($sql_server, $sql_username, $sql_password, $sql_database);
$sql = 'SELECT * FROM user_account WHERE username="' . $input_username . '"';

$res = $con->query($sql);

// 用户不存在
if($res==null || $res->num_rows==0) {
    echo "user not found";
} 
// 一个用户存在
else if($res->num_rows==1) {
    $user = $res->fetch_assoc();	// 获取所有数据字段的map
    // 密码是否正确
    if($user["password"]==$input_password) {
        echo "login success";
    } else {
        echo "wrong password";
    }
} 
// 多个用户存在 查询出错
else if($res->num_rows>1) {
    echo "error";
} }
?>
