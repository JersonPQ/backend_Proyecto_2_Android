import {config} from "dotenv"

config()

export const PORT = process.env.PORT || 3000
export const MYSQL_HOST = process.env.MYSQL_HOST || "localhost"
export const MYSQL_USER = process.env.MYSQL_USER || "root"
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "root"
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "progest"
export const MYSQL_PORT = process.env.MYSQL_PORT || 3306