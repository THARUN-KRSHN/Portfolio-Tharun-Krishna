# Google Sheets Backend For Portfolio

This document contains step-by-step instructions to set up the Google Sheets backend for your Portfolio contact form.

## 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com).
2. Create a **New Spreadsheet**.
3. Name it: `Portfolio Responses` (or any name you prefer).
4. Rename the bottom tab (Sheet1) to: `Sheet1` (default is fine, script uses active sheet or specific name).
5. In **Row 1**, add the following headers:
   - **Column A**: Date
   - **Column B**: Name
   - **Column C**: Email
   - **Column D**: Project Details

## 2. Open Apps Script

1. In the Google Sheet, click on **Extensions** > **Apps Script**.
2. A new tab will open with a code editor.

## 3. Add the Script Code

Delete any code in the `Code.gs` file and paste the following:

```javascript
/*
  Google Apps Script Backend for Portfolio Contact Form
  
  Accepts POST requests with JSON payload:
  {
    "name": "User Name",
    "email": "user@email.com",
    "projectDetails": "Project description..."
  }
  
  Appends a row with [Date, Name, Email, Project Details]
*/

const SHEET_NAME = "Sheet1"; // Verify this matches your sheet tab name

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    const data = JSON.parse(e.postData.contents);

    const newRow = [
      new Date(),           // Column A: Date
      data.name,            // Column B: Name
      data.email,           // Column C: Email
      data.projectDetails   // Column D: Project Details
    ];

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": newRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
```

## 4. Deploy the Script

1. Click on the **Deploy** button (top right) > **New deployment**.
2. Click the **Select type** (gear icon) > **Web app**.
3. Fill in the details:
   - **Description**: Portfolio API
   - **Execute as**: **Me** (your email).
   - **Who has access**: **Anyone** (This is crucial so the form can submit without logging in).
4. Click **Deploy**.
5. You might be asked to **Authorize access**.
   - Click **Review permissions**.
   - Select your Google account.
   - If you see "Google hasn’t verified this app", click **Advanced** > **Go to (Script Name) (unsafe)**.
   - Click **Allow**.

## 5. Get the Web App URL

1. Copy the **Web App URL** provided after deployment. It starts with `https://script.google.com/macros/s/...`.
2. This is your API endpoint.

## 6. Update Your Portfolio Code

I have updated your code to use an environment variable for this URL.
Create a file named `.env.local` in your project root (if it doesn't exist) and add:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/CURRENT_DEPLOYMENT_ID/exec
```

Paste your Web App URL there.
