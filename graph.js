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
        this.margin = 40; // Margem para os números do eixo
  
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
      const data = this.data;
      const barWidth = (this.width - this.margin) / data.length;
  
      this.draw();  // Redesenhar o gráfico para limpar tooltips antigos
  
      data.forEach((item, index) => {
        const barHeight = item.value / Math.max(...data.map(d => d.value)) * (this.height - this.margin);
        const barX = index * barWidth + this.margin;
        const barY = this.height - barHeight - this.margin;
  
        if (x >= barX && x <= barX + barWidth - 5 && y >= barY) {
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          this.ctx.fillRect(x, y - 25, 50, 20);
          this.ctx.fillStyle = 'white';
          this.ctx.fillText(item.label + ': ' + item.value, x + 5, y - 10);
        }
      });
  
      this.drawAxes(); // Redesenhar os eixos para mantê-los visíveis
    }
  
    handleElementClick(x, y) {
      console.log('Clicked at', x, y);
    }
  
    draw() {
      this.clear();
      this.drawAxes();
      if (this.type === 'bar') {
        this.drawBarChart();
      } else if (this.type === 'line') {
        this.drawLineChart();
      }
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  
    drawAxes() {
      const ctx = this.ctx;
      const maxVal = Math.max(...this.data.map(d => d.value));
      const step = maxVal / 5;
  
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(this.margin, 0);
      ctx.lineTo(this.margin, this.height - this.margin);
      ctx.lineTo(this.width, this.height - this.margin);
      ctx.stroke();
  
      for (let i = 0; i <= 5; i++) {
        const y = (this.height - this.margin) - (i * step / maxVal * (this.height - this.margin));
        ctx.fillText((i * step).toFixed(0), 5, y);
        ctx.beginPath();
        ctx.moveTo(this.margin - 5, y);
        ctx.lineTo(this.margin, y);
        ctx.stroke();
      }
    }
  
    drawBarChart() {
      const ctx = this.ctx;
      const data = this.data;
      const barWidth = (this.width - this.margin) / data.length;
  
      data.forEach((item, index) => {
        const barHeight = item.value / Math.max(...data.map(d => d.value)) * (this.height - this.margin);
        ctx.fillStyle = item.color || 'blue';
        ctx.fillRect(index * barWidth + this.margin, this.height - barHeight - this.margin, barWidth - 5, barHeight);
      });
    }
  
    drawLineChart() {
      const ctx = this.ctx;
      const data = this.data;
      const stepX = (this.width - this.margin) / (data.length - 1);
  
      ctx.beginPath();
      ctx.moveTo(this.margin, this.height - this.margin - data[0].value / Math.max(...data.map(d => d.value)) * (this.height - this.margin));
  
      data.forEach((item, index) => {
        ctx.lineTo(index * stepX + this.margin, this.height - this.margin - item.value / Math.max(...data.map(d => d.value)) * (this.height - this.margin));
      });
  
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    }
  }
  
  // Exportando a biblioteca
  window.GraphJS = GraphJS;
  
