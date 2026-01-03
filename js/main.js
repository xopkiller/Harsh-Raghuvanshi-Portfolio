// GSAP Smooth Reveal
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out"
    });
});
