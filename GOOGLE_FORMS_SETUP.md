# Google Forms Integration Setup

Follow these steps to connect your registration form to Google Forms:

## Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click "Create a new form" or use a template
3. Add the following fields in order:
   - **Full Name** (Short answer)
   - **School Name** (Short answer)
   - **Email Address** (Short answer)
   - **WhatsApp Number** (Short answer)

## Step 2: Get Form Action URL and Entry IDs

1. Open your Google Form in edit mode
2. Click "Preview" (eye icon) to view the live form
3. Right-click on the page and select "View Page Source"
4. Look for the form action URL:
   ```
   <form action="https://docs.google.com/forms/u/0/d/e/FORM_ID_HERE/formResponse"
   ```
5. Find the entry IDs for each field by searching for `entry.` in the source:
   ```
   name="entry.123456789"  // Full Name
   name="entry.987654321"  // School Name
   name="entry.555666777"  // Email Address
   name="entry.111222333"  // WhatsApp Number
   ```

## Step 3: Setup Environment Variables

1. Copy the `.env.example` file to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your actual Google Form details:
   ```env
   NEXT_PUBLIC_GOOGLE_FORM_ACTION=https://docs.google.com/forms/u/0/d/e/YOUR_ACTUAL_FORM_ID/formResponse
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_FULL_NAME=entry.YOUR_ACTUAL_ENTRY_ID_1
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_SCHOOL_NAME=entry.YOUR_ACTUAL_ENTRY_ID_2
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL=entry.YOUR_ACTUAL_ENTRY_ID_3
   NEXT_PUBLIC_GOOGLE_FORM_ENTRY_WHATSAPP=entry.YOUR_ACTUAL_ENTRY_ID_4
   ```

## Step 4: Test the Integration

1. Save your changes
2. Run your development server: `pnpm dev`
3. Navigate to the registration section
4. Fill out and submit the form
5. Check your Google Form responses to confirm submissions are working

## Alternative: Quick Setup Method

1. Create your Google Form with the 4 fields
2. Open the form in "Preview" mode
3. Open browser developer tools (F12)
4. Fill out the form and click submit
5. In the Network tab, find the POST request to `formResponse`
6. Copy the form action URL and entry parameter names from the request

## Troubleshooting

- **Form not submitting**: Check that the form action URL is correct
- **Data not appearing**: Verify entry IDs match your Google Form fields
- **CORS errors**: This is normal - the hidden iframe handles the submission
- **Multiple submissions**: The form resets after successful submission

## Features Included

✅ Form validation  
✅ Loading states  
✅ Success confirmation  
✅ Error handling  
✅ Form reset after submission  
✅ Responsive design  
✅ Accessibility features

Your registration form is now ready to collect teacher registrations directly to Google Sheets!
