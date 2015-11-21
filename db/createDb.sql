CREATE DATABASE hermes;
CREATE USER 'db_admin'@'localhost';
GRANT ALL PRIVILEGES ON hermes.* TO 'db_admin'@'localhost';
FLUSH PRIVILEGES;