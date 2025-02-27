from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# 数据库连接配置
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'password',  # MySQL密码
    'database': 'your_database'   # 数据库名
}

# 创建数据库连接
def create_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# 注册接口
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'success': False, 'message': '用户名和密码不能为空'})

    connection = create_connection()
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            if cursor.fetchone():
                return jsonify({'success': False, 'message': '用户名已存在'})

            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
            connection.commit()
            return jsonify({'success': True, 'message': '注册成功'})
        except Error as e:
            return jsonify({'success': False, 'message': str(e)})
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'success': False, 'message': '数据库连接失败'})

# 登录接口
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'success': False, 'message': '用户名和密码不能为空'})

    connection = create_connection()
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            if cursor.fetchone():
                return jsonify({'success': True, 'message': '登录成功'})
            else:
                return jsonify({'success': False, 'message': '用户名或密码错误'})
        except Error as e:
            return jsonify({'success': False, 'message': str(e)})
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'success': False, 'message': '数据库连接失败'})

# 主页面路由
@app.route('/')
def index():
    return render_template('index.html')  # render_template加载HTML模板

if __name__ == '__main__':
    app.run(debug=True)