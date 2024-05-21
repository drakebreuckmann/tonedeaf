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

    // Load song data with hosted MP3 URLs
    let songs = [
        {"Artist": "Ariana Grande", "Title": "we can't be friends", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+we+cant+be+friends.mp3"},
        {"Artist": "Ariana Grande", "Title": "bloodline", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+bloodline.mp3"},
        {"Artist": "Ariana Grande", "Title": "7 rings", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+7+rings.mp3"},
        {"Artist": "Ariana Grande", "Title": "positions", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+positions.mp3"},
        {"Artist": "Ariana Grande", "Title": "34+35", "Mp3Url": "https://my-heardle-clone-music-bucket-original-1.s3.us-east-2.amazonaws.com/Ariana+Grande/Ariana+Grande+-+34%2B35.mp3"}
    ];

    let currentSongIndex = Math.floor(Math.random() * songs.length);
    let currentClipIndex = 0;
    let maxGuesses = 6;
    const clipDurations = [1, 3, 5, 10, 15, 30]; // in seconds
    let playTimeout;

    // Load stats from local storage or initialize if not present
    let stats = JSON.parse(localStorage.getItem('heardleStats')) || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, X: 0 };

    function saveStats() {
        localStorage.setItem('heardleStats', JSON.stringify(stats));
    }

    function updateStatsDisplay() {
        statsContent.innerHTML = '';
        Object.keys(stats).forEach(key => {
            const statDiv = document.createElement('div');
            statDiv.innerHTML = `<span>${key}</span> <span>${stats[key]}</span>`;
            statsContent.appendChild(statDiv);
        });
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
            stats['X']++;
            saveStats();
            reveal.textContent = `The song was "${songs[currentSongIndex].Title}" by ${songs[currentSongIndex].Artist}`;
            playCurrentClip(true);
        }
    });

    submitButton.addEventListener('click', () => {
        const userGuess = guessInput.value;
        const correctAnswer = `${songs[currentSongIndex].Artist} - ${songs[currentSongIndex].Title}`;
        if (userGuess.toLowerCase() === correctAnswer.toLowerCase()) {
            feedback.textContent = 'Correct!';
            reveal.textContent = `The song was "${correctAnswer}"`;
            reveal.style.color = 'green';
            guessBoxes[currentClipIndex].classList.add('correct');
            stats[currentClipIndex + 1]++;
            saveStats();
            playCurrentClip(true); // Play full song
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
            stats['X']++;
            saveStats();
            reveal.textContent = `The song was "${correctAnswer}"`;
            reveal.style.color = 'red';
            playCurrentClip(true); // Play full song
        }
    });

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

    updateGuessBoxes(); // Highlight the first guess box
});
