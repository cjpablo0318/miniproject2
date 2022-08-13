<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbName = "dbennea";

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

//create database if not exist
$currentDb = mysqli_select_db($conn, $dbName);
if(!$currentDb){
    if(!mysqli_query($conn, "CREATE DATABASE ".$dbName))
      echo "Error creating database: " . mysqli_error($conn);
}

//selecting the databse
$currentDb = mysqli_select_db($conn, $dbName);

//creating tables
$sql = "CREATE TABLE IF NOT EXISTS `tblusers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `first` varchar(255) NOT NULL,
  `last` varchar(255) NOT NULL,
  `number` int(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zipcode` int(10) NOT NULL,
  `country` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`))";
    
  if (!mysqli_query($conn, $sql)) {
    echo "Error creating table: " . mysqli_error($conn);
  }

  $sql = "CREATE TABLE IF NOT EXISTS `tblproducts` (
    `item_id` int(11) NOT NULL AUTO_INCREMENT,
    `main_title` varchar(1000) NOT NULL,
    `img_url` varchar(1000) NOT NULL,
    `price` int(255) NOT NULL,
    `color` varchar(255) DEFAULT NULL,
    `sizes` varchar(255) DEFAULT NULL,
    `category` int(10) DEFAULT NULL,
    PRIMARY KEY (`item_id`))";
  
    if (!mysqli_query($conn, $sql)) {
      echo "Error creating table: " . mysqli_error($conn);
    }
  $conn = mysqli_connect($servername, $username, $password, $dbName);
?>