### Create Contact
Creates a new contact representing a person for whom the pledge is being tracked.

#### Request
- **Method:** POST
- **Endpoint:** `/contact`
- **Headers:** 
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "reference": "603",
    "firstName": "Mdaga",
    "lastName": "Athumani",
    "phone": "255765783399"
  }
  ```
  - `reference` (optional): A reference number associated with the contact.
  - `firstName`: First name of the contact (required).
  - `lastName`: Last name of the contact (required).
  - `phone`: Phone number of the contact (required).

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "HhDduBGhR2B0",
    "reference": "603",
    "firstName": "Mdaga",
    "lastName": "Athumani",
    "phone": "255765783399",
    "createdAt": "2024-04-03T18:10:11.000Z",
    "updatedAt": "2024-04-03T18:10:11.000Z"
  }
  ```
  - `id`: Unique identifier for the created contact.
  - `reference`: The reference number associated with the contact.
  - `firstName`: First name of the contact.
  - `lastName`: Last name of the contact.
  - `phone`: Phone number of the contact.
  - `createdAt`: Timestamp indicating when the contact was created.
  - `updatedAt`: Timestamp indicating when the contact was last updated.

#### Notes
- The `reference` field can be set to null.
- All fields except `reference` are required.

### Update Contact
Updates an existing contact with the specified ID.

#### Request
- **Method:** PATCH
- **Endpoint:** `/contact/:id` (where `:id` is the unique identifier of the contact)
- **Headers:** 
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "reference": null,
    "firstName": "Mdaga",
    "lastName": "Kirimbo",
    "phone": "255765783377"
  }
  ```
  - `reference`: A reference number associated with the contact. Can be set to null.
  - `firstName`: Updated first name of the contact.
  - `lastName`: Updated last name of the contact.
  - `phone`: Updated phone number of the contact.
  
  **Note:** The payload should contain at least one field (cannot be an empty object).

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "HhDduBGhR2B0",
    "reference": null,
    "firstName": "Mdaga",
    "lastName": "Kirimbo",
    "phone": "255765783377",
    "createdAt": "2024-04-03T18:10:11.000Z",
    "updatedAt": "2024-04-05T10:15:00.000Z"
  }
  ```
  - `id`: Unique identifier for the updated contact.
  - `reference`: The reference number associated with the contact.
  - `firstName`: First name of the contact.
  - `lastName`: Last name of the contact.
  - `phone`: Phone number of the contact.
  - `createdAt`: Timestamp indicating when the contact was created.
  - `updatedAt`: Timestamp indicating when the contact was last updated.

#### Notes
- The payload should contain at least one field (cannot be an empty object).
- The `reference` field is nullable.

### Retrieve Contact Details
Retrieves details of a contact by the specified ID.

#### Request
- **Method:** GET
- **Endpoint:** `/contact/:id` (where `:id` is the unique identifier of the contact)

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "HhDduBGhR2B0",
    "reference": null,
    "firstName": "Mdaga",
    "lastName": "Kirimbo",
    "phone": "255765783377",
    "createdAt": "2024-04-03T18:10:11.000Z",
    "updatedAt": "2024-04-05T10:15:00.000Z"
  }
  ```
  - `id`: Unique identifier for the contact.
  - `reference`: The reference number associated with the contact.
  - `firstName`: First name of the contact.
  - `lastName`: Last name of the contact.
  - `phone`: Phone number of the contact.
  - `createdAt`: Timestamp indicating when the contact was created.
  - `updatedAt`: Timestamp indicating when the contact was last updated.

#### Notes
- This endpoint returns a contact object.
- It retrieves details of a contact by the specified ID.

### List All Contacts
Retrieves a list of all contacts.

#### Request
- **Method:** GET
- **Endpoint:** `/contact`

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  [
    {
      "id": "HhDduBGhR2B0",
      "reference": null,
      "firstName": "Mdaga",
      "lastName": "Kirimbo",
      "phone": "255765783377",
      "createdAt": "2024-04-03T18:10:11.000Z",
      "updatedAt": "2024-04-05T10:15:00.000Z"
    },
    {
      "id": "HhDduBGhR2B1",
      "reference": "604",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "1234567890",
      "createdAt": "2024-04-03T18:20:30.000Z",
      "updatedAt": "2024-04-04T14:25:45.000Z"
    },
    ...
  ]
  ```
  - `id`: Unique identifier for the contact.
  - `reference`: The reference number associated with the contact.
  - `firstName`: First name of the contact.
  - `lastName`: Last name of the contact.
  - `phone`: Phone number of the contact.
  - `createdAt`: Timestamp indicating when the contact was created.
  - `updatedAt`: Timestamp indicating when the contact was last updated.

#### Notes
- This endpoint returns an array of contact objects.
- It lists all contacts stored in the system.

