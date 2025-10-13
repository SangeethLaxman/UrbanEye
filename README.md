# UrbanEye - Smart Insights for Every Street

## Project Overview
**UrbanEye** is an intelligent neighborhood issue classifier platform that bridges the gap between citizens and municipal authorities. Built by **CodeSynth**, the platform empowers residents to report and track urban infrastructure problems through AI-powered image analysis. The system automatically categorizes issues, assigns severity scores, and routes reports to the appropriate government departments for swift resolution.

**Base Concept**: Neighborhood Issue Classifier (NIC)

**Vision**: To create safer, cleaner, and more responsive communities by leveraging computer vision and machine learning to streamline urban issue reporting and resolution.

## Current Status
- Multi-page HTML/CSS/JavaScript website
- UrbanEye branding with custom logo
- Fully responsive design with modern styling
- Interactive navigation with dropdown menu
- Comprehensive AI scoring system explanation
- 15 issue categories with expanded coverage
- Functional AI camera detection page with p5.js and ml5.js integration
- Real-time image classification and severity scoring

## Project Structure

### HTML Pages
- `home.html` - Landing page with hero section and platform features
- `about.html` - Problem/Solution explanation (What is NIC?)
- `issues.html` - 15 issue categories with detailed descriptions
- `authorities.html` - Department mapping for each issue type
- `solutions.html` - Resolution approaches and remediation methods
- `how-it-works.html` - Detailed AI model scoring and routing explanation
- `team.html` - CodeSynth team page with 3 members
- `camera.html` - AI camera detection page with responsive layout
- `index.html` - Redirect to home.html

### JavaScript & Styling
- `sketch.js` - p5.js implementation for camera capture and AI classification
- `style.css` - Comprehensive styling with animations, gradients, and responsive design

### Assets
- `attached_assets/` - UrbanEye logo and stock images
- `team_photos/` - Team member photos
- `urban_eye_logo/` - Logo files

## Features Implemented

### 1. Navigation System
- UrbanEye logo in navbar with smooth animations
- 8 navigation tabs with proper alignment and active states
- Dropdown menu for Issue Categories (all pages have full 15-category dropdown)
- All dropdown items link to proper anchor IDs in issues.html
- Camera Detection tab highlighted on hover (orange accent)
- Active page highlighting for better UX

### 2. Issue Categories (15 total - all accessible via dropdown and anchors)
The platform recognizes and categorizes the following urban issues:

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

### 3. AI Scoring System (How It Works page)
- Step-by-step process explanation
- Category-based scoring mechanism with positive/negative values
- Total score calculation from multiple issues
- Smart authority routing based on severity thresholds
- Threshold-based contact suggestions
- Visual priority indicators (high/medium/low)

### 4. Team Section - CodeSynth
- Team name and mission description
- 3 team members with roles and photos
- Professional card-based layout
- Responsive grid design

### 5. Visual Design
- Gradient backgrounds (purple/blue theme)
- Smooth animations and transitions
- Real stock images throughout
- Responsive layouts for all devices (desktop, tablet, mobile)
- Modern card-based UI with shadows and hover effects
- Consistent color scheme using CSS variables

### 6. AI Camera Detection System
The camera detection page features a complete image analysis workflow:

**Layout & UI:**
- Responsive grid layout: side-by-side on desktop, stacked on mobile
- Two main sections: "Live Camera Feed" and "Captured Images"
- Custom-styled buttons with gradient backgrounds matching site theme
- Modern toggle switch for camera control (replaces basic checkbox)
- Professional card-based sections with rounded corners and shadows

**Camera Functionality:**
- Live camera feed with toggle control
- Camera flip functionality (front/back camera on mobile devices)
- Photo capture from webcam with one-click button
- File upload support for existing images
- Image preview with navigation arrows (browse through captured images)
- Index tracking showing current photo number

**AI Integration:**
- Real-time AI analysis using ml5.js and Teachable Machine
- Image classification across multiple categories
- Severity scoring system (positive/negative values)
- Total score calculation and display
- Visual feedback with color-coded labels (red for negative, green for positive)

## AI Camera Detection - Technical Principles

### Architecture Overview
The camera detection system is built on p5.js (creative coding framework) and ml5.js (machine learning library for the web), leveraging Google's Teachable Machine for image classification.

### Core Components

#### 1. **Dual Canvas System**
- **Video Canvas**: Displays live webcam feed using p5.js createCapture()
- **Image Canvas**: Shows captured/uploaded images for analysis
- Both canvases run on separate p5.js instances for independent rendering

#### 2. **Camera Management**
```
- setupCamera(): Initializes webcam with device-specific constraints
- toggleCamera(): Controls camera on/off state
- flipCamera(): Switches between front/rear cameras on mobile devices
- Device detection: Automatically detects mobile vs desktop for optimal settings
```

