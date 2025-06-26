import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

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


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api/contrast': {
//         target: 'https://www.aremycolorsaccessible.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/contrast/, '/api/are-they'),
//       },
//     },
//   },
// })

/*Cross-origin request: webpage (or app) tries to get data from a different origin than the one it was loaded from.
Your React app running at http://localhost:5173 tries to fetch from https://aremycolorsaccessible.com
→ Cross-origin! Different domain and protocol.

Your React app running at http://localhost:5173 tries to fetch from http://localhost:5173/api
→ Same origin! Protocol, domain, and port all match.

Why does this matter?
Browsers block some cross-origin requests by default for security reasons. 
This is to protect users from malicious websites sneaking data or doing harmful things without permission.
*/






/*
// utils/contrastCheck.js
export async function fetchContrast(bcolor, fcolor) {
  try {
    const response = await fetch("https://aremycolorsaccessible.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bcolor, fcolor }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Contrast check failed", err);
    return null;
  }
}



import { useEffect } from "react";
import { fetchContrast } from "./utils/contrastCheck";

function App() {
  // 👇 test call inside useEffect
  useEffect(() => {
    async function testContrast() {
      const result = await fetchContrast("#ff4a11", "#ffffff");
      console.log("Contrast API result:", result);
    }

    testContrast();
  }, []);

  // ...rest of your component
}















localhost/:1 Access to fetch at 'https://aremycolorsaccessible.com/api' from origin 'http://localhost:5173' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: Redirect is not allowed for a preflight request.Understand this error
contrastCheck.js:3 
            
            
           POST https://aremycolorsaccessible.com/api net::ERR_FAILED
fetchContrast @ contrastCheck.js:3
testContrast @ App.jsx:17
(anonymous) @ App.jsx:21
commitHookEffectListMount @ react-dom_client.js?v=2b29a93a:16904
invokePassiveEffectMountInDEV @ react-dom_client.js?v=2b29a93a:18320
invokeEffectsInDev @ react-dom_client.js?v=2b29a93a:19697
commitDoubleInvokeEffectsInDEV @ react-dom_client.js?v=2b29a93a:19682
flushPassiveEffectsImpl @ react-dom_client.js?v=2b29a93a:19499
flushPassiveEffects @ react-dom_client.js?v=2b29a93a:19443
(anonymous) @ react-dom_client.js?v=2b29a93a:19324
workLoop @ react-dom_client.js?v=2b29a93a:197
flushWork @ react-dom_client.js?v=2b29a93a:176
performWorkUntilDeadline @ react-dom_client.js?v=2b29a93a:384Understand this error
contrastCheck.js:14 Contrast check failed TypeError: Failed to fetch
    at fetchContrast (contrastCheck.js:3:28)
    at testContrast (App.jsx:17:28)
    at App.jsx:21:5
    at commitHookEffectListMount (react-dom_client.js?v=2b29a93a:16904:34)
    at invokePassiveEffectMountInDEV (react-dom_client.js?v=2b29a93a:18320:19)
    at invokeEffectsInDev (react-dom_client.js?v=2b29a93a:19697:19)
    at commitDoubleInvokeEffectsInDEV (react-dom_client.js?v=2b29a93a:19682:15)
    at flushPassiveEffectsImpl (react-dom_client.js?v=2b29a93a:19499:13)
    at flushPassiveEffects (react-dom_client.js?v=2b29a93a:19443:22)
    at react-dom_client.js?v=2b29a93a:19324:17
overrideMethod @ hook.js:608
fetchContrast @ contrastCheck.js:14
await in fetchContrast
testContrast @ App.jsx:17
(anonymous) @ App.jsx:21
commitHookEffectListMount @ react-dom_client.js?v=2b29a93a:16904
invokePassiveEffectMountInDEV @ react-dom_client.js?v=2b29a93a:18320
invokeEffectsInDev @ react-dom_client.js?v=2b29a93a:19697
commitDoubleInvokeEffectsInDEV @ react-dom_client.js?v=2b29a93a:19682
flushPassiveEffectsImpl @ react-dom_client.js?v=2b29a93a:19499
flushPassiveEffects @ react-dom_client.js?v=2b29a93a:19443
(anonymous) @ react-dom_client.js?v=2b29a93a:19324
workLoop @ react-dom_client.js?v=2b29a93a:197
flushWork @ react-dom_client.js?v=2b29a93a:176
performWorkUntilDeadline @ react-dom_client.js?v=2b29a93a:384Understand this error
App.jsx:18 Contrast API result: null
localhost/:1 Access to fetch at 'https://aremycolorsaccessible.com/api' from origin 'http://localhost:5173' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: Redirect is not allowed for a preflight request.Understand this error
contrastCheck.js:3 
            
            
           POST https://aremycolorsaccessible.com/api net::ERR_FAILED
fetchContrast @ contrastCheck.js:3
testContrast @ App.jsx:17
(anonymous) @ App.jsx:21
commitHookEffectListMount @ react-dom_client.js?v=2b29a93a:16904
commitPassiveMountOnFiber @ react-dom_client.js?v=2b29a93a:18152
commitPassiveMountEffects_complete @ react-dom_client.js?v=2b29a93a:18125
commitPassiveMountEffects_begin @ react-dom_client.js?v=2b29a93a:18115
commitPassiveMountEffects @ react-dom_client.js?v=2b29a93a:18105
flushPassiveEffectsImpl @ react-dom_client.js?v=2b29a93a:19486
flushPassiveEffects @ react-dom_client.js?v=2b29a93a:19443
(anonymous) @ react-dom_client.js?v=2b29a93a:19324
workLoop @ react-dom_client.js?v=2b29a93a:197
flushWork @ react-dom_client.js?v=2b29a93a:176
performWorkUntilDeadline @ react-dom_client.js?v=2b29a93a:384Understand this error
contrastCheck.js:14 Contrast check failed TypeError: Failed to fetch
    at fetchContrast (contrastCheck.js:3:28)
    at testContrast (App.jsx:17:28)
    at App.jsx:21:5
    at commitHookEffectListMount (react-dom_client.js?v=2b29a93a:16904:34)
    at commitPassiveMountOnFiber (react-dom_client.js?v=2b29a93a:18152:19)
    at commitPassiveMountEffects_complete (react-dom_client.js?v=2b29a93a:18125:17)
    at commitPassiveMountEffects_begin (react-dom_client.js?v=2b29a93a:18115:15)
    at commitPassiveMountEffects (react-dom_client.js?v=2b29a93a:18105:11)
    at flushPassiveEffectsImpl (react-dom_client.js?v=2b29a93a:19486:11)
    at flushPassiveEffects (react-dom_client.js?v=2b29a93a:19443:22)
overrideMethod @ hook.js:608
fetchContrast @ contrastCheck.js:14
await in fetchContrast
testContrast @ App.jsx:17
(anonymous) @ App.jsx:21
commitHookEffectListMount @ react-dom_client.js?v=2b29a93a:16904
commitPassiveMountOnFiber @ react-dom_client.js?v=2b29a93a:18152
commitPassiveMountEffects_complete @ react-dom_client.js?v=2b29a93a:18125
commitPassiveMountEffects_begin @ react-dom_client.js?v=2b29a93a:18115
commitPassiveMountEffects @ react-dom_client.js?v=2b29a93a:18105
flushPassiveEffectsImpl @ react-dom_client.js?v=2b29a93a:19486
flushPassiveEffects @ react-dom_client.js?v=2b29a93a:19443
(anonymous) @ react-dom_client.js?v=2b29a93a:19324
workLoop @ react-dom_client.js?v=2b29a93a:197
flushWork @ react-dom_client.js?v=2b29a93a:176
performWorkUntilDeadline @ react-dom_client.js?v=2b29a93a:384Understand this error
App.jsx:18 Contrast API result: null
*/