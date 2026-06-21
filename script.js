// --- 1. ДАННЫЕ РЕГИОН, РАЙОН, ОКС, ЗУ ---
const regions = [
    '77 - Москва', '78 - Санкт-Петербург', '61 - Ростов-на-Дону'
];

const districtsData = {
    '77 - Москва': ['Центральный', 'Северный', 'Западный', 'Южный'],
    '78 - Санкт-Петербург': ['Адмиралтейский', 'Калининский', 'Кировский', 'Красногвардейский'],
    '61 - Ростов-на-Дону': ['Ворошиловский', 'Железнодорожный', 'Кировский', 'Первомайский', 'Пролетарский'],
};

const oksPurposes = {
    'Здание': ['Жилое Здание', 'Нежилое Здание', 'Многоквартирный дом', 'Жилое строение'],
    'Помещение': ['Жилое Помещение', 'Нежилое Помещение'],
    'Сооружение': [],
    'Объект незавершённого строительства': [],
    'Предприятия как имущественный комплекс': [],
    'Единый недвижимый комплекс': [],
    'Машино-место': [],
    'Иной объект недвижимости': []
};

const viewMapping = { 
    'Не важно': 'any', 
    'ОКС (объект капитального строительства)': 'oks', 
    'ЗУ (земельный участок)': 'zu' 
};

const categoryMapping = {
    'Сельскохозяйственного назначения': 'agricultural',
    'Населенных пунктов': 'settlements',
    'Промышленности': 'industrial',
};

const usageByCategory = {
    agricultural: ['ИЖС', 'Дачное строительство', 'Сельхозпроизводство', 'Отдых и туризм'],
    settlements: ['ИЖС', 'Многоквартирная застройка', 'Коммерческое использование', 'Дачное строительство'],
    industrial: ['Производство', 'Логистика', 'Коммерческое использование', 'Служебные постройки'],
};

let activeDistricts = [];
let activeOksPurposes = [];
let activeLandUsages = [];

