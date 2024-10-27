export default class Youtube {
  constructor(element) {
    this.element = element;
    this.youtubeContainer = this.element.querySelector('.js-youtube');
    this.poster = this.element.querySelector('.js-poster');
    this.youtubeId = this.element.dataset.videoId;
    this.autoplay = this.poster ? 1 : 0;
    this.playerReady = false;
    this.options = {
      noControls: 1,
      mute: 0,
    };

    Youtube.instances.push(this);

    if (this.youtubeId) {
      Youtube.loadScript();
    } else {
      /* console.error('Vous devez spécifier un iD'); */
    }
  }
  static loadScript() {
    // get and initiate Youtube API / chercher et initié YouTube API
    if (!Youtube.scriptIsLoading) {
      Youtube.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  init() {
    this.setOptions();
    this.initPlayer = this.initPlayer.bind(this);

    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer);
    } else {
      this.initPlayer();
    }
  }
  setOptions() {
    if ('noControls' in this.element.dataset) {
      this.options.noControls = 0;
    }
    if ('mute' in this.element.dataset) {
      this.options.mute = 1;
    }
  }
  initPlayer(event) {
    if (event) {
      this.element.removeEventListener('click', this.initPlayer);
    }
    // render css of YouTube player in the page / rendu css du player YouTube dans la page
    this.player = new YT.Player(this.youtubeContainer, {
      height: '100%',
      width: '100%',
      videoId: this.youtubeId,
      playerVars: {
        rel: 0,
        autoplay: this.autoplay,
        controls: this.options.noControls,
        mute: this.options.mute,
      },
      events: {
        onReady: () => {
          this.playerReady = true;
          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (event) => {
          if (event.data == YT.PlayerState.PLAYING) {
            // pause all videos exept the one playing / pause tous les videos SAUF celui qui joue
            Youtube.pauseAll(this);
          } else if (event.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }
  watch(entries) {
    // if video leaves viewport, pause the video / si la vidéo quitte le viewport, pause la vidéo
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  static initAll() {
    //render all YouTube players in the page / rendu de touts les players YouTube dans la page
    document.documentElement.classList.add('is-youtube-ready');
    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      instance.init();
    }
  }
  static pauseAll(currentInstance) {
    //pause all videos in the page, when page reloads or loads / pause touts les vidéos dans la page si la page recharge ou charge
    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}
Youtube.instances = [];
window.onYouTubeIframeAPIReady = Youtube.initAll;
