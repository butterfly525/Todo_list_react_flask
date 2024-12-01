from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, Task

app = Flask(__name__)

# Настройка подключения к SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'  # Путь к базе данных
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Отключаем отслеживание изменений
db.init_app(app)

@app.before_request
def create_tables():
    db.create_all()  # Создаем таблицы при первом запросе

# Маршруты для работы с задачами

@app.route('/index', methods=['GET'])
def index():
    
    return jsonify(message="hi")


# Получение всех задач
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    page = request.args.get('page', 1, type=int)

    tasks = Task.query.paginate(page=page, per_page=3)  # Пагинация по 3 задачи на страницу

    return jsonify({
        'tasks': [task.to_dict() for task in tasks.items],
        'pages': tasks.pages,
        'current_page': tasks.page,
        'total': tasks.total
    })

# Добавление новой задачи
@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(username=data['username'], email=data['email'], text=data['text'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

# Редактирование задачи
@app.route('/api/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    task.text = data.get('text', task.text)
    task.completed = data.get('completed', task.completed)
    db.session.commit()
    return jsonify(task.to_dict())

# Удаление задачи
@app.route('/api/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return '', 204

# Стартовое приложение
if __name__ == '__main__':
    app.run(debug=True)