### Create Campaign
Creates a new campaign.

#### Request
- **Method:** POST
- **Endpoint:** `/campaign`
- **Headers:** 
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "Ujenzi wa Kanisa - Mbwiji",
    "startDate": "2023-12-09",
    "endDate": "2024-12-08",
    "description": "Ujenzi wa kanisa Mbwiji Mtoni"
  }
  ```
  - `name`: Name of the campaign.
  - `startDate` (optional): Start date of the campaign.
  - `endDate` (optional): End date of the campaign.
  - `description` (optional): Description of the campaign.

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "a3rDge3wLSTh",
    "name": "Ujenzi wa Kanisa - Mbwiji",
    "startDate": "2023-12-08T21:00:00.000Z",
    "endDate": "2024-12-07T21:00:00.000Z",
    "description": "Ujenzi wa kanisa Mbwiji Mtoni",
    "createdAt": "2024-04-06T12:52:04.000Z",
    "updatedAt": "2024-04-06T12:54:54.000Z"
  }
  ```
  - `id`: Unique identifier for the created campaign.
  - `name`: Name of the campaign.
  - `startDate`: Start date of the campaign.
  - `endDate`: End date of the campaign.
  - `description`: Description of the campaign.
  - `createdAt`: Timestamp indicating when the campaign was created.
  - `updatedAt`: Timestamp indicating when the campaign was last updated.

#### Notes
- `startDate`, `endDate`, and `description` are all nullable (optional).

### Update Campaign
Updates an existing campaign with the specified ID.

#### Request
- **Method:** PATCH
- **Endpoint:** `/campaign/:id` (where `:id` is the unique identifier of the campaign)
- **Headers:** 
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "Updated Campaign Name",
    "startDate": "2023-12-10",
    "endDate": "2024-12-09",
    "description": "Updated description for the campaign"
  }
  ```
  - `name` (optional): Updated name of the campaign.
  - `startDate` (optional): Updated start date of the campaign.
  - `endDate` (optional): Updated end date of the campaign.
  - `description` (optional): Updated description of the campaign.

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "a3rDge3wLSTh",
    "name": "Updated Campaign Name",
    "startDate": "2023-12-10T21:00:00.000Z",
    "endDate": "2024-12-09T21:00:00.000Z",
    "description": "Updated description for the campaign",
    "createdAt": "2024-04-06T12:52:04.000Z",
    "updatedAt": "2024-04-06T13:00:00.000Z"
  }
  ```
  - `id`: Unique identifier for the updated campaign.
  - `name`: Updated name of the campaign.
  - `startDate`: Updated start date of the campaign.
  - `endDate`: Updated end date of the campaign.
  - `description`: Updated description of the campaign.
  - `createdAt`: Timestamp indicating when the campaign was created.
  - `updatedAt`: Timestamp indicating when the campaign was last updated.

#### Notes
- Only the fields that should be updated are specified in the request body.
- `name`, `startDate`, `endDate`, and `description` are all nullable.

### Retrieve Campaign Details
Retrieves details of a campaign by the specified ID.

#### Request
- **Method:** GET
- **Endpoint:** `/campaign/:id` (where `:id` is the unique identifier of the campaign)

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "a3rDge3wLSTh",
    "name": "Ujenzi wa Kanisa - Mbwiji",
    "startDate": "2023-12-08T21:00:00.000Z",
    "endDate": "2024-12-07T21:00:00.000Z",
    "description": "Ujenzi wa kanisa Mbwiji Mtoni",
    "createdAt": "2024-04-06T12:52:04.000Z",
    "updatedAt": "2024-04-06T12:54:54.000Z"
  }
  ```
  - `id`: Unique identifier for the campaign.
  - `name`: Name of the campaign.
  - `startDate`: Start date of the campaign.
  - `endDate`: End date of the campaign.
  - `description`: Description of the campaign.
  - `createdAt`: Timestamp indicating when the campaign was created.
  - `updatedAt`: Timestamp indicating when the campaign was last updated.

#### Notes
- This endpoint retrieves details of a campaign by the specified ID.
- The response format is similar to the create endpoint.

### List All Campaigns
Retrieves a list of all campaigns.

#### Request
- **Method:** GET
- **Endpoint:** `/campaign`

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  [
    {
      "id": "a3rDge3wLSTh",
      "name": "Ujenzi wa Kanisa - Mbwiji",
      "startDate": "2023-12-08T21:00:00.000Z",
      "endDate": "2024-12-07T21:00:00.000Z",
      "description": "Ujenzi wa kanisa Mbwiji Mtoni",
      "createdAt": "2024-04-06T12:52:04.000Z",
      "updatedAt": "2024-04-06T12:54:54.000Z"
    },
    {
      "id": "xyz123",
      "name": "Another Campaign",
      "startDate": "2023-11-01T00:00:00.000Z",
      "endDate": "2024-01-01T00:00:00.000Z",
      "description": "Description of another campaign",
      "createdAt": "2024-04-01T08:00:00.000Z",
      "updatedAt": "2024-04-02T10:00:00.000Z"
    },
    ...
  ]
  ```
  - `id`: Unique identifier for the campaign.
  - `name`: Name of the campaign.
  - `startDate`: Start date of the campaign.
  - `endDate`: End date of the campaign.
  - `description`: Description of the campaign.
  - `createdAt`: Timestamp indicating when the campaign was created.
  - `updatedAt`: Timestamp indicating when the campaign was last updated.

