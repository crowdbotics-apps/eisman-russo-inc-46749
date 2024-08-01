// model/schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb"

export const ezDebriSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        { name: "email", type: "string" },
        { name: "password", type: "string" },
        { name: "device_id", type: "string" }
      ]
    })
  ]
})
