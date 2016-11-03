// ** R E V I E W ** —> I love when people put creative twists on the assignments. Nice touches from the css, 
// input placeholder and use of an iframe to add a Youtube video. I have only seen one or two of these movies and
// they look worth seeing if I ever find the time. Your server code is super organized and I think it was a
// good design choice to only use the API for search. You also address many issues that some people might
// overlook or not know how to handle, such as handling bad results from a search. All in all there's little
// to criticize, so keep up the hard work and putting your own personal touches and you will have plenty to show
// for yourself when you graduate.   


// COMPLETE.
// This particular API is case insensitive by default.

// Set up modules.
const express = require('express');
const app = express();
const http = require("http");
const https = require("https");
const request = require("request");

const baseurl1 = "http://www.omdbapi.com/?t="
const baseurl2 = "&y=&plot=short&r=json&type=movie"
const testbaseurl = "http://www.omdbapi.com/?s="
const testurl = "http://www.omdbapi.com/?t=2012&y=&plot=short&r=json" //2012//

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/index', {movies: getmovies()});
});

//Movie details for those in hardcoded database.
app.get('/movie/:movieId', (req, res) => {
    let movies = getmovies();
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id === req.params.movieId) {
            let foundMovie = movies[i];
            res.render('pages/movie', {foundMovie: foundMovie}); /* ... means send the foundMovie object with foundMovie as its value. */
        };
    };
});

//Movie details for those in omdb.
app.get('/omdbmovie/:title', (req, res) => {
    // console.log('title param: ' + req.params.title);
    request (baseurl1 + req.params.title + baseurl2, function (error, response, body) {
        if (!error) {
            let JSONobj = JSON.parse(body)
            // console.log(JSONobj.Title);
            //This particular API is case insensitive by default.//
            let searchresults = JSONobj;
            res.render('pages/omdbmovie', {searchresults: searchresults});
        };
    });
});

//Render all search results.
app.get('/searchresults/:title', (req, res) => {
    // console.log(req.params.title);
    let movies = getmovies();
    let status = false;
    searchresults = []
    // For every search query, look through hardcoded database first.
    // for (var i = 0; i < movies.length; i++) {
    //     if (movies[i].title.toLowerCase().includes(req.params.title.toLowerCase())) {
    //         searchresults.push(movies[i]);
    //         status = true;
    //         console.log(searchresults);
    //     }; 
    // };
    // console.log(status);
    // if (status === true) {
    //     res.render('pages/searchresults', {searchresults: searchresults});
    // If not in hardcoded database, check omdb.

    // Actually, just always check omdb to maximize results user receives.
    if (status === false) {
    // } else if (status === false) {
        // console.log(status);
        request (testbaseurl + req.params.title + baseurl2, function (error, response, body) {
            if (!error) {
                let counter = 0; //counts anomalies
                let JSONobj = JSON.parse(body); //an object with an array of objects inside
                var resultsarray = JSONobj.Search; //an array of movie objects matching the search query
                //Now that you have an array of relevant movie objects, send requests for each to get their movie details back so you can get all the info you need for the search results page.
                for (var j = 0; j < JSONobj.Search.length; j++) {
                    request (baseurl1 + JSONobj.Search[j].Title + baseurl2, function (error, response, body) {
                        if (!error) {
                            let JSONmovie = JSON.parse(body); //specific movie object for each search result
                            if (JSONmovie.Title != undefined){
                            searchresults.push(JSONmovie);
                            } else {
                                counter++
                            }
                            // console.log("a:" + searchresults.length)
                            // console.log("b:" + JSONobj.Search.length)
                            if (searchresults.length + counter === JSONobj.Search.length) {
                                res.render('pages/omdbsearchresults', {searchresults: searchresults});
                            }; 
                        } else {
                            console.log("Request for movie object data on search results page failed.");
                        };
                    });
                };
            } else {
                console.log("We're sorry. We couldn't find that movie!");
            };
        });
    } else {
        console.log("Movie was not found");
    };
});

app.use(express.static('public'));

// start Express on port 8080
app.listen(8080, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});



