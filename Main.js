const themes = {
  day: {
    name: 'Day',
    background: 'IMG_2342.png',
    icon: 'moon',
    sounds: [
      { name: 'Chatter', file: 'sounds/day/chatter.mp3' },
      { name: 'Jazz Music', file: 'sounds/day/jazz.mp3' }
    ]
  },
  night: {
    name: 'Night',
    background: 'IMG_2343.png',
    icon: 'sun',
    sounds: [
      { name: 'Rain', file: 'sounds/night/rain.mp3' },
      { name: 'Lo-fi Music', file: 'sounds/night/lofi.mp3' }
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
