import {createConnection} from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
        const db = await createConnection()
        const sql = "SELECT * FROM active_ips";
        const [ips] = await db.query({sql});
        return NextResponse.json({posts: ips})
}
