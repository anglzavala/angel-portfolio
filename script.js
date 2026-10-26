const storageTechnologies = {
  hdd: {
    name: 'HDD',
    capacity: '500 GB - 20 TB',
    speed: 'Moderate (80-150 MB/s)',
    durability: 'Medium',
    portability: 'Low',
    cost: 'Low per GB',
  },
  sataSsd: {
    name: 'SATA SSD',
    capacity: '120 GB - 8 TB',
    speed: 'Fast (400-600 MB/s)',
    durability: 'High',
    portability: 'Medium',
    cost: 'Medium',
  },
  nvmeSsd: {
    name: 'NVMe SSD',
    capacity: '256 GB - 16 TB',
    speed: 'Very fast (2000+ MB/s)',
    durability: 'Very high',
    portability: 'Medium',
    cost: 'High',
  },
  usb: {
    name: 'USB Flash Drive',
    capacity: '8 GB - 1 TB',
    speed: 'Moderate to fast',
    durability: 'Medium-high',
    portability: 'High',
    cost: 'Medium',
  },
  memoryCard: {
    name: 'Memory Card',
    capacity: '8 GB - 1 TB',
    speed: 'Varying by class',
    durability: 'Medium',
    portability: 'Very high',
    cost: 'Low to medium',
  },
  optical: {
    name: 'Optical Storage',
    capacity: '700 MB - 128 GB',
    speed: 'Slow',
    durability: 'Medium',
    portability: 'Medium',
    cost: 'Low to medium',
  },
  cloud: {
    name: 'Cloud Storage',
    capacity: 'Flexible, subscription based',
    speed: 'Depends on internet',
    durability: 'Very high',
    portability: 'Very high',
    cost: 'Subscription',
  },
};

const compareOptions = [
  { value: 'hdd', label: 'HDD' },
  { value: 'sataSsd', label: 'SATA SSD' },
  { value: 'nvmeSsd', label: 'NVMe SSD' },
  { value: 'usb', label: 'USB Flash Drive' },
  { value: 'memoryCard', label: 'Memory Card' },
  { value: 'optical', label: 'Optical Storage' },
  { value: 'cloud', label: 'Cloud Storage' },
];

const storageLabels = {
  capacity: 'Capacity',
  speed: 'Speed',
  durability: 'Durability',
  portability: 'Portability',
  cost: 'Cost',
};

const selectIds = ['compare-1', 'compare-2', 'compare-3'];
const featureFields = ['capacity', 'speed', 'durability', 'portability', 'cost'];

function setupComparisonSelects() {
  selectIds.forEach((id) => {
    const select = document.getElementById(id);
    select.innerHTML = compareOptions
      .map(
        (option) =>
          `<option value="${option.value}">${option.label}</option>`
      )
      .join('');

    select.addEventListener('change', updateComparisonTable);
  });

  selectIds.forEach((id, index) => {
    const select = document.getElementById(id);
    select.value = compareOptions[index % compareOptions.length].value;
  });

  updateComparisonTable();
}

