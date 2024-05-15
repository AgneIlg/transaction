-- Create User table
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Transaction table
CREATE TABLE "Transaction" (
    id SERIAL PRIMARY KEY,
    amount DECIMAL NOT NULL,
    user_from INTEGER REFERENCES "User"(id),
    user_to INTEGER REFERENCES "User"(id)
);
