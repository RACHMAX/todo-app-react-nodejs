USE todo_app_db;

CREATE TABLE users ( 
	id INT auto_increment PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT current_timestamp ON UPDATE current_timestamp
);

CREATE TABLE categories (
	id INT auto_increment PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    UNIQUE (user_id, name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE priorities (
	id INT auto_increment PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    sort_order INT UNIQUE NOT NULL,
    color_code VARCHAR(7)
);

--  insert initial priorities data
INSERT INTO priorities (name, sort_order) VALUES ('Low', 1);
INSERT INTO priorities (name, sort_order) VALUES ('Medium', 2);
INSERT INTO priorities (name, sort_order) VALUES ('High', 3);
INSERT INTO priorities (name, sort_order) VALUES ('Critical', 4);

CREATE TABLE tasks (
	id INT auto_increment primary key,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    priority_id INT NOT NULL,
    category_id INT,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (category_id) references categories(id) on delete set null,
    foreign key (priority_id) references priorities(id) ON DELETE RESTRICT
);

-- Insert User 1: John Doe
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john.doe@example.com', '123');

-- Insert User 2: Jane Smith
INSERT INTO users (username, email, password) VALUES
('jane_smith', 'jane.smith@example.com', '456');

-- Insert User 3: Alex Green
INSERT INTO users (username, email, password) VALUES
('alex_green', 'alex.green@example.com', '789');

SELECT * FROM tasks;



