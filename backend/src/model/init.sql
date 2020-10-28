use issue_tracker;

drop table if exists Issue;
drop table if exists User;
drop table if exists label;
drop table if exists milestone;

CREATE TABLE `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(100) DEFAULT NULL,
  `nickname` VARCHAR(45) NOT NULL UNIQUE,
  `profileUrl` VARCHAR(255),
  `githubId` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Label` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `description` VARCHAR(45),
  `color` CHAR(6) NOT NULL,
  PRIMARY KEY (`id`)
);
 
CREATE TABLE `Milestone` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL UNIQUE,
  `dueDate` DATETIME,
  `description` VARCHAR(100),
  `isOpen` BOOLEAN NOT NULL DEFAULT TRUE,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Issue` (
`id` INT NOT NULL AUTO_INCREMENT,
`userId` INT,
`milestoneId` INT DEFAULT NULL,
`title` VARCHAR(45) NOT NULL,
`updatedAt` DATETIME ON UPDATE CURRENT_TIMESTAMP,
`createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
`closedAt` DATETIME NULL,
`isOpen` BOOLEAN NOT NULL DEFAULT TRUE,
PRIMARY KEY (`id`),
FOREIGN KEY(userId) REFERENCES `User`(id) ON DELETE SET NULL ON UPDATE NO ACTION,
FOREIGN KEY(milestoneId) REFERENCES `Milestone`(id) ON DELETE SET NULL ON UPDATE NO ACTION
);

CREATE TABLE `Comment` (
`id` INT NOT NULL AUTO_INCREMENT,
`issueId` INT,
`userId` INT,
`content` text NOT NULL,
`createdAt` datetime default CURRENT_TIMESTAMP,
`updatedAt` datetime ON UPDATE CURRENT_TIMESTAMP,
`isIssueContent` boolean default FALSE,
PRIMARY KEY (`id`),
foreign key (issueId) references Issue(id) on update no action on delete cascade,
foreign key (userId) references User(id) on update no action on delete SET NULL
);

CREATE TABLE `CommentImageUrl` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `commentId` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (commentId)
  REFERENCES Comment(id) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE `Issue_label` (
  `issueId` INT NOT NULL,
  `labelId` INT NOT NULL,
  FOREIGN KEY (issueId)
  REFERENCES Issue(id) ON UPDATE NO ACTION ON DELETE CASCADE,
  FOREIGN KEY (labelId)
  REFERENCES Label(id) ON UPDATE NO ACTION ON DELETE CASCADE  
);

CREATE TABLE `Issue_assignee` (
  `issueId` INT NOT NULL,
  `userId` INT NOT NULL,
  FOREIGN KEY (issueId)
  REFERENCES Issue(id) ON UPDATE NO ACTION ON DELETE CASCADE,
  FOREIGN KEY (userId)
  REFERENCES User(id) ON UPDATE NO ACTION ON DELETE CASCADE 
);

CREATE TABLE `Comment_emoticon` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commentId` INT NOT NULL,
  `userId` INT NOT NULL,
  `emoticon` VARCHAR(10),
  PRIMARY KEY (`id`),
  FOREIGN KEY (commentId)
  REFERENCES Comment(id) ON UPDATE NO ACTION ON DELETE CASCADE,
  FOREIGN KEY (userId)
  REFERENCES User(id) ON UPDATE NO ACTION ON DELETE CASCADE
);