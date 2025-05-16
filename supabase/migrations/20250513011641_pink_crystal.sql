/*
  # Create skills table

  1. New Tables
    - `skills`
      - `id` (uuid, primary key)
      - `category` (text)
      - `icon` (text)
      - `items` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `skills` table
    - Add policy for authenticated users to manage skills
    - Add policy for public users to read skills
*/

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  icon text NOT NULL,
  items text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage skills
CREATE POLICY "Users can manage skills"
  ON skills
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow public users to read skills
CREATE POLICY "Public users can read skills"
  ON skills
  FOR SELECT
  TO public
  USING (true);

-- Insert initial skills data
INSERT INTO skills (category, icon, items) VALUES
  ('Frontend Development', 'layout', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion']),
  ('Backend Development', 'server', ARRAY['Node.js', 'Express', 'RESTful APIs', 'GraphQL', 'WebSockets']),
  ('Database & DevOps', 'database', ARRAY['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AWS']),
  ('Languages', 'code', ARRAY['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML/CSS']);