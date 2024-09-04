const {Sequelize} = require('sequelize')

const bdmysql = new Sequelize(
    'mydb',
    'root',
    '',
    {
        host: 'localhost',
        port: process.env.BD,
        dialect: 'mariadb'
    }

    
    );

module.exports = {
    bdmysql
}

/* CREATE TABLE `User` (
    `id_usuario` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `id_persona` INT NOT NULL,
    `rol` ENUM('ADMIN_ROLE', 'USER_ROLE') NOT NULL,
    `estado` BOOLEAN DEFAULT NULL,
    PRIMARY KEY (`id_usuario`),
    UNIQUE KEY `email` (`email`),
    CONSTRAINT `fk_id_persona`
      FOREIGN KEY (`id_persona`)
      REFERENCES `Persona` (`id_persona`)
      ON DELETE CASCADE
      ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 
Tabla user

INSERT INTO `User` (`email`, `password`, `id_persona`, `rol`, `estado`) VALUES
('user1@example.com', 'password1', 1, 'USER_ROLE', true),
('user2@example.com', 'password2', 2, 'USER_ROLE', true),
('user3@example.com', 'password3', 3, 'USER_ROLE', true),
('user4@example.com', 'password4', 4, 'USER_ROLE', true),
('user5@example.com', 'password5', 5, 'USER_ROLE', true),
('user6@example.com', 'password6', 6, 'USER_ROLE', true),
('user7@example.com', 'password7', 7, 'USER_ROLE', true),
('user8@example.com', 'password8', 8, 'USER_ROLE', true),
('user9@example.com', 'password9', 9, 'USER_ROLE', true),
('user10@example.com', 'password10', 1, 'USER_ROLE', true);

*/
