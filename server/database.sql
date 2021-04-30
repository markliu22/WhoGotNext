CREATE DATABASE whogotnext;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(100),
	password VARCHAR(100)
);

CREATE TABLE bookings (
	booking_id SERIAL,
	booking_location VARCHAR(150),
	booking_date DATE,
	start_time TIME,
	end_time TIME,
	booker_id integer REFERENCES users
);