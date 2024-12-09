var submitbtn = document.getElementById('submitbutton')
var nameinput = document.getElementById('bookname')
var urlinput = document.getElementById('bookurl')

var allsites = []
//To check whether he is a new user or not
if (JSON.parse(localStorage.getItem("array"))) {
    allsites = JSON.parse(localStorage.getItem("array"))
    display()
}


submitbtn.addEventListener("click", function () {

    if(validation(nameinput)==true && validation(urlinput)==true){
    addSite()
    display()
    clearForm()
    }
    else
    {
        Swal.fire({
            icon: "error",
            title: "Invalid...",
            text: "Try another site name or url!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
})



function addSite() {
    var siteObject = {
        bookname: nameinput.value,
        urlbook: urlinput.value,
    }
    //to store the new objects in the array
    allsites.push(siteObject)
    //local storage to store and change it from array to string
    localStorage.setItem("array", JSON.stringify(allsites))
}



  
//to clear the form automatically after adding 
function clearForm() {
    nameinput.value = null
    urlinput.value = null
}



function display() {
    var cartona = ``;
    for (var i = 0; i < allsites.length; i++) {
        cartona += `
        <tr>
            <td class="py-3">${i + 1}</td>
            <td>${allsites[i].bookname}</td>
            <td>
                <button onclick="visit(${i})" class="btn btn-success">visit</button>
            </td>
            <td> <button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button></td> 
            </tr> `

    }
    document.getElementById("My-rows").innerHTML = cartona
}




function deleteItem(i){
    allsites.splice(i,1)
    localStorage.setItem("array", JSON.stringify(allsites))
    display()
}



function visit(i){
    window.open(allsites[i].urlbook)           // go to the site in new tab
}



nameinput.addEventListener("input",function(){
    validation(this)
})
urlinput.addEventListener("input",function(){
    validation(this)
})



function validation(input){
    var validobj =          //object contains 2 inputs regex
    {
        bookname:/^[a-z A-Z]{3,20}$/  ,
        bookurl:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    if (validobj[input.id].test(input.value)){
        input.classList.add("is-valid")
        input.classList.remove("is-invalid")
        return true

    }
    else
    {
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")
        return false
    }
}
