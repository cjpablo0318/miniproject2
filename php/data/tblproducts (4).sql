-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2022 at 03:26 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbennea`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblproducts`
--

CREATE TABLE `tblproducts` (
  `item_id` int(11) NOT NULL,
  `main_title` varchar(1000) NOT NULL,
  `img_url` varchar(1000) NOT NULL,
  `price` int(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `sizes` varchar(255) DEFAULT NULL,
  `category` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproducts`
--

INSERT INTO `tblproducts` (`item_id`, `main_title`, `img_url`, `price`, `color`, `sizes`, `category`) VALUES
(1, 'Color Dolphin Cropped Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J311_660_48?$SFCC_L$', 5050, '0', '0', 1),
(2, 'RAYON SILK TIE NECK DRESS', 'https://esprit.scene7.com/is/image/esprit/052EE1E353_311_48?$SFCC_L$', 10090, '0', '0', 1),
(3, 'SUS 2nd skin t', 'https://esprit.scene7.com/is/image/esprit/072EE1K324_110_48?$SFCC_L$', 1990, ' 0', ' 0', 1),
(4, 'Striped t-shirt', 'https://esprit.scene7.com/is/image/esprit/992EO1K309_114_48?$SFCC_L$', 1990, ' 0', ' 0', 1),
(5, 'Color Dolphin Cropped T-shirt', 'https://esprit.scene7.com/is/image/esprit/042EE1K397_001_48?$SFCC_L$', 2950, ' 0', ' 0', 1),
(6, 'Dolphin Tennis Club Pleated Polo Dress', 'https://esprit.scene7.com/is/image/esprit/042EE1K397_001_48?$SFCC_L$', 5690, ' 0', ' 0', 1),
(7, 'Dolphin Tennis Club Classic Polo', 'https://esprit.scene7.com/is/image/esprit/052EE1K375_310_48?$SFCC_L$', 4290, ' 0', ' 0', 1),
(8, 'Color Dolphin Cropped Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J311_001_48?$SFCC_L$', 5050, ' 0', ' 0', 1),
(9, 'RAYON SILK Tank Dress', 'https://esprit.scene7.com/is/image/esprit/052EE1E354_760_48?$SFCC_L$', 7690, ' 0', ' 0', 1),
(10, 'Long sleeve roll neck top, TENCEL', 'https://esprit.scene7.com/is/image/esprit/992EO1K317_001_48?$SFCC_L$', 2550, ' 0', ' 0', 1),
(11, 'Cut-out top', 'https://esprit.scene7.com/is/image/esprit/072EO1K312_110_48?$SFCC_L$', 3250, ' 0', ' 0', 1),
(12, 'Dolphin Tennis Club Classic Polo', 'https://esprit.scene7.com/is/image/esprit/052EE1K375_001_48?$SFCC_L$', 4290, NULL, NULL, 1),
(13, 'Dolphin Tennis Club Classic Polo Dress', 'https://esprit.scene7.com/is/image/esprit/052EE1E350_001_48?$SFCC_L$', 5050, NULL, NULL, 1),
(14, 'Dolphin Tennis Club Pleated Polo Dress', 'https://esprit.scene7.com/is/image/esprit/052EE1E351_670_48?$SFCC_L$', 5690, NULL, NULL, 1),
(15, 'With TENCEL: T-shirt with band collar', 'https://esprit.scene7.com/is/image/esprit/072EE1K324_001_48?$SFCC_L$', 1990, NULL, NULL, 1),
(16, 'Basic T-shirt in 100% organic cotton', 'https://esprit.scene7.com/is/image/esprit/992EO1K314_110_48?$SFCC_L$', 1690, NULL, NULL, 1),
(17, 'Pleated top', 'https://esprit.scene7.com/is/image/esprit/062EE1I308_310_48?$SFCC_L$', 4550, NULL, NULL, 1),
(18, 'Striped t-shirt', 'https://esprit.scene7.com/is/image/esprit/992EO1K309_305_48?$SFCC_L$', 1990, NULL, NULL, 1),
(19, 'Color Capsule T-shirt', 'https://esprit.scene7.com/is/image/esprit/111EE2K303_300_48?$SFCC_L$', 1625, NULL, NULL, 2),
(20, 'Color Capsule T-shirt', 'https://esprit.scene7.com/is/image/esprit/111EE2K303_250_48?$SFCC_L$', 1625, NULL, NULL, 2),
(21, 'Love Composite Capsule T-shirt', 'https://esprit.scene7.com/is/image/esprit/111EE2K305_430_48?$SFCC_L$', 1625, NULL, NULL, 2),
(22, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_100_48?$SFCC_L$', 3845, NULL, NULL, 2),
(23, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_430_48?$SFCC_L$', 3845, NULL, NULL, 2),
(24, 'Pima cotton pique polo shirt', 'https://esprit.scene7.com/is/image/esprit/992EE2K306_450_48?$SFCC_L$\r\n', 1990, NULL, NULL, 2),
(25, 'Sustainable cotton illustration t-shirt', 'https://esprit.scene7.com/is/image/esprit/072EE2K309_400_48?$SFCC_L$', 1990, NULL, NULL, 2),
(26, 'Dolphin Tennis Club Classic Polo', 'https://esprit.scene7.com/is/image/esprit/052EE2K325_820_48?$SFCC_L$', 4550, NULL, NULL, 2),
(27, 'Dolphin Tennis Club Relaxed Polo', 'https://esprit.scene7.com/is/image/esprit/052EE2K326_430_48?$SFCC_L$', 5050, NULL, NULL, 2),
(28, 'Shirt with a pattern', 'https://esprit.scene7.com/is/image/esprit/072EO2F305_100_48?$SFCC_L$', 3890, NULL, NULL, 2),
(29, 'Unisex sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J314_001_48?$SFCC_L$', 8850, NULL, NULL, 3),
(30, 'Unisex sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J314_270_48?$SFCC_L$', 8850, NULL, NULL, 3),
(31, 'Unisex sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J314_001_48?$SFCC_L$', 8850, NULL, NULL, 3),
(32, 'Unisex sweatshirt', 'https://esprit.scene7.com/is/image/esprit/042EE1J314_034_39?$SFCC_L$', 8850, NULL, NULL, 3),
(33, 'Archive Re-Issue Color Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/111EE2J313_044_48?$SFCC_L$', 6350, NULL, NULL, 3),
(34, 'Archive Re-Issue Color Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/111EE2J313_630_48?$SFCC_L$', 6350, NULL, NULL, 3),
(35, 'Archive Re-Issue Color Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/111EE2J313_400_48?$SFCC_L$', 6350, NULL, NULL, 3),
(36, 'Archive Re-Issue Color Sweatshirt', 'https://esprit.scene7.com/is/image/esprit/111EE2J313_750_48?$SFCC_L$', 6350, NULL, NULL, 3),
(37, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_310_48?$SFCC_L$', 3845, NULL, NULL, 3),
(38, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_001_48?$SFCC_L$', 3845, NULL, NULL, 3),
(39, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_820_48?$SFCC_L$', 3845, NULL, NULL, 3),
(40, 'Love Composite Capsule Hoodie', 'https://esprit.scene7.com/is/image/esprit/111EE2J314_510_48?$SFCC_L$', 3845, NULL, NULL, 3),
(41, 'Rest & Recreation Capsule ', 'https://esprit.scene7.com/is/image/esprit/042EE1B345_900_48?$SFCC_L$', 7690, NULL, NULL, 3),
(42, 'Rest & Recreation Capsule ', 'https://esprit.scene7.com/is/image/esprit/042EE2B310_900_48?$SFCC_L$', 7690, NULL, NULL, 3),
(43, 'Cargo trousers, Women', 'https://esprit.scene7.com/is/image/esprit/042EE1B347_270_48?$SFCC_L$', 6950, NULL, NULL, 3),
(44, 'Cargo trousers, Men', 'https://esprit.scene7.com/is/image/esprit/042EE2B311_270_48?$SFCC_L$', 6950, NULL, NULL, 3),
(45, 'Unisex tracksuit bottoms', 'https://esprit.scene7.com/is/image/esprit/042EE1B346_001_48?$SFCC_L$', 5690, NULL, NULL, 3),
(46, 'Unisex tracksuit bottoms', 'https://esprit.scene7.com/is/image/esprit/042EE1B346_270_48?$SFCC_L$', 5690, NULL, NULL, 3),
(47, 'Unisex tracksuit bottoms', 'https://esprit.scene7.com/is/image/esprit/042EE1B346_034_48?$SFCC_L$', 5690, NULL, NULL, 3),
(48, 'Knit tracksuit bottoms', 'https://esprit.scene7.com/is/image/esprit/072EO2B306_350_48?$SFCC_L$', 5050, NULL, NULL, 3),
(49, 'Baseball cap', 'https://esprit.scene7.com/is/image/esprit/042EA1P328_290_59?$SFCC_L$', 3250, NULL, NULL, 4),
(50, 'Baseball cap', 'https://esprit.scene7.com/is/image/esprit/042EA1P328_001_59?$SFCC_L$', 3250, NULL, NULL, 4),
(51, 'Medium-sized duffle bag', 'https://esprit.scene7.com/is/image/esprit/042EA1O360_750_59?$SFCC_L$', 5690, NULL, NULL, 4),
(52, 'Large duffle bag', 'https://esprit.scene7.com/is/image/esprit/042EA1O361_290_51?$SFCC_L$', 7690, NULL, NULL, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblproducts`
--
ALTER TABLE `tblproducts`
  ADD PRIMARY KEY (`item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblproducts`
--
ALTER TABLE `tblproducts`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
