const container = document.getElementById("container");
const sections = document.querySelectorAll('[class^="wrap"]');
const navItems = document.querySelectorAll("#nav li");

// 처음 섹션 보이게 설정
sections[0].classList.add("visible");

// 사용자 행동 추적 함수
function trackUserBehavior(eventName, eventData = {}) {
    // Clarity 커스텀 이벤트
    if (window.clarity) {
        window.clarity('set', eventName, JSON.stringify(eventData));
    }
    
    // 콘솔 로그 (개발용)
    console.log(`📊 Event: ${eventName}`, eventData);
}

// 페이지 로드 시 추적
window.addEventListener('load', () => {
    trackUserBehavior('page_load', { timestamp: new Date().toISOString() });
});

// 페이지 떠날 때 세션 시간 기록
window.addEventListener('beforeunload', () => {
    const sessionTime = Math.round((Date.now() - window.pageLoadTime) / 1000);
    trackUserBehavior('session_end', { duration_seconds: sessionTime });
});

window.pageLoadTime = Date.now();

// 스크롤 시 현재 섹션 감지
container.addEventListener("scroll", () => {
    let index = Math.round(container.scrollTop / window.innerHeight);

    // 네비 업데이트
    navItems.forEach((li) => li.classList.remove("active"));
    if (navItems[index]) navItems[index].classList.add("active");

    // 섹션 애니메이션
    sections.forEach((sec) => sec.classList.remove("visible"));
    if (sections[index]) sections[index].classList.add("visible");
    
    // 섹션 보기 추적
    trackUserBehavior('section_viewed', { section: index, timestamp: new Date().toISOString() });
});

// 네비 클릭 시 이동
navItems.forEach((li) => {
    li.addEventListener("click", () => {
        const i = li.getAttribute("data-index");
        trackUserBehavior('nav_clicked', { section: i });
        
        container.scrollTo({
            top: window.innerHeight * i,
            behavior: "smooth"
        });
    });
});

// 마우스 움직임 추적 (히트맵용)
document.addEventListener('mousemove', (e) => {
    if (window.clarity) {
        window.clarity('set', 'cursor_position', `${e.clientX},${e.clientY}`);
    }
}, { passive: true });

// 클릭 이벤트 추적
document.addEventListener('click', (e) => {
    const target = e.target;
    trackUserBehavior('element_clicked', { 
        element_id: target.id,
        element_class: target.className,
        element_text: target.innerText?.substring(0, 50)
    });
}, true);
