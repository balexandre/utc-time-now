# utc-time-now

With time sensitive setup running on a client browser (show/hide condition vary by time of the day), and so I won't rely on the user computer time (as one can easily change it), I've created this **very simple time API** that returns a json object with the current UTC formatted date and it's simplified extended ISO format (ISO 8601).

This is also setup for **CORS** calls, as they won't be blocked in any browser.

you can test by using

```text
GET {{HOST}}/time
Content-type: application/json
```

will return

```json
{
  "iso": "2017-11-28T20:03:29.573Z",
  "date": "2017-11-28 20:03:29",
  "dateFormat": "YYYY-MM-DD HH:mm:ss",
  "ip": "YOUR_IP"
}
```

## Extending with stats

Using MongoDB, I've also created a super simple statistics that all it does is count the times a give IP Address has requested the current time

```text
GET {{HOST}}/stats/:ip_address
Content-type: application/json
```

will return

```json
{
  "ip": "YOUR_IP",
  "totalCount": 29
}
```

any other path will redirect to `/time`

## MongoDB is optional

you can easily run only the Time API without MongoDB, just remove the call to the `routes/stats.js` file, the `model` folder as well the line for the `/stats/:ip` route in `server.js` file

# Run with Docker

as Heroku lost the ability to have a MongoDB for free, I choose to containerize the entire solution; the `docker-compose.yml` has a simple setup that makes this web application run together with the MongoDB image

just build and started with

```bash
docker-compose build
docker-compose up
```

you will have both images running locally at http://localhost:8080

```bash
> curl http://localhost:8080

StatusCode        : 200
StatusDescription : OK
Content           : {"iso":"2020-07-28T19:23:20.616Z","date":"2020-07-28 19:23:20 
                    ","dateFormat":"YYYY-MM-DD HH:mm:ss","ip":"::ffff:172.19.0.1" 
                    }
RawContent        : HTTP/1.1 200 OK
                    Access-Control-Allow-Origin: *
                    Connection: keep-alive
                    Content-Length: 123
                    Content-Type: application/json; charset=utf-8
                    Date: Tue, 28 Jul 2020 19:23:20 GMT
                    ETag: W/7b-PsVF5pd2Tq...
Forms             : {}
Headers           : {[Access-Control-Allow-Origin, *], [Connection, keep-alive], 
                    [Content-Length, 123], [Content-Type, application/json; chars 
                    et=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 123
```

# Available on Heroku

the API is available on [Heroku](https://heroku.com) as https://utc-time-now.herokuapp.com/ (it is running on a free server, so it will sleep if no traffic for the last 30min)

as they [no longer support MongoDB](https://devcenter.heroku.com/changelog-items/1823) as a free Add-on and, you can [only push the `Dockerfile`](https://devcenter.heroku.com/articles/local-development-with-docker-compose) and not the `docker-compose` file, the `/stats` route **is not available**

to test, go to the jQuery website, open the browser console and run

```javascript
$.getJSON('https://utc-time-now.herokuapp.com/time', json => console.log(json))
```
