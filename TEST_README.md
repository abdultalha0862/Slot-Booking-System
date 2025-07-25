# Test Configuration Guide

## Test Types

### 1. Unit Tests (`src/test/components/`, `src/test/hooks/`, `src/test/utils/`)
- Test individual components and functions in isolation
- Fast execution
- Mock external dependencies

### 2. Integration Tests (`src/test/integration/`)
- Test multiple components working together
- Test user interactions and workflows
- More realistic scenarios

### 3. End-to-End Tests (`src/test/e2e/`)
- Test complete user journeys
- Test the entire application flow
- Most comprehensive but slower

## Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests once (CI mode)
npm run test:run

# Run tests in watch mode
npm run test:watch

# Run specific test types
npm run test:components
npm run test:hooks
npm run test:integration
npm run test:e2e
npm run test:utils
```

## Test Structure

```
src/test/
├── setup.ts              # Test setup and configuration
├── test-utils.tsx         # Custom render function and utilities
├── mocks/
│   ├── handlers.ts        # MSW request handlers
│   └── server.ts          # MSW server setup
├── components/            # Component unit tests
├── hooks/                 # Custom hook tests
├── integration/           # Integration tests
├── e2e/                   # End-to-end tests
└── utils/                 # Utility function tests
```

## Writing Tests

### Component Tests
```typescript
import { render, screen, fireEvent } from '../test-utils'
import MyComponent from '../../components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Hook Tests
```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { useMyHook } from '../../hooks/useMyHook'

describe('useMyHook', () => {
  it('returns expected data', async () => {
    const { result } = renderHook(() => useMyHook())
    await waitFor(() => expect(result.current.data).toBeDefined())
  })
})
```

### Integration Tests
```typescript
import { render, screen, fireEvent, waitFor } from '../test-utils'
import userEvent from '@testing-library/user-event'

describe('Feature Integration', () => {
  it('completes user flow', async () => {
    const user = userEvent.setup()
    render(<App />)
    // Test complete user interaction
  })
})
```

## Coverage Goals

- **Components**: > 80% coverage
- **Hooks**: > 90% coverage
- **Utils**: > 95% coverage
- **Overall**: > 85% coverage

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the user sees and does
   - Avoid testing internal state or implementation details

2. **Use Semantic Queries**
   - Prefer `getByRole`, `getByLabelText`, `getByText`
   - Avoid `getByTestId` unless necessary

3. **Mock External Dependencies**
   - Use MSW for API calls
   - Mock complex external libraries

4. **Write Descriptive Test Names**
   - Clearly describe what is being tested
   - Include expected behavior

5. **Keep Tests Simple and Focused**
   - One assertion per test when possible
   - Test one thing at a time

6. **Use Test Data Factories**
   - Create reusable test data generators
   - Make tests more maintainable
