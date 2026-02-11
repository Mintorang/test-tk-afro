# 🔄 Restoring Vercel Environment Variables

Your environment variables have been backed up in these files:
- `.env.vercel` (Development)
- `.env.vercel.production` (Production)
- `.env.vercel.preview` (Preview)

## Method 1: Using Vercel CLI (Recommended)

After you reconnect the project in Vercel:

```bash
# 1. Link the project again
vercel link --project=tk-afro-kitchen

# 2. Restore development variables (if needed)
vercel env pull .env.vercel.new --environment=development
# Compare and restore any missing ones

# 3. For production/preview, you'll need to add them manually
# Open .env.vercel.production and .env.vercel.preview files
# Then run for each variable:
vercel env add <VAR_NAME> --environment=production
# Enter the value when prompted
```

## Method 2: Using Vercel Dashboard (Easier)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Open the `.env.vercel.production` file (or copy its contents)
3. For each line in format `VAR_NAME=value`, click "Add New" and paste
4. Repeat for Preview environment using `.env.vercel.preview`

## Method 3: Bulk Import Script

If you have many variables, you can create a script to parse the .env files and add them:

```bash
# Example for production (run in PowerShell on Windows)
# Or use WSL/Bash for Linux commands
cat .env.vercel.production | while IFS='=' read -r key value; do
  if [ ! -z "$key" ]; then
    echo "$key=$value" | vercel env add "$key" --environment=production
  fi
done
```

## Important Notes

⚠️ **Security**: These `.env.vercel*` files contain sensitive data. Do NOT commit them to git!

✅ **Already Protected**: These files are likely in your `.gitignore`

📋 **Quick Check**: After restoring, verify in Vercel Dashboard that all variables are present

## After Reconnecting

1. Delete old project in Vercel
2. Create new project and connect to GitHub repo
3. Restore environment variables using one of the methods above
4. Trigger a deployment to verify everything works

