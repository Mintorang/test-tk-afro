# 🧪 TK Afro Kitchen - Playwright Test Suite

A comprehensive end-to-end testing suite for the TK Afro Kitchen website using Playwright.

## 📋 Test Coverage

### 🏠 **Homepage Tests** (`tests/e2e/homepage.spec.ts`)
- ✅ Page loading and title verification
- ✅ Navigation menu functionality
- ✅ Hero section and call-to-action buttons
- ✅ Featured dishes display
- ✅ Footer and contact information
- ✅ Social media links
- ✅ Logo and branding
- ✅ SEO meta tags
- ✅ Image loading and optimization
- ✅ Accessibility checks
- ✅ Page refresh handling

### 🍽️ **Menu Page Tests** (`tests/e2e/menu.spec.ts`)
- ✅ Menu page loading and navigation
- ✅ Desktop category filters
- ✅ **Mobile category filter with auto-scroll** ⭐
- ✅ Menu item filtering by category
- ✅ Search functionality
- ✅ Menu item display and pricing
- ✅ Size options and add to cart
- ✅ Empty search results handling
- ✅ Filter state persistence
- ✅ Responsive design across devices
- ✅ Mobile menu toggle functionality

### 📞 **Contact Page Tests** (`tests/e2e/contact.spec.ts`)
- ✅ Contact form display and validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Form submission with mocking
- ✅ Contact information display
- ✅ Social media links
- ✅ Business hours display
- ✅ Form accessibility
- ✅ Error handling
- ✅ Multiple submission prevention
- ✅ Form clearing after submission
- ✅ Mobile responsiveness
- ✅ Special character handling

### 📱 **Mobile Navigation Tests** (`tests/mobile/mobile-navigation.spec.ts`)
- ✅ Hamburger menu functionality
- ✅ Mobile menu toggle
- ✅ Menu item navigation
- ✅ Touch gesture handling
- ✅ Orientation changes
- ✅ Focus management
- ✅ Keyboard navigation
- ✅ ARIA attributes
- ✅ Rapid menu toggles
- ✅ Different screen sizes
- ✅ Network interruption handling

### ⚡ **Performance Tests** (`tests/performance/performance.spec.ts`)
- ✅ Page load time budgets
- ✅ Image optimization checks
- ✅ Bundle size monitoring
- ✅ Time to Interactive (TTI)
- ✅ Slow network handling
- ✅ CSS and JS loading efficiency
- ✅ Font optimization
- ✅ Caching headers
- ✅ Concurrent user load
- ✅ Memory usage monitoring
- ✅ Animation optimization
- ✅ API call efficiency

## 🚀 Quick Start

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run test:install
```

### Running Tests

#### **All Tests**
```bash
npm run test:e2e
```

#### **Specific Test Suites**
```bash
# Homepage tests only
npm run test:homepage

# Menu page tests only
npm run test:menu

# Contact form tests only
npm run test:contact

# Mobile navigation tests only
npm run test:mobile

# Performance tests only
npm run test:performance
```

#### **Cross-Browser Testing**
```bash
# All browsers (Chromium, Firefox, WebKit)
npm run test:all-browsers

# Mobile browsers only
npm run test:mobile-only
```

#### **Development & Debugging**
```bash
# Run with UI (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug

# Generate test code from actions
npm run test:codegen
```

#### **CI/CD Integration**
```bash
# CI-friendly with multiple reporters
npm run test:ci

