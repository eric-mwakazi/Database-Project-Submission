const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
// Add your taskRoutes if any: const taskRoutes = require('./routes/tasks');
app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// Swagger Config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'CRUD API with Authentication and Sequelize',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to route files with Swagger docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
