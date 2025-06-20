# Improved Sidebar Component

A responsive, feature-rich sidebar component for React applications with TypeScript support.

## Features

- **Feature-Styled Architecture**: Organized with a clear separation of concerns
- **TypeScript Type Safety**: Fully typed components for better development experience
- **Responsive Design**: Built-in support for different screen sizes
- **Collapsible**: Easy to collapse and expand
- **Mobile-Friendly**: Backdrop overlay for mobile views
- **Customizable**: Flexible styling options
- **Well-Structured**: Clean and maintainable code

## Architecture

The component follows a feature-styled architecture pattern:

```
/features
  /sidebar
    /components      # UI components
    /context         # Context for state management
    /hooks           # Custom hooks
    index.ts         # Public exports
  /menu
    /components      # UI components
    /context         # Context for menu
    /hooks           # Custom hooks
    index.ts         # Public exports
  /shared
    /hooks           # Shared hooks like useMediaQuery
/types
  sidebar.types.ts   # Type definitions for sidebar
  menu.types.ts      # Type definitions for menu
```

## Usage

Here's a basic example:

```tsx
import { Sidebar } from "./features/sidebar";
import { MenuItem } from "./features/menu";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} toggled={toggled} onBackdropClick={() => setToggled(false)} breakPoint="md">
        <MenuItem icon={<HomeIcon />} active>
          Dashboard
        </MenuItem>
        <MenuItem icon={<UsersIcon />}>Users</MenuItem>
        <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
      </Sidebar>

      <main>
        <button onClick={() => setToggled(!toggled)}>Toggle Sidebar</button>
        <button onClick={() => setCollapsed(!collapsed)}>Collapse Sidebar</button>
      </main>
    </div>
  );
}
```

## Components

### Sidebar

The main container component for the sidebar.

Props:

- `collapsed`: Control if the sidebar is collapsed
- `width`: Width of expanded sidebar
- `collapsedWidth`: Width when collapsed
- `breakPoint`: Responsive breakpoint
- `toggled`: Show sidebar on mobile when true
- `onBackdropClick`: Handler for when backdrop is clicked
- `onBreakPoint`: Callback when breakpoint changes
- `backgroundColor`: Background color of sidebar
- `duration`: Animation duration in ms
- `styles`: Additional styles

### MenuItem

A menu item within the sidebar.

Props:

- `icon`: Icon element
- `prefix`: Optional prefix element
- `suffix`: Optional suffix element
- `active`: Whether the item is active
- `disabled`: Disable the item
- `component`: Custom component to render instead of anchor
- `styles`: Additional styles

## Demo

The project includes a demo that showcases all features of the sidebar component. Check the `SidebarDemo.tsx` file for a complete example implementation.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open your browser at http://localhost:5173/ to see the demo
