document.querySelectorAll('ul li a').forEach(link => {
       link.addEventListener('click', function(e) {
           e.preventDefault();
           // Удаляем активный класс у всех ссылок
           document.querySelectorAll('ul li a').forEach(el => el.classList.remove('active'));
           // Добавляем активный класс к текущей ссылке
           this.classList.add('active');
       });
   });