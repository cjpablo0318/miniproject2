<?php
header("Content-Type:application/json");

if(isset($_POST['signUp'])){
    if(isset($_POST['name']) && isset($_POST['password']) && $_POST['cpassword'] && $_POST['number']){
        include('ennea.db.php');
        $name = $_POST['name'];
        $password = $_POST['password'];
        $cpassword = $_POST['cpassword'];
        $number = $_POST['number'];

        if($password != $cpassword){
            echo 'password not equal';
            return;
        }

        savePerson($conn, $name, $password, $number);

    }else{
        echo 'required missing fields';
    }
}
if(isset($_POST['login'])){
    if(isset($_POST['username']) && isset($_POST['password'])){
        include('ennea.db.php');
        $username = $_POST['username'];
        $password = $_POST['password'];
        login($conn, $username, $password);
    }
}

if(isset($_POST['email']) && isset($_POST['password'])){
    include('ennea.db.php');
    $email = $_POST['email'];
    $password = $_POST['password'];

    checkUser($conn, $email, $password);
    //echo($_POST['email'] . " : : " . $_POST['password']);
    //getUser(1, $conn);
}
if(isset($_GET['products'])){
    include('ennea.db.php');
    products($conn);
}
if(isset($_GET['categories'])){
    include('ennea.db.php');
    categories($conn);
}

//functions
function savePerson($conn, $name, $password, $number){
    $query = "INSERT into tblusers(first, password, number) VALUES('" . $name . "','" . $password . "','" . $number . "')";
    $result = mysqli_query($conn, $query);
}
function login($conn, $username, $password){
    $query = "SELECT * FROM tblusers WHERE email = '" . $username . "' AND password = '" . $password . "' OR number ='" . $username . "' AND password = '" . $password . "'";
    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_assoc($result)){
        echo $row['ID'];
    }
}
function checkUser($conn, $email, $password){
    $query = "Select * from tblusers where email='" . $email. "' and password='" . $password . "'";
    $result = mysqli_query($conn, $query);
    echo mysqli_num_rows($result);
}
function getUser($conn, $id){
    $query = "SELECT * FROM tblusers where ID=$id";
    $result = mysqli_query($conn, $query);

    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_array($result);
        $data['data'][] = array(
            "id" => $row["ID"],
            "name" => array(
                "first" => $row["first"],
                "last" => $row["last"],
            ),
            "contact" => array(
                "email" => $row["email"],
                "number" => $row["number"],
            ),
            "address" => array(
                "street" => $row["street"],
                "city" => $row["city"],
                "zipcode" => $row["zipcode"],
                "country" => $row["country"],
            ),
            "password" => $row["password"],
        );
    }
    echo json_encode($data);
}
function products($conn){
    $query = "SELECT item_id, main_title, img_url, price, color, sizes, category FROM tblProducts";
    $result = mysqli_query($conn, $query);
    $data = array();
    while($row = mysqli_fetch_assoc($result)){
        $data['data'][] = array(
            "item_id" => $row["item_id"],
            "main_title" => $row["main_title"],
            "img_url" => $row["img_url"],
            "price" => $row["price"],
            "color" => $row["color"],
            "sizes" => $row["sizes"],
            "category" => $row["category"]
        );
    }
    mysqli_close($conn);
    
    echo json_encode($data, JSON_PRETTY_PRINT);
    //echo json_last_error();
   
}
function categories($conn){
    $query = "SELECT * FROM tblCategories";
    $result = mysqli_query($conn, $query);

    if(mysqli_num_rows($result) > 0){
        $row = mysqli_fetch_array($result);
        $data['data'][] = array(
            "category_id" => $row["category_id"],
            "category_name" => $row["category_name"]
        );
    }
    echo json_encode($data);
}
?>