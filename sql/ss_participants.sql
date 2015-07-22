CREATE DATABASE IF NOT EXISTS 'samesame'
USE 'samesame';



DROP TABLE IF EXISTS 'participants';

CREATE TABLE participants (
	email varchar(100),
	userid BigInt NOT NULL,
	name varchar(100) DEFAULT NULL,
	winner tinyint(1) DEFAULT 0,
	PRIMARY KEY (email)
	);



INSERT INTO `participants` VALUES ('test1406884464899@testing.no','test',0),('test1406884464903@testing.no','test',0);
