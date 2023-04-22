# Proyecto Laravel 10 + React
Ejemplo completo con CRUD, Login, Signup, Seguridad, Token Api

* Requiere php 8.1 y extension sqlite
    sudo apt install php8.1-{bcmath,xml,fpm,mysql,zip,intl,ldap,gd,cli,bz2,curl,mbstring,pgsql,opcache,soap,cgi}
    sudo apt install php8.1-sqlite3
* Levantar Api Laravel
    - composer install
    - cp .env.example .env
    - artisan key:generate
    - configurar BD DB_CONNECTION=sqlite y comentar todo los demas DB
    - php artisan migrate --seed
    - php artisan serve
* Levantar Front-End React
    - cd react
    - npm install
    - npm run dev

## Preparacion del esqueleto de desarrollo
- Instalar laravel npm create_project laravel/laravel {nombre_del_proyecto} (tener php > 8.0 para laravel 10)
- cd {nombre_del_proyecto}
- npm create vite > name react > React > JavaScript (crea la carpeta del name)
- entrar a la carpeta react/
- npm install
- npm install react-router-dom -S
- npm install axios -S
- crear archivo de rutas Route.jsx
- crear archivo de contexto react/src/contexts/ContexProvider.jsx
- npm run dev