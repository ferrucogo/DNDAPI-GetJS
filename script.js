fetch("https://www.dnd5eapi.co/api/races/")
    .then((response) => response.json())
    .then(onDataReady)
    .catch(onError);

const domain = "https://dnd5eapi.co";

// function getDescription(url){
//             fetch("https://www.dnd5eapi.co/api/races/" + url)
//                 .then((response) => response.json())
//         }

function onDataReady(races) {
    const list = document.getElementById("item-list");
    for (const item of races.results) {
        const listElement = document.createElement("li");

        addTextToHtmlElement(listElement, item.name, "large-font")

        let subUrl = domain + item.url;
        
        

        fetch(subUrl).then((response) => response.json())
        .then((data)=> onDetailReady(data, listElement))
        .catch(onError);
    

        list.appendChild(listElement)



        // 
        // let br = document.createElement("br")
        // newDescription.innerHTML = "Description: " + "ciao";
        // listElement.appendChild(newDescription)
        // listElement.appendChild(br)
        newlink = document.createElement("a")
        newlink.innerHTML = "More info about " + item.name;
        newlink.setAttribute("href", subUrl)
        newlink.setAttribute("target", "_blank")
        list.appendChild(newlink)
    }
}

function addTextToHtmlElement(htmlElement, text, isNewLine = false, className) {
    const span = document.createElement("span")
    span.className += className + " "
    const textnode = document.createTextNode(text)
    span.appendChild(textnode)
    htmlElement.appendChild(span)
    if (isNewLine) {
        const newline = document.createElement("br")
        htmlElement.appendChild(newline)
    }
}

function onError(error) {
    console.log(error);
}

function onDetailReady(data, htmlElement) {
    console.log(data);
    let newDescription = document.createElement("p");
    let textnode = document.createTextNode(data.age)
    newDescription.appendChild(textnode)
    htmlElement.appendChild(newDescription)
}