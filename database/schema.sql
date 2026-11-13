CREATE DATABASE IF NOT EXISTS leo_portfolio
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE leo_portfolio;

-- Stores every "Contact Me" message sent from the website.
CREATE TABLE IF NOT EXISTS messages (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    body       TEXT         NOT NULL,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
