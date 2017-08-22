# Базовый шаблон проекта

## Установка `nodejs` + `npm`

Для работы шаблона необходимо установить `nodejs` (вместе с `npm`)

- [Установка nodejs](https://nodejs.org/en/)

## Установка шаблона

``` sh
$ git clone https://github.com/cyxobeu/base_template-pug-.git `project-name`
$ cd `project-name`
$ npm install
```

По окончанию выполнения будут установлены все необходимые пакеты.


### Задачи Gulp

 - `$ gulp scripts` - сборка JS
 - `$ gulp plugins_scripts` - сборка JS файлов плагинов и библиотек
 - `$ gulp scss` - компилиция SCSS ( + autoprefixer, sourcemap, minify)
 - `$ gulp watch` - запуск задачи `browser-sync` и отслеживания изменений
 - `$ gulp pug` - компиляция Pug файлов
 - `$ gulp default` - сборка проекта

## Архитектура проекта

- `src/` - каталог для размещения рабочих файлов (scss, js, спрайтов и т.д)
- `static/` - каталог для размещения скомпилированных файлов

Вся работа осуществляется в каталоге `src/`.