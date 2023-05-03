## What for?

Package for checking parameters of Telegram Web Apps startup. The code is taken from the official [documentation](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app) and put into one package for easy use.

### Getting started with the package

First, install the package:

```
npm i tgwa-params-checker
```

Initialize it in your project:

```javascript
const check = require("tgwa-params-checker");
// or use import
import check from "tgwa-params-checker";
```

Using example:

```javascript
const isValidParams = check(
  "startup params from web app window",
  "bot secret key",
  "lifetime in seconds"
);
```

The function returns `true` or `false`.

### Parameter lifetime

Whenever parameters are generated, the creation date is attached to them: **auth_date**.

Initially start parameters will **"live"\_** two hours - **7200 seconds**. And you
can change this value by passing the desired number.

In the example above, we drop **startup parameters**, **application secret key**, and **_life time_**. As the latter, you can pass either a number or **0**.

If 0 is specified, then the check for "**stupidity**" of the startup parameters will be disabled.

```javascript
const isValidParams = check("", "", 3600); // Startup parameters will live for one hour (3600 seconds)
```

```javascript
const isValidParams = check("", "", 0); // The startup parameters will live forever, as long as the key from the application does not change, for example.
```

### Example:

```javascript
const isValidParams = check(
  "query_id=AAHhpGQWAAAAAOGkZBacHiQ6&user=%7B%22id%22%3A375694561%2C%22first_name%22%3A%22%D0%9D%D0%98%D0%9A%D0%98%D0%A2%D0%90%22%2C%22last_name%22%3A%22%D0%9A%D0%9E%D0%9A%D0%90%22%2C%22username%22%3A%22lukasandreano%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&auth_date=1679551046&hash=36e589beaeb21328f4bcbec1816b8aba595f2612a28ea9beed696c2e9d85ecf3",
  "TdpgoP3d9Wggrfs1qtNhw"
); // false
```
