# GoatFlop - Poker Strategy App Guide

## Commands
- `npm run dev` - Start dev server with Turbopack
- `npm run build` - Build production app
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style
- **TypeScript**: Use strict typing for all new code
- **Imports**: Use `@/` path alias (e.g., `@/components/ui/button`)
- **Components**: Follow shadcn/ui patterns for consistency
- **Types**: Define types in `/src/lib/types.ts` for app-wide use
- **Naming**:
  - React components: PascalCase
  - Functions/variables: camelCase
  - Type definitions: PascalCase
- **File structure**:
  - UI components in `/src/components/ui`
  - App pages in `/src/app/`
  - Utility functions in `/src/lib/`
- **Error handling**: Use `notFound()` for invalid routes/params

## Architecture Notes
App displays poker strategy charts based on position and scenario selection.
Position parameter validation is critical for proper image loading.