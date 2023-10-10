## Подключение к БД
1) Запускаем БД: docker compose up postgres -d --build
2) Запускаем сервер без докера в dev режиме: yarn dev --scope=server
3) В этот момент в терминале вебшторма выйти все console.log из файла db.ts
   и мы должны убедиться что подключение к БД происходит.
4) Запускаем pgadmin:
   docker compose up pgadmin -d --build
5) Заходим в pgAdmin http://localhost:8080/ по данным из .env http://localhost:8080/
   из переменных .env PGADMIN_DEFAULT_EMAIL, PGADMIN_DEFAULT_PASSWORD
6) Внутри pgAdmin пользуемся данными из переменных .env POSTGRES_HOST,
   POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT.
7) Внутри должен быть уже созданный сервер myServer и у него будет база данных postgres
8) Ваши таблицы будут создаваться в postgres---Schemas---Tables
9) Если нужен запуск клиента, то запускаем как обычно через yarn dev --scope=client


