use issue_tracker;

drop table if exists Issue_label;
drop table if exists Issue_assignee;
drop table if exists CommentImageUrl;
drop table if exists Comment_emoticon;
drop table if exists Comment;
drop table if exists Issue;
drop table if exists User;
drop table if exists Label;
drop table if exists Milestone;

CREATE TABLE `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45),
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
  `color` CHAR(7) NOT NULL,
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

alter table Issue_assignee add unique Issue_assignee_unique_issueID_userId(issueID, userId);
alter table Issue_label add unique Issue_label_unique_issueID_labelId(issueID, labelId);

insert into Milestone (title, dueDate, description, isOpen) values ("title1", "2020-10-31","desc1", 1);
insert into Milestone (title, dueDate, description, isOpen) values ("title2", "2020-11-01","desc2", 1);
insert into Milestone (title, dueDate, description, isOpen) values ("title3", "2020-11-02","desc3", 0);

insert into Label (name, description, color) values ("label1", "descLabel1", "#707070");
insert into Label (name, description, color) values ("label2", "descLabel2", "#ffffff");
insert into Label (name, description, color) values ("label3", "descLabel3", "#000000");

INSERT INTO User (email, password, nickname) values ("aa@aa.com", "1234", "name1");
INSERT INTO User (email, password, nickname) values ("bb@bb.com", "1234", "name2");
INSERT INTO User (email, password, nickname) values ("cc@cc.com", "1234", "name3");

INSERT INTO Issue (userId, title, milestoneId, isOpen) values (1, "issueTitle1", 1, 1);
INSERT INTO Issue (userId, title, milestoneId, isOpen) values (1, "issueTitle1", 2, 0);
INSERT INTO Issue (userId, title, isOpen) values (2, "issueTitle1", 1);

insert into Issue_label (issueId, labelId) values (1,1);
insert into Issue_label (issueId, labelId) values (1,2);