#### 3. **Image Capture & Storage**
- Images stored in array with metadata: { image, label, score }
- Support for both webcam capture and file upload
- Image preprocessing: Auto-resize to 400px height for consistency
- Index-based navigation through captured images

#### 4. **AI Classification Workflow**

**Step 1: Model Loading**
- Loads pre-trained Teachable Machine model from URL
- Model URL: https://teachablemachine.withgoogle.com/models/kvz9cozfO/
- Uses ml5.imageClassifier() for TensorFlow.js integration

**Step 2: Image Analysis**
- Classify button triggers startClassify() function
- Iterates through all captured images sequentially
- For each image: classifier.classify(image, callback)
- Non-blocking async processing with callbacks

**Step 3: Scoring System**
```javascript
Score Reference Dictionary:
- "Water & Drainage Issues": -30 points
- "Road Surface Damage": -40 points
- "Lighting and Visibility Issues": -20 points
- "Vegetation Overgrowth": -10 points
- "Structural Damage": -50 points (highest severity)
- "Smooth Road Surface": +40 points
- "Efficient Drainage": +30 points
- "Good Lighting and Visibility": +20 points
- "Clean Environment": +10 points
- "Safe Pedestrians and Traffic Signals": +40 points
```

**Step 4: Results Display**
- Labels overlay on images with color coding
- Red text for negative scores (problems)
- Green text for positive scores (good conditions)
- Total score calculated by summing all individual scores
- Real-time visual feedback during classification

### User Workflow
1. Toggle camera ON to start live feed
2. Position camera to capture issue
3. Click "Take Photo" to capture image (or upload file)
4. Navigate through captured images using arrows
5. Click "Analyze" to run AI classification
6. View individual labels and total severity score
7. Remove unwanted images and re-analyze if needed

### Responsive Behavior
- **Desktop (>968px)**: Side-by-side layout for feed and images
- **Tablet (768-968px)**: Stacked layout with full-width sections
- **Mobile (<768px)**: Vertical stack, full-width buttons, optimized touch targets

## Team - CodeSynth
**Mission**: Leveraging cutting-edge technology to solve real-world urban challenges and bridge the gap between citizens and authorities through intelligent automation.

**Team Members**:
- **Rishwanth Raja** - Web Developer & Creative Programmer
- **Sangeeth Lakshman** - AI Model Architect & Programmer  
- **Nasheet Noman** - Presenter & Model Design Explainer

## AI Model Details

### Model Architecture
The AI model is trained using Google's Teachable Machine, which uses transfer learning on MobileNet (a lightweight convolutional neural network). The model analyzes uploaded images and assigns severity scores by category.

### Training Data
While the platform lists 15+ issue categories, the AI model is currently trained on core categories representing the majority of reported urban problems:
- Infrastructure issues (roads, drainage, lighting)
- Environmental conditions (vegetation, cleanliness)
- Safety indicators (traffic signals, pedestrian safety)

### Classification Process
1. **Image Input**: User captures or uploads image
2. **Preprocessing**: Image resized and normalized
3. **Feature Extraction**: MobileNet extracts visual features
4. **Classification**: Custom trained layers predict category
5. **Confidence Scoring**: Returns top predictions with confidence levels
6. **Severity Mapping**: Maps category to severity score using reference dictionary
7. **Aggregation**: Calculates total severity score across all images

### Routing Logic
The system routes issues based on total severity scores:
- **High Priority (Score < -50)**: Immediate routing to emergency services
- **Medium Priority (Score -50 to -20)**: Routed to department heads
- **Low Priority (Score > -20)**: Standard reporting workflow
- **Positive Scores**: Logged for quality monitoring

## Technical Stack
- **Frontend**: HTML5, CSS3 (Flexbox, Grid), JavaScript (ES6+)
- **Creative Coding**: p5.js (v1.11.9)
- **Machine Learning**: ml5.js (v1.2.2)
- **AI Model**: Google Teachable Machine (TensorFlow.js backend)
- **Web Server**: Python HTTP Server (development)
- **Styling**: CSS3 animations, gradients, custom variables

## Next Steps
1. Add remaining team photos
2. Connect to backend API for issue submission and tracking
3. Add database (PostgreSQL) for storing reported issues
4. Implement user authentication and issue history
5. Expand AI model training data for better accuracy
6. Add geolocation tagging for precise issue mapping
7. Implement notification system for issue status updates
8. Fine-tune responsive design on various devices

## Project Goals
1. **Accessibility**: Make urban issue reporting accessible to all citizens
2. **Efficiency**: Automate issue categorization and routing
3. **Transparency**: Provide clear scoring and routing logic
4. **Responsiveness**: Ensure municipal authorities receive actionable reports
5. **Scalability**: Build foundation for city-wide deployment
