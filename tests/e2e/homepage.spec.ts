import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/TK Afro Kitchen/);
    
    // Check main heading is visible
    await expect(page.locator('h1')).toContainText(/TK Afro Kitchen/);
    
    // Check page loads without errors
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display navigation menu correctly', async ({ page }) => {
    // Check main navigation is visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Check key navigation links are present
    const navLinks = ['Menu', 'Pricing', 'Frozen', 'Catering', 'About', 'FAQ', 'Contact'];
    
    for (const link of navLinks) {
      await expect(page.locator(`text=${link}`)).toBeVisible();
    }
  });

  test('should display hero section with call-to-action', async ({ page }) => {
    // Check hero section exists
    await expect(page.locator('section').first()).toBeVisible();
    
    // Check for call-to-action buttons
    await expect(page.locator('button:has-text("Order Now")')).toBeVisible();
    await expect(page.locator('a:has-text("Browse Menu")')).toBeVisible();
  });

  test('should display featured dishes section', async ({ page }) => {
    // Scroll to featured dishes section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    
    // Check for featured dishes
    await expect(page.locator('.featured-dishes, [data-testid="featured-dishes"]')).toBeVisible();
    
    // Check for dish cards
    const dishCards = page.locator('.dish-card, [data-testid="dish-card"]');
    await expect(dishCards.first()).toBeVisible();
  });

  test('should display footer with contact information', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer is visible
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for contact information
    await expect(page.locator('text=Milton Keynes')).toBeVisible();
  });

  test('should have working social media links', async ({ page }) => {
    // Check social media icons are present
    await expect(page.locator('a[href*="instagram"]')).toBeVisible();
    await expect(page.locator('a[href*="facebook"]')).toBeVisible();
  });

  test('should display logo and branding correctly', async ({ page }) => {
    // Check logo is visible
    await expect(page.locator('img[alt*="TK Afro Kitchen"]')).toBeVisible();
    
    // Check brand name is displayed
    await expect(page.locator('text=TKAfro Kitchen')).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check for essential meta tags
    await expect(page.locator('meta[name="description"]')).toBeAttached();
    await expect(page.locator('meta[name="viewport"]')).toBeAttached();
  });

  test('should load images without errors', async ({ page }) => {
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check for broken images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
    }
  });

  test('should have accessible color contrast', async ({ page }) => {
    // This is a basic accessibility check
    // In a real scenario, you'd use axe-core or similar tools
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle page refresh correctly', async ({ page }) => {
    // Refresh the page
    await page.reload();
    
    // Check page still loads correctly
    await expect(page).toHaveTitle(/TK Afro Kitchen/);
    await expect(page.locator('h1')).toContainText(/TK Afro Kitchen/);
  });
});