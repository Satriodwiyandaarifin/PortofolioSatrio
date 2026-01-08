gsap.registerPlugin(ScrollTrigger);

// 1. DATA PROJECT
const projectData = {
    "myportofolio": {
        title: "My Portofolio",
        desc: "Website portofolio pribadi yang dirancang dengan desain responsif dan antarmuka modern menggunakan GSAP.",
        techCount: 5,
        img: "images/myporto.png",
        features: ["Desain Responsif", "Animasi GSAP", "Dark Mode Ready", "Form Contact Active"],
        githubLink: "https://github.com/Satriodwiyandaarifin/PortofolioSatrio.git"
    },
    "navigasi-kampus": {
        title: "Navigasi Kampus",
        desc: "Aplikasi web untuk membantu mahasiswa baru memetakan dan menemukan ruangan di seluruh area kampus.",
        techCount: 7,
        img: "images/navigasi.png",
        features: ["Map Interaktif", "Search Filter", "Informasi Gedung", "Real-time Location"],
        githubLink: "https://github.com/username/repo-navigasi"
    }
};

// 2. INITIALIZATION & ANIMATION
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.overflow = "hidden";

    gsap.set(".section-title, .about-avatar, .about-text, .info", { opacity: 0, y: 30 });

    const mainTl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = "auto";
            updateGlider(); 
        }
    });

    mainTl.to(".splash-logo", { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" })
          .to(".progress", { width: "100%", duration: 1, ease: "power2.inOut" }, "-=0.4")
          .to("#splash-screen", { opacity: 0, display: "none", duration: 0.6 })
          .from(".navbar", { y: -50, opacity: 0, duration: 0.5 }, "-=0.2")
          .from(".hello", { scale: 0.5, opacity: 0, duration: 0.7, ease: "back.out(1.7)" }, "-=0.3")
          .from(".hero-card", { y: 40, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.5")
          .from(".hero-img", { x: 60, opacity: 0, duration: 0.8 }, "-=0.6")
          .to(".about .section-title", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to(".about-avatar", { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4")
          .to(".about-text", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
          .to(".about .info", { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".portfolio",
            start: "top 80%",
        },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
    });
});

// 3. FUNGSI MODAL (FIXED LOGIC)
const modal = document.getElementById("project-modal");

function openModal(titleText) {
    // Membersihkan teks: Ubah ke kecil, ganti spasi atau underscore (_) menjadi tanda hubung (-)
    // Agar "Navigasi_Kampus" atau "Navigasi Kampus" menjadi "navigasi-kampus"
    const key = titleText.toLowerCase().trim().replace(/[\s_]+/g, '-');
    
    // Cari data berdasarkan key
    const data = projectData[key]; 
    
    if (data) {
        document.getElementById("modal-title").innerText = data.title;
        document.getElementById("modal-desc").innerText = data.desc;
        document.getElementById("modal-img").src = data.img;
        document.getElementById("modal-tech-count").innerText = data.techCount;
        
        const githubBtn = document.querySelector(".btn-git");
        if (githubBtn && data.githubLink) {
            githubBtn.href = data.githubLink;
            githubBtn.target = "_blank";
        }

        const featureCountEl = document.getElementById("modal-feature-count");
        if(featureCountEl) featureCountEl.innerText = data.features.length;
        
        const list = document.getElementById("modal-features-list");
        if(list) {
            list.innerHTML = ""; 
            data.features.forEach(f => {
                const li = document.createElement("li");
                li.innerText = f;
                list.appendChild(li);
            });
        }
        
        modal.style.display = "block";
        gsap.fromTo(".modal-content", 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    } else {
        // Jika tidak ketemu, default ke myportofolio tanpa merusak judul yang dicari
        openModal("myportofolio");
    }
}

// 4. EVENT LISTENERS KLIK
document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-details")) {
        e.preventDefault();
        const card = e.target.closest(".project-card");
        const title = card.querySelector("h4").innerText;
        openModal(title);
    }
    if (e.target.classList.contains("close-modal") || e.target === modal) {
        if(modal) modal.style.display = "none";
    }
});

// 5. TABS & GLIDER
const tabBtns = document.querySelectorAll(".tab-btn");
const glider = document.querySelector(".tab-glider");

function updateGlider() {
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn && glider) {
        glider.style.width = activeBtn.offsetWidth + "px";
        glider.style.left = activeBtn.offsetLeft + "px";
    }
}

tabBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        const target = this.dataset.tab;
        tabBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        updateGlider();
        
        document.querySelectorAll(".tab-panel").forEach(p => {
            p.classList.remove("active");
            if (p.id === target + "-content") p.classList.add("active");
        });

        if (target === "tech") {
            gsap.fromTo(".tech-item", 
                { opacity: 0, y: 20, scale: 0.9 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)" }
            );
        }

        if (target === "sertifikat") {
            gsap.fromTo(".cert-card", 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    stagger: 0.1, 
                    duration: 0.6, 
                    ease: "power2.out",
                    clearProps: "all" 
                }
            );
        }
    });
});

// 6. CONTACT ANIMATION
gsap.from(".contact-info", {
    scrollTrigger: { trigger: ".contact", start: "top 70%" },
    x: -50, opacity: 0, duration: 1, ease: "power3.out"
});

gsap.from(".contact-form-card", {
    scrollTrigger: { trigger: ".contact", start: "top 70%" },
    x: 50, opacity: 0, duration: 1, ease: "power3.out"
});

window.addEventListener("resize", updateGlider);

// 7. CERTIFICATE PREVIEW (FIXED)
const previewWrap = document.getElementById("cert-preview-wrap") || document.getElementById("fullscreen-overlay");
const previewImg = document.getElementById("img-preview");

document.addEventListener("click", (e) => {
    const certCard = e.target.closest(".cert-card");
    
    if (certCard) {
        const imgSrc = certCard.querySelector(".cert-img").src;
        if (previewWrap && previewImg) {
            previewImg.src = imgSrc;
            previewWrap.style.display = "flex";
            gsap.fromTo(previewImg, 
                { scale: 0.5, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }

    if (e.target.classList.contains("close-preview") || e.target === previewWrap) {
        if(previewWrap) previewWrap.style.display = "none";
    }
});
