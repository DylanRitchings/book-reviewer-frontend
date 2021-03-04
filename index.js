

// //PUT - update
// const updateObject = {
//     "serId":100,
//     "title": "test",
//     "body": "bodyda sd as"
// };

// fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
//     method: `PUT`,
//     headers: {
//         "Content-type":"application/json"
//     },
//     body: JSON.stringify(updateObject)
// })
// .then((response)=> {
//     if(response.status !== 201){
//         console.log(`status: ${response.status}`);
//         return;
//     }
//     response.json()})
// .then((data)=> console.log(`Request succesful with JSON response ${data}`))
// .catch((error)=> console.log(error));


// // PostData Function
// let postData = (data) => {
//     let newTitle = document.createElement("h3")
//     let newBody = document.createElement("p");
//     let bodyData = data.body;
//     let titleData = data.title;
//     newTitle.innerHTML = `Title: ${titleData}`;
//     newBody.innerHTML = `Body: ${bodyData}`;
//     targetDiv.appendChild(newTitle);
//     targetDiv.appendChild(newBody);
// }


let displayReviews = (reviews) => {
    for (d in reviews){
        let review = reviews[d];
        let id = review.id;
        let authorName = review.authorName;
        let bookTitle = review.bookTitle;
        let body = review.body;

        let reviewsDiv = document.getElementById("reviews");

        let reviewDiv = document.createElement("div");
        reviewDiv.setAttribute("class","container review");
        reviewDiv.setAttribute("id",`review${id}`);
        reviewsDiv.appendChild(reviewDiv);

        let topDiv = document.createElement("div");
        topDiv.setAttribute("class","row");
        reviewDiv.appendChild(topDiv);

        let titleDiv = document.createElement("div");
        titleDiv.setAttribute("class","col-md title");
        titleDiv.textContent = bookTitle;
        topDiv.appendChild(titleDiv);


        let authorDiv = document.createElement("div");
        authorDiv.setAttribute("class","col-md author");
        authorDiv.textContent = authorName;
        topDiv.appendChild(authorDiv);

        let editBtn = document.createElement("button");
        editBtn.setAttribute("class","col- edit btn btn-primary");
        editBtn.textContent = "Edit";
        topDiv.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","col- delete btn btn-primary");
        deleteBtn.textContent = "Delete";
        topDiv.appendChild(deleteBtn);

        let bottomDiv = document.createElement("div");
        bottomDiv.setAttribute("class","row");
        reviewDiv.appendChild(bottomDiv);

        let bodyP = document.createElement("p");
        bodyP.setAttribute("class","col-sm body");
        bodyP.textContent = body;
        bottomDiv.appendChild(bodyP);
    }
}




//GET
fetch('http://localhost:8901/review/readAll')
.then((response) => { //.then follow fetch and takes in response
    if(response.status !== 200){
        console.log(`status: ${response.status}`);
        return;
    }
    response.json()
    .then((data)=> {
        displayReviews(data);
    }).catch((error)=> {
        console.log(error);
    })
});


// //GET BY ID
// fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
// .then((response) => { //.then follow fetch and takes in response
//     if(response.status !== 200){
//         console.log(`status: ${response.status}`);
//         return;
//     }
//     response.json()
//     .then((data)=> {
//         console.log(data);
//         // loopList(data);
//     }).catch((error)=> {
//         console.log(error);
//     })
// });


// //POST
// const myObject = {
//     "userId":100,
//     "title": "test",
//     "body": "bodyda sd as"
// };

// fetch(`https://jsonplaceholder.typicode.com/posts`,{
//     method: `POST`,
//     headers: {
//         "Content-type":"application/json"
//     },
//     body: JSON.stringify(myObject)
// })
// .then((response)=> {
//     if(response.status !== 201){
//         console.log(`status: ${response.status}`);
//         return;
//     }
//     response.json()})
// .then((data)=> console.log(`Request succesful with JSON response ${data}`))
// .catch((error)=> console.log(error));


// //DELETE
// fetch((`https://jsonplaceholder.typicode.com/posts/${id}`),{
//     method: `DELETE`
// })
// .then((data) => console.log(`Response: ${data}`))
// .catch((error) => console.log(error));



// //PostData set class
// let postData2= (data) => {
//     let newCard = document.createElement('div');

//     newCard.setAttribute("class", "card");

//     //append newCard
// }