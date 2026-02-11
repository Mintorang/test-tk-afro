#!/bin/bash
# Script to restore Vercel environment variables after reconnecting project
# Usage: After linking project with 'vercel link', run this script

echo "🔄 Restoring Vercel environment variables..."

# Restore Development environment variables
if [ -f .env.vercel ]; then
    echo "📝 Restoring Development environment variables..."
    vercel env add < .env.vercel --environment=development --yes
fi

# Restore Production environment variables
if [ -f .env.vercel.production ]; then
    echo "📝 Restoring Production environment variables..."
    # Note: This requires manual parsing and adding each variable
    echo "⚠️  Production variables need to be restored manually via dashboard or CLI"
    echo "   Run: vercel env add <VAR_NAME> --environment=production"
fi

# Restore Preview environment variables
if [ -f .env.vercel.preview ]; then
    echo "📝 Restoring Preview environment variables..."
    # Note: This requires manual parsing and adding each variable
    echo "⚠️  Preview variables need to be restored manually via dashboard or CLI"
    echo "   Run: vercel env add <VAR_NAME> --environment=preview"
fi

echo "✅ Restoration process started!"
echo "📋 Full restoration requires CLI or Dashboard for production/preview envs"