function updateComparisonTable() {
  const selections = selectIds.map((id) => document.getElementById(id).value);

  selections.forEach((selected, index) => {
    const titleEl = document.getElementById(`col-${index + 1}`);
    titleEl.textContent = storageTechnologies[selected].name;
  });

  featureFields.forEach((feature) => {
    const cells = document.querySelectorAll(`td[data-feature="${feature}"]`);
    cells.forEach((cell, index) => {
      const tech = storageTechnologies[selections[index]];
      cell.textContent = tech[feature];
    });
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function setupNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function setupStorageCalculator() {
  const deviceCapacity = document.getElementById('deviceCapacity');
  const photoSize = document.getElementById('photoSize');
  const songSize = document.getElementById('songSize');
  const videoSize = document.getElementById('videoSize');
  const calculatorOutput = document.getElementById('calculatorOutput');

  document.getElementById('calculateBtn').addEventListener('click', () => {
    const capGB = Number(deviceCapacity.value) || 0;
    const photoMB = Number(photoSize.value) || 0;
    const songMB = Number(songSize.value) || 0;
    const videoGB = Number(videoSize.value) || 0;

    if (capGB <= 0 || photoMB <= 0 || songMB <= 0 || videoGB <= 0) {
      calculatorOutput.innerHTML = '<strong>Enter valid values greater than zero.</strong>';
      return;
    }

    const capacityMB = capGB * 1024;
    const photoCount = Math.floor(capacityMB / photoMB);
    const songCount = Math.floor(capacityMB / songMB);
    const videoCount = Math.floor(capGB / videoGB);

    calculatorOutput.innerHTML = `
      <strong>Estimated capacity:</strong><br>
      • Photos: <strong>${photoCount.toLocaleString()}</strong> at ${photoMB} MB each<br>
      • Songs: <strong>${songCount.toLocaleString()}</strong> at ${songMB} MB each<br>
      • Videos: <strong>${videoCount.toLocaleString()}</strong> at ${videoGB} GB each
    `;
  });
}

const recommendationMap = {
  gaming: {
    title: 'Best for gaming',
    text: 'Choose a fast NVMe SSD for your operating system, games, and game libraries. It reduces loading times and increases responsiveness. Pair it with a larger HDD for extra game storage if needed.',
  },
  schoolwork: {
    title: 'Best for schoolwork',
    text: 'A 500 GB SATA SSD or a 1 TB NVMe SSD is a strong choice for class notes, research papers, applications, and large files. Cloud storage adds convenient backup and cross-device access.',
  },
  photography: {
    title: 'Best for photography',
    text: 'Use a large NVMe SSD or a high-capacity USB drive for editing sessions and a memory card for shooting. For long-term storage, back up to cloud storage or external HDDs.',
  },
  business: {
    title: 'Best for business',
    text: 'A business setup benefits from secure cloud storage, NVMe SSDs for performance, and regular backups. Encryption and versioned backups provide better information security.',
  },
  backups: {
    title: 'Best for backups',
    text: 'Use a combination of external HDDs for inexpensive bulk capacity and cloud storage for offsite redundancy. Backup policies should include encryption and regular automated schedules.',
  },
};

function setupRecommendationTool() {
  const scenarioButtons = document.querySelectorAll('.scenario-btn');
  const output = document.getElementById('recommendationOutput');

  const updateRecommendation = (scenario) => {
    const recommendation = recommendationMap[scenario];
    output.innerHTML = `
      <strong>${recommendation.title}</strong><br>
      <span>${recommendation.text}</span>
    `;
  };

  scenarioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      scenarioButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      updateRecommendation(button.dataset.scenario);
    });
  });

  updateRecommendation('gaming');
}

const quizQuestions = [
  {
    question: 'Which storage type is usually fastest for a desktop computer?',
    options: ['HDD', 'SATA SSD', 'NVMe SSD', 'CD'],
    answer: 'NVMe SSD',
    explanation: 'NVMe SSDs use fast PCIe pathways and usually provide much higher read and write speeds than HDDs or SATA SSDs.',
  },
  {
    question: 'What is the main advantage of cloud storage?',
    options: ['It never fails', 'It is always offline', 'It allows access from many devices with internet access', 'It removes the need for backups'],
    answer: 'It allows access from many devices with internet access',
    explanation: 'Cloud storage lets users access data from different devices and locations, while still requiring a reliable internet connection and a backup strategy.',
  },
  {
    question: 'Why is encryption important for stored data?',
    options: ['It speeds up USB devices', 'It protects data if devices are lost or stolen', 'It turns HDDs into SSDs', 'It reduces storage size'],
    answer: 'It protects data if devices are lost or stolen',
    explanation: 'Encryption helps keep stored data private by making it unreadable to unauthorized users, which is important for security and compliance.',
  },
  {
    question: 'Which storage option is best for portable file transfers?',
    options: ['USB flash drive', 'Optical disc', 'HDD with no case', 'Cloud only'],
    answer: 'USB flash drive',
    explanation: 'USB flash drives are portable, easy to carry, and convenient for moving files between computers.',
  },
];

let currentQuestionIndex = 0;
let score = 0;

