const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sample data (for demonstration purposes)
let items = [
  { id: 1, text: 'Buy groceries' },
  { id: 2, text: 'Write API documentation' },
];

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Get an item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items[itemIndex] = updatedItem;
  res.json(updatedItem);
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items.splice(itemIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
