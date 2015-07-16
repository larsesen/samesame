
CREATE DATABASE IF NOT EXISTS 'samesame'
USE 'samesame';


DROP TABLE IF EXISTS 'answers';

CREATE TABLE answers (
	userid integer,
	questionid integer,
	response varchar(1),
	primary key (userid, questionid)
	);



INSERT INTO answers VALUES (1,1,'a'),(1,2,'b'),(1,3,'a'),(1,4,'a'),(1,5,'b'),(1,6,'a'),(1,7,'a');




CREATE TABLE answers (
	userid varchar(20),
	questionid varchar(20),
	response varchar(20),
	primary key (response)
	);