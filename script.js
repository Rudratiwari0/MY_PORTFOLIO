// HTML se menu button aur navigation links ko dhoondh kar variables mein rakho.
// Variable ek naam wala box hota hai jisme hum value ya element save karte hain.
const menuButton = document.getElementById('menuBtn');
const navigation = document.getElementById('siteNav');

// Saare navigation links lo, jaise Home, About, Skills, etc.
const navigationLinks = navigation.querySelectorAll('a[href^="#"]');

// Page ke saare main sections lo, jaise home, about aur contact.
const sections = document.querySelectorAll('main > section[id]');

// Button click hone par mobile menu ko kholna ya band karna hai.
menuButton.addEventListener('click', function () {
  // Agar menu abhi dikh raha hai, toh use chhupa do.
  if (navigation.style.display === 'block') {
    navigation.style.display = 'none';
  } else {
    // Agar menu chhupa hai, toh use dikha do.
    navigation.style.display = 'block';
  }
});

// Jab mobile par koi menu link click ho, dropdown menu band kar do.
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    // 600px ya usse chhoti screen ko hum mobile maan rahe hain.
    if (window.innerWidth <= 600) {
      navigation.style.display = 'none';
    }
  });
}

// Scroll karne par pata lagao ki kaunsa section abhi screen par active hai.
function changeActiveLink() {
  // Sticky header ki height pata karo, taaki uske neeche section check ho.
  const header = document.querySelector('.site-header');
  const headerHeight = header.offsetHeight;

  // Shuru mein pehla section (Home) active maan lo.
  let activeSection = sections[0];

  // Har section ko ek-ek karke check karo.
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.getBoundingClientRect().top;

    // Header ke neeche aa chuka section current active section hai.
    if (sectionTop <= headerHeight + 1) {
      activeSection = section;
    }
  }

  // Har menu link ko check karo aur sahi wale ko highlight karo.
  for (let i = 0; i < navigationLinks.length; i++) {
    const link = navigationLinks[i];
    const sectionLink = '#' + activeSection.id;

    // Link ka address active section ke ID se match karta hai?
    if (link.getAttribute('href') === sectionLink) {
      link.classList.add('active');
      // Screen reader ko batata hai ki ye current section ka link hai.
      link.setAttribute('aria-current', 'location');
    } else {
      // Baaki links se active style hata do.
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  }
}

// Jab bhi page scroll ho, active menu link ko dobara check karo.
window.addEventListener('scroll', changeActiveLink);

// Page khulte hi pehli baar active link set karo.
changeActiveLink();

// Window ka size badalne par menu aur active link ko sahi rakho.
window.addEventListener('resize', function () {
  // Desktop par CSS navigation ko dikhata hai, isliye mobile style hata do.
  if (window.innerWidth > 600) {
    navigation.style.display = '';
  }

  // Screen size badalne par active section bhi dobara check karo.
  changeActiveLink();
});
