// devtools/panel/panel.js
let allImages = [];

function updateImages() {
  browser.devtools.inspectedWindow.eval(`
    Array.from(document.images).map(img => {
      const computedStyle = window.getComputedStyle(img);
      return {
        src: img.src,
        width: img.width,
        height: img.height,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        fileSize: 'unknown' // We'll update this later
      };
    })
  `, (result, isException) => {
    if (!isException && result) {
      allImages = result;
      fetchFileSizes().then(() => {
        displayImages(allImages);
        updateSummary();
      });
    }
  });
}

function fetchFileSizes() {
  return Promise.all(allImages.map(img => 
    fetch(img.src)
      .then(response => {
        img.fileSize = response.headers.get('content-length') || 'unknown';
        return img;
      })
      .catch(() => {
        img.fileSize = 'unknown';
        return img;
      })
  ));
}

function displayImages(images) {
  const container = document.getElementById('image-container');
  container.innerHTML = '';

  images.forEach(img => {
    const imgElement = document.createElement('div');
    imgElement.className = 'image-item';
    imgElement.innerHTML = `
      <img src="${img.src}" alt="${img.alt}">
      <div class="image-info">
        <p>Dimensions: ${img.width}x${img.height}</p>
        <p>Natural: ${img.naturalWidth}x${img.naturalHeight}</p>
        <p>Alt: ${img.alt}</p>
        <p>File Size: ${formatFileSize(img.fileSize)}</p>
        <p>Display: ${img.display}</p>
        <p>Visibility: ${img.visibility}</p>
        <p>Source: ${img.src}</p>
      </div>
    `;
    container.appendChild(imgElement);
  });
}

function updateSummary() {
  const totalCount = allImages.length;
  const totalSize = allImages.reduce((sum, img) => sum + (parseInt(img.fileSize) || 0), 0);
  
  document.getElementById('total-count').textContent = totalCount;
  document.getElementById('total-size').textContent = formatFileSize(totalSize);
}

function formatFileSize(size) {
  if (size === 'unknown') return 'Unknown';
  const kb = parseInt(size) / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
}

function sortImages(criterion) {
  switch(criterion) {
    case 'size':
      allImages.sort((a, b) => (parseInt(b.fileSize) || 0) - (parseInt(a.fileSize) || 0));
      break;
    case 'dimensions':
      allImages.sort((a, b) => (b.width * b.height) - (a.width * a.height));
      break;
    case 'type':
      allImages.sort((a, b) => a.src.split('.').pop().localeCompare(b.src.split('.').pop()));
      break;
  }
  displayImages(allImages);
}

function filterImages(query) {
  const filtered = allImages.filter(img => 
    img.src.toLowerCase().includes(query.toLowerCase()) ||
    img.alt.toLowerCase().includes(query.toLowerCase())
  );
  displayImages(filtered);
}

document.getElementById('refresh').addEventListener('click', updateImages);
document.getElementById('sort-by').addEventListener('change', (e) => sortImages(e.target.value));
document.getElementById('filter').addEventListener('input', (e) => filterImages(e.target.value));

browser.devtools.network.onNavigated.addListener(updateImages);
updateImages();
