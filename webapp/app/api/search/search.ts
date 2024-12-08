import type { NextApiRequest, NextApiResponse } from 'next';
import { execFile } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    execFile('/serverside/search', (error, stdout) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).json({ error: 'Error executing file' });
            return;
        }
        res.status(200).json({ message: stdout || 'Process completed' });
    });
}