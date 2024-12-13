import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db: any = null;
async function getDb() {
  if (!db) {
    db = await open({
      filename: "./camapp.db",
      driver: sqlite3.Database,
    });
  }
  return db;
}

export async function PUT(req: Request) {
  try {
    const data = await req.formData();
    const camIp = data.get("ipAddr");
    const camPass = data.get("password");
    const camVend = data.get("ipVend");

    if (!camIp || !camPass || !camVend) {
      return new Response(JSON.stringify({ error: "Missing video name" + camIp + camPass + camVend}), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const db = await getDb();

    await db.run(`INSERT INTO cameras (ipaddr,password,vendor) VALUES (?, ?, ?)`, [camIp,camPass,camVend]);

    return new Response(
      JSON.stringify({ message: "Video name inserted successfully" }),
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