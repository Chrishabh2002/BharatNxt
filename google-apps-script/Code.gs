/**
 * BharatNxt — Lead capture into Google Sheet
 * ------------------------------------------------------------------
 * SETUP (one time):
 * 1. Create a Google Sheet. In row 1 add these headers (exact order):
 *      Timestamp | Name | Phone | Email | Service | Message
 * 2. In the Sheet:  Extensions  ->  Apps Script
 * 3. Delete any sample code, paste THIS whole file, and Save.
 * 4. Deploy -> New deployment -> select type "Web app"
 *      - Description : leads
 *      - Execute as  : Me
 *      - Who has access : Anyone
 *    Click Deploy, authorize, and COPY the Web app URL.
 * 5. Put that URL in your Next.js .env.local as GOOGLE_SCRIPT_URL.
 * ------------------------------------------------------------------
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.service || "",
      data.message || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you open the Web app URL in a browser to confirm it is live.
function doGet() {
  return ContentService
    .createTextOutput("BharatNxt lead endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
