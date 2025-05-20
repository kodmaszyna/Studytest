const themes = {
  day: {
    name: 'Day',
    background: 'IMG_2342.png',
    icon: 'moon',
    sounds: [
      { name: 'Lo-Fi Music', file: 'coffee-drip-vibe-chill-lo-fi-cafe-music-336406.mp3' },
      { name: 'Coffee Pouring', file: 'coffee-pouring-243569.mp3' }
      { name: 'Drip Coffee', file: 'drip-coffee-33785.mp3' }
    ]
  },
  night: {
    name: 'Night',
    background: 'IMG_2343.png',
    icon: 'sun',
    sounds: [
      { name: 'Rain', file: 'gentle-rain-for-relaxation-and-sleep-337279.mp3' },
      { name: 'Lo-fi Music', file: 'rainy-sax-nights-325858.mp3' }
    ]
  }
};

let currentTheme = (new Date().getHours() >= 6 && new Date().getHours() < 18) ? 'day' : 'night';
let audioObjects = [];

const controlsContainer = document.getElementById('controls');
const themeToggleBtn = document.getElementById('themeToggle');

function loadTheme(themeKey) {
  const theme = themes[themeKey];
  currentTheme = themeKey;
  document.body.style.backgroundImage = `url('${theme.background}')`;
  controlsContainer.innerHTML = '';
  audioObjects = [];

  theme.sounds.forEach(sound => {
    const audio = new Audio(sound.file);
    audio.loop = true;
    audio.volume = 0.5;
    audioObjects.push(audio);

    const container = document.createElement('div');
    container.className = 'bg-gray-800 bg-opacity-70 p-4 rounded shadow';

    const label = document.createElement('h2');
    label.textContent = sound.name;
    label.className = 'text-xl mb-2';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Play';
    toggleBtn.className = 'bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded';
    toggleBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        toggleBtn.textContent = 'Pause';
      } else {
        audio.pause();
        toggleBtn.textContent = 'Play';
      }
    });

    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.01;
    volumeSlider.value = audio.volume;
    volumeSlider.className = 'w-full mt-2';
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value;
    });

    container.append(label, toggleBtn, volumeSlider);
    controlsContainer.appendChild(container);
  });

  const iconContainer = themeToggleBtn.querySelector("i");
  iconContainer.setAttribute("data-lucide", theme.icon);
  themeToggleBtn.querySelector("span").textContent = `Switch to ${theme.name === 'Day' ? 'Night' : 'Day'} Theme`;
  lucide.createIcons();
}

themeToggleBtn.addEventListener('click', () => {
  audioObjects.forEach(a => a.pause());
  loadTheme(currentTheme === 'day' ? 'night' : 'day');
});

loadTheme(currentTheme);
