# UrbanEye - Smart Insights for Every Street


## Summary
UrbanEye is a web app, developed using P5.js, HTML, CSS and a Node.JS based backend. This web app is designed to allow users to capture or upload photos of common issues around their neighbourhood. Issues like potholes, overflowing drainage, poor lighting etc. The model also recognizes good features of the street, such as Good Lighting, Smooth road surface, traffic signals, etc. Problems on the street pose risks to citizens. Citizens often dont know the authorities they need to contact for specific issues, and even if they do, it will be difficult for them to track the progress. UrbanEye is made to recognize issues and good features, and provide a scoring for the street. Based on the score, the report is given a priority. Users can forward reports containing the recognized images and the issues directly to the authority's dashboard. Using Gemini API, we have also given users the ability to request suggestions on how they can solve a specific problem

**Urban Eye is designed to optimize and accelerate the reporting process.**

## Details for nerds

The current working site is working based on two branches of the same github repo. The `main` branch consists of our frontend, which is programmed using the library P5.js and regular HTMl and CSS. Our website also provides all the details needed about the project, however the main highlight is the Camera Detection Page. This page utilizes ml5.js to access a custom built TensorFlow model trained on the TeachableMachine platform. It recognizes the image and finds the score to be added/subtracted from total score. P5.js is also used to access the camera of the user. Finally our Contribution Suggestion feature (the 'How can I help?' button) sends a request to our custom built API on the backend, sending the image captured, the class recognized, and the score added/subtracted. The backend's code is visible on the `backend` branch. It uses Node.JS and generates a response from Gemini AI's API whenever a request is recieved from the front end. The backend and frontend are both hosted on vercel.


## Road Map

These are things we wish to finish so that the platform will be brought to absolute completion.

- Link Firebase to the web app, so that users can submit reports to the database, which can be accessed by authorities (90% Done, needs to be linked to main site)
- Create dashboards for both authorities and citizens through which they can login through with password and email (90% Done, needs to be linked to main site)
- Expand AI training model data
- Add geolocation tagging so authorities can understand where exactly the issue is


**Created for GIS Ajman Technova 2025 competition. Under the category "Impact Innovators". For the topic "AI for Community Impact"**
