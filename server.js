const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Используем body-parser для обработки JSON-запросов
app.use(bodyParser.json());

// Настроим статическую папку для HTML и других файлов
app.use(express.static(__dirname));

// Массив для хранения настроений (в реальном приложении можно использовать базу данных)
let moodData = [];

// Обработка POST-запроса для сохранения настроения
app.post('/api/saveMood', (req, res) => {
    const { day, mood } = req.body;

    // Логика для сохранения настроения в массиве (или базе данных)
    moodData[day] = mood;

    // Ответ клиенту об успешном сохранении
    res.json({ success: true });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
