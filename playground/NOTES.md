# Accessibility Audit & Architectural Comparison: Hand-Built vs. shadcn/ui

## Overview
This document outlines key differences and missing architectural features identified when comparing hand-crafted WAI-ARIA React components against production-grade primitives provided by `shadcn/ui` (built on top of `@radix-ui`).

---

## Key Gap 1: Portal Rendering & Stacking Context (Modal Dialog)
* **Hand-Built Version**: Rendered directly inline within the local component DOM tree. This creates potential `z-index` and overflow clipping issues when placed inside parent components with `overflow: hidden` or custom positioning.
* **shadcn/ui (Radix Dialog)**: Renders the dialog using React Portals (`@radix-ui/react-portal`), mounting the dialog element at the root of `document.body`. This guarantees that the modal breaks out of parent CSS stacking contexts and prevents background content from bleeding through or clipping the dialog.

---

## Key Gap 2: Background Scroll Locking & Inert States (Modal Dialog)
* **Hand-Built Version**: Focused exclusively on trapping keyboard focus and handling `Escape` key events. However, background scrolling remains active when using mouse wheel or touch gestures.
* **shadcn/ui (Radix Dialog)**: Automatically injects styles to disable body scrolling (`overflow: hidden`) and applies the `aria-hidden="true"` / `data-aria-hidden` attribute to all outside DOM nodes when the dialog is active. This effectively renders the entire main application `inert` for screen readers and pointer devices until closed.

---

## Key Gap 3: Advanced Focus Restoration Safety & Unmount Edge Cases
* **Hand-Built Version**: Restores focus to `previousFocusRef.current` assuming the triggering button is still present in the DOM upon modal close. If the trigger element was removed dynamically while the modal was open, focus is lost or falls back to `document.body`.
* **shadcn/ui (Radix Dialog)**: Implements robust fallback mechanisms that gracefully handle dynamic trigger unmounting, ensuring focus moves to the nearest focusable container if the original element no longer exists.