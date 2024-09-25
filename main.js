// zoom 图像
const images = document.querySelectorAll('.zoom');

// 鼠标悬停和鼠标移出事件
images.forEach(img => {
  img.addEventListener('mouseover', () => {
     // 将图像重置为原始大小
    images.forEach(image => {
      image.style.transform = 'scale(1)'; // Ensure all images are reset
    });

    // 調整大小
    img.style.transform = 'scale(1.2)';
  });

  img.addEventListener('mouseout', () => {
  
    img.style.transform = 'scale(1)';
  });
});