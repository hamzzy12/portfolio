const container = document.getElementById("container");
const sections = document.querySelectorAll('[class^="wrap"]');
const navItems = document.querySelectorAll("#nav li");

// 처음 섹션 보이게 설정
sections[0].classList.add("visible");

// 스크롤 시 현재 섹션 감지
container.addEventListener("scroll", () => {
    let index = Math.round(container.scrollTop / window.innerHeight);

    // 네비 업데이트
    navItems.forEach((li) => li.classList.remove("active"));
    if (navItems[index]) navItems[index].classList.add("active");

    // 섹션 애니메이션
    sections.forEach((sec) => sec.classList.remove("visible"));
    if (sections[index]) sections[index].classList.add("visible");
});

// 네비 클릭 시 이동
navItems.forEach((li) => {
    li.addEventListener("click", () => {
        const i = li.getAttribute("data-index");
        container.scrollTo({
            top: window.innerHeight * i,
            behavior: "smooth"
        });
    });
});
