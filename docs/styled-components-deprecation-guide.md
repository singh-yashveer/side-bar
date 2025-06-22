# Styled Components Deprecation Guide

This document outlines the steps to migrate from styled-components to CSS Modules in the Sidebar component project.

## Why Migrate from Styled Components to CSS Modules?

1. **Better Performance**

   - No runtime overhead for generating styles
   - Styles are compiled at build time

2. **Better TypeScript Integration**

   - First-class TypeScript support
   - Proper type checking for CSS classes

3. **Better Separation of Concerns**

   - CSS stays as CSS
   - Component logic stays as JavaScript/TypeScript

4. **More Accessible to CSS Developers**
   - Uses familiar CSS syntax
   - No need to learn styled-components specific syntax

## Migration Steps

### 1. Install Dependencies

```bash
npm install --save-dev typescript-plugin-css-modules
```

### 2. Configure TypeScript

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
    // rest of your config
  }
}
```

### 3. Create CSS Module Type Declarations

Create `src/types/css-modules.d.ts`:

```typescript
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}
```

### 4. Convert Styled Components to CSS Modules

For each styled component:

1. Create a `.module.css` file with the same name as your component
2. Move the CSS styles from the styled component to the CSS module
3. Create a new component that imports the CSS module
4. Update imports to use the new component

#### Example: Converting a styled component:

**Before (styled-components):**

```tsx
const StyledButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

export const Button = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>;
```

**After (CSS Modules):**

Button.module.css:

```css
.button {
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: darkblue;
}
```

Button.tsx:

```tsx
import styles from "./Button.module.css";
import classNames from "classnames";

export const Button = ({ children, className, ...props }) => (
  <button className={classNames(styles.button, className)} {...props}>
    {children}
  </button>
);
```

### 5. Handling Dynamic Styles

For dynamic styles that were using props in styled-components, use inline styles or conditional classes:

**Before (styled-components):**

```tsx
const StyledBox = styled.div`
  background-color: ${(props) => (props.active ? "blue" : "gray")};
  width: ${(props) => props.width || "100%"};
`;
```

**After (CSS Modules with conditional classes):**

```css
.box {
  width: 100%;
}

.active {
  background-color: blue;
}

.inactive {
  background-color: gray;
}
```

```tsx
<div className={classNames(styles.box, active ? styles.active : styles.inactive)} style={{ width: width || "100%" }}>
  {children}
</div>
```

## Migration Strategy

1. **Incremental Migration**

   - Convert one component at a time
   - Start with leaf components and work your way up

2. **Side-by-Side Testing**

   - Keep both implementations until you're confident in the new one
   - Create CSS Module versions alongside styled components versions

3. **Update References**

   - Once a component is migrated, update all imports to use the new component

4. **Remove styled-components**
   - After all components are migrated, remove the styled-components dependency

## Benefits After Migration

- **Smaller Bundle Size**: No styled-components runtime
- **Faster Initial Render**: No need to generate styles at runtime
- **Better TypeScript Integration**: Full type checking for CSS classes
- **Easier Debugging**: CSS appears in the browser as normal CSS
- **Better Performance**: No style recalculation on prop changes
