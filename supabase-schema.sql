-- Run this SQL in your Supabase SQL Editor to create the tables

-- Blood Inventory Table
CREATE TABLE blood_inventory (
  id SERIAL PRIMARY KEY,
  blood_type VARCHAR(5) UNIQUE NOT NULL,
  units INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'low',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial blood types
INSERT INTO blood_inventory (blood_type, units, status) VALUES
  ('A+', 45, 'adequate'),
  ('A-', 12, 'low'),
  ('B+', 67, 'high'),
  ('B-', 8, 'critical'),
  ('AB+', 34, 'adequate'),
  ('AB-', 5, 'critical'),
  ('O+', 78, 'high'),
  ('O-', 15, 'low');

-- Donation Requests Table
CREATE TABLE donation_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  blood_type VARCHAR(5) NOT NULL,
  address TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  request_type VARCHAR(20) NOT NULL CHECK (request_type IN ('donate', 'receive')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE blood_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_requests ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blood inventory
CREATE POLICY "Allow public read access" ON blood_inventory
  FOR SELECT USING (true);

-- Allow public to insert donation requests
CREATE POLICY "Allow public insert" ON donation_requests
  FOR INSERT WITH CHECK (true);

-- Allow public to read their own requests (by email)
CREATE POLICY "Allow public read" ON donation_requests
  FOR SELECT USING (true);

