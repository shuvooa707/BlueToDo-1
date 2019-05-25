-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2019 at 03:21 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `list_name` varchar(10000) NOT NULL,
  `username` varchar(200) NOT NULL,
  `primary_key` mediumtext NOT NULL,
  `is_selected` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`list_name`, `username`, `primary_key`, `is_selected`) VALUES
('Goals 2019', 'shuvo', '2019454859', 0),
('Things To Buy', 'shuvo', '2019454928', 0),
('Projects To Do', 'shuvo', '2019461158', 0),
('Places To Visit', 'shuvo', '2019461435', 0),
('Movies To Download', 'shuvo', '2019452038', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `username` varchar(100) NOT NULL,
  `taskname` varchar(200) NOT NULL,
  `status` varchar(20) NOT NULL,
  `primary_key` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`username`, `taskname`, `status`, `primary_key`) VALUES
('shuvo', 'A Head Phone', 'done', '2019454928'),
('shuvo', 'An UPS', 'unfinished', '2019454928'),
('shuvo', 'Nuts', 'unfinished', '2019454928'),
('shuvo', 'To Do List', 'done', '2019461158'),
('shuvo', 'CMS ( Blog Post Site )', 'unfinished', '2019461158'),
('shuvo', 'Poll Site', 'unfinished', '2019461158'),
('shuvo', 'Social Media Site', 'unfinished', '2019461158'),
('shuvo', 'Voirob', 'unfinished', '2019461435'),
('shuvo', 'Shariatpur', 'unfinished', '2019461435'),
('shuvo', 'Comilla', 'unfinished', '2019461435'),
('shuvo', 'A Keyboard', 'unfinished', '2019454928'),
('shuvo', 'An Arm Chair', 'unfinished', '2019454928'),
('shuvo', 'A Mouse', 'done', '2019454928'),
('shuvo', 'A Monitor 19-27\"', 'unfinished', '2019454928'),
('shuvo', '12GB SSD', 'unfinished', '2019454928'),
('shuvo', 'E-Commerce Site', 'unfinished', '2019461158'),
('shuvo', 'Eat Clean', 'unfinished', '2019454859'),
('shuvo', 'Reduce Smart Phone Use and Internet Usage', 'unfinished', '2019454859'),
('shuvo', 'Get a Job', 'unfinished', '2019454859'),
('shuvo', 'Have Some Very Good Friends', 'unfinished', '2019454859'),
('shuvo', 'Travel Every Visit-able Place in the City', 'unfinished', '2019454859'),
('shuvo', 'Travel at least 20 districts', 'unfinished', '2019454859'),
('shuvo', 'Get More Lean and Fit', 'unfinished', '2019454859'),
('shuvo', 'Make An Epic Facebook Profile', 'unfinished', '2019454859'),
('shuvo', 'Become a Badass Web Developer', 'unfinished', '2019454859'),
('shuvo', 'Learn Violin', 'unfinished', '2019454859'),
('shuvo', 'Read At Least 20 Books', 'unfinished', '2019454859'),
('shuvo', 'Start a YouTube Channel', 'unfinished', '2019454859'),
('shuvo', 'Know Thyself', 'unfinished', '2019454859'),
('shuvo', 'Fix My Relation With my Family', 'unfinished', '2019454859'),
('shuvo', 'Build a Garden', 'unfinished', '2019454859'),
('shuvo', 'Avengers : End Game', 'unfinished', '2019452038'),
('shuvo', 'Tare Zameen Par', 'unfinished', '2019452038'),
('shuvo', 'Papilion', 'unfinished', '2019452038'),
('shuvo', 'Lord of The Rings', 'unfinished', '2019452038'),
('shuvo', 'A Touch Pad', 'unfinished', '2019454928'),
('shuvo', 'The Great Escape', 'unfinished', '2019452038'),
('shuvo', 'GodFather', 'unfinished', '2019452038'),
('shuvo', 'Nowga', 'unfinished', '2019461435');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `id`) VALUES
('sojol', 'abcd', 2),
('rana', 'rana', 2),
('shuvo', 'shuvo', 2),
('touhid', 'touhid', 2),
('selim', 'selim', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
