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

const outputFile = './week1/routes/swagger.json';
const endpointsFiles = ['./week1/routes/index.js'];

swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger JSON generated');
});


