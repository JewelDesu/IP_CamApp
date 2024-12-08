
import { execFile } from 'child_process';

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
    execFile('/serverside/search').unref()
  }