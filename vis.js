document.addEventListener('DOMContentLoaded', function() {
    // 获取所有的柱子
    const bars = document.querySelectorAll('.bar');
    const tooltip = document.getElementById('tooltip');

    // 获取所有的扇形片段
    const slices = document.querySelectorAll('.slice');
    const tooltipCir = document.getElementById('tooltipCir');

    // 圓餅圖互動邏輯
    slices.forEach(slice => {
        slice.addEventListener('mousemove', showTooltipCir);
        slice.addEventListener('mouseout', hideTooltipCir);
    });

    function showTooltipCir(e) {
        const name = this.dataset.name;
        const value = this.dataset.value;
        tooltipCir.innerHTML = `${name}: ${value}`;
        tooltipCir.style.display = 'block';
        tooltipCir.style.left = e.pageX + 10 + 'px';
        tooltipCir.style.top = e.pageY + 10 + 'px';
    }

    function hideTooltipCir() {
        tooltipCir.style.display = 'none';
    }

    // 柱狀圖互動邏輯
    bars.forEach(bar => {
        bar.addEventListener('mouseover', (event) => {
            const label = event.target.getAttribute('data-label');
            const value = event.target.getAttribute('data-value');
            
            // 设置提示框内容
            tooltip.textContent = `${label}: ${value}`;
            
            // 显示提示框
            tooltip.style.display = 'block';
        });

        bar.addEventListener('mousemove', (event) => {
            // 使提示框跟随鼠标移动
            tooltip.style.left = event.pageX + 10 + 'px';
            tooltip.style.top = event.pageY + 10 + 'px';
        });

        bar.addEventListener('mouseout', () => {
            // 隐藏提示框
            tooltip.style.display = 'none';
        });
    });
});