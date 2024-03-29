# Курсант.Еда

## Задача:
Реализовать сервис по заказу и доставки еды из магазинов, точек быстрого питания (далее – магазин) и т.д.  
Список магазинов: местоположение, средний чек, рейтинг, количество заказов в месяц/неделю.  
Список товаров для каждого магазина: стоимость, описание, в каком магазине доступно, рейтинг, количество покупок в месяц/неделю.  

### Пользователи
1) Администратор:
      просмотр, добавление, редактирование, удаление магазинов, пользователей, товаров; изменение ролей пользователей
      просмотр общей и средней стоимости заказов за все время/месяц/неделю,
2)	Офицер, курсант:
      просмотр магазинов и товаров;
      личный кабинет: список (количество) заказов, потраченные деньги
      (за неделю/месяц, средняя стоимость заказа); изменение пароля, логина
      (для офицеров) просмотр заказов, которые делают курсанты (отметка «Согласовано»)
3)	Курьер:
      просмотр текущих заказов, установление стоимости доставки, количество доставок за неделю/месяц,

## Фичи
1)	Создание заказа (корзина):
      количество товаров в корзине, общая стоимость, выбор желаемого курьера, отметка «Согласовано с офицером» (только для курсантов, чтобы предоставить отчетность)
2)	Принятие заказа (для курьера):
      принятие заказа курьером, установление стоимости доставки (например: чтобы все, кто заказывает, оплатил дополнительную сумму, чтобы хватило, например, на шаву курьеру).
      Информация в заказе:
      сумма заказа
      общее количество товаров по наименованиям (чтобы сделать заказ Хачу);
      список заказов отдельно для каждого заказывающего (чтобы выдать всем то, что они заказывали)

## Мысли вслух
Регистрация курсанта происходит автоматически; если при регистрации пользователь указывает, что он – офицер или курьер, необходимо подтверждение админа 

У покупателей есть доступ к страницам магазинов, на которых будут товары. Их можно просмотреть или добавить в корзину (несколько штук в том числе). После добавление всего необходимого в корзину, пользователь может либо подтвердить заказ, либо отчистить корзину.  

После подтверждения пользователем заказа у всех курьеров на отдельной страничке появляется информация о существующих заказов ото всех пользователей. Курьер может выбрать, какие заказы он будет принимать, какие нет. Также он может выбрать стоимость доставки (т.е., например, выставить в качестве стоимости дополнительную шаву или попить). После принятие курьером заказа всем покупателям, заказы которых подтвердились, отправляется смска с ссылкой для оплаты и примерным временем доставки. Если курьер указывал стоимость доставки, то она будет разделена поровну на количество покупателей и добавлена в стоимость заказа автоматически.

После того, как все покупатели оплатили заказы, статус уже общего заказа на страничке у курьера обновляется. Информацию, которую видит курьер: количество наименований; заказы по пользователям, чтобы нормально всем все раздать.

После того, как курьер заказал товары у, например, Хача и отправил ему деньги, статус заказа у всех покупателей обновляется на «В процессе приготовления».

После того, как заказ готов к доставке, курьер выставляет статус заказа «Доставка».

После доставки заказа на курс, курьер выставляет статус заказа «Доставлено». После этого если доставка успешна и всем всего хватило, пользователь может оценить курьера, продукты и магазин. Если курьера спалил дежурный, выставляется соответствующий статус заказа и оценка в 2 звезды для курьера. ВНИМАНИЕ. Курьер НЕ несет ответственности за въебанный заказ дежурному и/или офицеру. В этом случае денежные средства не возвращаются.

Профиль любого пользователя может посмотреть любой другой авторизованный пользователь.

Информация в профиле: количество заказов и средняя их стоимость. Любимый магазин, любый товар.

Информация, доступная только админу и непосредственно пользователю: все поля модели, т.е. ФИ, звание, сумма и количество всех заказов/за неделю/за месяц, любимый товар и магазин.

Админ может CRUD товаров, магазинов, подтверждать, редактировать и удалять профили пользователей. Просматривать статистику заказов (общее и среднее количество и сумма), количество въебов дежурному/офицерам.

