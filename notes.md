## What is Axios?

Axios is a popular JavaScript library that allows you to make HTTP requests from a browser or Node.js. It provides an easy-to-use API for handling asynchronous HTTP requests and responses.

## Why to use axios over fetch?

Axios is often preferred over the built-in `fetch` function for several reasons:

1. **Simpler syntax**: Axios provides a more intuitive and easier-to-use API compared to `fetch`. It offers a straightforward way to make HTTP requests and handle responses with its methods like `get`, `post`, `put`, and `delete`.

2. **Browser and Node.js support**: Axios works seamlessly in both browser and Node.js environments, while `fetch` is primarily designed for browser-based applications. This makes Axios a versatile choice for projects that require server-side rendering or use cases where code is shared between the client and server.

3. **Error handling**: Axios has built-in error handling capabilities, allowing you to easily catch and handle errors that occur during HTTP requests. In contrast, `fetch` only rejects the promise on network errors, requiring additional code to handle other types of errors.

4. **Interceptors**: Axios provides interceptors, which allow you to intercept and modify HTTP requests and responses globally or on a per-request basis. This feature is useful for adding authentication headers, logging, or transforming data before it is sent or received.

5. **Browser compatibility**: Axios has better browser compatibility compared to `fetch`. It automatically handles browser-specific inconsistencies and provides a consistent API across different browsers.

Overall, while both Axios and `fetch` can be used to make HTTP requests, Axios offers a more feature-rich and developer-friendly experience, making it a popular choice for handling asynchronous HTTP requests in JavaScript applications.

### Example

Here's a simple example of how to use Axios to make a GET request to an API: 

``` javascript
import axios from 'axios';

axios.get('https://api.example.com/data')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
```

``` javascript
import axios from 'axios';

axios({
    method: 'post',
    url: 'https://api.example.com/data',
    data: {
        name: 'John Doe',
        age: 25
    },
    params: {
        page: 1,
        limit: 10
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here'
    },
    timeout: 5000,
    responseType: 'json'
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
```

## Axios Interceptor

Axios interceptors are functions that Axios allows you to define globally, which will be called for every request or response made by Axios. This is useful for tasks such as adding headers to requests, handling authentication, logging, and more.

Here's a basic example of how you can use Axios interceptors:

```javascript
const axios = require('axios');

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('Request Interceptor:', config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('Response Interceptor:', response);
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

// Make a request
axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(function (response) {
        console.log('Response:', response.data);
    })
    .catch(function (error) {
        console.error('Error:', error);
    });
```

In this example:

- `axios.interceptors.request.use()` adds a function to be called before each request is sent. This function receives the request configuration object and must return either the configuration object or a Promise that resolves to the configuration object.
- `axios.interceptors.response.use()` adds a function to be called when a response is received. This function receives the response object and must return either the response object or a Promise that resolves to the response object.

With interceptors, you can modify requests and responses globally for your Axios instance, making them very useful for handling common tasks consistently across your application.