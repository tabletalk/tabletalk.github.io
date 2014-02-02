(function() {

	// s/o to http://youmightnotneedjquery.com/
	function $(selector) { return document.querySelectorAll(selector); }

	function addEvent(el, eventName, handler) {
		if (el.addEventListener) {
			el.addEventListener(eventName, handler);
		} else {
			el.attachEvent("on" + eventName, handler);
		}
	}

	function addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else {
			el.className += " "+className;
		}
	}

	function removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^| )' + className.split(' ').join('|') + '( |$)', 'gi'), ' ');
		}
	}

	function inputClick(e) {
		var el = e.target;
		if (el.value === "Sign up") {
			el.value = "";
		}
	}

	function inputKeyDown(e) {
		if (e.keyCode === 13) {
			emailSubmit(e.target.value);
		}
	}

	function onSubmit(e) {
		emailSubmit(e.target.value);
	}

	function emailSubmit(email) {
		if (validateEmail(email)) submitEmail(email);
		else rejectEmail();
	}

	// s/o to SO http://stackoverflow.com/a/46181
	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	function submitEmail(email) {
		var request = new XMLHttpRequest();

		request.open("POST", "api/mailSignUp.php", true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send("email="+encodeURIComponent(email));

		removeClass($(".email-rejected")[0], "visible");
		addClass($(".email-accepted")[0], "visible");
	}

	function rejectEmail() {
		removeClass($(".email-accepted")[0], "visible");
		addClass($(".email-rejected")[0], "visible");
	}

	var input = $(".main-mailinglist-signup")[0];

	addEvent(input, "click", inputClick);
	addEvent(input, "keydown", inputKeyDown);
	addEvent(input, "submit", onSubmit);
	addEvent(input, "focusout", onSubmit);

})();