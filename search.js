//Utils
function setCookie(name,value,days){
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
function getCookie(n){
    let name = n + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}


function homeScreen(){
    const contli = document.querySelector('#content-list');
    removeAllChildNodes(contli);
    const loading = document.createElement('img');
    loading.src = "https://flevix.com/wp-content/uploads/2019/12/Barline-Loading-Images-1.gif";
    loading.setAttribute('class' , 'loading');
    loading.setAttribute('id', 'load')
    document.getElementsByTagName("BODY")[0].appendChild(loading);
    let cookies = String(document.cookie).split(";");
    let searchli = [];
    if (cookies.length == 1){
        console.log("entered");
        searchli.push('intel', 'amd', 'india', 'china', 'microsoft', 'qualcomm');
    }
    else{
        for(let x = 0; x < cookies.length; x++)
        {
            searchli.push(cookies[x].split("=")[0])
        }
    }

    var url = 'enter api running backend'+ searchli;
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.send();
    request.onload = () =>{
        if (request.status == 200)
        {
            var results = JSON.parse(request.response).Results;

                for (let i = 0; i < results.length; i++) {
                    //console.log(document.getElementsByClassName(results[i].url));
                    if (results[i].content != null){
                        const template = document.createElement('div');
                        const link = document.createElement('a');
                        link.href = results[i].url;
                        link.target = "_blank"
                        link.setAttribute('class', results[i].url)
                        link.setAttribute('id', results[i].url)
                        template.setAttribute("class", "content");
                        template.setAttribute("id", JSON.stringify(results[i].title));
                        var img = document.createElement("img");
                        img.src = results[i].urlToImage;
                        var content = document.createElement("P"); 
                        var view = String(results[i].content);
                        content.innerHTML = view.substring(0,120) + "...";
                        var author = document.createElement("P");
                        var sentiment = document.createElement("P");
                        sentiment.setAttribute("class", "polarity");
                        sentiment.innerHTML = "Positivity: " + Math.round(JSON.stringify(results[i].Sentiment*100)) + "%";
                        author.setAttribute("class", "author");
                        author.innerHTML = results[i].author + "    ";
                        var parentdiv = document.getElementById("content-list");
                        parentdiv.appendChild(link);
                        document.getElementById(results[i].url).appendChild(template);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(img);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(sentiment);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(content);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(author);
                    }
                }
                removeElement("load")
            }
            else{
                console.log(" ")
            }
    };
}

function Search()
    {
        var x = document.getElementById("SearchTxt").value;
        if (x == ""){
            document.getElementById("home").click();
            return;
        }
        let searchistory = getCookie(x);
        if (searchistory == ""){
            setCookie(x, x, 30)
        }
        const contli = document.querySelector('#content-list');
        removeAllChildNodes(contli);
        const loading = document.createElement('img');
        loading.src = "https://flevix.com/wp-content/uploads/2019/12/Barline-Loading-Images-1.gif";
        loading.setAttribute('class' , 'loading');
        loading.setAttribute('id', 'load')
        document.getElementsByTagName("BODY")[0].appendChild(loading);
        var url = 'api running backend'+x;
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.send();
        request.onload = () =>{
            if (request.status == 200)
            {
                var results = JSON.parse(request.response).Results;

                for (let i = 0; i < results.length; i++) {
                    if (results[i].content != null){
                        const template = document.createElement('div');
                        const link = document.createElement('a');
                        link.href = results[i].url;
                        link.target = "_blank"
                        link.setAttribute('id', results[i].url)
                        template.setAttribute("class", "content");
                        template.setAttribute("id", JSON.stringify(results[i].title));
                        var img = document.createElement("img");
                        img.src = results[i].urlToImage;
                        var content = document.createElement("P"); 
                        var view = String(results[i].content);
                        content.innerHTML = view.substring(0,120) + "...";
                        var author = document.createElement("P");
                        var sentiment = document.createElement("P");
                        sentiment.setAttribute("class", "polarity");
                        sentiment.innerHTML = "Positivity: " + Math.round(JSON.stringify(results[i].Sentiment*100)) + "%";
                        author.setAttribute("class", "author");
                        author.innerHTML = results[i].author + "    ";
                        var parentdiv = document.getElementById("content-list");
                        parentdiv.appendChild(link);
                        document.getElementById(results[i].url).appendChild(template);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(img);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(sentiment);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(content);
                        document.getElementById(JSON.stringify(results[i].title)).appendChild(author);
                    }
                }
                removeElement("load")
            }
            else{
                console.log(" ")
            }
        };

    }
