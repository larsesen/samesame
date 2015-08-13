
CREATE DATABASE IF NOT EXISTS 'samesame'
USE 'samesame';


DROP TABLE IF EXISTS 'answers';

-- Primary key is combination of userid and questionid, making it not possible to answer same question multiple times
-- answerid is used as a counter, to easily be able to access the specific answer when accessing db.
CREATE TABLE answers (
	answerid mediumInt AUTO_INCREMENT, 
	userid BigInt,
	questionid integer,
	gender varchar(1) NOT NULL,
	response varchar(1) NOT NULL,
	primary key (userid, questionid),
	key (answerid)
	);

