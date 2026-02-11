import { chromium, firefox, webkit, devices, expect } from '@playwright/test';
import type { BrowserType } from '@playwright/test';

/**
 * Comprehensive Test Runner for TK Afro Kitchen
 * 
 * This script provides various ways to run tests:
 * - All tests
 * - Specific test suites
 * - Different browsers
 * - Performance tests
 * - Mobile tests
 */

interface TestConfig {
  browser: 'chromium' | 'firefox' | 'webkit' | 'all';
  device?: 'mobile' | 'desktop' | 'all';
  suite?: 'e2e' | 'mobile' | 'performance' | 'all';
  headless?: boolean;
  workers?: number;
  retries?: number;
  timeout?: number;
}

class TestRunner {
  private config: TestConfig;

  constructor(config: TestConfig) {
    this.config = {
      headless: true,
      workers: 1,
      retries: 2,
      timeout: 30000,
      ...config
    };
  }

  async runAllTests() {
    console.log('🚀 Starting comprehensive test suite for TK Afro Kitchen...');
    
    const startTime = Date.now();
    
    try {
      if (this.config.browser === 'all') {
        await this.runTestsOnAllBrowsers();
      } else {
        await this.runTestsOnSingleBrowser();
      }
      
      const totalTime = Date.now() - startTime;
      console.log(`✅ All tests completed in ${totalTime}ms`);
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      process.exit(1);
    }
  }

  private async runTestsOnAllBrowsers() {
    const browsers = [
      { name: 'Chromium', browser: chromium },
      { name: 'Firefox', browser: firefox },
      { name: 'WebKit', browser: webkit }
    ];

    for (const { name, browser } of browsers) {
      console.log(`\n🌐 Running tests on ${name}...`);
      await this.runTestsWithBrowser(browser, name);
    }
  }

  private async runTestsOnSingleBrowser() {
    const browserMap: Record<string, BrowserType> = {
      chromium,
      firefox,
      webkit
    };

    const browser = browserMap[this.config.browser];
    await this.runTestsWithBrowser(browser, this.config.browser);
  }

  private async runTestsWithBrowser(browserType: BrowserType, browserName: string) {
    const browser = await browserType.launch({
      headless: this.config.headless
    });

    try {
      const context = await browser.newContext({
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      });

      const page = await context.newPage();
      
      // Run basic connectivity test
      await this.testConnectivity(page, browserName);
      
      // Run specific test suites
      if (this.config.suite === 'all' || this.config.suite === 'e2e') {
        await this.runE2ETests(page, browserName);
      }
      
      if (this.config.suite === 'all' || this.config.suite === 'mobile') {
        await this.runMobileTests(page, browserName);
      }
      
      if (this.config.suite === 'all' || this.config.suite === 'performance') {
        await this.runPerformanceTests(page, browserName);
      }

      await context.close();
      
    } finally {
      await browser.close();
    }
  }

  private async testConnectivity(page: any, browserName: string) {
    console.log(`  🔗 Testing connectivity on ${browserName}...`);
    
    try {
      const startTime = Date.now();
      await page.goto('https://tkafrokitchen.com');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      console.log(`    ✅ Homepage loaded in ${loadTime}ms`);
      
      // Check page title
      const title = await page.title();
      if (title.includes('TK Afro Kitchen')) {
        console.log(`    ✅ Page title correct: "${title}"`);
      } else {
        throw new Error(`Invalid page title: "${title}"`);
      }
      
    } catch (error) {
      console.error(`    ❌ Connectivity test failed:`, error);
      throw error;
    }
  }

  private async runE2ETests(page: any, browserName: string) {
    console.log(`  🧪 Running E2E tests on ${browserName}...`);
    
    const testPages = [
      { path: '/', name: 'Homepage' },
      { path: '/menu', name: 'Menu Page' },
      { path: '/contact', name: 'Contact Page' },
      { path: '/about', name: 'About Page' },
      { path: '/faqs', name: 'FAQ Page' },
      { path: '/frozen', name: 'Frozen Page' }
    ];

    for (const testPage of testPages) {
      try {
        console.log(`    📄 Testing ${testPage.name}...`);
        
        const startTime = Date.now();
        await page.goto(`https://tkafrokitchen.com${testPage.path}`);
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;
        
        // Basic page checks
        await expect(page.locator('body')).toBeVisible();
        await expect(page.locator('nav')).toBeVisible();
        
        console.log(`      ✅ ${testPage.name} loaded in ${loadTime}ms`);
        
      } catch (error) {
        console.error(`      ❌ ${testPage.name} test failed:`, error);
      }
    }
  }

  private async runMobileTests(page: any, browserName: string) {
    console.log(`  📱 Running mobile tests on ${browserName}...`);
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    try {
      await page.goto('https://tkafrokitchen.com');
      
      // Check mobile menu
      const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu');
      if (await hamburgerButton.count() > 0) {
        await hamburgerButton.first().click();
        
        // Check mobile menu is visible
        const mobileMenu = page.locator('nav.md\\:hidden');
        await expect(mobileMenu).toBeVisible();
        
        console.log(`    ✅ Mobile menu works correctly`);
      }
      
      // Test menu page mobile category filter
      await page.goto('https://tkafrokitchen.com/menu');
      const categoryFilter = page.locator('text=Categories');
      if (await categoryFilter.count() > 0) {
        console.log(`    ✅ Mobile category filter is present`);
      }
      
    } catch (error) {
      console.error(`    ❌ Mobile test failed:`, error);
    }
  }

  private async runPerformanceTests(page: any, browserName: string) {
    console.log(`  ⚡ Running performance tests on ${browserName}...`);
    
    try {
      const startTime = Date.now();
      await page.goto('https://tkafrokitchen.com');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Performance budget checks
      if (loadTime < 3000) {
        console.log(`    ✅ Homepage load time: ${loadTime}ms (within budget)`);
      } else {
        console.warn(`    ⚠️  Homepage load time: ${loadTime}ms (exceeds budget)`);
      }
      
      // Check for optimized images
      const images = page.locator('img');
      const imageCount = await images.count();
      console.log(`    📸 Images found: ${imageCount}`);
      
      // Check bundle size
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          totalSize: navigation.transferSize || 0
        };
      });
      
      const sizeInMB = metrics.totalSize / 1024 / 1024;
      if (sizeInMB < 2) {
        console.log(`    ✅ Bundle size: ${sizeInMB.toFixed(2)}MB (within budget)`);
      } else {
        console.warn(`    ⚠️  Bundle size: ${sizeInMB.toFixed(2)}MB (exceeds budget)`);
      }
      
    } catch (error) {
      console.error(`    ❌ Performance test failed:`, error);
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  const config: TestConfig = {
    browser: 'chromium',
    suite: 'all',
    headless: true
  };
  
  // Parse command line arguments
  for (const arg of args) {
    if (arg === '--browser=all') config.browser = 'all';
    else if (arg === '--browser=firefox') config.browser = 'firefox';
    else if (arg === '--browser=webkit') config.browser = 'webkit';
    else if (arg === '--suite=e2e') config.suite = 'e2e';
    else if (arg === '--suite=mobile') config.suite = 'mobile';
    else if (arg === '--suite=performance') config.suite = 'performance';
    else if (arg === '--headless=false') config.headless = false;
  }
  
  const runner = new TestRunner(config);
  await runner.runAllTests();
}

// Export for use in other files
export { TestRunner };
export type { TestConfig };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
} 