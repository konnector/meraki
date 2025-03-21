# Meraki Sheets

A modern, collaborative sheet editing application built with Next.js, React, and Supabase.

## Project Structure

```
/
├── src/                  # Source directory 
│   ├── app/              # Next.js app directory (routes)
│   │   ├── auth/         # Authentication routes
│   │   ├── dashboard/    # Dashboard routes
│   │   ├── sheets/       # Sheets routes
│   │   └── layout.tsx    # Root layout
│   │
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── buttons/  # Button components
│   │   │   ├── cards/    # Card components
│   │   │   ├── forms/    # Form components
│   │   │   └── layout/   # Layout components
│   │   ├── features/     # Feature-specific components
│   │   │   ├── auth/     # Authentication components
│   │   │   ├── sheets/   # Sheet-related components
│   │   │   └── dashboard/# Dashboard components
│   │   └── shared/       # Shared components
│   │
│   ├── lib/              # Utility functions and hooks
│   │   ├── sheets.ts     # Sheet operations
│   │   ├── supabase.ts   # Supabase client
│   │   └── utils.ts      # Utility functions
│   │
│   └── types/            # TypeScript type definitions
│       ├── database.types.ts # Database types
│       └── supabase.ts   # Supabase types
│
├── public/               # Static files
└── supabase/             # Supabase configuration
    └── migrations/       # Database migrations
```

## Component Naming Conventions

- Use PascalCase for component files
- Prefix components with their type:
  - `Button` - ButtonPrimary.tsx, ButtonSecondary.tsx
  - `Card` - CardSheet.tsx, CardAnalytics.tsx
  - `Form` - FormLogin.tsx, FormCreateSheet.tsx

## Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

## Features

- Modern UI with Tailwind CSS and DaisyUI
- Real-time collaboration
- Authentication with Supabase
- Responsive design
- Auto-saving
- Version history

## Best Practices

- Use Server Components by default
- Add 'use client' directive only when needed
- Follow TypeScript best practices
- Implement proper error boundaries
- Use proper loading states
- Implement proper form validation
- Follow accessibility guidelines

## Core Features

- **Modern Interface**: Clean, minimalist design with a black, grey, and white color scheme
- **Real-time Collaboration**: Work together with team members simultaneously
- **Cloud Storage**: Automatic saving and secure storage with Supabase
- **Responsive Design**: Works seamlessly across desktop and tablet devices

### Spreadsheet Features
- Interactive spreadsheet grid with customizable rows and columns
- Advanced cell formatting options
- Formula support with common functions
- Keyboard shortcuts for efficient navigation
- Import/Export functionality

### User Features
- Secure authentication with Supabase
- Personal and team workspaces
- Customizable user and company profiles
- Role-based access control
- Email notifications and preferences

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with DaisyUI
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **State Management**: React Hooks
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meraki-sheets.git
   cd meraki-sheets
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials in `.env.local`

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|--------------|-------|
| Navigate cells | Arrow keys | Arrow keys |
| Next cell | Tab | Tab |
| Previous cell | Shift + Tab | Shift + Tab |
| Edit cell | F2 | F2 |
| Format bold | Ctrl + B | ⌘ + B |
| Format italic | Ctrl + I | ⌘ + I |
| Format underline | Ctrl + U | ⌘ + U |

## Formula Support

Start formulas with `=` in any cell. Supported functions:

- `SUM(range)`: Sum values in range
- `AVERAGE(range)`: Calculate average
- `MAX(range)`: Find maximum value
- `MIN(range)`: Find minimum value
- `COUNT(range)`: Count non-empty cells

Example: `=SUM(A1:B3)` or `=A1+B2*C3`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Next.js team for the amazing framework
- Supabase team for the backend infrastructure
- All contributors who help improve Meraki Sheets