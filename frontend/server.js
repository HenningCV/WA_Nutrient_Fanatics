const express = require('express');
const app = express();

app.use(express.static('build'));
app.get('*', (req, res) => res.sendFile('/usr/src/app/build/index.html'));

const port = process.env.PORT || 20071;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});