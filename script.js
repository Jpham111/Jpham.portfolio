console.log('External script.js loaded - Updated with Hello text');

document.addEventListener('DOMContentLoaded', () => {
  console.log('External script.js DOMContentLoaded fired');
  
  // Preloader
  let percentage = 0;
  const percentageElement = document.querySelector('.loader-percentage');
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.loader-progress');

  const loadInterval = setInterval(() => {
      percentage += Math.random() * 15;
      if (percentage >= 100) {
          percentage = 100;
          clearInterval(loadInterval);
          setTimeout(() => {
              preloader.classList.add('fade-out');
          }, 500);
      }
      percentageElement.textContent = Math.floor(percentage) + '%';
      progressBar.style.width = percentage + '%';
  }, 100);
  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sun & Moon Tracker
  function updateSunPosition() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Calculate time as decimal (e.g., 14:30 = 14.5)
      const currentTime = hours + minutes / 60;
      
      // Sunrise at 6 AM, sunset at 6 PM (18:00)
      const sunrise = 6;
      const sunset = 18;
      const dayDuration = sunset - sunrise;
      
      const sun = document.getElementById('sun');
      const moon = document.getElementById('moon');
      const sunTracker = document.getElementById('sunTracker');
      const moonTracker = document.getElementById('moonTracker');
      const sunInfo = document.getElementById('sunInfo');
      const moonInfo = document.getElementById('moonInfo');
      const currentTimeEl = document.getElementById('currentTime');
      const currentTimeMoonEl = document.getElementById('currentTimeMoon');
      const dayProgressEl = document.getElementById('dayProgress');
      const nightProgressEl = document.getElementById('nightProgress');
      
      // Update time display
      const timeString = now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
      });
      currentTimeEl.textContent = timeString;
      currentTimeMoonEl.textContent = timeString;
      
      // Check if it's day or night
      const isDay = currentTime >= sunrise && currentTime < sunset;
      
      if (isDay) {
          // Show sun, hide moon
          sunTracker.style.opacity = '1';
          moonTracker.style.opacity = '0';
          sunInfo.style.opacity = '1';
          moonInfo.style.opacity = '0';
          document.body.classList.remove('night-mode');
          
          // Sun movement
          const progress = (currentTime - sunrise) / dayDuration;
          const x = progress * window.innerWidth;
          const arcProgress = progress * Math.PI;
          const y = window.innerHeight * 0.7 - (Math.sin(arcProgress) * window.innerHeight * 0.5);
          
          sun.style.left = x + 'px';
          sun.style.top = y + 'px';
          dayProgressEl.textContent = Math.round(progress * 100) + '%';
          
          const scale = 0.8 + (Math.sin(progress * Math.PI) * 0.4);
          sun.style.transform = `translate(-50%, -50%) scale(${scale})`;
      } else {
          // Show moon, hide sun
          sunTracker.style.opacity = '0';
          moonTracker.style.opacity = '1';
          sunInfo.style.opacity = '0';
          moonInfo.style.opacity = '1';
          document.body.classList.add('night-mode');
          
          // Moon movement (sunset to sunrise next day)
          let progress, x, y;
          const nightStart = sunset;
          const nightEnd = sunrise + 24; // Next day's sunrise
          const nightDuration = nightEnd - nightStart;
          
          let adjustedTime = currentTime;
          if (currentTime < sunrise) {
              adjustedTime = currentTime + 24; // Add 24 hours for times after midnight
          }
          
          progress = (adjustedTime - nightStart) / nightDuration;
          x = progress * window.innerWidth;
          
          const arcProgress = progress * Math.PI;
          y = window.innerHeight * 0.7 - (Math.sin(arcProgress) * window.innerHeight * 0.5);
          
          moon.style.left = x + 'px';
          moon.style.top = y + 'px';
          nightProgressEl.textContent = Math.round(progress * 100) + '%';
          
          const scale = 0.8 + (Math.sin(progress * Math.PI) * 0.3);
          moon.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
  }

  // Update position every minute
  updateSunPosition();
  setInterval(updateSunPosition, 60000);

  // Update on window resize
  window.addEventListener('resize', updateSunPosition);

  // Simple test first
  console.log('Script loaded successfully');
  
  // Text scramble effect for JAY PHAM (looping) - only on index page
  const scrambleTitle = document.getElementById('scramble-title');
  console.log('Scramble title element:', scrambleTitle);
  
  if (scrambleTitle && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
    console.log('Starting scramble effect');
    const originalText = 'JAY PHAM';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Simple test - change text immediately
    scrambleTitle.textContent = 'JAY PHAM';
    
    const scramble = () => {
      let iterations = 0;
      const maxIterations = 30;
      
      const animate = () => {
        if (iterations < maxIterations) {
          scrambleTitle.textContent = originalText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
          iterations++;
          setTimeout(animate, 50);
        } else {
          scrambleTitle.textContent = originalText;
          // Wait 3 seconds before starting the next loop
          setTimeout(scramble, 3000);
        }
      };
      
      // Start after 1 second
      setTimeout(animate, 1000);
    };
    
    // Start scramble after 2 seconds
    setTimeout(scramble, 2000);
  } else {
    console.log('ERROR: Scramble title element not found');
  }

  // Date/Time scramble effect for San Francisco time
  const datetimeElement = document.getElementById('datetime-scramble');
  console.log('Datetime element:', datetimeElement);
  
  if (datetimeElement && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
    console.log('Starting datetime scramble effect');
    
    const getSFDateTime = () => {
      const now = new Date();
      const sfTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      const month = String(sfTime.getMonth() + 1).padStart(2, '0');
      const day = String(sfTime.getDate()).padStart(2, '0');
      const year = sfTime.getFullYear();
      const hours = String(sfTime.getHours()).padStart(2, '0');
      const minutes = String(sfTime.getMinutes()).padStart(2, '0');
      const ampm = sfTime.getHours() >= 12 ? 'PM' : 'AM';
      
      return `${month}/${day}/${year} ${hours} ${minutes} ${ampm}`;
    };
    
    const datetimeChars = '0123456789/ :APM';
    
    const scrambleDateTime = () => {
      const targetText = getSFDateTime();
      let iterations = 0;
      const maxIterations = 15;
      
      const animate = () => {
        if (iterations < maxIterations) {
          datetimeElement.textContent = targetText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return targetText[index];
              }
              return datetimeChars[Math.floor(Math.random() * datetimeChars.length)];
            })
            .join('');
          iterations++;
          setTimeout(animate, 80);
        } else {
          datetimeElement.textContent = targetText;
        }
      };
      
      animate();
    };
    
    // Update datetime every 15 seconds with scramble effect
    const updateDateTime = () => {
      scrambleDateTime();
      setTimeout(updateDateTime, 15000);
    };
    
    // Start immediately and then every 15 seconds
    scrambleDateTime();
    setTimeout(updateDateTime, 15000);
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver for reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // Optional: bounce chevron a tiny bit to hint scroll
  const chev = document.querySelector('.chevron');
  if (chev) {
    chev.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(6px)' },
      { transform: 'translateY(0)' }
    ], { duration: 1600, iterations: Infinity, easing: 'ease-in-out' });
  }

  // Case study (legacy selector): smooth scroll + active section highlighting
  const csNavLinks = document.querySelectorAll('.cs-nav a[href^="#"]');
  if (csNavLinks.length) {
    csNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', id);
        }
      });
    });

    const sections = Array.from(csNavLinks).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const setActive = (id) => {
      csNavLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive('#' + entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(sec => obs.observe(sec));
  }

  // Case study (study-sidebar) scroll + scrollspy
  const studyLayout = document.querySelector('.study-layout');
  if (studyLayout) {
    const links = Array.from(document.querySelectorAll('.study-sidebar a[href^="#"]'));
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    links.forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
        history.replaceState(null, '', id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] });

    sections.forEach(sec => spy.observe(sec));
  }

  // Music Player Functionality
  if (window.location.pathname.includes('radio.html')) {
    console.log('Initializing music player on radio page');
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
      initMusicPlayer();
    }, 100);
  }
});

