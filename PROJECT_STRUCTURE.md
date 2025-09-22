# 📦 Project Structure Documentation

This document explains the folder and file organization of the project, along with best practices for adding new features.

---

## 🗂 Root Directory
```
.
├── app.json          # Expo app configuration (icons, splash, permissions)
├── assets/           # Static assets (images, icons, fonts)
├── index.ts          # App entry point (registers root App component)
├── package.json      # Project dependencies and scripts
├── README.md         # Project documentation
├── tsconfig.json     # TypeScript configuration
└── yarn.lock         # Dependency lockfile
```

---

## 📂 `src/` — Main Application Code

### 1. **`App.tsx`**
- Root component that initializes the app.
- Responsible for wrapping navigation, React Query provider, Zustand persistence, theming, etc.

---

### 2. **`api/`** — API Layer
Handles **network communication** (Axios instance, API requests, and related types).

```
src/api
├── client.ts            # Axios instance (baseURL, interceptors, headers)
├── index.ts             # Export point for api modules
├── requests/            # Organized API requests by domain
│   ├── auth.requests.ts # Auth-related requests (login, register, logout)
│   └── user.requests.ts # User profile requests
└── types.ts             # Shared API request/response TypeScript types
```

✅ **Best Practice**: Keep `requests/` files small and scoped per feature/domain.  
Example: `posts.requests.ts`, `payments.requests.ts`.

---

### 3. **`components/`** — Reusable UI Components
Shared UI building blocks.

```
src/components/ui
├── CustomText/
│   ├── CustomText.tsx  # Implementation of styled text
│   ├── index.ts        # Barrel export
│   └── interface.ts    # TypeScript props interface
└── index.ts            # Export all UI components
```

✅ **Best Practice**:  
- Group each component in its own folder.
- Use `interface.ts` for type safety.
- Export everything through a central `ui/index.ts`.

---

### 4. **`constants/`** — Global Constants
App-wide constants (colors, fonts, query keys).

```
src/constants
├── colors.ts      # Theme color palette
├── fonts.map.ts   # Font family mapping
├── query.keys.ts  # React Query key definitions
└── index.ts       # Barrel export
```

✅ **Best Practice**:  
- Define `queryKeys` centrally so queries/mutations stay consistent across the app.

---

### 5. **`hooks/`** — Custom Hooks
Encapsulates **business logic** and **React Query** integration.

```
src/hooks
├── useAuth.ts  # Authentication-related queries/mutations
└── index.ts    # Barrel export
```

✅ **Best Practice**:  
- Keep one hook per domain (e.g., `usePosts.ts`, `useProfile.ts`).  
- Hooks wrap `api/requests` + `react-query`.

---

### 6. **`navigations/`** — Navigation Setup
Handles app navigation flows with `react-navigation`.

```
src/navigations
├── app/          # Main app stack (post-login)
│   ├── app.navigation.tsx
│   ├── index.ts
│   └── interface.ts
├── auth/         # Authentication flow (login, signup, forgot password)
│   ├── auth.navigation.tsx
│   ├── index.ts
│   └── interface.ts
├── root/         # Root navigator (decides between auth/app flow)
│   ├── root.navigation.tsx
│   ├── index.ts
│   └── interface.ts
└── index.ts      # Barrel export
```

✅ **Best Practice**:  
- Keep each flow in its own folder.
- Use `interface.ts` for typing navigation params.

---

### 7. **`screens/`** — Feature Screens
UI screens grouped by feature/domain.

```
src/screens
├── home/
│   ├── home.screen.tsx  # Home screen implementation
│   ├── index.ts
│   └── interface.ts     # Screen props/types
└── index.ts
```

✅ **Best Practice**:  
- Group each screen in a folder.  
- Use `interface.ts` for props.  
- Use `index.ts` for clean imports.

---

### 8. **`stores/`** — Zustand Stores
Manages **local/client-side state** (non-server).

```
src/stores
├── auth.store.ts  # Authentication state (token, user, etc.)
└── index.ts       # Barrel export
```

✅ **Best Practice**:  
- Use small domain-specific stores (e.g., `ui.store.ts`, `settings.store.ts`).  
- Don’t mix server state (React Query) with client state (Zustand).

---

## 🔑 Key Principles

1. **API separation**:  
   - `client.ts` → Axios setup  
   - `requests/*.ts` → API calls  
   - `hooks/*.ts` → React Query integration  

2. **UI reusability**:  
   Components live in `components/ui/` and are always typed.

3. **State management**:  
   - **React Query** → server state (fetching, mutations).  
   - **Zustand** → client state (UI, theme, temporary state).

4. **Navigation**:  
   Structured by flows (`app`, `auth`, `root`).

5. **Barrel exports (`index.ts`)**:  
   Keeps imports clean:
   ```ts
   import { useAuthStore } from "@stores";
   import { useLogin } from "@hooks";
   import { queryKeys } from "@constants";
   ```

---

⚡ This structure balances **scalability** and **simplicity**.  
New features should add:
- A `requests/*.ts` for API calls.  
- A `useX.ts` hook for queries/mutations.  
- A `store/*.ts` if local state is needed.  
- A `screen/` folder for the UI.
