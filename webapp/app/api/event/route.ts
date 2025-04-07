import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function GET() {
  if (!db) {
    db = await open({
      filename: "./camapp.db",
      driver: sqlite3.Database,
    });
  }

  const items = await db.all("SELECT * FROM event");

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}