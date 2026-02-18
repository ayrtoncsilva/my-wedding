import { createClient } from "@libsql/client"
import path from "path"

const tursoUrl = process.env.TURSO_DATABASE_URL
const tursoToken = process.env.TURSO_AUTH_TOKEN

const useLocal =
  process.env.USE_LOCAL_DB === "true" ||
  !tursoUrl ||
  !tursoToken ||
  tursoUrl.includes("libsql://casamento-ayrton-silva.aws-us-east-1.turso.io") ||
  tursoToken.includes("libsql://casamento-ayrton-silva.aws-us-east-1.turso.io")

export const db = useLocal
  ? createClient({
      url: `file:${path.join(process.cwd(), "prisma", "confirmacoes.sqlite")}`,
    })
  : createClient({
      url: tursoUrl!,
      authToken: tursoToken!,
    })
