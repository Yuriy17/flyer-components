export function inputTel(selector) {
	const form = document.querySelector(selector);
	const phoneFields = form.querySelectorAll(".phone");

	phoneFields.forEach((item) => {
		let errorNumberValid, error_block;
		if (item.closest("form").classList.contains("white")) {
			errorNumberValid = "errorNumberValid_1";
			error_block = "error_block_1";
		} else {
			errorNumberValid = "errorNumberValid_2";
			error_block = "error_block_2";
		}

		item.value = item.value.trim();
		
		const iti = window.intlTelInput(item, {
			hiddenInput: "full_phone",
			preferredCountries: ["us", "ca", "gb", "au"],
			utilsScript: "https://flyer-club.com/assets/inputtel/utils.js",
		});

		let parent;
		if (item.closest("p")) {
			parent = item.closest("p");
		} else if (item.closest(".input-block")) {
			parent = item.closest(".input-block");
		} else if (item.closest(".form-input")) {
			parent = item.closest(".form-input");
		} else {
			parent = item.closest(".section-form__item");
		}
		item.addEventListener("countrychange", function () {
			if (parent.querySelector("." + error_block)) {
				parent.querySelector("." + error_block).remove();
			}
			if (item.classList.contains(errorNumberValid)) {
				item.classList.remove(errorNumberValid);
			}
			if (item.classList.contains("error_state")) {
				parent
					.querySelectorAll(".error_state")
					.forEach((errorItem) => errorItem.classList.remove("error_state"));
			}

			if (item.value != "") {
				const isValid = iti.isValidNumber();
				if (!isValid) {
					if (item.closest(".form-points")) {
						parent.querySelector("label").classList.add("error_state");
						item.classList.add("error_state");
					} else {
						parent.insertAdjacentHTML("beforeend", `<div class='${error_block}'>Wrong phone format</div>`);
					}
					item.classList.add(errorNumberValid);
				}
			}
		});
		item.addEventListener("keyup", function () {
			item.value = item.value.trim();
			const isValid = iti.isValidNumber();
			if (parent.querySelector("." + error_block)) {
				parent.querySelector("." + error_block).remove();
			}
			if (item.classList.contains("error_state")) {
				parent
					.querySelectorAll(".error_state")
					.forEach((errorItem) => errorItem.classList.remove("error_state"));
			}
			
			item.classList.remove(errorNumberValid);
			if (!isValid) {
				if (item.closest(".form-points")) {
					parent.querySelector("label").classList.add("error_state");
					item.classList.add("error_state");
				} else {
					parent.insertAdjacentHTML("beforeend", `<div class='${error_block}'>Wrong phone format</div>`);
				}
				item.classList.add(errorNumberValid);
			}
		});
	});

	document.querySelectorAll(".menu_list_item").forEach((item) => {
		item.addEventListener("click", () => {
			if (document.querySelector(".menu_block").classList.contains("active")) {
				document.querySelector(".menu_block").classList.remove("active");
			}
		});
	});
}
