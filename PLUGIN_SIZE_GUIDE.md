# Plugin Size Management Guide

## 🎯 How to Manage Plugin Sizes

### **1. In the Code (code.ts)**

The plugin size is managed in the `code.ts` file. Here are the key areas:

#### **Size Configurations**

```typescript
const PLUGIN_SIZES = {
  small: { width: 320, height: 400 },
  medium: { width: 400, height: 500 },
  large: { width: 500, height: 600 },
  extraLarge: { width: 600, height: 800 },
  fullHeight: { width: 400, height: 900 },
  wide: { width: 800, height: 400 },
};
```

#### **Set Initial Size**

```typescript
// Change this line to test different initial sizes
const INITIAL_SIZE = PLUGIN_SIZES.medium;
```

#### **Show UI with Size**

```typescript
figma.showUI(__html__, {
  width: INITIAL_SIZE.width,
  height: INITIAL_SIZE.height,
  themeColors: true,
});
```

### **2. Available Size Options**

| Size            | Dimensions | Use Case                        |
| --------------- | ---------- | ------------------------------- |
| **Small**       | 320×400    | Compact, minimal interface      |
| **Medium**      | 400×500    | Standard, balanced layout       |
| **Large**       | 500×600    | Spacious, comfortable interface |
| **Extra Large** | 600×800    | Feature-rich, complex UI        |
| **Full Height** | 400×900    | Tall, list-heavy interfaces     |
| **Wide**        | 800×400    | Horizontal layouts, sidebars    |

### **3. Testing Different Sizes**

#### **Method 1: Change Initial Size**

1. Open `code.ts`
2. Find the line: `const INITIAL_SIZE = PLUGIN_SIZES.medium;`
3. Change `medium` to any other size (e.g., `large`, `small`, etc.)
4. Run `npm run build`
5. Reload the plugin in Figma

#### **Method 2: Use the UI Controls**

1. Run the plugin in Figma
2. Click any size button in the "Test Different Sizes" section
3. The plugin window will resize instantly

#### **Method 3: Manual Resize**

1. In Figma, grab the plugin window corner
2. Drag to resize manually
3. The content will adapt responsively

### **4. Adding Custom Sizes**

To add a new size option:

#### **Step 1: Add to PLUGIN_SIZES**

```typescript
const PLUGIN_SIZES = {
  small: { width: 320, height: 400 },
  medium: { width: 400, height: 500 },
  // Add your custom size here
  custom: { width: 450, height: 700 },
  // ... other sizes
};
```

#### **Step 2: Add UI Button**

In `ui.html`, add a new button:

```html
<button class="size-btn" data-size="custom">Custom<br />450×700</button>
```

#### **Step 3: Build and Test**

```bash
npm run build
```

### **5. Size Guidelines**

#### **Minimum Sizes**

- **Width**: 240px (enforced by CSS)
- **Height**: 300px (enforced by JavaScript)
- **Touch Targets**: 44px minimum

#### **Recommended Sizes**

- **Standard**: 400×500 (medium)
- **Compact**: 320×400 (small)
- **Spacious**: 500×600 (large)
- **Complex UI**: 600×800 (extraLarge)

#### **Aspect Ratios**

- **Square-ish**: 1:1 to 4:3 (good for forms)
- **Portrait**: 3:4 to 2:3 (good for lists)
- **Landscape**: 4:3 to 2:1 (good for sidebars)

### **6. Responsive Behavior**

The plugin automatically adapts to different sizes:

#### **Small Windows (≤480px)**

- Buttons stack vertically
- Reduced padding
- Smaller fonts

#### **Very Small Windows (≤320px)**

- Minimal font sizes
- Compact spacing
- Essential elements only

#### **Landscape Mode**

- Optimized for short heights
- Compressed but functional
- Maintains usability

### **7. Testing Checklist**

- [ ] Test all predefined sizes
- [ ] Verify responsive behavior
- [ ] Check touch targets (44px minimum)
- [ ] Test keyboard navigation
- [ ] Verify animations work
- [ ] Check for horizontal scrolling
- [ ] Test on different screen densities
- [ ] Verify landscape orientation

### **8. Common Size Patterns**

#### **Form-Based Plugins**

```typescript
const FORM_SIZES = {
  compact: { width: 320, height: 400 },
  standard: { width: 400, height: 500 },
  spacious: { width: 500, height: 600 },
};
```

#### **List-Based Plugins**

```typescript
const LIST_SIZES = {
  compact: { width: 300, height: 500 },
  standard: { width: 400, height: 700 },
  spacious: { width: 500, height: 900 },
};
```

#### **Sidebar Plugins**

```typescript
const SIDEBAR_SIZES = {
  narrow: { width: 250, height: 600 },
  standard: { width: 300, height: 600 },
  wide: { width: 400, height: 600 },
};
```

### **9. Performance Considerations**

#### **Large Windows**

- More DOM elements
- Higher memory usage
- Slower animations

#### **Small Windows**

- Limited content
- Potential scrolling
- Touch target constraints

#### **Optimal Balance**

- 400×500 is usually the sweet spot
- Good for most use cases
- Balanced performance and usability

### **10. Debugging Tips**

#### **Console Logging**

The plugin logs window dimensions:

```javascript
console.log(`Window resized to: ${windowWidth}x${windowHeight}`);
```

#### **Visual Indicators**

- Active size button shows current size
- Responsive breakpoints trigger visual changes
- Hover effects indicate interactive elements

#### **Common Issues**

- **Content overflow**: Check minimum sizes
- **Touch targets too small**: Ensure 44px minimum
- **Text too small**: Verify font scaling
- **Layout breaks**: Test all breakpoints

## 🚀 Quick Start

1. **Change initial size**: Edit `INITIAL_SIZE` in `code.ts`
2. **Build**: Run `npm run build`
3. **Test**: Reload plugin in Figma
4. **Iterate**: Use UI controls to test different sizes
5. **Optimize**: Adjust based on your specific needs

The plugin is now fully equipped for size testing and management!

