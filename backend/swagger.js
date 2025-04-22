const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

// Helper function to recursively find all controller files in the backend API folders
const getFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir); // Read directory contents
  list.forEach((file) => {
    file = path.join(dir, file); // Get the full file path
    const stat = fs.statSync(file); // Get file stats
    if (stat && stat.isDirectory()) {
      // Recurse into subdirectories (API folders like registerUser, loginUser)
      results = results.concat(getFiles(file));
    } else if (file.endsWith(".controller.js")) {
      // Add controller file if it ends with `.controller.js`
      results.push(file);
    }
  });
  return results;
};

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SlideMe API",
      version: "1.0.0",
      description: "API documentation for the SlideMe app",
    },
  },
  apis: getFiles(path.join(__dirname)), // Look for controller files directly inside backend folder
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
