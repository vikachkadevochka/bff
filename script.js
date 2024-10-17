document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    // Страница для ввода пароля
    if (currentPath.endsWith('login.html')) {
        const loginButton = document.getElementById('login-button');
        const passwordInput = document.getElementById('password');
        const errorMessage = document.getElementById('error-message');

        loginButton.addEventListener('click', () => {
            if (passwordInput.value === '372') {
                window.location.href = 'main.html'; // Переход на главную страницу
            } else {
                errorMessage.classList.remove('hidden'); // Показать сообщение об ошибке
            }
        });
    }

    // Главная страница
    if (currentPath.endsWith('main.html')) {
        const calendar = document.getElementById('calendar');
        const moodChart = document.getElementById('mood-chart');
        const moodData = JSON.parse(localStorage.getItem('moodData')) || Array(31).fill(null);

        // Функция для рендеринга календаря
        function renderCalendar() {
            let daysInMonth = 31; // Октябрь
            let calendarHTML = '<tr>';
            for (let day = 1; day <= daysInMonth; day++) {
                if (day === new Date().getDate()) {
                    calendarHTML += `<td><button class="current-day">${day}</button></td>`;
                } else {
                    calendarHTML += `<td><button>${day}</button></td>`;
                }
                if (day % 7 === 0) calendarHTML += '</tr><tr>';
            }
            calendarHTML += '</tr>';
            calendar.innerHTML = calendarHTML;

            // Добавляем обработчик нажатий на дни
            document.querySelectorAll('#calendar button').forEach(button => {
                button.addEventListener('click', function() {
                    const day = parseInt(button.innerText);
                    window.location.href = `mood.html?day=${day}`; // Переход на страницу выбора настроения с параметром дня
                });
            });
        }

        // Функция для создания графика настроений
        function renderMoodChart() {
            const ctx = moodChart.getContext('2d');
            const labels = Array.from({ length: 31 }, (_, i) => i + 1);
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Настроение',
                    data: moodData,
                    borderColor: '#931f09',
                    backgroundColor: 'rgba(147, 31, 9, 0.2)',
                    borderWidth: 2,
                }]
            };
            const config = {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                max: 10,
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'День месяца',
                            },
                        }
                    }
                }
            };
            new Chart(ctx, config);
        }

        renderCalendar(); // Вызов функции рендеринга календаря
        renderMoodChart(); // Вызов функции рендеринга графика настроений
    }

    // Страница выбора настроения
    if (currentPath.endsWith('mood.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const day = parseInt(urlParams.get('day'));
        const moodSlider = document.getElementById('mood-slider');
        const moodValue = document.getElementById('mood-value');
        const selectedDay = document.getElementById('selected-day');

        // Отображаем выбранный день
        selectedDay.innerText = day;

        // Устанавливаем значение ползунка
        moodSlider.value = 5; // Устанавливаем значение по умолчанию
        moodValue.innerText = moodSlider.value; // Обновляем отображение значения

        // Обработчик изменения ползунка
        moodSlider.addEventListener('input', () => {
            moodValue.innerText = moodSlider.value; // Обновляем отображение значения
        });

        // Обработчик для кнопки "Сохранить"
        document.getElementById('save-button').addEventListener('click', () => {
            let moodData = JSON.parse(localStorage.getItem('moodData')) || Array(31).fill(null);
            moodData[day - 1] = moodSlider.value; // Сохраняем настроение для текущего дня
            localStorage.setItem('moodData', JSON.stringify(moodData)); // Сохраняем в LocalStorage
            alert('Настроение сохранено!');
            window.location.href = 'main.html'; // Возвращаем на главную страницу
        });

        // Обработчик для кнопки "Назад"
        document.getElementById('back-button').addEventListener('click', () => {
            window.location.href = 'main.html'; // Возвращаем на главную страницу
        });
    }
});
