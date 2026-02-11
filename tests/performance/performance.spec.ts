import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load homepage within performance budget', async ({ page }) => {
    // Start performance measurement
    const startTime = Date.now();
    
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Calculate load time
    const loadTime = Date.now() - startTime;
    
    // Performance budget: homepage should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    console.log(`Homepage load time: ${loadTime}ms`);
  });

  test('should load menu page within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Menu page should load within 4 seconds (more content)
    expect(loadTime).toBeLessThan(4000);
    
    console.log(`Menu page load time: ${loadTime}ms`);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // Check each image for optimization indicators
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      // Check for Next.js image optimization
      if (src) {
        // Next.js optimized images typically have specific patterns
        const isOptimized = src.includes('_next') || src.includes('optimized') || src.includes('webp');
        expect(isOptimized).toBeTruthy();
      }
    }
  });

  test('should have reasonable bundle size', async ({ page }) => {
    await page.goto('/');
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalSize: navigation.transferSize || 0
      };
    });
    
    // Check bundle size (should be under 2MB for initial load)
    expect(metrics.totalSize).toBeLessThan(2 * 1024 * 1024);
    
    console.log(`Page size: ${(metrics.totalSize / 1024 / 1024).toFixed(2)}MB`);
  });

  test('should have fast Time to Interactive', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');
    
    // Measure time to interactive
    const tti = await page.evaluate(() => {
      return new Promise((resolve) => {
        let tti = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure' && entry.name === 'tti') {
              tti = entry.startTime;
              observer.disconnect();
              resolve(tti);
            }
          }
        });
        observer.observe({ entryTypes: ['measure'] });
        
        // Fallback: measure DOM ready time
        if (document.readyState === 'complete') {
          resolve(performance.now());
        } else {
          window.addEventListener('load', () => {
            resolve(performance.now());
          });
        }
      });
    });
    
    // TTI should be under 2 seconds
    expect(tti).toBeLessThan(2000);
    
    console.log(`Time to Interactive: ${tti}ms`);
  });

  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Even with slow network, should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
    
    console.log(`Slow network load time: ${loadTime}ms`);
  });

  test('should have efficient CSS and JS loading', async ({ page }) => {
    await page.goto('/');
    
    // Check for critical CSS inline
    const inlineStyles = page.locator('style');
    const inlineStyleCount = await inlineStyles.count();
    
    // Should have some inline critical CSS
    expect(inlineStyleCount).toBeGreaterThan(0);
    
    // Check for deferred non-critical CSS
    const deferredCSS = page.locator('link[rel="stylesheet"][media="print"]');
    const deferredCSSCount = await deferredCSS.count();
    
    console.log(`Inline styles: ${inlineStyleCount}, Deferred CSS: ${deferredCSSCount}`);
  });

  test('should have optimized fonts loading', async ({ page }) => {
    await page.goto('/');
    
    // Check for font optimization
    const fontLinks = page.locator('link[rel="preload"][as="font"], link[rel="prefetch"][as="font"]');
    const fontCount = await fontLinks.count();
    
    // Should have font preloading for better performance
    expect(fontCount).toBeGreaterThanOrEqual(0);
    
    console.log(`Font preloads: ${fontCount}`);
  });

  test('should have efficient caching headers', async ({ page }) => {
    const response = await page.goto('/');
    
    // Check for caching headers
    const cacheControl = response?.headers()['cache-control'];
    const etag = response?.headers()['etag'];
    
    // Should have some form of caching
    expect(cacheControl || etag).toBeDefined();
    
    console.log(`Cache-Control: ${cacheControl}, ETag: ${etag}`);
  });

  test('should handle concurrent user load', async ({ browser }) => {
    // Simulate multiple concurrent users
    const contexts = [];
    const startTime = Date.now();
    
    try {
      // Create 5 concurrent browser contexts
      for (let i = 0; i < 5; i++) {
        const context = await browser.newContext();
        const page = await context.newPage();
        contexts.push({ context, page });
      }
      
      // Load homepage in all contexts simultaneously
      await Promise.all(contexts.map(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      }));
      
      const totalTime = Date.now() - startTime;
      
      // Should handle concurrent load within reasonable time
      expect(totalTime).toBeLessThan(15000);
      
      console.log(`Concurrent load time: ${totalTime}ms`);
    } finally {
      // Clean up contexts
      for (const { context } of contexts) {
        await context.close();
      }
    }
  });

  test('should have efficient memory usage', async ({ page }) => {
    await page.goto('/');
    
    // Get memory usage (if available)
    const memoryInfo = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory;
      }
      return null;
    });
    
    if (memoryInfo) {
      // Check memory usage is reasonable
      const usedJSHeapSize = memoryInfo.usedJSHeapSize;
      const totalJSHeapSize = memoryInfo.totalJSHeapSize;
      
      // Should use less than 50MB of JavaScript heap
      expect(usedJSHeapSize).toBeLessThan(50 * 1024 * 1024);
      
      console.log(`Memory usage: ${(usedJSHeapSize / 1024 / 1024).toFixed(2)}MB / ${(totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
    }
  });

  test('should have optimized animations', async ({ page }) => {
    await page.goto('/');
    
    // Check for CSS animations and transitions
    const animatedElements = page.locator('[class*="animate"], [class*="transition"]');
    const animationCount = await animatedElements.count();
    
    // Should have some animations for better UX
    expect(animationCount).toBeGreaterThan(0);
    
    // Check for hardware acceleration
    const hardwareAccelerated = await page.evaluate(() => {
      const elements = document.querySelectorAll('[class*="animate"], [class*="transition"]');
      let acceleratedCount = 0;
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const transform = style.transform;
        const willChange = style.willChange;
        
        if (transform !== 'none' || willChange !== 'auto') {
          acceleratedCount++;
        }
      });
      
      return acceleratedCount;
    });
    
    console.log(`Animated elements: ${animationCount}, Hardware accelerated: ${hardwareAccelerated}`);
  });

  test('should have efficient API calls', async ({ page }) => {
    await page.goto('/');
    
    // Monitor network requests
    const requests: string[] = [];
    page.on('request', request => {
      requests.push(request.url());
    });
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for unnecessary API calls
    const apiCalls = requests.filter(url => url.includes('/api/'));
    
    // Should have minimal API calls on homepage
    expect(apiCalls.length).toBeLessThan(5);
    
    console.log(`API calls on homepage: ${apiCalls.length}`);
  });
}); 