# View test reports
npm run test:report
```

## 🎯 Key Features

### **Mobile Category Auto-Scroll** ⭐
The test suite specifically validates the mobile category filter auto-scroll functionality:
- ✅ Category selection triggers auto-scroll
- ✅ Menu items come into view automatically
- ✅ Smooth scrolling behavior
- ✅ Works across different mobile devices
- ✅ Handles orientation changes

### **Comprehensive Coverage**
- **Cross-browser compatibility** (Chrome, Firefox, Safari)
- **Mobile responsiveness** (iPhone, Android, iPad)
- **Performance monitoring** with budgets
- **Accessibility testing**
- **Error handling** and edge cases
- **Network condition simulation**

### **Smart Test Design**
- **Page Object Model** patterns
- **Reusable test utilities**
- **Mock API responses** for isolated testing
- **Performance metrics** collection
- **Visual regression** capabilities
- **Parallel test execution**

## 📊 Test Reports

### **HTML Report**
```bash
npm run test:report
```
Opens an interactive HTML report with:
- Test results and screenshots
- Performance metrics
- Error details and traces
- Video recordings of failed tests

### **CI Reports**
```bash
npm run test:ci
```
Generates multiple report formats:
- `test-results/results.json` - JSON format
- `test-results/results.xml` - JUnit format
- `playwright-report/` - HTML report

## 🔧 Configuration

### **Playwright Config** (`playwright.config.ts`)
```typescript
// Key configurations:
- Multiple browser projects (Chrome, Firefox, Safari)
- Mobile device simulation
- Performance budgets
- Screenshot and video capture
- Retry logic for flaky tests
- Parallel execution settings
```

### **Environment Variables**
```bash
# Base URL for testing
BASE_URL=http://localhost:3000

# CI environment
CI=true
```

## 🛠️ Test Development

### **Adding New Tests**
1. Create test file in appropriate directory:
   ```bash
   # E2E tests
   tests/e2e/new-feature.spec.ts
   
   # Mobile tests
   tests/mobile/new-mobile-feature.spec.ts
   
   # Performance tests
   tests/performance/new-performance.spec.ts
   ```

2. Use the test template:
   ```typescript
   import { test, expect } from '@playwright/test';
   
   test.describe('New Feature', () => {
     test.beforeEach(async ({ page }) => {
       await page.goto('/');
     });
   
     test('should work correctly', async ({ page }) => {
       // Test implementation
     });
   });
   ```

### **Best Practices**
- ✅ Use descriptive test names
- ✅ Group related tests with `test.describe()`
- ✅ Use `beforeEach()` for common setup
- ✅ Mock external dependencies
- ✅ Test both success and failure scenarios
- ✅ Include accessibility checks
- ✅ Test mobile and desktop views

### **Debugging Tests**
```bash
# Run specific test with debug
npx playwright test --debug tests/e2e/homepage.spec.ts

# Run with UI for step-by-step debugging
npx playwright test --ui tests/e2e/homepage.spec.ts

# Generate code from manual actions
npx playwright codegen http://localhost:3000
```

## 📈 Performance Monitoring

### **Load Time Budgets**
- **Homepage**: < 3 seconds
- **Menu Page**: < 4 seconds
- **Bundle Size**: < 2MB
- **Time to Interactive**: < 2 seconds

### **Performance Metrics**
- Page load times
- Bundle sizes
- Memory usage
- Network requests
- Image optimization
- Animation performance

## 🔄 Continuous Integration

### **GitHub Actions Example**
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:install
      - run: npm run test:ci
      - uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## 🐛 Troubleshooting

### **Common Issues**
1. **Tests failing on CI but passing locally**
   - Check for timing issues
   - Verify network conditions
   - Review browser differences

2. **Mobile tests failing**
   - Verify viewport settings
   - Check for responsive breakpoints
   - Test on actual mobile devices

3. **Performance tests failing**
   - Review performance budgets
   - Check for network throttling
   - Verify optimization settings

### **Getting Help**
- Check the [Playwright documentation](https://playwright.dev/)
- Review test reports for detailed error information
- Use debug mode for step-by-step investigation
- Check browser console for JavaScript errors

## 📝 Test Maintenance

### **Regular Tasks**
- ✅ Update test selectors when UI changes
- ✅ Review and update performance budgets
- ✅ Add tests for new features
- ✅ Remove obsolete tests
- ✅ Update browser versions
- ✅ Review accessibility standards

### **Test Data Management**
- Use mock data for consistent testing
- Avoid hardcoded values
- Use environment variables for configuration
- Maintain test data fixtures

---

**🎉 Happy Testing!** This comprehensive test suite ensures your TK Afro Kitchen website works perfectly across all devices and browsers.