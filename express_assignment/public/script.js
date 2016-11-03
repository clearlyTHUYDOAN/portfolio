$(document).ready(function () {

//CREATE A FUNCTION THAT CONSTRUCTS AN EMPTY JOURNAL THAT WILL HAVE ENTRIES ADDED TO IT//

//You use a constructor function so that it's flexible for several people to create their own journals...//
//...rather than creating multiple objects with similar properties://

function Journal (author) {
    this.author = author;
    this.entries = [];
};

//CREATE A FUNCTION THAT CONSTRUCTS OBJECTS BASED ON PARAMETERS: TITLE, CONTENT, AUTHOR //
//Every time you click log entry, create an entrytags array and push in the values of the #journalTags.//

function Entry (title, content, author, tagarray) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.tags = tagarray;
};

//ADD ENTRIES TO A SPECIFIC JOURNAL//

Journal.prototype.createNewEntry = function (title, content, author, tagarray) { //method that creates new entry and adds it to the Journal object's entries array//
    const entry = new Entry (title, content, this.author, tagarray); //<- grabs author from what you passed into Journal parameters.//
    this.entries.push(entry); //how you add an object into an array inside an object//
};

const thuyJournal = new Journal("Thuy");

console.log(thuyJournal); 

//DISPLAY ALL JOURNAL ENTRIES//

console.log(thuyJournal.entries); 

//FUNCTION FOR RENDERING ENTRY.//

function renderEntry (title, content, tagarray) {
    let htmlString = "";
    htmlString += '<div class="panel panel-default">'
    htmlString += '<div class="panel-heading">'
    htmlString += '<h3 class="panel-title">' + title + '</h3>'
    htmlString += '</div>'
    htmlString += '<div class="panel-body">'
    htmlString += content
    htmlString += '</div>'
    htmlString += '<div class="panel-footer">'
    for (var i = 0; i < tagarray.length; i++) {
        htmlString += '<span class="label label-primary">'
        htmlString += tagarray[i];
        htmlString += '</span>'
        htmlString += '\n'
    };
    htmlString += '</div>'
    htmlString += '</div>'
    $('.renderedJournalEntries').append(htmlString);
};

//JQUERY//

//When .logEntry button is clicked, create an object and add to journal using the text inputted by the user.//
$(".logEntry").click(function() { 
//Grab values and make a new entries object with them.//
    var title = $("#journalTitle").val(); 
    var content = $("#journalMainText").val(); 
    var author = $("#journalAuthor").val(); 
    var tags = $("#journalTags").val(); 
    var tagarray = tags.split(", ") //split string of tags into array elements//
    console.log(tagarray); 
    thuyJournal.createNewEntry(title, content, author, tagarray); 
    console.log(thuyJournal); 
    console.log(thuyJournal.entries);

// When .logEntry button is clicked, also render the journal entry by appending to html - include its tags.//
    renderEntry(title, content, tagarray);
});

//When search button is clicked, find entry with relevant tags, display it, and hide irrelevant objects / entries.//
$(".searchButton").click(function() {
    var searchitem = $("#searchButton").val();
    $(".renderedJournalEntries").empty();
    for (var i = 0; i < thuyJournal.entries.length; i++) {
        for (var j = 0; j < thuyJournal.entries[i].tags.length; j++) {
            if (thuyJournal.entries[i].tags[j] === searchitem) {
                renderEntry(thuyJournal.entries[i].title, thuyJournal.entries[i].content, thuyJournal.entries[i].tags);
            };
        };
    };
});

//When display all entries button is clicked, display all entries that currently exist. Used to visually restore entries after searching.//
$(".displayAll").click(function() {
    $(".renderedJournalEntries").empty();
    for (var i = 0; i < thuyJournal.entries.length; i++) {
        renderEntry(thuyJournal.entries[i].title, thuyJournal.entries[i].content, thuyJournal.entries[i].tags);
    };
});

}); //close document ready function