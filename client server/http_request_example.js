const httprequest = {
  host: "localhost",
  port: 8080,
  path: "/playgame",
  method: "POST", // GET, SET, PUT, DELETE, etc.
  headers: {
    "content-type": "application/json",
    "content-length": "100",
  },
  body: '{"data":"This is a http request body"}',
};

const httpresponse = {
  statuscode: 200,
  headers: {
    "content-type": "application/json",
    "access-control-allow-origin": "http://example.com", // CORS
  },
  body: "{}",
};
