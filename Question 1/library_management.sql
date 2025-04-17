-- create database
CREATE database IF NOT EXISTS library_management;
-- Members Table
CREATE TABLE IF NOT EXISTS Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    join_date DATE NOT NULL
);

-- Authors Table
CREATE TABLE IF NOT EXISTS Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_year INT
);

-- Categories Table
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL
);

-- Books Table
CREATE TABLE IF NOT EXISTS Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    publish_year INT,
    copies_available INT DEFAULT 0
);

-- Book_Author Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS Book_Author (
    book_id INT,
    author_id INT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE
);

-- Book_Category Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS Book_Category (
    book_id INT,
    category_id INT,
    PRIMARY KEY (book_id, category_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

-- Borrow Records Table
CREATE TABLE IF NOT EXISTS BorrowRecords (
    borrow_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    book_id INT,
    borrow_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- Sample Data Insertion

-- Members
INSERT INTO Members (full_name, email, phone, join_date)
VALUES 
('Alice Johnson', 'alice@example.com', '0712345678', '2024-01-10'),
('Bob Smith', 'bob@example.com', '0798765432', '2024-02-14');

-- Authors
INSERT INTO Authors (name, birth_year)
VALUES 
('J.K. Rowling', 1965),
('George Orwell', 1903);

-- Categories
INSERT INTO Categories (category_name)
VALUES 
('Fiction'), ('Science Fiction'), ('Fantasy');

-- Books
INSERT INTO Books (title, isbn, publish_year, copies_available)
VALUES 
(`Harry Potter and the Philosopher\'s Stone`, '9780747532699', 1997, 3),
('1984', '9780451524935', 1949, 2);

-- Book_Author
INSERT INTO Book_Author (book_id, author_id)
VALUES 
(1, 1), -- Harry Potter by J.K. Rowling
(2, 2); -- 1984 by George Orwell

-- Book_Category
INSERT INTO Book_Category (book_id, category_id)
VALUES 
(1, 3), -- Harry Potter is Fantasy
(2, 2); -- 1984 is Science Fiction

-- BorrowRecords
INSERT INTO BorrowRecords (member_id, book_id, borrow_date, return_date)
VALUES 
(1, 1, '2025-04-01', NULL),
(2, 2, '2025-04-03', '2025-04-10');

