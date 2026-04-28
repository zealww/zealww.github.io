// 按钮切换内容区域
const buttons = document.querySelectorAll('.btn[data-section]');
const contentCards = document.querySelectorAll('.content-card');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-section');
        const targetCard = document.getElementById(targetSection);

        // 如果点击的是当前激活的按钮，则折叠
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            targetCard.classList.remove('expanded');
            targetCard.classList.add('collapsed');
            return;
        }

        // 移除所有按钮的激活状态
        buttons.forEach(btn => btn.classList.remove('active'));

        // 折叠所有内容卡片
        contentCards.forEach(card => {
            card.classList.remove('expanded');
            card.classList.add('collapsed');
        });

        // 激活当前按钮并展开对应内容
        this.classList.add('active');
        targetCard.classList.remove('collapsed');
        targetCard.classList.add('expanded');

        // 平滑滚动到内容区域
        setTimeout(() => {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    });
});

// 卡片标题点击也可以展开/折叠
document.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', function() {
        const card = this.parentElement;
        const cardId = card.id;
        const correspondingButton = document.querySelector(`button[data-section="${cardId}"]`);

        if (card.classList.contains('expanded')) {
            card.classList.remove('expanded');
            card.classList.add('collapsed');
            if (correspondingButton) {
                correspondingButton.classList.remove('active');
            }
        } else {
            // 折叠所有其他卡片
            contentCards.forEach(c => {
                c.classList.remove('expanded');
                c.classList.add('collapsed');
            });
            buttons.forEach(btn => btn.classList.remove('active'));

            // 展开当前卡片
            card.classList.remove('collapsed');
            card.classList.add('expanded');
            if (correspondingButton) {
                correspondingButton.classList.add('active');
            }
        }
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动时导航栏效果
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    }

    lastScroll = currentScroll;
});

// 项目卡片动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(card);
});

console.log('个人主页已加载完成！');
