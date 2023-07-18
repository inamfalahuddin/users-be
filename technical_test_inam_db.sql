-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Jul 2023 pada 16.02
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `technical_test_inam_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230718035258-create-users.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
('09de508e-b236-45fb-8180-07db89d95977', 'In\'am Falahuddin', 'inamfalahuddin06@gmail.com', '$2b$10$u.zJdRcNJE8rxsZx6TlgheKFKzgrOO37WnmjL0REip1BMNgzgNxyW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5ZGU1MDhlLWIyMzYtNDVmYi04MTgwLTA3ZGI4OWQ5NTk3NyIsImVtYWlsIjoiaW5hbWZhbGFodWRkaW4wNkBnbWFpbC5jb20iLCJpYXQiOjE2ODk2ODgzNjAsImV4cCI6MTY4OTc3NDc2MH0.iarrTTFlHtVawrubKZdY53-KgOjoxBpS2SULm-VZvyg', '2023-07-18 13:20:48', '2023-07-18 13:52:40'),
('c6b7143e-1509-4500-9486-8017e01438b3', 'Cartanu', 'canu@gmail.com', '$2b$10$sJvTE6h4NSc2IYByE.XhXOOtDd2XIOtu4wwZ3sa2Tmp0UfJg547fe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2YjcxNDNlLTE1MDktNDUwMC05NDg2LTgwMTdlMDE0MzhiMyIsImVtYWlsIjoiY2FudUBnbWFpbC5jb20iLCJpYXQiOjE2ODk2ODg4NDcsImV4cCI6MTY4OTc3NTI0N30.UBmAp_b7CozTYpn91PhVEynuSughnraU-XKMr2v19lU', '2023-07-18 13:55:08', '2023-07-18 14:00:47');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
