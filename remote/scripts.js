const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');
const context = canvas.getContext('2d');
const fullscreenButton = document.getElementById('fullscreen-btn');
const showpicButton = document.getElementById('showpic-btn');


// 登录功能
function login() {
    // 获取用户输入的学号和密码
    const studentId = document.getElementById('student-id').value;
    const password = document.getElementById('password').value;

    // 检查学号和密码是否为空
    if (1==1) {
        // 隐藏登录页面
        document.getElementById('login-container').style.display = 'none';
        // 显示实验平台
        document.getElementById('platform-container').style.display = 'flex';
        // 默认显示基础实验
        showExperiments('basic');
    } else {
        // 如果学号或密码为空，弹出提示
        alert('请输入学号和密码！');
    }
}

// 显示实验列表
function showExperiments(type) {
    // 定义实验数据
    const experiments = {
        basic: [
            { name: '蜂鸣器', done: true, link: 'experiment1.html' },
            { name: '按键消抖', done: true, link: 'experiment2.html' },
            { name: '七段数码管显示', done: true, link: 'experiment3.html' },
            { name: '简易计数器', done: true, link: 'experiment4.html' },
            { name: '简易计算器', done: true, link: 'experiment5.html' },
            { name: '流水灯', done: false, link: 'experiment6.html' },
            { name: '随机数生成器', done: true, link: 'experiment7.html' },
            { name: '实验8', done: true, link: 'experiment8.html' },
            { name: '实验9', done: true, link: 'experiment9.html' },
            { name: '实验10', done: true, link: 'experiment10.html' }
        ],
        advanced: [
            { name: '图像处理-sobel算子应用', done: false, link: 'advanced1.html' },
            { name: '图像处理-色彩阈值提取', done: false, link: 'advanced2.html' },
            { name: '高级实验3', done: true, link: 'advanced3.html' }
        ],
        simulation: [
            { name: '示波器', done: false, link: 'simulation1.html' },
            { name: '逻辑分析仪', done: false, link: 'simulation2.html' },
            { name: '信号发生器', done: false, link: 'simulation3.html' }
        ]
    };

    // 获取实验列表容器和仪器模拟容器
    const experimentList = document.getElementById('experiment-list');
    const simulationContainer = document.getElementById('simulation-container');

    // 清空内容
    experimentList.innerHTML = '';
    simulationContainer.innerHTML = '';
    simulationContainer.style.display = 'none'; // 默认隐藏仪器模拟容器

    // 根据选择的实验类型加载实验列表
    if (type === 'simulation') {
        // 如果是仪器模拟，使用独立的容器和样式
        experiments[type].forEach(exp => {
            // 创建一个实验项的链接
            const item = document.createElement('a');
            item.href = exp.link; // 设置链接地址
            item.target = '_blank'; // 在新标签页中打开
            item.classList.add('simulation-item'); // 添加样式类
            item.textContent = exp.name; // 设置实验名称
            simulationContainer.appendChild(item); // 添加到仪器模拟容器
        });
        simulationContainer.style.display = 'flex'; // 显示仪器模拟容器
    } else {
        // 基础实验和高级实验部分
        experiments[type].forEach(exp => {
            // 创建一个实验项的链接
            const item = document.createElement('a');
            item.href = exp.link; // 设置链接地址
            item.target = '_blank'; // 在新标签页中打开
            item.classList.add('experiment-item'); // 添加样式类
            item.textContent = exp.name; // 设置实验名称
            if (exp.done) {
                item.classList.add('done'); // 如果实验已完成，添加 "done" 类
            }
            experimentList.appendChild(item); // 添加到实验列表
        });
    }

    // 标记当前激活的菜单项
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active'); // 移除所有菜单项的激活状态
        if (item.textContent.toLowerCase().includes(type)) {
            item.classList.add('active'); // 为当前选中的菜单项添加激活状态
        }
    });
}

// 页面加载时默认显示基础实验
window.onload = () => {
    showExperiments('basic'); // 默认加载基础实验
};


// 请求访问摄像头
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream; // 将视频流绑定到video元素
        video.play(); // 开始播放视频流
    })
    .catch(err => {
        console.error("Error accessing the camera: " + err);
        alert("Unable to access the camera. Please check your device settings.");
    });



// 拍照功能
snapButton.addEventListener('click', () => {
    const topMargin = 50; // 设置顶部间隔为 50 像素
    const leftMargin = 50; // 设置左侧间隔为 50 像素

    // 获取视频的宽高
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // 计算画布的绘制区域
    const drawX = leftMargin; // 横向起始位置
    const drawY = topMargin; // 纵向起始位置
    const drawWidth = canvas.width - 2 * leftMargin; // 绘制宽度
    const drawHeight = canvas.height - 2 * topMargin; // 绘制高度

    // 将视频帧绘制到画布上
    context.drawImage(video, 0, 0, videoWidth, videoHeight, drawX, drawY, drawWidth, drawHeight);
});



// 全屏
fullscreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen().catch(err => {
            console.error(`Unable to enter fullscreen: ${err}`);
        });
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen().catch(err => {
            console.error(`Unable to enter fullscreen: ${err}`);
        });
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        video.webkitRequestFullscreen().catch(err => {
            console.error(`Unable to enter fullscreen: ${err}`);
        });
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen().catch(err => {
            console.error(`Unable to enter fullscreen: ${err}`);
        });
    }
});

// 监听Esc键退出全屏
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error(`Unable to exit fullscreen: ${err}`);
            });
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen().catch(err => {
                console.error(`Unable to exit fullscreen: ${err}`);
            });
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen().catch(err => {
                console.error(`Unable to exit fullscreen: ${err}`);
            });
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen().catch(err => {
                console.error(`Unable to exit fullscreen: ${err}`);
            });
        }
    }
});

// 显示原图像
showpicButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height); // 将视频帧绘制到画布
});



// 按钮点击事件（upload.. 
document.getElementById('button1').addEventListener('click', () => {
    sendRequest('button1');
});

document.getElementById('button2').addEventListener('click', () => {
    sendRequest('button2');
});

document.getElementById('button3').addEventListener('click', () => {
    sendRequest('button3');
});

// 发送请求的函数
function sendRequest(buttonId) {
    const data = {
        buttonId: buttonId,
        timestamp: new Date().toISOString()
    };

    fetch('/api/button-click', { // 假设后端接口为 /api/button-click
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        alert(`Request sent successfully! Button ID: ${buttonId}`);
    })
    .catch(error => {
        console.error('Error sending request:', error);
        alert('Failed to send request. Please try again.');
    });
}



/*            URL跳转              */
//基础跳转URL
function goToNextPage_jichu1() {
    window.location.href = "1next.html";
}
function goToNextPage_jichu2() {
    window.location.href = "2next.html";
}
function goToNextPage_jichu3() {
    window.location.href = "3next.html";
}
function goToNextPage_jichu4() {
    window.location.href = "4next.html";
}
function goToNextPage_jichu5() {
    window.location.href = "5next.html";
}
function goToNextPage_jichu6() {
    window.location.href = "6next.html";
}
function goToNextPage_jichu7() {
    window.location.href = "7next.html";
}
// 高级跳转URL
function goToNextPage_gaoji1() {
    window.location.href = "gao1next.html";
}
function goToNextPage_gaoji2() {
    window.location.href = "gao2next.html";
}
function goToNextPage_gaoji3() {
    window.location.href = "gao3next.html";
}
//Loading URL
function Finish() {
    window.location.href = "loding.html";
}
//Back URL
function backhome(){
    window.location.href = "index.html";
}