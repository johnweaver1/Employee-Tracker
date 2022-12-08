INSERT INTO department (name)
VALUES 
('Tank'),
('DPS'),
('Magic'),
('Healer');

INSERT INTO role (title, salary, department_id)
VALUES 
('Barbarian', 2000, 1), 
('Wizard', 5000, 3), 
('Warlock', 1500, 3), 
('Paladin', 500, 1), 
('Fighter', 3000, 2), 
('Cleric', 0 ,4), 
('Rogue', 10000, 2), 
('Monk', 1000, 2);

INSERT INTO employee (name_first, name_last, role_id, manager_id)
VALUES 
('John', 'InClass', 4, 1), 
('Yoselin', 'NameComing', 5, null), 
('Dean', 'Brumpo', 6, 2), 
('Maryann', 'Jumbalio', 8, 3), 
('Zack', 'Lecombe', 1, null), 
('Thomas', 'OtherThomas', 5, null),
('Jay', 'Birdio', 2, 4),
('Noah', 'Nohelperino', 3, null);