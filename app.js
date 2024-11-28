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

    let originalSongs = [
        // Load song data with hosted MP3 URLs
        {Artist: "Addison Rae", Title: "Diet Pepsi", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Addison+Rae+-+Diet+Pepsi+(Lyric+Video).mp3"},
        {Artist: "Andy Williams", Title: "It's The Most Wonderful Time Of The Year", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Andy+Williams++-+It's+the+Most+Wonderful+Time+of+the+Year+(Lyrics).mp3"},
        {Artist: "Benson Boone", Title: "Beautiful Things", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Benson+Boone+-+Beautiful+Things+(Official+Music+Video).mp3"},
        {Artist: "Billie Eilish", Title: "Birds Of A Feather", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Billie+Eilish+-+BIRDS+OF+A+FEATHER+(Official+Music+Video).mp3"},
        {Artist: "Billie Eilish", Title: "Wildflower", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Billie+Eilish+-+WILDFLOWER+(Official+Lyric+Video).mp3"},
        {Artist: "BossMan Dlow", Title: "Shake Dat Ass (Twerk Song)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/BossMan+Dlow+-+Shake+Dat+Ahh+(Lyrics).mp3"},
        {Artist: "Brenda Lee", Title: "Rockin' Around The Christmas Tree", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Brenda+Lee+-+Rockin'+Around+The+Christmas+Tree+(Official+Lyric+Video).mp3"},
        {Artist: "Brooks & Dunn featuring Morgan Wallen", Title: "Neon Moon", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Brooks+%26+Dunn+-+Neon+Moon+(with+Morgan+Wallen)+(Official+Audio).mp3"},
        {Artist: "Burl Ives", Title: "A Holly Jolly Christmas", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Burl+Ives+-+A+Holly+Jolly+Christmas+(Lyric+Video).mp3"},
        {Artist: "Chappell Roan", Title: "Good Luck, Babe!", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Chappell+Roan+-+Good+Luck%2C+Babe!+(Official+Lyric+Video).mp3"},
        {Artist: "Chappell Roan", Title: "Hot To Go!", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Chappell+Roan+-+HOT+TO+GO!+(Lyrics).mp3"},
        {Artist: "Chappell Roan", Title: "Pink Pony Club", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Chappell+Roan+%E2%80%93+Pink+Pony+Club++(Audio).mp3"},
        {Artist: "Charli XCX", Title: "Apple", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Charli+xcx+-+Apple.mp3"},
        {Artist: "Chris Brown", Title: "Residuals", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Chris+Brown+-+Residuals+(Visualizer).mp3"},
        {Artist: "Chris Stapleton", Title: "Think I'm In Love With You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Chris+Stapleton+-+Think+I'm+In+Love+With+You+(Official+Audio).mp3"},
        {Artist: "Cody Johnson & Carrie Underwood", Title: "I'm Gonna Love You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/cody+johnson%2C+carrie+underwood+-+I'm+gonna+love+you+(lyrics).mp3"},
        {Artist: "Don Toliver", Title: "New Drop", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Don+Toliver+-+NEW+DROP+%5BOfficial+Audio%5D.mp3"},
        {Artist: "Don Toliver", Title: "No Pole", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Don+Toliver+-+No+Pole+%5BOfficial+Visualizer%5D.mp3"},
        {Artist: "Ella Langley featuring Riley Green", Title: "You Look Like You Love Me", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Ella+Langley+%26+Riley+Green+-+you+look+like+you+love+me+(Official+Visualizer).mp3"},
        {Artist: "Gigi Perez", Title: "Sailor Song", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Gigi+Perez+-+Sailor+Song+(Lyrics).mp3"},
        {Artist: "GloRilla", Title: "TGIF", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/GloRilla+-+TGIF+(Official+Music+Video).mp3"},
        {Artist: "GloRilla & Sexyy Red", Title: "Whatchu Kno About Me", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/GloRilla+-+WHATCHU+KNO+ABOUT+ME+ft.+Sexyy+Red+(Official+Music+Video).mp3"},
        {Artist: "GloRilla & T-Pain", Title: "I Luv Her", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/GloRilla+-+I+LUV+HER+(feat.+T-Pain)+(Official+Audio).mp3"},
        {Artist: "Gracie Abrams", Title: "Close To You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Gracie+Abrams+-+Close+To+You+(Lyrics).mp3"},
        {Artist: "Gracie Abrams", Title: "I Love You, I'm Sorry", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Gracie+Abrams+-+I+Love+You%2C+I'm+Sorry.mp3"},
        {Artist: "Gracie Abrams", Title: "That's So True", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/That%E2%80%99s+So+True.mp3"},
        {Artist: "Gunna", Title: "Him All Along", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Gunna+-+HIM+ALL+ALONG+%5BOfficial+Visualizer%5D.mp3"},
        {Artist: "Gunna", Title: "On One Tonight", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Gunna+-+on+one+tonight+%5BOfficial+Visualizer%5D.mp3"},
        {Artist: "Hozier", Title: "Too Sweet", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Hozier+-+Too+Sweet+(Official+Video).mp3"},
        {Artist: "Jelly Roll", Title: "I Am Not Okay", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Jelly+Roll+-+I+Am+Not+Okay+(Official+Lyric+Video).mp3"},
        {Artist: "Jelly Roll", Title: "Liar", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Jelly+Roll+-+Liar+(Official+Audio).mp3"},
        {Artist: "Jimin", Title: "Who", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/%EC%A7%80%EB%AF%BC+(Jimin)+-+Who+(Lyrics).mp3"},
        {Artist: "Juice WRLD & Nicki Minaj", Title: "AGATS2 (Insecure)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Juice+WRLD+%26+Nicki+Minaj+-+AGATS2+(Insecure)+(Official+Audio).mp3"},
        {Artist: "Kendrick Lamar", Title: "Not Like Us", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Not+Like+Us.mp3"},
        {Artist: "Koe Wetzel & Jessie Murph", Title: "High Road", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Koe+Wetzel+-+High+Road+(Official+Audio).mp3"},
        {Artist: "Lady Gaga", Title: "Disease", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Lady+Gaga+-+Disease+(Official+Lyric+Video).mp3"},
        {Artist: "Lady Gaga & Bruno Mars", Title: "Die With A Smile", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Lady+Gaga%2C+Bruno+Mars+-+Die+With+A+Smile+(Official+Music+Video).mp3"},
        {Artist: "Lainey Wilson", Title: "4x4xU", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Lainey+Wilson+-+4x4xU+(Official+Lyric+Video).mp3"},
        {Artist: "Latto", Title: "Brokey", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Latto+-+Brokey+(Lyric+Video).mp3"},
        {Artist: "Lil Baby", Title: "Insecurities", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Lil+Baby+-+Insecurities.mp3"},
        {Artist: "Linkin Park", Title: "The Emptiness Machine", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Linkin+Park+-+The+Emptiness+Machine+(Lyrics).mp3"},
        {Artist: "Luke Combs", Title: "Ain't No Love In Oklahoma", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Luke+Combs+-+Ain't+No+Love+In+Oklahoma+(Lyrics).mp3"},
        {Artist: "Mariah Carey", Title: "All I Want For Christmas Is You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Mariah+Carey+-+All+I+Want+For+Christmas+Is+You+(Lyrics).mp3"},
        {Artist: "Marshmello & Kane Brown", Title: "Miles On It", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Marshmello%2C+Kane+Brown+-+Miles+On+It+(Official+Lyric+Video).mp3"},
        {Artist: "Megan Moroney", Title: "Am I Okay?", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Megan+Moroney+-+Am+I+Okay%EF%BC%9F+(Official+Lyric+Video).mp3"},
        {Artist: "MGK & Jelly Roll", Title: "Lonely Road", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/mgk%2C+Jelly+Roll+-+Lonely+Road+(Lyrics).mp3"},
        {Artist: "Morgan Wallen", Title: "Lies Lies Lies", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Morgan+Wallen+-+Lies+Lies+Lies+(Lyric+Video).mp3"},
        {Artist: "Morgan Wallen", Title: "Love Somebody", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Morgan+Wallen+-+Love+Somebody+(Lyric+Video).mp3"},
        {Artist: "Morgan Wallen featuring ERNEST", Title: "Cowgirls", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Morgan+Wallen+-+Cowgirls+ft.+ERNEST.mp3"},
        {Artist: "Myles Smith", Title: "Stargazing", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Myles+Smith+-+Stargazing+(Lyric+Video).mp3"},
        {Artist: "Post Malone featuring Luke Combs", Title: "Guy For That", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Post+Malone+-+Guy+For+That+(Lyric+Video)+ft.+Luke+Combs.mp3"},
        {Artist: "Post Malone featuring Morgan Wallen", Title: "I Had Some Help", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Post+Malone+%26+Morgan+Wallen+-+I+Had+Some+Help+(Lyrics).mp3"},
        {Artist: "Real Boston Richey", Title: "Help Me", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Real+Boston+Richey+-+Help+Me+(Official+Audio).mp3"},
        {Artist: "Rod Wave", Title: "25", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Rod+Wave+-+25+(Official+Audio).mp3"},
        {Artist: "ROSE & Bruno Mars", Title: "APT.", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/ROS%C3%89+%26+Bruno+Mars+-+APT.+(Official+Lyric+Video).mp3"},
        {Artist: "Sabrina Carpenter", Title: "Bed Chem", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Sabrina+Carpenter+-+Bed+Chem+(Official+Lyric+Video).mp3"},
        {Artist: "Sabrina Carpenter", Title: "Espresso", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Sabrina+Carpenter+-+Espresso+(Official+Video).mp3"},
        {Artist: "Sabrina Carpenter", Title: "Good Graces", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Sabrina+Carpenter+-+Good+Graces+(Official+Lyric+Video).mp3"},
        {Artist: "Sabrina Carpenter", Title: "Juno", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Sabrina+Carpenter+-+Juno+(Official+Lyric+Video).mp3"},
        {Artist: "Sabrina Carpenter", Title: "Please Please Please", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Sabrina+Carpenter+-+Please+Please+Please+(Lyric+Video).mp3"},
        {Artist: "Sabrina Carpenter", Title: "Taste", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Sabrina+Carpenter+-+Taste+(Lyrics).mp3"},
        {Artist: "Shaboozey", Title: "A Bar Song (Tipsy)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Shaboozey+-+A+Bar+Song+(Tipsy)+%5BOfficial+Visualizer%5D.mp3"},
        {Artist: "Shaboozey", Title: "Good News", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Shaboozey+-+Good+News+(Lyrics).mp3"},
        {Artist: "Summer Walker", Title: "Heart Of A Woman", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Summer+Walker+-+Heart+Of+A+Woman+%5BOfficial+Lyric+Video%5D.mp3"},
        {Artist: "Tate McRae", Title: "2 Hands", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Tate+McRae+-+2+hands+(Lyrics).mp3"},
        {Artist: "Tate McRae", Title: "It's Ok I'm Ok", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Tate+McRae+-+It's+ok+I'm+ok+(Lyrics).mp3"},
        {Artist: "Taylor Swift", Title: "I Can Do It With A Broken Heart", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Taylor+Swift+-+I+Can+Do+It+With+a+Broken+Heart+(Lyrics).mp3"},
        {Artist: "Teddy Swims", Title: "Bad Dreams", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Teddy+Swims+-+Bad+Dreams+(Lyrics).mp3"},
        {Artist: "Teddy Swims", Title: "Lose Control", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Teddy+Swims+-+Lose+Control+(Lyrics).mp3"},
        {Artist: "Teddy Swims", Title: "The Door", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Teddy+Swims+-+The+Door+(Official+Music+Video).mp3"},
        {Artist: "The Red Clay Strays", Title: "Wondering Why", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/The+Red+Clay+Strays+-+Wondering+Why+(Lyrics).mp3"},
        {Artist: "The Weeknd", Title: "Dancing In The Flames", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/The+Weeknd+-+Dancing+In+The+Flames+(Official+Lyric+Video).mp3"},
        {Artist: "The Weeknd & Playboi Carti", Title: "Timeless", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/The+Weeknd%2C+Playboi+Carti+-+Timeless.mp3"},
        {Artist: "Thomas Rhett", Title: "Beautiful As You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Thomas+Rhett+-+Beautiful+As+You+(Lyric+Video).mp3"},
        {Artist: "Tommy Richman", Title: "Million Dollar Baby", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Tommy+Richman+-+MILLION+DOLLAR+BABY+(Lyrics).mp3"},
        {Artist: "Tucker Wetmore", Title: "Wind Up Missin' You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Tucker+Wetmore+-+Wind+Up+Missin'+You+(Official+Lyric+Video).mp3"},
        {Artist: "Wham!", Title: "Last Christmas", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Wham!+-+Last+Christmas+(Official+Video).mp3"},
        {Artist: "Zach Bryan", Title: "28", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Zach+Bryan+-+28+(Lyrics).mp3"},
        {Artist: "Zach Bryan", Title: "High Road", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Zach+Bryan+-+High+Road.mp3"},
        {Artist: "Zach Top", Title: "I Never Lie", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/Nov+30+2024/Zach+Top+-+I+Never+Lie+(Lyrics).mp3"}
    ];

    let songs = JSON.parse(localStorage.getItem('heardleSongs')) || originalSongs;
    let currentSongIndex = Math.floor(Math.random() * songs.length);
    let currentClipIndex = 0;
    let maxGuesses = 6;
    const clipDurations = [1, 3, 5, 10, 15, 30]; // in seconds
    let playTimeout;
    let gameCompleted = false;
    let lastGuesses = null; // Tracks the number of guesses for the last game

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
        const maxStatValue = Math.max(...Object.values(stats).slice(0, 7));
        const statsHTML = `
            <div class="stats-bar">
                ${Object.keys(stats).slice(0, 7).map(key => `
                    <div class="stats-bar-item">
                        <div class="bar-label">${key}</div>
                        <div class="bar ${key === lastGuesses ? (lastGuesses !== 'X' ? 'highlight-green' : 'highlight-red') : ''}" style="height: ${(stats[key] / maxStatValue) * 100}px;"></div>
                        <div class="bar-value">${stats[key]}</div>
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
        lastGuesses = currentClipIndex + 1;
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
            lastGuesses = 'X';
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
        if (!gameCompleted) {
            playCurrentClip();
        } else {
            audio.play();
        }
    });

    pauseButton.addEventListener('click', () => {
        pauseCurrentClip();
    });

    skipButton.addEventListener('click', () => {
        guessBoxes[currentClipIndex].textContent = "Skipped";
        guessBoxes[currentClipIndex].classList.add('incorrect');
        guessBoxes[currentClipIndex].style.borderColor = 'red';
        currentClipIndex++;
        if (currentClipIndex < maxGuesses) {
            updateGuessBoxes();
        } else {
            gameCompleted = true;
            stats.X++;
            stats.played++;
            stats.streak = 0;
            saveStats();
            reveal.textContent = `The song was "${songs[currentSongIndex].Title}" by ${songs[currentSongIndex].Artist}`;
            reveal.style.color = 'red'; // Make text red for missed guess
            playCurrentClip(true);
            addNewGameButton();
        }
    });

    submitButton.addEventListener('click', () => {
        const userGuess = guessInput.value;
        const correctAnswer = `${songs[currentSongIndex].Artist} - ${songs[currentSongIndex].Title}`;
        const guessedCorrectly = userGuess.toLowerCase() === correctAnswer.toLowerCase();

        if (guessedCorrectly) {
            feedback.textContent = 'Correct!';
            reveal.textContent = `The song was "${correctAnswer}"`;
            reveal.style.color = 'lightgreen'; // Make text light green for correct guess
            guessBoxes[currentClipIndex].classList.add('correct');
            guessBoxes[currentClipIndex].style.borderColor = 'lightgreen';
            playCurrentClip(true); // Play full song
            gameCompleted = true;
            addNewGameButton();
        } else if (userGuess.toLowerCase().startsWith(songs[currentSongIndex].Artist.toLowerCase())) {
            feedback.textContent = 'Close!';
            guessBoxes[currentClipIndex].classList.add('close');
            guessBoxes[currentClipIndex].style.borderColor = 'yellow';
        } else {
            feedback.textContent = 'Try again!';
            guessBoxes[currentClipIndex].classList.add('incorrect');
            guessBoxes[currentClipIndex].style.borderColor = 'red';
        }

        guessBoxes[currentClipIndex].textContent = userGuess;
        adjustTextSize(guessBoxes[currentClipIndex]);
        guessInput.value = '';
        suggestionsList.innerHTML = '';
        updateGuessBoxes();
        currentClipIndex++;

        if (currentClipIndex < maxGuesses) {
            updateGuessBoxes();
        } else if (!reveal.textContent) {
            feedback.textContent = 'No more guesses!';
            reveal.textContent = `The song was "${correctAnswer}"`;
            reveal.style.color = 'red'; // Make text red for missed guess
            playCurrentClip(true); // Play full song
            gameCompleted = true;
            addNewGameButton();
        }

        updateStats(guessedCorrectly);
    });

    function adjustTextSize(box) {
        const maxFontSize = 16; // Set the maximum font size
        const minFontSize = 10; // Set the minimum font size
        const maxWidth = box.clientWidth; // Get the width of the box

        box.style.fontSize = `${maxFontSize}px`; // Start with the maximum font size

        while (box.scrollWidth > maxWidth && parseInt(box.style.fontSize) > minFontSize) {
            box.style.fontSize = `${parseInt(box.style.fontSize) - 1}px`;
        }
    }

    function addNewGameButton() {
        if (!document.getElementById('new-game-control')) {
            const newGameControl = document.createElement('button');
            newGameControl.id = 'new-game-control';
            newGameControl.textContent = 'New Game';
            newGameControl.className = 'control-button'; // Apply same class as other buttons
            newGameControl.addEventListener('click', () => {
                removeCurrentSong();
                location.reload(); // Reload the page to start a new game
            });
            document.getElementById('play-pause-controls').appendChild(newGameControl);
        }
    }

    function removeCurrentSong() {
        songs.splice(currentSongIndex, 1);
        saveSongs();
        currentSongIndex = Math.floor(Math.random() * songs.length);
        gameCompleted = false;
        lastGuesses = null;
        updateStatsDisplay();
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
        removeCurrentSong();
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
