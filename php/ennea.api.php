<?php
header("Content-Type:application/json");

if($_GET['email'] != "" && $_GET['password'] != ""){
    include('ennea.db.php');
    getUser(1, $conn);
}

function getUser($id, $conn){
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

?>