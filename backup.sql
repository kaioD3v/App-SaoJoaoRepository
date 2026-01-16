-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: tccnovo
-- ------------------------------------------------------
-- Server version	8.0.40

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

CREATE DATABASE IF NOT EXISTS tccnovo;
USE tccnovo;

--
-- Table structure for table `atracao`
--

DROP TABLE IF EXISTS `atracao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atracao` (
  `code` int NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `ordem` int DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `principal` tinyint(1) NOT NULL,
  `urlimagem` varchar(255) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `handle` (`handle`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atracao`
--

LOCK TABLES `atracao` WRITE;
/*!40000 ALTER TABLE `atracao` DISABLE KEYS */;
INSERT INTO `atracao` VALUES (1,'flavio_jose',1,'Flávio José','Ícone do forró pé-de-serra, animando o público com sua sanfona e clássicos do Nordeste.',0,'https://tse3.mm.bing.net/th/id/OIP.oHTNuxqE6-QjnqqWFYaq3QAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3'),(2,'jorge_de_altinho',2,'Jorge de Altinho','Cantor pernambucano de forró romântico, conhecido por seu carisma e performances envolventes.',0,'https://thiagolagos.com.br/wp-content/uploads/2017/06/IMG_2461.jpg?x71908'),(3,'elba_ramalho',3,'Elba Ramalho','Rainha do forró e da música nordestina, mistura tradição com energia vibrante no palco.',1,'https://maringapost.com.br/wp-content/uploads/2023/04/5a89876b5c84.jpg'),(4,'geraldinho_lins',1,'Geraldinho Lins','Especialista em forró romântico, encantando plateias com sua voz marcante e melodias cativantes.',0,'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2022/06/geraldinho.jpg'),(5,'petrucio_amorim',2,'Petrúcio Amorim','Referência do forró tradicional, com interpretações suaves e animadas, perfeitas para dançar.',0,'https://imagens.ne10.uol.com.br/legado/blogsne10/social1/uploads/2014/05/PETRUCIO_AMORIM_Foto_AndreaRegoBarros_0260.jpg'),(6,'dorgival_dantas',3,'Dorgival Dantas','Conhecido como \'O Rei da Voz de Ouro\', mistura forró e emoção em apresentações inesquecíveis.',1,'https://assets.blogdobg.com.br/uploads/dorgival211.jpg'),(7,'yonara_medeiros',1,'Yonara Medeiros','Atração musical.',0,'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2022/06/sla.png'),(8,'cassiane',2,'Cassiane','Atração musical.',1,'https://s2-g1.glbimg.com/YmGUi4CeWc-w7TW04TbK0XHLUh0=/0x81:1027x997/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/w/f/vj9MNkSlikOSUVcpKnNg/whatsapp-image-2023-12-30-at-17.02.14.jpeg');
/*!40000 ALTER TABLE `atracao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atracaoexibicao`
--

DROP TABLE IF EXISTS `atracaoexibicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atracaoexibicao` (
  `fkatracao` int NOT NULL,
  `fkexibicao` int NOT NULL,
  PRIMARY KEY (`fkatracao`,`fkexibicao`),
  KEY `fkexibicao` (`fkexibicao`),
  CONSTRAINT `atracaoexibicao_ibfk_1` FOREIGN KEY (`fkatracao`) REFERENCES `atracao` (`code`),
  CONSTRAINT `atracaoexibicao_ibfk_2` FOREIGN KEY (`fkexibicao`) REFERENCES `exibicao` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atracaoexibicao`
--

LOCK TABLES `atracaoexibicao` WRITE;
/*!40000 ALTER TABLE `atracaoexibicao` DISABLE KEYS */;
INSERT INTO `atracaoexibicao` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8);
/*!40000 ALTER TABLE `atracaoexibicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atracaotags`
--

DROP TABLE IF EXISTS `atracaotags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atracaotags` (
  `fkatracao` int NOT NULL,
  `fktag` int NOT NULL,
  PRIMARY KEY (`fkatracao`,`fktag`),
  KEY `fktag` (`fktag`),
  CONSTRAINT `atracaotags_ibfk_1` FOREIGN KEY (`fkatracao`) REFERENCES `atracao` (`code`),
  CONSTRAINT `atracaotags_ibfk_2` FOREIGN KEY (`fktag`) REFERENCES `tag` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atracaotags`
--

LOCK TABLES `atracaotags` WRITE;
/*!40000 ALTER TABLE `atracaotags` DISABLE KEYS */;
INSERT INTO `atracaotags` VALUES (1,7),(2,7),(3,7),(5,7),(6,7),(7,7);
/*!40000 ALTER TABLE `atracaotags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipe` (
  `code` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `turma` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `funcao` varchar(255) DEFAULT NULL,
  `ano` varchar(50) NOT NULL,
  `urlimagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipe`
--

LOCK TABLES `equipe` WRITE;
/*!40000 ALTER TABLE `equipe` DISABLE KEYS */;
INSERT INTO `equipe` VALUES (3,'Kaio Matheus Abdon de Moura','((3TDSA))','mourakaio@outlook.com','Desevolper FrontEnd','2025','local:KAIO.jpg'),(4,'João Guilherme de Lima Arruda','(3TDSA)','joaoguilhermedelimaarruda@gmail.com','Scrum Master','2025','local:JOAO.jpg'),(5,'Kauã Ycaro Souto Silva','(3TDSA)','kauayssa@gmail.com','Desevolper FrontEnd','2025','local:KAUA.jpg'),(6,'Ingridy Neuza de Melo Silva','(3TDSA)','Ingridysilvacontato@gmail.com','Product Owner','2025','local:INGRIDY.jpg'),(7,'Italo da Silva de Barros','(3TDSA)','itallob65@gmail.com','Desevolper BackEnd','2025','local:ITALO.jpg'),(8,'Eduardo Sousa Noronha','(3TDSA)','enoronha136@gmail.com','Desevolper BackEnd','2025','local:EDUARDO.jpg'),(9,'Vinícius Daniel Souza Alves','(3TDSA)','viniciusdanielsalves@gmail.com','Desevolper BackEnd','2025','local:TAROBA.jpg');
/*!40000 ALTER TABLE `equipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `code` int NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `inicio` date NOT NULL,
  `fim` date DEFAULT NULL,
  `horario` time NOT NULL,
  `endereco` varchar(500) NOT NULL,
  `latitude` decimal(8,5) NOT NULL,
  `longitude` decimal(8,5) NOT NULL,
  `urlimagem` varchar(255) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `handle` (`handle`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'Suspiro_Gigante','Suspiro Gigante','A festa promete uma celebração inesquecível dedicada a uma das sobremesas mais adoradas: o suspiro.','2025-05-11','2025-05-11','14:00:00','R. Veranice de Melo Santos - Maria Auxiliadora',-8.27620,-35.99550,'https://static.itdg.com.br/images/1200-630/f847795e69c8fe8c3adb06dcfa7e0772/shutterstock-2130919517.jpg'),(2,'mesajunina','Mesa Junina','A Mesa Junina conta com diversos pratos típicos da cidade que todo caruaruense ama.','2025-05-18','2025-05-18','19:00:00','Vila Lajes, Caruaru - PE',-8.08020,-36.04070,'https://s2-g1.glbimg.com/WaoGsuXO3YPHmu-wQ87qHmBIHEA=/0x0:2048x1359/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/h/9/vntKy1T2619NhRDE4eMw/27786207161-68a2cc5db9-k.jpg'),(3,'cuscuz','Cuscuz Gigante','Uma ocasião em que se prepara um cuscuz de grandes proporções, homenageando essa iguaria tradicionalmente consumida em diversas regiões.','2025-06-09','2025-06-09','19:00:00','R. Julio Fernandes, Alto do Moura',-8.28550,-36.00750,'https://conteudo.imguol.com.br/c/entretenimento/0c/2023/06/12/maior-cuscuz-do-mundo-1686605747172_v2_4x3.png'),(4,'Festival_Caldo_de_Cana','Festival do Caldo de Cana','Caldo de cana distribuído para a multidão com muito forró.','2025-05-18','2025-05-18','19:00:00','R. Dep. Torres Galvão - Salgado, Caruaru - PE',-8.27190,-35.95820,'https://midias.agazeta.com.br/2023/07/18/pastel-e-caldo-de-cana-da-pastelaria-california-em-ibiracu-1810302.jpg'),(5,'pamonha','Pamonheiro Gigante','Muita pamonha acompanhado pé de serra e muito forró.','2025-05-19','2025-05-19','16:00:00','R. Antônio André - Maria Auxiliadora',-8.27490,-35.99270,'https://www.jornaloeste.com.br/imgsite/noticias/amp-Foto2G.jpg'),(6,'maior_caldinho','Maior Caldinho do Mundo','A festa do Maior Caldinho do Mundo é um dos principais símbolos da festa junina em Caruaru, atraindo caruaruenses de todos os bairros.','2025-05-25','2025-05-25','19:00:00','Academia da Cidade - São José da Escócia',-8.26760,-35.95260,'https://comidasgigantesoficial2.wordpress.com/wp-content/uploads/2018/02/1.jpg'),(7,'macadoamor','Festa da Maçã do Amor','Uma celebração dedicada à maçã do amor, uma guloseima feita com maçãs caramelizadas em palitos, muito apreciada em festas e evento.','2025-06-12','2025-06-12','18:00:00','R. Cortês - Boa Vista I',-8.27880,-35.98830,'https://blogdoedvaldomagalhaes.com.br/wp-content/uploads/2023/06/09FA37D9-3A08-45E0-8182-A0989CDE99FF.jpeg'),(8,'pipocamundo','Maior Pipoca do Mundo','A Maior Pipoca do Mundo conta com mais de 14 mil pacotes de pipoca que são entregues durante o evento','2025-06-12','2025-06-12','19:00:00','Praça da Juventude - Rendeiras',-8.27960,-35.93220,'https://comidasgigantesoficial2.wordpress.com/wp-content/uploads/2018/02/dsc5976.jpg'),(9,'bolochocolate','Maior Bolo de Chocolate','A tradicional festa do maior bolo de chocolate ganhou as ruas do José Carlos de Oliveira. O bolo é feito em conjunto com moradores do bairro e o evento contou com grande público.','2025-05-31','2025-05-31','19:00:00','R. Sebastião Luiz da Silva - José Carlos de Oliveira',-8.27580,-36.00460,'https://lh3.googleusercontent.com/-kVBBPYJecQg/YppTpxpSJ7I/AAAAAAABGOI/MKvS8fGtHS0mbINP6yPG8a--253m410CgCNcBGAsYHQ/s1600/IMG-20220603-WA0088.jpg'),(10,'bolodemilho','Bolo de Milho Gigante','A festa do “Maior Bolo de Milho do Mundo” atraiu milhares de pessoas em Caruaru, no Agreste de Pernambuco. Foram utilizados no bolo mais de 100 litros de leite, 1.100 ovos, 50 kg de trigo, 10 kg de margarina, além de 34 pacotes de farinha de milho.\n\n','2025-06-13','2025-06-13','19:00:00','R. Barão de Itamaracá - Indianópolis',-8.28440,-35.95910,'https://s2.glbimg.com/C3ID20oIMr20oNJpPP6dFGMbs_o=/620x465/s.glbimg.com/jo/g1/f/original/2014/06/13/dsc04061.jpg'),(11,'engordamarido','Bolo Gigante Engorda Marido','Aproximada três metros de bolo, distribuídos para aproximadamente 1500 pessoas. A animação conta com muito forró.','2025-06-08','2025-06-08','18:00:00','Roberto Simonsen - Salgado',-8.27180,-35.95630,'https://receitinhas.com.br/wp-content/uploads/2022/09/maxresdefault-2022-09-29T101734.420-1024x576.jpg'),(12,'dobradinha','Dobradinha Gigante','Com a ajuda de toda a população, a comida gigante contou com 15 quilos de feijão, 15 de bacon, 15 de calabresa e 7 de batata. O evento ainda teve muito forró e quadrilha que animou a noite dos forrozeiros.','2025-06-06','2025-06-06','19:00:00','R. Santa Maria da Boa Vista - Boa Vista II',-8.27240,-35.99110,'https://2.bp.blogspot.com/-UlwG-IJKV2I/V2HVV73MoFI/AAAAAAAAASQ/3l7bYLn4bkwoO5rP3CMT3iDERHjyQW4twCLcB/s1600/dobradinha.jpg');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exibicao`
--

DROP TABLE IF EXISTS `exibicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exibicao` (
  `code` int NOT NULL AUTO_INCREMENT,
  `ordem` int DEFAULT NULL,
  `fk` int NOT NULL,
  `dia` date NOT NULL,
  `horario` time NOT NULL,
  `endereco` varchar(500) NOT NULL,
  `latitude` decimal(8,5) NOT NULL,
  `longitude` decimal(8,5) NOT NULL,
  PRIMARY KEY (`code`),
  KEY `fk` (`fk`),
  CONSTRAINT `exibicao_ibfk_1` FOREIGN KEY (`fk`) REFERENCES `polo` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exibicao`
--

LOCK TABLES `exibicao` WRITE;
/*!40000 ALTER TABLE `exibicao` DISABLE KEYS */;
INSERT INTO `exibicao` VALUES (1,1,1,'2025-05-31','18:00:00','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520),(2,2,1,'2025-05-31','20:00:00','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520),(3,3,1,'2025-05-31','22:00:00','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520),(4,1,1,'2025-06-01','18:00:00','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520),(5,2,1,'2025-06-01','20:00:00','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520),(6,3,1,'2025-06-01','22:00:00','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520),(7,1,12,'2025-05-31','18:00:00','R. Armando da Fonte, 177 - Maurício de Nassau',-8.28200,-35.97200),(8,2,12,'2025-05-31','20:00:00','R. Armando da Fonte, 177 - Maurício de Nassau',-8.28200,-35.97200);
/*!40000 ALTER TABLE `exibicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locais`
--

DROP TABLE IF EXISTS `locais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locais` (
  `code` int NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `dias` varchar(255) DEFAULT NULL,
  `inicio` time NOT NULL,
  `fim` time NOT NULL,
  `endereco` varchar(500) NOT NULL,
  `latitude` decimal(8,5) NOT NULL,
  `longitude` decimal(8,5) NOT NULL,
  `urlimage` varchar(255) NOT NULL,
  `urlicone` varchar(255) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `handle` (`handle`),
  CONSTRAINT `checkdata` CHECK ((`fim` > `inicio`))
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locais`
--

LOCK TABLES `locais` WRITE;
/*!40000 ALTER TABLE `locais` DISABLE KEYS */;
INSERT INTO `locais` VALUES (1,'patio','Pátio de Eventos Luiz Gonzaga','Principal local de shows e apresentações musicais do São João de Caruaru.','Todos os dias de shows.','18:00:00','23:59:00','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520,'https://acessacaruaru.com/wp-content/uploads/2024/03/IMG_6814.jpeg','https://acessacaruaru.com/wp-content/uploads/2024/03/IMG_6814.jpeg'),(2,'rabada','Rabada do Bigode','A \"Rabada do Bigode\" é um restaurante em Caruaru, conhecido por sua rabada, um prato feito com rabo de boi cozido lentamente. O restaurante também é famoso por homenagens recebidas, como uma que ocorreu no Parque Canãa, e pela interação com clientes nas redes sociais.','Sexta à Quinta','05:00:00','14:00:00','R. Raul Paranhos, 610 - Divinópolis',-8.26770,-35.97770,'https://static.where-e.com/Brazil/Pernambuco_State/Caruaru_Municipality/Rabada-Do-Bigode_ca3f2377e110f023787dd211d48fe745.jpg','https://static.where-e.com/Brazil/Pernambuco_State/Caruaru_Municipality/Rabada-Do-Bigode_ca3f2377e110f023787dd211d48fe745.jpg'),(3,'cuzcuz','Cuscuz Gigante','Uma ocasião em que se prepara um cuscuz de grandes proporções, homenageando essa iguaria tradicionalmente consumida em diversas regiões.','09/06/2025','19:00:00','20:00:00','R. Julio Fernandes',-8.28550,-36.00750,'https://conteudo.imguol.com.br/c/entretenimento/0c/2023/06/12/maior-cuscuz-do-mundo-1686605747172_v2_4x3.png','https://conteudo.imguol.com.br/c/entretenimento/0c/2023/06/12/maior-cuscuz-do-mundo-1686605747172_v2_4x3.png'),(4,'shop','Caruaru Shopping','O Caruaru Shopping é considerado o maior shopping do Interior do Norte/Nordeste, com mais de 300 operações em funcionamento (varejo, alimentação, lazer e serviços) e fluxo de visitantes acima de 850 mil pessoas por mês, que vão ao centro de compras e convivência.','Segunda à Domingo','08:00:00','22:00:00','Av. Adjar da Silva Casé, 800 - Indianópolis',-8.29470,-35.95160,'https://www.caruarushopping.com/wp-content/uploads/2023/12/29f742ba-a60c-4eac-9b8e-dcdbc72f7a14.jpg','https://www.caruarushopping.com/wp-content/uploads/2023/12/29f742ba-a60c-4eac-9b8e-dcdbc72f7a14.jpg'),(5,'polo_azulao','Polo Azulão','Polo musical com programação diversificada durante o São João.\n','Todos os dias de shows.','18:00:00','23:59:00','R. Armando da Fonte, 177 - Maurício de Nassau',-8.28200,-35.97200,'https://s2-g1.glbimg.com/x58aGzNOxquaIStD4xgmpARxUxA=/1600x0/filters:format(jpeg)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/h/U/TkXOLWT7G0EkjeQkBc0g/whatsapp-image-2023-06-22-at-11.34.50.jpeg','https://s2-g1.glbimg.com/x58aGzNOxquaIStD4xgmpARxUxA=/1600x0/filters:format(jpeg)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/h/U/TkXOLWT7G0EkjeQkBc0g/whatsapp-image-2023-06-22-at-11.34.50.jpeg'),(6,'polocasarosa','Polo Casa Rosa','Espaço cultural que promove exposições de arte, oficinas e apresentações teatrais.\n','Todos os dias de shows.','18:00:00','23:59:00','Av. Parque 18 de Maio, S/N - Petrópolis, Caruaru - PE.',-8.29160,-35.97090,'https://s2-g1.glbimg.com/xnrJWwhrl7PvXxYimop94BsiuQs=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/A/u/K4pjB4TOKqQ0nOtQAe8A/indice.jpg','https://s2-g1.glbimg.com/xnrJWwhrl7PvXxYimop94BsiuQs=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/A/u/K4pjB4TOKqQ0nOtQAe8A/indice.jpg'),(7,'polo_camarao','Polo Camarão','Espaço dedicado a apresentações culturais e musicais variadas.\n','Todos os dias de shows.','18:00:00','23:59:00','R. Frei Caneca - Maurício de Nassau',-8.28270,-35.97030,'https://s2-g1.glbimg.com/1YLlh2uNE6Fh7ChkkcfvTPziLcU=/0x0:1600x1068/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/K/R/iqXCg1Q9WygPDWCOZ6NQ/whatsapp-image-2024-06-13-at-10.30.46.jpeg','https://s2-g1.glbimg.com/1YLlh2uNE6Fh7ChkkcfvTPziLcU=/0x0:1600x1068/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/K/R/iqXCg1Q9WygPDWCOZ6NQ/whatsapp-image-2024-06-13-at-10.30.46.jpeg'),(8,'Suspiro_Gigante','Suspiro Gigante','A festa promete uma celebração inesquecível dedicada a uma das sobremesas mais adoradas: o suspiro.\n','11/05/2025','14:00:00','15:00:00','R. Veranice de Melo Santos - Maria Auxiliadora',-8.27620,-35.99550,'https://static.itdg.com.br/images/1200-630/f847795e69c8fe8c3adb06dcfa7e0772/shutterstock-2130919517.jpg','https://static.itdg.com.br/images/1200-630/f847795e69c8fe8c3adb06dcfa7e0772/shutterstock-2130919517.jpg'),(9,'mesa_junina','Mesa Junina','A Mesa Junina conta com diversos pratos típicos da cidade que todo caruaruense ama.\n','18/05/2025','19:00:00','20:00:00','Vila Lajes, Caruaru - PE',-8.08020,-36.04070,'https://s2-g1.glbimg.com/WaoGsuXO3YPHmu-wQ87qHmBIHEA=/0x0:2048x1359/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/h/9/vntKy1T2619NhRDE4eMw/27786207161-68a2cc5db9-k.jpg','https://s2-g1.glbimg.com/WaoGsuXO3YPHmu-wQ87qHmBIHEA=/0x0:2048x1359/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/h/9/vntKy1T2619NhRDE4eMw/27786207161-68a2cc5db9-k.jpg'),(10,'Festival_Caldo_de_Cana','Festival do Caldo de Cana','Caldo de cana distribuído para a multidão com muito forró.\n','18/05/2025','19:00:00','20:00:00','R. Dep. Torres Galvão - Salgado, Caruaru - PE',-8.27190,-35.95820,'https://midias.agazeta.com.br/2023/07/18/pastel-e-caldo-de-cana-da-pastelaria-california-em-ibiracu-1810302.jpg','https://midias.agazeta.com.br/2023/07/18/pastel-e-caldo-de-cana-da-pastelaria-california-em-ibiracu-1810302.jpg'),(11,'boi_brasa','Boi & Brasa Churrascaria','O Boi & Brasa Caruaru é uma churrascaria com rodízio de carnes, que se destaca por oferecer um buffet completo, sushi e ambiente agradável, com bom atendimento e opções para eventos.','Domingo à Sábado ','11:00:00','22:00:00','Av. dos Estados - Maurício de Nassau, Caruaru - PE',-8.25630,-35.97520,'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/cf/59/07/salao-1.jpg?w=900&h=500&s=1','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/cf/59/07/salao-1.jpg?w=900&h=500&s=1'),(12,'via_regional','Via Regional','O Via Regional é um restaurante em Caruaru conhecido pela sua culinária, que inclui opções regionais, massas e sushi, além de eventos culturais. O restaurante oferece um ambiente aconchegante e música ao vivo nos fins de semana, além de serviço de delivery.','Domingo à Sábado ','11:00:00','23:00:00','Av. Agamenon Magalhães, 1407 - Maurício de Nassau',-8.26830,-35.97670,'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/04/7b/2f/vista-interna.jpg?w=900&h=500&s=1','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/04/7b/2f/vista-interna.jpg?w=900&h=500&s=1'),(13,'carne_desol','Restaurante Nego Da Carne de Sol','O Nego Da Carne De Sol é um restaurante e pizzaria popular em Caruaru, Pernambuco, conhecido por sua especialidade em carne de sol de alta qualidade.\nEmbora seja um restaurante, também é famoso por suas pizzas e oferece um cardápio variado. É um local muito bem avaliado pelos visitantes, destacando-se pela excelência de seus pratos e serviço.','Segunda à Domingo','11:00:00','22:00:00','R. Barreiros, 465-413 - Jardim Boa Vista',-8.27240,-35.98950,'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/85/99/b5/ambiente-grande-com-muitas.jpg?w=900&h=500&s=1','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/85/99/b5/ambiente-grande-com-muitas.jpg?w=900&h=500&s=1'),(14,'shopping_difusora','Shopping Difusora','O Shopping Difusora é um shopping center moderno e sofisticado, localizado no centro de Caruaru, com mais de 160 operações, incluindo grandes marcas, lojas exclusivas e uma praça de alimentação diversificada.','Domingo à Sábado ','10:00:00','22:00:00','Av. Agamenon Magalhães, 444 - Maurício de Nassau',-8.27750,-35.97180,'https://paulonailson.com.br/wp-content/uploads/2025/02/02449edc-1599-4ef3-8526-023ef55c5d1b.jpg','https://paulonailson.com.br/wp-content/uploads/2025/02/02449edc-1599-4ef3-8526-023ef55c5d1b.jpg'),(15,'polo_altodomoura','Polo Alto do Moura','O polo do Alto do Moura no São João de Caruaru é uma celebração que une o forró tradicional à rica cultura do artesanato, transformando o bairro em um grande arraial a céu aberto.\n','Todos os dias de shows.','10:00:00','23:59:00','Estacionamento do Alto do Moura, Av. Leão Dourado, 25 - Alto do Moura, Caruaru - PE',-8.28880,-36.02390,'https://recifemais.com.br/wp-content/uploads/2025/06/27607488052_65d64418b1_b.jpg','https://recifemais.com.br/wp-content/uploads/2025/06/27607488052_65d64418b1_b.jpg'),(16,'lidio_cavalcanti','Polo Lídio Cavalcanti','O Polo Lídio Cavalcanti, também conhecido como Polo do Repente, é um espaço cultural em Caruaru, localizado na Estação Ferroviária. Ele é um dos polos que recebem eventos, especialmente durante o São João, com destaque para apresentações de repente, forró tradicional, poesia e outros eventos artísticos, como a Feira Diagrama.\n','Todos os dias de shows.','18:00:00','23:59:00','R. Silva Filho, 7 - Maurício de Nassau',-8.28280,-35.96940,'https://acessacaruaru.com/wp-content/uploads/2025/06/EFA335DA-17E5-4517-9EE4-13E96F2A70CE.jpeg','https://acessacaruaru.com/wp-content/uploads/2025/06/EFA335DA-17E5-4517-9EE4-13E96F2A70CE.jpeg');
/*!40000 ALTER TABLE `locais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locaistags`
--

DROP TABLE IF EXISTS `locaistags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locaistags` (
  `fklocal` int NOT NULL,
  `fktag` int NOT NULL,
  PRIMARY KEY (`fklocal`,`fktag`),
  KEY `fktag` (`fktag`),
  CONSTRAINT `locaistags_ibfk_1` FOREIGN KEY (`fklocal`) REFERENCES `locais` (`code`),
  CONSTRAINT `locaistags_ibfk_2` FOREIGN KEY (`fktag`) REFERENCES `tag` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locaistags`
--

LOCK TABLES `locaistags` WRITE;
/*!40000 ALTER TABLE `locaistags` DISABLE KEYS */;
INSERT INTO `locaistags` VALUES (2,1),(11,1),(12,1),(13,1),(1,3),(5,3),(6,3),(7,3),(15,3),(16,3),(3,4),(8,4),(9,4),(10,4),(4,6),(14,6);
/*!40000 ALTER TABLE `locaistags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `code` int NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `obras` varchar(500) NOT NULL,
  `nascido` int NOT NULL,
  `morte` int DEFAULT NULL,
  `ishomenageado` tinyint(1) NOT NULL,
  `anohomenagem` int DEFAULT NULL,
  `urlimagem` varchar(255) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `handle` (`handle`),
  CONSTRAINT `chk_data` CHECK ((`morte` > `nascido`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `polo`
--

DROP TABLE IF EXISTS `polo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `polo` (
  `code` int NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `inicio` date NOT NULL,
  `fim` date NOT NULL,
  `endereco` varchar(500) NOT NULL,
  `latitude` decimal(8,5) NOT NULL,
  `longitude` decimal(8,5) NOT NULL,
  `ismultilocal` tinyint(1) NOT NULL,
  `urlimagem` varchar(255) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `handle` (`handle`),
  CONSTRAINT `check_multilocal` CHECK ((((`ismultilocal` = 0) and (`endereco` is not null) and (`latitude` is not null) and (`longitude` is not null)) or ((`ismultilocal` = 1) and (`endereco` is null) and (`latitude` is null) and (`longitude` is null))))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polo`
--

LOCK TABLES `polo` WRITE;
/*!40000 ALTER TABLE `polo` DISABLE KEYS */;
INSERT INTO `polo` VALUES (1,'patio','Pátio de Eventos Luiz Gonzaga','Principal local de shows e apresentações musicais do São João de Caruaru.','2025-05-31','2025-06-27','R. Agnelo Dias Vidal - Nossa Sra. das Dores, Caruaru - PE, 55002-310',-8.28526,-35.96520,0,'https://acessacaruaru.com/wp-content/uploads/2024/03/IMG_6814.jpeg'),(11,'polocasarosa','Polo Casa Rosa','Espaço cultural que promove exposições de arte, oficinas e apresentações teatrais.','2025-05-10','2025-06-28','Av. Parque 18 de Maio, S/N - Petrópolis, Caruaru - PE.',-8.29160,-35.97090,0,'https://s2-g1.glbimg.com/xnrJWwhrl7PvXxYimop94BsiuQs=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/A/u/K4pjB4TOKqQ0nOtQAe8A/indice.jpg'),(12,'azulao','Polo Azulão','Polo musical com programação diversificada durante o São João.','2025-06-09','2025-06-29','R. Armando da Fonte, 177 - Maurício de Nassau',-8.28200,-35.97200,0,'https://s2-g1.glbimg.com/x58aGzNOxquaIStD4xgmpARxUxA=/1600x0/filters:format(jpeg)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/h/U/TkXOLWT7G0EkjeQkBc0g/whatsapp-image-2023-06-22-at-11.34.50.jpeg'),(13,'camarao','Polo Camarão','Espaço dedicado a apresentações culturais e musicais variadas.','2025-05-31','2025-06-28','R. Frei Caneca - Maurício de Nassau',-8.28270,-35.97030,0,'https://s2-g1.glbimg.com/1YLlh2uNE6Fh7ChkkcfvTPziLcU=/0x0:1600x1068/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/K/R/iqXCg1Q9WygPDWCOZ6NQ/whatsapp-image-2024-06-13-at-10.30.46.jpeg'),(14,'polo_altodomoura','Polo Alto do Moura','O polo do Alto do Moura no São João de Caruaru é uma celebração que une o forró tradicional à rica cultura do artesanato, transformando o bairro em um grande arraial a céu aberto.','2025-06-07','2025-06-28','Estacionamento do Alto do Moura, Av. Leão Dourado, 25 - Alto do Moura, Caruaru - PE',-8.28880,-36.02390,0,'https://recifemais.com.br/wp-content/uploads/2025/06/27607488052_65d64418b1_b.jpg'),(15,'lidio_cavalcante','Polo Lídio Cavalcanti','O Polo Lídio Cavalcanti, também conhecido como Polo do Repente, é um espaço cultural em Caruaru, localizado na Estação Ferroviária. Ele é um dos polos que recebem eventos, especialmente durante o São João, com destaque para apresentações de repente, forró tradicional, poesia e outros eventos artísticos, como a Feira Diagrama. ','2025-05-31','2025-06-28','R. Silva Filho, 7 - Maurício de Nassau',-8.28280,-35.96940,0,'https://acessacaruaru.com/wp-content/uploads/2025/06/EFA335DA-17E5-4517-9EE4-13E96F2A70CE.jpeg');
/*!40000 ALTER TABLE `polo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `code` int NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `handle` (`handle`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'comidas','Restaurantes'),(3,'polinho','Polos Juninos'),(4,'gigantes','Comidas Gigantes'),(5,'cultural','Pontos Turísticos '),(6,'shoop','Shoppings'),(7,'atracao','Atrações');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `code` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `isadmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-05 22:25:23
