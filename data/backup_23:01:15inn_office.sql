-- phpMyAdmin SQL Dump
-- version 3.5.8.1
-- http://www.phpmyadmin.net
--
-- Machine: localhost:3306
-- Genereertijd: 23 jan 2015 om 16:46
-- Serverversie: 5.1.73
-- PHP-versie: 5.3.29

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `inn_office`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `contacts`
--

CREATE TABLE IF NOT EXISTS `contacts` (
  `contactId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `contactPerson` varchar(200) NOT NULL,
  `street` varchar(300) NOT NULL,
  `zipcode` varchar(7) NOT NULL,
  `city` varchar(130) NOT NULL,
  `web` varchar(1000) NOT NULL,
  `email` varchar(500) NOT NULL,
  `telephone` varchar(30) NOT NULL,
  `rate` decimal(10,0) NOT NULL,
  `info` text NOT NULL,
  PRIMARY KEY (`contactId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Gegevens worden uitgevoerd voor tabel `contacts`
--

INSERT INTO `contacts` (`contactId`, `name`, `contactPerson`, `street`, `zipcode`, `city`, `web`, `email`, `telephone`, `rate`, `info`) VALUES
(11, 'Monique Speelman Communicatie', 'Monique Speelman', 'Burgemeester Knappertlaan 16a', '3117 BA', 'Schiedam', 'www.speelmancommunicatie.nl', 'info@moniquespeelman.nl', '', 60, ''),
(10, 'Bits of Science', 'Rolf Schuttenhelm', '', '', '', '', '', '', 0, ''),
(9, 'Google Inc', 'New Business Development, Lily Laws', '1600 Amphitheatre Parkway, Mountain View', 'CA 9404', '', '', 'lilylaws@google.com', '', 60, ''),
(7, 'Safety Changer', 'Bas de Bruin', 'Maerten Trompstraat 25', '2628 RC', 'Delft', '', '', '', 0, ''),
(8, 'Daily Milk', 'Klaas-Jan Bernouw', 'Eendrachtsweg 21', '3012 LB', 'Rotterdam', '', '', '', 75, ''),
(6, 'Betonmeubels', '', '', '', '', '', '', '', 0, ''),
(5, 'Onium NV', 'Marcel Klauwer', 'Postbus 150', '5250 AD', 'Vlijmen', 'www.onium.nl', '', '', 75, ''),
(3, 'Zotte Veilingen', '', '', '', '', '', '', '', 0, ''),
(4, 'm.l.v. Castor', 'Mario van Parijs', 'Postbus 50533', '3007 JA', 'Rotterdam', 'www.mlv-castor.nl', '', '', 0, ''),
(2, 'de Grevelingen', 'Jeroen Buijs', 'Havenweg 1', '3244 LK', 'Nieuwe Tonge', '', '', '', 60, ''),
(1, 'Havencommunicatie', 'Marjolein Boer', 'Prins Hendrikkade 147a', '3071 KN', 'Rotterdam', '', '', '', 60, '-'),
(12, '2d3d', 'Gerben Starink', 'Caballerofabriek Saturnusstraat 60, unit 77', '2516 AH', 'Den Haag', 'www.2d3d.nl', 'gerben@2d3d.nl', '31 (0)70 362 4141', 60, ''),
(13, 'Team Hilgersom', 'Arjan Hilgersom', 'Kappeweg 9', '8131 PT', 'Wijhe', 'http://www.teamhilgersom.nl', 'info@teamhilgersom.nl', '', 60, ''),
(14, 'Ankur', '', '', '', '', '', '', '', 0, ''),
(15, 'Almende', 'Anne van Rossum', '', '', '', '', '', '', 0, ''),
(16, 'Arttech', 'Mattijs Kneppers', '', '', '', '', '', '', 0, '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `hours`
--

CREATE TABLE IF NOT EXISTS `hours` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `projectid` int(3) NOT NULL,
  `memberid` int(3) NOT NULL,
  `time` int(5) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Gegevens worden uitgevoerd voor tabel `hours`
--

INSERT INTO `hours` (`id`, `projectid`, `memberid`, `time`, `date`, `description`) VALUES
(13, 15, 2, 900, '0000-00-00 00:00:00', 'onbekend'),
(12, 15, 1, 900, '0000-00-00 00:00:00', 'onbekend'),
(11, 4, 1, 4320, '0000-00-00 00:00:00', 'Arbeid 2014');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `projectId` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(99) NOT NULL,
  `projectStatus` varchar(99) NOT NULL,
  `contactId` int(11) NOT NULL,
  `memberId` int(3) NOT NULL,
  `hours` int(5) NOT NULL,
  `rate` int(5) NOT NULL,
  `discount` int(5) NOT NULL,
  `fixedTotal` int(8) NOT NULL,
  `currency` varchar(9) NOT NULL,
  `tenders` longtext NOT NULL,
  `invoices` longtext NOT NULL,
  `tenderAttachments` longtext NOT NULL,
  `invoiceAttachments` longtext NOT NULL,
  `year` int(4) NOT NULL,
  `comments` longtext NOT NULL,
  PRIMARY KEY (`projectId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Gegevens worden uitgevoerd voor tabel `projects`
--

INSERT INTO `projects` (`projectId`, `projectName`, `projectStatus`, `contactId`, `memberId`, `hours`, `rate`, `discount`, `fixedTotal`, `currency`, `tenders`, `invoices`, `tenderAttachments`, `invoiceAttachments`, `year`, `comments`) VALUES
(1, 'Constructie www.speelmancommunicatie.nl en constructie yoga site', '4', 11, 2, 25, 60, 0, 0, '€', '[]', '[{"type":"Factuur","jaar":2014,"nr":8,"datum":{"d":20,"m":11,"j":2014},"klant":{"naam":"Monique Speelman Communicatie","contact":"Monique Speelman","adres":"Burgemeester Knappertlaan 16a","postcode":"3117 BA Schiedam"},"bedrijf":{"contact":"Arjen Duinhouwer","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Constructie www.speelmancommunicatie.nl en constructie www.do-in.tv","posten":[{"type":"bedrag","titel":"Constructie www.speelmancommunicatie.nl","bedrag":"750"},{"type":"bedrag","titel":"Constructie www.do-in.tv","bedrag":"750"}],"onkosten":[],"betaald":true}]', '[]', '[]', 2014, ''),
(2, 'Constructie Parking Delft', '3', 12, 2, 25, 60, 0, 0, '€', '[]', '[{"type":"Factuur","jaar":2015,"nr":2,"datum":{"d":16,"m":1,"j":2015},"klant":{"naam":"2d3d","contact":"Gerben Starink","adres":"Caballerofabriek Saturnusstraat 60, unit 77","postcode":"2516 AH Den Haag"},"bedrijf":{"naam":"Innouveau","contact":"Arjen Duinhouwer","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG, Rotterdam"},"omschrijving":"Constructie Parking Delft","posten":[{"type":"uren","titel":"Werkzaamheden volgens offerte","uren":"21","tarief":"60"},{"type":"bedrag","titel":"Marge meerwerk (volgens offerte)","bedrag":"189"},{"type":"uren","titel":"Meerwerk volgens afspraak 8/12/14","uren":"2","tarief":"60"},{"type":"uren","titel":"Meerwerk volgens afspraak 6/1/14","uren":"2.5","tarief":"60"}],"onkosten":[],"betaald":false,"$$hashKey":"04J"}]', '[]', '[]', 2015, '2.5 extra uren factureren'),
(3, 'Restyling www.bitsofscience.org', '0', 10, 1, 0, 0, 0, 0, '€', '[]', '[]', '[]', '[]', 2015, ''),
(4, 'Metapolator UI 2015', '2', 9, 1, 80, 80, 0, 0, '$', '[]', '[]', '[]', '[]', 2015, ''),
(5, 'Identiteit Safety Changer', '4', 7, 1, 56, 75, 50, 0, '€', '[]', '[{"type":"Factuur","jaar":2014,"nr":6,"datum":{"d":21,"m":9,"j":2014},"klant":{"naam":"Safety Changer","contact":"Bas de Bruin","adres":"Maerten Trompstraat 25","postcode":"2628 RC Delft"},"bedrijf":{"contact":"Jeroen Breen","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Identiteit Safety Changer","posten":[{"type":"bedrag","titel":"Fase I en II - concept en uitwerking logo","bedrag":"1500"}],"onkosten":[],"betaald":true}, {"type":"Factuur","jaar":2014,"nr":7,"datum":{"d":10,"m":11,"j":2014},"klant":{"naam":"Safety Changer","contact":"Bas de Bruin","adres":"Maerten Trompstraat 25","postcode":"2628 RC Delft"},"bedrijf":{"contact":"Jeroen Breen","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Identiteit Safety Changer fase III-A,B,C IV","posten":[{"type":"bedrag","titel":"Fase III A en B","bedrag":"1500"},{"type":"bedrag","titel":"Fase III C en D","bedrag":"1000"},{"type":"bedrag","titel":"Nazorg website mbt correcties en hulp Angvish als Fase IV","bedrag":"150"}],"onkosten":[],"betaald":true}]', '[]', '[]', 2014, ''),
(6, 'Ontwerp en constructie www.havencommunicatie.nl', '4', 1, 2, 40, 60, 600, 0, '€', '[]', '[{"type":"Factuur","jaar":2014,"nr":1,"datum":{"d":7,"m":4,"j":2014},"klant":{"naam":"Havencommunicatie","contact":"Marjolein Boer","adres":"Prins Hendrikkade 147a","postcode":"3071 KN Rotterdam"},"bedrijf":{"contact":"Arjen Duinhouwer","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Ontwerp en constructie www.havencommunicatie.nl","posten":[{"type":"bedrag","titel":"Grafisch ontwerp","bedrag":"1200"},{"type":"bedrag","titel":"Constructie","bedrag":"1200"},{"type":"bedrag","titel":"Korting a 25%","bedrag":"-600"}],"onkosten":[],"betaald":true}]', '[]', '[]', 2014, ''),
(7, 'Ontwerp en constructie www.degrevelingen.nl', '4', 2, 1, 45, 60, 200, 0, '€', '[]', '[{"type":"Factuur","jaar":2014,"nr":2,"datum":{"d":21,"m":5,"j":2014},"klant":{"naam":"de Grevelingen","contact":"Jeroen Buijs","adres":"Havenweg 1","postcode":"3244 LK Nieuwe Tonge"},"bedrijf":{"contact":"Jeroen Breen","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Ontwerp en constructie www.degrevelingen.nl","posten":[{"type":"bedrag","titel":"Ontwerp en constructie","bedrag":"2500"}],"onkosten":[],"betaald":true}]', '[]', '[]', 2014, ''),
(8, 'Stramien factuur Havencommunicatie', '4', 1, 1, 2, 60, 0, 0, '€', '[]', '[{"type":"Factuur","jaar":2014,"nr":3,"datum":{"d":21,"m":5,"j":2014},"klant":{"naam":"Havencommunicatie","contact":"Marjolein Boer","adres":"Prins Hendrikkade 147a","postcode":"3071 KN Rotterdam"},"bedrijf":{"contact":"Jeroen Breen","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Stramien factuur Havencommunicatie","posten":[{"type":"uren","titel":"Grafisch ontwerp","uren":"1","tarief":"60"},{"type":"uren","titel":"Constructie","uren":".5","tarief":"60"},{"type":"uren","titel":"Aanpassingen","uren":".5","tarief":"60"}],"onkosten":[],"betaald":true}]', '[]', '[]', 2014, ''),
(9, 'Ontwerp brochure Elffers', '4', 8, 1, 7, 75, 25, 0, '€', '[]', '[{"type":"Factuur","jaar":2014,"nr":4,"datum":{"d":7,"m":8,"j":2014},"klant":{"naam":"Daily Milk","contact":"Klaas-Jan Bernouw","adres":"Eendrachtsweg 21","postcode":"3012 LB Rotterdam"},"bedrijf":{"contact":"Jeroen Breen","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Ontwerp brochure Elffers","posten":[{"type":"bedrag","titel":"Ontwerp brohcure Elffers","bedrag":"500"}],"onkosten":[],"betaald":true}]', '[]', '[]', 2014, ''),
(10, 'Ontwerp en constructie www.onium.nl', '4', 5, 2, 40, 75, 0, 0, '€', '[]', '[{"type":"Factuur","jaar":2014,"nr":5,"datum":{"d":27,"m":8,"j":2014},"klant":{"naam":"Onium NV","contact":"Marcel Klauwer","adres":"Postbus 150","postcode":"5250 AD Vlijmen"},"bedrijf":{"contact":"Arjen Duinhouwer","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Ontwerp en constructie www.onium.nl","posten":[{"type":"bedrag","titel":"Ontwerp en constructie www.onium.nl","bedrag":"3000"}],"onkosten":[],"betaald":true}]', '[]', '[]', 2014, ''),
(11, 'PipingCare', '1', 1, 2, 40, 60, 0, 0, '€', '[]', '[]', '["offerte Innouveau tav PipingCare.pdf"]', '[]', 2015, 'Uitstel ivm oliecrisis'),
(12, 'Angular Magazine | Eigen initiatief', '2', 12, 2, 600, 0, 0, 0, '€', '[]', '[]', '[]', '[]', 2015, ''),
(15, 'Herbouw www.hygear.nl', '3', 12, 2, 28, 60, 0, 0, '€', '[{"type":"Offerte","jaar":2014,"nr":1,"datum":{"d":17,"m":11,"j":2014},"klant":{"naam":"2d3d","contact":"Gerben Starink","adres":"Caballerofabriek Saturnusstraat 60, unit 77","postcode":"2516 AH Den Haag"},"bedrijf":{"contact":"Arjen Duinhouwer","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG Rotterdam"},"omschrijving":"Herbouw www.hygear.nl","posten":[{"type":"kopje","titel":"<b>Omzetten ontwerp naar Wordpress Theme</b>"},{"type":"uren","titel":"Vertaling ontwerp naar php templates","uren":"16","tarief":"60"},{"type":"uren","titel":"Nabouwen overlay menu css/jss","uren":"1","tarief":"60"},{"type":"uren","titel":"Implementatie kalender","uren":"2","tarief":"60"},{"type":"uren","titel":"Implementatie slider","uren":"1","tarief":"60"},{"type":"enter"},{"type":"uren","titel":"Debuggen en opleveren","uren":"4","tarief":"60"},{"type":"uren","titel":"Stelpost onvoorzien","uren":"4","tarief":"60"},{"type":"kopje","titel":"Meerwerk buiten de offerte a 60 EUR/uur"}],"onkosten":[],"betaald":false,"$$hashKey":"043"}]', '[{"type":"Factuur","jaar":2015,"nr":1,"datum":{"d":16,"m":1,"j":2015},"klant":{"naam":"2d3d","contact":"Gerben Starink","adres":"Caballerofabriek Saturnusstraat 60, unit 77","postcode":"2516 AH Den Haag"},"bedrijf":{"naam":"Innouveau","contact":"Arjen Duinhouwer","adres":"Prins Hendrikstraat 13D","postcode":"3071 LG, Rotterdam"},"omschrijving":"Herbouw www.hygear.nl","posten":[{"type":"bedrag","titel":"Verhuizing www.hygear.nl","bedrag":"100"},{"type":"bedrag","titel":"Reparaties www.hygear.nl","bedrag":"60"},{"type":"uren","titel":"Werkzaamheden herbouw volgens offerte","uren":"28","tarief":"60"}],"onkosten":[],"betaald":false,"$$hashKey":"048"}]', '[]', '[]', 2015, ''),
(18, 'Internet of Things', '0', 15, 1, 0, 60, 0, 0, '€', '[]', '[]', '[]', '[]', 2015, ''),
(19, 'Website Showsync', '0', 16, 1, 0, 60, 0, 0, '€', '[]', '[]', '[]', '[]', 2015, 'Afspraak met Mattijs: doen we gratis'),
(20, 'Royal Haskoning', '1', 12, 2, 0, 60, 0, 0, '€', '[]', '[]', '[]', '[]', 2015, ''),
(21, 'De beste praktijkopleider', '1', 13, 1, 20, 60, 0, 0, '€', '[]', '[]', '[]', '[]', 2015, ''),
(23, 'Hans Peterse', '0', 12, 2, 0, 60, 0, 0, '€', '[]', '[]', '[]', '[]', 2015, '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `initials` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Gegevens worden uitgevoerd voor tabel `team`
--

INSERT INTO `team` (`id`, `name`, `initials`) VALUES
(1, 'Jeroen Breen', 'JB'),
(2, 'Arjen Duinhouwer', 'AD');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `timestamp`
--

CREATE TABLE IF NOT EXISTS `timestamp` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `timestamp` varchar(99) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Gegevens worden uitgevoerd voor tabel `timestamp`
--

INSERT INTO `timestamp` (`id`, `timestamp`) VALUES
(1, '1422027525444'),
(2, '1422027899181');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
