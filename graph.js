
class GraphJS {
    constructor(selector, options) {
      this.selector = selector;
      this.options = options;
      this.init();
    }
  
    init() {
      const element = document.querySelector(this.selector);
      if (element) {
        this.width = this.options.width || 600;
        this.height = this.options.height || 400;
        this.data = this.options.data || [];
        this.type = this.options.type || 'bar';
  
        element.innerHTML = `<canvas width="${this.width}" height="${this.height}"></canvas>`;
        this.canvas = element.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('click', this.handleClick.bind(this));
  
        this.draw();
      } else {
        console.error('Element not found');
      }
    }
  
    handleMouseMove(event) {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.showTooltip(x, y);
    }
  
    handleClick(event) {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.handleElementClick(x, y);
    }
  
    showTooltip(x, y) {
      // Logic to show tooltip when hovering over elements
      const data = this.data;
      const barWidth = this.width / data.length;
  
      data.forEach((item, index) => {
        const barHeight = item.value / Math.max(...data.map(d => d.value)) * this.height;
        const barX = index * barWidth;
        const barY = this.height - barHeight;
  
        if (x >= barX && x <= barX + barWidth - 5 && y >= barY) {
          this.draw();
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          this.ctx.fillRect(x, y - 25, 50, 20);
          this.ctx.fillStyle = 'white';
          this.ctx.fillText(item.label + ': ' + item.value, x + 5, y - 10);
        }
      });
    }
  
    handleElementClick(x, y) {
      // Logic to handle clicks on chart elements
      console.log('Clicked at', x, y);
    }
  
    draw() {
      this.clear();
      if (this.type === 'bar') {
        this.drawBarChart();
      } else if (this.type === 'line') {
        this.drawLineChart();
      }
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  
    drawBarChart() {
      const ctx = this.ctx;
      const data = this.data;
      const barWidth = this.width / data.length;
  
      data.forEach((item, index) => {
        const barHeight = item.value / Math.max(...data.map(d => d.value)) * this.height;
        ctx.fillStyle = item.color || 'blue';
        ctx.fillRect(index * barWidth, this.height - barHeight, barWidth - 5, barHeight);
      });
    }
  
    drawLineChart() {
      const ctx = this.ctx;
      const data = this.data;
      const stepX = this.width / (data.length - 1);
  
      ctx.beginPath();
      ctx.moveTo(0, this.height - data[0].value);
  
      data.forEach((item, index) => {
        ctx.lineTo(index * stepX, this.height - item.value);
      });
  
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    }
  }
  
  // Exportando a biblioteca
  window.GraphJS = GraphJS;
  
