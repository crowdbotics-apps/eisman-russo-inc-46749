import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import { ezDebriSchema } from "./schemas/schema"
import { Database } from "@nozbe/watermelondb"
import User from "./models/User"
const adapter = new SQLiteAdapter({
  schema: ezDebriSchema
})

export const database = new Database({
  adapter,
  modelClasses: [User],
  actionEnabled: true
})
