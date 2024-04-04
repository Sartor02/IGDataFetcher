# IGDataFetcher - Automating Instagram API Authorization and Data Retrieval
This document provides a guide on how to automate Instagram API authorization and data retrieval using Python. The provided code demonstrates how to obtain an access token, fetch media information, and save it to a JSON file. Additionally, instructions for generating SSL certificates and adding localhost to Valid OAuth Redirect URIs are included.

## Prerequisites
Before proceeding, ensure you have:

- Python installed on your system.
- OpenSSL installed for generating SSL certificates.
- An Instagram Developer account to obtain client ID and client secret.

## Code Explanation
The provided Python script performs the following tasks:

1. Imports necessary libraries and modules.
2. Defines the Flask application and sets up SSL encryption.
3. Generates the authorization URL and prompts the user to authorize the application.
4. Handles the callback route to obtain an access token.
5. Retrieves media information using the access token.
6. Saves the media information to a JSON file.

## SSL Certificate Generation
To generate SSL certificates for local development, follow these steps:

1. Open a terminal window.
2. Run the following command to create a certificate with a passphrase:
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```
3. Remove the passphrase from the key file using:
```bash
openssl rsa -in key.pem -out key_no_passphrase.pem
```

## Valid OAuth Redirect URIs Configuration
To add localhost as a Valid OAuth Redirect URI:

1. Log in to your Instagram Developer account.
2. Navigate to your app's settings.
3. Find the "Valid OAuth Redirect URIs" section.
4. Add https://127.0.0.1:5000/callback as a valid redirect URI.
5. Save the changes.

## Usage
1. Run the Python script after configuring SSL certificates and adding the redirect URI.
2. Open the provided authorization URL in your browser and authorize the application.
3. After authorization, the script will retrieve media information and save it to a JSON file named media_info.json.

<br/><br/>

# How to Use the JSON File in Your App
If you want to implement a social wall on your website using the JSON file generated from the Instagram API, you can use the code provided in the ChakraUI directory and follow these steps:

## 1. Integrate InstagramFeed Component 
Include the InstagramFeed component in your React application where you want to display the Instagram media. An example is provided in the InstagramUsage.tsx file.

## 2. Fetching Data from JSON File 
The InstagramFeed component reads data from the media_info.json file located in the same directory. Ensure that the JSON file is accessible to your React application.

## 3. Display Instagram Posts 
The InstagramFeed component renders Instagram images or videos fetched from the JSON file. It dynamically adjusts the number of images displayed based on the screen size.

## 4. Load More Functionality
If you have more Instagram posts than initially displayed, users can click the "Load More" button to load additional posts.

## 5. Display Modal on Click 
Clicking on an Instagram post opens a modal displaying the full-size image or video along with the post caption and options to view on Instagram.

## 6. Modal Component 
The InstagramClick component handles the modal functionality. It displays the media content and associated information when clicked.

<br/>

Ensure that you have the necessary CSS styles and dependencies installed for Chakra UI and motion animation libraries used in the components.

By following these steps and incorporating the provided React components, you can easily create a visually appealing social wall on your website using Instagram media fetched from the JSON file. Adjust the styling and functionality as needed to fit your website's design and requirements.