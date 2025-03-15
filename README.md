# Meraki Sheets

A feature-rich web-based spreadsheet application built with Next.js and Tailwind CSS, offering functionality similar to Google Sheets.

## Features

- Interactive spreadsheet grid with rows and columns
- Cell formatting (bold, italic, underline, text alignment, font size, font family)
- Text and background color customization
- Column and row resizing
- Cell selection and multi-cell selection
- Formula support (SUM, AVERAGE, MAX, MIN, COUNT)
- Keyboard navigation and shortcuts
- Responsive design

## Keyboard Shortcuts

- **Arrow keys**: Navigate cells
- **Tab / Shift+Tab**: Move right/left
- **Enter / Shift+Enter**: Move down/up
- **F2**: Edit the current cell
- **Ctrl+B**: Toggle bold
- **Ctrl+I**: Toggle italic
- **Ctrl+U**: Toggle underline
- **Home/End**: Move to first/last column in the row
- **Page Up/Down**: Move 10 rows up/down

## Formula Support

Type formulas starting with `=` in any cell. Supported functions include:

- `=SUM(A1:B3)`: Sum values in range
- `=AVERAGE(A1:B3)`: Calculate average of values in range
- `=MAX(A1:B3)`: Find maximum value in range
- `=MIN(A1:B3)`: Find minimum value in range
- `=COUNT(A1:B3)`: Count non-empty cells in range

You can also reference cells directly in calculations, for example:
- `=A1+B1`
- `=A1*B2+C3`

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Technology Stack

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling and responsive design
- **React**: For building the user interface

## License

This project is licensed under the ISC License.