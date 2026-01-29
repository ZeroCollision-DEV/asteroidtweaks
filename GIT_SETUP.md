# 🚀 GIT SETUP & DEPLOYMENT GUIDE

## 📋 **STEP 1: INSTALL GIT**
1. Download from: https://git-scm.com/download/win
2. Install with default settings
3. Restart your computer

## 📋 **STEP 2: CREATE GITHUB REPOSITORY**
1. Go to https://github.com
2. Click "New repository"
3. Repository name: `asteroid-tweaking-utility`
4. Description: `Premium Windows system optimization utility`
5. Make it **Public**
6. Click "Create repository"

## 📋 **STEP 3: PUSH YOUR CODE**
Open Command Prompt or PowerShell in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - Asteroid Tweaking Utility with premium website"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/asteroid-tweaking-utility.git

# Push to GitHub
git push -u origin main
```

## 📋 **STEP 4: DEPLOY TO NETLIFY**
1. Go back to Netlify
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your `asteroid-tweaking-utility` repository
5. Use these settings:
   - **Branch to deploy**: `main`
   - **Base directory**: `.`
   - **Build command**: `echo 'Static site - no build command needed'`
   - **Publish directory**: `website`
   - **Functions directory**: `netlify/functions`
6. Click "Deploy site"

## 🎯 **QUICK COMMANDS TO COPY:**

```bash
git init
git add .
git commit -m "Deploy premium Asteroid Tweaking Utility website"
git remote add origin https://github.com/YOUR_USERNAME/asteroid-tweaking-utility.git
git push -u origin main
```

## ⚠️ **IMPORTANT:**
- Replace `YOUR_USERNAME` with your actual GitHub username
- Make sure the repository name matches: `asteroid-tweaking-utility`
- The repository must be **Public** for Netlify free tier

## 🚀 **AFTER PUSHING:**
Your code will be on GitHub and Netlify will find the `main` branch!
Then you can deploy successfully with the settings you already configured.
