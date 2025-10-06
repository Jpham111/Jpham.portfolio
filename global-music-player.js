// Global Music Player
class GlobalMusicPlayer {
  constructor() {
    this.audio = document.getElementById('global-audio-player');
    this.playPauseBtn = document.getElementById('global-play-pause');
    this.nextBtn = document.getElementById('global-next');
    this.volumeBtn = document.getElementById('global-volume-btn');
    this.volumeSlider = document.getElementById('global-volume-slider');
    this.trackTitle = document.getElementById('global-track-title');
    this.artistName = document.getElementById('global-artist-name');
    this.albumArt = document.getElementById('global-album-art');
    this.player = document.getElementById('global-music-player');
    
    this.isPlaying = false;
    this.volume = 0.7;
    this.isMuted = false;
    this.currentSong = null;
    this.playlist = [];
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadPlaylistFromStorage();
    this.setVolume(this.volume);
    
    // Show player if music is playing
    if (this.currentSong) {
      this.showPlayer();
    }
  }
  
  setupEventListeners() {
    this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    this.nextBtn.addEventListener('click', () => this.nextSong());
    this.volumeBtn.addEventListener('click', () => this.toggleMute());
    this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value / 100));
    
    this.audio.addEventListener('play', () => this.onPlay());
    this.audio.addEventListener('pause', () => this.onPause());
    this.audio.addEventListener('ended', () => this.nextSong());
  }
  
  async loadPlaylistFromStorage() {
    try {
      const songs = await this.getSongsFromIndexedDB();
      this.playlist = songs;
      
      // If there's a current song, restore it
      const currentSongData = localStorage.getItem('currentSong');
      if (currentSongData) {
        const songData = JSON.parse(currentSongData);
        this.currentSong = songData;
        this.loadSong(songData);
        this.showPlayer();
      }
    } catch (error) {
      console.error('Error loading playlist:', error);
    }
  }
  
  async getSongsFromIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('RadioPlaylistDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['songs'], 'readonly');
        const store = transaction.objectStore('songs');
        const getAllRequest = store.getAll();
        
        getAllRequest.onsuccess = () => resolve(getAllRequest.result || []);
        getAllRequest.onerror = () => reject(getAllRequest.error);
      };
    });
  }
  
  loadSong(song) {
    this.currentSong = song;
    this.audio.src = song.url;
    this.trackTitle.textContent = song.title;
    this.artistName.textContent = song.artist;
    
    // Save current song to localStorage
    localStorage.setItem('currentSong', JSON.stringify(song));
  }
  
  play() {
    if (this.currentSong) {
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.showPlayer();
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }
  
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  nextSong() {
    if (this.playlist.length === 0) return;
    
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    const song = this.playlist[this.currentIndex];
    this.loadSong(song);
    this.play();
  }
  
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.volume;
    this.volumeSlider.value = Math.round(this.volume * 100);
    
    if (this.volume === 0) {
      this.player.classList.add('muted');
    } else {
      this.player.classList.remove('muted');
    }
  }
  
  toggleMute() {
    if (this.isMuted) {
      this.audio.volume = this.volume;
      this.volumeSlider.value = Math.round(this.volume * 100);
      this.player.classList.remove('muted');
      this.isMuted = false;
    } else {
      this.audio.volume = 0;
      this.volumeSlider.value = 0;
      this.player.classList.add('muted');
      this.isMuted = true;
    }
  }
  
  showPlayer() {
    this.player.classList.add('visible');
  }
  
  hidePlayer() {
    this.player.classList.remove('visible');
  }
  
  onPlay() {
    this.isPlaying = true;
    this.player.classList.add('playing');
  }
  
  onPause() {
    this.isPlaying = false;
    this.player.classList.remove('playing');
  }
  
  // Method to be called from the main radio player
  syncWithRadioPlayer(radioPlayer) {
    if (radioPlayer.currentSong) {
      this.currentSong = radioPlayer.currentSong;
      this.playlist = radioPlayer.songs;
      this.currentIndex = radioPlayer.currentSongIndex;
      this.volume = radioPlayer.volume;
      this.isPlaying = radioPlayer.isPlaying;
      
      this.loadSong(this.currentSong);
      this.setVolume(this.volume);
      
      if (this.isPlaying) {
        this.audio.currentTime = radioPlayer.audio.currentTime;
        this.play();
      }
      
      this.showPlayer();
    }
  }
}

// Initialize global music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.globalMusicPlayer = new GlobalMusicPlayer();
});
