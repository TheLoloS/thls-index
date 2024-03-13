// Zawartość: Skrypt do indeksowania URL w Google Search Console
const fs = require('fs');
// Zaimportowanie modułu "request"
// var request = require('request');
// Zaimportowanie modułu "googleapis"
var { google } = require('googleapis');
// Zaimportowanie modułu "path"
const path = require('path');


// Utworzenie ścieżki do pliku "config.json"
const configPath = path.join(process.cwd(), 'config.json');
console.log(configPath);
// Odczyt pliku "config.json"
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));



// Utworzenie ścieżki do pliku urls.txt
const filePath = path.join(process.cwd(), 'urls.txt');
console.log(filePath);
// Odczyt pliku "urls.txt"
const urls = fs.readFileSync(filePath, 'utf8').split('\n');
// jeżeli jest powyżej 100 to anuluj wykonywanie i zatrzymaj program na 10 sekund po czym go zamknij
if (urls.length > 100) {
    console.log('Zbyt wiele URLi');

}

// Utworzenie klucza z pliku "config.json"
const { key, type } = config;

if (!key || !type) {
    console.log('Brak wymaganych danych');
    setTimeout(() => {
        process.exit(1);
    }, 10000);
}

if (type !== "add" && type !== "remove") {
    console.log('Nieprawidłowy typ');
    setTimeout(() => {
        process.exit(1);
    }, 10000);
}

// utworzenie klucza z pliku "config.json
const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/indexing'],
    null
);

// Uzyskanie tokenu JWT przed iteracją po URL-ach
jwtClient.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Zalogowano');
        // Utworzenie nagłówka autoryzacyjnego z użyciem tokenu JWT
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access_token}`
        };

        // Iteracja po URL-ach i wywołanie funkcji indexUrl dla każdego z nich
        urls.forEach(url => {
            indexUrl(url, headers);
        });
    }
});

// Funkcja indexUrl przyjmuje również nagłówki jako argument
function indexUrl(url, headers) {
    fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            'url': url,
            'type': type === "remove" ? "URL_DELETED" : "URL_UPDATED"
        })
    }).then(response => {
        console.log(response.status);
        response.json().then(data => {
            console.log(data);
        });

    }).catch(error => {
        console.log(error);
    });
}


// Zakończenie programu
setTimeout(() => {
    console.log('Zakończono');
    process.exit(0);
}, 10000);
