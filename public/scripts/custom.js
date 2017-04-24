
($ => {
	(() => {
		window.isScrollEnabled = () => {
			const hasScrollReveal = sessionStorage.getItem("scroll-reveal");

			if (hasScrollReveal == null) {
				sessionStorage.setItem("scroll-reveal", "1");
			}

			return hasScrollReveal === null ? true : hasScrollReveal === "1";
		};
	})();

	$(window).load(() => {
		$("#preloader").velocity({ opacity: 0 }, { visibility: "hidden", duration: 500 });

		if (isScrollEnabled()) {
			$(".menuitem:last").one("afterReveal", () => {
				$("#nav").addClass("ui-menu-color06");
			});
		} else {
			$("#nav").addClass("ui-menu-color06");
		}

		if (isScrollEnabled()) {
			scrollReveal(scrollRevealItems.header);
		}

		if (isScrollEnabled()) {
			scrollReveal(scrollRevealItems.content);
		}

		if (isScrollEnabled()) {
			scrollReveal(scrollRevealItems.footer);
		}

		(() => {
			let backTopVisible = false;
			let backTopEvent = false;
			const $backTop = $("#back-top");

			$backTop.on("click", () => {
				$backTop.velocity({ bottom: "-=20px", opacity: 0 }, { visibility: "hidden" });
				$("body").velocity("scroll", {
					duration: 1000,
					begin() {
						backTopEvent = true;
					},
					complete() {
						backTopEvent = false;
						backTopVisible = false;
					},
				});
				return false;
			});

			const scrollTrigger = 100;
			const backToTop = () => {
				const scrollTop = window.pageYOffset;
				if (scrollTop > scrollTrigger && !backTopVisible) {
					backTopVisible = true;
					$backTop.velocity({ bottom: "+=20px", opacity: 1 }, { visibility: "visible", duration: 600 });
				} else if (scrollTop <= scrollTrigger && backTopVisible && !backTopEvent) {
					backTopVisible = false;
					$backTop.velocity({ bottom: "-=20px", opacity: 0 }, { visibility: "hidden", duration: 600 });
				}
			};
			backToTop();
			$(window).on("scroll", backToTop);
		})();
	});

	function scrollReveal(items) {
		window.sr = window.sr || ScrollReveal();

		$.each(items, (itemKey, reveal) => {
			$(reveal.selector).each((index, elem) => {
				const data = elem.dataset;

				const revealData = {
					duration: typeof data.animationDuration !== "undefined"
						? parseInt(data.animationDuration, 10)
						: reveal.data.duration || 1000,
					origin: typeof data.animationOrigin !== "undefined"
						? data.animationOrigin
						: reveal.data.origin || "bottom",
					distance: typeof data.animationDistance !== "undefined"
						? data.animationDistance
						: reveal.data.distance || "0px",
					delay: typeof data.animationDelay !== "undefined"
						? parseInt(data.animationDelay, 10)
						: reveal.data.delay || 0,
					scale: typeof data.animationScale !== "undefined"
						? parseFloat(data.animationScale)
						: reveal.data.scale || 1,
					rotate: typeof data.animationRotate !== "undefined"
						? data.animationRotate
						: reveal.data.rotate || { x: 0, y: 0, z: 0 },
					easing: typeof data.animationEasing !== "undefined"
						? data.animationEasing
						: reveal.data.easing || "cubic-bezier(1.000, 1.000, 1.000, 1.000)",
					mobile: false,
					afterReveal(elem) {
						$(elem).trigger("afterReveal");
					},
				};

				window.sr.reveal(elem, revealData);

				if (window.sr.tools.isMobile()) {
					$(elem).trigger("afterReveal");
				}
			});
		});
	}
})(jQuery);
