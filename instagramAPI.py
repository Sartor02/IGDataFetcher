import os
from flask import Flask, request
import requests
from flask_sslify import SSLify
import json

app = Flask(__name__)
sslify = SSLify(app)

# Get the current directory
current_directory = os.path.dirname(os.path.realpath(__file__))
cert_file = os.path.join(current_directory, 'cert.pem')
# Using a key file without a passphrase
key_file = os.path.join(current_directory, 'key_no_passphrase.pem')

# Instagram API credentials and URLs: use your own client_id and client_secret
client_id = "{your_client_id}"
client_secret = "{your_client_secret}"
redirect_uri = "https://127.0.0.1:5000/callback"
# URL for authorizing the app
auth_url = f"https://api.instagram.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=user_profile,user_media&response_type=code"

print("Open the following URL in your browser to authorize the application:")
print(auth_url)

@app.route('/callback')
def callback():
    # Get the code from the request
    code = request.args.get('code')

    # Use the code to get the access token
    access_token_url = "https://api.instagram.com/oauth/access_token"
    response = requests.post(access_token_url, data={
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': code
    })

    # Get the access token from the response
    access_token = json.loads(response.text)['access_token']

    # Get the media IDs of your IG posts
    get_all_media_url = f'https://graph.instagram.com/me/media?fields=id,caption&access_token={access_token}'
    media_response = requests.get(get_all_media_url)

    # Get only the 'id' fields from the JSON response
    media_ids = [item['id'] for item in media_response.json()['data']]

    # Create a dictionary to store the responses for each media ID
    media_info_dict = {}

    # Run the request for each media ID and save the response in the dictionary
    for media_id in media_ids:
        # Fields to get: id, media_type, media_url, username, timestamp, caption, permalink, thumbnail_url
        # You can check the available fields at https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
        get_media_url = f'https://graph.instagram.com/{media_id}?fields=id,media_type,media_url,username,timestamp,caption,permalink,thumbnail_url&access_token={access_token}'
        media_info_response = requests.get(get_media_url)
        media_info_dict[media_id] = media_info_response.json()

    # Write the dictionary to a JSON file
    with open("media_info.json", "w") as json_file:
        json.dump(media_info_dict, json_file)
    
    return "Authorization successful. You can close this window."

if __name__ == '__main__':
    # Execute the app with the cert.pem and key.pem files from the current directory
    app.run(debug=True, ssl_context=(cert_file, key_file))
