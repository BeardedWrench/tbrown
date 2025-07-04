import { execSync } from 'child_process'

function run(cmd: string, label: string) {
  console.log(`\n🔁 ${label}...`)
  try {
    execSync(cmd, { stdio: 'inherit' })
    console.log(`✅ ${label} complete`)
  } catch (err) {
    console.error(err)
    console.error(`❌ ${label} failed`)
    process.exit(1)
  }
}

const SUPABASE_PROJECT_ID = 'tgahbosqsaxvsheqbjdu'

run('npx prisma generate', 'Prisma generate')
run('npx prisma db push', 'Prisma DB push')
run(`npx supabase gen types typescript --project-id ${SUPABASE_PROJECT_ID} > src/types/supabase.ts`, 'Supabase types')