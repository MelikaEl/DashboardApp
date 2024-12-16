import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleResize = (): void => {
        setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    useEffect(() => {
        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        
        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};

/*
Certainly! The `use-mobile.tsx` file defines a custom React hook called `useIsMobile`. This hook is designed to determine whether the user's device is a mobile device based on the window's width. Below, I’ll break down the functionality of the hook step by step.

## Functionality Breakdown

### 1. **Importing Dependencies**

```typescript
import { useEffect, useState } from 'react';
```

- **`useEffect`** and **`useState`** are React hooks:
  - `useState` is used to manage state in functional components.
  - `useEffect` is used to perform side effects in functional components, such as updating the DOM or subscribing to events.

### 2. **Defining the Hook**

```typescript
export const useIsMobile = (): boolean => {
```

- The hook is defined as a function that returns a boolean value (`true` or `false`). This boolean indicates whether the current device is considered mobile.

### 3. **State Initialization**

```typescript
const [isMobile, setIsMobile] = useState<boolean>(false);
```

- Here, we initialize a state variable `isMobile` with a default value of `false`. 
- `setIsMobile` is a function that will be used to update the value of `isMobile`.

### 4. **Resize Handler Function**

```typescript
const handleResize = (): void => {
    setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
};
```

- `handleResize` is a function that checks the current width of the window (`window.innerWidth`) and updates the `isMobile` state:
  - If the width is less than 768 pixels, it sets `isMobile` to `true`, indicating that the device is likely a mobile device.
  - Otherwise, it sets it to `false`.

### 5. **Setting Up Event Listeners with useEffect**

```typescript
useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    
    // Cleanup function to remove the event listener
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
```

- The `useEffect` hook runs after the component mounts:
  - It first calls `handleResize()` to set the initial value of `isMobile`.
  - Then, it adds an event listener for the `resize` event on the window object. This means that every time the window is resized, `handleResize` will be called to check if the device has changed from mobile to desktop or vice versa.
  
- The cleanup function (`return () => { ... }`) ensures that when the component unmounts or when dependencies change (in this case, there are none), the event listener is removed. This helps prevent memory leaks and ensures that you don’t have multiple listeners running simultaneously.

### 6. **Returning the State**

```typescript
return isMobile;
```

- Finally, the hook returns the current value of `isMobile`, which can be used by any component that calls this hook.

## Summary

The `useIsMobile` hook provides a simple and reusable way to determine if a user is on a mobile device based on the window's width. It updates automatically when the window is resized, making it useful for responsive designs where you might want to render different layouts or styles based on whether the user is on a mobile device or not.

This hook can be easily integrated into any functional component, allowing for dynamic rendering and improved user experience across different devices.
*/
