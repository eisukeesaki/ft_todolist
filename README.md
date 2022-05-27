# mind trace

This file represents something like footprints of myself in my mind. Somestimes I intentionally leave obvious footprints for the benefits of my future self(and hopefully other people too), and or because I chose to temporarily unload references that doesn't require quick access off of my mind's working memory. Other times I just code away without leaving any trace.

## Table of contents

- [knowledge base](#knowledge-base)
- [remote resources](#remote-resources)
- [actors and roles](#actors-and-roles)
- [tasks](#tasks)
- [issues](#issues)
- [other mind maps](#other-mind-maps)

## knowledge base

What this project led me to understand or remind me of.

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
    routing
        how app's endoints respond to requests
    middleware stack
        app._router.stack
    res.render()
        render view and sends rendered HTML string to client
        res.locals
            local variables for views
    express instance
        ...
        mountpath
        _router
            params {}
            _params []
            stack [ [Layer], [Layer], ... ]

 
express-promise-router
    same API as express router
        except it allows use of async functions as route handlers

curl
    POST JSON
        set request header
            set representation header
                indicate type of resource in payload
                    Content-Type = MIME type = media type
                        --header
                            "Content-Type: application/json"
                        -d
                            shorthand for data
                            implies POST request unlike --data
                        example
                            curl -v \
                                --header Content-Type: application/json \
                                -d {"email": "asuka@nerv.jp", "password": "letasukain"} \
                                http://localhost:4242/api/v0/sessions

HTTP(/S)
    protocol
        layer
            application
        feature
            one question, one response
                one request, one response
            
HTTP sessions
    a solution
        means to eliminate the need for clients to make authentication requests every time before they make any other requests
    session data
        association of user's account information and session identifier
        storage location
            backend database
                sessions table
                centralized maner
                    server has full control
                does not act against distribution of servers(i.e scaling)
                requires extra hop
                    relatively slow
            server memory
                fast
                    does not require hop to backend database
                scaling issues
                    scaling
                        distribution of server load
                            having multiple server instances across different computing resources
                                distribution of server instances
                    session being stored on one particular server act against scaling of backend server
            client-side
                decentralized manner
                methods for achievement
                    use of
                        JWT
                            means of representing claims to be transferred between two parties
                easy to implement
                    no need to store, fetch, process on server side
                server cannot immediately revoke/invalid user
    transmission channel
        HTTPS
            
web application attacks
    SQL Injection
    Cross Site Scripting (XSS)
    Cross-Site Request Forgery (CSRF)
        Attacker makes target's browser make malicious requests to arbitrary web applications on behalf of the target and without the target's permission(and oftenly, awareness).
        prevention
            HTML <form>s
                CSRF Token

web browsers
    address field
        GET
    forms
        POST
        POST request template for users
        some forms are exclusively meant to be used by authenticated users
            ex. online-bank's wire transfer form
    Cookies
        read by server
        4096 bytes per domain
    Local Storage
        only readable by client
        5MB per domain
        
tools
    be aware
        what problem does it solve?
        what does it abstract?
        how does it work?
            mechanism

how to compare
    set benchmark
    do on subjects
        investigate
        examine
        identify difference through the set benchmark
    
```

## remote resources

Some of the link titles are created by me, in order to enhace my accessibility to my reference points of knowledge in my mind. 

- [libpq - C API to PostgreSQL](https://www.postgresql.org/docs/9.5/libpq.html)
- [PostgreSQL SERIAL datatype](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-SERIAL)
- [res.locals - object whose properties define local variables for views](http://expressjs.com/en/api.html#res.locals)
- [RFC on JWT](https://datatracker.ietf.org/doc/html/rfc7519)
- [ways to implement HTTP session and a reasons not to use JWT for it](https://developpaper.com/please-stop-using-jwt-for-session-management-immediately/)

## actors and roles

```

index.js
    init express
        app.js
            parse request body
            mount routes
                /express/routes/index.js
                    init and load routes into this scope
                        <resource name>.routes.js
                        instantiate new express-promise-router object
                    mount routes to express instance
                    ...
            ...
    init database
        /db/index.js
            load connection configuration
            create connection pool
            define pool.query wrapper function
    start Node instance

```

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

1. identify the problem(main issue) that you are trying to solve
2. identiy the sub-issues that makes up the problem
3. repeat the previous step until you know the exact solution for the particular issue
4. code

```

issues-specific
    implement session management
        ?express-session
        store session data in server memory to get started
        ?sessions table
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
                                        GET /todos HTTP/1.1
                                    update todo by id
                                        update value of completed field
                                            redirect to /
                                            POST /todos/:id HTTP/1.1 relevant data in payload
                                        destroy
                                            redirect to /
                                            POST /todos/:id HTTP/1.1 empty payload
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
    make use of Express.Routes.route() to clean up route definitions
    make use of arrays and loops in routing code
    automate database migration

```

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
