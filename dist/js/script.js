const images = document.querySelectorAll('.gallery-image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close-lightbox');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;

// Otvori lightbox
images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = 'flex';
  });
});

function showImage() {
  lightboxImage.src = images[currentIndex].src;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

const faders = document.querySelectorAll('.fade-in');  // Selektiramo sve elemente s klasom 'fade-in'

const appearOptions = {
  threshold: 0.1,  // Koliko mora biti vidljiv da bi animacija počela
  rootMargin: "0px 0px -50px 0px"  // Na kojem području će element biti aktiviran
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;  // Ako element nije na ekranu, ne radimo ništa
    entry.target.classList.add('appear');  // Dodajemo "appear" klasu koja pokreće animaciju
    observer.unobserve(entry.target);  // Prestajemo pratiti element nakon što je animacija završena
  });
}, appearOptions);

// Aktiviraj za svaki element s klasom "fade-in"
faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

document.querySelector("form").addEventListener("submit", function(event) {
  const phone = document.getElementById("phone").value;
  const phoneRegex = /^\+?[0-9]{1,4}?[-. ]?(\(?\d{1,3}?\)?[-. ]?\d{1,4}[-. ]?\d{1,4})$/; // Općeniti obrazac za međunarodne brojeve

  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid phone number.");
    event.preventDefault(); // Sprječava slanje obrasca ako broj nije ispravan
  }
});