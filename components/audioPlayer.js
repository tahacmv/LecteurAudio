class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // List of audio files
    this.audioTracks = [
      "Audio 1",
      "Audio 2",
      "Audio 3",
    ]
    this.audioFiles = [
      "../data/audio1.mp3",
      "../data/audio2.mp3",
      "../data/audio3.mp3",
    ];
    this.currentIndex = 0; // Start with the first audio file

    this.shadowRoot.innerHTML = `
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <img 
                      src="https://img.freepik.com/free-psd/square-flyer-template-maximalist-business_23-2148524497.jpg?w=1800&t=st=1699458420~exp=1699459020~hmac=5b00d72d6983d04966cc08ccd0fc1f80ad0d7ba75ec20316660e11efd18133cd" 
                      alt="" 
                      width="88" 
                      height="88" 
                      style="
                        flex: none; 
                        border-radius: 0.5rem; 
                        background-color: #f1f5f9;" 
                      loading="lazy" 
                    />
                    <div style="min-width: 0; flex: 1; font-weight: 600;">
                      <p style="
                        color: #0e7490; /* text-cyan-500 */
                        font-size: 0.875rem;
                        line-height: 1.5rem;">
                        <abbr title="Track">Track:</abbr> <span id="trackNumber">${this.currentIndex + 1}</span>
                      </p>
                      <h2 style="
                        color: #64748b; /* text-slate-500 */
                        font-size: 0.875rem;
                        line-height: 1.5rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;">
                        Music: Audio Player
                      </h2>
                      <p style="
                        color: #0f172a; /* text-slate-900 */
                        font-size: 1.125rem;" id="trackName">
                        ${this.audioTracks[this.currentIndex]}
                      </p>
                    </div>
                  </div>
                  <audio id="audioElement" src="${this.audioFiles[this.currentIndex]}"></audio>
                      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                          <div style="background-color: #f1f5f9; border-radius: 9999px; overflow: hidden;">
                              <input 
                                  type="range" 
                                  id="progress" 
                                  style="
                                      width: 100%; 
                                      height: 0.5rem; 
                                      appearance: none; 
                                      cursor: pointer;
                                      accent-color: cyan;
                                  " 
                                  value="0" 
                                  min="0" 
                                  max="100" 
                              />
                          </div>
                      </div>
  
  
                  <div style="background-color: rgb(248 250 252); color: rgb(100 116 139); border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; display: flex; align-items: center;">
                      <!-- Rewind Button Section -->
                    <div style="flex: 1; display: flex; align-items: center; justify-content: space-evenly;">
                      <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.5" style="width: 150px;">
                      <button type="button" id="previous" style="
                            background-color: #ffffff; 
                            color: #1e293b; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            width: 3rem; 
                            height: 3rem; 
                            border-radius: 50%; 
                            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
                            border: 1px solid rgba(15, 23, 42, 0.05);" >
                            <svg width="24" height="24" fill="none">
                              <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              <path d="M6 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <button type="button" aria-label="Rewind 10 seconds" id="reverseButton" style="
                            background-color: #ffffff; 
                            color: #1e293b; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            width: 3rem; 
                            height: 3rem; 
                            border-radius: 50%; 
                            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
                            border: 1px solid rgba(15, 23, 42, 0.05); 
                        ">
                            <svg width="24" height="24" fill="none">
                                <path d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </div>
  
                      <!-- Play/Pause Toggle Button Section -->
                      <div style="display: flex; align-items: center; justify-content: center;" id="playPauseContainer">
                          <button id="playPauseButton" style="
                              background-color: #ffffff; 
                              color: #1e293b; 
                              display: flex; 
                              align-items: center; 
                              justify-content: center;
                              width: 5rem; 
                              height: 5rem; 
                              border-radius: 50%; 
                              box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
                              border: 1px solid rgba(15, 23, 42, 0.05); 
                              margin: 0 -0.5rem; 
                              margin-left: auto; 
                              margin-right: auto;">
                                  <svg id="playPauseIcon" width="30" height="32" fill="currentColor" viewBox="0 0 30 32">
                                      <!-- Play Icon -->
                                      <polygon points="6,4 26,16 6,28" fill="currentColor"></polygon>
                                  </svg>
                          </button>
                      </div>
  
                      <!-- Forward Button Section -->
                    <div style="flex: 1; display: flex; align-items: center; justify-content: space-evenly;">
                        <button type="button" aria-label="Forward 10 seconds" id="forwardButton" style="
                            background-color: #ffffff; 
                            color: #1e293b; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            width: 3rem; 
                            height: 3rem; 
                            border-radius: 50%; 
                            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
                            border: 1px solid rgba(15, 23, 42, 0.05); 
                        ">
                            <svg width="24" height="24" fill="none">
                                <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <button type="button" id="next" style="
                            background-color: #ffffff; 
                            color: #1e293b; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            width: 3rem; 
                            height: 3rem; 
                            border-radius: 50%; 
                            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
                            border: 1px solid rgba(15, 23, 42, 0.05);">
                            <svg width="24" height="24" fill="none">
                              <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              <path d="M18 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <div style="width: 150px; "/>
                    </div>
                  </div>
          `;

    // Reference elements
    this.audio = this.shadowRoot.getElementById("audioElement");
    this.playPauseButton = this.shadowRoot.getElementById("playPauseButton");
    this.playPauseIcon = this.shadowRoot.getElementById("playPauseIcon");
    this.reverseButton = this.shadowRoot.getElementById("reverseButton");
    this.forwardButton = this.shadowRoot.getElementById("forwardButton");
    this.volumeSlider = this.shadowRoot.getElementById("volumeSlider");
    this.progress = this.shadowRoot.getElementById("progress");
    this.previousButton = this.shadowRoot.getElementById("previous");
    this.nextButton = this.shadowRoot.getElementById("next");
    this.trackNumber = this.shadowRoot.getElementById("trackNumber");
    this.trackName = this.shadowRoot.getElementById("trackName");

    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.audioSource = this.audioContext.createMediaElementSource(this.audio);
    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  connectedCallback() {
    // Event listeners
    this.playPauseButton.addEventListener("click", () =>
      this.togglePlayPause()
    );
    this.reverseButton.addEventListener("click", () => this.reverseAudio());
    this.forwardButton.addEventListener("click", () => this.forwardAudio());
    this.previousButton.addEventListener("click", () => this.playPrevious());
    this.nextButton.addEventListener("click", () => this.playNext());
    this.volumeSlider.addEventListener("input", () => this.adjustVolume());
    this.progress.addEventListener("input", (e) => this.seekAudio(e));

    // Update progress bar as audio plays
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
  }

  showVolumeSlider() {
    this.volumeSlider.style.opacity = 1;
    this.volumeSlider.style.visibility = "visible";
  }

  togglePlayPause() {
    if (this.audio.paused) {
      this.audio.play();
      this.setPauseIcon();
    } else {
      this.audio.pause();
      this.setPlayIcon();
    }
  }

  setPlayIcon() {
    this.playPauseIcon.innerHTML = `<polygon points="6,4 26,16 6,28" fill="currentColor"></polygon>`;
  }

  setPauseIcon() {
    this.playPauseIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="24" rx="2"></rect>
        <rect x="20" y="4" width="4" height="24" rx="2"></rect>`;
  }


  playPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadCurrentAudio();
    }
  }

  playNext() {
    if (this.currentIndex < this.audioFiles.length - 1) {
      this.currentIndex++;
      this.loadCurrentAudio();
    }
  }

  loadCurrentAudio() {
    this.audio.src = this.audioFiles[this.currentIndex];
    this.audio.load();
    this.audio.play();
    this.trackName.textContent = this.audioTracks[this.currentIndex];
    this.trackNumber.textContent = this.currentIndex +1;
    this.setPauseIcon();
  }

  reverseAudio() {
    this.audio.currentTime -= 5;
  }

  forwardAudio() {
    this.audio.currentTime += 5;
  }

  adjustVolume() {
    this.audio.volume = this.volumeSlider.value;
  }

  updateProgress() {
    const progressPercentage =
      (this.audio.currentTime / this.audio.duration) * 100;
    this.progress.value = progressPercentage || 0;
  }

  seekAudio(event) {
    const seekTime = (event.target.value / 100) * this.audio.duration;
    this.audio.currentTime = seekTime;
  }
  getAnalyserNode(){
    return this.analyser;
  }
}

customElements.define("audio-player", AudioPlayer);