// --- 2. ПЛАГИН УПРАВЛЕНИЯ КОМБО БОКСАМИ  ---
function initCombo(inputId, dropdownId, dataArrayOrGetter, onSelectCallback) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;
    
    const wrapper = input.closest('.combo-wrapper');
    const clearBtn = wrapper ? wrapper.querySelector('.clear-btn') : null;
        
    let isOpen = false;
    let currentFocus = -1;

    function getData() {
        return typeof dataArrayOrGetter === 'function' ? dataArrayOrGetter() : dataArrayOrGetter;
    }

    function toggleClearBtn() {
        if (!clearBtn) return;
        if (input.value.trim().length > 0) {
            clearBtn.style.setProperty('display', 'block', 'important');
        } else {
            clearBtn.style.setProperty('display', 'none', 'important');
        }
    }
 function renderList(filterText = '') {
        dropdown.innerHTML = '';
        currentFocus = -1;
        const data = getData();
        
        const filteredData = input.hasAttribute('readonly') ? data : data.filter(item => {
            const itemLower = item.toLowerCase();
            const lowerText = filterText.toLowerCase();
            return itemLower.includes(lowerText);
        });

        if (filteredData.length === 0 && filterText !== '') {
            const li = document.createElement('div');
            li.textContent = 'Ничего не найдено';
            li.style.padding = '8px 12px'; li.style.color = '#999';
            dropdown.appendChild(li);
            return;
        }

        filteredData.forEach((item, index) => {
            const option = document.createElement('div');
            option.textContent = item; 
            option.className = 'combo-option';
            option.setAttribute('data-index', index);
            
            option.onclick = (e) => {
                e.stopPropagation();
                selectItem(item);
            };
            
            option.onmouseover = () => {
                removeActive();
                currentFocus = index;
                option.classList.add('selected');
            };
            option.onmouseout = () => option.classList.remove('selected');
            dropdown.appendChild(option);
        });
    }

    function selectItem(item) {
        input.value = item;
        toggleClearBtn();
        if (onSelectCallback) onSelectCallback(item);
        closeDropdown();
    }

    function addActive(options) {
        if (!options || options.length === 0) return;
        removeActive();
        if (currentFocus >= options.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = options.length - 1;
        
        options[currentFocus].classList.add('selected');
        options[currentFocus].scrollIntoView({ block: 'nearest' });
    }

    function removeActive() {
        const options = dropdown.getElementsByClassName('combo-option');
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove('selected');
        }
    }

    input.addEventListener('keydown', (e) => {
        const options = dropdown.getElementsByClassName('combo-option');
        if (options.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpen) { openDropdown(); } else { currentFocus++; addActive(options); }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (isOpen) { currentFocus--; addActive(options); }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (isOpen && currentFocus > -1 && options[currentFocus]) {
                options[currentFocus].click();
            }
        } else if (e.key === 'Escape') {
            closeDropdown();
        }
    });

    function openDropdown() {
        document.querySelectorAll('.combo-dropdown.active').forEach(d => d.classList.remove('active'));
        isOpen = true; 
        dropdown.classList.add('active'); 
        renderList(input.value); 
    }

    input.addEventListener('click', (e) => {
        e.stopPropagation();
        if (input.disabled) return;
        if (!isOpen) openDropdown(); else closeDropdown();
    });

    input.addEventListener('input', (e) => {
        if (input.disabled || input.hasAttribute('readonly')) return;
        isOpen = true; 
        dropdown.classList.add('active'); 
        renderList(e.target.value);
        toggleClearBtn();
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            input.value = '';
            toggleClearBtn();
            closeDropdown();
            
            if (inputId === 'regionInput') {
                const districtInput = document.getElementById('districtInput');
                if (districtInput) {
                    districtInput.value = '';
                    districtInput.disabled = true;
                    const distWrapper = districtInput.closest('.combo-wrapper');
                    const distBtn = distWrapper ? distWrapper.querySelector('.clear-btn') : null;
                    if (distBtn) distBtn.style.setProperty('display', 'none', 'important');
                }
                activeDistricts = [];
            }
            
            if (inputId === 'landCategoryInput') {
                const usageInput = document.getElementById('usageInput');
                if (usageInput) {
                    usageInput.value = '';
                    const usageGroup = document.getElementById('usageGroup');
                    if (usageGroup) usageGroup.style.display = 'none';
                }
                activeLandUsages = [];
            }
            
            if (onSelectCallback) onSelectCallback('');
        });
    }

    function closeDropdown() { 
        isOpen = false; 
        dropdown.classList.remove('active'); 
        currentFocus = -1;
    }

    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) closeDropdown();
    });
    
    toggleClearBtn();
}

    // --- 3. ИНИЦИАЛИЗАЦИЯ РЕГИОН, РАЙОН ---
initCombo('regionInput', 'regionDropdown', regions, (selectedRegion) => {
    const districtInput = document.getElementById('districtInput');
    if (districtInput) {
        districtInput.value = ''; 
        districtInput.disabled = false; 
        districtInput.focus();
    }
    activeDistricts = districtsData[selectedRegion] || [];
});

initCombo('districtInput', 'districtDropdown', () => activeDistricts, (selectedDistrict) => { 
    console.log('Выбран район:', selectedDistrict); 
});

// --- 4. ДВОЙНОЙ ПОЛЗУНОК СТОИМОСТИ ---
let isDragging = false;
let activeThumb = null;

const thumbMin = document.getElementById('thumbMin');
const thumbMax = document.getElementById('thumbMax');
const rangeTrack = document.getElementById('rangeTrack');
const rangeFill = document.getElementById('rangeFill');
const labelMin = document.getElementById('labelMin');
const labelMax = document.getElementById('labelMax');
const inputMin = document.getElementById('priceFromInput');
const inputMax = document.getElementById('priceToInput');

const MIN_VALUE = 0;
const MAX_VALUE = 999999999;

