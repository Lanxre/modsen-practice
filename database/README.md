## Подготовка окружения для работы с БД

- Установка сервера для Linux, Windows, MacOS, BSD, Solaris
  - Дистрибутивы: https://www.postgresql.org/download/
- Установка PgSQL Admin
  - Дистрибутивы: https://www.pgadmin.org/download/
- Создание базы данных
  - `su - postgres`
  - `psql` попадаем в командную строку PostgreSQL
  - создаем базу данных `CREATE DATABASE meetups;`
  - `\quit` выходим
- Исполняем файл с SQL скриптом создания базы
  - `sudo psql -d meetups -a -f db.sql`
- Установка зависимостей (включая модуль `pg`) `npm i`
- Запуск `node index.js`
