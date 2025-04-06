-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 06, 2025 at 07:19 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `formulaone`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Street Circuit'),
(2, 'Road Circuit'),
(3, 'Race Circuit');

-- --------------------------------------------------------

--
-- Table structure for table `circuits`
--

CREATE TABLE `circuits` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `length_km` decimal(5,2) NOT NULL,
  `turns` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `circuits`
--

INSERT INTO `circuits` (`id`, `name`, `city`, `country`, `length_km`, `turns`, `image`, `category_id`, `description`) VALUES
(2, 'Autodromo Nazionale di Monza ', 'Monza', 'Italy', '5.79', 11, 'monza.jpg', 3, 'Built in 1921, Monza is one of the oldest and most iconic circuits in Formula 1 history. Known as the \"Temple of Speed,\" its legendary high-speed straights and thrilling corners have been the stage for unforgettable moments and historic victories.'),
(7, 'Albert Park', 'Melbourne', 'Australia', '5.28', 16, 'albert_park.jpg', 1, 'The Melbourne Grand Prix Circuit, or Albert Park Circuit, is a 5.278 km street track in Melbourne, Australia, hosting F1 since 1996. With 16 turns, high-speed straights, and tight corners, it challenges drivers.'),
(10, 'Circuit de Reims Gueux', 'Gueux', 'France', '8.30', 6, '1742603927097.jpg', 2, 'The Circuit de Reims-Gueux was a historic French Grand Prix track used from 1926 to 1972. Known for its long straights and high speeds, the 7.826 km layout favored powerful engines. '),
(13, 'Circuit Gilles-Villeneuve', 'Montreal', 'Canada', '4.40', 13, '1743021274566.jpg', 1, 'The Canadian Grand Prix was first held at the circuit in 1978, where hometown hero Gilles Villeneuve (1950–1982) won for Scuderia Ferrari. ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
(2, 'rana@admin.com', '$2b$10$UO/E91KrmpjxVQ6BeRe4fuefNmdSN4QR9KWRU0BdKV47zj6gdf2sa', '2025-04-06 07:05:35'),
(3, 'hiairrick@email.com', '$2b$10$6mx0DGv/Jm0K/yibTsaPbum.fI1MGZP/W9vihWxPUugEqUh8L7Itu', '2025-04-06 07:18:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `circuits`
--
ALTER TABLE `circuits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `circuits`
--
ALTER TABLE `circuits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