function updateThumbPosition() {
    if (!thumbMin || !thumbMax || !rangeFill || !labelMin || !labelMax) return;
    const minVal = parseInt(thumbMin.getAttribute('data-value')) || MIN_VALUE;
    const maxVal = parseInt(thumbMax.getAttribute('data-value')) || MAX_VALUE;
    const percentMin = (minVal / MAX_VALUE) * 100;
    const percentMax = (maxVal / MAX_VALUE) * 100;

    thumbMin.style.left = `${percentMin}%`;
    thumbMax.style.left = `${percentMax}%`;
    rangeFill.style.left = `${percentMin}%`;
    rangeFill.style.width = `${percentMax - percentMin}%`;

    labelMin.textContent = formatNumber(minVal) + ' ₽';
    labelMax.textContent = formatNumber(maxVal) + ' ₽';
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateRangeFromInput() {
    if (!inputMin || !inputMax || !thumbMin || !thumbMax) return;
    let from = parseInt(inputMin.value) || MIN_VALUE;
    let to = parseInt(inputMax.value) || MAX_VALUE;

    if (from > to) from = to;

    from = Math.max(MIN_VALUE, Math.min(MAX_VALUE, from));
    to = Math.max(MIN_VALUE, Math.min(MAX_VALUE, to));

    thumbMin.setAttribute('data-value', from);
    thumbMax.setAttribute('data-value', to);

    updateThumbPosition();
}

function startDrag(e, type) {
    isDragging = true;
    const thumb = type === 'min' ? thumbMin : thumbMax;
    activeThumb = { thumb, type };
    
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
    if (!isDragging || !activeThumb || !rangeTrack || !thumbMin || !thumbMax) return;
    if (e.cancelable) e.preventDefault();

    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const rect = rangeTrack.getBoundingClientRect();
    const pos = (clientX - rect.left) / rect.width;
    let value = Math.round(pos * MAX_VALUE);
    value = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value));

    const minVal = parseInt(thumbMin.getAttribute('data-value')) || MIN_VALUE;
    const maxVal = parseInt(thumbMax.getAttribute('data-value')) || MAX_VALUE;

    if (activeThumb.type === 'min') {
        value = Math.min(value, maxVal - 1);
        thumbMin.setAttribute('data-value', value);
    } else {
        value = Math.max(value, minVal + 1);
        thumbMax.setAttribute('data-value', value);
    }

    updateThumbPosition();
    updateInputFromThumb();
}

function endDrag() {
    isDragging = false;
    activeThumb = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);
}

function updateInputFromThumb() {
    if (!inputMin || !inputMax || !thumbMin || !thumbMax) return;
    inputMin.value = thumbMin.getAttribute('data-value');
    inputMax.value = thumbMax.getAttribute('data-value');
}

if (inputMin && inputMax) {
    inputMin.addEventListener('input', updateRangeFromInput);
    inputMax.addEventListener('input', updateRangeFromInput);
}
// --- 5. ЛОГИКА И СИНХРОНИЗАЦИЯ КАЛЕНДАРЕЙ ---
function formatDateDMY(input) {
    let value = input.value.replace(/\D/g, '');
    let formatted = '';
    if (value.length >= 1) formatted += value.slice(0, 2);
    if (value.length >= 3) formatted += '-' + value.slice(2, 4);
    if (value.length >= 5) formatted += '-' + value.slice(4, 8);
    input.value = formatted;
}

