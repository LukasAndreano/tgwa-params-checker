## Для чего?
Пакет для проверки параметров запуска VK Mini Apps. Код взят из официальной [документации](https://vk.com/dev/vk_apps_launch_params?f=%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%2B%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B8%2B%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B8%2B%D0%BD%D0%B0%2BNode.js) и собран в один пакет для удобства использования.

### Начало работы с пакетом
Для начала установите пакет:
```
npm i vkminiapps-params-checker
```
Проинициализируйте его в своём проекте:
```javascript
const check = require('vkminiapps-params-checker');
```
Использование:
```javascript
const isValidParams = check('параметры запуска', 'секретный ключ приложения', 'время жизни в секундах');
```
Функция возвращает `true` или `false`.

### Время жизни параметров
При каждой генерации параметров к ним прикрепляется дата создания: **vk_ts**.   

Изначально параметры запуска будут ***"жить"*** два часа - **7200 секунд**. И Вы
можете изменить это значения, передав нужное число.

В примере выше мы прокидываем **параметры запуска**, **секретный ключ приложения**, а также ***время жизни***. В качестве последнего Вы можете прокинуть как число, так и **0**.

Если указано 0, то проверка на "**протухшесть**" параметров запука будет отключена.
```javascript
const isValidParams = check('', '', 3600) // Параметры запуска будут жить час (3600 секунд)
````
```javascript
const isValidParams = check('', '', 0) // Параметры запуска будут жить вечно, пока не изменится, например, ключ от приложения.
````
### Пример:
```javascript
const isValidParams = check('vk_access_token_settings=&vk_app_id=7948530&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1634454189&vk_user_id=172118960&sign=5lVUWU19M_xQpENllCGe2Mi-SGWC8K5i7FdkfHOwggA', 'cBpgoP3d9WggrQ81qtNhw'); // false
```