import csv
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

if not API_KEY:
    raise ValueError(
        "API key not found. Please add GOOGLE_MAPS_API_KEY to your .env file."
    )

INPUT_FOLDER = Path("data")
OUTPUT_FOLDER = Path("data2")
OUTPUT_FOLDER.mkdir(exist_ok=True)


def fetch_coordinates(title: str, url: str) -> dict:
    """
    Query the Google Geocoding API with a title or URL to get location data.
    """
    try:
        if url:
            # Use Place ID if URL is provided
            place_id = extract_place_id(url)
            if place_id:
                params = {"fields": "addressComponents", "key": API_KEY}
                api_url = f"https://places.googleapis.com/v1/places/{place_id}"
            else:
                # Fall back to querying by title if no place_id in URL
                params = {"address": title, "key": API_KEY}
                api_url = "https://maps.googleapis.com/maps/api/geocode/json"
        else:
            # Query using the title
            params = {"address": title, "key": API_KEY}
            api_url = "https://maps.googleapis.com/maps/api/geocode/json"

        response = requests.get(api_url, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching data for '{title}': {e}")
        return None


def extract_place_id(url: str) -> str:
    """
    Extract Place ID from a Google Maps URL.
    """
    if "1s" in url:
        parts = url.split("1s")
        return parts[1].split(":")[0] if len(parts) > 1 else None
    return None


def validate_response(response: dict, title: str) -> bool:
    """
    Validate the API response to ensure it matches the expected location.
    """
    print(response)
    if not response or response.get("status") != "OK":
        return False

    results = response.get("results", [])
    if not results:
        return False

    # Check if the returned formatted address aligns with the title
    formatted_address = results[0].get("formatted_address", "").lower()
    return title.lower() in formatted_address


def process_csv(file_path: Path):
    """
    Process a single CSV file to enrich data with location info.
    """
    output_file = OUTPUT_FOLDER / file_path.name

    with open(file_path, "r") as in_file, open(output_file, "w", newline="") as outfile:
        reader = csv.DictReader(in_file)
        fieldnames = reader.fieldnames + [
            "Latitude",
            "Longitude",
            "Formatted Address",
            "Place ID",
        ]
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)

        writer.writeheader()
        for row in reader:
            title = row.get("Title", "")
            url = row.get("URL", "")

            # Query the API
            response = fetch_coordinates(title, url)

            if validate_response(response, title):
                result = response["results"][0]
                location = result["geometry"]["location"]
                row["Latitude"] = location.get("lat")
                row["Longitude"] = location.get("lng")
                row["Formatted Address"] = result.get("formatted_address")
                row["Place ID"] = result.get("place_id")
            else:
                print(f"Skipping '{title}' due to invalid or generic response.")
                row["Latitude"] = None
                row["Longitude"] = None
                row["Formatted Address"] = None
                row["Place ID"] = None

            writer.writerow(row)


def process_all_csv_files():
    """
    Process all CSV files in the input folder.
    """
    for file_name in os.listdir(INPUT_FOLDER):
        if file_name.endswith(".csv"):
            file_path = INPUT_FOLDER / file_name
            print(f"Processing: {file_path}")
            process_csv(file_path)


if __name__ == "__main__":
    process_all_csv_files()