#### Notes
- This endpoint returns an array of campaign objects.
- It lists all campaigns stored in the system.

### Create Pledge
Creates a new pledge.

#### Request
- **Method:** POST
- **Endpoint:** `/pledge`
- **Headers:** 
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "contactId": "dM9PPRY0lW3c",
    "campaignId": "a3rDge3wLSTh",
    "amount": 120000,
    "notes": null
  }
  ```
  - `contactId`: The ID of the contact associated with the pledge.
  - `campaignId`: The ID of the campaign associated with the pledge.
  - `amount`: The amount of the pledge.
  - `notes`: Additional notes or comments for the pledge.

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "CArMUpzZjbeW",
    "number": "1712509433074",
    "contactId": "dM9PPRY0lW3c",
    "campaignId": "a3rDge3wLSTh",
    "amount": 120000,
    "notes": null,
    "createdAt": "2024-04-07T17:03:53.000Z",
    "updatedAt": "2024-04-07T17:03:53.000Z",
    "contact": {
      "id": "dM9PPRY0lW3c",
      "reference": "400",
      "firstName": "Miriam",
      "lastName": "Ringo",
      "phone": "255789876687",
      "createdAt": "2024-04-07T17:03:44.000Z",
      "updatedAt": "2024-04-07T17:03:44.000Z"
    },
    "campaign": {
      "id": "a3rDge3wLSTh",
      "name": "Ujenzi wa Kanisa - Mbwiji",
      "startDate": "2023-12-08T21:00:00.000Z",
      "endDate": "2024-12-07T21:00:00.000Z",
      "description": "Ujenzi wa kanisa Mbwiji Mtoni",
      "createdAt": "2024-04-06T12:52:04.000Z",
      "updatedAt": "2024-04-06T12:54:54.000Z"
    }
  }
  ```
  - `id`: Unique identifier for the created pledge.
  - `number`: Unique identifier for the pledge (e.g., invoice number).
  - `contactId`: The ID of the contact associated with the pledge.
  - `campaignId`: The ID of the campaign associated with the pledge.
  - `amount`: The amount of the pledge.
  - `notes`: Additional notes or comments for the pledge.
  - `createdAt`: Timestamp indicating when the pledge was created.
  - `updatedAt`: Timestamp indicating when the pledge was last updated.
  - `contact`: Details of the associated contact.
  - `campaign`: Details of the associated campaign.

#### Notes
- The `notes` field is nullable.

### Update Pledge
Updates an existing pledge with the specified ID.

#### Request
- **Method:** PATCH
- **Endpoint:** `/pledge/:id` (where `:id` is the unique identifier of the pledge)
- **Headers:** 
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "amount": 145000,
    "notes": "Some comments"
  }
  ```
  - `amount`: Updated amount of the pledge.
  - `notes`: Updated additional notes or comments for the pledge. Nullable.

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "CArMUpzZjbeW",
    "number": "1712509433074",
    "contactId": "dM9PPRY0lW3c",
    "campaignId": "a3rDge3wLSTh",
    "amount": 145000,
    "notes": "Some comments",
    "createdAt": "2024-04-07T17:03:53.000Z",
    "updatedAt": "2024-04-07T17:15:00.000Z",
    "contact": {
      "id": "dM9PPRY0lW3c",
      "reference": "400",
      "firstName": "Miriam",
      "lastName": "Ringo",
      "phone": "255789876687",
      "createdAt": "2024-04-07T17:03:44.000Z",
      "updatedAt": "2024-04-07T17:03:44.000Z"
    },
    "campaign": {
      "id": "a3rDge3wLSTh",
      "name": "Ujenzi wa Kanisa - Mbwiji",
      "startDate": "2023-12-08T21:00:00.000Z",
      "endDate": "2024-12-07T21:00:00.000Z",
      "description": "Ujenzi wa kanisa Mbwiji Mtoni",
      "createdAt": "2024-04-06T12:52:04.000Z",
      "updatedAt": "2024-04-06T12:54:54.000Z"
    }
  }
  ```
  - `id`: Unique identifier for the updated pledge.
  - `number`: Unique identifier for the pledge (e.g., invoice number).
  - `contactId`: The ID of the contact associated with the pledge.
  - `campaignId`: The ID of the campaign associated with the pledge.
  - `amount`: Updated amount of the pledge.
  - `notes`: Updated additional notes or comments for the pledge.
  - `createdAt`: Timestamp indicating when the pledge was created.
  - `updatedAt`: Timestamp indicating when the pledge was last updated.
  - `contact`: Details of the associated contact.
  - `campaign`: Details of the associated campaign.

