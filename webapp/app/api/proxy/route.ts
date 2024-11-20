import { NextResponse } from "next/server";
import fetch from "node-fetch";
import crypto from "crypto";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  const username = "admin";
  const password = "testingA!";
  const uri = `/cgi-bin/loadfile.cgi?action=startLoad&channel=1&startTime=${startTime}&endTime=${endTime}&subtype=0`;
  const url = `http://192.168.0.141${uri}`;

  try {
    const firstResponse = await fetch(url, {
      method: "GET",
    });

    if (firstResponse.status !== 401) {
      return NextResponse.json({ error: "Unexpected response from server." }, { status: firstResponse.status });
    }

    const wwwAuthenticate = firstResponse.headers.get("www-authenticate");
    if (!wwwAuthenticate) {
      return NextResponse.json({ error: "Missing WWW-Authenticate header in server response." }, { status: 500 });
    }

    const authParams = parseDigestHeader(wwwAuthenticate);

    const cnonce = crypto.randomBytes(8).toString("hex");
    const nc = "00000001";
    const ha1 = crypto.createHash("md5").update(`${username}:${authParams.realm}:${password}`).digest("hex");
    const ha2 = crypto.createHash("md5").update(`GET:${uri}`).digest("hex");
    const response = crypto
      .createHash("md5")
      .update(`${ha1}:${authParams.nonce}:${nc}:${cnonce}:${authParams.qop}:${ha2}`)
      .digest("hex");

    const authHeader = `Digest username="${username}", realm="${authParams.realm}", nonce="${authParams.nonce}", uri="${uri}", algorithm="MD5", qop=${authParams.qop}, nc=${nc}, cnonce="${cnonce}", response="${response}"`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
    })
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "loadfile.cgi";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
 

     //const data = await secondResponse;

    //  if (!secondResponse.ok) {
    //    return NextResponse.json({ error: data }, { status: secondResponse.status });
    //  }

    //return NextResponse.json({ secondResponse });
  } catch (error) {
    console.error("Error in proxy:", error);
    return NextResponse.json({ error: "Proxy request failed." }, { status: 500 });
  }
}

function parseDigestHeader(header: string) {
  const authParams: Record<string, string> = {};
  const regex = /(\w+)=["]?([^",]+)["]?/g;
  let match;

  while ((match = regex.exec(header)) !== null) {
    authParams[match[1]] = match[2];
  }

  return authParams;
}








//const apiUrl = `http://192.168.0.141/cgi-bin/loadfile.cgi?action=startLoad&channel=1&startTime=${encodedStartTime}&endTime=${encodedEndTime}&subtype=0`;