// Music Player Class
class MusicPlayer {
  constructor() {
    console.log('MusicPlayer constructor called');
    
    this.audio = document.getElementById('audio-player');
    this.playToggle = document.getElementById('play-toggle');
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.shuffleBtn = document.getElementById('shuffle-btn');
    this.progressBar = document.getElementById('progress-bar');
    this.progressFill = document.getElementById('progress-fill');
    this.progressHandle = document.getElementById('progress-handle');
    this.currentTimeEl = document.getElementById('current-time');
    this.remainingTimeEl = document.getElementById('remaining-time');
    this.trackTitle = document.getElementById('track-title');
    this.artistName = document.getElementById('artist-name');
    this.albumArt = document.getElementById('album-art');
    this.volumeBars = document.getElementById('volume-bars');
    this.playlist = document.getElementById('playlist');
    this.fileInput = document.getElementById('file-input');
    this.fileUploadArea = document.getElementById('file-upload-area');
    this.adminPanel = document.getElementById('admin-panel');
    this.adminToggle = document.getElementById('admin-toggle');
    this.savePlaylistBtn = document.getElementById('save-playlist');
    this.clearPlaylistBtn = document.getElementById('clear-playlist');
    
    console.log('Admin toggle element found:', this.adminToggle);
    this.volumeBtn = document.getElementById('volume-btn');
    this.volumeSlider = document.getElementById('volume-slider');
    this.volumeValue = document.getElementById('volume-value');

    // Password for admin access (change this to your desired password)
    this.adminPassword = 'admin123';
    this.isAdminMode = false;

    // Start with empty playlist - no placeholder songs
    this.songs = [];
    
    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.isShuffled = false;
    this.shuffledIndices = [];
    this.volume = 0.7; // Default volume (70%)
    this.isMuted = false;

    console.log('MusicPlayer constructor completed, calling init()');
    this.init().catch(error => {
      console.error('Error during MusicPlayer initialization:', error);
    });
  }