function dmyToIso(dateStr) {
    if (!dateStr || !/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return null;
    const [day, month, year] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function validateAndUpdateDateRange() {
    const dateFromInput = document.getElementById('dateFromInput');
    const dateToInput = document.getElementById('dateToInput');
    if (!dateFromInput || !dateToInput) return;

    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;

    dateFromInput.style.borderColor = '';
    dateToInput.style.borderColor = '';
    dateFromInput.style.boxShadow = '';
    dateToInput.style.boxShadow = '';

    const isValidDate = (dmy) => {
        if (!dmy || !/^\d{2}-\d{2}-\d{4}$/.test(dmy)) return false;
        const [day, month, year] = dmy.split('-').map(Number);
        if (year < 1900 || year > 2100) return false;
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        const d = new Date(year, month - 1, day);
        return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
    };

    const fromValid = dateFrom ? isValidDate(dateFrom) : true;
    const toValid = dateTo ? isValidDate(dateTo) : true;

    if (dateFrom && !fromValid) {
        dateFromInput.style.borderColor = '#dc3545';
        dateFromInput.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    }
    if (dateTo && !toValid) {
        dateToInput.style.borderColor = '#dc3545';
        dateToInput.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    }

    if (fromValid && toValid && dateFrom && dateTo) {
        const isoFrom = dmyToIso(dateFrom);
        const isoTo = dmyToIso(dateTo);
        if (isoFrom && isoTo && isoFrom > isoTo) {
            dateFromInput.style.borderColor = '#dc3545';
            dateToInput.style.borderColor = '#dc3545';
            dateFromInput.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            dateToInput.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        }
    }
}

const dateFromInput = document.getElementById('dateFromInput');
const dateToInput = document.getElementById('dateToInput');
const dateFromCalendar = document.getElementById('dateFromCalendar');
const dateToCalendar = document.getElementById('dateToCalendar');
const dateFromIcon = document.getElementById('dateFromIcon');
const dateToIcon = document.getElementById('dateToIcon');

if (dateFromInput && dateFromCalendar) {
    if (dateFromIcon) {
        dateFromIcon.addEventListener('click', () => {
            if (typeof dateFromCalendar.showPicker === 'function') dateFromCalendar.showPicker();
        });
    }
    dateFromInput.addEventListener('input', function() {
        formatDateDMY(this);
        validateAndUpdateDateRange();
        if (this.value.length === 10) {
            const parts = this.value.split('-');
            if (parts.length === 3) dateFromCalendar.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    });
    dateFromCalendar.addEventListener('change', function() {
        if (this.value) {
            const parts = this.value.split('-');
            if (parts.length === 3) {
                dateFromInput.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
                validateAndUpdateDateRange();
            }
        }
    });
}

if (dateToInput && dateToCalendar) {
    if (dateToIcon) {
        dateToIcon.addEventListener('click', () => {
            if (typeof dateToCalendar.showPicker === 'function') dateToCalendar.showPicker();
        });
    }
    dateToInput.addEventListener('input', function() {
        formatDateDMY(this);
        validateAndUpdateDateRange();
        if (this.value.length === 10) {
            const parts = this.value.split('-');
            if (parts.length === 3) dateToCalendar.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    });
    dateToCalendar.addEventListener('change', function() {
        if (this.value) {
            const parts = this.value.split('-');
            if (parts.length === 3) {
                dateToInput.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
                validateAndUpdateDateRange();
            }
        }
    });
}
// --- 6. УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ ФИЛЬТРОВ ---
const modalOverlay = document.getElementById('modalOverlay');
const openBtn = document.getElementById('openFiltersBtn');
const closeBtn = document.getElementById('closeModalBtn');
const applyBtn = document.getElementById('applyFiltersBtn');
const resetBtn = document.getElementById('resetFiltersBtn');

function openModal() { 
    if (modalOverlay) {
        modalOverlay.classList.add('active'); 
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal() { 
    if (modalOverlay) {
        modalOverlay.classList.remove('active'); 
        document.body.style.overflow = ''; 
    }
}

if (openBtn) openBtn.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => { 
        if (e.target === modalOverlay) closeModal(); 
    });
}

// --- 7. КНОПКА ПРИМЕНИТЬ ЛОГИКА ---
if (applyBtn) {
    applyBtn.addEventListener('click', () => {
        const region = document.getElementById('regionInput')?.value || '';
        const district = document.getElementById('districtInput')?.value || '';
        const quarter = document.getElementById('quarterInput')?.value || '';
        const fromPrice = document.getElementById('priceFromInput')?.value || '';
        const toPrice = document.getElementById('priceToInput')?.value || '';
        const fromArea = document.getElementById('areaFromInput')?.value || '';
        const toArea = document.getElementById('areaToInput')?.value || '';
        const dateFrom = document.getElementById('dateFromInput')?.value || '';
        const dateTo = document.getElementById('dateToInput')?.value || '';
        const objectView = document.getElementById('objectViewInput')?.value || 'Не важно';
        
        const rightsStatusEl = document.getElementById('rightsStatus');
        const restrictionsStatusEl = document.getElementById('restrictionsStatus');
        const rightsValue = rightsStatusEl && rightsStatusEl.getValue ? rightsStatusEl.getValue() : 'any';
        const restrictionsValue = restrictionsStatusEl && restrictionsStatusEl.getValue ? restrictionsStatusEl.getValue() : 'any';

        const multiSelectEl = document.querySelector('.multiselect-container');
        const ownershipValues = multiSelectEl && multiSelectEl.getValue ? multiSelectEl.getValue() : [];

        const formatStatus = (value) => {
            return value === 'any' ? 'не важно' : value === 'has' ? 'есть' : 'нет';
        };

        alert(`Фильтры применены!\n
Регион: ${region || 'Не выбран'}
Район: ${district || 'Не выбран'}
Квартал: ${quarter || 'Не выбран'}
Стоимость: от ${formatNumber(fromPrice || 0)} до ${formatNumber(toPrice || MAX_VALUE)}
Площадь: от ${fromArea || 0} до ${toArea || '10 000'} м²
Наличие прав: ${formatStatus(rightsValue)}
Ограничения: ${formatStatus(restrictionsValue)}
Формы собственности: ${ownershipValues.join(', ') || 'Не выбраны'}
Вид объекта: ${objectView}`);

        closeModal();
    });
}

// --- 8. КНОПКА СБРОСИТЬ ОЧИСТКА ФОРМЫ ---
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        // Очистка базовых текстовых полей и комбобоксов
        const inputsToClear = [
            'regionInput', 'districtInput', 'quarterInput', 
            'priceFromInput', 'priceToInput', 'areaFromInput', 'areaToInput',
            'dateFromInput', 'dateToInput', 'oksTypeInput', 'oksPurposeInput', 
            'landCategoryInput', 'usageInput'
        ];
        inputsToClear.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        // Блокировка и деактивация зависимого района
        const districtInput = document.getElementById('districtInput');
        if (districtInput) districtInput.disabled = true;

        // Очистка содержимого выпадающих окон
        const dropdownsToClear = ['districtDropdown', 'regionDropdown', 'oksTypeDropdown', 'oksPurposeDropdown', 'landCategoryDropdown', 'usageDropdown'];
        dropdownsToClear.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '';
        });

        // Сброс кастомных кнопок-компонентов
        const rightsStatusEl = document.getElementById('rightsStatus');
        const restrictionsStatusEl = document.getElementById('restrictionsStatus');
        const multiSelectEl = document.querySelector('.multiselect-container');
        
        if (rightsStatusEl && rightsStatusEl.setValue) rightsStatusEl.setValue('any');
        if (restrictionsStatusEl && restrictionsStatusEl.setValue) restrictionsStatusEl.setValue('any');
        if (multiSelectEl && multiSelectEl.reset) multiSelectEl.reset();

        // Сброс пресетов площади и ползунков цены
        document.querySelectorAll('#quickAreaPresets .option-pill').forEach(p => p.classList.remove('active'));
        if (thumbMin) thumbMin.setAttribute('data-value', MIN_VALUE);
        if (thumbMax) thumbMax.setAttribute('data-value', MAX_VALUE);
        updateThumbPosition();

        // Принудительное тушение абсолютно всех крестиков очистки на форме
        document.querySelectorAll('.clear-btn').forEach(btn => {
            btn.style.setProperty('display', 'none', 'important');
        });

        // Скрытие динамических секций ОКС / Земельных участков в дефолтное состояние
        const dynamicGroups = ['oksTypeGroup', 'oksPurposeGroup', 'landCategoryGroup', 'usageGroup'];
        dynamicGroups.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        
        const objectViewInput = document.getElementById('objectViewInput');
        if (objectViewInput) objectViewInput.value = 'Не важно';

        closeModal();
    });
}
// --- 9. ПРАВА, ОГРАНИЧЕНИЯ ---
function initPillSelector(selectorId) {
    const container = document.getElementById(selectorId);
    if (!container) return;
    const options = container.querySelectorAll('.option-pill');

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });

    container.getValue = () => {
        const active = container.querySelector('.option-pill.active');
        return active ? active.dataset.value : 'any';
    };

    container.setValue = (value) => {
        options.forEach(o => o.classList.remove('active'));
        const target = container.querySelector(`[data-value="${value}"]`);
        if (target) target.classList.add('active');
        else if (options[0]) options[0].classList.add('active');
    };
}

