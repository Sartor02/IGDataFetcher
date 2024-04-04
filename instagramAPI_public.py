import requests
import json

if __name__ == '__main__':
    print("Getting media information...")
    # Get the public user token
    access_token = "{public_user_token}"

    get_all_media_url = f'https://graph.instagram.com/me/media?fields=id,caption&access_token={access_token}'
    media_response = requests.get(get_all_media_url)

    # Extract only the 'id' fields from the JSON response
    media_ids = [item['id'] for item in media_response.json()['data']]

    # Create a dictionary to store the responses for each media ID
    media_info_dict = {}

    # Execute the request for each media ID and save the response in the dictionary
    for media_id in media_ids:
        get_media_url = f'https://graph.instagram.com/{media_id}?fields=id,media_type,media_url,username,timestamp,caption,permalink,thumbnail_url&access_token={access_token}'
        media_info_response = requests.get(get_media_url)
        media_info_dict[media_id] = media_info_response.json()

    # Write the dictionary to the JSON file
    with open("media_info.json", "w") as json_file:
        json.dump(media_info_dict, json_file)

    print("Media information saved to media_info.json")
