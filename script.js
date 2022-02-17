fetch("https://www.dnd5eapi.co/api/races/")
    .then((response) => response.json())
    .then(onDataReady)
    .catch(onError);

const domain = "https://dnd5eapi.co";


function onDataReady(races) {

    const list = document.getElementById("item-list");

    for (const item of races.results) {
        const listElement = document.createElement("li");
        let subUrl = domain + item.url;

        addRaceName(listElement, item.name, "large-font");

        const description = document.createElement("p");
        //fetch(subUrl)                         //Da usare se il sito consente il collegamento
        fetch("./moreRaces.json")               //Piano B
        .then((response) => response.json())
        .then((data)=> onDetailReady(data, item.index, description))
        .catch(onError);
    

        listElement.appendChild(description);


        newlink = document.createElement("a");
        newlink.innerHTML = "More info about " + item.name;
        newlink.setAttribute("href", subUrl);
        newlink.setAttribute("target", "_blank");
        listElement.appendChild(newlink);
        
        list.appendChild(listElement);
    }
}

function addRaceName(htmlElement, text, isNewLine = false, className) {
    const span = document.createElement("span")
    span.className += className + " "
    const textnode = document.createTextNode(text)
    span.appendChild(textnode)
    htmlElement.appendChild(span)
    if (isNewLine) {
        const newline = document.createElement("br");
        htmlElement.appendChild(newline);
    }
}

function onError(error) {
    console.log(error);
}

function onDetailReady(data, raceI, htmlElement) {
    console.log(data);
    console.log(raceI);

    let alignDesc = document.createElement("p");
    //let textnode = document.createTextNode(data.alignment);       //Da usare se il sito consente il collegamento
    let textnode = document.createTextNode(data[raceI].alignment);   //Piano B
    alignDesc.appendChild(textnode);

    let ageDesc = document.createElement("p");
    //textnode = document.createTextNode(data.age);                 //Da usare se il sito consente il collegamento             
    textnode = document.createTextNode(data[raceI].age);             //Piano B
    ageDesc.appendChild(textnode);

    htmlElement.appendChild(alignDesc);
    htmlElement.appendChild(ageDesc);
}