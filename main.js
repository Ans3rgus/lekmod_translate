document.addEventListener('DOMContentLoaded', function() {
    initNationsDropdown();
    initSidebar();
    initThemeToggle();
    initMenuInteractions();
});

// Инициализация выпадающего списка наций
function initNationsDropdown() {
    const toggleBtn = document.getElementById('nations-toggle');
    const dropdown = document.getElementById('nations-dropdown');
    const searchInput = document.getElementById('nation-search');
    const nationsList = document.getElementById('nations-list');
    
    // Список 78 наций (должен точно соответствовать именам папок)
    const nations = [
        "akkad", "aksum", "america", "arabia", "argentina",
        "armenia","assyria","australia","austria","ayyubids",
        "aztecs", "babylon", "belgium", "boers", "bolivia",
        "brazil", "brunei", "bulgaria", "burma", "byzantium",
        "canada", "carthage", "celts", "chile", "china",
        "colombia", "cuba", "czechia", "denmark", "egypt",
        "england", "ethiopia", "finland", "france", "franks",
        "gaul", "georgia", "germany", "golden_horde", "goths",
        "greece", "hittites", "hungary", "huns", "inca",
        "india", "indonesia", "ireland", "iroquois", "israel",
        "italy", "japan", "jerusalem", "khmer", "kilva",
        "kongo", "korea", "lithuania", "macedonia", "madagascar",
        "manchuria", "maori", "maurya", "maya", "mexico",
        "mongolia", "moors", "morocco", "mughals", "mysore",
        "nabataea", "netherlands", "new_zealand", "normandy", "norway",
        "nubia", "oman", "ottomans", "palmyra", "persia",
        "philippines", "phoenicia", "poland", "polynesia", "portugal",
        "prussia", "romania", "rome", "russia", "scotland",
        "shoshone", "siam", "sioux", "songhai", "spain",
        "sumeria", "sweden", "switzerland", "tibet", "timurids",
        "tonga", "tunisia", "turkey", "uae", "ukraine",
        "vatican", "venice", "vietnam", "wales", "yugoslavia",
        "zimbabwe", "zulu"
    ];

    // Функция для перехода на страницу нации
    function goToNationPage(nation) {
        const path = `${encodeURIComponent("nation")}/${encodeURIComponent(nation)}/${encodeURIComponent(nation)}.html`;
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
        const nationCount = document.getElementById('nations-list').children.length;
        toggleBtn.querySelector('span').textContent = 
            dropdown.classList.contains('show') ? 
            `Скрыть список наций (${nationCount})` : 
            'Показать список наций (78)';
    });
    
    // Поиск по нациям
    searchInput.addEventListener('input', (e) => {
        renderNations(e.target.value);
    });
    
    // Инициализация
    renderNations();
}

// Инициализация боковой панели
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Переключение темы
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Взаимодействие с меню
function initMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item > a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('submenu')) {
                e.preventDefault();
                
                // Закрываем другие открытые подменю
                document.querySelectorAll('.menu-item').forEach(el => {
                    if (el !== this.parentElement) {
                        el.classList.remove('active');
                    }
                });
                
                // Переключаем текущий элемент
                this.parentElement.classList.toggle('active');
            }
        });
    });
}

// Плавная прокрутка для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
