var Genius = require('lyricist');
var deasync = require('deasync');

var gn = new Genius(process.argv[2]);
var songs = [];

var done = false;

for (var i = 1; !done; i++) {
    console.log(`Getting page ${i}...`);

    var getDone = false;

    gn.songsByArtist(parseInt(process.argv[3]), { sort: "title", page: i, perPage: 50 }).then(function (results) {
        if (results.length == 0) {
            console.log(`No more data!`);
            done = true;
            getDone = true;
            return;
        }
        console.log(`Data arrived for page ${i}.`);
        songs.push(...results);
        getDone = true;
    }).catch((err) => {throw err});

    deasync.loopWhile(() => !getDone);
    if (!done)
        console.log(`Mapping page ${i} done.`);
}

console.log(`Mapped ${songs.length} songs.`);

var songIDs = songs.map(x => x.id);

var sentenceDump = "";

songIDs.forEach(function(song, songNo) {
    var scrapeDone = false;
    gn.song(song, { fetchLyrics: true }).then(function (songObj) {
        console.log(`Data arrived for song ID ${song}. (#${songNo})`);
        sentenceDump += songObj.lyrics.split("\n").join(". ") + " ";
        scrapeDone = true;
    });
    deasync.loopWhile(() => !scrapeDone);
});

sentenceDump = sentenceDump.replace(/[\[\]\(\)]/g, "");

require('fs').writeFileSync('dump.txt', sentenceDump, 'utf8');