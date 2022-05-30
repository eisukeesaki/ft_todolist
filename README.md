# mind trace

This file is like a trace of my mind. I maintain it for several purposes.

- organize the problem in order to solve it
- for the benefit of my future self(and hopefully other people as well)
  - to use it as a knowledge base
  - to quickly remember the status of the project

It is not intended to be comprehensive.

## Table of contents

- [knowledge base](#knowledge-base)
- [remote resources](#remote-resources)
- [tasks](#tasks)
- [issues](#issues)
- [do later](#do-later)
- [other mind maps](#other-mind-maps)
- [classifications(types) of SQL statements](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_1001.htm)

## knowledge base

What this project led me to understand or remind me of.

```text

SQL
    statements
        Data Definition Language = DDL
            CREATED
            ALTER
            DROP
            GRANT
            REVOKE
            ...
        Data Manipulation Language = DML
            DELETE
            INSERT
            UPDATE
            limited form
                SELECT
                    read only
            ...
        Transaction Control
            ROLLBACK
            ...
        Session Control
            ALTER SESSION
            SET ROLE
        System Control
            ALTER SYSTEM
        Embedded
            programming language
            SQL

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
    pass control to next middleware in stack
        next()
        ?next('route')

 
express-promise-router
    same API as express router
        except it allows use of async functions as route handlers

curl
    set Cookie request header
        --cookie
        example
            curl -v --cookie "USER_TOKEN=Yes" http://127.0.0.1:5000/
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
                                --header "Content-Type: application/json" \
                                -d '{"email": "asuka@nerv.jp", "password": "letasukain"}' \
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
    secret
        key used to sign session identifier
    session data
        association of user's account information and session identifier
            session identifier
                saved on
                    server
                    backend database
                    client's cookie
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
        application layer
            HTTPS
    libraries
        express-session
            session middleware
            session()
                creates new session middleware
        connect-pg-simple
            API used to abstract session store management
            designed for PostgreSQL
            
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
    read, or at least skim through external libraries' source code and map own understanding of their mechanism 

how to compare subjects
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
- [ways to implement HTTP session and reasons not to use JWT for it](https://developpaper.com/please-stop-using-jwt-for-session-management-immediately/)
- [Set-Cookie HTTP response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
- [PostgreSQL Database - Command Tag](https://www.postgresql.org/docs/current/protocol-message-formats.html)
- [interface for PostgreSQL server - pg.Result](https://node-postgres.com/api/result#resultcommand-string)

## tasks

```text

tasks
    OK: implement middleware
        OK: isAuthenticated
            compare
                req.cookies == req.sessionID
                    matched
                        next()
                    not matched
                        redirect /
    OK: implement routes
        OK: /
          GET
              if authed, render index view
              else render login view
        OK: sessions DELETE
            destroy session data from store
            redirect /
        OK: /todos
            OK: POST
                authed
                    INSERT INTO todos (owner_id, title, completed)
                !authed
                    respond with unauthorized
                    redirect /
            
            OK: DELETE /:id HTTP/1.1
                DELETE FROM todos WHERE id = req.params.id;
            OK: PUT /:id HTTP/1.1
                query
                    UPDATE todos SET title = $1, completed = $2 WHERE id = $3 AND owner_id = $4
                expected req.body
                    toggle completed
                        on
                            { "completed": "on", "title": <identical to previously rendered value>" }
                        off
                            { "title": "<itentical to previously rendered value>" }
                    update title
                        expected req.body
                            { "completed": "<itentical to previously rendered value>", "title": "new title" }
        OK: prefix all router instances' names with relevant route names
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

tasks-low-priority
    make use of Express.Routes.route() to clean up route definitions
    make use of arrays and loops in routing code
    automate database migration

```

## issues

How to bulid computer programs:
- identify the main issue that you are trying to solve
- define minimum viable solution
- recursively break down the main issue into smaller, more specific sub-issues until you know the exact code-level solution for a particular issue
- code
  - code a little, test a little, repeat
    - sizeof "little" will incrementally become larger as your skill develops
- reassess issues
- repeat

```text

UI
    login
        heading
            "sign in"
        form
            username
            password
    signup
        heading
            "sign up"
        form
            username
            password
    app

UI features
    todo component
        delete todo
            DELETE /todos/:id HTTP/1.1
        toggle completed
            PUT /todos/:id HTTP/1.1
                req.body
                    { "completed": "on", "title": "<as is>" }
                    { "title": "<as is>" }
        update title
            PUT /todos/:id HTTP/1.1
                req.body
                    { "completed": "<as is>", "title": "new title" }

CSRF prevention
    HTML forms
        CSRF token

issues-specific
    when POSTing form data to /sessions, req.body is undefined
        does not happen with urlencoded or json data
    cannot reference form data in request 
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
                                    render index view
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
                                            set Set-Cookie response header
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
        EJS
            build client-side-rendered UI in future versions

```

## do later

```text

find
    inconsistencies across codebase
        logic
        syntactical styles
        entity naming
        structure
            per-file level
            directory

investigate
    How to prevent authorized users of API from triggering database queries against resources that they do not own, without making any prior quries.
    How to log SQL statements that node-postgres is sending to PostgreSQL backend
        pool.query
            intercept
            monkey patch
    when making queries to PostgreSQL via node-postgres, logs of database activities are not written to /usr/local/var/log/postgres.log. the logs are written when querying from psql.
        why?
    Set-Cookie header set by ?express-session has additional values concatenated to req.sessionID.
        what is it?
        how is it generated?

```

## other mind maps

```text

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
