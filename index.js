"use strict";

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

//////////////
//GETTERS AND SETTERS
//////////////

let setReview = (review) => {

    const id = review.id;
    const authorName = review.authorName;
    const bookTitle = review.bookTitle;
    const body = review.body;

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




 let getReviewObj = () => {
    const titleInp = document.getElementById("titleInput").value;
    const authorInp = document.getElementById("authorInput").value;
    const bodyInp = document.getElementById("bodyInput").value;

    let errorDiv = document.getElementById("uploadError");
    errorDiv.textContent="";

    if(!titleInp || !authorInp || !bodyInp){
        let errorDiv = document.getElementById("uploadError");
        errorDiv.textContent="Fill all input boxes";
    } else {
        const reviewObj = {
            "bookTitle": titleInp,
            "authorName": authorInp,
            "body": bodyInp
        }

        return reviewObj;
    }
    return null;
}


let setUploadMessage = (message) => {
    let messageDiv = document.getElementById("successMsg");
    messageDiv.textContent=message;
}



//////////////
//REQUESTS
//////////////

//GET
fetch('http://localhost:8901/review/readAll')
.then((response) => {
    if(response.status !== 200){
        console.log(`status: ${response.status}`);
        return;
    }
    response.json()
    .then((data)=> {
        readReviewsMain(data);
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



let uploadReview = (review) => {

    fetch(`http://localhost:8901/review/create`,{
        method: `POST`,
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(review)
    })
    .then((response)=> {
        if(response.status !== 201){
            console.log(`status: ${response.status}`);
            return false;
        }
        response.json()})
    .then((data)=> {
        console.log(`Request successful. Response: ${data}`)
        return true;
})
    .catch((error)=> {
        console.log(error)
        return false;
    });

}

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


//////////////
//MAIN METHODS
//////////////

let uploadMain = () => {
    const reviewObj = getReviewObj();
    if (reviewObj){
        if(uploadReview(reviewObj)){
            setUploadMessage("Error uploading");
        } else {
            setUploadMessage("Upload successful");
            setReview(reviewObj);
        }
        $('#uploadForm').trigger("reset");
        $("#uploadModal").modal("hide");
    }

}

let readReviewsMain = (reviews) => {
    for (d in reviews){
        const review = reviews[d];
        setReview(review);
    }    
}

//////////////
//Listeners
//////////////

let uploadBtn = document.getElementById("uploadBtn");
uploadBtn.addEventListener("click", function (){
    uploadMain()});