import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenInstance = swaggerAutogen();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'Users API',
    description: 'Users API Documentation',
  },
  host: isProduction ? 'project2-gdst.onrender.com' : 'localhost:3000',
  schemes: [isProduction ? 'https' : 'http'],
};

const outputFile = './project2/swagger.json';
const endpointsFiles = ['./project2/routes/index.js']; // Adjust if your route files differ

swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger JSON generated');
});

