#Job Portal Website

This project is a dynamic job portal application built using modern web development technologies. It provides a platform for job seekers to search for job opportunities 
and for companies to post job openings. However, please note that there are some issues encountered post-deployment, which are highlighted in the Known Issues section below.

#Table of Contents

Overview

Features

Technologies Used

Installation

Usage

Known Issues

Contributing

License

Overview

The Job Portal Application connects job seekers and companies in a single platform, providing functionalities for
searching and applying for jobs, and for companies to manage job postings. The app features user authentication, dynamic job listing management, and a user-friendly interface.

Features

User Roles:

Job Seekers can register, log in, search for jobs, and apply.

Companies can post, edit, and manage job listings.

Dynamic Job Listings:

Filter and sort jobs by categories, locations, or experience level.

User Authentication:

Secure login and registration system with password hashing.

Responsive Design:

Fully responsive interface for both desktop and mobile devices.

Technologies Used

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Deployment: Deployed on a cloud platform (e.g., AWS, Heroku, or Vercel)

Installation

Prerequisites

Node.js and npm installed.

MongoDB database setup.

Code editor (e.g., Visual Studio Code).

Steps

Clone the repository:

git clone https://github.com/your-username/job-portal.git

Navigate to the project folder:

cd job-portal

Install backend dependencies:

npm install

Navigate to the frontend folder and install dependencies:

cd client
npm install

Start the development server:

cd ..
npm run dev

Open your browser and navigate to http://localhost:3000.

Usage

For Job Seekers:

Register or log in.

Search for jobs using filters.

Apply for suitable jobs.

For Companies:

Register or log in.

Post new job openings.

Manage job listings from the dashboard.

Known Issues

Deployment Inconsistencies:

Some pages are not loading correctly on the deployed version.

Company logos uploaded via the platform are not always visible.

Image and static file paths may be misconfigured.

Temporary Workarounds:

Verify that all environment variables are correctly set up on the deployment platform.

Check for CORS issues that may prevent API requests from functioning as expected.

Debug static file handling for images and other resources on the server.
