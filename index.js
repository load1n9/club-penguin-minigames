   
function ListGames(room) {
        console.log(room)
        let list = document.querySelector("#list")
        list.innerHTML = ""
        Dir[room].forEach(element => {
            let a = document.createElement('a');
            let linkText = document.createTextNode(element);
            a.appendChild(linkText);
            a.title = element;
            a.href = `/${element}`;
            list.appendChild(a)
            //let linebreak = document.createElement("br");
            //list.appendChild(linebreak)
        });
 }