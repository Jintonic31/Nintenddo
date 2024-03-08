SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables 

DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS banner;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS odetail;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS qna;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS pcategory;

*/




/* Create Tables */

CREATE TABLE admins
(
	adminid varchar(50) NOT NULL,
	pwd varchar(50) NOT NULL,
	name varchar(50) NOT NULL,
	PRIMARY KEY (adminid)
);


CREATE TABLE banner
(
	bseq int NOT NULL AUTO_INCREMENT,
	image varchar(50) NOT NULL,
	uri varchar(100) NOT NULL,
	priority int,
	useyn varchar(1) DEFAULT 'Y',
	PRIMARY KEY (bseq)
);


CREATE TABLE cart
(
	cseq int NOT NULL AUTO_INCREMENT,
	pseq int NOT NULL,
	userid varchar(50) NOT NULL,
	quantity int DEFAULT 1 NOT NULL,
	indate datetime DEFAULT now(),
	PRIMARY KEY (cseq)
);


CREATE TABLE member
(
	userid varchar(50) NOT NULL,
	pwd varchar(50) NOT NULL,
	name varchar(50) NOT NULL,
	phone varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	indate datetime DEFAULT now(),
	znum varchar(50),
	add1 varchar(100),
	add2 varchar(100),
	add3 varchar(100),
	provider varchar(50),
	useyn varchar(1) DEFAULT 'Y',
	PRIMARY KEY (userid)
);


CREATE TABLE odetail
(
	odseq int NOT NULL AUTO_INCREMENT,
	oseq int NOT NULL,
	pseq int NOT NULL,
	quantity int DEFAULT 1 NOT NULL,
	result varchar(1) DEFAULT '1' NOT NULL,
	PRIMARY KEY (odseq)
);


CREATE TABLE orders
(
	oseq int NOT NULL AUTO_INCREMENT,
	userid varchar(50) NOT NULL,
	indate datetime DEFAULT now(),
	PRIMARY KEY (oseq)
);


CREATE TABLE pcategory
(
	pcseq int NOT NULL AUTO_INCREMENT,
	pcname varchar(50) NOT NULL,
	PRIMARY KEY (pcseq)
);


CREATE TABLE product
(
	pseq int NOT NULL AUTO_INCREMENT,
	pcseq int NOT NULL,
	pname varchar(100) NOT NULL,
	content varchar(1000) NOT NULL,
	image varchar(50) NOT NULL,
	-- 판매가
	price1 int NOT NULL COMMENT '판매가',
	-- 원가
	price2 int NOT NULL COMMENT '원가',
	-- 마진
	price3 int NOT NULL COMMENT '마진',
	bestyn varchar(1) DEFAULT 'N',
	useyn varchar(1) DEFAULT 'Y',
	PRIMARY KEY (pseq)
);


CREATE TABLE qna
(
	qseq int NOT NULL AUTO_INCREMENT,
	userid varchar(50) NOT NULL,
	title varchar(100) NOT NULL,
	content varchar(1000) NOT NULL,
	reply varchar(1000),
	indate datetime DEFAULT now(),
	PRIMARY KEY (qseq)
);



/* Create Foreign Keys */

ALTER TABLE cart
	ADD FOREIGN KEY (userid)
	REFERENCES member (userid)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE orders
	ADD FOREIGN KEY (userid)
	REFERENCES member (userid)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE qna
	ADD FOREIGN KEY (userid)
	REFERENCES member (userid)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE odetail
	ADD FOREIGN KEY (oseq)
	REFERENCES orders (oseq)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE product
	ADD FOREIGN KEY (pcseq)
	REFERENCES pcategory (pcseq)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE cart
	ADD FOREIGN KEY (pseq)
	REFERENCES product (pseq)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE odetail
	ADD FOREIGN KEY (pseq)
	REFERENCES product (pseq)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;



