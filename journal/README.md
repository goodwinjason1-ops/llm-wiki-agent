# Daybook: journal, to-dos, schedule and voice notes

Daybook is a journal that looks and feels like a paper notebook, with one page per day. Each page holds:

- **Schedule**: your Google Calendar events plus timed to-dos on a timeline, with a "now" line.
- **To-do**: type naturally ("Call mum tomorrow 5pm !"). Unfinished items carry over to today.
- **Journal**: lined paper, a mood check-in, a daily prompt, "three good things" and #tags.
- **Photos, videos & files**: add them to any day. Drag and drop, paste a screenshot, or use the camera. Star a photo to make it that day's cover in the calendar.
- **Motivation**: streaks, a 7-day tracker, gentle nudges ("one line is enough"), a small celebration when you log each day, and 23 achievements.
- **Insights**: time spent reflecting, fun comparisons ("about one marathon at world-record pace"), research on how journaling helps, and your own patterns, such as mood on days you slept 7+ hours or moved your body.
- **Voice notes**: tap the mic and talk. The note is recorded, transcribed live, dated, and saved as an event in Google Calendar. To-dos and appointments you mention ("remind me to…", "dentist on Thursday at 2:30") come up as one-tap suggestions.

It's an installable web app (PWA) and works offline. Your journal lives on your device, and only calendar items are sent to Google.

## Features

| Area | What it does |
|---|---|
| Voice notes | Live transcription (free, in your browser), waveform, pause and resume, playback, editable transcript, auto title, "hashtag work" becomes `#work`, a download button, and "Add to journal" |
| Voice notes → Calendar | Each note becomes an event at the time you recorded it, with the transcript in the description. It can also upload the audio to Google Drive and attach it to the event |
| Smart capture | Finds tasks and events in what you said and offers to add them as to-dos or calendar events |
| To-do | Natural-language dates and times, priority (`!`), durations (`for 30 min`), `#tags`, overdue carry-over, Today, Tomorrow, Next 7 days, Later and Someday groups, undo |
| Google Calendar | Shows events from the calendars you choose. Timed to-dos become events with reminders, and ticking one off marks the event ✅. Edits and deletes sync. Anything made offline syncs once you're back online |
| Journal | Autosave, mood (5 levels), sleep and movement check-in, rotating prompts, gratitude list, dictation straight into the entry, word count, tags |
| Photos & files | Photos, videos, PDFs or any file per day, with thumbnails, captions, a viewer, move to another day, calendar cover photo, and photos in "On this day" |
| Motivation | Anything counts toward the streak (one line, a mood, a photo, a voice note). A "Today in one line" box, a 7-day tracker, a celebration on the first log each day, and 23 achievements |
| Insights | Streak, best streak and a 66-day habit meter. Time reflecting, words written and spoken, fun comparisons, personal patterns (sleep, movement, gratitude vs mood; journaling vs to-dos done), 11 cited research findings, 30-day mood strip |
| Reflection | "On this day" (a week, a month and years ago), a streak counter, and a month view with each day's mood. Stats cover days journaled, words, to-dos done and voice notes, plus a 30-day mood strip |
| Search | Full-text search across journal entries, to-dos and transcripts. Tap a tag to filter |
| Reminders | One tap adds a daily "✍️ Journal" event to Google Calendar, so your phone reminds you |
| Data | JSON backup and restore (audio included), Markdown export of the whole journal, backup reminders, erase |
| Comfort | Light and dark themes, keyboard shortcuts (`r` record, `n` new to-do, `j` journal, `←`/`→` change day, `/` search), swipe between days, installable, works offline |

## Run it locally

No build step is needed. Serve the folder over HTTP:

```bash
cd journal
python3 -m http.server 8080     # then open http://localhost:8080
npm test                         # parser + insights unit tests
```

The microphone needs `https://` or `localhost`.

## Put it on your phone (deploy)

Any static host works. With Netlify:

1. Go to app.netlify.com → **Add new site** → **Import from Git**, then pick this repository.
2. Set the **Base directory** to `journal`. Leave the build command empty and set the publish directory to `.` (as in `netlify.toml`).
3. Open the site on your phone:
   - **iPhone (Safari):** Share → **Add to Home Screen**.
   - **Android (Chrome):** menu → **Install app**.

## Connect Google Calendar (one-time, about 5 minutes)

Daybook talks to Google straight from your browser, so it needs its own free OAuth Client ID:

1. Go to <https://console.cloud.google.com/> and create a project (for example "Daybook").
2. Open **APIs & Services → Library** and enable the **Google Calendar API**. To attach audio to events, also enable the **Google Drive API**.
3. Open **APIs & Services → OAuth consent screen**:
   - Choose **External** and fill in the app name and your email.
   - Under **Test users**, add your own Google account. While the app is in "Testing", only the accounts you list can sign in, which is fine for personal use.
4. Open **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Web application**.
   - **Authorized JavaScript origins**: add your site's address, such as `https://your-site.netlify.app`, and `http://localhost:8080` for local use.
   - No redirect URI is needed.
5. Copy the **Client ID** (it ends in `.apps.googleusercontent.com`).
6. In Daybook, open **Settings → Google Calendar**, paste the Client ID and tap **Connect Google Calendar**.

Then choose which calendars to show and which one new items are saved to.

> **Signing in again:** Google gives browser-only apps a token that lasts about 1 hour. After that, Daybook shows a **Reconnect** button, which is a single tap and needs no password if you're signed in to Google. Nothing is lost while you're signed out: to-dos and voice notes wait and sync on reconnect.

## Transcription

- **Built-in (free):** live transcription through the browser's speech recognition. Works in Chrome, Edge and Safari (iOS 14.5+). Set your language in Settings for the best results.
- **High accuracy (optional):** add an OpenAI API key in Settings. Recordings are then transcribed with Whisper after you stop, which costs about $0.006 per minute. Use it for every note, or only when live transcription caught nothing. The key stays on your device and is never included in backups.

## Privacy

- Journal entries, moods, to-dos, photos, files and audio are stored in your browser's IndexedDB on this device.
- Only items you choose to sync go to Google: timed to-dos, voice-note events and, optionally, audio in Drive.
- Clearing site data or uninstalling the browser deletes your journal, so use **Settings → Back up** regularly. The app reminds you every two weeks.

## Files

```
journal/
  index.html            app shell
  css/styles.css        paper-journal theme, light/dark
  js/app.js             views, sync, interactions
  js/dates.js           natural-language date/time parser + action detection
  js/db.js              IndexedDB storage, backup/restore
  js/gcal.js            Google Calendar + Drive (Google Identity Services)
  js/voice.js           recording, live transcription, dictation, Whisper
  js/files.js           photos/videos/files, thumbnails
  js/insights.js        streaks, achievements, fun facts, research, patterns
  sw.js                 offline cache
  manifest.webmanifest  installable app metadata
  tests/                parser tests (node --test)
```
