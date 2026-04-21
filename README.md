# Super Calculator License Server

## Deploy to Vercel

### Step 1: Push to GitHub
```bash
cd license_server
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/supercalc-license.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your `supercalc-license` repository
5. Click "Deploy"

### Step 3: Get Your Domain
After deployment, Vercel will give you a domain like:
`supercalc-license.vercel.app`

### API Endpoint
The license verification API will be available at:
`https://supercalc-license.vercel.app/api/verify`
