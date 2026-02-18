export async function submitToGoogleSheet(formData: {
    name: string;
    email: string;
    projectDetails: string;
}) {
    try {
        const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

        if (!scriptUrl) {
            throw new Error("Google Script URL is not configured. Please set NEXT_PUBLIC_GOOGLE_SCRIPT_URL in .env.local file.");
        }

        const response = await fetch(scriptUrl, {
            method: "POST",
            body: JSON.stringify(formData),
            // Use no-cors to bypass CORS issues if the specific Google Script config requires it,
            // but usually standard fetch with text/plain body works fine.
            // Note: Google Apps Script 'doPost' receives the body as string in 'e.postData.contents'.
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        return await response.json();
    } catch (error) {
        console.error("Error submitting to Google Sheet:", error);
        throw error;
    }
}
