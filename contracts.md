# API Contracts - Cloud DevOps Portfolio

## Contact Form Integration

### Frontend Mock Data (to be removed)
Location: `/app/frontend/src/mock.js`
- No mock data for contact form - will be real backend integration

### Backend Implementation

#### Endpoint: POST /api/contact
**Purpose**: Handle contact form submissions

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received successfully",
  "id": "contact_message_id"
}
```

#### MongoDB Collection: `contact_messages`
**Schema:**
```javascript
{
  id: String (UUID),
  name: String,
  email: String,
  subject: String,
  message: String,
  timestamp: DateTime,
  status: String (default: "new")
}
```

### Frontend Integration
Location: `/app/frontend/src/components/Contact.jsx`

**Changes needed:**
1. Remove toast-only submission
2. Add axios POST call to `${BACKEND_URL}/api/contact`
3. Handle loading state
4. Handle success/error responses
5. Clear form on success

**API Call:**
```javascript
const response = await axios.post(`${BACKEND_URL}/api/contact`, {
  name: formData.name,
  email: formData.email,
  subject: formData.subject,
  message: formData.message
});
```

### Error Handling
- Network errors
- Validation errors
- Server errors
- Display user-friendly messages in terminal style
