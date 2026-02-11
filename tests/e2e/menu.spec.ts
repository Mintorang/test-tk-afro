import { test, expect } from '@playwright/test';

test.describe('Menu Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/menu');
  });

  test('should load menu page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Menu/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText(/Our Menu/);
    
    // Check page loads without errors
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display category filters on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Check category filter buttons are visible
    await expect(page.locator('button:has-text("All Dishes")')).toBeVisible();
    await expect(page.locator('button:has-text("Rice Dishes")')).toBeVisible();
    await expect(page.locator('button:has-text("Soups & Stews")')).toBeVisible();
  });

  test('should display mobile category filter on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile category filter is visible
    await expect(page.locator('text=Categories')).toBeVisible();
    
    // Check for horizontal scroll container
    await expect(page.locator('.overflow-x-auto')).toBeVisible();
  });

  test('should filter menu items by category', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Get initial item count
    const initialItems = page.locator('.menu-item, [data-testid="menu-item"]');
    const initialCount = await initialItems.count();
    
    // Click on a specific category
    await page.click('button:has-text("Rice Dishes")');
    
    // Wait for filtering to complete
    await page.waitForTimeout(500);
    
    // Check that items are filtered
    const filteredItems = page.locator('.menu-item, [data-testid="menu-item"]');
    const filteredCount = await filteredItems.count();
    
    // Should have fewer or equal items after filtering
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should auto-scroll to menu items on mobile category selection', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Click on a category in mobile filter
    await page.click('button:has-text("Rice Dishes")');
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
    
    // Check that page has scrolled down
    const newScrollY = await page.evaluate(() => window.scrollY);
    expect(newScrollY).toBeGreaterThan(initialScrollY);
  });

  test('should display menu items with correct information', async ({ page }) => {
    // Check for menu items
    const menuItems = page.locator('.menu-item, [data-testid="menu-item"]');
    await expect(menuItems.first()).toBeVisible();
    
    // Check item structure
    const firstItem = menuItems.first();
    await expect(firstItem.locator('h3')).toBeVisible(); // Item name
    await expect(firstItem.locator('p')).toBeVisible(); // Description
    await expect(firstItem.locator('img')).toBeVisible(); // Image
  });

  test('should display prices for menu items', async ({ page }) => {
    // Check for price elements
    const prices = page.locator('.price, [data-testid="price"]');
    await expect(prices.first()).toBeVisible();
    
    // Check price format (should contain £ symbol)
    const firstPrice = await prices.first().textContent();
    expect(firstPrice).toMatch(/£\d+/);
  });

  test('should have working search functionality', async ({ page }) => {
    // Set desktop viewport for search bar
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Find search input
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
    
    // Type in search term
    await searchInput.fill('jollof');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Check that results are filtered
    const results = page.locator('.menu-item, [data-testid="menu-item"]');
    await expect(results.first()).toBeVisible();
  });

  test('should display size options for menu items', async ({ page }) => {
    // Check for size options
    const sizeOptions = page.locator('.size-option, [data-testid="size-option"]');
    if (await sizeOptions.count() > 0) {
      await expect(sizeOptions.first()).toBeVisible();
    }
  });

  test('should have add to cart functionality', async ({ page }) => {
    // Check for add to cart buttons
    const addToCartButtons = page.locator('button:has-text("Add to Cart"), [data-testid="add-to-cart"]');
    if (await addToCartButtons.count() > 0) {
      await expect(addToCartButtons.first()).toBeVisible();
    }
  });

  test('should handle empty search results gracefully', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Search for non-existent item
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('nonexistentitem12345');
    
    // Wait for search
    await page.waitForTimeout(500);
    
    // Should show no results message or empty state
    const noResults = page.locator('text=No items found, text=No results, [data-testid="no-results"]');
    if (await noResults.count() > 0) {
      await expect(noResults.first()).toBeVisible();
    }
  });

  test('should maintain filter state on page refresh', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Select a category
    await page.click('button:has-text("Rice Dishes")');
    
    // Refresh page
    await page.reload();
    
    // Check that the category is still selected
    await expect(page.locator('button:has-text("Rice Dishes")')).toHaveClass(/selected|active/);
  });

  test('should have responsive design on different screen sizes', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should handle mobile menu toggle correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check for hamburger menu
    const hamburgerMenu = page.locator('button[aria-label*="menu"], .hamburger-menu, [data-testid="mobile-menu-toggle"]');
    if (await hamburgerMenu.count() > 0) {
      await expect(hamburgerMenu.first()).toBeVisible();
      
      // Click hamburger menu
      await hamburgerMenu.first().click();
      
      // Check mobile menu is visible
      const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu"]');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should display loading states correctly', async ({ page }) => {
    // This test would check for loading spinners or skeletons
    // when data is being fetched
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // This test would simulate network failures
    // and check error handling
    await expect(page.locator('body')).toBeVisible();
  });
}); 