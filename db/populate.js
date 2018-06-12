const users = db.getCollection('users');
users.insertMany([
  {
    "name": "Alex",
    "surname": "Smith",
    "email": "alex@mail.ru",
    "password": "alex"
  },
  {
    "name": "Anna",
    "surname": "Smith",
    "email": "smith@mail.ru",
    "password": "anna"
  },
  {
    "name": "John",
    "surname": "Doe",
    "email": "doe@mail.ru",
    "password": "john"
  }
]);
