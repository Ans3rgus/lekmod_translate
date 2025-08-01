document.querySelectorAll('ul li a').forEach(link => {
       link.addEventListener('click', function(e) {
           e.preventDefault();
           // Удаляем активный класс у всех ссылок
           document.querySelectorAll('ul li a').forEach(el => el.classList.remove('active'));
           // Добавляем активный класс к текущей ссылке
           this.classList.add('active');
       });
   });
   
// Список 78 наций (должен точно соответствовать именам папок)
const nations = [
    "akkad", "aksum", "america", "arabia", "argentina",
	"armenia","assyria","australia","austria","ayybids"
];

function initNationsDropdown() {
    const toggleBtn = document.getElementById('nations-toggle');
    const dropdown = document.getElementById('nations-dropdown');
    const searchInput = document.getElementById('nation-search');
    const nationsList = document.getElementById('nations-list');
    
    // Функция для перехода на страницу нации
    function goToNationPage(nations) {
        const path = `${encodeURIComponent("nation")}/${encodeURIComponent(nations)}/${encodeURIComponent(nations)}.html`;
        window.location.href = path;
    }
    
    // Заполнение списка наций
    function renderNations(filter = '') {
        nationsList.innerHTML = '';
        const filtered = nations.filter(nation => 
            nation.toLowerCase().includes(filter.toLowerCase())
        );
        
        filtered.forEach(nation => {
            const item = document.createElement('div');
            item.className = 'nation-item';
            item.textContent = nation;
            item.addEventListener('click', () => {
                goToNationPage(nation);
            });
            nationsList.appendChild(item);
        });
    }
    
    // Переключение видимости списка
    toggleBtn.addEventListener('click', () => {
        dropdown.classList.toggle('show');
        toggleBtn.textContent = dropdown.classList.contains('show') ? 
            'Скрыть список наций' : 'Показать список наций (78)';
    });
    
    // Поиск по нациям
    searchInput.addEventListener('input', (e) => {
        renderNations(e.target.value);
    });
    
    // Инициализация
    renderNations();
}


document.addEventListener('DOMContentLoaded', initNationsDropdown);
