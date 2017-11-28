# utc-time-now

Just a simple time API that returns a json object with the current UTC formated date and it's simplified extended ISO format (ISO 8601).

you can test by using

```text
/GET https://utc-time-now.herokuapp.com/time
```

this will return a json object like

```javascript
{
  iso: "2017-11-28T20:03:29.573Z",
  date: "2017-11-28 20:03:29",
  ip: "YOUR_IP"
}
```

and the path

```text
/GET https://utc-time-now.herokuapp.com/stats/:ip_address
```

will return a json object with the total count of used calls

```javascript
{
  ip: "YOUR_IP",
  totalCount: 29
}
```

any other path will redirect to `/time`

## NOTE

This API is hosted for free on [Heroku](https://heroku.com) and any extensive use could be shut down.
