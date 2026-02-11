# TK Afro Kitchen Menu Management

A simple admin system for managing menu items with basic Add/Edit/Delete functionality, price management, and **secure authentication**.

## 🔐 Security Features

- **JWT-based Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password hashing for security
- **Protected Routes**: All admin routes require authentication
- **Token Expiration**: JWT tokens expire after 24 hours
- **Middleware Protection**: Server-side route protection

## 🚀 Features

- **Add Menu Items**: Create new menu items with name, description, image, category, and price
- **Edit Menu Items**: Modify existing menu items
- **Delete Menu Items**: Remove menu items from the system
- **Image Upload**: Upload images for menu items
- **Search**: Search through menu items by name, description, or category
- **Price Management**: Set and update prices for menu items
- **Secure Admin Access**: Protected with username/password authentication

## 🛠️ Setup Instructions

### 1. Database Setup

Run the database schema to create the required table:

```bash
# Connect to your PostgreSQL database
psql -d your_database_name -f database-schema.sql
```

### 2. Environment Variables

Add to your `.env.local`:

```env
# Database
POSTGRES_URL=your_postgres_connection_string

# Admin Authentication (REQUIRED)
JWT_SECRET=your-super-secure-jwt-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-bcrypt-hash-here
```

### 3. Generate Secure Password Hash

Run the password hash generator:

```bash
node scripts/generate-password-hash.js yourSecurePassword123
```

This will output a hash that you should add to your `ADMIN_PASSWORD_HASH` environment variable.

### 4. Install Dependencies

```bash
npm install @vercel/postgres bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
```

## 🔐 Security Setup

### Default Credentials (Development Only)
If you don't set `ADMIN_PASSWORD_HASH`, the system will use these default credentials:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **WARNING**: Change these immediately in production!

### Production Security Checklist
- [ ] Set a strong `JWT_SECRET` (32+ characters, random)
- [ ] Generate and set `ADMIN_PASSWORD_HASH` using the script
- [ ] Use a strong admin password (12+ characters, mixed case, numbers, symbols)
- [ ] Set `ADMIN_USERNAME` to something other than 'admin'
- [ ] Use HTTPS in production
- [ ] Regularly rotate JWT secrets

## 📱 Usage

### Accessing the Menu Management

1. Navigate to `/admin` in your application
2. You'll be prompted for login credentials
3. Enter your admin username and password
4. Once authenticated, you'll have access to the menu management system

### Adding a New Menu Item

1. Click "Add New Item" button
2. Fill in:
   - **Name**: Item name (e.g., "Jollof Rice")
   - **Description**: Item description
   - **Category**: Item category (e.g., "Rice Dishes")
   - **Price**: Item price in pounds (£)
3. Upload an image (optional)
4. Click "Save Changes"

### Editing a Menu Item

1. Click the edit icon (pencil) on any menu item
2. Modify any field
3. Upload a new image if needed
4. Click "Save Changes"

### Deleting a Menu Item

1. Click the delete icon (trash) on any menu item
2. Confirm deletion

### Searching Menu Items

Use the search box to find items by name, description, or category.

### Logging Out

Click the "Logout" button in the top-right corner of the admin panel.

## 🔧 API Endpoints

All admin API endpoints require authentication via Bearer token:

- `POST /api/admin/auth/login` - Login (no auth required)
- `POST /api/admin/auth/verify` - Verify token
- `GET /api/admin/menu-items` - Get all menu items
- `POST /api/admin/menu-items` - Create new menu item
- `PUT /api/admin/menu-items/[id]` - Update menu item
- `DELETE /api/admin/menu-items/[id]` - Delete menu item
- `POST /api/admin/upload-image` - Upload image
- `GET /api/admin/stats` - Get menu item count

## 📊 Database Schema

The system uses a simple `menu_items` table with these fields:
- `id` - Primary key
- `name` - Item name
- `description` - Item description
- `image_url` - Image URL
- `category` - Item category
- `price` - Item price
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## 🚀 Deployment

### Vercel Deployment
1. Push code to your repository
2. Connect to Vercel
3. Set environment variables in Vercel dashboard:
   - `POSTGRES_URL`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
4. Deploy

### Environment Variables in Vercel
Make sure to set these in your Vercel project settings:
- `POSTGRES_URL` - Your database connection string
- `JWT_SECRET` - A secure random string for JWT signing
- `ADMIN_USERNAME` - Your admin username
- `ADMIN_PASSWORD_HASH` - The bcrypt hash of your admin password

## 🔒 Security Best Practices

1. **Use Strong Passwords**: Generate complex passwords for admin accounts
2. **Rotate Secrets**: Regularly change JWT_SECRET and admin passwords
3. **HTTPS Only**: Always use HTTPS in production
4. **Limit Access**: Only give admin access to trusted users
5. **Monitor Logs**: Keep an eye on authentication attempts
6. **Backup Data**: Regularly backup your database

## 📞 Support

For issues:
1. Check browser console for errors
2. Verify database connectivity
3. Ensure all environment variables are set
4. Check authentication credentials
5. Verify JWT token expiration

## 🔐 Troubleshooting

### "Invalid credentials" error
- Check that `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` are set correctly
- Regenerate password hash if needed
- Ensure you're using the correct username/password

### "Unauthorized" API errors
- Check that JWT token is valid and not expired
- Verify `JWT_SECRET` is set correctly
- Try logging out and logging back in

### Token expiration
- JWT tokens expire after 24 hours
- Simply log out and log back in to get a new token

---

**Note**: This is a secure menu management system that allows you to add, edit, and delete menu items with proper authentication and authorization. 