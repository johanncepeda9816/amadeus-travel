# Unit Testing Guide with Vitest

This project is configured with **Vitest** for unit testing. This guide will help you understand how to run and write tests.

## 🚀 Testing Commands

```bash
# Run all tests once
pnpm test:run

# Run tests in watch mode (re-run when files change)
pnpm test:watch

# Run tests with visual interface
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage

# Run tests in development mode (alias for test:watch)
pnpm test
```

### 📊 Current Test Coverage

- **75 tests** across 8 test files
- **10.21%** overall code coverage
- **42.79%** coverage for UI components
- Components with 100% coverage: `BaseButton`, `BaseInput`, `LoadingSpinner`

## 📁 Test File Structure

Test files follow the convention:

- `*.test.ts` - For function/service tests
- `*.test.tsx` - For React component tests

```
src/
├── test/
│   ├── setup.ts          # Global testing configuration
│   ├── utils.tsx          # Testing utilities
│   ├── mocks.ts           # Reusable mocks
│   └── index.ts           # Main exports
├── components/
│   └── ui/
│       ├── BaseButton.tsx
│       └── BaseButton.test.tsx
├── services/
│   ├── authService.ts
│   └── authService.test.ts
├── stores/
│   ├── authStore.ts
│   └── authStore.test.ts
└── hooks/
    ├── useAuth.ts
    └── useAuth.test.ts
```

## 🧪 Test Examples

### React Components

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles clicks', async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(<MyComponent onClick={onClickMock} />);

    await user.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
```

### Services/APIs

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { myService } from './myService';
import { mockAxios, resetAllMocks } from '@/test';

vi.mock('./api', () => ({
  api: mockAxios,
}));

describe('myService', () => {
  beforeEach(() => {
    resetAllMocks();
  });

  it('makes API request correctly', async () => {
    mockAxios.get.mockResolvedValue({ data: { success: true } });

    const result = await myService.getData();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/data');
    expect(result.success).toBe(true);
  });
});
```

### Zustand Stores

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useMyStore } from './myStore';

describe('myStore', () => {
  beforeEach(() => {
    // Reset store
    useMyStore.setState({ value: null });
  });

  it('updates state correctly', () => {
    const { setValue } = useMyStore.getState();

    setValue('new value');

    expect(useMyStore.getState().value).toBe('new value');
  });
});
```

### Custom Hooks

```ts
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('returns correct initial value', () => {
    const { result } = renderHook(() => useMyHook());

    expect(result.current.value).toBe('initial');
  });
});
```

## 🛠️ Available Utilities

### Render Functions

```tsx
import { render, screen } from '@/test';

// Renders with all necessary providers (Theme, Router, etc.)
render(<MyComponent />);
```

### Pre-configured Mocks

```ts
import {
  mockUser, // Test user
  mockFlight, // Test flight
  mockAxios, // Mocked HTTP client
  mockAuthService, // Mocked auth service
  mockNotifications, // Mocked notification system
  resetAllMocks, // Reset all mocks
} from '@/test';
```

### Event Testing

```tsx
import { userEvent } from '@/test';

const user = userEvent.setup();
await user.click(button);
await user.type(input, 'text');
```

## 📊 Code Coverage

To see the coverage report:

```bash
pnpm test:coverage
```

This will generate:

- Terminal report
- HTML file at `coverage/index.html`
- JSON file at `coverage/coverage-summary.json`

## 🎯 Best Practices

### 1. Descriptive Test Names

```ts
// ❌ Bad
it('works');

// ✅ Good
it('shows error message when login fails');
```

### 2. Arrange, Act, Assert

```ts
it('updates user after successful login', async () => {
  // Arrange
  const credentials = { email: 'test@test.com', password: '123' };
  mockAuthService.login.mockResolvedValue({ success: true, user: mockUser });

  // Act
  const result = await authStore.login(credentials);

  // Assert
  expect(result.success).toBe(true);
  expect(authStore.getState().user).toEqual(mockUser);
});
```

### 3. Clean Up After Each

```ts
beforeEach(() => {
  resetAllMocks();
  // Reset stores or state as needed
});
```

### 4. Test Edge Cases

```ts
describe('input validation', () => {
  it('handles empty input');
  it('handles invalid input');
  it('handles network errors');
  it('handles malformed responses');
});
```

## 🔧 Configuration

### vitest.config.ts

- jsdom environment for component testing
- `@` alias for absolute imports
- Coverage with v8
- Automatic setup with `src/test/setup.ts`
- Tests are located in `src/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`

### src/test/setup.ts

- Global testing-library configuration
- Global API mocks (localStorage, ResizeObserver, etc.)
- Automatic cleanup after each test

## 🐛 Troubleshooting

### Error: Cannot access before initialization

Make sure mocks are declared before importing modules:

```ts
// ✅ Correct
vi.mock('./myModule', () => ({ ... }))
const { myFunction } = await import('./myModule')

// ❌ Incorrect
import { myFunction } from './myModule'
vi.mock('./myModule', () => ({ ... }))
```

### Error: Module path resolution

All tests are now in `src/tests/` directory, so imports should use absolute paths:

```ts
// ✅ Correct - use @ alias
import { Component } from '@/components/ui/Component';

// ❌ Incorrect - relative paths may not work from tests directory
import { Component } from '../../components/ui/Component';
```

### Error: JSX in .ts files

Use `.tsx` for files containing JSX, even in tests.

### Tests can't find elements

Verify that the component renders correctly:

```tsx
render(<MyComponent />);
screen.debug(); // Prints current DOM
```

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event API](https://testing-library.com/docs/user-event/intro/)
