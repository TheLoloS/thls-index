In the value of the key, we add the object we retrieved from Google.

Possible types in `config.json`: `"add"` | `"remove"`

The values in the URL look like this:

`https://example.com/`

Depending on the type in `config.json`, we add or remove links from Google in `urls.txt`.

If we receive a status `200` and an error-free object, it means it has been added/removed. It looks like this:

```json
200
{
  "urlNotificationMetadata": {
    "url": "https://example.com/",
    "latestUpdate": {
      "url": "https://example.com/",
      "type": "URL_UPDATED", // here, depending on what we did, it's either `URL_UPDATED` or `URL_DELETED`
      "notifyTime": "2024-03-13T19:11:56.107386684Z"
    }
  }
}
```