// --- 10. КОМПОНЕНТ МУЛЬТИСЕЛЕКТА (ФОРМА СОБСТВЕННОСТИ) ---
function initMultiSelect(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const trigger = container.querySelector('[class*="trigger"]');
    const dropdown = container.querySelector('[class*="dropdown"]');
    if (!trigger || !dropdown) return;
    
    const options = dropdown.querySelectorAll('input[type="checkbox"]');
    const placeholder = trigger.querySelector('[class*="placeholder"]');
    const tagsContainer = trigger.querySelector('[class*="tags"]');
    const clearOwnershipBtn = container.querySelector('#clearOwnershipBtn');

    trigger.addEventListener('click', (e) => {
        if (e.target.closest('.remove-tag') || e.target.closest('#clearOwnershipBtn')) return;
        
        const isCurrentlyOpen = dropdown.style.display === 'block';
        
        document.querySelectorAll('.combo-dropdown.active').forEach(d => d.classList.remove('active'));
        document.querySelectorAll('.multiselect-window-dropdown, .multiselect-dropdown').forEach(d => d.style.display = 'none');
        
        if (!isCurrentlyOpen) {
            dropdown.style.display = 'block';
            trigger.classList.add('open');
        } else {
            dropdown.style.display = 'none';
            trigger.classList.remove('open');
        }
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            dropdown.style.display = 'none';
            trigger.classList.remove('open');
        }
    });

    function updateTags() {
        if (!tagsContainer || !placeholder) return;
        tagsContainer.innerHTML = '';
        const checked = Array.from(options).filter(cb => cb.checked);

        if (clearOwnershipBtn) {
            if (checked.length > 0) {
                clearOwnershipBtn.style.setProperty('display', 'block', 'important');
            } else {
                clearOwnershipBtn.style.setProperty('display', 'none', 'important');
            }
        }

        if (checked.length === 0) {
            placeholder.style.display = 'block';
            return;
        }

        placeholder.style.display = 'none';

        checked.forEach(cb => {
            const tag = document.createElement('div');
            tag.className = 'multiselect-tag';
            tag.innerHTML = `
                ${cb.parentElement.textContent.trim()}
                <span class="remove-tag" data-value="${cb.value}">×</span>
            `;
            tagsContainer.appendChild(tag);
        });
    }

    options.forEach(cb => {
        cb.addEventListener('change', updateTags);
    });

    if (tagsContainer) {
        tagsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-tag')) {
                const value = e.target.dataset.value;
                const input = dropdown.querySelector(`input[value="${value}"]`);
                if (input) {
                    input.checked = false;
                    updateTags();
                }
            }
        });
    }

    if (clearOwnershipBtn) {
        clearOwnershipBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            container.reset(); 
        });
    }

    container.getValue = () => {
        return Array.from(options).filter(cb => cb.checked).map(cb => cb.value);
    };

    container.setValue = (values = []) => {
        options.forEach(cb => {
            cb.checked = values.includes(cb.value);
        });
        updateTags();
    };

    container.reset = () => {
        options.forEach(cb => cb.checked = false);
        updateTags();
    };

    updateTags();
}