  async init() {
    console.log('MusicPlayer init() called');
    this.setupEventListeners();
    this.setupFileUpload();
    this.setupAdminPanel();
    console.log('About to load playlist from storage...');
    await this.loadPlaylistFromStorage();
    console.log('About to render playlist...');
    this.renderPlaylist();
    this.updateDisplay();
    this.setVolume(this.volume); // Initialize volume
    console.log('MusicPlayer init() completed');
  }

  setupEventListeners() {
    // Play/Pause
    this.playToggle.addEventListener('change', () => {
      if (this.playToggle.checked) {
        this.play();
      } else {
        this.pause();
      }
    });

    // Control buttons
    this.prevBtn.addEventListener('click', () => this.previousSong());
    this.nextBtn.addEventListener('click', () => this.nextSong());
    this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());

    // Progress bar
    this.progressBar.addEventListener('click', (e) => this.seekTo(e));

    // Audio events
    this.audio.addEventListener('loadedmetadata', () => this.updateDisplay());
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.nextSong());
    this.audio.addEventListener('play', () => this.onPlay());
    this.audio.addEventListener('pause', () => this.onPause());

    // Volume control
    this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value / 100));
    this.volumeBtn.addEventListener('click', () => this.toggleMute());
  }

  setupFileUpload() {
    // Click to upload (only in admin mode)
    this.fileUploadArea.addEventListener('click', () => {
      if (this.isAdminMode) {
        this.fileInput.click();
      } else {
        alert('Please enter admin mode to upload files. Click the 🔧 button and enter the password.');
      }
    });

    // File selection
    this.fileInput.addEventListener('change', (e) => {
      if (this.isAdminMode) {
        this.handleFiles(e.target.files);
      }
    });

    // Drag and drop
    this.fileUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (this.isAdminMode) {
        this.fileUploadArea.classList.add('dragover');
      }
    });

    this.fileUploadArea.addEventListener('dragleave', () => {
      this.fileUploadArea.classList.remove('dragover');
    });

    this.fileUploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      this.fileUploadArea.classList.remove('dragover');
      if (this.isAdminMode) {
        this.handleFiles(e.dataTransfer.files);
      } else {
        alert('Please enter admin mode to upload files. Click the 🔧 button and enter the password.');
      }
    });
  }

  setupAdminPanel() {
    // Admin toggle button
    console.log('Setting up admin panel, adminToggle element:', this.adminToggle);
    this.adminToggle.addEventListener('click', () => {
      console.log('Admin toggle clicked');
      this.toggleAdminPanel();
    });

    // Admin buttons
    this.savePlaylistBtn.addEventListener('click', async () => {
      await this.savePlaylistToStorage();
      alert('Playlist saved successfully!');
    });

    this.clearPlaylistBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to clear all songs from the playlist?')) {
        this.songs = [];
        this.renderPlaylist();
        await this.savePlaylistToStorage();
        console.log('Playlist cleared');
      }
    });
  }

  toggleAdminPanel() {
    if (!this.isAdminMode) {
      const password = prompt('Enter admin password:');
      if (password === this.adminPassword) {
        this.isAdminMode = true;
        this.adminPanel.style.display = 'block';
        this.adminToggle.textContent = '🔒';
        this.adminToggle.style.background = '#ff4757';
        this.adminToggle.style.color = '#fff';
        console.log('Admin mode activated');
      } else {
        alert('Incorrect password!');
      }
    } else {
      this.isAdminMode = false;
      this.adminPanel.style.display = 'none';
      this.adminToggle.textContent = '🔧';
      this.adminToggle.style.background = '#fff';
      this.adminToggle.style.color = '#000';
      console.log('Admin mode deactivated');
    }
  }

  async loadPlaylistFromStorage() {
    console.log('loadPlaylistFromStorage called');
    
    // Check if IndexedDB is available
    if (!window.indexedDB) {
      console.error('IndexedDB is not supported by this browser');
      this.songs = [];
      return;
    }
    
    try {
      const songs = await this.getSongsFromIndexedDB();
      this.songs = songs;
      console.log('Loaded playlist from IndexedDB:', this.songs.length, 'songs');
      console.log('Songs loaded:', this.songs.map(song => ({ title: song.title, isUploaded: song.isUploaded })));
    } catch (e) {
      console.error('Error loading playlist from IndexedDB:', e);
      this.songs = [];
    }
  }

  async savePlaylistToStorage() {
    try {
      console.log('Saving playlist to IndexedDB:', this.songs.length, 'songs');
      console.log('Songs saved:', this.songs.map(song => ({ title: song.title, isUploaded: song.isUploaded })));
      
      await this.saveSongsToIndexedDB(this.songs);
      console.log('Successfully saved to IndexedDB');
    } catch (e) {
      console.error('Error saving playlist to IndexedDB:', e);
      alert('Error saving playlist. Please try again.');
    }
  }

  async handleFiles(files) {
    console.log('handleFiles called, admin mode:', this.isAdminMode);
    if (!this.isAdminMode) {
      console.log('Not in admin mode, returning');
      return;
    }
    
    const filePromises = Array.from(files).map(async (file) => {
      console.log('Processing file:', file.name, 'Type:', file.type);
      if (file.type.startsWith('audio/')) {
        try {
          // Convert file to base64 for persistent storage
          const base64Data = await this.fileToBase64(file);
          const song = {
            title: this.getFileNameWithoutExtension(file.name),
            artist: 'Unknown Artist',
            url: base64Data, // Store as base64 data URL
            isPlaceholder: false,
            isPermanent: false,
            isUploaded: true
          };
          console.log('Added song:', song.title);
          return song;
        } catch (error) {
          console.error('Error processing file:', error);
          return null;
        }
      } else {
        console.log('File not audio type:', file.type);
        return null;
      }
    });

    const newSongs = await Promise.all(filePromises);
    const validSongs = newSongs.filter(song => song !== null);
    this.songs.push(...validSongs);

    this.renderPlaylist();
    await this.savePlaylistToStorage();
    if (this.songs.length > 0 && !this.audio.src) {
      this.loadSong(0);
    }
  }

  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  getFileNameWithoutExtension(filename) {
    return filename.replace(/\.[^/.]+$/, '');
  }

  renderPlaylist() {
    console.log('Rendering playlist with', this.songs.length, 'songs');
    this.playlist.innerHTML = '';
    
    if (this.songs.length === 0) {
      console.log('No songs to render, showing empty message');
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'playlist-empty';
      emptyMessage.innerHTML = `
        <div style="text-align: center; color: var(--muted); padding: 20px;">
          <p>No songs in playlist</p>
          <small>Use admin panel to add songs</small>
        </div>
      `;
      this.playlist.appendChild(emptyMessage);
      return;
    }
    
    this.songs.forEach((song, index) => {
      const playlistItem = document.createElement('div');
      playlistItem.className = 'playlist-item';
      if (index === this.currentSongIndex) {
        playlistItem.classList.add('active');
      }

      playlistItem.innerHTML = `
        <div class="playlist-art"></div>
        <div class="playlist-info">
          <div class="playlist-title">${song.title} ${song.isUploaded ? '<span class="uploaded-badge">📁</span>' : ''}</div>
          <div class="playlist-artist">${song.artist}</div>
        </div>
        <div class="playlist-duration">--:--</div>
        ${this.isAdminMode ? `<button class="remove-song" data-index="${index}">×</button>` : ''}
      `;

      playlistItem.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-song')) {
          this.loadSong(index);
          this.play();
        }
      });

      // Add remove button functionality for admin
      if (this.isAdminMode) {
        const removeBtn = playlistItem.querySelector('.remove-song');
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeSong(index);
        });
      }

      this.playlist.appendChild(playlistItem);
    });
  }

  async removeSong(index) {
    if (this.isAdminMode) {
      if (confirm('Remove this song from playlist?')) {
        this.songs.splice(index, 1);
        if (this.currentSongIndex >= this.songs.length) {
          this.currentSongIndex = Math.max(0, this.songs.length - 1);
        }
        this.renderPlaylist();
        await this.savePlaylistToStorage();
        console.log('Song removed from playlist');
      }
    }
  }

  loadSong(index) {
    if (this.songs.length === 0) return;

    this.currentSongIndex = index;
    const song = this.songs[index];
    
    // Handle both regular URLs and base64 data URLs
    this.audio.src = song.url;
    this.trackTitle.textContent = song.title;
    this.artistName.textContent = song.artist;
    
    // Update active playlist item
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    this.updateDisplay();
  }

  play() {
    if (this.songs.length === 0) return;
    
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.playToggle.checked = true;
      
      // Sync with global player
      if (window.globalMusicPlayer) {
        window.globalMusicPlayer.syncWithRadioPlayer(this);
      }
    }).catch(e => {
      console.error('Error playing audio:', e);
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.playToggle.checked = false;
    
    // Sync with global player
    if (window.globalMusicPlayer) {
      window.globalMusicPlayer.syncWithRadioPlayer(this);
    }
  }

  previousSong() {
    if (this.songs.length === 0) return;
    
    let newIndex;
    if (this.isShuffled && this.shuffledIndices.length > 0) {
      const currentShuffledIndex = this.shuffledIndices.indexOf(this.currentSongIndex);
      newIndex = currentShuffledIndex > 0 ? 
        this.shuffledIndices[currentShuffledIndex - 1] : 
        this.shuffledIndices[this.shuffledIndices.length - 1];
    } else {
      newIndex = this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.songs.length - 1;
    }
    
    this.loadSong(newIndex);
    this.play();
    
    // Sync with global player
    if (window.globalMusicPlayer) {
      window.globalMusicPlayer.syncWithRadioPlayer(this);
    }
  }

  nextSong() {
    if (this.songs.length === 0) return;
    
    let newIndex;
    if (this.isShuffled && this.shuffledIndices.length > 0) {
      const currentShuffledIndex = this.shuffledIndices.indexOf(this.currentSongIndex);
      newIndex = currentShuffledIndex < this.shuffledIndices.length - 1 ? 
        this.shuffledIndices[currentShuffledIndex + 1] : 
        this.shuffledIndices[0];
    } else {
      newIndex = this.currentSongIndex < this.songs.length - 1 ? this.currentSongIndex + 1 : 0;
    }
    
    this.loadSong(newIndex);
    this.play();
    
    // Sync with global player
    if (window.globalMusicPlayer) {
      window.globalMusicPlayer.syncWithRadioPlayer(this);
    }
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    this.shuffleBtn.style.opacity = this.isShuffled ? '1' : '0.6';
    
    if (this.isShuffled) {
      this.shuffledIndices = [...Array(this.songs.length).keys()];
      // Fisher-Yates shuffle
      for (let i = this.shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledIndices[i], this.shuffledIndices[j]] = [this.shuffledIndices[j], this.shuffledIndices[i]];
      }
    }
  }

  seekTo(e) {
    if (!this.audio.duration) return;
    
    const rect = this.progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * this.audio.duration;
    
    this.audio.currentTime = newTime;
  }

  updateProgress() {
    if (!this.audio.duration) return;
    
    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressFill.style.width = `${progress}%`;
    this.progressHandle.style.left = `${progress}%`;
    
    this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    this.remainingTimeEl.textContent = `-${this.formatTime(this.audio.duration - this.audio.currentTime)}`;
  }

  updateDisplay() {
    if (this.audio.duration) {
      this.remainingTimeEl.textContent = this.formatTime(this.audio.duration);
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onPlay() {
    this.volumeBars.style.animationPlayState = 'running';
    document.querySelectorAll('.volume-bars .bar').forEach(bar => {
      bar.style.animationPlayState = 'running';
    });
  }

  onPause() {
    this.volumeBars.style.animationPlayState = 'paused';
    document.querySelectorAll('.volume-bars .bar').forEach(bar => {
      bar.style.animationPlayState = 'paused';
    });
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.volume;
    this.volumeSlider.value = Math.round(this.volume * 100);
    this.volumeValue.textContent = Math.round(this.volume * 100) + '%';
    
    // Update volume button state
    if (this.volume === 0) {
      this.volumeBtn.classList.add('muted');
    } else {
      this.volumeBtn.classList.remove('muted');
    }
  }

  toggleMute() {
    if (this.isMuted) {
      // Unmute
      this.audio.volume = this.volume;
      this.volumeSlider.value = Math.round(this.volume * 100);
      this.volumeValue.textContent = Math.round(this.volume * 100) + '%';
      this.volumeBtn.classList.remove('muted');
      this.isMuted = false;
    } else {
      // Mute
      this.audio.volume = 0;
      this.volumeSlider.value = 0;
      this.volumeValue.textContent = '0%';
      this.volumeBtn.classList.add('muted');
      this.isMuted = true;
    }
  }

  // IndexedDB helper methods
  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('RadioPlaylistDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('songs')) {
          db.createObjectStore('songs', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async saveSongsToIndexedDB(songs) {
    const db = await this.openDB();
    const transaction = db.transaction(['songs'], 'readwrite');
    const store = transaction.objectStore('songs');
    
    // Clear existing songs
    await new Promise((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    });
    
    // Add new songs
    for (const song of songs) {
      await new Promise((resolve, reject) => {
        const addRequest = store.add(song);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      });
    }
  }

  async getSongsFromIndexedDB() {
    const db = await this.openDB();
    const transaction = db.transaction(['songs'], 'readonly');
    const store = transaction.objectStore('songs');
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }
}

// Initialize music player
function initMusicPlayer() {
  new MusicPlayer();
}