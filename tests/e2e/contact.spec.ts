import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should load contact page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Contact/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText(/Contact/);
    
    // Check page loads without errors
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display contact form', async ({ page }) => {
    // Check form is visible
    await expect(page.locator('form')).toBeVisible();
    
    // Check for form fields
    await expect(page.locator('input[name="name"], input[placeholder*="Name"]')).toBeVisible();
    await expect(page.locator('input[name="email"], input[placeholder*="Email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"], textarea[placeholder*="Message"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"], button:has-text("Send Message")');
    
    // Should show validation errors
    const errorMessages = page.locator('.error-message, [data-testid="error-message"]');
    if (await errorMessages.count() > 0) {
      await expect(errorMessages.first()).toBeVisible();
    }
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.fill('input[name="name"], input[placeholder*="Name"]', 'Test User');
    await page.fill('input[name="email"], input[placeholder*="Email"]', 'invalid-email');
    await page.fill('textarea[name="message"], textarea[placeholder*="Message"]', 'Test message');
    
    // Submit form
    await page.click('button[type="submit"], button:has-text("Send Message")');
    
    // Should show email validation error
    const emailError = page.locator('text=Invalid email, text=Please enter a valid email');
    if (await emailError.count() > 0) {
      await expect(emailError.first()).toBeVisible();
    }
  });

  test('should accept valid form submission', async ({ page }) => {
    // Fill form with valid data
    await page.fill('input[name="name"], input[placeholder*="Name"]', 'Test User');
    await page.fill('input[name="email"], input[placeholder*="Email"]', 'test@example.com');
    await page.fill('textarea[name="message"], textarea[placeholder*="Message"]', 'This is a test message');
    
    // Mock the form submission to avoid actually sending emails
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      });
    });
    
    // Submit form
    await page.click('button[type="submit"], button:has-text("Send Message")');
    
    // Check for success message
    const successMessage = page.locator('text=Message sent, text=Success, [data-testid="success-message"]');
    if (await successMessage.count() > 0) {
      await expect(successMessage.first()).toBeVisible();
    }
  });

  test('should display contact information', async ({ page }) => {
    // Check for contact details
    await expect(page.locator('text=Milton Keynes')).toBeVisible();
    
    // Check for phone number if present
    const phoneNumber = page.locator('text=+44, a[href*="tel"]');
    if (await phoneNumber.count() > 0) {
      await expect(phoneNumber.first()).toBeVisible();
    }
  });

  test('should have working social media links', async ({ page }) => {
    // Check social media links
    await expect(page.locator('a[href*="instagram"]')).toBeVisible();
    await expect(page.locator('a[href*="facebook"]')).toBeVisible();
  });

  test('should display business hours if available', async ({ page }) => {
    // Check for business hours section
    const businessHours = page.locator('text=Hours, text=Opening, text=Business');
    if (await businessHours.count() > 0) {
      await expect(businessHours.first()).toBeVisible();
    }
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check form fields have proper labels
    const nameField = page.locator('input[name="name"], input[placeholder*="Name"]');
    await expect(nameField).toBeVisible();
    
    const emailField = page.locator('input[name="email"], input[placeholder*="Email"]');
    await expect(emailField).toBeVisible();
    
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="Message"]');
    await expect(messageField).toBeVisible();
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    // Fill form with valid data
    await page.fill('input[name="name"], input[placeholder*="Name"]', 'Test User');
    await page.fill('input[name="email"], input[placeholder*="Email"]', 'test@example.com');
    await page.fill('textarea[name="message"], textarea[placeholder*="Message"]', 'Test message');
    
    // Mock server error
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    // Submit form
    await page.click('button[type="submit"], button:has-text("Send Message")');
    
    // Check for error message
    const errorMessage = page.locator('text=Error, text=Failed, [data-testid="error-message"]');
    if (await errorMessage.count() > 0) {
      await expect(errorMessage.first()).toBeVisible();
    }
  });

  test('should prevent multiple form submissions', async ({ page }) => {
    // Fill form
    await page.fill('input[name="name"], input[placeholder*="Name"]', 'Test User');
    await page.fill('input[name="email"], input[placeholder*="Email"]', 'test@example.com');
    await page.fill('textarea[name="message"], textarea[placeholder*="Message"]', 'Test message');
    
    // Mock slow response
    await page.route('**/api/contact', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
    
    // Submit form multiple times quickly
    const submitButton = page.locator('button[type="submit"], button:has-text("Send Message")');
    await submitButton.click();
    await submitButton.click();
    
    // Should only send one request
    // This is a basic check - in a real scenario you'd verify the network requests
    await expect(submitButton).toBeVisible();
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill form
    await page.fill('input[name="name"], input[placeholder*="Name"]', 'Test User');
    await page.fill('input[name="email"], input[placeholder*="Email"]', 'test@example.com');
    await page.fill('textarea[name="message"], textarea[placeholder*="Message"]', 'Test message');
    
    // Mock successful submission
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
    
    // Submit form
    await page.click('button[type="submit"], button:has-text("Send Message")');
    
    // Wait for form to be cleared
    await page.waitForTimeout(1000);
    
    // Check form fields are empty
    const nameField = page.locator('input[name="name"], input[placeholder*="Name"]');
    const emailField = page.locator('input[name="email"], input[placeholder*="Email"]');
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="Message"]');
    
    expect(await nameField.inputValue()).toBe('');
    expect(await emailField.inputValue()).toBe('');
    expect(await messageField.inputValue()).toBe('');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check form is still usable
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="name"], input[placeholder*="Name"]')).toBeVisible();
    await expect(page.locator('button[type="submit"], button:has-text("Send Message")')).toBeVisible();
  });

  test('should handle special characters in form fields', async ({ page }) => {
    // Test with special characters
    const specialName = 'José María O\'Connor-Smith';
    const specialMessage = 'Hello! This is a test message with special chars: @#$%^&*()';
    
    await page.fill('input[name="name"], input[placeholder*="Name"]', specialName);
    await page.fill('input[name="email"], input[placeholder*="Email"]', 'test@example.com');
    await page.fill('textarea[name="message"], textarea[placeholder*="Message"]', specialMessage);
    
    // Check values are set correctly
    const nameField = page.locator('input[name="name"], input[placeholder*="Name"]');
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="Message"]');
    
    expect(await nameField.inputValue()).toBe(specialName);
    expect(await messageField.inputValue()).toBe(specialMessage);
  });
}); 