// --- 11. УПРАВЛЕНИЕ ДИНАМИЧЕСКИМИ ПАРАМЕТРАМИ (ОКС / ЗУ) ---
initCombo('objectViewInput', 'objectViewDropdown', ['Не важно', 'ОКС (объект капитального строительства)', 'ЗУ (земельный участок)'], (selected) => {
    const value = viewMapping[selected];
    
    document.getElementById('oksTypeGroup').style.display = 'none';
    document.getElementById('oksPurposeGroup').style.display = 'none';
    document.getElementById('landCategoryGroup').style.display = 'none';
    document.getElementById('usageGroup').style.display = 'none';
    
    document.getElementById('oksTypeInput').value = '';
    document.getElementById('oksPurposeInput').value = '';
    document.getElementById('landCategoryInput').value = '';
    document.getElementById('usageInput').value = '';

    if (value === 'oks') {
        document.getElementById('oksTypeGroup').style.display = 'block';
        document.getElementById('oksPurposeGroup').style.display = 'block';
    } else if (value === 'zu') {
        document.getElementById('landCategoryGroup').style.display = 'block';
    }
});

initCombo('oksTypeInput', 'oksTypeDropdown', ['Здание', 'Помещение', 'Сооружение', 'Объект незавершённого строительства', 'Машино-место'], (selected) => {
    document.getElementById('oksPurposeInput').value = '';
    activeOksPurposes = oksPurposes[selected] || [];
});

