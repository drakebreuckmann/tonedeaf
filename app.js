document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const skipButton = document.getElementById('skip');
    const submitButton = document.getElementById('submit');
    const guessInput = document.getElementById('guess');
    const feedback = document.getElementById('feedback');
    const reveal = document.getElementById('reveal');
    const guessBoxes = Array.from(document.getElementsByClassName('guess-box'));
    const suggestionsList = document.getElementById('suggestions');
    const statsButton = document.getElementById('stats-button');
    const statsModal = document.getElementById('stats-modal');
    const closeModal = document.querySelector('.close');
    const statsContent = document.getElementById('stats-content');
    const newGameButton = document.getElementById('new-game');
    const resetStatsButton = document.getElementById('reset-stats');

    // Load song data with hosted MP3 URLs
    let originalSongs = [
        {"Artist": "Ariana Grande", "Title": "we can't be friends", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+we+cant+be+friends.mp3"},
        {"Artist": "Ariana Grande", "Title": "bloodline", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+bloodline.mp3"},
        {"Artist": "Ariana Grande", "Title": "7 rings", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+7+rings.mp3"},
        {"Artist": "Ariana Grande", "Title": "positions", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+positions.mp3"},
        {"Artist": "Ariana Grande", "Title": "34+35", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+34%2B35.mp3"}
    ];

    let songs = JSON.parse(localStorage.getItem('heardleSongs')) || originalSongs;

    let currentSongIndex = Math.floor(Math.random() * songs.length);
    let currentClipIndex = 0;
    let maxGuesses = 6;
    const clipDurations = [1, 3, 5, 10, 15, 30]; // in seconds
    let playTimeout;

    // Load stats from local storage or initialize if not present
    let stats = JSON.parse(localStorage.getItem('heardleStats')) || {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, X: 0,
        played: 0, won: 0, streak: 0, maxStreak: 0
    };

    function saveStats() {
        localStorage.setItem('heardleStats', JSON.stringify(stats));
    }

    function saveSongs() {
        localStorage.setItem('heardleSongs', JSON.stringify(songs));
    }

    function updateStatsDisplay() {
        statsContent.innerHTML = '';
        const statsHTML = `
            <div class="stats-bar">
                ${Object.keys(stats).slice(0, 7).map(key => `
                    <div class="stats-bar-item">
                        <div class="bar-value">${stats[key]}</div>
                        <div class="bar" style="height: ${stats[key] * 10}px;"></div>
                        <div class="bar-label">${key}</div>
                    </div>
                `).join('')}
            </div>
            <div class="stats-summary">
                <div><span>${stats.played}</span> Played</div>
                <div><span>${stats.won}</span> Won</div>
                <div><span>${(stats.played > 0 ? (stats.won / stats.played * 100).toFixed(1) : 0)}%</span> Win rate</div>
                <div><span>${stats.streak}</span> Current Streak</div>
                <div><span>${stats.maxStreak}</span> Max Streak</div>
            </div>
        `;
        statsContent.innerHTML = statsHTML;
    }

    function updateStats(guessedCorrectly) {
        stats.played++;
        if (guessedCorrectly) {
            stats[currentClipIndex]++;
            stats.won++;
            stats.streak++;
            if (stats.streak > stats.maxStreak) {
                stats.maxStreak = stats.streak;
            }
        } else {
            stats.X++;
            stats.streak = 0;
        }
        saveStats();
    }

    function playCurrentClip(fullSong = false) {
        const currentDuration = fullSong ? audio.duration : clipDurations[currentClipIndex];
        audio.src = songs[currentSongIndex].Mp3Url;
        audio.load(); // Ensure the audio is loaded
        audio.currentTime = 0;

        audio.play().catch(error => {
            console.error(`Error playing audio: ${error}`);
        });

        if (!fullSong) {
            clearTimeout(playTimeout); // Clear any previous timeouts
            playTimeout = setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, currentDuration * 1000);
        }
    }

    function pauseCurrentClip() {
        clearTimeout(playTimeout);
        audio.pause();
    }

    function updateGuessBoxes() {
        guessBoxes.forEach((box, index) => {
            if (index < currentClipIndex) {
                box.style.border = "1px solid white";
            } else if (index === currentClipIndex) {
                box.style.border = "2px solid white";
            } else {
                box.style.border = "1px solid white";
            }
        });
    }

    function showSuggestions(query) {
        suggestionsList.innerHTML = '';
        if (!query) return;

        let filteredSongs = songs
            .filter(song => `${song.Artist} - ${song.Title}`.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.Title.localeCompare(b.Title))
            .slice(0, 10);

        filteredSongs.forEach(song => {
            let li = document.createElement('li');
            li.textContent = `${song.Artist} - ${song.Title}`;
            li.addEventListener('click', () => {
                guessInput.value = `${song.Artist} - ${song.Title}`;
                suggestionsList.innerHTML = '';
            });
            suggestionsList.appendChild(li);
        });
    }

    playButton.addEventListener('click', () => {
        playCurrentClip();
    });

    pauseButton.addEventListener('click', () => {
        pauseCurrentClip();
    });

    skipButton.addEventListener('click', () => {
        guessBoxes[currentClipIndex].textContent = "Skipped";
        guessBoxes[currentClipIndex].classList.add('incorrect');
        currentClipIndex++;
        if (currentClipIndex < maxGuesses) {
            updateGuessBoxes();
        } else {
            stats.X++;
            stats.played++;
            stats.streak = 0;
            saveStats();
            reveal.textContent = `The song was "${songs[currentSongIndex].Title}" by ${songs[currentSongIndex].Artist}`;
            playCurrentClip(true);
            removeCurrentSong();
        }
    });

    submitButton.addEventListener('click', () => {
        const userGuess = guessInput.value;
        const correctAnswer = `${songs[currentSongIndex].Artist} - ${songs[currentSongIndex].Title}`;
        const guessedCorrectly = userGuess.toLowerCase() === correctAnswer.toLowerCase();

        if (guessedCorrectly) {
            feedback.textContent = 'Correct!';
            reveal.textContent = `The song was "${correctAnswer}"`;
            reveal.style.color = 'green';
            guessBoxes[currentClipIndex].classList.add('correct');
            playCurrentClip(true); // Play full song
            removeCurrentSong();
        } else if (userGuess.toLowerCase().startsWith(songs[currentSongIndex].Artist.toLowerCase())) {
            feedback.textContent = 'Close!';
            guessBoxes[currentClipIndex].classList.add('close');
        } else {
            feedback.textContent = 'Try again!';
            guessBoxes[currentClipIndex].classList.add('incorrect');
        }

        guessBoxes[currentClipIndex].textContent = userGuess;
        guessInput.value = '';
        suggestionsList.innerHTML = '';
        updateGuessBoxes();
        currentClipIndex++;

        if (currentClipIndex < maxGuesses) {
            updateGuessBoxes();
        } else if (!reveal.textContent) {
            feedback.textContent = 'No more guesses!';
            reveal.textContent = `The song was "${correctAnswer}"`;
            reveal.style.color = 'red';
            playCurrentClip(true); // Play full song
            removeCurrentSong();
        }

        updateStats(guessedCorrectly);
    });

    function removeCurrentSong() {
        songs.splice(currentSongIndex, 1);
        saveSongs();
        currentSongIndex = Math.floor(Math.random() * songs.length);
    }

    guessInput.addEventListener('input', () => {
        showSuggestions(guessInput.value);
    });

    statsButton.addEventListener('click', () => {
        updateStatsDisplay();
        statsModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        statsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == statsModal) {
            statsModal.style.display = 'none';
        }
    });

    newGameButton.addEventListener('click', () => {
        location.reload(); // Reload the page to start a new game
    });

    resetStatsButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your stats?')) {
            localStorage.removeItem('heardleStats');
            localStorage.removeItem('heardleSongs');
            location.reload(); // Reload the page to reset the game
        }
    });

    updateGuessBoxes(); // Highlight the first guess box
});
