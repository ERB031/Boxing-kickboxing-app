# Shot Caller Nak Muay 2.0

A neon-soaked Muay Thai and kickboxing session builder rebuilt from scratch with a focus on cinematic UI/UX. This static build is perfect for hosting on the web or porting into a hybrid mobile shell.

## Features

- **Adaptive combo engine** – choose style, focus, and difficulty to generate fresh striking sequences.
- **Playlist curator** – save combos, clear them, or remove individual drills mid-session.
- **Round timer** – configurable fight/rest phases with animated progress and intensity gradients.
- **Session architect** – pre-built fight camp flow with neon highlights for the “engine room.”
- **Voice cues** – optional speech synthesis for hands-free training calls (browser support required).
- **Holographic hero animation** – canvas-powered orbiting particles tuned for futuristic vibes.

## Running locally

This is a vanilla HTML/CSS/JS site. No build step required.

```bash
# serve with any static file server
python -m http.server 4173
```

Then open <http://localhost:4173> in your browser.

## Porting into a mobile shell

- Wrap the site with Capacitor, Expo WebView, or any hybrid container.
- Inject native audio or haptics using the existing button hooks (`#speak-combo`, `#start-timer`, etc.).
- Replace the toast helper with native snackbars if desired.

## License

MIT
