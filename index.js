const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://root:example@mongodb:27017/petlibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
