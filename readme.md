## GraphQl with MySql database

Demo how to use GraphQl , node and a MySql database

### Prerequisites

* Node installed
* MySql database server running

### Usage

Run:

* npm install
* npm run start

The database is automatically droped and initialized with faker data each time the server restarts. 

Point browser to [http://localhost:3000/graphql](http://localhost:3000/graphql)

### Example Queries

Get posts and related person

```
{
  posts {
    id
    person {
      firstName
    }
  }
}

```

Get persons and related posts

```
{
  people {
    id
    posts {
      title
    }
  }
}

```

Create a person

```
mutation addPerson {
  addPerson(firstName: "John", lastName: "Doe", email: "test@example.com") {
    id
  }
}
```
