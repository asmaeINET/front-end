-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 28, 2025 at 10:34 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tuscany`
--

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_token`
--

DROP TABLE IF EXISTS `password_reset_token`;
CREATE TABLE IF NOT EXISTS `password_reset_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `used` bit(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKg0guo4k8krgpwuagos61oc06j` (`token`),
  KEY `FK83nsrttkwkb6ym0anu051mtxn` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
CREATE TABLE IF NOT EXISTS `tours` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `capacity` int DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `status` enum('ACTIVE','DRAFT','INACTIVE') DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `duration` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKo61q2fu99qfi7hvheq6lnntim` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `capacity`, `category`, `date`, `description`, `location`, `main_image`, `price`, `slug`, `status`, `title`, `duration`) VALUES
(1, 10, 'Tour', '2025-01-01', 'A tour of the city and its surroundings led by a professional guide ...', 'Lucca', 'https://cdn.builder.io/api/v1/image/assets/TEMP/e649aa3470f40e4fc3ad4108bc8f0e32f7738d84?width=1400', 34, 'lucca-bike-tour', 'ACTIVE', 'Lucca Bike Tour', NULL),
(2, 30, 'Tour', '2025-01-01', 'The real magic is here where you can enjoy the best Tuscan wine and eat ...', 'Tuscany', 'https://cdn.builder.io/api/v1/image/assets/TEMP/68ff1ed6c96f21fd0cfc7c092f07678e106a61ae?width=1400', 34, 'wine-tasting-in-tuscany', 'ACTIVE', 'Wine tasting In Tuscany', NULL),
(3, 50, 'Tour', '2025-01-01', 'Visiting the 5 Terre is a must, and you can never go there enough ...', 'Cinque Terre', 'https://cdn.builder.io/api/v1/image/assets/TEMP/41cd603110d876cbb13464c4a817509ce08de13c?width=1400', 34, 'cinque-terre-tour', 'ACTIVE', 'Cinque Terre Tour', NULL),
(4, 10, 'Tour', '2025-01-01', 'Visit the beautiful Siena and the cities that surround it to experience ...', 'Siena', 'https://cdn.builder.io/api/v1/image/assets/TEMP/a77e402c8a702f4b15cc1474039e41539823dfb2?width=1400', 34, 'siena-and-surroundings', 'ACTIVE', 'Siena and Surroundings', NULL),
(5, 12, 'Tour', '2025-01-01', 'Visit with us the beautiful hills of Lucca, with a guide who will make ...', 'Lucca', 'https://cdn.builder.io/api/v1/image/assets/TEMP/26860b3914eb8c32a4215496857371a56fd8ac2f?width=1400', 34, 'tour-of-lucca-hills', 'ACTIVE', 'Tour of the Lucca Hills', NULL),
(6, 50, 'Tour', '2025-01-01', 'Visit the largest and most fun park in Italy suitable for all ...', 'Verona', 'https://cdn.builder.io/api/v1/image/assets/TEMP/6f77270fd39b3d7a49c1a62f8f487b2c3591cb6b?width=1400', 34, 'gardaland-verona', 'ACTIVE', 'Gardaland, Verona', NULL),
(7, 50, 'Tour', '2025-01-01', 'Visiting the 5 Terre is a must, and you can never go there enough ...', 'Pisa & Lucca', 'https://cdn.builder.io/api/v1/image/assets/TEMP/55587f715aed85c3394a2517b88d6af020d04bd6?width=1400', 34, 'pisa-lucca', 'ACTIVE', 'Pisa & Lucca', NULL),
(8, 10, 'Tour', '2025-01-01', 'Visit the beautiful Siena and the cities that surround it to experience ...', 'Florence', 'https://cdn.builder.io/api/v1/image/assets/TEMP/07ef39d71d6015d02ef7c5849bcfc9231d35ecfa?width=1400', 34, 'florence', 'ACTIVE', 'Florence', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_details`
--

DROP TABLE IF EXISTS `tour_details`;
CREATE TABLE IF NOT EXISTS `tour_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `entry_fees` varchar(255) DEFAULT NULL,
  `group_size` varchar(255) DEFAULT NULL,
  `guide_service` bit(1) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `time` time(6) NOT NULL,
  `transportation` varchar(255) DEFAULT NULL,
  `tour_id` bigint DEFAULT NULL,
  `detailed_description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8libimpi415bmlsykb0l79i5o` (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour_details`
--

