USE tech_blog_db;

INSERT INTO user (username, password) VALUES ('user1', 'password');
INSERT INTO user (username, password) VALUES ('user2', 'password');
INSERT INTO user (username, password) VALUES ('user3', 'password');
INSERT INTO user (username, password) VALUES ('user4', 'password');

SELECT * FROM user;

INSERT INTO post (title, contents, post_url, user_id, created_at) VALUES ('Test Post 1', 'lorem ipsum dolor sit amet, consectetur adipiscing', 'http://testurl1.com/', 1, CURDATE());
INSERT INTO post (title, contents, post_url, user_id, created_at) VALUES ('Test Post 2', 'lorem ipsum dolor sit amet, consectetur adipiscing', 'http://testurl2.com/', 2, CURDATE());
INSERT INTO post (title, contents, post_url, user_id, created_at) VALUES ('Test Post 3', 'lorem ipsum dolor sit amet, consectetur adipiscing', 'http://testurl3.com/', 3, CURDATE());
INSERT INTO post (title, contents, post_url, user_id, created_at) VALUES ('Test Post 4', 'lorem ipsum dolor sit amet, consectetur adipiscing', 'http://testurl4.com/', 4, CURDATE());

SELECT * FROM post;

INSERT INTO comment (comment_text, user_id, post_id, created_at) VALUES ('Test Comment 1 lorem ipsum dolor sit amet', 1, 1, CURDATE());
INSERT INTO comment (comment_text, user_id, post_id, created_at) VALUES ('Test Comment 2 lorem ipsum dolor sit amet', 2, 2, CURDATE());
INSERT INTO comment (comment_text, user_id, post_id, created_at) VALUES ('Test Comment 3 lorem ipsum dolor sit amet', 3, 3, CURDATE());
INSERT INTO comment (comment_text, user_id, post_id, created_at) VALUES ('Test Comment 4 lorem ipsum dolor sit amet', 4, 4, CURDATE());

SELECT * FROM comment;