import { GET } from '../app/api/proxy/route'; // Update the path as needed
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { exec } from 'child_process';

jest.mock('fs/promises');
jest.mock('child_process', () => ({
  exec: jest.fn()
}));

global.fetch = jest.fn();

describe('GET API function', () => {
  const mockFirstResponse = {
    status: 401,
    headers: {
      get: jest.fn().mockReturnValue('Digest realm="TestRealm", nonce="TestNonce", qop="auth"'),
    },
  };

  const mockSecondResponse = {
    ok: true,
    arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
  };
  const mockRequestUrl = 'http://192.168.0.140/cgi-bin/loadfile.cgi?action=startLoad&channel=1&startTime=2025-04-28%2012%3A30%3A00&endTime=2025-04-28%2012%3A32%3A00&subtype=0';

  it('should download file and return success response', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce(mockFirstResponse) // First call to fetch
      .mockResolvedValueOnce(mockSecondResponse); // Second call to fetch

    const req = { url: mockRequestUrl } as Request;

    const response = await GET(req);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fs.writeFile).toHaveBeenCalled();
    expect(exec).toHaveBeenCalled();

    const json = await response.json();
    expect(json).toEqual(expect.objectContaining({ message: 'File downloaded successfully.' }));
  });

  it('should handle error if first fetch does not return 401', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ status: 200 });

    const req = { url: mockRequestUrl } as Request;
    const response = await GET(req);

    expect(await response.json()).toEqual(expect.objectContaining({ error: 'Unexpected response from server.' }));
  });

  it('should handle missing WWW-Authenticate header', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ 
      status: 401,
      headers: { get: jest.fn().mockReturnValue(null) }
    });

    const req = { url: mockRequestUrl } as Request;
    const response = await GET(req);

    expect(await response.json()).toEqual(expect.objectContaining({ error: 'Missing WWW-Authenticate header in server response.' }));
  });

  it('should handle fetch/network error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const req = { url: mockRequestUrl } as Request;
    const response = await GET(req);

    expect(await response.json()).toEqual(expect.objectContaining({ error: 'Proxy request failed.' }));
  });
});
