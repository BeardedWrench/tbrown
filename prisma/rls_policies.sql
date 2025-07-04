-- ============================
-- Helper Role Check Functions
-- ============================

CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM "User" u
    JOIN "Role" r ON r.id = u."roleId"
    WHERE u.id = auth.uid()::text AND r.name = 'admin'
  );
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION is_editor() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM "User" u
    JOIN "Role" r ON r.id = u."roleId"
    WHERE u.id = auth.uid()::text AND r.name = 'editor'
  );
$$ LANGUAGE sql STABLE;

-- ================================
-- Drop Existing Policies (Safe)
-- ================================
DO $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE tablename IN ('Post', 'Project', 'Tutorial', 'Category', 'Tag', 'User', 'Role', 'FeatureFlag', 'Setting')
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON %I',
      rec.policyname,
      rec.tablename
    );
  END LOOP;
END $$;

-- ====================
-- FEATUREFLAG Table Policies
-- ====================
ALTER TABLE "FeatureFlag" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full feature flags"
  ON "FeatureFlag" FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ====================
-- SETTING Table Policies
-- ====================
ALTER TABLE "Setting" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full settings"
  ON "Setting" FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ====================
-- POST Table Policies
-- ====================
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read posts"
  ON "Post" FOR SELECT
  USING (true);

CREATE POLICY "Editor write posts"
  ON "Post" FOR INSERT
  WITH CHECK (is_editor());

CREATE POLICY "Editor update posts"
  ON "Post" FOR UPDATE
  USING (is_editor());

CREATE POLICY "Admin write posts"
  ON "Post" FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin update posts"
  ON "Post" FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admin delete posts"
  ON "Post" FOR DELETE
  USING (is_admin());

-- ====================
-- PROJECT Table Policies
-- ====================
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects"
  ON "Project" FOR SELECT
  USING (true);

CREATE POLICY "Editor write projects"
  ON "Project" FOR INSERT
  WITH CHECK (is_editor());

CREATE POLICY "Editor update projects"
  ON "Project" FOR UPDATE
  USING (is_editor());

CREATE POLICY "Admin write projects"
  ON "Project" FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin update projects"
  ON "Project" FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admin delete projects"
  ON "Project" FOR DELETE
  USING (is_admin());

-- ====================
-- TUTORIAL Table Policies
-- ====================
ALTER TABLE "Tutorial" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read tutorials"
  ON "Tutorial" FOR SELECT
  USING (true);

CREATE POLICY "Editor write tutorials"
  ON "Tutorial" FOR INSERT
  WITH CHECK (is_editor());

CREATE POLICY "Editor update tutorials"
  ON "Tutorial" FOR UPDATE
  USING (is_editor());

CREATE POLICY "Admin write tutorials"
  ON "Tutorial" FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin update tutorials"
  ON "Tutorial" FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admin delete tutorials"
  ON "Tutorial" FOR DELETE
  USING (is_admin());

-- ====================
-- CATEGORY Table Policies
-- ====================
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories"
  ON "Category" FOR SELECT
  USING (true);

CREATE POLICY "Editor write categories"
  ON "Category" FOR INSERT
  WITH CHECK (is_editor());

CREATE POLICY "Editor update categories"
  ON "Category" FOR UPDATE
  USING (is_editor());

CREATE POLICY "Admin write categories"
  ON "Category" FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin update categories"
  ON "Category" FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admin delete categories"
  ON "Category" FOR DELETE
  USING (is_admin());

-- ====================
-- TAG Table Policies
-- ====================
ALTER TABLE "Tag" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read tags"
  ON "Tag" FOR SELECT
  USING (true);

CREATE POLICY "Editor write tags"
  ON "Tag" FOR INSERT
  WITH CHECK (is_editor());

CREATE POLICY "Editor update tags"
  ON "Tag" FOR UPDATE
  USING (is_editor());

CREATE POLICY "Admin write tags"
  ON "Tag" FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admin update tags"
  ON "Tag" FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admin delete tags"
  ON "Tag" FOR DELETE
  USING (is_admin());

-- ====================
-- ROLE Table Policies
-- ====================
ALTER TABLE "Role" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full roles"
  ON "Role" FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ====================
-- USER Table Policies
-- ====================
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full users"
  ON "User" FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());