#### Notes
- At least one field should be specified in the request body.
- The `notes` field is nullable.

### Retrieve Pledge Details
Retrieves details of a pledge by the specified ID.

#### Request
- **Method:** GET
- **Endpoint:** `/pledge/:id` (where `:id` is the unique identifier of the pledge)

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "id": "CArMUpzZjbeW",
    "number": "1712509433074",
    "contactId": "dM9PPRY0lW3c",
    "campaignId": "a3rDge3wLSTh",
    "amount": 145000,
    "notes": "Some comments",
    "createdAt": "2024-04-07T17:03:53.000Z",
    "updatedAt": "2024-04-07T17:15:00.000Z",
    "contact": {
      "id": "dM9PPRY0lW3c",
      "reference": "400",
      "firstName": "Miriam",
      "lastName": "Ringo",
      "phone": "255789876687",
      "createdAt": "2024-04-07T17:03:44.000Z",
      "updatedAt": "2024-04-07T17:03:44.000Z"
    },
    "campaign": {
      "id": "a3rDge3wLSTh",
      "name": "Ujenzi wa Kanisa - Mbwiji",
      "startDate": "2023-12-08T21:00:00.000Z",
      "endDate": "2024-12-07T21:00:00.000Z",
      "description": "Ujenzi wa kanisa Mbwiji Mtoni",
      "createdAt": "2024-04-06T12:52:04.000Z",
      "updatedAt": "2024-04-06T12:54:54.000Z"
    }
  }
  ```
  - `id`: Unique identifier for the pledge.
  - `number`: Unique identifier for the pledge (e.g., invoice number).
  - `contactId`: The ID of the contact associated with the pledge.
  - `campaignId`: The ID of the campaign associated with the pledge.
  - `amount`: The amount of the pledge.
  - `notes`: Additional notes or comments for the pledge.
  - `createdAt`: Timestamp indicating when the pledge was created.
  - `updatedAt`: Timestamp indicating when the pledge was last updated.
  - `contact`: Details of the associated contact.
  - `campaign`: Details of the associated campaign.

#### Notes
- This endpoint retrieves details of a pledge by the specified ID.
- The response format is the same as in the create endpoint.

### List All Pledges
Retrieves a list of all pledges.

#### Request
- **Method:** GET
- **Endpoint:** `/pledge`

#### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  [
    {
      "id": "CArMUpzZjbeW",
      "number": "1712509433074",
      "contactId": "dM9PPRY0lW3c",
      "campaignId": "a3rDge3wLSTh",
      "amount": 145000,
      "notes": "Some comments",
      "createdAt": "2024-04-07T17:03:53.000Z",
      "updatedAt": "2024-04-07T17:15:00.000Z",
      "contact": {
        "id": "dM9PPRY0lW3c",
        "reference": "400",
        "firstName": "Miriam",
        "lastName": "Ringo",
        "phone": "255789876687",
        "createdAt": "2024-04-07T17:03:44.000Z",
        "updatedAt": "2024-04-07T17:03:44.000Z"
      },
      "campaign": {
        "id": "a3rDge3wLSTh",
        "name": "Ujenzi wa Kanisa - Mbwiji",
        "startDate": "2023-12-08T21:00:00.000Z",
        "endDate": "2024-12-07T21:00:00.000Z",
        "description": "Ujenzi wa kanisa Mbwiji Mtoni",
        "createdAt": "2024-04-06T12:52:04.000Z",
        "updatedAt": "2024-04-06T12:54:54.000Z"
      }
    },
    ...
  ]
  ```
  - `id`: Unique identifier for the pledge.
  - `number`: Unique identifier for the pledge (e.g., invoice number).
  - `contactId`: The ID of the contact associated with the pledge.
  - `campaignId`: The ID of the campaign associated with the pledge.
  - `amount`: The amount of the pledge.
  - `notes`: Additional notes or comments for the pledge.
  - `createdAt`: Timestamp indicating when the pledge was created.
  - `updatedAt`: Timestamp indicating when the pledge was last updated.
  - `contact`: Details of the associated contact.
  - `campaign`: Details of the associated campaign.

#### Notes
- This endpoint returns an array of pledge objects.
- It lists all pledges stored in the system.