DROP TABLE IF EXISTS studios, films, actors, reviewers, reviews;

CREATE TABLE studios (
    studio_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    studio_name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT
)

CREATE TABLE films (
    film_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    studio BIGINT NOT NULL,
    released VARCHAR(4) NOT NULL
)

CREATE TABLE actors (
    actor_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_name TEXT NOT NULL,
    dob DATE NOT NULL,
    pob TEXT
)

CREATE TABLE reviewers (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    reviewer_name TEXT NOT NULL,
    company TEXT NOT NULL
)

CREATE TABLE reviews (
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating NUMBER NOT NULL,
    reviewer_id BIGINT NOT NULL,
    review VARCHAR(140) NOT NULL,
    film_id BIGINT NOT NULL
)