# Deployment Guide - Star Wars 3D Encyclopedia

## 🚀 Deploy to Vercel (Recommended - FREE)

Vercel is perfect for React apps and provides automatic deployments from GitHub.

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Star Wars 3D Encyclopedia"

# Create a GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/starwars-encyclopedia.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Website

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"
7. Wait 2-3 minutes... ✅ **LIVE!**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? N
# - Project name: starwars-encyclopedia
# - Directory: ./
# - Vercel auto-detects settings

# Deploy to production
vercel --prod
```

### Step 3: Your Live URL

Your app will be live at:
```
https://starwars-encyclopedia.vercel.app
```
Or your custom domain!

---

## 🌐 Deploy to Netlify (Alternative - FREE)

### Option A: Netlify Website

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"
7. Wait 2-3 minutes... ✅ **LIVE!**

### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Step 3: Configure Redirects

Netlify needs a `_redirects` file for React Router:

```bash
# Create in public folder
echo "/*    /index.html   200" > public/_redirects
```

Then rebuild and deploy.

---

## 📦 Deploy to GitHub Pages (FREE)

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add these scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/starwars-encyclopedia"
}
```

### Step 3: Update vite.config.js

```javascript
export default defineConfig({
  base: '/starwars-encyclopedia/',
  // ... rest of config
})
```

### Step 4: Deploy

```bash
npm run deploy
```

Your app will be live at:
```
https://YOUR_USERNAME.github.io/starwars-encyclopedia
```

---

## 🔧 Environment Variables (Optional)

If you need any API keys in the future:

### Vercel
Add in dashboard: Settings → Environment Variables

### Netlify
Add in dashboard: Site settings → Environment variables

---

## ✅ Post-Deployment Checklist

- [ ] Test all pages work
- [ ] Test 3D planet rendering
- [ ] Test character search
- [ ] Test sound toggle (add imperial-march.mp3)
- [ ] Test background battle animations
- [ ] Check mobile responsiveness
- [ ] Test navigation and routing
- [ ] Verify copyright footer shows correctly

---

## 🎯 Quick Deploy Summary

**Fastest:** Vercel website (3 clicks, auto-detects everything)

**Commands:**
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# GitHub Pages
npm run deploy
```

---

## 🌟 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update DNS records

---

## 📧 Support

If you encounter deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)

---

⚡ **May the Force be with your deployment!** ⚡


