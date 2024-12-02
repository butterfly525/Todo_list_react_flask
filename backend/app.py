from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, Task, User
from flask_jwt_extended import JWTManager, create_access_token


app = Flask(__name__)

# Настройка подключения к SQLite
# Путь к базе данных
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
# Отключаем отслеживание изменений
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt_secret_key'
db.init_app(app)

jwt = JWTManager(app)


@app.before_request
def create_tables():
    db.create_all()  # Создаем таблицы при первом запросе

# Маршруты для работы с задачами

# Вход пользователя


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()

    if user is None or not user.check_password(password):
        return jsonify({"message": "Неверное имя пользователя или пароль."}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200
# Получение всех задач


@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    page = request.args.get('page', 1, type=int)
    # Пагинация по 3 задачи на страницу
    tasks = Task.query.paginate(page=page, per_page=3)
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
    new_task = Task(username=data['username'],
                    email=data['email'], text=data['text'])
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
