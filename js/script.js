document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initNavigation();
    initScrollAnimation();
    initCertificateModal();
    
    // 滚动事件处理和header自动隐藏
    initHeaderAutoHide();
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 初始化作品集点击事件
    initPortfolioItemsClick();
    
    // 初始化显示更多按钮
    initShowMoreButton();
});

// 导航菜单初始化
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 点击导航链接时关闭菜单
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果在移动设备上，点击链接后关闭菜单
            if (window.innerWidth <= 768 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });
    
    // 更新活动链接
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

// 更新当前活动的导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        
        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

// 初始化证书模态框功能
function initCertificateModal() {
    const certificateItems = document.querySelectorAll('.certificate-item');
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateModalImg');
    const closeBtn = document.querySelector('.certificate-modal-close');
    
    // 点击证书项打开模态框
    certificateItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            
            // 显示模态框
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // 阻止滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // 关闭模态框函数
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // 恢复滚动
            document.body.style.overflow = '';
        }, 300);
    }
}

// 初始化作品集点击事件
function initPortfolioItemsClick() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('portfolioModalImg');
    const closeBtn = document.querySelector('.portfolio-modal-close');
    
    // 为每个作品项添加点击事件
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            
            // 显示模态框
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // 阻止滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closePortfolioModal);
    
    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePortfolioModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closePortfolioModal();
        }
    });
    
    // 初始化滚动动画和背景颜色调整
    initScrollAnimation();
    adjustBackgroundColor();
}

// 调整背景颜色
function adjustBackgroundColor() {
    // 根据作品项的颜色调整背景色
    // 这个函数保留但简化，不再动态调整
}

// 打开模态框
function openModal(item) {
    // 检查是否已存在模态框
    let modal = document.querySelector('.modal');
    
    if (!modal) {
        // 创建模态框
        modal = document.createElement('div');
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    // 设置模态框内容
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="${item.image}" alt="${item.title}">
            <div class="modal-caption">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `;
    
    // 显示模态框
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // 关闭模态框事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 滚动动画初始化
function initScrollAnimation() {
    // 为不同元素添加不同的延迟类
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        const delay = index % 3;
        el.classList.add(`delay-${delay + 1}`);
    });
    
    // 监听滚动，显示元素
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// 动态调整背景颜色以匹配图片
function adjustBackgroundColor() {
    // 注释掉Vibrant.js相关代码，因为未引入该库
    // 这不影响网站的核心功能
    /*
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        
        // 图片加载完成后分析颜色
        img.addEventListener('load', function() {
            const vibrant = new Vibrant(img);
            const swatches = vibrant.swatches();
            
            if (swatches['Vibrant']) {
                const color = swatches['Vibrant'].getHex();
                item.style.backgroundColor = color;
            }
        });
    });
    */
    console.log('背景颜色调整功能已禁用');
}

// 这部分代码已被替换为使用与证书模态框相同的实现方式

// 关闭作品模态框
function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        // 恢复滚动
        document.body.style.overflow = '';
    }, 300);
}

// 简化的header功能
function initHeaderAutoHide() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });
}

// 初始化'显示更多'按钮功能
function initShowMoreButton() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const showMoreBtn = document.querySelector('.show-more-btn');
    
    if (portfolioGrid && showMoreBtn) {
        // 初始状态设置为限制高度
        portfolioGrid.classList.add('limited');
        
        // 点击按钮展开/收起作品集
        showMoreBtn.addEventListener('click', function() {
            portfolioGrid.classList.toggle('limited');
            
            // 更新按钮文本
            if (portfolioGrid.classList.contains('limited')) {
                showMoreBtn.textContent = '显示更多作品';
                // 滚动到作品集部分
                document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
            } else {
                showMoreBtn.textContent = '收起作品集';
            }
        });
    }
}