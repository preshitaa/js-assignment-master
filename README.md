# Performance Improvements and News API Implementation

This project includes modifications to enhance the performance of specific endpoints and to implement support for creating and retrieving news related to matches and tours.

## Changes Implemented

### Performance Improvements

#### 1. Indexes for Improved Latency

- **Problem**: The endpoint `/tour/matches` had latency that increased linearly with the number of tours.
- **Solution**: Created database indexes to optimize query performance and reduce latency for retrieving matches for a given tour name.

### Enhanced Endpoints

#### 2. Enhanced `/sport/tour/match` Endpoint

- **Problem**: The existing endpoint did not return detailed match information.
- **Solution**: Modified the endpoint to also return the match's ID, startTime, and format, providing more comprehensive details about each match.

### News API Implementation

#### Functional Requirements

1. **News Creation**: News can be created for a match or a tour.
2. **Inheritance**: Each news item created for a match also belongs to the corresponding tour. Each news item created for a tour also belongs to the corresponding sport.

#### Technical Requirements

1. **Create News Endpoint**:
   - **Endpoint**: `POST /news`
   - **Description**: Creates news for a match or a tour.
2. **Fetch News by Match ID**:
   - **Endpoint**: `GET /news/match/:matchId`
   - **Description**: Fetches news associated with a specific match ID.
3. **Fetch News by Tour ID**:
   - **Endpoint**: `GET /news/tour/:tourId`
   - **Description**: Fetches news associated with a specific tour ID.
4. **Fetch News by Sport ID**:
   - **Endpoint**: `GET /news/sport/:sportId`
   - **Description**: Fetches news associated with a specific sport ID.

### Summary of Changes

1. **Database**:
   - Added indexes to improve query performance for the `/tour/matches` endpoint. The changes are done in the base.sql file. 

2. **Endpoints**:
   - Enhanced the `/sport/tour/match` endpoint to return additional match details (ID, startTime, format). The changes are done in sport.js controller.
   - Implemented new endpoints for creating and fetching news related to matches, tours, and sports as mentioned above.

3. **Middleware**:
   - Added `body-parser` middleware to handle JSON and URL-encoded request bodies.

4. **Controller/Model**:
   - Created a controller and model to handle the creation and retrieval of news items.

## Testing

- Added test cases using `supertest` to verify the functionality of the new endpoints.
- Test cases include both success and failure scenarios to ensure robustness.

## Running the Application

1. **Start the server**: Ensure that the application is running and listening on the appropriate port.
2. **Run tests**: Execute the test suite to verify the implemented changes using command npm test.

## Conclusion

These changes enhance the performance of critical endpoints and add comprehensive support for managing and retrieving news items related to sports, matches, and tours.