// Function that returns an array of movie objects
function getmovies() {
    return [{
      title: "The Matrix",
      year: "1999",
      rated: "R",
      released: "31 Mar 1999",
      runtime: "136 min",
      genre: "Action, Sci-Fi",
      director: "Andy Wachowski, Lana Wachowski",
      writer: "Andy Wachowski, Lana Wachowski",
      actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
      plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      language: "English",
      country: "USA, Australia",
      awards: "Won 4 Oscars. Another 34 wins & 40 nominations.",
      poster: "http://i.imgur.com/fAWwkMI.jpg",
      metascore: "73",
      imdbRating: "8.7",
      imdbVotes: "1037112",
      id: "tt0133093",
      type: "movie"
    }, {
      title: "Looper",
      year: "2012",
      rated: "R",
      released: "28 Sep 2012",
      runtime: "119 min",
      genre: "Action, Crime, Sci-Fi",
      director: "Rian Johnson",
      writer: "Rian Johnson",
      actors: "Joseph Gordon-Levitt, Bruce Willis, Emily Blunt, Paul Dano",
      plot: "In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe - who one day learns the mob wants to 'close the loop' by sending back Joe's future self for assassination.",
      language: "English, French",
      country: "USA, China",
      awards: "15 wins & 37 nominations.",
      poster: "http://i.imgur.com/ad02q4a.jpg",
      metascore: "84",
      imdbRating: "7.5",
      imdbVotes: "377691",
      id: "tt1276104",
      type: "movie"
    }, {
      title: "TRON: Legacy",
      year: "2010",
      rated: "PG",
      released: "17 Dec 2010",
      runtime: "125 min",
      genre: "Action, Adventure, Sci-Fi",
      director: "Joseph Kosinski",
      writer: "Edward Kitsis (screenplay), Adam Horowitz (screenplay), Edward Kitsis (story), Adam Horowitz (story), Brian Klugman (story), Lee Sternthal (story), Steven Lisberger (characters), Bonnie MacBird (characters)",
      actors: "Jeff Bridges, Garrett Hedlund, Olivia Wilde, Bruce Boxleitner",
      plot: "The son of a virtual world designer goes looking for his father and ends up inside the digital world that his father designed. He meets his father's corrupted creation and a unique ally who was born inside the digital world.",
      language: "English",
      country: "USA",
      awards: "Nominated for 1 Oscar. Another 10 wins & 39 nominations.",
      poster: "http://i.imgur.com/Smd2JFm.jpg",
      metascore: "49",
      imdbRating: "6.8",
      imdbVotes: "241380",
      id: "tt1104001",
      type: "movie"
    }, {
      title: "Inception",
      year: "2010",
      rated: "PG-13",
      released: "16 Jul 2010",
      runtime: "148 min",
      genre: "Action, Mystery, Sci-Fi",
      director: "Christopher Nolan",
      writer: "Christopher Nolan",
      actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
      plot: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      language: "English, Japanese, French",
      country: "USA, UK",
      awards: "Won 4 Oscars. Another 153 wins & 171 nominations.",
      poster: "http://i.imgur.com/cF3DFGi.jpg",
      metascore: "74",
      imdbRating: "8.8",
      imdbVotes: "1236546",
      id: "tt1375666",
      type: "movie"
    }, {
      title: "Source Code",
      year: "2011",
      rated: "PG-13",
      released: "1 Apr 2011",
      runtime: "93 min",
      genre: "Mystery, Sci-Fi, Thriller",
      director: "Duncan Jones",
      writer: "Ben Ripley",
      actors: "Jake Gyllenhaal, Michelle Monaghan, Vera Farmiga, Jeffrey Wright",
      plot: "A soldier wakes up in someone else's body and discovers he's part of an experimental government program to find the bomber of a commuter train. A mission he has only 8 minutes to complete.",
      language: "English",
      country: "USA, Canada",
      awards: "1 win & 5 nominations.",
      poster: "http://i.imgur.com/wWuxzLe.jpg",
      metascore: "74",
      imdbRating: "7.5",
      imdbVotes: "327161",
      id: "tt0945513",
      type: "movie"
    }, {
      title: "Hackers",
      year: "1995",
      rated: "PG-13",
      released: "15 Sep 1995",
      runtime: "107 min",
      genre: "Comedy, Crime, Drama",
      director: "Iain Softley",
      writer: "Rafael Moreu",
      actors: "Jonny Lee Miller, Angelina Jolie, Jesse Bradford, Matthew Lillard",
      plot: "A young boy is arrested by the U.S. Secret Service for writing a computer virus and is banned from using a computer until his 18th birthday. Years later, he and his new-found friends ...",
      language: "English, Italian, Japanese, Russian",
      country: "USA",
      awards: "N/A",
      poster: "http://i.imgur.com/njaHNJn.jpg",
      metascore: "46",
      imdbRating: "6.2",
      imdbVotes: "49883",
      id: "tt0113243",
      type: "movie"
    }, {
      title: "The Social Network",
      year: "2010",
      rated: "PG-13",
      released: "1 Oct 2010",
      runtime: "120 min",
      genre: "Biography, Drama",
      director: "David Fincher",
      writer: "Aaron Sorkin (screenplay), Ben Mezrich (book)",
      actors: "Jesse Eisenberg, Rooney Mara, Bryan Barter, Dustin Fitzsimons",
      plot: "Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the cofounder who was later squeezed out of the business.",
      language: "English, French",
      country: "USA",
      awards: "Won 3 Oscars. Another 166 wins & 132 nominations.",
      poster: "http://i.imgur.com/jC86duZ.jpg",
      metascore: "95",
      imdbRating: "7.8",
      imdbVotes: "414791",
      id: "tt1285016",
      type: "movie"
    }, {
      title: "The Imitation Game",
      year: "2014",
      rated: "PG-13",
      released: "25 Dec 2014",
      runtime: "114 min",
      genre: "Biography, Drama, Thriller",
      director: "Morten Tyldum",
      writer: "Graham Moore, Andrew Hodges (book)",
      actors: "Benedict Cumberbatch, Keira Knightley, Matthew Goode, Rory Kinnear",
      plot: "During World War II, mathematician Alan Turing tries to crack the enigma code with help from fellow mathematicians.",
      language: "English, German",
      country: "UK, USA",
      awards: "Won 1 Oscar. Another 51 wins & 125 nominations.",
      poster: "http://i.imgur.com/HM4iaQy.jpg",
      metascore: "73",
      imdbRating: "8.1",
      imdbVotes: "278826",
      id: "tt2084970",
      type: "movie"
    }, {
      title: "Office Space",
      year: "1999",
      rated: "R",
      released: "19 Feb 1999",
      runtime: "89 min",
      genre: "Comedy",
      director: "Mike Judge",
      writer: "Mike Judge (Milton animated shorts), Mike Judge (screenplay)",
      actors: "Ron Livingston, Jennifer Aniston, David Herman, Ajay Naidu",
      plot: "Three company workers who hate their jobs and decide to rebel against their greedy boss.",
      language: "English",
      country: "USA",
      awards: "2 nominations.",
      poster: "http://i.imgur.com/bBt7i2d.jpg",
      metascore: "68",
      imdbRating: "7.8",
      imdbVotes: "182428",
      id: "tt0151804",
      type: "movie"
    }, {
      title: "Ex Machina",
      year: "2015",
      rated: "R",
      released: "24 Apr 2015",
      runtime: "108 min",
      genre: "Drama, Sci-Fi",
      director: "Alex Garland",
      writer: "Alex Garland",
      actors: "Domhnall Gleeson, Corey Johnson, Oscar Isaac, Alicia Vikander",
      plot: "A young programmer is selected to participate in a breakthrough experiment in artificial intelligence by evaluating the human qualities of a breathtaking female A.I.",
      language: "English",
      country: "UK",
      awards: "1 win & 2 nominations.",
      poster: "http://i.imgur.com/uN0Y2ZV.jpg",
      metascore: "78",
      imdbRating: "7.8",
      imdbVotes: "82581",
      id: "tt0470752",
      type: "movie"
    }]
}