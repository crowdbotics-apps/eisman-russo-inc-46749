// model/Post.js
import { Model } from "@nozbe/watermelondb"

export default class User extends Model {
  static table = "users"
  @field("email") email
  @field("password") password
  @field("device_id") deviceId
}
ƒ