// main.js - Test script for JSON Server
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
let authToken = null;

// Helper function to handle API requests
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      ...options.headers,
    };

    const config = {
      method: options.method || 'GET',
      headers,
      ...(options.body && { body: JSON.stringify(options.body) })
    };

    console.log(`\n=== ${config.method} ${url} ===`);
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
  }
}

// Test functions
async function testServer() {
  console.log('Starting server tests...\n');

  // 1. Test getting all users
  console.log('1. GET all users');
  await apiRequest('/users');

  // 2. Test getting a single user
  console.log('\n2. GET single user');
  await apiRequest('/users/1');

  // 3. Test user registration
  console.log('\n3. Register new user');
  const newUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword'
  };
  const registerResponse = await apiRequest('/auth/register', {
    method: 'POST',
    body: newUser
  });
  
  // Save the token for authenticated requests
  if (registerResponse && registerResponse.token) {
    authToken = registerResponse.token;
  }

  // 4. Test user login
  console.log('\n4. Login with new user');
  const loginResponse = await apiRequest('/auth/login', {
    method: 'POST',
    body: {
      email: 'test@example.com',
      password: 'testpassword'
    }
  });

  // Update token from login (might be different)
  if (loginResponse && loginResponse.token) {
    authToken = loginResponse.token;
  }

  // 5. Test protected profile route
  console.log('\n5. Get authenticated user profile');
  await apiRequest('/auth/profile');

  // 6. Test creating a new user (admin endpoint)
  console.log('\n6. Create new user via POST /users');
  const userToCreate = {
    name: 'API Created User',
    email: 'api@example.com'
  };
  await apiRequest('/users', {
    method: 'POST',
    body: userToCreate
  });

  // 7. Test updating a user
  console.log('\n7. Update a user');
  await apiRequest('/users/2', {
    method: 'PUT',
    body: {
      name: 'Updated Jane Smith',
      email: 'updated.jane@example.com'
    }
  });

  // 8. Test searching users
  console.log('\n8. Search users');
  await apiRequest('/search/users?q=john');

  // 9. Test getting posts
  console.log('\n9. Get all posts');
  await apiRequest('/posts');

  // 10. Test creating a post
  console.log('\n10. Create new post');
  const newPost = {
    title: 'Test Post',
    body: 'This is a test post created via API',
    userId: 1
  };
  const createdPost = await apiRequest('/posts', {
    method: 'POST',
    body: newPost
  });

  // 11. Test creating a comment
  if (createdPost && createdPost.id) {
    console.log('\n11. Create comment for post');
    const newComment = {
      body: 'This is a test comment',
      postId: createdPost.id,
      name: 'Commenter',
      email: 'commenter@example.com'
    };
    await apiRequest('/comments', {
      method: 'POST',
      body: newComment
    });
  }

  // 12. Test file upload (simulated)
  console.log('\n12. File upload test (simulated)');
  console.log('Actual file upload requires multipart/form-data which');
  console.log('is more complex to implement in this test script.');
  console.log('Use Postman or curl for actual file upload tests.');

  // 13. Test protected API route
  console.log('\n13. Test API key protected route');
  try {
    await apiRequest('/api/protected', {
      headers: { 'X-API-Key': 'invalid-key' }
    });
  } catch (e) {
    console.log('Expected error with invalid key:', e.message);
  }

  // 14. Test with valid API key
  console.log('\n14. Test with valid API key');
  await apiRequest('/api/protected', {
    headers: { 'X-API-Key': 'test-api-key-123' }
  });

  // 15. Test error endpoints
  console.log('\n15. Test error endpoints');
  await apiRequest('/error/404');
  await apiRequest('/error/500');

  console.log('\n=== Tests completed ===');
}

// Run the tests
testServer();