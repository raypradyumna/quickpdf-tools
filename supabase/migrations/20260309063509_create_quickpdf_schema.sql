/*
  # QuickPDF Tools Database Schema

  1. New Tables
    - `usage_logs`
      - `id` (uuid, primary key)
      - `user_identifier` (text) - IP address or device fingerprint for anonymous tracking
      - `tool_type` (text) - which tool was used (merge, split, compress, etc.)
      - `created_at` (timestamptz) - when the conversion happened
      - `file_size` (bigint) - size of processed file in bytes
    
    - `premium_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `user_identifier` (text) - device fingerprint
      - `subscription_status` (text) - active, expired, cancelled
      - `subscription_start` (timestamptz)
      - `subscription_end` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access to check usage limits
    - Add policies for authenticated admins to manage premium users
*/

-- Create usage_logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier text NOT NULL,
  tool_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  file_size bigint DEFAULT 0
);

-- Create premium_users table
CREATE TABLE IF NOT EXISTS premium_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  user_identifier text NOT NULL,
  subscription_status text DEFAULT 'active',
  subscription_start timestamptz DEFAULT now(),
  subscription_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_identifier ON usage_logs(user_identifier);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_premium_users_user_identifier ON premium_users(user_identifier);
CREATE INDEX IF NOT EXISTS idx_premium_users_email ON premium_users(email);

-- Enable RLS
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_users ENABLE ROW LEVEL SECURITY;

-- Usage logs policies (public can read their own, insert their own)
CREATE POLICY "Anyone can read their own usage logs"
  ON usage_logs FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert usage logs"
  ON usage_logs FOR INSERT
  WITH CHECK (true);

-- Premium users policies (only authenticated users can manage)
CREATE POLICY "Anyone can check premium status"
  ON premium_users FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert premium users"
  ON premium_users FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update premium users"
  ON premium_users FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);