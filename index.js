"use strict";

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
    reviewDiv.setAttribute("reviewid",`${id}`);
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
    authorDiv.textContent = `By ${authorName}`;
    topDiv.appendChild(authorDiv);

    let editBtn = document.createElement("button");
    editBtn.setAttribute("class","col- editBtn btn btn-primary");
    editBtn.setAttribute("reviewid",`${id}`);
    editBtn.textContent = "Edit";
    topDiv.appendChild(editBtn);

    editBtnListener(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","col- deleteBtn btn btn-primary");
    deleteBtn.setAttribute("reviewid",`${id}`);
    deleteBtn.textContent = "Delete";
    topDiv.appendChild(deleteBtn);

    deleteBtnListener(deleteBtn);

    let bottomDiv = document.createElement("div");
    bottomDiv.setAttribute("class","row");
    reviewDiv.appendChild(bottomDiv);

    let bodyP = document.createElement("p");
    bodyP.setAttribute("class","col-sm body");
    bodyP.textContent = body;
    bottomDiv.appendChild(bodyP);
    
}




 let getReviewObj = (type) => {
    const typeUp = type.charAt(0).toUpperCase() + type.slice(1);
    const titleInp = document.getElementById(`title${typeUp}`).value;
    const authorInp = document.getElementById(`author${typeUp}`).value;
    const bodyInp = document.getElementById(`body${typeUp}`).value;

    let errorDiv = document.getElementById(`${type}Error`);
    errorDiv.textContent="";

    if(!titleInp || !authorInp || !bodyInp){
        let errorDiv = document.getElementById(`${type}Error`);
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
//REQUEST PROMISES
//////////////

//GET
fetch('http://localhost:8901/review/readAll')
.then((response) => {
    if(response.status !== 200){
        console.log(`error: ${response.status}`);
        return;
    }
    response.json()
    .then((data)=> {
        readReviewsMain(data);
    }).catch((error)=> {
        console.log(error);
    })
});

//POST
let uploadReview = (review) => {
    let check = true
    fetch(`http://localhost:8901/review/create`,{
        method: `POST`,
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(review)
    })
    .then((response)=> {
        if(response.status !== 201){
            console.log(`error: ${response.status}`);
            check = false;
        }
        response.json()})
    .then((data)=> {
        console.log(`Request successful.`)
        uploadIn(check, review);
})
    .catch((error)=> {
        console.log(error)
        uploadIn(false, review);
    });

}

//DELETE
let deleteReview = (id) => {
    let check = true;
    fetch((`http://localhost:8901/review/delete/${id}`),{
        method: `DELETE`
    }) 
    .then((response)=> {
        if(response.status !== 204){
            console.log(`error: ${response.status}`);
            check = false;
        }
        })
    .then((data) => {
        deleteIn(check);
    })
    .catch((error) => {
        console.log(error);
        deleteIn(false);
    });
}

//UPDATE (PUT)
let updateReview = (id,review) => {
    let check = true;
    fetch(`http://localhost:8901/review/update/${id}`,{
        method: `PUT`,
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify(review)
    })
    .then((response)=> {
        if(response.status !== 202){
            console.log(`status: ${response.status}`);
            check = false;
        }
        response.json()})
    .then((data)=> {
        console.log(`Request succesful`);
        editIn(check);
    })
    .catch((error)=> {
        console.log(error);
        editIn(false);
    });
}


//////////////
//MAIN METHODS
//////////////

//Upload
let uploadOut = () => {
    const reviewObj = getReviewObj("upload");
    if(reviewObj){
        uploadReview(reviewObj)
    }
}


let uploadIn = (response, reviewObj) => {
    if(response){
        setUploadMessage("Upload successful");
        setReview(reviewObj);
    } else {
        setUploadMessage("Error uploading");
    }
    $('#uploadForm').trigger("reset");
    $("#uploadModal").modal("hide");
    
}

//Read all
let readReviewsMain = (reviews) => {
    for (let d in reviews){
        const review = reviews[d];
        setReview(review);
    }    
}

//Delete
let deleteOut = () => {
    const deleteModal = document.getElementById("deleteModal");
    const id = deleteModal.getAttribute("userid");
    deleteReview(id);
}

let deleteIn = (response) => {
    console.log(response);
    if(response){   
         $("#deleteModal").modal("hide");
         location.reload();
    } else {
        let deleteError = document.getElementById("deleteError");
        deleteError.textContent = "Error deleting";
    }

}

let deleteModalOpen = (id) => {
    let deleteModal = document.getElementById("deleteModal");
    deleteModal.setAttribute("userid", `${id}`);
    $("#deleteModal").modal();
}


//Edit
let editOut = () => {
    const reviewObj = getReviewObj("edit");
    if(reviewObj){
        const editModal = document.getElementById("editModal");
        const id = editModal.getAttribute("userid");
        updateReview(id, reviewObj);
    }
}

let editIn = (response) => {
    if(response){
        location.reload();
    } else {
        let editError = document.getElementById("editError");
        editError.textContent="Error editing";
    }

    
}

let editModalOpen = (id) => {
    let editModal = document.getElementById("editModal");
    editModal.setAttribute("userid", `${id}`);

    let titleInput = document.getElementById("titleEdit");
    let authorInput = document.getElementById("authorEdit");
    let bodyInput = document.getElementById("bodyEdit");

    const reviewDiv = document.getElementById(`review${id}`);
    const titleOld = reviewDiv.querySelector(".title");
    const authorOld = reviewDiv.querySelector(".author");
    const bodyOld = reviewDiv.querySelector(".body");

    titleInput.value=titleOld.innerHTML;
    authorInput.value=authorOld.innerHTML;
    bodyInput.value=bodyOld.innerHTML;

    $("#editModal").modal();

}

//////////////
//LISTENERS
//////////////

//Upload
let uploadBtn = document.getElementById("uploadBtn");
uploadBtn.addEventListener("click", () => {
    uploadOut();
});

//Delete
let deleteBtnListener = (deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
    deleteModalOpen(deleteBtn.getAttribute("reviewid"));
    });
}


let confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
confirmDeleteBtn.addEventListener("click", () => {
    deleteOut();
});

//Edit
let editBtnListener = (editBtn) => {
    editBtn.addEventListener("click", () => {
    editModalOpen(editBtn.getAttribute("reviewid"));
    });
}


let confirmEditBtn = document.getElementById("confirmEditBtn");
confirmEditBtn.addEventListener("click", () => {

    editOut();
});