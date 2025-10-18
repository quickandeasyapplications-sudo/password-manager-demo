# Deployment Instructions for GitHub Pages

This guide will help you deploy the Quick and Easy Tech Password Manager Interactive Demo to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## Step-by-Step Deployment

### Option 1: Using GitHub Web Interface (Easiest)

1. **Create a New Repository**
   - Go to [GitHub](https://github.com)
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it: `password-manager-demo`
   - Make it Public
   - Click "Create repository"

2. **Upload Files**
   - Click "uploading an existing file"
   - Drag and drop these files:
     - `index.html`
     - `demo.js`
     - `README.md`
   - Commit the files

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your demo will be live at: `https://yourusername.github.io/password-manager-demo/`

### Option 2: Using Git Command Line

1. **Create Repository on GitHub**
   - Go to GitHub and create a new repository named `password-manager-demo`
   - Don't initialize with README

2. **Clone and Push**
   ```bash
   # Navigate to the demo directory
   cd github-demo
   
   # Initialize git
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: Interactive demo"
   
   # Add remote
   git remote add origin https://github.com/yourusername/password-manager-demo.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "main" branch as source
   - Save

### Option 3: Using GitHub Desktop

1. **Create Repository**
   - Open GitHub Desktop
   - File → New Repository
   - Name: `password-manager-demo`
   - Local Path: Choose the `github-demo` folder
   - Create Repository

2. **Publish to GitHub**
   - Click "Publish repository"
   - Uncheck "Keep this code private"
   - Publish

3. **Enable GitHub Pages**
   - Go to repository on GitHub.com
   - Settings → Pages
   - Select "main" branch
   - Save

## Verification

After deployment:

1. Wait 1-2 minutes for GitHub Pages to build
2. Visit: `https://yourusername.github.io/password-manager-demo/`
3. You should see the interactive demo

## Updating the Demo

To update the demo after changes:

```bash
git add .
git commit -m "Update demo"
git push
```

GitHub Pages will automatically rebuild in 1-2 minutes.

## Custom Domain (Optional)

To use a custom domain:

1. Go to Settings → Pages
2. Enter your custom domain
3. Add DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

## Troubleshooting

### Demo not loading?
- Check that `index.html` is in the root directory
- Verify GitHub Pages is enabled in Settings
- Wait a few minutes for deployment

### 404 Error?
- Ensure the repository is public
- Check the branch selected in Pages settings
- Verify files are committed and pushed

### JavaScript not working?
- Check browser console for errors
- Ensure `demo.js` is in the same directory as `index.html`
- Clear browser cache and reload

## File Structure

Your repository should look like this:

```
password-manager-demo/
├── index.html
├── demo.js
├── README.md
├── DEPLOYMENT.md (this file)
└── LICENSE (optional)
```

## Security Note

This demo runs entirely in the browser with no backend. All data is stored in memory and never transmitted. It's safe to host publicly.

## Support

For issues or questions:
- Create an issue in the GitHub repository
- Email: info@quickandeasytech.com

## License

Copyright © 2025 Quick and Easy Tech. All rights reserved.

---

**Quick and Easy Tech Password Manager**  
*"The Password Manager You Own, Not Rent"*

