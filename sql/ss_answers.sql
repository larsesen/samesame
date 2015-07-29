
CREATE DATABASE IF NOT EXISTS 'samesame'
USE 'samesame';


DROP TABLE IF EXISTS 'answers';

-- Primary key is combination of userid and questionid, making it not possible to answer same question multiple times
-- answerid is used as a counter, to easily be able to access the specific answer when accessing db.
CREATE TABLE answers (
	answerid mediumInt AUTO_INCREMENT, 
	userid BigInt,
	questionid integer,
	sex varchar(1) NOT NULL,
	response varchar(1) NOT NULL,
	primary key (userid, questionid),
	key (answerid)
	);


INSERT INTO answers VALUES (1,1,'a'),(1,2,'b'),(1,3,'a'),(1,4,'a'),(1,5,'b'),(1,6,'a'),(1,7,'a');




CREATE TABLE answers (
	userid varchar(20),
	questionid varchar(20),
	response varchar(20),
	primary key (response)
	);