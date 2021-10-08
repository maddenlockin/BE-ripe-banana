DROP TABLE IF EXISTS studios CASCADE;
DROP TABLE IF EXISTS films;
DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS reviewers CASCADE;
DROP TABLE IF EXISTS reviews;


CREATE TABLE studios (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    studio_name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT
);

INSERT INTO studios (studio_name, city, state, country)
VALUES ('Blowfish Allures', 'Naples', 'FL', 'USA'),
    ('Piglet Party', 'Comeuppance', 'ND', 'USA'),
    ('Cloudy Iceberg', 'Wuthering', 'VT', 'USA');

CREATE TABLE films (
    film_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    studio_id BIGINT NOT NULL,
    FOREIGN KEY (studio_id) REFERENCES studios(id),
    released NUMERIC(4) NOT NULL
);

INSERT INTO films (title, studio_id, released)
VALUES ('Hardwood Variations', 1, 1971),
    ('Wince-Worthy Whispers', 2, 2003),
    ('Blatherings of Banality', 3, 2016);

CREATE TABLE actors (
    actor_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_name TEXT NOT NULL,
    dob TEXT NOT NULL,
    pob TEXT
);

INSERT INTO actors (actor_name, dob, pob)
VALUES ('Buffy Sandpaper', '19520214', 'Arid Canal, TX'),
    ('Rupert Pettygrove', '19810601', 'Lost Island, NY'),
    ('Ice Q', '20051111', 'Mossy Gulch, KY');

CREATE TABLE reviewers (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    reviewer_name TEXT NOT NULL,
    company TEXT NOT NULL
);

INSERT INTO reviewers (reviewer_name, company)
VALUES ('Windy Cyan', 'Clickbait Weekly'),
    ('Billy Fakenflick', 'Diatribe Gazette'),
    ('Edgar Timpani', 'Olfactory Post');

CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES reviewers(reviewer_id),
    review VARCHAR(140) NOT NULL,
    film_id BIGINT NOT NULL
);

INSERT INTO reviews (rating, reviewer_id, review, film_id)
VALUES (4, 1, 'I laughed until I forgot what I was laughing about', 3),
    (1, 2, 'I have known kettles of fish more interesting than this film', 1),
    (2, 3, 'If only this movie had been shown in Smellovision', 2);


