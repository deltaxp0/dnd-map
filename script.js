document.addEventListener("DOMContentLoaded", function () {
    const imgContainer = document.querySelector('.static-image-container');
    const img = imgContainer.querySelector('img');
    const text = document.querySelector('.section-header');

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    imgContainer.addEventListener('wheel', function (e) {
        e.preventDefault();

        const rect = img.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = scale * delta;

        const originX = (offsetX / rect.width) * 100;
        const originY = (offsetY / rect.height) * 100;

        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${newScale})`;
        img.style.transformOrigin = `${originX}% ${originY}%`;

        scale = newScale;

        if (scale > 1) {
            text.style.display = 'none';
        } else {
            text.style.display = 'block';
        }

        if (scale <= 1) {
            scale = 1;
            translateX = 0;
            translateY = 0;
            img.style.transform = `translate(0, 0) scale(1)`;
            img.style.cursor = 'default';
        }
    });

    imgContainer.addEventListener('mousedown', function (e) {
        if (scale > 1) {
            isPanning = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            img.style.cursor = 'grabbing';
        }
    });

    imgContainer.addEventListener('mousemove', function (e) {
        if (!isPanning) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });

    imgContainer.addEventListener('mouseup', function () {
        isPanning = false;
        img.style.cursor = scale > 1 ? 'grab' : 'default';
    });

    imgContainer.addEventListener('mouseleave', function () {
        isPanning = false;
        img.style.cursor = scale > 1 ? 'grab' : 'default';
    });
});