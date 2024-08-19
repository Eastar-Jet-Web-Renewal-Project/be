-- MySQL Script generated by MySQL Workbench
-- Mon Aug 19 14:08:42 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eastar-renewal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eastar-renewal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eastar-renewal` DEFAULT CHARACTER SET utf8 ;
USE `eastar-renewal` ;

-- -----------------------------------------------------
-- Table `eastar-renewal`.`AIRCRAFT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`AIRCRAFT` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tailId` VARCHAR(5) NOT NULL,
  `manufacturer` VARCHAR(20) NULL DEFAULT NULL,
  `model` VARCHAR(20) NULL DEFAULT NULL,
  `status` ENUM('AVAILABLE', 'MAINTENANCE', 'STAND_BY', 'IN_OPERATION', 'RETIRED', 'LEASED_OUT') NULL DEFAULT NULL,
  `currentConfigId` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tailId_UNIQUE` (`tailId` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `eastar-renewal`.`MAINTENANCE_OPERATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`MAINTENANCE_OPERATION` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aircraftId` VARCHAR(6) NOT NULL,
  `type` ENUM('TRANSIT', 'PRE_POST_FLIGHT', 'WEEKLY', 'A', 'B', 'C', 'D', 'SPECIAL') NOT NULL,
  `status` ENUM('SCHEDULED', 'ON_MAINTENANCE', 'CANCELLED', 'DONE') NOT NULL,
  `scheduledDate` DATETIME NOT NULL,
  `doneDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `MAINTENANCE_OPERATION_index_0` (`aircraftId` ASC, `scheduledDate` ASC, `type` ASC) VISIBLE,
  CONSTRAINT `fk_maintenance_operation_aircraft`
    FOREIGN KEY (`aircraftId`)
    REFERENCES `eastar-renewal`.`AIRCRAFT` (`tailId`));


-- -----------------------------------------------------
-- Table `eastar-renewal`.`FLIGHT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`FLIGHT` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `airlineCode` VARCHAR(10) NULL DEFAULT NULL,
  `flightNumber` VARCHAR(10) NULL DEFAULT NULL,
  `status` ENUM('SEEKING_SLOTS', 'SCHEDULED', 'CHARTER_PENDING', 'CHARTER_CONFIRMED', 'ACTIVE', 'COMPLETED') NOT NULL,
  `departAirportCode` VARCHAR(10) NULL DEFAULT NULL,
  `arrivalAirportCode` VARCHAR(10) NULL DEFAULT NULL,
  `departureTime` TIME NULL DEFAULT NULL,
  `arrivalTime` TIME NULL DEFAULT NULL,
  `dayOfOperation` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `eastar-renewal`.`FLIGHT_OPERATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`FLIGHT_OPERATION` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aircraftId` VARCHAR(6) NOT NULL,
  `flightId` INT NOT NULL,
  `status` ENUM('SCHEDULED', 'ON_BOARDING', 'DELAYED', 'CANCELLED', 'ON_FLIGHT', 'ARRIVED') NOT NULL,
  `departureTime` DATETIME NULL DEFAULT NULL,
  `arrivalTime` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `FLIGHT_OPERATION_index_1` (`flightId` ASC, `departureTime` ASC) VISIBLE,
  INDEX `fk_flight_operation_aircraft` (`aircraftId` ASC) VISIBLE,
  CONSTRAINT `fk_flight_operation_flight`
    FOREIGN KEY (`flightId`)
    REFERENCES `eastar-renewal`.`FLIGHT` (`id`),
  CONSTRAINT `fk_flight_operation_aircraft`
    FOREIGN KEY (`aircraftId`)
    REFERENCES `eastar-renewal`.`AIRCRAFT` (`tailId`));


