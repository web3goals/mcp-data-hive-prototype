# App

### Commands

- Install dependencies - `npm install`
- Start development app - `npm run dev`
- Buid and run production app - `npm run build` and `npm run start`
- Deploy to vercel preview - `vercel`
- Deploy to vercel production - `vercel --prod`

## Example of `.env`

```
NEXT_PUBLIC_PRIVY_APP_ID=""

MONGODB_URI=""

RECALL_ACCOUNT_PRIVATE_KEY=""
RECALL_BUCKET=""

MARKETPLACE_ACCOUNT_PRIVATE_KEY=""
```

### How to fix `zustand` error from `@privy-io/react-auth`

Add following lines to `package.json`:

```js
"overrides": {
  "zustand": "4.5.6"
}
```
