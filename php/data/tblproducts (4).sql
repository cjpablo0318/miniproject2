-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 31, 2022 at 12:48 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbennia`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblproducts`
--

DROP TABLE IF EXISTS `tblproducts`;
CREATE TABLE IF NOT EXISTS `tblproducts` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `main_title` varchar(1000) NOT NULL,
  `img_url` varchar(1000) NOT NULL,
  `price` int(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `sizes` varchar(255) DEFAULT NULL,
  `category` int(10) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproducts`
--

INSERT INTO `tblproducts` (`item_id`, `main_title`, `img_url`, `price`, `color`, `sizes`, `category`) VALUES
(1, 'Color Dolphin Cropped Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J311_660_48?$SFCC_L$', 5050, '0', '0', 1),
(2, 'RAYON SILK TIE NECK DRESS', 'https://esprit.scene7.com/is/image/esprit/052EE1E353_311_48?$SFCC_L$', 10090, '0', '0', 0),
(3, 'SUS 2nd skin t', 'https://esprit.scene7.com/is/image/esprit/072EE1K324_110_48?$SFCC_L$', 1990, ' 0', ' 0', 0),
(4, 'Striped t-shirt', 'https://esprit.scene7.com/is/image/esprit/992EO1K309_114_48?$SFCC_L$', 1990, ' 0', ' 0', 0),
(5, 'Color Dolphin Cropped T-shirt', 'https://esprit.scene7.com/is/image/esprit/042EE1K397_001_48?$SFCC_L$', 2950, ' 0', ' 0', 0),
(6, 'Dolphin Tennis Club Pleated Polo Dress', 'https://esprit.scene7.com/is/image/esprit/042EE1K397_001_48?$SFCC_L$', 5690, ' 0', ' 0', 0),
(7, 'Dolphin Tennis Club Classic Polo', 'https://esprit.scene7.com/is/image/esprit/052EE1K375_310_48?$SFCC_L$', 4290, ' 0', ' 0', 0),
(8, 'Color Dolphin Cropped Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J311_001_48?$SFCC_L$', 5050, ' 0', ' 0', 0),
(9, 'RAYON SILK Tank Dress', 'https://esprit.scene7.com/is/image/esprit/052EE1E354_760_48?$SFCC_L$', 7690, ' 0', ' 0', 0),
(10, 'Long sleeve roll neck top, TENCEL', 'https://esprit.scene7.com/is/image/esprit/992EO1K317_001_48?$SFCC_L$', 2550, ' 0', ' 0', 0),
(11, 'Cut-out top', 'https://esprit.scene7.com/is/image/esprit/072EO1K312_110_48?$SFCC_L$', 3250, ' 0', ' 0', 0),
(12, 'Dolphin Tennis Club Classic Polo', 'https://esprit.scene7.com/is/image/esprit/052EE1K375_001_48?$SFCC_L$', 4290, NULL, NULL, NULL),
(13, 'Dolphin Tennis Club Classic Polo Dress', 'https://esprit.scene7.com/is/image/esprit/052EE1E350_001_48?$SFCC_L$', 5050, NULL, NULL, NULL),
(14, 'Dolphin Tennis Club Pleated Polo Dress', 'https://esprit.scene7.com/is/image/esprit/052EE1E351_670_48?$SFCC_L$', 5690, NULL, NULL, NULL),
(15, 'With TENCEL: T-shirt with band collar', 'https://esprit.scene7.com/is/image/esprit/072EE1K324_001_48?$SFCC_L$', 1990, NULL, NULL, NULL),
(16, 'Basic T-shirt in 100% organic cotton', 'https://esprit.scene7.com/is/image/esprit/992EO1K314_110_48?$SFCC_L$', 1690, NULL, NULL, NULL),
(17, 'Pleated top', 'https://esprit.scene7.com/is/image/esprit/062EE1I308_310_48?$SFCC_L$', 4550, NULL, NULL, NULL),
(18, 'Striped t-shirt', 'https://esprit.scene7.com/is/image/esprit/992EO1K309_305_48?$SFCC_L$', 1990, NULL, NULL, NULL),
(19, 'Color Capsule T-shirt', 'https://esprit.scene7.com/is/image/esprit/111EE2K303_300_48?$SFCC_L$', 1625, NULL, NULL, NULL),
(20, 'Color Capsule T-shirt', 'https://esprit.scene7.com/is/image/esprit/111EE2K303_250_48?$SFCC_L$', 1625, NULL, NULL, NULL),
(21, 'Love Composite Capsule T-shirt', 'https://esprit.scene7.com/is/image/esprit/111EE2K305_430_48?$SFCC_L$', 1625, NULL, NULL, NULL),
(22, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_100_48?$SFCC_L$', 3845, NULL, NULL, NULL),
(23, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_430_48?$SFCC_L$', 3845, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
