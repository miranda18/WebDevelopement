const form = document.querySelector("#searchForm");
const showResults = document.getElementById("showResults");
const type = "Type: ";
const summary = "Summary: "

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Submitted!");
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };

    const res = await axios.get("http://api.tvmaze.com/search/shows", config);
    console.log(res.data);
    getShows(res.data);
    form.elements.query.value = "";
});

const getShows = (shows) => {
    clearResults();

    for (let result of shows) {
        if (result.show.image) {

            // creating images
            const showImg = document.createElement("IMG");
            showImg.classList.add("c-img-top");
            showImg.src = result.show.image.medium;

            // creating title 
            const showTitle = document.createElement("P");
            showTitle.innerHTML = result.show.name;
            showTitle.classList.add("card-title");

            // creating type 
            const showType = document.createElement("P");
            showType.innerHTML = type.bold() + result.show.type;

            // creating summary 
            const showSummary = document.createElement("P");
            // showSummary.innerHTML = result.show.summary; 
            const showSummaryText = result.show.summary;
            const summaryWordCt = wordCounter(showSummaryText);

            // if the summary is less than or equal to 40 words, the full summary 
            // is displayed. 
            // Else it is condensed down to 40 words, and the user will be able to click to read more 
            // by going to the TVMaze site 
            if (summaryWordCt <= 40) {
                showSummary.innerHTML = summary.bold() + showSummaryText;
            }
            else {
                showSummary.innerHTML = summary.bold() + showSummaryText.split(" ", 40).join(" ") + "...";
                const readMore = document.createElement("a");
                readMore.setAttribute("href", result.show.url);
                readMore.setAttribute("target", "_blank");
                readMore.innerText = "Read More";
                showSummary.appendChild(readMore);
            }

            // Creating a new div 
            const showDiv = document.createElement("DIV");
            showDiv.classList.add("show"); //, "card"); 

            // appending div to body 
            document.body.append(showDiv);

            // appending all the shows details to the newly created div 
            showDiv.append(showImg, showTitle, showType, showSummary);

            // appending to reuslts container 
            // document.getElementById("showResults").appendChild(showDiv);
            showResults.appendChild(showDiv);

        }

    }
}

/*
    The function: wordCounter() takes in a string and counts how many words are within that 
                  string. 
    Parameters: 
                @text - specifed string 
*/
function wordCounter(text) {
    const summary = text.split(" ");
    let wordCount = 0;
    for (let i = 0; i < summary.length; i++) {
        if (text[i] !== " ") {
            wordCount++;
        }
    }
    return wordCount;

}

/*
    The function: clearResults() clears the current search result and replaces the 
                  new result requested by the user 
                  
*/
function clearResults() {
    const clearResults = document.getElementsByClassName("show");
    for (let i = clearResults.length - 1; i >= 0; i--) {
        clearResults[i].remove();
    }
}

