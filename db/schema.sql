create database countypres_2000_2016;

use countypres_2000_2016;

create table countypres (
	id INT primary key not null auto_increment,
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


-- **** Schema to import data into the database. Will be uncommented when the site deploys ****

-- LOAD DATA INFILE './countpres_2000_2016.csv'
-- INTO TABLE countypres
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '/n';