// This file has two small jobs:
// 1. Switch between light mode and dark mode
// 2. Highlight the menu link of the section you are viewing


// ---------- 1. LIGHT / DARK MODE ----------

// get the button from the page
var themeButton = document.getElementById("theme-btn");

// when the page opens, check what the visitor chose last time
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeButton.textContent = "☀️ Light";
}

// when the button is clicked
themeButton.onclick = function () {
  if (document.body.classList.contains("dark")) {
    // it is dark now, so change to light
    document.body.classList.remove("dark");
    themeButton.textContent = "🌙 Dark";
    localStorage.setItem("theme", "light");
  } else {
    // it is light now, so change to dark
    document.body.classList.add("dark");
    themeButton.textContent = "☀️ Light";
    localStorage.setItem("theme", "dark");
  }
};


// ---------- 2. ACTIVE MENU LINK ----------

// get all the sections and all the menu links
var sections = document.querySelectorAll("section");
var menuLinks = document.querySelectorAll(".site-nav a");

function showActiveLink() {
  // start with the first section
  var currentId = "home";

  // go through every section
  for (var i = 0; i < sections.length; i++) {
    // if we have scrolled to this section, remember its id
    if (window.scrollY >= sections[i].offsetTop - 120) {
      currentId = sections[i].id;
    }
  }

  // at the very bottom of the page, use the last section
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
    currentId = sections[sections.length - 1].id;
  }

  // go through every menu link
  for (var j = 0; j < menuLinks.length; j++) {
    if (menuLinks[j].getAttribute("href") === "#" + currentId) {
      menuLinks[j].classList.add("active");     // this is the current link
    } else {
      menuLinks[j].classList.remove("active");  // not the current link
    }
  }
}

// run when the user scrolls, and once when the page opens
window.onscroll = showActiveLink;
showActiveLink();
