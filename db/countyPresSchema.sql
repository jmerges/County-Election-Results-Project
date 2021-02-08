create database countypres_2000_2016;

use countypres_2000_2016;

create table countypres (
	countypresId INT primary key not null auto_increment,
    year int,
    state varchar(50),
    state_po varchar(2),
    county varchar(50),
    FIPS int,
    office varchar(50),
    candidate varchar(50),
    party varchar(50),
    candidatevotes int,
    totalvotes int,
    version int
);

create table user (
    userId int primary key not null auto_increment,
    username varchar(100),
    userPassword varchar(50),
    userEmail varchar(100),
    countypresId int not null,
    FOREIGN KEY (countypresId) REFERENCES countypres(countypresId)
);