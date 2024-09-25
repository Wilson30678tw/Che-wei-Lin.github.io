// Get all images with the class "zoom"
const images = document.querySelectorAll('.zoom');

// Loop through each image and add mouseover and mouseout event listeners
images.forEach(img => {
  img.addEventListener('mouseover', () => {
    // Reset all images to their original size (in case others are still zoomed)
    images.forEach(image => {
      image.style.transform = 'scale(1)'; // Ensure all images are reset
    });

    // Scale the currently hovered image
    img.style.transform = 'scale(1.2)';
  });

  img.addEventListener('mouseout', () => {
    // Reset the current image back to its original scale when mouse leaves
    img.style.transform = 'scale(1)';
  });
});