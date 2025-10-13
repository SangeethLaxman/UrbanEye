# UrbanEye - Smart Insights for Every Street

## Project Overview
**UrbanEye** is a neighborhood issue classifier platform that connects citizens with solutions. Built by **CodeSynth**, the platform allows residents to upload photos of neighborhood issues and uses AI to automatically categorize, score, and route them to the appropriate authorities.

**Base Concept**: Neighborhood Issue Classifier

## Current Status
- Multi-page HTML/CSS/JavaScript website
- UrbanEye branding with custom logo
- Fully responsive design with modern styling
- Interactive navigation with dropdown menu
- Comprehensive AI scoring system explanation
- 15 issue categories with expanded coverage
- Functional AI camera detection page with p5.js and ml5.js integration

## Project Structure
- `home.html` - Landing page with hero section and features
- `about.html` - Problem/Solution explanation (What is NIC?)
- `issues.html` - 15 issue categories with descriptions
- `authorities.html` - Department mapping for each issue type
- `solutions.html` - Resolution approaches for issues
- `how-it-works.html` - Detailed AI model scoring and routing explanation
- `team.html` - CodeSynth team page with 3 members
- `camera.html` - AI camera detection page with responsive layout
- `sketch.js` - p5.js implementation for camera capture and AI classification
- `index.html` - Redirect to home.html
- `style.css` - Comprehensive styling with animations and responsive design
- `attached_assets/` - UrbanEye logo and stock images

## Features Implemented
1. **Navigation System**
   - UrbanEye logo in navbar
   - 8 navigation tabs with proper alignment
   - Dropdown menu for Issue Categories (all pages have full 15-category dropdown)
   - All dropdown items link to proper anchor IDs in issues.html
   - Camera Detection tab highlighted on hover (orange)
   - Active page highlighting

2. **Issue Categories** (15 total - all accessible via dropdown and anchors)
   - Water & Drainage (#water)
   - Road Surface Damage (#road)
   - Lighting & Visibility (#lighting)
   - Vegetation Overgrowth (#vegetation)
   - Structural Damage (#structural)
   - Waste Management (#waste)
   - Vandalism & Graffiti (#vandalism)
   - Traffic & Signage (#traffic)
   - Public Amenities (#amenities)
   - Safety Hazards (#safety)
   - Water Quality (#water-quality)
   - Noise Pollution (#noise)
   - Animal Control (#animal)
   - Abandoned Properties (#abandoned)
   - Air Quality (#air)

3. **AI Scoring System** (How It Works page)
   - Step-by-step process explanation
   - Category-based scoring mechanism
   - Total score calculation
   - Smart authority routing based on severity
   - Threshold-based contact suggestions

4. **Team Section - CodeSynth**
   - Team name and mission description
   - 3 team members: Rishwanth Raja, Sangeeth Lakshman, Nasheet Noman
   - Third teammate card centered on page
   - Photo placeholders ready for team images

5. **Visual Design**
   - Real stock images throughout
   - Gradient backgrounds and animations
   - Responsive layouts for all devices
   - Modern card-based UI

6. **AI Camera Detection** (Camera Detection page)
   - Responsive grid layout: side-by-side on desktop, stacked on mobile
   - Live camera feed with toggle control
   - Camera flip functionality (front/back camera on mobile)
   - Photo capture from webcam
   - File upload support
   - Image preview with navigation arrows
   - AI analysis using ml5.js and Teachable Machine model
   - Real-time scoring and classification
   - Custom-styled buttons, toggles, and controls matching site design
   - Total score display with gradient styling

## Team - CodeSynth
**Mission**: Leveraging cutting-edge technology to solve real-world urban challenges and bridge the gap between citizens and authorities through intelligent automation.

**Team Members**:
- **Rishwanth Raja** - Lead Developer & AI Specialist
- **Sangeeth Lakshman** - Full Stack Developer & UX Designer  
- **Nasheet Noman** - Systems Architect & Data Analyst

## AI Model Details
The AI model analyzes uploaded images and assigns severity scores by category. While the platform lists 15+ issue categories, the AI model is trained on core categories representing the majority of reported problems. The system:
- Analyzes images for multiple issue types
- Assigns category-specific scores
- Calculates total severity score
- Routes to authorities based on thresholds
- Suggests direct contact for lower-priority issues

## Next Steps
1. Add real team photos
2. Connect to backend API for issue submission
3. Add database for tracking reported issues
4. Expand AI model training data
5. Fine-tune responsive design on various devices
