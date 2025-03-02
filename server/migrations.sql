CREATE TABLE ads (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    ad_id INT REFERENCES ads(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    area INT NOT NULL,
    rooms INT NOT NULL,
    price INT NOT NULL
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    ad_id INT REFERENCES ads(id) ON DELETE CASCADE,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    mileage INT
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    ad_id INT REFERENCES ads(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    experience INT NOT NULL,
    cost INT NOT NULL
);
