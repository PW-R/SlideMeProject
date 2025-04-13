mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: SlideMeDB
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AcceptAbleWork`
--

DROP TABLE IF EXISTS `AcceptAbleWork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AcceptAbleWork` (
  `ID` int NOT NULL,
  `OfferStatus` varchar(30) DEFAULT NULL,
  `Order_UserName` varchar(50) NOT NULL,
  `Start_Location` varchar(255) NOT NULL,
  `End_location` varchar(255) NOT NULL,
  `DriverCar_type` varchar(100) DEFAULT NULL,
  `Car_Brand` varchar(50) DEFAULT NULL,
  `UserCar_type` varchar(50) DEFAULT NULL,
  `CarYear` year DEFAULT NULL,
  `Note` text,
  `License_Plate` varchar(20) DEFAULT NULL,
  `Order_Date_time` datetime NOT NULL,
  `Order_Budget` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AcceptAbleWork`
--

LOCK TABLES `AcceptAbleWork` WRITE;
/*!40000 ALTER TABLE `AcceptAbleWork` DISABLE KEYS */;
/*!40000 ALTER TABLE `AcceptAbleWork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Account_Info`
--

DROP TABLE IF EXISTS `Account_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account_Info` (
  `Account_ID` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL,
  `Phone_Number` varchar(15) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Birthday` date DEFAULT NULL,
  `Preset_location` int DEFAULT NULL,
  `UserList` int DEFAULT NULL,
  `UserOrderHistory` int DEFAULT NULL,
  `UserCoupon` int DEFAULT NULL,
  PRIMARY KEY (`Account_ID`),
  UNIQUE KEY `UC_AccountInfo_Username` (`username`),
  KEY `FK_Account_PresetLocation` (`Preset_location`),
  KEY `FK_AccountInfo_UserList` (`UserList`),
  KEY `FK_AccountInfo_UserOrderHistory` (`UserOrderHistory`),
  KEY `FK_AccountInfo_UserCoupon` (`UserCoupon`),
  CONSTRAINT `FK_Account_PresetLocation` FOREIGN KEY (`Preset_location`) REFERENCES `Preset_location` (`ID`),
  CONSTRAINT `FK_Account_UserCoupon` FOREIGN KEY (`UserCoupon`) REFERENCES `UserCoupon` (`ID`),
  CONSTRAINT `FK_Account_UserList` FOREIGN KEY (`UserList`) REFERENCES `UserList` (`id`),
  CONSTRAINT `FK_Account_UserOrderHistory` FOREIGN KEY (`UserOrderHistory`) REFERENCES `UserOrderHistory` (`ID`),
  CONSTRAINT `FK_AccountInfo_UserCoupon` FOREIGN KEY (`UserCoupon`) REFERENCES `UserCoupon` (`ID`),
  CONSTRAINT `FK_AccountInfo_UserList` FOREIGN KEY (`UserList`) REFERENCES `UserList` (`id`),
  CONSTRAINT `FK_AccountInfo_UserOrderHistory` FOREIGN KEY (`UserOrderHistory`) REFERENCES `UserOrderHistory` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account_Info`
--

LOCK TABLES `Account_Info` WRITE;
/*!40000 ALTER TABLE `Account_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Account_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Chat_info`
--

DROP TABLE IF EXISTS `Chat_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Chat_info` (
  `Chat_ID` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `Rating` int DEFAULT NULL,
  `Massage_Info` int DEFAULT NULL,
  PRIMARY KEY (`Chat_ID`),
  KEY `FK_Chat_Username` (`username`),
  CONSTRAINT `FK_Chat_Username` FOREIGN KEY (`username`) REFERENCES `Account_Info` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chat_info`
--

LOCK TABLES `Chat_info` WRITE;
/*!40000 ALTER TABLE `Chat_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Chat_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CouponDetail`
--

DROP TABLE IF EXISTS `CouponDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CouponDetail` (
  `coupon_ID` int NOT NULL,
  `name_coupon` varchar(100) NOT NULL,
  `expiry_date` date NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `discount_description` text NOT NULL,
  PRIMARY KEY (`coupon_ID`),
  CONSTRAINT `coupondetail_chk_1` CHECK ((`discount_price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CouponDetail`
--

LOCK TABLES `CouponDetail` WRITE;
/*!40000 ALTER TABLE `CouponDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `CouponDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Driver_info`
--

DROP TABLE IF EXISTS `Driver_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Driver_info` (
  `Driver_ID` int NOT NULL,
  `Driver_Year` int DEFAULT NULL,
  `Driver_Name` varchar(25) NOT NULL,
  `Shop_Name` varchar(100) NOT NULL,
  `DriverRating` varchar(255) DEFAULT NULL,
  `Shop_Location` varchar(200) DEFAULT NULL,
  `Preset_location` int DEFAULT NULL,
  PRIMARY KEY (`Driver_ID`),
  KEY `FK_Driver_PresetLocation` (`Preset_location`),
  KEY `FK_DriverInfo_AccountInfo` (`Driver_Name`),
  CONSTRAINT `FK_Driver_PresetLocation` FOREIGN KEY (`Preset_location`) REFERENCES `Preset_location` (`ID`),
  CONSTRAINT `FK_DriverInfo_AccountInfo` FOREIGN KEY (`Driver_Name`) REFERENCES `Account_Info` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Driver_info`
--

LOCK TABLES `Driver_info` WRITE;
/*!40000 ALTER TABLE `Driver_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Driver_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Driver_Offer`
--

DROP TABLE IF EXISTS `Driver_Offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Driver_Offer` (
  `ID` int NOT NULL,
  `Total_Price` decimal(10,2) DEFAULT NULL,
  `Equipment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `driver_offer_chk_1` CHECK ((`Total_Price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Driver_Offer`
--

LOCK TABLES `Driver_Offer` WRITE;
/*!40000 ALTER TABLE `Driver_Offer` DISABLE KEYS */;
/*!40000 ALTER TABLE `Driver_Offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DriverOrderHistory`
--

DROP TABLE IF EXISTS `DriverOrderHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DriverOrderHistory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderHistory` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DriverOrderHistory`
--

LOCK TABLES `DriverOrderHistory` WRITE;
/*!40000 ALTER TABLE `DriverOrderHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `DriverOrderHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DriverRating`
--

DROP TABLE IF EXISTS `DriverRating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DriverRating` (
  `DriverRating_ID` int NOT NULL AUTO_INCREMENT,
  `ตรงต่อเวลา` tinyint NOT NULL,
  `ราคาเป็นธรรม` tinyint NOT NULL,
  `ปลอดภัย` tinyint NOT NULL,
  `บุคลิกผู้ขับ` tinyint NOT NULL,
  PRIMARY KEY (`DriverRating_ID`),
  CONSTRAINT `driverrating_chk_1` CHECK ((`ตรงต่อเวลา` between 0 and 5)),
  CONSTRAINT `driverrating_chk_2` CHECK ((`ราคาเป็นธรรม` between 0 and 5)),
  CONSTRAINT `driverrating_chk_3` CHECK ((`ปลอดภัย` between 0 and 5)),
  CONSTRAINT `driverrating_chk_4` CHECK ((`บุคลิกผู้ขับ` between 0 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DriverRating`
--

LOCK TABLES `DriverRating` WRITE;
/*!40000 ALTER TABLE `DriverRating` DISABLE KEYS */;
/*!40000 ALTER TABLE `DriverRating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Equipment` (
  `Equipment_ID` int NOT NULL,
  `Equipment_Name` varchar(100) NOT NULL,
  `Equipment_Price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Equipment_ID`),
  CONSTRAINT `equipment_chk_1` CHECK ((`Equipment_Price` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment`
--

LOCK TABLES `Equipment` WRITE;
/*!40000 ALTER TABLE `Equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message_info`
--

DROP TABLE IF EXISTS `Message_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message_info` (
  `Massage_ID` int NOT NULL,
  `Massage_Info` text NOT NULL,
  `Massage_Time` datetime NOT NULL,
  `Massage_Status` varchar(10) DEFAULT NULL,
  `Massage_Picture` varchar(255) NOT NULL,
  PRIMARY KEY (`Massage_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message_info`
--

LOCK TABLES `Message_info` WRITE;
/*!40000 ALTER TABLE `Message_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Message_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderDetail` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderDetail`
--

DROP TABLE IF EXISTS `OrderDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetail` (
  `OrderDetail_ID` int NOT NULL AUTO_INCREMENT,
  `Status` varchar(30) DEFAULT NULL,
  `Discount` decimal(10,2) DEFAULT NULL,
  `Start_Location` varchar(255) NOT NULL,
  `End_location` varchar(255) NOT NULL,
  `Car_Brand` varchar(100) DEFAULT NULL,
  `UserCar_type` varchar(100) DEFAULT NULL,
  `Vehicle_condition` text,
  `CarYear` year DEFAULT NULL,
  `License_Plate` varchar(20) DEFAULT NULL,
  `Note` text,
  `Order_Date_time` datetime NOT NULL,
  `Order_Budget` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`OrderDetail_ID`),
  UNIQUE KEY `License_Plate` (`License_Plate`),
  CONSTRAINT `orderdetail_chk_1` CHECK ((`Status` in (_utf8mb4'Waiting For Accept',_utf8mb4'Payment Waiting',_utf8mb4'Complete_waiting',_utf8mb4'Completed'))),
  CONSTRAINT `orderdetail_chk_2` CHECK ((`Discount` >= 0)),
  CONSTRAINT `orderdetail_chk_3` CHECK ((`Order_Budget` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetail`
--

LOCK TABLES `OrderDetail` WRITE;
/*!40000 ALTER TABLE `OrderDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preset_location`
--

DROP TABLE IF EXISTS `Preset_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preset_location` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Start_Location` varchar(200) DEFAULT NULL,
  `End_location` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preset_location`
--

LOCK TABLES `Preset_location` WRITE;
/*!40000 ALTER TABLE `Preset_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `Preset_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `Rating_ID` int NOT NULL AUTO_INCREMENT,
  `ตรงต่อเวลา` tinyint NOT NULL,
  `ราคาเป็นธรรม` tinyint NOT NULL,
  `ปลอดภัย` tinyint NOT NULL,
  `บุคลิกผู้ขับ` tinyint NOT NULL,
  PRIMARY KEY (`Rating_ID`),
  CONSTRAINT `rating_chk_1` CHECK ((`ตรงต่อเวลา` between 0 and 5)),
  CONSTRAINT `rating_chk_2` CHECK ((`ราคาเป็นธรรม` between 0 and 5)),
  CONSTRAINT `rating_chk_3` CHECK ((`ปลอดภัย` between 0 and 5)),
  CONSTRAINT `rating_chk_4` CHECK ((`บุคลิกผู้ขับ` between 0 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shop_Info`
--

DROP TABLE IF EXISTS `Shop_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shop_Info` (
  `Shop_ID` int NOT NULL AUTO_INCREMENT,
  `Shop_Name` varchar(100) NOT NULL,
  `Shop_Location` varchar(255) NOT NULL,
  `Shop_Phone` varchar(20) NOT NULL,
  `Shop_Password` varchar(100) NOT NULL,
  `Shop_Manager_Name` varchar(100) NOT NULL,
  `Shop_Info` text,
  `Shop_service` varchar(255) DEFAULT NULL,
  `Shop_Driver` varchar(50) DEFAULT NULL,
  `Shop_Status` enum('open','closed') DEFAULT 'open',
  `ShopQRcode` varchar(255) DEFAULT NULL,
  `ShopManagerID` int DEFAULT NULL,
  PRIMARY KEY (`Shop_ID`),
  UNIQUE KEY `Shop_Name` (`Shop_Name`),
  UNIQUE KEY `Shop_Phone` (`Shop_Phone`),
  KEY `FK_ShopInfo_ShopManagerID` (`ShopManagerID`),
  CONSTRAINT `FK_Shop_ShopManagerID` FOREIGN KEY (`ShopManagerID`) REFERENCES `Account_Info` (`Account_ID`),
  CONSTRAINT `FK_ShopInfo_ShopManagerID` FOREIGN KEY (`ShopManagerID`) REFERENCES `Account_Info` (`Account_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shop_Info`
--

LOCK TABLES `Shop_Info` WRITE;
/*!40000 ALTER TABLE `Shop_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shop_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserCoupon`
--

DROP TABLE IF EXISTS `UserCoupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCoupon` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CouponDetail` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCoupon`
--

LOCK TABLES `UserCoupon` WRITE;
/*!40000 ALTER TABLE `UserCoupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserCoupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserList`
--

DROP TABLE IF EXISTS `UserList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `OrderDetail` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserList`
--

LOCK TABLES `UserList` WRITE;
/*!40000 ALTER TABLE `UserList` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserOrderHistory`
--

DROP TABLE IF EXISTS `UserOrderHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserOrderHistory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `HistoryDetail` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserOrderHistory`
--

LOCK TABLES `UserOrderHistory` WRITE;
/*!40000 ALTER TABLE `UserOrderHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserOrderHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-13 14:59:58