-- -----------------------------------------------------
-- Table `eastar-renewal`.`DELAY_LOG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`DELAY_LOG` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `flightOpId` INT NOT NULL,
  `reason` ENUM('WEATHER', 'TECHNICAL_ISSUE', 'OPERATIONAL', 'SECURITY', 'AIRTRAFFIC_CONTROL', 'CONNECTING', 'PASSENGER', 'OTHER') NOT NULL,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_delay_log_flight_operation` (`flightOpId` ASC) VISIBLE,
  CONSTRAINT `fk_delay_log_flight_operation`
    FOREIGN KEY (`flightOpId`)
    REFERENCES `eastar-renewal`.`FLIGHT_OPERATION` (`id`));


-- -----------------------------------------------------
-- Table `eastar-renewal`.`BASE_PRICE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`BASE_PRICE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `flightId` INT NOT NULL,
  `bookingClass` ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
  `basePrice` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_base_price_flight` (`flightId` ASC) VISIBLE,
  CONSTRAINT `fk_base_price_flight`
    FOREIGN KEY (`flightId`)
    REFERENCES `eastar-renewal`.`FLIGHT` (`id`));


-- -----------------------------------------------------
-- Table `eastar-renewal`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`USER` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT NOT NULL,
  `birth` DATE NOT NULL,
  `phone` VARCHAR(25) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  `updatedAt` TIMESTAMP NOT NULL,
  `deletedAt` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX (`userId` ASC) VISIBLE,
  UNIQUE INDEX (`email` ASC) VISIBLE,
  UNIQUE INDEX (`phone` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `eastar-renewal`.`BOOKING`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`BOOKING` (
  `uid` VARCHAR(36) NOT NULL,
  `flightOpId` INT NOT NULL,
  `bookingClass` ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
  `pricing` INT NOT NULL,
  `bookingDate` DATETIME NOT NULL,
  `status` ENUM('ON_BOOKING', 'RESERVED', 'CONFIRMED', 'CANCELLED', 'PARTIAL_CANCELELD') NOT NULL,
  `bookingAgentId` INT NULL DEFAULT NULL,
  `bookingAgentName` VARCHAR(45) NOT NULL,
  `bookingAgentEmail` VARCHAR(45) NOT NULL,
  `bookingAgentPhoneNumber` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`uid`),
  INDEX `fk_booking_user` (`bookingAgentId` ASC) VISIBLE,
  INDEX `fk_booking_flight_operation` (`flightOpId` ASC) VISIBLE,
  CONSTRAINT `fk_booking_user`
    FOREIGN KEY (`bookingAgentId`)
    REFERENCES `eastar-renewal`.`USER` (`id`),
  CONSTRAINT `fk_booking_flight_operation`
    FOREIGN KEY (`flightOpId`)
    REFERENCES `eastar-renewal`.`FLIGHT_OPERATION` (`id`));


-- -----------------------------------------------------
-- Table `eastar-renewal`.`PASSENGER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eastar-renewal`.`PASSENGER` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bookingId` VARCHAR(36) NOT NULL,
  `price` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `phoneNumber` VARCHAR(25) NOT NULL,
  `passportNumber` VARCHAR(25) NULL DEFAULT NULL,
  `sex` ENUM('MALE', 'FEMALE') NULL DEFAULT NULL,
  `birth` DATE NULL DEFAULT NULL,
  `nationality` ENUM('KR', 'US', 'JP', 'CN') NULL DEFAULT NULL,
  `status` ENUM('ON_BOOKING', 'RESERVED', 'CONFIRMED', 'PASSPORT_FILLED', 'CANCELLED', 'CHECK_IN', 'DONE') NOT NULL,
  `relatedId` INT NULL DEFAULT NULL,
  `seat` VARCHAR(5) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `PASSENGER_index_2` (`bookingId` ASC, `name` ASC, `birth` ASC) VISIBLE,
  INDEX `fk_passenger_passenger` (`relatedId` ASC) VISIBLE,
  CONSTRAINT `fk_passenger_passenger`
    FOREIGN KEY (`relatedId`)
    REFERENCES `eastar-renewal`.`PASSENGER` (`id`),
  CONSTRAINT `fk_passenger_booking`
    FOREIGN KEY (`bookingId`)
    REFERENCES `eastar-renewal`.`BOOKING` (`uid`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