function renderQuestion() {
  const questionBox = document.getElementById('quizQuestionBox');
  const choicesBox = document.getElementById('quizChoices');
  const feedbackBox = document.getElementById('quizFeedback');
  const nextButton = document.getElementById('nextQuestionBtn');

  if (currentQuestionIndex >= quizQuestions.length) {
    questionBox.textContent = `Quiz complete! Your score is ${score} out of ${quizQuestions.length}.`;
    choicesBox.innerHTML = '';
    feedbackBox.textContent = score === quizQuestions.length ? 'Excellent work — you understand the essentials of digital storage!' : 'Nice effort! Review the explanations and try again to improve your score.';
    nextButton.textContent = 'Review Again';
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  questionBox.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
  choicesBox.innerHTML = question.options
    .map(
      (option) => `<button class="quiz-option" type="button" data-answer="${option}">${option}</button>`
    )
    .join('');

  feedbackBox.textContent = '';
  nextButton.textContent = 'Next Question';

  choicesBox.querySelectorAll('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedAnswer = button.dataset.answer;
      const isCorrect = selectedAnswer === question.answer;

      if (isCorrect) {
        score += 1;
      }

      choicesBox.querySelectorAll('.quiz-option').forEach((choice) => {
        choice.disabled = true;
        if (choice.dataset.answer === question.answer) {
          choice.classList.add('correct');
        }
        if (choice.dataset.answer === selectedAnswer && !isCorrect) {
          choice.classList.add('incorrect');
        }
      });

      feedbackBox.textContent = `${isCorrect ? 'Correct!' : 'Not quite.'} ${question.explanation}`;
      nextButton.disabled = false;
    });
  });

  nextButton.disabled = true;
}

function setupQuiz() {
  const nextButton = document.getElementById('nextQuestionBtn');
  const restartButton = document.getElementById('restartQuizBtn');

  nextButton.addEventListener('click', () => {
    currentQuestionIndex += 1;
    renderQuestion();
  });

  restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
  });

  renderQuestion();
}

const trackList = [
  {
    title: 'Skyline Flow',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Blue Harbor',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Night Shift',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    title: 'Cloud Signals',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
];

let currentTrackIndex = 0;
let isPlaying = false;

function renderPlaylist() {
  const playlist = document.getElementById('playlist');
  playlist.innerHTML = trackList
    .map(
      (track, index) => `
        <li class="${index === currentTrackIndex ? 'active' : ''}" data-index="${index}">
          <span>${track.title}</span>
          <span>${index === currentTrackIndex && isPlaying ? 'Playing' : 'Ready'}</span>
        </li>
      `
    )
    .join('');

  playlist.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', () => {
      currentTrackIndex = Number(item.dataset.index);
      loadTrack();
      startPlayback();
    });
  });
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function setupAudioPlayer() {
  const audio = new Audio(trackList[currentTrackIndex].src);
  const playToggle = document.getElementById('playToggle');
  const progress = document.getElementById('progress');
  const volumeControl = document.getElementById('volumeControl');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');
  const currentTrackEl = document.getElementById('currentTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const bgMusicToggle = document.getElementById('backgroundMusicToggle');

  function updatePlayerUI() {
    currentTrackEl.textContent = trackList[currentTrackIndex].title;
    playToggle.textContent = isPlaying ? '❚❚' : '▶';
    progress.value = audio.currentTime && audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
    renderPlaylist();
  }

  function loadTrack() {
    audio.src = trackList[currentTrackIndex].src;
    audio.load();
    currentTrackEl.textContent = trackList[currentTrackIndex].title;
    totalTimeEl.textContent = formatTime(audio.duration || 0);
    renderPlaylist();
  }

  function startPlayback() {
    audio.play().then(() => {
      isPlaying = true;
      updatePlayerUI();
    }).catch(() => {
      isPlaying = false;
      updatePlayerUI();
    });
  }

  playToggle.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      updatePlayerUI();
      return;
    }

    startPlayback();
  });

  prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    loadTrack();
    startPlayback();
  });

  nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack();
    startPlayback();
  });

  progress.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value / 100;
  });

  audio.addEventListener('timeupdate', () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack();
    startPlayback();
  });

  bgMusicToggle.addEventListener('change', () => {
    if (bgMusicToggle.checked) {
      if (!isPlaying) {
        startPlayback();
      }
    } else if (isPlaying) {
      audio.pause();
      isPlaying = false;
      updatePlayerUI();
    }
  });

  renderPlaylist();
  updatePlayerUI();
  audio.volume = Number(volumeControl.value) / 100;
}

