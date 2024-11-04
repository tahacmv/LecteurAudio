class AudioVisualizer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      this.shadowRoot.innerHTML = `
        <style>
          canvas {
            width: 100%;
            height: 300px;
            background-color: black;
            border-radius: 8px;
          }
        </style>
        
        <canvas id="visualizer"></canvas>
      `;
  
      this.canvas = this.shadowRoot.getElementById("visualizer");
      this.canvasContext = this.canvas.getContext("2d");
      this.analyser = null;
    }
  
    connectedCallback() {
      if (this.analyser) {
        this.startVisualization();
      }
    }
  
    // Method to set the analyser node from the audio player
    setAnalyserNode(analyser) {
      this.analyser = analyser;
      if (this.isConnected) {
        this.startVisualization();
      }
    }
  
    startVisualization() {
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      const canvasWidth = this.canvas.width;
      const canvasHeight = this.canvas.height;
      const barWidth = (canvasWidth / bufferLength) * 2.5;
  
      const draw = () => {
        requestAnimationFrame(draw);
  
        this.analyser.getByteFrequencyData(dataArray);
  
        this.canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
  
        let barHeight;
        let x = 0;
  
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          const red = (barHeight + 25) * 2;
          const green = 50 * (i / bufferLength);
          const blue = 255;
  
          this.canvasContext.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          this.canvasContext.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);
  
          x += barWidth + 1;
        }
      };
  
      draw();
    }
  }
  
  customElements.define("audio-visualizer", AudioVisualizer);
  