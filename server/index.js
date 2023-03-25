const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());

mongoose.connect('mongodb://root:example@mongodb:27017/admin', {
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

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback to index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
