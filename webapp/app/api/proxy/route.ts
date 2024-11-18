export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const startTime = url.searchParams.get("startTime");
    const endTime = url.searchParams.get("endTime");

    if (!startTime || !endTime) {
      return new Response(JSON.stringify({ error: "Missing startTime or endTime parameters" }), { status: 400 });
    }

    // Construct the target URL without credentials in the URL itself
    const targetUrl = `http://192.168.0.141/cgi-bin/loadfile.cgi?action=startLoad&channel=1&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}&subtype=0`;

    // Set up the Basic Authentication header
    const headers = {
      "Authorization": "Basic " + Buffer.from("admin:testingA!").toString("base64")
    };

    // Fetch data from the target URL with Basic Authentication
    const response = await fetch(targetUrl, { headers });

    if (!response.ok) {
      throw new Error(`Error from target API: ${response.statusText}`);
    }

    const data = await response.text(); // Or response.blob() if it's binary

    return new Response(data, { status: 200, headers: { "Content-Type": "text/plain" } });
  } catch (error) {
    console.error("Error in proxy handler:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch file" }), { status: 500 });
  }
}