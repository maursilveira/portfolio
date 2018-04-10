-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: db_portfolio
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `file` varchar(100) NOT NULL DEFAULT 'noimage',
  `extension` varchar(10) NOT NULL DEFAULT 'jpg',
  `alt` varchar(150) NOT NULL,
  `project_id` tinyint(4) NOT NULL,
  `position` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'jeb_login','jpg','JE Bearing login page',6,1),(2,'jeb_part','jpg','JE Bearing select part',6,2),(3,'jeb_tool','jpg','JE Bearing tools',6,3),(4,'jeb_contact','jpg','JE Bearing contact supervisor',6,4),(5,'jeb_supervisor','jpg','JE Bearing manager supervisor list',6,5),(6,'great_speeches_home','jpg','Great Speeches home page',5,1),(7,'great_speeches_answer','jpg','Great Speeches show answer',5,2),(8,'great_speeches_score','jpg','Great Speeches final score',5,3),(9,'choose_london_home','jpg','Choose London home page',3,1),(10,'choose_london_discover','jpg','Choose London home page desktop',3,2),(11,'choose_london_menu','jpg','Choose London mobile page',3,3),(12,'choose_london_devices','jpg','Choose London multiple devices',3,4),(13,'lotr_home','jpg','Lord of the Rings home page',1,1),(14,'lotr_gallery','jpg','Lord of the Rings photo gallery',1,2),(15,'lotr_video','jpg','Lord of the Rings characters and video pages',1,3),(16,'lotr_register','jpg','Lord of the Rings register page',1,4),(17,'octopx_home','jpg','Octopx Digital home page',4,1),(18,'octopx_devices','jpg','Octopx Digital multiple screens',4,2),(19,'octopx_projects','jpg','Octopx Digital projects page',4,3),(20,'octopx_about','jpg','Octopx Digital about page',4,4),(21,'odell_home','jpg','Odell Beckham Jr home page',2,1),(22,'odell_menu','jpg','Odell Beckham Jr menu',2,2),(23,'odell_timeline','jpg','Odell Beckham Jr timeline',2,3),(24,'odell_stats','jpg','Odell Beckham Jr stats and video',2,4),(25,'odell_market','jpg','Odell Beckham Jr market place',2,5),(26,'odell_subscribe','jpg','Odell Beckham Jr subscribe and instagram',2,6),(27,'silver_wolf_home','jpg','Silver Wolf home page',7,2),(28,'silver_wolf_grapes','jpg','Silver Wolf store mobile',7,3),(29,'silver_wolf_sections','jpg','Silver Wolf content page',7,4),(30,'silver_wolf_bottles','jpg','Silver Wolf bottles',7,5),(31,'silver_wolf_logos','jpg','Silver Wolf logos',7,1),(32,'silver_wolf_bottle','jpg','Silver Wolf bottle',7,6),(33,'live_beyond_home','jpg','Live Beyond Your Life home page',8,1),(34,'live_beyond_facts','jpg','Live Beyond Your Life facts',8,2),(35,'live_beyond_stats','jpg','Live Beyond Your Life statistics',8,3),(36,'live_beyond_devices','jpg','Live Beyond Your Life video and benefits',8,4),(37,'live_beyond_instagram','jpg','Live Beyond Your Life Instagram',8,5),(38,'live_beyond_myths','jpg','Live Beyond Your Life myths',8,6),(39,'southpaw_home','jpg','The Southpaw Whisky home page',9,1),(40,'southpaw_devices','jpg','The Southpaw Whisky recipes and about page',9,2),(41,'southpaw_history','jpg','The Southpaw Whisky history',9,3),(42,'southpaw_visit','jpg','The Southpaw Whisky book a visit',9,4),(43,'vipers_logo','jpg','Lucas Vipers logo',10,1),(44,'vipers_helmets','jpg','Lucas Vipers helmets',10,2),(45,'vipers_uniforms','jpg','Lucas Vipers uniforms',10,3),(46,'vipers_caps','jpg','Lucas Vipers caps',10,4),(47,'vipers_tshirt','jpg','Lucas Vipers t-shirt',10,5),(48,'lexus_home','jpg','Lexus of Calgary home page',11,1),(49,'lexus_commitment','jpg','Lexus of Calgary service commitment',11,2),(50,'lexus_service','jpg','Lexus of Calgary schedule service',11,3),(51,'lexus_testdrive','jpg','Lexus of Calgary test drive',11,4);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `date` varchar(100) NOT NULL,
  `cover` varchar(150) NOT NULL DEFAULT 'noimage.jpg',
  `active` tinyint(1) NOT NULL,
  `position` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'The Lord of the Rings: The Fellowship of the Ring','The goal of this project is to create a responsive website to promote the first movie of epic trilogy The Lord of the Rings as a new release or marketing campaign. <br>The website should work properly on multiple screens (mobile, tablet and desktop) and present relevant information about the movie, plot and characters. Moreover, a original teaser and trailer were required to be created as part of the project. <br>For this work, I used SASS, Greensock JS and Foundation.','August 2017','lotr_cover.jpg',1,7),(2,'Odell Beckham Jr.','This project is a rebrand of NFL player Odell Beckham Jr., one of the most important and skilled wide receivers currently in activity in the league. This is a Fanshawe College integrated project of Interactive Media Design program, in partnership with <a href=\"http://officialize.com/\" target=\"_blank\">Officialize Sports</a>. <br>We created a new visual presence for OBJ, producing a new logo, website and a promotional video. Based on his trendy style and unconventional attitude, our team used sharp elements and typography inspired on graffiti to fit properly his spirit. Although being young, Odell is considered the present and future of NFL, and his digital presence must match the huge importance he has on sports. <br>For this project, we used SASS, Greensock JS (especially Timelines) and Grunt task manager. <br>The integrants of the team are Flavia Barretto, Barbara Bombachini, Emre Filiz, Eric Lee and I.','December 2017','odell_cover.jpg',1,4),(3,'Choose London','Choose London is a fictitious campaign produced for a group integrated project in Interactive Media Design program at Fanshawe College, in partnership with <a href=\"https://www.ledc.com/\" target=\"_blank\">LEDC</a>. <br>The main goal of the campaign is to attract talented students and young professionals of tech industry to live and work in London, Ontario. Furthermore, to keep companies and investors aware of potential benefits on moving and investing in London. <br>The first part of the campaign, released in December 2017, our team created the brand Choose London and designed the website. The second part, to be released in April 2018, we will deliver the website and institutional videos to promote London as a tech destination. <br>The integrants of the team are Flavia Barretto, Barbara Bombachini, Emre Filiz, Eric Lee and I.','Coming soon','choose_london_cover.jpg',1,3),(4,'Octopx Digital','On this project, our team was required to produce a responsive website for a fictitious digital media agency based in London, Ontario. It was a great opportunity for us as students to think as real integrants of media industry. <br>It is a single page website with dummy links on portfolio projects (once we were not required to deeply detail them), but the idea is to present the design and brand characteristics of the agency. <br>We used Greensock JS for animation and Foundation framework for responsive behaviour. <br>The project team is Barbara Bombachini, Emre Filiz and I.','August 2017','octopx_cover.jpg',1,6),(5,'Great Speeches','This is an open project that required Javascript-based interactions with user. As a fan of games and the art of rhetoric, I produced a tiny game where user must hear a famous speech and guess who made it. <br>I used JSON objects to populate the page and Javascript to control user interaction and answers. <br>This project was pure fun!','July 2017','great_speeches_cover.jpg',1,8),(6,'J/E Bearing and Machine','J/E Bearing and Machine is a leader in production of bearings, power transmission supplies, maintenance and precision machining services. In order to keep high quality, training and quality control are necessary for all operators. <br>In this project, powered and managed by <a href=\"http://www.reactr.ca\" target=\"_blank\">Reactr</a> research group, our goal is to build a tablet-based web application that provides information and helps machine operators to produce properly parts and complete jobs satisfactorily. The application allows users to search for required tools and material to develop a piece, check the result, communicate supervisor, among other tasks to improve their work and final product\'s quality. <br>The application is being developed in Laravel, using SASS for styling and AJAX for content management from database. <br>The team working on this project is Clara Marshall, Barbara Bombachini and I, and release is expected to April 2018.','Coming soon','je_bearing_cover.jpg',1,1),(7,'Silver Wolf Winery','This is a branding project for a fictitious winery called Silver Wolf and its brand new Chardonnay wine. <br>For this project, I created all aspects related to the brand, including logo, label and the bottle design. A 3D model of the wine bottle was built to present its final design and shape. Furthermore, I designed a responsive website for the company and a advertisement video to promote the wine. This was an amazing experience to work on the whole process of creating a brand and its online presence. <br>To produce design material I used Adobe suite (Photoshop, Illustrator, inDesign). The 3D model was made using Cinema 4D. The video required Cinema 4D animation and Adobe After Effects.','July 2017','silver_wolf_cover.jpg',1,5),(8,'Live Beyond Your Life','Live Beyond Your Life is a campaign to make Ontarian people aware of the importance of organ donation and, most of all, engage them to register as organ donors. This is a Fanshawe College project, in partnership with <a href=\"http://lashbrook.ca\" target=\"_blank\">Lashbrook Marketing and Public Relations</a>. We designed a massive campaign, including its brand, logo, a website, advertisements and marketing campaigns. We proposed actions to engage people, such as marathons, events and partnerships with local companies to offer benefits to people when they register as organ donors. Moreover, this campaign would be largely based on social media, interacting with people and spreading the hashtag #LiveBeyondYourLife, promoting people\'s Instagram posts on our website. We hope this extensive campaign be able to call people to action and increase organ donors rate in Ontario. <br>For the development of the website, we used NodeJS as backend environment, to communicate with database (built in MySQL) and create the different routes of the website. We also used AJAX to bring information from backend to be properly displayed on the page. This project was an amazing opportunity to work more with NodeJS, an important server-side environment, that is a great alternative to traditional LAMP model, and it is becoming more and more popular. <br>The members of the project team are Flavia Barretto, Barbara Bombachini, Emre Filiz, Eric Lee and I. This project was selected by Lashbrook to be presented at Fanshawe Interactive Media\'s Industry Night, in April 2018.','April 2018','live_beyond_cover.jpg',1,2),(9,'The Southpaw Whisky','The Southpaw Whisky is a branding and development project, where I created a fictitious whisky company and its website. One important goal of this project is that I wanted to make it look real, creating the whole history about the company, how it was founded, and its characteristics as a traditional Canadian whisky company. <br>The website design is purposely clean, based on large images and short text, to attract user\'s attention. A simple&#8212;yet robust&#8212;logo animated using CSS animation gives some interesting movement to the website. I also chose wooden colours to build a consistent and cozy look and feel for the website, as an analogy to oak barrels and whisky colour. <br>Although being a simple development project, I have a special affection for this work, because it was the first branding and development project I made with a real product looking.','July 2017','southpaw_cover.jpg',1,9),(10,'Lucas Vipers','The goal of this project is to create the brand guidelines for Lucas Vipers College Football, a fictitious football team of Lucas College (also fictitious), from Woodstock, Ontario. In this project, I worked on all brand-related content, defining typography, creating the logo, explaining the visual identity, and producing a detailed branding guide summarizing all content. Moreover, using mockups and imagery, I designed the team uniforms and some products for fans, giving an even stronger identity for Lucas Vipers brand. To produce design material I used Adobe suite (Photoshop, Illustrator and inDesign).','June 2017','vipers_cover.jpg',1,11),(11,'Lexus of Calgary','This short project was a final term exam for Design and Image course of Interactive Media Design program from Fanshawe College, where students had to create new main page for Lexus of Calgary car dealer. Students were provided with assets and had three hours to build a professional-looking main page for the company. My idea for this project is to make it clean and straightforward, helping user to find easily what they are looking for. I combined photos with shapes and masks to build large sections with catching images and headings, and a button to take user to desired link. <br>This project was a great opportunity to put into practice concepts of design and build a real product for an existing brand.','August 2017','lexus_cover.jpg',1,10);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-10  0:23:26
