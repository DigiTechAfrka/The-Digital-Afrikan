# The Digital Afrikan

The Digital Afrikan is a South African digital media, publishing, and creative technology company focused on telling African stories through digital innovation, strategic communication, and publishing systems.

This repository contains the company’s marketing website and digital presence, designed to showcase its services, projects, team, and contact channels across a multi-page static web experience.

## Overview

The Digital Afrikan helps organisations, publishers, educational groups, and brands build meaningful digital experiences. The business blends:

- Digital transformation and workflow optimisation
- Website design and development
- Publishing and content strategy
- Marketing and audience growth
- Media production including audio and video content
- Creative technology and product storytelling

The brand is positioned around African-centred storytelling, modern digital systems, and scalable audience engagement.

## Mission

To amplify African stories through smart digital systems, strategic storytelling, and publishing frameworks that make information more visible, valuable, and accessible.

## Vision

To become a trusted digital partner for African institutions, publishers, educators, startups, and brands that want to communicate effectively in the digital age.

## Business Focus Areas

### 1. Digital Transformation
The business helps teams improve operations by modernising workflows, streamlining internal systems, and improving communication and reporting processes.

### 2. Publishing and Media
The Digital Afrikan supports editorial strategy, digital publishing, content management, audience development, and platform-based storytelling for brands and publishers.

### 3. Website and Product Design
The company creates modern websites and digital interfaces designed for responsiveness, usability, and conversion.

### 4. Marketing and Audience Growth
Marketing strategy, campaign development, content marketing, and performance optimisation are integrated into the organisation’s digital service offering.

### 5. Audio and Video Production
The company also produces media content for digital platforms, enabling brands to communicate more effectively through storytelling and multimedia.

## Website Purpose

This project is a front-end website that serves as the digital identity of The Digital Afrikan. It includes:

- A landing page with hero messaging and service overview
- About and team sections
- Service detail pages and modals
- Project showcase sections
- Product and contact pages
- Responsive design for mobile and desktop layouts
- Interactive navigation and animated reveal effects

## Tech Stack

This project is built as a static website using core front-end technologies.

### Front-end
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Styling and UI
- Custom CSS architecture in css/style.css
- Responsive styling in css/responsive.css
- Google Fonts for typography
- Font Awesome for icons

### Media and Assets
- Local image assets in the images folder
- Background video support using HTML5 video element
- External brand and partner imagery references

### Interactivity
- JavaScript-powered mobile navigation
- Dropdown menus
- Scroll reveal animations
- Form validation and submission handling
- Modal windows for service and team content

### External Services / Integrations
- Google Fonts
- Font Awesome CDN
- Formspree-style contact form action pattern for email submissions
- External partner and client links

## Project Structure

```text
The-Digital-Afrikan/
├── about.html
├── contact.html
├── index.html
├── main.js
├── partners.html
├── products.html
├── projects.html
├── services.html
├── team.html
├── css/
│   ├── style.css
│   └── responsive.css
├── images/
│   └── ...brand assets, logos, project images, media files
├── README.md
└── .gitignore (if present in the project)
```

## Key Features

- Fully responsive multi-page website
- Modern editorial-style visual identity
- Section-based navigation and smooth scrolling
- Service modal presentations for detailed offerings
- Team member spotlight modals
- Contact form validation with user feedback states
- Brand storytelling centring African digital culture and innovation

## Local Development

Because this is a static front-end project, there is no complex build process required.

### Option 1: Open directly
Open the index.html file in your browser.

### Option 2: Run a local server
From the project root, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

The site can be deployed on any static hosting service such as:

- GitHub Pages
- Netlify
- Vercel
- traditional web hosting providers with static file support

## Form Handling

The contact form is prepared for Formspree or a similar endpoint-based email service. The form logic in main.js checks whether a valid action URL is configured and displays a friendly status message if none is connected yet.

## Accessibility Notes

The project includes several accessibility considerations:

- Skip link for keyboard users
- Semantic HTML structure
- Alt text for informative images
- Aria labels for navigation and interactive controls
- Mobile-friendly navigation patterns
- Form validation feedback

## Design Direction

The website uses a premium, editorial look with:

- strong typography contrast
- high-impact headings
- content-rich landing sections
- warm and modern African-inspired palette
- spacious layout and card-based service blocks

## Maintenance Recommendations

- Keep content updated as services and projects evolve
- Replace placeholder form endpoints with live submission links
- Refresh partner logos and media assets on a regular schedule
- Review responsiveness after adding new sections or content
- Continuously optimise SEO metadata and image alt text

## Contributors

This project is a front-end representation of The Digital Afrikan’s digital presence and can be extended by web designers, developers, marketers, and content teams working on the brand.

## Contact

Website: The Digital Afrikan

Email: Use the contact form on the website or the project’s configured business contact details.

Location: Johannesburg, South Africa

## Summary

The Digital Afrikan website is a polished static marketing platform built with HTML, CSS, and JavaScript. It presents the company as a digital publishing, communications, and transformation partner rooted in African storytelling and innovation.

