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
        {Artist: "Tyler Hubbard", Title: "5 Foot 9", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Tyler+Hubbard+-+5+Foot+9+(Lyrics).mp3"},
        {Artist: "Burl Ives", Title: "A Holly Jolly Christmas", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Burl+Ives+-+A+Holly+Jolly+Christmas+(Lyric+Video).mp3"},
        {Artist: "Walker Hayes", Title: "AA", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/AA+(Lyric+Video).mp3"},
        {Artist: "Gayle", Title: "ABCDEFU", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/GAYLE+-+abcdefu.mp3"},
        {Artist: "Lizzo", Title: "About Damn Time", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/About+Damn+Time.mp3"},
        {Artist: "Morgan Wallen", Title: "Ain't That Some", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Ain%E2%80%99t+That+Some.mp3"},
        {Artist: "Mariah Carey", Title: "All I Want for Christmas Is You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/All+I+Want+For+Christmas+Is+You.mp3"},
        {Artist: "Lil Durk featuring J. Cole", Title: "All My Life", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/All+My+Life.mp3"},
        {Artist: "Taylor Swift", Title: "All Too Well (Taylor's Version)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/All+Too+Well+(Taylors+Version)+(Lyric+Video).mp3"},
        {Artist: "Taylor Swift", Title: "Anti-Hero", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Taylor+Swift+-+Anti-Hero+(Lyrics).mp3"},
        {Artist: "Kaliii", Title: "Area Codes", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Area+Codes.mp3"},
        {Artist: "Harry Styles", Title: "As It Was", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/As+It+Was.mp3"},
        {Artist: "Steve Lacy", Title: "Bad Habit", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Bad+Habit.mp3"},
        {Artist: "Ed Sheeran", Title: "Bad Habits", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Ed+Sheeran+-+Bad+Habits.mp3"},
        {Artist: "Camila Cabello featuring Ed Sheeran", Title: "Bam Bam", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Bam+Bam.mp3"},
        {Artist: "Nicki Minaj and Ice Spice with Aqua", Title: "Barbie World", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Nicki+Minaj+%26+Ice+Spice+%E2%80%93+Barbie+World+(Lyrics).mp3"},
        {Artist: "Neiked, Mae Muller and Polo G", Title: "Better Days", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/NEIKED+Mae+Muller+Polo+G+-+Better+Days+(Lyrics).mp3"},
        {Artist: "Latto", Title: "Big Energy", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Big+Energy+(Live).mp3"},
        {Artist: "Lady Gaga", Title: "Bloody Mary", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Bloody+Mary+Pseudo+Video.mp3"},
        {Artist: "Dove Cameron", Title: "Boyfriend", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Boyfriend+(Official+Audio).mp3"},
        {Artist: "PinkPantheress and Ice Spice", Title: "Boy's a Liar Pt. 2", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/PinkPantheress+%26+Ice+Spice+-+Boy%E2%80%99s+a+liar+Pt+2+(Lyrics).mp3"},
        {Artist: "Beyoncé", Title: "Break My Soul", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/BREAK+MY+SOUL+(Official+Visualizer).mp3"},
        {Artist: "Lil Durk featuring Morgan Wallen", Title: "Broadway Girls", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Broadway+Girls.mp3"},
        {Artist: "Kane Brown", Title: "Bury Me in Georgia", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Bury+Me+in+Georgia+(Official+Lyric+Video).mp3"},
        {Artist: "Jordan Davis and Luke Bryan", Title: "Buy Dirt", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Buy+Dirt+(Official+Audio).mp3"},
        {Artist: "Rema and Selena Gomez", Title: "Calm Down", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Rema+Selena+Gomez+-+Calm+Down+(Lyrics).mp3"},
        {Artist: "Post Malone", Title: "Chemical", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Chemical+(Official+Audio).mp3"},
        {Artist: "Maren Morris", Title: "Circles Around This Town", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Maren+Morris+-+Circles+Around+This+Town+(Lyrics).mp3"},
        {Artist: "Elton John and Dua Lipa", Title: "Cold Heart (Pnau Remix)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Elton+John+%26+Dua+Lipa+-+Cold+Heart+(PNAU+Remix).mp3"},
        {Artist: "Metro Boomin, the Weeknd and 21 Savage", Title: "Creepin'", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Metro+Boomin+The+Weeknd+21+Savage+-+Creepin+(Lyrics).mp3"},
        {Artist: "Taylor Swift", Title: "Cruel Summer", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Taylor+Swift+-+Cruel+Summer+(Lyrics).mp3"},
        {Artist: "Beyoncé", Title: "Cuff It", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Beyonc%C3%A9+-+CUFF+IT+(Lyrics).mp3"},
        {Artist: "Fifty Fifty", Title: "Cupid", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Cupid+(Twin+Version)+(Lyrics).mp3"},
        {Artist: "Scotty McCreery", Title: "Damn Strait", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Damn+Strait.mp3"},
        {Artist: "Dua Lipa", Title: "Dance the Night", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Dua+Lipa+-+Dance+The+Night+(Lyrics).mp3"},
        {Artist: "Tyler Hubbard", Title: "Dancin' in the Country", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Dancin%E2%80%99+In+The+Country+(Official+Audio).mp3"},
        {Artist: "David Kushner", Title: "Daylight", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/David+Kushner+-+Daylight.mp3"},
        {Artist: "Noah Kahan and Post Malone", Title: "Dial Drunk", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Noah+Kahan+Post+Malone+-+Dial+Drunk+(Lyrics).mp3"},
        {Artist: "The Weeknd and Ariana Grande", Title: "Die for You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/The+Weeknd+%26+Ariana+Grande+-+Die+For+You+(Remix)+(Lyrics).mp3"},
        {Artist: "Luke Combs", Title: "Doin' This", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Doin+This.mp3"},
        {Artist: "Adele", Title: "Easy on Me", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Easy+On+Me+(Official+Lyric+Video).mp3"},
        {Artist: "Imagine Dragons and JID", Title: "Enemy", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Imagine+Dragons+x+JID+-+Enemy+(Lyrics).mp3"},
        {Artist: "Raye featuring 070 Shake", Title: "Escapism", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/RAYE+-+Escapism+(Lyrics)+ft+070+Shake.mp3"},
        {Artist: "Wizkid featuring Justin Bieber and Tems", Title: "Essence", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Essence+(Audio).mp3"},
        {Artist: "Morgan Wallen", Title: "Everything I Love", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Everything+I+Love.mp3"},
        {Artist: "Ed Sheeran", Title: "Eyes Closed", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Ed+Sheeran+-+Eyes+Closed+(Lyrics).mp3"},
        {Artist: "Bailey Zimmerman", Title: "Fall in Love", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Fall+In+Love.mp3"},
        {Artist: "Walker Hayes", Title: "Fancy Like", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Fancy+Like.mp3"},
        {Artist: "Luke Combs", Title: "Fast Car", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Fast+Car.mp3"},
        {Artist: "Toosii", Title: "Favorite Song", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Toosii+-+Favorite+Song+(Lyrics).mp3"},
        {Artist: "Lauren Spencer-Smith", Title: "Fingers Crossed", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Fingers+Crossed.mp3"},
        {Artist: "Jack Harlow", Title: "First Class", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Jack+Harlow+-+First+Class.mp3"},
        {Artist: "Ernest featuring Morgan Wallen", Title: "Flower Shops", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/ERNEST+-+Flower+Shops+(Lyrics)+ft+Morgan+Wallen.mp3"},
        {Artist: "Miley Cyrus", Title: "Flowers", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Flowers+(Official+Lyric+Video).mp3"},
        {Artist: "Gunna", Title: "FukUMean", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Gunna+-+fukumean+(Lyrics).mp3"},
        {Artist: "Doja Cat", Title: "Get Into It (Yuh)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Get+Into+It+(Yuh).mp3"},
        {Artist: "Justin Bieber", Title: "Ghost", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Ghost+(Visualizer).mp3"},
        {Artist: "Joji", Title: "Glimpse of Us", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Glimpse+of+Us.mp3"},
        {Artist: "Luke Combs", Title: "Going, Going, Gone", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Going+Going+Gone+(Official+Audio).mp3"},
        {Artist: "Jvke", Title: "Golden Hour", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/golden+hour+(Cello+Version).mp3"},
        {Artist: "Olivia Rodrigo", Title: "Good 4 U", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/good+4+u.mp3"},
        {Artist: "Parker McCollum", Title: "Handle on You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Handle+On+You+(Official+Audio).mp3"},
        {Artist: "Lainey Wilson", Title: "Heart Like a Truck", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Heart+Like+a+Truck.mp3"},
        {Artist: "Glass Animals", Title: "Heat Waves", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Glass+Animals+-+Heat+Waves+(Lyrics).mp3"},
        {Artist: "Muni Long", Title: "Hrs and Hrs", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Hrs+%26+Hrs.mp3"},
        {Artist: "OneRepublic", Title: "I Ain't Worried", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/I+Ain%E2%80%99t+Worried+(From+%E2%80%9CTop+Gun+Maverick%E2%80%9D)+%5BLyric+Video%5D.mp3"},
        {Artist: "SZA", Title: "I Hate U", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/I+Hate+U+(Visualizer).mp3"},
        {Artist: "Post Malone featuring Doja Cat", Title: "I Like You (A Happier Song)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Post+Malone+-+I+Like+You+(Lyrics)+ft+Doja+Cat.mp3"},
        {Artist: "Zach Bryan featuring Kacey Musgraves", Title: "I Remember Everything", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/I+Remember+Everything.mp3"},
        {Artist: "Morgan Wallen", Title: "I Wrote the Book", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/I+Wrote+The+Book.mp3"},
        {Artist: "David Guetta and Bebe Rexha", Title: "I'm Good (Blue)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/David+Guetta+Bebe+Rexha+-+Im+good+(Blue)+LYRICS+Im+good+yeah+Im+feelin+alright.mp3"},
        {Artist: "Lil Baby", Title: "In a Minute", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/In+A+Minute+(Lyric+Video).mp3"},
        {Artist: "Lil Nas X and Jack Harlow", Title: "Industry Baby", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/INDUSTRY+BABY.mp3"},
        {Artist: "Drake featuring 21 Savage", Title: "Jimmy Cooks", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Jimmy+Cooks.mp3"},
        {Artist: "Bobby Helms", Title: "Jingle Bell Rock", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Bobby+Helms+-+Jingle+Bell+Rock+(Official+Lyric+Video).mp3"},
        {Artist: "Lil Uzi Vert", Title: "Just Wanna Rock", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Lil+Uzi+Vert+-+Just+Wanna+Rock+(Lyrics).mp3"},
        {Artist: "Taylor Swift featuring Ice Spice", Title: "Karma", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Taylor+Swift+-+Karma+(Lyrics)+ft+Ice+Spice.mp3"},
        {Artist: "SZA", Title: "Kill Bill", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Kill+Bill.mp3"},
        {Artist: "Doja Cat featuring SZA", Title: "Kiss Me More", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Kiss+Me+More.mp3"},
        {Artist: "Drake featuring 21 Savage and Project Pat", Title: "Knife Talk", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Knife+Talk+(Audio).mp3"},
        {Artist: "Wham!", Title: "Last Christmas", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Last+Christmas+(Pudding+mix).mp3"},
        {Artist: "Jon Pardi", Title: "Last Night Lonely", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Last+Night+Lonely+(Official+Audio).mp3"},
        {Artist: "Morgan Wallen", Title: "Last Night", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Morgan+Wallen+-+Last+Night+(Lyrics).mp3"},
        {Artist: "Harry Styles", Title: "Late Night Talking", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Late+Night+Talking+(Audio).mp3"},
        {Artist: "Taylor Swift", Title: "Lavender Haze", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Taylor+Swift+-+Lavender+Haze+(Lyrics).mp3"},
        {Artist: "Dua Lipa", Title: "Levitating", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Levitating.mp3"},
        {Artist: "Rihanna", Title: "Lift Me Up", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Lift+Me+Up+(Audio).mp3"},
        {Artist: "Kane Brown", Title: "Like I Love Country Music", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Like+I+Love+Country+Music+(Official+Audio).mp3"},
        {Artist: "CKay", Title: "Love Nwantiti (Ah Ah Ah)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/CKay+-+Love+Nwantiti.mp3"},
        {Artist: "Luke Combs", Title: "Love You Anyway", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Love+You+Anyway+(Official+Lyric+Video).mp3"},
        {Artist: "Meghan Trainor", Title: "Made You Look", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Made+You+Look.mp3"},
        {Artist: "The Anxiety: Willow and Tyler Cole", Title: "Meet Me at Our Spot", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Meet+Me+At+Our+Spot+(Live+Performance).mp3"},
        {Artist: "Travis Scott featuring Drake", Title: "Meltdown", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/MELTDOWN+(Official+Audio).mp3"},
        {Artist: "Old Dominion", Title: "Memory Lane", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Memory+Lane+(Official+Lyric+Video).mp3"},
        {Artist: "Jelly Roll", Title: "Need a Favor", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Jelly+Roll+-+NEED+A+FAVOR+(Lyrics).mp3"},
        {Artist: "Doja Cat", Title: "Need to Know", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Need+to+Know.mp3"},
        {Artist: "Cole Swindell and Lainey Wilson", Title: "Never Say Never", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Cole+Swindell+%26+Lainey+Wilson+-+Never+Say+Never+(Lyrics).mp3"},
        {Artist: "Jordan Davis", Title: "Next Thing You Know", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Next+Thing+You+Know+(Official+Lyric+Video).mp3"},
        {Artist: "SZA", Title: "Nobody Gets Me", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Nobody+Gets+Me+(Lyric+Video).mp3"},
        {Artist: "Em Beihold", Title: "Numb Little Bug", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Numb+Little+Bug.mp3"},
        {Artist: "Adele", Title: "Oh My God", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Oh+My+God+(Official+Lyric+Video).mp3"},
        {Artist: "Kane Brown", Title: "One Mississippi", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/One+Mississippi.mp3"},
        {Artist: "Post Malone and the Weeknd", Title: "One Right Now", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/One+Right+Now+(Audio).mp3"},
        {Artist: "Morgan Wallen", Title: "One Thing at a Time", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/One+Thing+At+A+Time.mp3"},
        {Artist: "Doja Cat", Title: "Paint the Town Red", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Paint+The+Town+Red.mp3"},
        {Artist: "Young Nudy featuring 21 Savage", Title: "Peaches & Eggplants", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Peaches+%26+Eggplants.mp3"},
        {Artist: "Coi Leray", Title: "Players", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Coi+Leray+-+Players+(Lyrics).mp3"},
        {Artist: "Ice Spice and Nicki Minaj", Title: "Princess Diana", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Ice+Spice+%26+Nicki+Minaj+-+Princess+Diana+(AUDIO).mp3"},
        {Artist: "Future", Title: "Puffin on Zootiez", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/PUFFIN+ON+ZOOTIEZ+(Official+Audio).mp3"},
        {Artist: "Gunna and Future featuring Young Thug", Title: "Pushin P", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/pushin+P.mp3"},
        {Artist: "Latto featuring Cardi B", Title: "Put It on da Floor Again", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Put+It+On+Da+Floor+Again.mp3"},
        {Artist: "Bailey Zimmerman", Title: "Religiously", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Religiously+(Religiously+The+Acoustic+Sessions).mp3"},
        {Artist: "Drake and 21 Savage", Title: "Rich Flex", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Drake+21+Savage+-+Rich+Flex+(Lyrics).mp3"},
        {Artist: "Oliver Anthony Music", Title: "Rich Men North of Richmond", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Rich+Men+North+Of+Richmond.mp3"},
        {Artist: "Bailey Zimmerman", Title: "Rock and a Hard Place", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Rock+and+A+Hard+Place.mp3"},
        {Artist: "Brenda Lee", Title: "Rockin' Around the Christmas Tree", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Brenda+Lee+-+Rockin+Around+The+Christmas+Tree+(Official+Lyric+Video).mp3"},
        {Artist: "Kate Bush", Title: "Running Up That Hill (A Deal with God)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Kate+Bush+-+Running+Up+That+Hill+(Lyrics)+%5BFrom+Stranger+Things+Season+4+Soundtrack%5D.mp3"},
        {Artist: "Morgan Wallen", Title: "Sand in My Boots", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Sand+In+My+Boots+(The+Dangerous+Sessions)+(Bonus+Track).mp3"},
        {Artist: "The Weeknd and Ariana Grande", Title: "Save Your Tears", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/The+Weeknd+%26+Ariana+Grande+-+Save+Your+Tears+(Remix)+(Lyrics).mp3"},
        {Artist: "Drake", Title: "Search & Rescue", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Drake+-+Search+%26+Rescue+(Lyrics).mp3"},
        {Artist: "Jungkook featuring Latto", Title: "Seven", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Jung+Kook+%28%EC%A0%95%EA%B5%AD%29+-+Seven+(Lyrics)+ft+Latto.mp3"},
        {Artist: "Cole Swindell", Title: "She Had Me at Heads Carolina", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/She+Had+Me+At+Heads+Carolina.mp3"},
        {Artist: "Russell Dickerson featuring Jake Scott", Title: "She Likes It", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/She+Likes+It.mp3"},
        {Artist: "Tate McRae", Title: "She's All I Wanna Be", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/she%E2%80%99s+all+i+wanna+be.mp3"},
        {Artist: "SZA", Title: "Shirt", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Shirt.mp3"},
        {Artist: "Ed Sheeran", Title: "Shivers", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Shivers+(Lyric+Video).mp3"},
        {Artist: "Silk Sonic (Bruno Mars and Anderson .Paak)", Title: "Smokin out the Window", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Bruno+Mars+Anderson+Paak+Silk+Sonic+-+Smokin+Out+The+Window+(Lyrics).mp3"},
        {Artist: "SZA", Title: "Snooze", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Snooze.mp3"},
        {Artist: "Zach Bryan", Title: "Something in the Orange", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Zach+Bryan+-+Something+In+The+Orange+(Lyrics).mp3"},
        {Artist: "Drake and 21 Savage", Title: "Spin Bout U", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Drake+21+Savage+-+Spin+Bout+U+(Lyrics).mp3"},
        {Artist: "The Kid Laroi and Justin Bieber", Title: "Stay", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/STAY.mp3"},
        {Artist: "Nicky Youre and Dazy", Title: "Sunroof", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Sunroof.mp3"},
        {Artist: "Nicki Minaj", Title: "Super Freaky Girl", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Nicki+Minaj+-+Super+Freaky+Girl+(Lyrics).mp3"},
        {Artist: "Kodak Black", Title: "Super Gremlin", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Super+Gremlin.mp3"},
        {Artist: "Metro Boomin, Future and Chris Brown", Title: "Superhero (Heroes & Villains)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Metro+Boomin+Future+Chris+Brown+-+Superhero+(Lyrics).mp3"},
        {Artist: "Miguel", Title: "Sure Thing", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Sure+Thing.mp3"},
        {Artist: "Jessica Darrow", Title: "Surface Pressure", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Surface+Pressure+(From+Encanto+Lyric+Video).mp3"},
        {Artist: "Megan Thee Stallion and Dua Lipa", Title: "Sweetest Pie", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Sweetest+Pie.mp3"},
        {Artist: "Parmalee", Title: "Take My Name", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Take+My+Name.mp3"},
        {Artist: "Megan Moroney", Title: "Tennessee Orange", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Tennessee+Orange.mp3"},
        {Artist: "Kane Brown and Katelyn Brown", Title: "Thank God", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Kane+Brown+%26+Katelyn+Brown+-+Thank+God+(Lyrics).mp3"},
        {Artist: "Lil Nas X", Title: "Thats What I Want", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/THATS+WHAT+I+WANT.mp3"},
        {Artist: "Luke Combs", Title: "The Kind of Love We Make", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/The+Kind+of+Love+We+Make.mp3"},
        {Artist: "Morgan Wallen", Title: "Thinkin' Bout Me", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Morgan+Wallen+-+Thinkin%E2%80%99+Bout+Me+(Lyrics).mp3"},
        {Artist: "Morgan Wallen", Title: "Thought You Should Know", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Thought+You+Should+Know+(Lyric+Video).mp3"},
        {Artist: "Cody Johnson", Title: "Til You Can't", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Til+You+Can't+(Lyric+Video).mp3"},
        {Artist: "Jnr Choi and Sam Tompkins", Title: "To the Moon", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/TO+THE+MOON+(Official+Visualizer).mp3"},
        {Artist: "GloRilla and Cardi B", Title: "Tomorrow 2", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/GloRilla+Cardi+B+-+Tomorrow+2+(Lyrics).mp3"},
        {Artist: "Jason Aldean", Title: "Trouble with a Heartbreak", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Trouble+With+a+Heartbreak.mp3"},
        {Artist: "Jason Aldean", Title: "Try That in a Small Town", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Try+That+In+A+Small+Town.mp3"},
        {Artist: "Chris Brown", Title: "Under the Influence", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Under+The+Influence.mp3"},
        {Artist: "Sam Smith and Kim Petras", Title: "Unholy", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Sam+Smith+-+Unholy+(Lyrics)+ft+Kim+Petras.mp3"},
        {Artist: "Stephen Sanchez", Title: "Until I Found You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Stephen+Sanchez+Em+Beihold+-+Until+I+Found+You+(Lyrics).mp3"},
        {Artist: "Olivia Rodrigo", Title: "Vampire", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Olivia+Rodrigo+-+vampire+(Lyrics).mp3"},
        {Artist: "Doja Cat", Title: "Vegas", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Vegas+(From+the+Original+Motion+Picture+Soundtrack+ELVIS)+(Au.mp3"},
        {Artist: "Future featuring Drake and Tems", Title: "Wait for U", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/WAIT+FOR+U.mp3"},
        {Artist: "Hardy featuring Lainey Wilson", Title: "Wait in the Truck", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/wait+in+the+truck+(feat+Lainey+Wilson)+(Lyric+Video).mp3"},
        {Artist: "Morgan Wallen", Title: "Wasted on You", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Wasted+On+You.mp3"},
        {Artist: "Lainey Wilson", Title: "Watermelon Moonshine", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Watermelon+Moonshine.mp3"},
        {Artist: "Carolina Gaitán, Mauro Castillo, Adassa, Rhenzy Feliz, Diane Guerrero, Stephanie Beatriz and the Encanto cast", Title: "We Don't Talk About Bruno", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/We+Dont+Talk+About+Bruno+(From+EncantoLyric+Video).mp3"},
        {Artist: "Lil Durk featuring Gunna", Title: "What Happened to Virgil", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/What+Happened+to+Virgil.mp3"},
        {Artist: "Doechii featuring Kodak Black", Title: "What It Is (Block Boy)", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Doechii+-+What+It+Is+(Lyrics)+ft+Kodak+Black.mp3"},
        {Artist: "Jordan Davis", Title: "What My World Spins Around", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/What+My+World+Spins+Around+(Official+Audio+Video).mp3"},
        {Artist: "Billie Eilish", Title: "What Was I Made For?", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/What+Was+I+Made+For+(Official+Lyric+Video).mp3"},
        {Artist: "Corey Kent", Title: "Wild as Her", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Wild+as+Her+(Official+Lyric+Video).mp3"},
        {Artist: "Doja Cat", Title: "Woman", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/Woman.mp3"},
        {Artist: "Morgan Wallen", Title: "You Proof", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/You+Proof+(Lyric+Video).mp3"},
        {Artist: "Doja Cat and the Weeknd", Title: "You Right", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/You+Right.mp3"},
        {Artist: "Chris Stapleton", Title: "You Should Probably Leave", Mp3Url: "https://dbheard-clone.s3.us-east-2.amazonaws.com/2022/You+Should+Probably+Leave.mp3"}   
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