INSERT INTO `tour_details` (`id`, `date`, `duration`, `entry_fees`, `group_size`, `guide_service`, `language`, `time`, `transportation`, `tour_id`, `detailed_description`) VALUES
(1, '2025-01-01', '1', '', '', b'1', '', '10:00:00.000000', '', 1, ''),
(2, '2025-01-01', '1', '30', '15', b'1', 'English', '09:00:00.000000', 'Private Car', 2, NULL),
(3, '2025-01-01', '1', '50', '20', b'1', 'English', '08:30:00.000000', 'Train', 3, NULL),
(4, '2025-01-01', '1', '10', '12', b'1', 'French', '10:00:00.000000', 'Bus', 4, NULL),
(5, '2025-01-01', '1', '12', '8', b'1', 'Italian', '11:00:00.000000', 'Bike', 5, NULL),
(6, '2025-01-01', '1', '50', '25', b'1', 'English', '10:00:00.000000', 'Bus', 6, NULL),
(7, '2025-01-01', '1', '50', '10', b'1', 'French', '09:30:00.000000', 'Van', 7, NULL),
(8, '2025-01-01', '1', '10', '15', b'1', 'Spanish', '08:45:00.000000', 'Bus', 8, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_gallery`
--

DROP TABLE IF EXISTS `tour_gallery`;
CREATE TABLE IF NOT EXISTS `tour_gallery` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(2048) DEFAULT NULL,
  `tour_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrdoquchij7nywekeh5ipwbcoq` (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour_gallery`
--

INSERT INTO `tour_gallery` (`id`, `image_url`, `tour_id`) VALUES
(1, 'https://cdn.builder.io/api/v1/image/assets/TEMP/41cd603110d876cbb13464c4a817509ce08de13c?width=1400', 1),
(2, 'https://cdn.builder.io/api/v1/image/assets/TEMP/41cd603110d876cbb13464c4a817509ce08de13c?width=1400', 1),
(4, 'http://localhost:8080/uploads/gallery/aab44546-871e-4c33-a40e-8f65240b0660-41cd603110d876cbb13464c4a817509ce08de13c.png', 1),
(6, 'https://cdn.builder.io/api/v1/image/assets/TEMP/41cd603110d876cbb13464c4a817509ce08de13c?width=1400', 1),
(7, 'http://localhost:8080/uploads/gallery/bd31baca-43bb-4a55-9de0-c86e11851166-41cd603110d876cbb13464c4a817509ce08de13c.png', 2),
(8, 'https://images.unsplash.com/photo-1544191696-15693072b5a8?w=700&h=506&fit=crop&crop=center', 2),
(9, 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=340&h=242&fit=crop&crop=center', 2),
(10, 'https://images.unsplash.com/photo-1595746028010-4b9d1ddb5e75?w=340&h=506&fit=crop&crop=center', 2),
(11, 'https://images.unsplash.com/photo-1544378156-207b5ac50748?w=340&h=242&fit=crop&crop=center', 3),
(12, 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=700&h=506&fit=crop&crop=center', 3),
(13, 'https://images.unsplash.com/photo-1567111278842-e546dd3c69b1?w=340&h=242&fit=crop&crop=center', 3),
(14, 'https://images.unsplash.com/photo-1558346648-9757f999aba8?w=340&h=506&fit=crop&crop=center', 3),
(15, 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=340&h=242&fit=crop&crop=center', 4),
(16, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=506&fit=crop&crop=center', 4),
(17, 'http://localhost:8080/uploads/gallery/f7ba201c-77b0-4bbe-b482-842758b3297c-test.jpeg', 4),
(18, 'https://images.unsplash.com/photo-1551376347-075b0121a65b?w=340&h=506&fit=crop&crop=center', 4),
(20, 'https://images.unsplash.com/photo-1593786275148-2d39a511e9bd?w=700&h=506&fit=crop&crop=center', 5),
(21, 'https://images.unsplash.com/photo-1591797442444-039f23ddcc14?w=340&h=242&fit=crop&crop=center', 5),
(22, 'https://images.unsplash.com/photo-1559113315-6e4e3c58d48f?w=340&h=506&fit=crop&crop=center', 5),
(23, 'https://images.unsplash.com/photo-1592926471399-c7d7c55f45df?w=340&h=242&fit=crop&crop=center', 5),
(24, 'https://images.unsplash.com/photo-1595746028010-4b9d1ddb5e75?w=700&h=506&fit=crop&crop=center', 6),
(25, 'https://images.unsplash.com/photo-1544378156-207b5ac50748?w=340&h=242&fit=crop&crop=center', 6),
(26, 'https://images.unsplash.com/photo-1541892395-1bb2470a2e6b?w=340&h=506&fit=crop&crop=center', 6),
(27, 'https://images.unsplash.com/photo-1544191696-15693072b5a8?w=340&h=242&fit=crop&crop=center', 6),
(28, 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=700&h=506&fit=crop&crop=center', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `account_expiry_date` date DEFAULT NULL,
  `account_non_expired` bit(1) NOT NULL,
  `account_non_locked` bit(1) NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `credentials_expiry_date` date DEFAULT NULL,
  `credentials_non_expired` bit(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `is_two_factor_enabled` bit(1) NOT NULL,
  `password` varchar(120) DEFAULT NULL,
  `sign_up_method` varchar(255) DEFAULT NULL,
  `two_factor_secret` varchar(255) DEFAULT NULL,
  `updated_date` datetime(6) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `account_expiry_date`, `account_non_expired`, `account_non_locked`, `created_date`, `credentials_expiry_date`, `credentials_non_expired`, `email`, `enabled`, `is_two_factor_enabled`, `password`, `sign_up_method`, `two_factor_secret`, `updated_date`, `username`, `role_id`) VALUES
(1, '2026-07-28', b'1', b'0', '2025-07-28 18:38:41.801493', '2026-07-28', b'1', 'user1@example.com', b'1', b'0', '$2a$10$MEkvTdvMdyhj/TPhzOZk/.ZMiHgD6EBQ9pKkbZaUK20oqRgk5kwIm', 'email', NULL, '2025-07-28 18:38:41.801493', 'user1', 1),
(2, '2026-07-28', b'1', b'1', '2025-07-28 18:38:42.101818', '2026-07-28', b'1', 'admin@example.com', b'1', b'0', '$2a$10$vo3HkSgjQ8AoJFhjd393AexcBKwHNgtyIXxkVLLzLWAdjQ860uHaq', 'email', NULL, '2025-07-28 18:38:42.101818', 'admin', 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `password_reset_token`
--
ALTER TABLE `password_reset_token`
  ADD CONSTRAINT `FK83nsrttkwkb6ym0anu051mtxn` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `tour_details`
--
ALTER TABLE `tour_details`
  ADD CONSTRAINT `FK16mwopetoqp39h3ayd380bo43` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `tour_gallery`
--
ALTER TABLE `tour_gallery`
  ADD CONSTRAINT `FKrdoquchij7nywekeh5ipwbcoq` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
