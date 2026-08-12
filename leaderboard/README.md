# Wisp leaderboard — setup

The site is static (GitHub Pages), so shared scores need somewhere to live.
`worker.js` is a Cloudflare Worker backed by a KV namespace. Free tier covers
this many times over.

## Dashboard setup (~5 minutes, no CLI)

1. **Create the KV namespace**
   Cloudflare dashboard → *Storage & Databases* → *KV* → **Create namespace**
   → name it `wisp-scores`.

2. **Create the Worker**
   *Compute (Workers)* → **Create** → *Start from Hello World* → name it
   `wisp-scores` → **Deploy**.

3. **Paste the code**
   Open the Worker → **Edit code** → replace everything with the contents of
   `worker.js` → **Deploy**.

4. **Bind the namespace**
   Worker → *Settings* → *Bindings* → **Add binding** → KV namespace:
   - Variable name: `SCORES`
   - Namespace: `wisp-scores`

   Deploy again if prompted.

5. **Copy the URL** — something like
   `https://wisp-scores.<your-subdomain>.workers.dev`

6. **Point the game at it**: in `wisp.html`, set

   ```js
   const API = "https://wisp-scores.<your-subdomain>.workers.dev";
   ```

   ...and the same line in `forge.html`. The board and submit field appear
   automatically once set; with an empty string the games just track a local
   best.

   All free games share this one Worker — `?game=` keeps the boards apart, so
   adding a game means adding its id to `GAMES` in `worker.js`.

## Check it works

```
curl 'https://wisp-scores.<sub>.workers.dev/top?game=wisp'
curl -X POST 'https://wisp-scores.<sub>.workers.dev/score?game=forge' \
     -H 'content-type: application/json' \
     -d '{"name":"TEST","score":7}'
```

## Notes

- One row per name; only an improved score overwrites it.
- Scores are unauthenticated. Range checks, a 20/hour per-IP limit and the
  one-row-per-name rule keep casual junk out, but anyone determined can post a
  fake number. Fine for a visitor board — don't hang anything important on it.
- To wipe a board: KV → `wisp-scores` → delete the `top:<game>` key.
