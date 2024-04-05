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