```

resources accessible from UI
    users
        single record
        registration view
        new record
    todos
        all records that...
            logged in user owns
            is marked as completed
            is not marked as completed
        new record
    sessions
        login view
        authentication
        
models
    user
        id: INTEGER
        email: STRING
        password: STRING
        CREATED_AT: YYYY-MM-DD HH:MM:SS....
        UPDATED_AT: YYYY-MM-DD HH:MM:SS....
    todo
        id: INTEGER
        title: STRING
        user_id:
            INTEGER
            FK references user.id
        CREATED_AT: YYYY-MM-DD HH:MM:SS....
        UPDATED_AT: YYYY-MM-DD HH:MM:SS....
    sessions
        secret: STRING
        name: STRING
        saveUninitialized: BOOLEAN
        resave: BOOLEAN
        ...
        
operations on resources and URIs
    users
        HTTP
            GET     /api/v0/users/:id
                returns a single user that has an id of :id
            GET     /api/v0/users/new
                returns view that has an signup form
            POST    /api/v0/users
                creates new user with credentials entered in form
            PUT     /api/v0/users/:id
                updates specified user with credentials entered in form
            DELETE  /api/v0/users/:id
                destroys specified user
    todos
        HTTP
            GET     /api/v0/todos
                returns all todos that the requester owns
            GET     /api/v0/todos/completed
                returns all completed todos
            GET     /api/v0/todos/incomplete
                returns all incomplete todos
            POST    /api/v0/todos
                creates new todo with title entered in form
            PUT     /api/v0/todos/:id
                updates specified todo with title entered in form
            DELETE  /api/v0/todos/:id
                destroys specified todo
    sessions
        HTTP
            GET     /api/v0/sessions/new
                returns login view
            POST    /api/v0/sessions
                authenticates credentials entered in form against database record
            DELETE  /api/v0/sessions/:id
                destroys specified session and redirects requester to /
      
```
