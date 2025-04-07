import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;
async function getDb() {
  if (!db) {
    db = await open({
      filename: "./camapp.db",
      driver: sqlite3.Database,
    });
  }
  return db;
}

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const ID = data.get("delete");

    if (!ID) {
      return new Response(JSON.stringify({ error: "Missing video name" + ID}), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const db = await getDb();

    await db.run(`DELETE FROM cameras WHERE ID = ?`, [ID]);

    return new Response(
      JSON.stringify({ message: "Deleted successfully" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database operation failed"  }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}