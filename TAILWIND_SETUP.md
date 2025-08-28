# Tailwind CSS Setup for Figma Plugin

This project uses a custom Tailwind CSS-inspired styling system for the Figma plugin UI.

## File Structure

- `ui.css` - Compiled CSS with Tailwind-inspired utilities and custom components
- `styles.css` - Source CSS file with Tailwind directives (for future use)
- `tailwind.config.js` - Tailwind configuration (for future use)
- `postcss.config.js` - PostCSS configuration (for future use)

## Current Setup

The plugin currently uses a manually compiled CSS file (`ui.css`) that includes:

### Utility Classes

- **Layout**: `flex`, `flex-col`, `items-center`, `justify-center`, `gap-*`
- **Spacing**: `p-*`, `px-*`, `py-*`, `mb-*`
- **Typography**: `text-*`, `font-*`, `text-center`
- **Colors**: `text-*`, `bg-*` (Figma brand colors included)
- **Borders**: `border`, `border-*`, `rounded`, `rounded-lg`
- **Width**: `w-full`, `w-auto`, `w-4`, `h-4`

### Component Classes

- `.btn` - Base button styles
- `.btn-primary` - Primary button (Figma blue)
- `.btn-secondary` - Secondary button (gray)
- `.input` - Form input styling
- `.card` - Card container with shadow
- `.container` - Main container
- `.form-group` - Form field wrapper
- `.form-label` - Form label styling
- `.button-group` - Button container with flex layout

### Custom Features

- **Figma Brand Colors**: Custom color palette matching Figma's design system
- **Animations**: Loading spinner animation
- **Focus States**: Proper focus indicators for accessibility
- **Hover Effects**: Smooth transitions on interactive elements
- **Responsive Design**: Mobile-friendly layout

## Usage Examples

```html
<!-- Card with form -->
<div class="card p-6">
  <div class="form-group">
    <label class="form-label">Label</label>
    <input class="input" type="text" />
  </div>
  <div class="button-group">
    <button class="btn btn-primary">Primary Action</button>
    <button class="btn btn-secondary">Secondary Action</button>
  </div>
</div>
```

## Future Tailwind Integration

To use full Tailwind CSS in the future:

1. Install dependencies: `npm install -D tailwindcss postcss autoprefixer`
2. Build CSS: `npx tailwindcss -i ./styles.css -o ./ui.css --minify`
3. Watch for changes: `npx tailwindcss -i ./styles.css -o ./ui.css --watch`

## Customization

The `ui.css` file can be extended with additional utilities and components as needed. The current setup provides a solid foundation for building beautiful Figma plugin interfaces.

