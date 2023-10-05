async function getUsers(names){
    const baseUrl = "https://api.github.com/users/";

    const userPromises = names.map(async name => {
        const response = await fetch(baseUrl + name);
        const userData = await response.json();
        return userData;
    })

    const users = await Promise.all(userPromises);
    return users
}
console.log(getUsers.userPromises);




//To get response and log the progress


let response = await fetch('https://github.com/Mpintshi/RockPaper'); //Fetch and obtain reader

const reader = response.body.getReader();

//Total length
const contentLength = +response.headers.get('Content-Length');

//Read the data
let recievedLength = 0; //Length at the moment
let chunks = []; //Array of receivef binary chunks (comprises the body)

while(true){
    const {done, value} = await reader.read();

    if (done){
        break;
    }

    chunks.push(value);
    recievedLength += value.length;
    console.log('Received ${receivedLength} of ${contentLength}')
}

//Concatenate chunks into single Unint8Array
let chunksAll = new Uint8Array(recievedLength); //4.1
let position = 0;
for(let chunk of chunks){
    chunksAll.set(chunk, position); //(4.2)
    position += chunk.length;
}

//decode into single string
let result = new TextDecoder("utf-8").decode(chunksAll);

//We done
let commit = JSON.parse(result);
console.log(commit[0].author.login);