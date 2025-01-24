-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2025 at 08:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `promotion_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `qty` int(11) DEFAULT NULL,
  `net_total` decimal(10,2) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `qty`, `net_total`, `product_id`, `unit_price`, `discount`, `created_at`, `updated_at`) VALUES
(1, 9, 'pending', 1, 316.00, 7, 319.00, 3.00, '2025-01-23 17:51:42', '2025-01-23 17:51:42'),
(3, 9, 'pending', 1, 316.00, 7, 319.00, 3.00, '2025-01-24 17:37:29', '2025-01-24 17:37:29'),
(4, 11, 'pending', 1, 828.00, 9, 828.00, 0.00, '2025-01-24 18:45:17', '2025-01-24 18:45:17');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `status` varchar(3) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `description`, `price`, `weight`, `status`, `qty`, `name`) VALUES
(3, 'Quo dolor laboriosam', 1.00, 52.00, '739', 1, 'Grant Diaz'),
(7, 'Rerum harum saepe id', 319.00, 7000.00, '1', 451, 'Alexis Strickland'),
(9, 'Ea est dicta eos min', 521.00, 320.00, '828', 1, 'Hakeem Mcdonald'),
(10, 'Animi ducimus vel ', 471.00, 200.00, '388', 1, 'Melinda Campos');

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start_date` varchar(150) DEFAULT NULL,
  `end_date` varchar(150) DEFAULT NULL,
  `promotion_type` varchar(50) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `status` int(3) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `title`, `start_date`, `end_date`, `promotion_type`, `discount`, `status`) VALUES
(5, 'Odio nobis proident', '1999-01-14', '1991-08-18', 'fixed', 18.00, 1),
(6, 'Odio nobis proident', '1999-01-14', '1991-08-18', 'fixed', 18.00, 0),
(7, 'Odio nobis proident', '1999-01-14', '1991-08-18', 'fixed', 18.00, 1),
(8, 'Natus cupiditate ali', '2011-11-07', '2018-09-23', 'fixed', 200.00, 0),
(9, 'Velit fuga Enim omn', '2007-09-06', '2005-06-16', 'percentage', 20.00, 1),
(12, 'Cupidatat velit nequ', '2025-01-01', '2025-06-26', 'weighted', 297.00, 1),
(13, 'Nulla distinctio Do', '2011-09-02', '2017-09-20', 'fixed', 299.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `promotion_item_details`
--

CREATE TABLE `promotion_item_details` (
  `id` int(11) NOT NULL,
  `promotion_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `promotion_item_details`
--

INSERT INTO `promotion_item_details` (`id`, `promotion_id`, `product_id`, `created_at`, `updated_at`) VALUES
(4, 12, 3, '2025-01-22 13:16:31', '2025-01-22 13:16:31'),
(5, 12, 7, '2025-01-22 13:16:31', '2025-01-22 13:16:31'),
(7, 13, 3, '2025-01-22 13:16:57', '2025-01-22 13:16:57'),
(8, 13, 7, '2025-01-22 13:16:57', '2025-01-22 13:16:57');

-- --------------------------------------------------------

--
-- Table structure for table `slabs`
--

CREATE TABLE `slabs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `min_weight` decimal(10,2) NOT NULL,
  `max_weight` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `per_gm` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `slabs`
--

INSERT INTO `slabs` (`id`, `name`, `min_weight`, `max_weight`, `discount`, `per_gm`) VALUES
(1, 'SLAB 1', 1000.00, 5500.00, 2.00, 500.00),
(2, 'SLAB 2 ', 6000.00, 8500.00, 3.00, 500.00),
(3, 'SLAB 3', 9000.00, 11500.00, 4.00, 500.00),
(4, 'SLAB 4', 12000.00, 99999999.99, 5.00, 500.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` enum('admin','user','guest') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `type`, `password`, `created_at`, `updated_at`) VALUES
(9, 'Kazi Sifat Al Maksud', 'user@gmail.com', 'user', '$2a$10$Jg6FcFKK/iYOydySOskmUOjnd5O1QJInONqoa.qVNUoAERl9Fqv0.', '2025-01-22 19:26:35', '2025-01-22 19:26:35'),
(10, 'Sifat Admin', 'admin@gmail.com', 'admin', '$2a$10$/d6wzB9JrTlIVzWKYOKmgu9JDDU8WJf0UUDgmCDXDCqgChQhtIuES', '2025-01-22 19:31:06', '2025-01-22 19:31:06'),
(11, 'sifat', 'sifat@gmail.com', 'user', '$2a$10$JxMb1RU6vE6vb7RCdwbWCe4GjFidbeMatM8LiW32zGwj4tk/SVFSG', '2025-01-24 18:19:20', '2025-01-24 18:19:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `promotion_id` (`promotion_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promotion_item_details`
--
ALTER TABLE `promotion_item_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_promotion` (`promotion_id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Indexes for table `slabs`
--
ALTER TABLE `slabs`
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
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `promotion_item_details`
--
ALTER TABLE `promotion_item_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `slabs`
--
ALTER TABLE `slabs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `promotion_item_details`
--
ALTER TABLE `promotion_item_details`
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_promotion` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
