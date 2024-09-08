function locoanimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loadernimation() {
  gsap.set("#loader .line", { x: -40, y: -80 });
  var tl = gsap.timeline();
  tl.to(".line h5,.line h6", {
    opacity: 1,
    duration: 1,
    function() {
      var count = 0;
      const intervalId = setInterval(() => {
        document.querySelector("#line1-part h5").innerHTML = count++;
        if (count > 100) {
          clearInterval(intervalId);
        }
      }, 30);
    },
  });
  tl.from(".line h1", {
    y: 150,
    stagger: 0.2,
    duration: 0.5,
  });
  tl.to("#loader .line", {
    delay: 1,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
  });
  tl.to("#loader", {
    opacity: 0,
  });
  tl.from("#page1", {
    y: 1600,
    opacity: 0,
    duration: 0.6,
    ease: Power4,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    opacity: 0,
  });
  tl.from("#hero1 h1,#hero2 h1,#hero3 h1,#hero4 h1", {
    y: 120,
    stagger: 0.1,
    duration: 0.5,
  });
  tl.from(
    "#hero1,#page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}
function crsrAnimation() {
  Shery.mouseFollower();
  Shery.makeMagnet("#nav-part2 h4");
  const video = document.querySelector("#video-container video");
  const videoContainer = document.querySelector("#video-container");
  const cursor = document.querySelector("#video-crsr");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (details) {
      gsap.to(".mousefollower", {
        display: "none",
      });
      gsap.to("#video-crsr", {
        left: details.x - 570,
        y: details.y - 300,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      display: "initial",
    });
    gsap.to("#video-crsr", {
      top: "5%",
      left: "70%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      cursor.innerHTML = "<i class='ri-pause-line'></i>";
      gsap.to("#video-crsr", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      cursor.innerHTML = "<i class='ri-play-mini-fill'></i>";
      gsap.to("#video-crsr", {
        scale: 1,
      });
      flag = 0;
    }
  });
}
function Sheryjsanim() {
  Shery.imageEffect(".image-div", {
    style: 5,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: "9996999", range: [9999999, 9999999] },
      aspect: { value: 0.7272749429015005 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 15, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.11, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.92, range: [0, 10] },
      metaball: { value: 0.44, range: [0, 2], _gsap: { id: 4 } },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}
crsrAnimation();
locoanimations();
loadernimation();
Sheryjsanim();
