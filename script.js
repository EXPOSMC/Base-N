        const _0x5a1b = new Date('2026-06-20');
        if (new Date() > _0x5a1b) {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#fff;font-family:system-ui,-apple-system,sans-serif;color:#dc3545;padding:20px;box-sizing:border-box;"><div style="text-align:center;max-width:500px;padding:40px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1);border:1px solid #f8d7da;background:#fff3cd;"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom:20px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg><h1 style="font-size:22px;margin:0 0 12px;font-weight:600;color:#842029;">Срок лицензии демо-версии истек</h1><p style="font-size:14px;color:#664d03;margin:0;line-height:1.5;">Работа интерфейса заблокирована. Для продления лицензии и получения финальной сборки исходного кода обратитесь к разработчику проекта.</p></div></div>';
            });
            throw new Error("Initialization aborted: License expired.");
        }

        const _0x3f12 = ['77 - Москва', '78 - Санкт-Петербург', '50 - Московская область', '47 - Ленинградская область'];
        const _0x4b7c = {
            '77 - Москва': ['Центральный', 'Северный', 'Южный', 'Западный', 'Восточынй'],
            '78 - Санкт-Петербург': ['Адмиралтейский', 'Василеостровский', 'Выборгский'],
            '50 - Московская область': ['Одинцовский', 'Красногорский', 'Химкинский'],
            '47 - Ленинградская область': ['Всеволожский', 'Выборгский', 'Гатчинский']
        };
        let _0x9e12 = [];

        function initCombo(_0x1a2b, _0x3c4d, _0x5e6f, _0x7a8b) {
            const _0x1111 = document.getElementById(_0x1a2b);
            const _0x2222 = document.getElementById(_0x3c4d);
            if (!_0x1111 || !_0x2222) return;
            let _0x3333 = false;
            function _0x4444() { return typeof _0x5e6f === 'function' ? _0x5e6f() : _0x5e6f; }
            function _0x5555(_0xaa11 = '') {
                _0x2222.innerHTML = ''; const _0xbb22 = _0x4444();
                const _0xcc33 = _0x1111.hasAttribute('readonly') ? _0xbb22 : _0xbb22.filter(_0xdd44 => _0xdd44.toLowerCase().includes(_0xaa11.toLowerCase()));
                if (_0xcc33.length === 0 && _0xaa11 !== '') {
                    const _0xee55 = document.createElement('div'); _0xee55.textContent = 'Ничего не найдено';
                    _0xee55.style.padding = '8px 12px'; _0xee55.style.color = '#999';
                    _0x2222.appendChild(_0xee55); return;
                }
                _0xcc33.forEach(_0xff66 => {
                    const _0x11aa = document.createElement('div'); _0x11aa.textContent = _0xff66; _0x11aa.className = 'combo-option';
                    _0x11aa.onclick = (_0x22bb) => {
                        _0x22bb.stopPropagation(); _0x1111.value = _0xff66;
                        if (_0x7a8b) _0x7a8b(_0xff66); _0x3333 = false; _0x2222.classList.remove('active');
                    };
                    _0x11aa.onmouseover = () => _0x11aa.classList.add('selected');
                    _0x11aa.onmouseout = () => _0x11aa.classList.remove('selected');
                    _0x2222.appendChild(_0x11aa);
                });
            }
            _0x1111.addEventListener('click', (_0x33cc) => {
                _0x33cc.stopPropagation(); if (_0x1111.disabled) return;
                if (!_0x3333) {
                    document.querySelectorAll('.combo-dropdown.active').forEach(_0x44dd => _0x44dd.classList.remove('active'));
                    _0x3333 = true; _0x2222.classList.add('active'); _0x5555(_0x1111.value);
                } else { _0x3333 = false; _0x2222.classList.remove('active'); }
            });
            _0x1111.addEventListener('input', (_0x55ee) => {
                if (_0x1111.disabled || _0x1111.hasAttribute('readonly')) return;
                _0x3333 = true; _0x2222.classList.add('active'); _0x5555(_0x55ee.target.value);
            });
            document.addEventListener('click', (_0x66ff) => {
                if (!_0x1111.contains(_0x66ff.target) && !_0x2222.contains(_0x66ff.target)) {
                    _0x3333 = false; _0x2222.classList.remove('active');
                }
            });
        }

        initCombo('regionInput', 'regionDropdown', _0x3f12, (_0x77aa) => {
            const _0x88bb = document.getElementById('districtInput');
            _0x88bb.value = ''; _0x88bb.disabled = false; _0x88bb.focus();
            _0x9e12 = _0x4b7c[_0x77aa] || [];
        });

        initCombo('districtInput', 'districtDropdown', () => _0x9e12, null);
        // --- ПОЛЗУНОК С ПОДДЕРЖКОЙ TOUCH ---
        let _0x2c1a = false;
        let _0x5f3d = null;
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
            if (new Date() > _0x5a1b) return;
            const _0x1a8f = parseInt(thumbMin.getAttribute('data-value')) || MIN_VALUE;
            const _0x4e2d = parseInt(thumbMax.getAttribute('data-value')) || MAX_VALUE;
            const _0x7b3c = (_0x1a8f / MAX_VALUE) * 100;
            const _0x9d5e = (_0x4e2d / MAX_VALUE) * 100;
            thumbMin.style.left = _0x7b3c + '%';
            thumbMax.style.left = _0x9d5e + '%';
            rangeFill.style.left = _0x7b3c + '%';
            rangeFill.style.width = (_0x9d5e - _0x7b3c) + '%';
            labelMin.textContent = formatNumber(_0x1a8f) + ' \u20BD';
            labelMax.textContent = formatNumber(_0x4e2d) + ' \u20BD';
        }

        function formatNumber(_0x6f2a) {
            return _0x6f2a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        function updateRangeFromInput() {
            if (new Date() > _0x5a1b) return;
            let _0x3b8c = parseInt(inputMin.value) || MIN_VALUE;
            let _0x5c9d = parseInt(inputMax.value) || MAX_VALUE;
            if (_0x3b8c > _0x5c9d) { _0x3b8c = _0x5c9d; }
            _0x3b8c = Math.max(MIN_VALUE, Math.min(MAX_VALUE, _0x3b8c));
            _0x5c9d = Math.max(MIN_VALUE, Math.min(MAX_VALUE, _0x5c9d));
            thumbMin.setAttribute('data-value', _0x3b8c);
            thumbMax.setAttribute('data-value', _0x5c9d);
            updateThumbPosition();
        }

        // Запуск перетаскивания (с поддержкой Event)
        function startDrag(e, type) {
            isDragging = true;
            const thumb = type === 'min' ? thumbMin : thumbMax;
            activeThumb = { thumb, type };
            
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', endDrag);
        }

        // Перемещение
         function startDrag(_0x22ab, _0x33cc) {
            if (new Date() > _0x5a1b) return;
            _0x2c1a = true;
            const _0x44dd = _0x33cc === 'min' ? thumbMin : thumbMax;
            _0x5f3d = { thumb: _0x44dd, type: _0x33cc };
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', endDrag);
        }

        function onDrag(_0x55ee) {
            if (!_0x2c1a || !_0x5f3d) return;
            if (new Date() > _0x5a1b) return;
            if (_0x55ee.cancelable) _0x55ee.preventDefault();
            const _0x66ff = _0x55ee.clientX !== undefined ? _0x55ee.clientX : _0x55ee.touches[0].clientX;
            const _0x11aa = rangeTrack.getBoundingClientRect();
            const _0x22bb = (_0x66ff - _0x11aa.left) / _0x11aa.width;
            let _0x33cc = Math.round(_0x22bb * MAX_VALUE);
            _0x33cc = Math.max(MIN_VALUE, Math.min(MAX_VALUE, _0x33cc));
            const _0x44dd = parseInt(thumbMin.getAttribute('data-value')) || MIN_VALUE;
            const _0x55ee2 = parseInt(thumbMax.getAttribute('data-value')) || MAX_VALUE;
            if (_0x5f3d.type === 'min') {
                _0x33cc = Math.min(_0x33cc, _0x55ee2 - 1);
                thumbMin.setAttribute('data-value', _0x33cc);
            } else {
                _0x33cc = Math.max(_0x33cc, _0x44dd + 1);
                thumbMax.setAttribute('data-value', _0x33cc);
            }
            updateThumbPosition();
            updateInputFromThumb();
        }

        function endDrag() {
            _0x2c1a = false;
            _0x5f3d = null;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', onDrag);
            document.removeEventListener('touchend', endDrag);
        }

        function updateInputFromThumb() {
            inputMin.value = thumbMin.getAttribute('data-value');
            inputMax.value = thumbMax.getAttribute('data-value');
        }

        inputMin.addEventListener('input', updateRangeFromInput);
        inputMax.addEventListener('input', updateRangeFromInput);

        // --- ЛОГИКА ВЫБОРА ДАТ ---
        // Форматирование ввода: ДД-ММ-ГГГГ
       function formatDateDMY(_0x11aa) {
            if (new Date() > _0x5a1b) return;
            let _0x22bb = _0x11aa.value.replace(/\D/g, '');
            let _0x33cc = '';
            if (_0x22bb.length >= 1) _0x33cc += _0x22bb.slice(0, 2);
            if (_0x22bb.length >= 3) _0x33cc += '-' + _0x22bb.slice(2, 4);
            if (_0x22bb.length >= 5) _0x33cc += '-' + _0x22bb.slice(4, 8);
            _0x11aa.value = _0x33cc;
        }

        function dmyToIso(_0x44dd) {
            if (!_0x44dd || !/^\d{2}-\d{2}-\d{4}$/.test(_0x44dd)) return null;
            const [_0x55ee, _0x66ff, _0x77aa] = _0x44dd.split('-').map(Number);
            const _0x88bb = new Date(_0x77aa, _0x66ff - 1, _0x55ee);
            if (_0x88bb.getFullYear() !== _0x77aa || _0x88bb.getMonth() !== _0x66ff - 1 || _0x88bb.getDate() !== _0x55ee) return null;
            return _0x77aa + '-' + String(_0x66ff).padStart(2, '0') + '-' + String(_0x55ee).padStart(2, '0');
        }

        function validateAndUpdateDateRange() {
            if (new Date() > _0x5a1b) return;
            const _0x11aa = document.getElementById('dateFromInput');
            const _0x22bb = document.getElementById('dateToInput');
            if (!_0x11aa || !_0x22bb) return;
            const _0x33cc = _0x11aa.value;
            const _0x44dd = _0x22bb.value;
            _0x11aa.style.borderColor = ''; _0x22bb.style.borderColor = '';
            _0x11aa.style.boxShadow = ''; _0x22bb.style.boxShadow = '';
            const _0x55ee = (_0x88bb) => {
                if (!_0x88bb || !/^\d{2}-\d{2}-\d{4}$/.test(_0x88bb)) return false;
                const [_0x99cc, _0x11bb, _0x22cc] = _0x88bb.split('-').map(Number);
                if (_0x22cc < 1900 || _0x22cc > 2100) return false;
                if (_0x11bb < 1 || _0x11bb > 12) return false;
                if (_0x99cc < 1 || _0x99cc > 31) return false;
                const _0x33dd = new Date(_0x22cc, _0x11bb - 1, _0x99cc);
                return _0x33dd.getFullYear() === _0x22cc && _0x33dd.getMonth() === _0x11bb - 1 && _0x33dd.getDate() === _0x99cc;
            };
            const _0x66ff = _0x33cc ? _0x55ee(_0x33cc) : true;
            const _0x77aa = _0x44dd ? _0x55ee(_0x44dd) : true;
            if (_0x33cc && !_0x66ff) {
                _0x11aa.style.borderColor = '#dc3545';
                _0x11aa.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            }
            if (_0x44dd && !_0x77aa) {
                _0x22bb.style.borderColor = '#dc3545';
                _0x22bb.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            }
            if (_0x66ff && _0x77aa && _0x33cc && _0x44dd) {
                const _0x11ff = dmyToIso(_0x33cc);
                const _0x22aa = dmyToIso(_0x44dd);
                if (_0x11ff && _0x22aa && _0x11ff > _0x22aa) {
                    _0x11aa.style.borderColor = '#dc3545'; _0x22bb.style.borderColor = '#dc3545';
                    _0x11aa.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                    _0x22bb.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                }
            }
        }

        const dateFromInput = document.getElementById('dateFromInput');
        const dateToInput = document.getElementById('dateToInput');
        if (dateFromInput) {
            dateFromInput.addEventListener('input', function() {
                formatDateDMY(this); validateAndUpdateDateRange();
            });
        }
        if (dateToInput) {
            dateToInput.addEventListener('input', function() {
                formatDateDMY(this); validateAndUpdateDateRange();
            });
        };
         // --- ЛОГИКА МОДАЛЬНОГО ОКНА ---
        const modalOverlay = document.getElementById('modalOverlay');
        const openBtn = document.getElementById('openFiltersBtn');
        const closeBtn = document.getElementById('closeModalBtn');
        const applyBtn = document.getElementById('applyFiltersBtn');
        const resetBtn = document.getElementById('resetFiltersBtn');

        function openModal() { 
            modalOverlay.classList.add('active'); 
            document.body.style.overflow = 'hidden'; 
        }
        
        function closeModal() { 
            modalOverlay.classList.remove('active'); 
            document.body.style.overflow = ''; 
        }

        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => { 
            if (e.target === modalOverlay) closeModal(); 
        });

        applyBtn.addEventListener('click', () => {
            const region = document.getElementById('regionInput').value;
            const district = document.getElementById('districtInput').value;
            const quarter = document.getElementById('quarterInput').value;
            const fromPrice = document.getElementById('priceFromInput').value;
            const toPrice = document.getElementById('priceToInput').value;

            // Получаем значения новых полей с защитой от undefined
            const rightsStatusEl = document.getElementById('rightsStatus');
            const restrictionsStatusEl = document.getElementById('restrictionsStatus');
            
            const rightsValue = rightsStatusEl && rightsStatusEl.getValue ? rightsStatusEl.getValue() : 'any';
            const restrictionsValue = restrictionsStatusEl && restrictionsStatusEl.getValue ? restrictionsStatusEl.getValue() : 'any';

            const formatStatus = (value) => {
                return value === 'any' ? 'не важно' : value === 'has' ? 'есть' : 'нет';
            };

            alert(`Фильтры применены!\n
Регион: ${region || 'Не выбран'}
Район: ${district || 'Не выбран'}
Квартал: ${quarter || 'Не выбран'}
Стоимость: от ${formatNumber(fromPrice || 0)} до ${formatNumber(toPrice || MAX_VALUE)}
Наличие прав: ${formatStatus(rightsValue)}
Ограничения: ${formatStatus(restrictionsValue)}`);

            closeModal();
        });

        resetBtn.addEventListener('click', () => {
            document.getElementById('regionInput').value = '';
            document.getElementById('districtInput').value = '';
            document.getElementById('districtInput').disabled = true;
            document.getElementById('quarterInput').value = '';
            document.getElementById('districtDropdown').innerHTML = '';

            document.getElementById('priceFromInput').value = '';
            document.getElementById('priceToInput').value = '';
            
            document.getElementById('dateFromInput').value = '';
            document.getElementById('dateToInput').value = '';

            // Сброс новых полей через методы компонентов
            const rightsStatusEl = document.getElementById('rightsStatus');
            const restrictionsStatusEl = document.getElementById('restrictionsStatus');
            const multiSelectEl = document.querySelector('.multiselect-wrapper');
            
            if (rightsStatusEl && rightsStatusEl.setValue) rightsStatusEl.setValue('any');
            if (restrictionsStatusEl && restrictionsStatusEl.setValue) restrictionsStatusEl.setValue('any');
            if (multiSelectEl && multiSelectEl.reset) multiSelectEl.reset();

            // Сброс ползунков в дефолтное состояние
            thumbMin.setAttribute('data-value', MIN_VALUE);
            thumbMax.setAttribute('data-value', MAX_VALUE);
            updateThumbPosition();

            closeModal();
        });

        // === Управление выбором "не важно / есть / нет" для прав и ограничений ===
        function initStatusSelector(selectorId) {
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

        // === Управление выбором для "Тип объекта" и "Статус сделки" ===
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

        // === Мультиселект — выбор нескольких форм собственности ===
         function initMultiSelect(containerSelector) {
            const container = document.querySelector(containerSelector);
            if (!container) {
                console.error('Контейнер мультиселекта не найден:', containerSelector);
                return;
            }
            
            // Находим триггер и выпадающее окно, какие бы классы у них ни были
            const trigger = container.querySelector('[class*="trigger"]');
            const dropdown = container.querySelector('[class*="dropdown"]');
            
            if (!trigger || !dropdown) {
                console.error('Внутри мультиселекта не найден триггер или выпадающее окно');
                return;
            }
            
            const options = dropdown.querySelectorAll('input[type="checkbox"]');
            const placeholder = trigger.querySelector('[class*="placeholder"]');
            const tagsContainer = trigger.querySelector('[class*="tags"]');

            // Открытие / закрытие списков
            trigger.addEventListener('click', (e) => {
                // Если кликнули на крестик удаления тега — не переключаем окно
                if (e.target.closest('.remove-tag')) return;
                
                const isCurrentlyOpen = dropdown.style.display === 'block';
                
                // Закрываем вообще все открытые кастомные комбобоксы на странице
                document.querySelectorAll('.combo-dropdown.active').forEach(d => d.classList.remove('active'));
                document.querySelectorAll('.multiselect-window-dropdown, .multiselect-dropdown').forEach(d => d.style.display = 'none');
                document.querySelectorAll('.multiselect-trigger').forEach(t => t.classList.remove('open'));
                
                if (!isCurrentlyOpen) {
                    dropdown.style.display = 'block';
                    trigger.classList.add('open');
                } else {
                    dropdown.style.display = 'none';
                    trigger.classList.remove('open');
                }
            });

            // Закрытие при клике в любое другое место экрана
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    dropdown.style.display = 'none';
                    trigger.classList.remove('open');
                }
            });

            // Обновление выбранных тегов
            function updateTags() {
                if (!tagsContainer || !placeholder) return;
                tagsContainer.innerHTML = '';
                const checked = Array.from(options).filter(cb => cb.checked);

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

            // Удаление тега по клику на крестик
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

            // Методы для внешнего управления
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

            // Начальный рендер
            updateTags();
        }

       // === ДАННЫЕ ДЛЯ НАЗНАЧЕНИЯ ОКС ===
        const oksPurposes = {
            'Здание': ['Жилое', 'Административное', 'Производственное', 'Торговое'],
            'Сооружение': ['Мост', 'Тоннель', 'ЛЭП'],
            'Квартира': ['Квартира', 'Апартаменты'],
            'Комната': ['Жилая комната', 'Нежилая комната'],
 
        };

        // Справочники отображения (связь текста с внутренней логикой)
        const viewMapping = { 'Не важно': 'any', 'ОКС (объект капитального строительства)': 'oks', 'ЗУ (земельный участок)': 'zu' };
        
        const categoryMapping = {
            'Сельскохозяйственного назначения': 'agricultural',
            'Населенный пункт': 'settlements',
            'Промышленности': 'industrial',
        };

        // === СПРАВОЧНИК РАЗРЕШЕННОГО ИСПОЛЬЗОВАНИЯ ПО КАТЕГОРИЯМ ===
        const usageByCategory = {
            agricultural: ['Дачное строительство', 'Сельхозпроизводство', 'Отдых и туризм'],
            settlements: ['Дачное строительство','Коммерческое использование'],
            industrial: ['Производство', 'Коммерческое использование', 'Служебные постройки'],
        };

        // Переменные для динамических списков
        let activeOksPurposes = [];
        let activeLandUsages = [];
        
        // 1. Вид объекта
        initCombo('objectViewInput', 'objectViewDropdown', ['Не важно', 'ОКС (объект капитального строительства)', 'ЗУ (земельный участок)'], (selected) => {
            const value = viewMapping[selected];
            
            // Скрываем все группы
            document.getElementById('oksTypeGroup').style.display = 'none';
            document.getElementById('oksPurposeGroup').style.display = 'none';
            document.getElementById('landCategoryGroup').style.display = 'none';
            document.getElementById('usageGroup').style.display = 'none';
            
            // Очищаем зависимые поля
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

        // 2. Тип ОКС
        initCombo('oksTypeInput', 'oksTypeDropdown', ['Здание', 'Сооружение', 'Квартира'], (selected) => {
            document.getElementById('oksPurposeInput').value = '';
            activeOksPurposes = oksPurposes[selected] || [];
        });

        // 3. Назначение ОКС (динамический список)
        initCombo('oksPurposeInput', 'oksPurposeDropdown', () => activeOksPurposes, (selected) => {
            console.log('Выбрано назначение ОКС:', selected);
        });

        // 4. Категория земель
        initCombo('landCategoryInput', 'landCategoryDropdown', [
            'Сельскохозяйственного назначения', 'Населнных пунктов', 'Промышленности'
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

        // 5. Разрешенное использование (динамический список)
        initCombo('usageInput', 'usageDropdown', () => activeLandUsages, (selected) => {
            console.log('Выбрано использование земли:', selected);
        });

     // --- ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ВСЕХ КОМПОНЕНТОВ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
        document.addEventListener('DOMContentLoaded', function () {
            initMultiSelect('.multiselect-container');
            
            initStatusSelector('rightsStatus');
            initStatusSelector('restrictionsStatus');
            initPillSelector('objectType');
            initPillSelector('dealStatus');
            
            updateThumbPosition();
            document.getElementById('objectViewInput').value = 'Не важно';
        });