interface SoundButton {
    element: HTMLElement;
    sound: HTMLAudioElement;
  }

const weatherData = {
    sun: {audio: 'assets/sounds/summer.mp3', photo: 'assets/summer-bg.jpg'},
    snow: {audio: 'assets/sounds/winter.mp3', photo: 'assets/winter-bg.jpg'},
    rain: {audio: 'assets/sounds/rain.mp3', photo: 'assets/rainy-bg.jpg'}
};
  
class NatureSoundsApp {
    private soundButtons: SoundButton[] = [];
    private currentSound: HTMLAudioElement | null = null;
    
    constructor() {
      this.initButtons();
      this.initVolumeControl();
    }
    
    private initButtons(): void {
      const buttons = document.querySelectorAll('.but');
      buttons.forEach(button => {
        if (!(button instanceof HTMLElement)) return;

        const sound = new Audio(`${weatherData[button.classList[0]].audio}`);
        
        const soundButton: SoundButton = { element: button, sound: sound };
        this.soundButtons.push(soundButton);
        
        button.addEventListener('click', () => this.handleButtonClick(soundButton));
      });
    }
    
    private handleButtonClick(soundButton: SoundButton): void {
      if (this.currentSound === soundButton.sound) {
        this.currentSound.paused ? this.currentSound.play() : this.currentSound.pause();
      } else {
        if (this.currentSound) {
          this.currentSound.pause();
          this.currentSound.currentTime = 0;
        }
        this.currentSound = soundButton.sound;
        this.currentSound.play();
        document.body.style.backgroundImage = `url('${weatherData[soundButton.element.classList[0]].photo}')`;
      }
    }
    
    private initVolumeControl(): void {
      const volumeControl = document.getElementById('volume') as HTMLInputElement;
      volumeControl.addEventListener('input', () => {
        const volume = parseFloat(volumeControl.value);
        this.soundButtons.forEach(button => {
          button.sound.volume = volume;
        });
      });
    }
}

document.addEventListener('DOMContentLoaded', () => new NatureSoundsApp());
