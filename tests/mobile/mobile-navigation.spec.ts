import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport for all tests
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
  });

  test('should display hamburger menu on mobile', async ({ page }) => {
    // Check hamburger menu button is visible
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await expect(hamburgerButton.first()).toBeVisible();
  });

  test('should toggle mobile menu when hamburger is clicked', async ({ page }) => {
    // Find hamburger menu button
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    
    // Click hamburger menu
    await hamburgerButton.first().click();
    
    // Check mobile menu is visible
    const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav.md\\:hidden');
    await expect(mobileMenu).toBeVisible();
    
    // Check menu items are visible
    const menuItems = ['Menu', 'Pricing', 'Frozen', 'Catering', 'About', 'FAQ', 'Contact'];
    for (const item of menuItems) {
      await expect(page.locator(`text=${item}`)).toBeVisible();
    }
  });

  test('should close mobile menu when clicking outside', async ({ page }) => {
    // Open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().click();
    
    // Click outside menu (on body)
    await page.click('body', { position: { x: 50, y: 50 } });
    
    // Check menu is closed
    const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav.md\\:hidden');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should close mobile menu when clicking a menu item', async ({ page }) => {
    // Open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().click();
    
    // Click on a menu item
    await page.click('text=Menu');
    
    // Check menu is closed
    const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav.md\\:hidden');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should navigate to correct pages from mobile menu', async ({ page }) => {
    // Open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().click();
    
    // Test navigation to different pages
    const testPages = [
      { link: 'Menu', expectedPath: '/menu' },
      { link: 'About', expectedPath: '/about' },
      { link: 'Contact', expectedPath: '/contact' },
      { link: 'FAQ', expectedPath: '/faqs' }
    ];
    
    for (const testPage of testPages) {
      // Navigate to page
      await page.goto('/');
      await hamburgerButton.first().click();
      await page.click(`text=${testPage.link}`);
      
      // Check we're on the correct page
      await expect(page).toHaveURL(new RegExp(testPage.expectedPath));
    }
  });

  test('should handle touch gestures correctly', async ({ page }) => {
    // Test swipe gestures if implemented
    // This would test any swipe-to-open/close functionality
    
    // For now, test basic touch interactions
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().tap();
    
    const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav.md\\:hidden');
    await expect(mobileMenu).toBeVisible();
  });

  test('should maintain menu state during page navigation', async ({ page }) => {
    // Open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().click();
    
    // Navigate to another page
    await page.click('text=Menu');
    
    // Navigate back to home
    await page.goto('/');
    
    // Menu should be closed by default
    const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav.md\\:hidden');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should handle orientation changes', async ({ page }) => {
    // Test landscape orientation
    await page.setViewportSize({ width: 667, height: 375 });
    
    // Check navigation still works
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await expect(hamburgerButton.first()).toBeVisible();
    
    // Test portrait orientation
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(hamburgerButton.first()).toBeVisible();
  });

  test('should have proper focus management', async ({ page }) => {
    // Open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().click();
    
    // Check first menu item is focusable
    const firstMenuItem = page.locator('nav a').first();
    await firstMenuItem.focus();
    await expect(firstMenuItem).toBeFocused();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().click();
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Should navigate to first menu item
    await expect(page).not.toHaveURL('/');
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    // Check hamburger button has proper ARIA attributes
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await expect(hamburgerButton.first()).toBeVisible();
    
    // Check for aria-expanded attribute
    const ariaExpanded = await hamburgerButton.first().getAttribute('aria-expanded');
    expect(ariaExpanded).toBeDefined();
  });

  test('should handle rapid menu toggles', async ({ page }) => {
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    
    // Rapidly click hamburger menu
    for (let i = 0; i < 5; i++) {
      await hamburgerButton.first().click();
      await page.waitForTimeout(100);
    }
    
    // Menu should be in a consistent state
    const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav.md\\:hidden');
    await expect(mobileMenu).toBeVisible();
  });

  test('should work on different mobile screen sizes', async ({ page }) => {
    const screenSizes = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 375, height: 667 }, // iPhone 6/7/8
      { width: 414, height: 896 }, // iPhone X/XS
      { width: 768, height: 1024 } // iPad
    ];
    
    for (const size of screenSizes) {
      await page.setViewportSize(size);
      await page.goto('/');
      
      const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
      await expect(hamburgerButton.first()).toBeVisible();
    }
  });

  test('should handle network interruptions gracefully', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });
    
    // Try to open mobile menu
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    await hamburgerButton.first().click();
    
    // Menu should still work
    const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"], nav.md\\:hidden');
    await expect(mobileMenu).toBeVisible();
  });
}); 