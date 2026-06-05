# Web Notepad (Windows style)

A browser-based text editor that imitates Windows Notepad UI and basic behavior.

## Features

- Windows Notepad-like title bar, menu bar, status bar, and plain text area
- Multi-tab editing (new tab, close tab, tab switch, middle-click close)
- Drag-and-drop tab reordering
- Tab context menu (close tab, close others, close tabs to the right, reopen closed tab)
- File operations: New (clear current tab), Open, Save, Save As
- Edit operations: Undo, Cut, Copy, Paste, Delete, Find, Replace, Select All, Time/Date
- Unsaved-changes 3-way confirmation (Save / Don't Save / Cancel) when closing tab or exiting
- Session restore for tabs, contents, cursor position, and scroll offset via localStorage
- Format operations: Word Wrap
- View operations: Status Bar
- Save/open text files on local device (Chromebook supported by browser file APIs)
- Save/open text files on Google Drive
- Keyboard shortcuts: Ctrl+S/O/F/H/G, Ctrl+N/T, Ctrl+W, Ctrl+Tab / Ctrl+Shift+Tab, Ctrl+PgUp/PgDn, F3, F5

## Files

- `index.html`: UI structure
- `styles.css`: Windows-like styling
- `app.js`: tab state management, editor logic, keyboard shortcuts, local file API, Google Drive API calls, session restore

## Run

Open `index.html` in a modern browser.

For best local file save behavior on Chromebook, use Chrome browser and open with a local or hosted HTTP URL.

Hosted version (GitHub Pages):

- https://ytmknd.github.io/WebNotepad/

## PWA Install (Chromebook)

To make this app installable as a Chromebook app, run it over HTTP/HTTPS (not `file://`).

1. Start a local server in this folder.
2. Open the served URL in Chrome (for example `http://localhost:5500`).
3. In the app menu, choose Help > Install App.
4. If the install prompt does not appear, use Chrome menu > Install App.

Example local server:

```powershell
npx http-server . -p 5500
```

## Google Drive Setup

Drive features require OAuth client setup in Google Cloud.

1. Create a Google Cloud project.
2. Enable `Google Drive API`.
3. Configure OAuth consent screen.
4. Create an OAuth Client ID for Web application.
5. Add authorized JavaScript origins for your app host (for example `http://localhost:5500`).
6. Open `config.js` and set:

```js
window.WEB_NOTEPAD_CONFIG = {
  driveClientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
  chromebookDriveClientId: ""
};
```

## Chromebook Auto Google Drive Setup

You can automatically configure Google Drive OAuth on Chromebook without opening the settings dialog.

Option A: `config.js` (recommended)

Edit `config.js` and set either value:

```js
window.WEB_NOTEPAD_CONFIG = {
  driveClientId: "",
  chromebookDriveClientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
};
```

Option B: URL parameter

Open the app with:

```text
http://localhost:5500/?driveClientId=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

Behavior:

- If browser is Chromebook (`CrOS`) and Drive setting is empty, app auto applies `chromebookDriveClientId` (or `driveClientId`).
- If `driveClientId` URL parameter is present, it is applied first.
- Applied value is stored in `localStorage` for next launches.

## Notes

- Scope `drive.file` lets this app create/open files the user selects or creates with this app.
- If browser File System Access API is unavailable, local Save As falls back to download.
- Google Drive operations require user sign-in and consent.
- Service Worker caches app shell files for faster launch and basic offline behavior.
- Tab session data is stored in `localStorage` key `web-notepad.session.v1`.

## License

This project is licensed under the MIT License.