function initMap() {
  const map = L.map('map').setView([39.8283, -98.5795], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const locations = [
    { name: 'Microsoft Data Center', coords: [47.6062, -122.3321], info: 'Cloud infrastructure and data services.' },
    { name: 'Google HQ', coords: [37.422, -122.0841], info: 'Technology and large-scale storage systems.' },
    { name: 'MIT', coords: [42.3601, -71.0942], info: 'Research and digital innovation hub.' },
    { name: 'Amazon Web Services', coords: [47.6115, -122.3372], info: 'Global cloud computing and data center operations.' },
  ];

  locations.forEach((location) => {
    const marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<strong>${location.name}</strong><br>${location.info}`);
  });

  const searchInput = document.getElementById('mapSearch');
  const searchBtn = document.getElementById('mapSearchBtn');

  const performMapSearch = () => {
    const query = searchInput.value.trim();
    if (!query) {
      map.setView([39.8283, -98.5795], 4);
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((results) => {
        if (!results.length) {
          alert('No matching place was found. Try a city or organization name.');
          return;
        }

        const { lat, lon, display_name } = results[0];
        map.setView([Number(lat), Number(lon)], 12);
        const marker = L.marker([Number(lat), Number(lon)]).addTo(map);
        marker.bindPopup(`<strong>Search result</strong><br>${display_name}`).openPopup();
      })
      .catch(() => {
        alert('The map could not complete the search right now. Please try again.');
      });
  };

  searchBtn.addEventListener('click', performMapSearch);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') performMapSearch();
  });
}

function weatherCodeToText(code) {
  const map = {
    0: 'Clear sky',
    1: 'Mostly clear',
    2: 'Partly cloudy',
    3: 'Cloudy',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    56: 'Freezing drizzle',
    57: 'Heavy freezing drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    66: 'Freezing rain',
    67: 'Heavy freezing rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers',
    81: 'Heavy showers',
    82: 'Violent showers',
    85: 'Snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Severe thunderstorm',
  };

  return map[code] || 'Weather conditions';
}

function weatherIcon(code) {
  if ([0, 1].includes(code)) return '☀️';
  if ([2, 3].includes(code)) return '⛅';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
  if ([95, 96, 99].includes(code)) return '⛈️';
  return '🌤️';
}

function setupWeather() {
  const cityInput = document.getElementById('cityInput');
  const weatherStatus = document.getElementById('weatherStatus');
  const weatherBtn = document.getElementById('weatherBtn');

  async function fetchWeather(city) {
    weatherStatus.textContent = 'Loading weather data...';
    weatherStatus.className = 'status-text';

    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const geoData = await geoResponse.json();

      if (!geoData.results || !geoData.results.length) {
        throw new Error('No matching city was found.');
      }

      const location = geoData.results[0];
      const forecastResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
      );
      const forecastData = await forecastResponse.json();

      if (!forecastData.current || !forecastData.daily) {
        throw new Error('Weather data was unavailable for that location.');
      }

      const current = forecastData.current;
      const cityName = `${location.name}, ${location.country}`;
      const days = forecastData.daily.time.slice(0, 5);

      document.getElementById('weatherCity').textContent = cityName;
      document.getElementById('weatherTemp').textContent = `${Math.round(current.temperature_2m)}°C`;
      document.getElementById('weatherIcon').textContent = weatherIcon(current.weather_code);
      document.getElementById('weatherCondition').textContent = weatherCodeToText(current.weather_code);
      document.getElementById('weatherHumidity').textContent = `${current.relative_humidity_2m}%`;
      document.getElementById('weatherWind').textContent = `${Math.round(current.wind_speed_10m)} km/h`;

      const forecastRow = document.getElementById('forecastRow');
      forecastRow.innerHTML = days
        .map((date, index) => {
          const day = forecastData.daily;
          const code = day.weather_code[index];
          const min = Math.round(day.temperature_2m_min[index]);
          const max = Math.round(day.temperature_2m_max[index]);
          return `
            <div class="forecast-item">
              <strong>${new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</strong>
              <div>${weatherIcon(code)}</div>
              <div>${max}° / ${min}°</div>
            </div>
          `;
        })
        .join('');

      weatherStatus.textContent = 'Live weather data loaded successfully.';
      weatherStatus.className = 'status-text success';
    } catch (error) {
      weatherStatus.textContent = error.message || 'Unable to load weather data.';
      weatherStatus.className = 'status-text error';
    }
  }

  weatherBtn.addEventListener('click', () => {
    if (!cityInput.value.trim()) {
      weatherStatus.textContent = 'Please enter a city name.';
      weatherStatus.className = 'status-text error';
      return;
    }
    fetchWeather(cityInput.value.trim());
  });

  cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      weatherBtn.click();
    }
  });

  fetchWeather(cityInput.value.trim());
}

function setupChatbot() {
  const chatWindow = document.getElementById('chatWindow');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');

  const responses = [
    {
      keywords: ['ssd', 'hdd', 'hard drive', 'solid state'],
      answer: 'An SSD uses flash memory and has no moving parts, which makes it faster and more durable than an HDD. HDDs use spinning disks and are usually cheaper per gigabyte for large storage.',
    },
    {
      keywords: ['cloud', 'cloud storage'],
      answer: 'Cloud storage stores your files on remote servers. It is convenient for syncing, backup, and access from many devices, but it depends on internet access and a service subscription.',
    },
    {
      keywords: ['capacity', 'size', 'gb', 'tb'],
      answer: 'Capacity tells you how much data a drive can hold. For example, 1 TB is about 1000 GB, which can store many photos, songs, and hundreds of hours of video depending on file size.',
    },
    {
      keywords: ['security', 'encrypted', 'backup'],
      answer: 'Use encryption to protect sensitive files and create regular backups to avoid losing data if a device fails or is stolen. A good plan uses both local backups and offsite storage.',
    },
    {
      keywords: ['recommend', 'choose', 'gaming', 'school', 'business', 'photography'],
      answer: 'For gaming, choose a fast NVMe SSD. For schoolwork, a 500 GB to 1 TB SSD is usually enough. For photography, use a large SSD plus memory cards and cloud backup. For business, combine secure cloud storage with encrypted backups.',
    },
    {
      keywords: ['usb', 'flash drive'],
      answer: 'A USB flash drive is great for portable file transfers, presentations, and quick backups. It is compact and easy to carry, although it is usually less ideal for long-term archive storage than an HDD or cloud plan.',
    },
    {
      keywords: ['memory card', 'sd card', 'micro sd'],
      answer: 'Memory cards are small, portable, and useful in cameras, phones, and drones. Choose a card based on capacity, speed class, and device compatibility.',
    },
    {
      keywords: ['hello', 'hi', 'hey'],
      answer: 'Hello! I can help explain storage concepts, compare devices, and recommend solutions for school, work, gaming, and backup needs.',
    },
  ];

  function addMessage(text, sender = 'bot') {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerHTML = `<span>${text}</span>`;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function getBotReply(message) {
    const lower = message.toLowerCase();
    const matching = responses.find((entry) =>
      entry.keywords.some((keyword) => lower.includes(keyword))
    );

    if (matching) {
      return matching.answer;
    }

    return 'I can explain storage concepts in simple language. Ask me to compare HDDs, SSDs, USB drives, or cloud storage, or ask for a recommendation based on gaming, schoolwork, or backups.';
  }

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatInput.value = '';

    setTimeout(() => {
      addMessage(getBotReply(message), 'bot');
    }, 350);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupComparisonSelects();
  setupRevealAnimations();
  setupNavigation();
  setupStorageCalculator();
  setupRecommendationTool();
  setupQuiz();
  setupAudioPlayer();
  initMap();
  setupWeather();
  setupChatbot();
});
