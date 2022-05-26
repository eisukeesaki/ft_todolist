## tasks

```

tasks
    OK: database
        OK: update database name to todolist
        OK: create todos seeder file
        OK: seed todos migration file
    routes
        write list of todos route handler function signatures
    OK: create user routes
        OK: GET     /api/v0/users/:id
            returns a single user that has an id of :id
    OK: update migration file
        users
            add id column
    OK: create seeder file
    OK: seed users table
    OK: test SELECT FROM users
        /db/index.js
    OK: using Node.js and Express.js, respond to HTTP GET / with 200
    OK: connect Node instance to PostgreSQL backend
        pg
            OK: quickly read docs
    OK: create database and tables
        create .sql
            OK: create database todos
            OK: creata table users

tasks-all
    create routes
        todos
            helper middleware
                get all owned by owner_id
            return all
            update by owner_id

```

## issues
```

issues_specific
    cannot qeury using pg.Client
        ./db/index.js
        refer to postgres logs
    when to shutdown pool?
        pool.end()

main issues
    data
        database
            create database `todolist`
            create table users 
            seed table users
            create table todos
            listen to incoming connections on a port
        sessions
            store
                ?where
                ?how
    web API
        implement request-response cycle
            listen to HTTP requests
                parse HTTP request payload
                route requests to appropriate route controllers
                    control routes
                        CRUD operations on resources
                            routes
                                /
                                    render login view
                                    render app view
                                    GET / HTTP/1.1
                                users
                                    create new record in table users
                                        use data in request payload
                                        redirect to /
                                        send error message
                                        POST /users HTTP/1.1
                                            INSERT INTO users (email, password)
                                session
                                    create new
                                        compare credentials in request payload against record in database
                                        create session
                                        send session id
                                        send error message
                                        POST /sessions
                                    destroy
                                        redirect to /
                                        DELETE /sessions HTTP/1.1
                                todos
                                    send all todos owned by owner_id
                                    update todo by id
                                        update value of completed field
                                            redirect to /
                                            POST /todos/:id HTTP/1.1
                                                relevant data in payload
                                        destroy
                                            redirect to /
                                            POST /todos/:id HTTP/1.1
                                                empty payload
                            data querying
                                PostgreSQL database
                                    connect node instance to PostgreSQL backend process
                                        read
                                        write
                        make HTTP responses
    UI
        functions
            show pages
                login
                    send credentials
                    receive session id
                    get redirected to app
                    show authentication failure message
                signup
                    send new credentials
                    send credentials
                    get redirected to app
                    show registration failure message
                app
                    show all todos
                        show todo
                            toggle completed
                    create todo
                    destroy session
                        get redirected to home

issues-optional
    automate database migration

```

## knowledge base
```

database
    transaction
        query
       
PostgreSQL
    logs
        /usr/local/var/log/postgres.log
    libpq
        API
        engine for other APIs
    datatypes
        SERIAL
            PostgreSQL-specific datatype
                create auto-incrementing column
                
Express.js
    middleware stack
        app._router.stack
    res.render()
        render view and sends rendered HTML string to client
        res.locals
            local variables for views
 
express-promise-router
    same API as express router
        except it allows use of async functions as route handlers

```

## resources
- [libpq - C API to PostgreSQL](https://www.postgresql.org/docs/9.5/libpq.html)
- [PostgreSQL SERIAL datatype](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL)
- [res.locals - object whose properties define local variables for views](http://expressjs.com/en/api.html#res.locals)

## other mind maps
```

resources accessible from UI (DEPRECATED)
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
        
models (DEPRECATED)
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
        
operations on resources and URIs (DEPRECATED)
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

