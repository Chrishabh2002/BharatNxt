import { NextResponse } from "next/server";

// Server-side route. Keeps the Google Apps Script URL secret and avoids CORS,
// because the browser only ever talks to our own /api/submit endpoint.
export async function POST(request) {
  try {
    const body = await request.json();

    // --- basic validation ---
    const name = (body.name || "").toString().trim();
    const phone = (body.phone || "").toString().trim();
    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required." },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { ok: false, error: "Server not configured (GOOGLE_SCRIPT_URL missing)." },
        { status: 500 }
      );
    }

    // forward to Google Apps Script
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email: (body.email || "").toString().trim(),
        service: (body.service || "").toString().trim(),
        message: (body.message || "").toString().trim(),
      }),
      // Apps Script web apps redirect (302) to googleusercontent — follow it.
      redirect: "follow",
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Sheet write failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
