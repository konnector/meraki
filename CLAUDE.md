# Meraki Sheets Project Structure

## Directory Structure

The project follows a standard Next.js structure with the following organization:

```
/
├── src/
│   ├── app/                    # Next.js App Router components
│   │   ├── auth/               # Authentication pages
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── settings/           # Settings pages
│   │   ├── sheets/             # Sheet editor pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles
│   │   └── fonts.css           # Font definitions
│   │
│   ├── components/             # React components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── features/           # Feature-specific components
│   │   │   └── sheets/         # Sheet editor components
│   │   ├── magicui/            # UI animation components 
│   │   ├── spreadsheet/        # Spreadsheet components
│   │   └── ui/                 # Common UI components
│   │
│   ├── lib/                    # Utility functions
│   │   ├── sheets.ts           # Spreadsheet operations
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts            # Common utilities
│   │
│   └── types/                  # TypeScript type definitions
│       ├── database.types.ts   # Database schema types
│       └── supabase.ts         # Supabase types
│
├── public/                     # Static assets
│   ├── fonts/                  # Font files
│   └── ...                     # Other static assets
│
└── supabase/                   # Supabase configuration
    └── migrations/             # Database migration files
```

## File Organization Guidelines

1. **Components**: 
   - Place all React components in the `src/components` directory
   - Organize by feature or page (dashboard, sheets, etc.)
   - Common UI components go in `src/components/ui`

2. **Pages**:
   - All pages live in the `src/app` directory following Next.js App Router pattern
   - Use Next.js file-based routing conventions

3. **Utilities**:
   - Keep utility functions in `src/lib`
   - Database operations in feature-specific files (e.g., `sheets.ts`)
   - Common utilities in `utils.ts`

4. **Types**:
   - All TypeScript interfaces and types in `src/types`
   - Database schema types in `database.types.ts`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```