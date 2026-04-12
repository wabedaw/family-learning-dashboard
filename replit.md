# David's Family Dashboard

A family learning dashboard and decision assistant for David's family.

## Architecture

- **Type**: Static SPA (React + Vite) served via Express
- **Server**: `server.js` — Express serving the pre-built `dist/` folder
- **Port**: 5000
- **Base path**: `/family-learning-dashboard/`

## Project Structure

```
server.js          # Express server
dist/              # Pre-built frontend (React/Vite)
  index.html
  assets/          # Bundled JS and CSS
  *.png / *.mp4    # Media assets (avatars, pet animations)
package.json
```

## Running

The app is started with `npm start`, which runs `node server.js`. The workflow "Start application" handles this automatically.

## Features

- Family overview with school calendar
- Individual child dashboards (Michael, Lucas)
- AI analysis and learning actions
- Family exercise tracking
- Virtual pet (Hachi) with animations
- Bilingual support (EN / Chinese)
- PDF upload and data analysis
