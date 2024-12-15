'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
/*
Let me break down this code:

1. `'use client';` - This directive tells Next.js that this is a Client Component, meaning it will be rendered on the client side (browser) rather than the server.

2. The code creates a theme provider component that uses `next-themes` library, which is a popular solution for adding dark/light mode to Next.js applications.

3. Let's break down the imports:
   ```typescript
   import { ThemeProvider as NextThemesProvider } from 'next-themes';
   import { type ThemeProviderProps } from 'next-themes/dist/types';
   ```
   - Imports the ThemeProvider from 'next-themes' and renames it to NextThemesProvider
   - Imports the TypeScript type definition for the provider's props

4. The component definition:
   ```typescript
   export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
     return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
   }
   ```
   - Creates a wrapper component that takes children and additional props
   - Passes all props through to the NextThemesProvider
   - Renders the children within the provider

Main purposes of this code:
1. Provides theme context to your application
2. Enables switching between different themes (like dark/light mode)
3. Handles theme persistence across page reloads
4. Makes theme information available to all child components

This is typically used at a high level in your application (like in layout.tsx) to wrap your entire app with theme functionality.

Example usage:
```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <YourApp />
</ThemeProvider>
```

*/