// 初始化笑脸的索引
let smileyIndex = 0;
// 笑脸的总数量
const totalSmileys = 6;

// 获取笑脸容器元素
const smileyContainer = document.getElementById('smiley-container');
// 获取所有笑脸<span>元素
const smileys = document.querySelectorAll('#smileys .smiley');
// 获取所有描述<p>元素
const descriptions = document.querySelectorAll('#descriptions .description');
// 获取记录按钮
const recordButton = document.getElementById('recordButton');
// 获取信息显示元素
const infoDisplay = document.getElementById('info');

// 记录点击次数和状态
let clickCount = 0;
let moodRecords = [];

// 为笑脸容器添加点击事件监听器
smileyContainer.addEventListener('click', () => {
    if (smileyIndex < totalSmileys - 1) { // 只有在未达到最大状态时才更新
        // 隐藏当前笑脸和描述
        smileys[smileyIndex].style.display = 'none';
        descriptions[smileyIndex].style.display = 'none';
        // 更新笑脸索引
        smileyIndex++;
        // 显示下一个笑脸和描述
        smileys[smileyIndex].style.display = 'block';
        descriptions[smileyIndex].style.display = 'block';
    }
});

// 为记录按钮添加点击事件监听器
recordButton.addEventListener('click', () => {
    clickCount++;
    const currentDescription = descriptions[smileyIndex].textContent;
    const currentTime = new Date().toLocaleTimeString();
    moodRecords.push(`${currentTime}，${currentDescription}`);
    console.log(`用户点击了开心按钮 ${clickCount} 次，当前状态: ${currentDescription}`);
    // 更新信息显示
    updateInfoDisplay();
    // 恢复到第一个笑脸状态
    resetSmiley();
    // 显示记录信息
    infoDisplay.classList.add('visible');
});

// 更新信息显示
function updateInfoDisplay() {
    const comment = getComment(clickCount);
    infoDisplay.textContent = `你开心了${clickCount}次，${comment}`;
}

// 获取不同点击次数下的评论
function getComment(count) {
    if (count === 1) return "真为你感到开心";
    if (count === 2) return "心情不错哦";
    if (count === 3) return "今天一定是你的幸运日！";
    if (count >= 4) return "你真是个快乐的人！";
    return "真为你感到开心";
}

// 恢复到第一个笑脸状态
function resetSmiley() {
    // 隐藏当前笑脸和描述
    smileys[smileyIndex].style.display = 'none';
    descriptions[smileyIndex].style.display = 'none';
    // 重置笑脸索引
    smileyIndex = 0;
    // 显示第一个笑脸和描述
    smileys[smileyIndex].style.display = 'block';
    descriptions[smileyIndex].style.display = 'block';
}

// 为信息显示元素添加点击事件监听器，展开详细记录
infoDisplay.addEventListener('click', () => {
    const details = moodRecords.map(record => `<p>${record}</p>`).join('');
    infoDisplay.innerHTML = `你开心了${clickCount}次，${getComment(clickCount)}<div>${details}</div>`;
}); 