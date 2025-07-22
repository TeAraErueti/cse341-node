import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenInstance = swaggerAutogen();

const doc = {
  info: {
    title: 'Users API',
    description: 'Users API Documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './project2/swagger.json';
const endpointsFiles = ['./project2/routes/index.js'];

swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger JSON generated');
});