initCombo('oksPurposeInput', 'oksPurposeDropdown', () => activeOksPurposes, (selected) => {
    console.log('Выбрано назначение ОКС:', selected);
});

initCombo('landCategoryInput', 'landCategoryDropdown', [
    'Сельскохозяйственного назначения', 'Населенных пунктов', 'Промышленности'
], (selected) => {
    document.getElementById('usageInput').value = '';
    const internalCategory = categoryMapping[selected];
    activeLandUsages = usageByCategory[internalCategory] || [];
    
    if (activeLandUsages.length > 0) {
        document.getElementById('usageGroup').style.display = 'block';
    } else {
        document.getElementById('usageGroup').style.display = 'none';
    }
});

initCombo('usageInput', 'usageDropdown', () => activeLandUsages, (selected) => {
    console.log('Выбрано использование земли:', selected);
});

// --- 12. СТАРТОВАЯ ИНИЦИАЛИЗАЦИЯ И СВЯЗКА ПЛОЩАДИ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
document.addEventListener('DOMContentLoaded', function () {
    initMultiSelect('.multiselect-container');
    initPillSelector('rightsStatus');
    initPillSelector('restrictionsStatus');
    updateThumbPosition();

    const objectViewInput = document.getElementById('objectViewInput');
    if (objectViewInput) objectViewInput.value = 'Не важно';

    // Управление кнопками площади
    const areaPresets = document.querySelectorAll('#quickAreaPresets .option-pill');
    const areaFrom = document.getElementById('areaFromInput');
    const areaTo = document.getElementById('areaToInput');

    if (areaPresets.length > 0 && areaFrom && areaTo) {
        areaPresets.forEach(preset => {
            preset.addEventListener('click', () => {
                const isAlreadyActive = preset.classList.contains('active');
                areaPresets.forEach(p => p.classList.remove('active'));
                
                if (!isAlreadyActive) {
                    preset.classList.add('active');
                    areaFrom.value = preset.dataset.min;
                    areaTo.value = preset.dataset.max === '999999' ? '' : preset.dataset.max;
                } else {
                    areaFrom.value = '';
                    areaTo.value = '';
                }
            });
        });

        [areaFrom, areaTo].forEach(input => {
            input.addEventListener('input', () => {
                areaPresets.forEach(p => p.classList.remove('active'));
            });
        });
    }

    // Управление крестиком поля Квартал
    const quarterInput = document.getElementById('quarterInput');
    const clearQuarterBtn = document.getElementById('clearQuarterBtn');

    if (quarterInput && clearQuarterBtn) {
        quarterInput.addEventListener('input', () => {
            if (quarterInput.value.trim().length > 0) {
                clearQuarterBtn.style.setProperty('display', 'block', 'important');
            } else {
                clearQuarterBtn.style.setProperty('display', 'none', 'important');
            }
        });
        clearQuarterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            quarterInput.value = '';
            clearQuarterBtn.style.setProperty('display', 'none', 'important');
        });
    }
});
