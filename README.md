# What for?

Package for checking parameters of Telegram Web Apps startup. The code is taken from the official [documentation](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app) and put into one package for easy use.

## Getting started with the package

First, install the package:

```bash
npm i tgwa-params-checker
```

Initialize it in your project:

```javascript
const checkHash = require("tgwa-params-checker");
// or
import checkHash from "tgwa-params-checker";
```

Using example:

```javascript
const isValidParams = checkHash(
  "startup params from web app window",
  "bot secret key"
);
```

The function returns `true` or `false`.

### Example

```javascript
const isValidParams = checkHash(
  "query_id=AAHhpGQWAAAAAOGkZBacHiQ6&user=%7B%22id%22%3A375694561%2C%22first_name%22%3A%22%D0%9D%D0%98%D0%9A%D0%98%D0%A2%D0%90%22%2C%22last_name%22%3A%22%D0%9A%D0%9E%D0%9A%D0%90%22%2C%22username%22%3A%22lukasandreano%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&auth_date=1679551046&hash=36e589beaeb21328f4bcbec1816b8aba595f2612a28ea9beed696c2e9d85ecf3",
  "TdpgoP3d9Wggrfs1qtNhw"
); // false
```
