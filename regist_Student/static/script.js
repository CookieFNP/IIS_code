function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else if (formType === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('登录成功！');
        } else {
            alert('登录失败：' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('注册成功！');
        } else {
            alert('注册失败：' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}