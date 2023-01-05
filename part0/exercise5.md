sequenceDiagram
Client-->>Server: Get /spa
Server-->>Client: spa.html
Note left of Client: HTML links to CSS at /main.css
Client-->>Server: Get /main.css
Server-->>Client: HTTP Status Code 200 (body: main.css)
Note left of Client: HTML script tag links to /spa.js
Client-->>Server: Get /spa.js
Server-->>Client: HTTP Status Code 200 (body: spa.js)
Note left of Client: Run spa.js => xhttp.get(json)
Client-->>Server: get /data.json
Server-->>Client: data.json
Note left of Client: Inject list of notes into HTML page
