// Watches /tmp/cf-tunnel.err for new tunnel URLs
// Updates OpenClaw workspace files and resets agent sessions
import { readFileSync, writeFileSync, existsSync, watchFile } from 'fs';

const TUNNEL_ERR = '/tmp/cf-tunnel.err';
const LAST_URL_FILE = '/tmp/cf-tunnel-last-url.txt';
const WORKSPACE = '/Users/a1/.openclaw/workspace';
const SESSIONS_FILE = '/Users/a1/.openclaw/agents/main/sessions/sessions.json';

const FILES_TO_UPDATE = [
  `${WORKSPACE}/CHILD-ROUTER.md`,
  `${WORKSPACE}/SOUL.md`,
  `${WORKSPACE}/dashboard-data/API-GUIDE.md`,
];

function getLastUrl() {
  try { return readFileSync(LAST_URL_FILE, 'utf8').trim(); } catch { return ''; }
}

function extractUrlFromLog() {
  try {
    const log = readFileSync(TUNNEL_ERR, 'utf8');
    const matches = log.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/g);
    return matches ? matches[matches.length - 1] : '';
  } catch { return ''; }
}

function updateWorkspaceFiles(oldUrl, newUrl) {
  for (const file of FILES_TO_UPDATE) {
    try {
      let content = readFileSync(file, 'utf8');
      if (oldUrl) {
        content = content.replaceAll(oldUrl, newUrl);
      } else {
        content = content.replace(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/g, newUrl);
      }
      writeFileSync(file, content);
      console.log(`Updated: ${file}`);
    } catch (e) {
      console.error(`Failed to update ${file}: ${e.message}`);
    }
  }
}

function resetSessions() {
  try {
    const data = JSON.parse(readFileSync(SESSIONS_FILE, 'utf8'));
    for (const key of Object.keys(data)) {
      if (data[key].systemSent !== undefined) {
        data[key].systemSent = false;
      }
    }
    writeFileSync(SESSIONS_FILE, JSON.stringify(data, null, 2));
    console.log('Agent sessions reset');
  } catch (e) {
    console.error(`Failed to reset sessions: ${e.message}`);
  }
}

function check() {
  const newUrl = extractUrlFromLog();
  const oldUrl = getLastUrl();

  if (newUrl && newUrl !== oldUrl) {
    console.log(`${new Date().toISOString()} URL changed: ${oldUrl || '(none)'} -> ${newUrl}`);
    updateWorkspaceFiles(oldUrl, newUrl);
    writeFileSync(LAST_URL_FILE, newUrl);
    // Also write to a simple file for other tools
    writeFileSync('/tmp/cf-tunnel-url.txt', newUrl);
    resetSessions();
  }
}

// Initial check
check();

// Watch the tunnel error log for changes
if (existsSync(TUNNEL_ERR)) {
  watchFile(TUNNEL_ERR, { interval: 5000 }, check);
} else {
  // Poll until file exists
  const interval = setInterval(() => {
    if (existsSync(TUNNEL_ERR)) {
      check();
      watchFile(TUNNEL_ERR, { interval: 5000 }, check);
      clearInterval(interval);
    }
  }, 5000);
}

console.log('Tunnel URL sync watcher started');
