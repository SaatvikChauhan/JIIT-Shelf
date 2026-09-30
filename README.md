# JIIT Shelf

All your JIIT study material, one shelf.

JIIT Shelf is a student-built platform for finding course material without digging through old Classroom posts and scattered Drive folders. Select your branch and semester, choose a course, and get straight to the lectures, tutorials, books and PYQs you need.

**Live:** [jiitshelf.vercel.app](https://jiitshelf.vercel.app)

## What you can do

- Browse material by branch, semester and course
- Search courses by title, subject code or familiar initials
- Find lectures, tutorials, assignments, books and PYQs in one place
- Join an all-years room or your branch and semester Community
- Estimate your SGPA from subject marks
- Follow the countdown to the next T1, T2 or T3 exam
- See what courses students are opening through Popular Today
- View aggregate campus activity through Stats for nerds
- Contribute useful PDF and PPTX material for review
- Switch between light and dark themes
- Install JIIT Shelf as a PWA on mobile or desktop

## Contribute to the shelf

Found notes, slides or a PYQ that could help others? Open **Contribute Material** from the Tools menu or directly from a semester or course page.

Choose where the material belongs, enter the name you want displayed, and upload your files. Every submission is reviewed before it appears on the shelf. Accepted contributions receive a credit beside the material.

## Built with

### Frontend

- React 19
- React Router
- Vite
- Axios
- Lucide
- Workbox and Vite PWA
- Socket.IO Client

### Backend

- Node.js
- Express 5
- MongoDB and Mongoose
- Socket.IO
- Google Drive API
- Google OAuth 2.0

The frontend is hosted on Vercel, while the API and real-time services run on Render.

## Project highlights

- Responsive interface designed for desktop, tablet and mobile
- Custom accessible dropdowns, dialogs, loaders and theme controls
- Course search that understands codes and student shorthand
- Real-time anonymous chat with editing, reactions and moderation controls
- Reviewed material-contribution flow with contributor credits
- Layered caching to reduce repeat Drive requests and improve return visits
- Installable PWA with automatic service-worker updates
- Custom aggregate analytics dashboard
- Backend request validation, response limits and traffic monitoring

## Install JIIT Shelf

### Android

1. Open [jiitshelf.vercel.app](https://jiitshelf.vercel.app) in Chrome.
2. Tap the three-dot menu.
3. Select **Add to Home screen** or **Install app**.
4. Confirm the installation.

### iPhone or iPad

1. Open the site in Safari.
2. Tap the Share button.
3. Select **Add to Home Screen**.
4. Tap **Add**.

### Desktop

1. Open the site in Chrome or Edge.
2. Click the install icon in the address bar.
3. Confirm the installation.

## Report bugs

Found a broken link or something that needs fixing? Use **Tools > Report a Bug** or write to [jiitshelf@gmail.com](mailto:jiitshelf@gmail.com).
