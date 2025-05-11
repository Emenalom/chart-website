document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      loadImages();
      // Trigger notification
      fetch('/notify');
    }
  });
  
  async function loadImages() {
    const res = await fetch('/images');
    const images = await res.json();
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    images.forEach(img => {
      const imageElement = document.createElement('img');
      imageElement.src = img;
      gallery.appendChild(imageElement);
    });
  }
  
  // Load images on page load
  loadImages();
  