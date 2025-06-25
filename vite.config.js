import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

/*
How does a proxy help?
A proxy acts like a middleman between your frontend and the external API.

- Your frontend sends requests to your local server (which is allowed because it’s the same origin).
- The local server forwards (or “proxies”) those requests to the real API (the different origin).
- The API responds back to the local server.
- The local server sends the response back to your frontend.
- Because your frontend only talks to your local server (same origin), the browser doesn’t block the request.

Why do you need it?
- The real API doesn't allow your browser to fetch directly (due to CORS).
- Using a proxy avoids CORS issues during local development.
- It lets you test your frontend and backend interaction smoothly without changing API code or server settings.
*/


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/contrast': {
        target: 'https://www.aremycolorsaccessible.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/contrast/, '/api/are-they'),
      },
    },
  },
})

/*Cross-origin request: webpage (or app) tries to get data from a different origin than the one it was loaded from.
Your React app running at http://localhost:5173 tries to fetch from https://aremycolorsaccessible.com
→ Cross-origin! Different domain and protocol.

Your React app running at http://localhost:5173 tries to fetch from http://localhost:5173/api
→ Same origin! Protocol, domain, and port all match.

Why does this matter?
Browsers block some cross-origin requests by default for security reasons. 
This is to protect users from malicious websites sneaking data or doing harmful things without permission.
*/
