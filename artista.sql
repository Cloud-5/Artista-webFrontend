CREATE DATABASE IF NOT EXISTS artista;
use artista;

CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    description MEDIUMTEXT,
    registered_at DATE,
    location VARCHAR(100) NOT NULL,
    fName VARCHAR(255) NOT NULL,
    LName VARCHAR(255) NOT NULL,
    profile_photo_url VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    isBanned BOOLEAN DEFAULT FALSE,
    ban_start_date DATE,
    ban_end_date DATE,
    is_approved BOOLEAN DEFAULT FALSE -- New column for approval status
);

CREATE TABLE IF NOT EXISTS message (
    message_id INT AUTO_INCREMENT NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_text TEXT NOT NULL,
    sent_at DATETIME NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (message_id),
    FOREIGN KEY (sender_id) REFERENCES user(user_id),
    FOREIGN KEY (receiver_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    notification_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    margin DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS supported_formats (
    format_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    format_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS artwork (
    artwork_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_id INT,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    description TEXT,
    published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    category_id INT,
    FOREIGN KEY (artist_id) REFERENCES user(user_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS artwork_tag (
    artwork_id INT,
    tag_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (artwork_id, tag_name),
    FOREIGN KEY (artwork_id) REFERENCES artwork(artwork_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS artwork_file_format (
    artwork_id INT,
    file_format_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (artwork_id, file_format_name),
    FOREIGN KEY (artwork_id) REFERENCES artwork(artwork_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS artwork_tool (
    artwork_id INT,
    tool_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (artwork_id, tool_name),
    FOREIGN KEY (artwork_id) REFERENCES artwork(artwork_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS artwork_like (
    user_id INT,
    artwork_id INT,
    PRIMARY KEY (user_id, artwork_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (artwork_id) REFERENCES artwork(artwork_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS artist_rating (
    rated_user_id INT, -- The user (artist) who is being rated
    rating_user_id INT, -- The user (customer) who is giving the rating
    rating_value INT NOT NULL CHECK (rating_value >= 1 AND rating_value <= 5),
    PRIMARY KEY (rated_user_id,rating_user_id),
    FOREIGN KEY (rated_user_id) REFERENCES user(user_id),
    FOREIGN KEY (rating_user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS artist_follower (
    follower_user_id INT,
    followed_artist_user_id INT,
    PRIMARY KEY (follower_user_id, followed_artist_user_id),
    FOREIGN KEY (follower_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_artist_user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Foreign key referencing the user who wrote the comment
    artwork_id INT, -- Foreign key referencing the post or parent comment
    parent_comment_id INT, -- Reference to the parent comment (for nesting)
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (artwork_id) REFERENCES artwork(artwork_id),
    FOREIGN KEY (parent_comment_id) REFERENCES comment(comment_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS complaint_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS complaint (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category_id INT,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (category_id) REFERENCES complaint_category(category_id)
);

CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_user_id INT,
    artist_user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_user_id) REFERENCES user(user_id),
    FOREIGN KEY (artist_user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS gallery (
    customer_user_id INT,
    artwork_id INT,
    PRIMARY KEY (customer_user_id, artwork_id),
    FOREIGN KEY (customer_user_id) REFERENCES user(user_id),
    FOREIGN KEY (artwork_id) REFERENCES artwork(artwork_id)
);





