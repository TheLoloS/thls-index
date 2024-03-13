W wartości key dodajemy objekt który pobralismy z google.

Możliwe typy w config.json "add" | "remove"

wartości w url wygldaja tak:

https://exapmle.com/

w zależności od typu w config.json, dodajemy lub usuwamy z google linki w urls.txt


jeżeli dostajemy status 200 oraz obiekt bez błedu znacy że się dodało/usunęło wyglada to tak:

200
{
  urlNotificationMetadata: {
    url: 'https://exapmle.com/',
    latestUpdate: {
      url: 'https://exapmle.com/',
      type: 'URL_UPDATED', tutaj w zalezności od tego co zrobiliśmy jest URL_UPDATED lub URL_DELETED
      notifyTime: '2024-03-13T19:11:56.107386684Z'
    }
  }
}