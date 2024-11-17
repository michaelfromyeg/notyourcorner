# notyourcorner

My version of corner, which I think is cool, but is not on Android. You should check them out, because this project will almost-certainly-never become notable.

## About

I like using Google Maps, but the "list" experience sucks, and it lacks social features. Corner sort-of solves this, but focuses too much on vibes and not enough on just shipping a great core experience. Here's my ideal feature list...

1. One-way sync from Google Maps
    - Google Maps will always be my primary driver, but I'd love for locations I pin to get pulled to this app
    - Then, this app takes care of the extra metadata, social features, and sharing
    - I don't need to sync back to Google Maps, and that would be hard to do, anyway
2. I want to track interesting stuff about the location
    - Location type: coffee shop, bar, co-working spot, tourist-y spot / sightseeing, nature-y stuff, food
    - Who recommended it to me
3. I want to be able to make sense of my pins
    - I want to be able to filter pins by type (...with other pins getting greyed out), and merge lists (i.e., friends A, B, and C recommend spots in location X; I can easily overlay them and it tries to handle duplicates)
4. I want the app to be smart
    - I want a really good search feature
    - I want to understand hierarchical lists (my list for SF is a superset of my list of Haight-Ashbury)

Writing this down makes me realize how stupidly ambitious it is, so I'm going to reduce scope in the following ways.

- I'm only going to build it for myself initially; no authentication, no login -- just my places, my lists, and links for me to send
    - If people like it, then I'll make it social
- The UI will look pretty bad

## Usage

The repository consists of a client (React, TypeScript), and server. I'm using `nvm use --lts` and Python 3.12 for versions. Do setup the usual way.

If I need storage, I'm thinking MongoDB or simiar. Something easy to setup, and cheap enough. 

