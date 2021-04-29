// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get started button
let info = [];
const addName = (ev)=>{
    ev.preventDefault();
    let name ={
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
    }

    info.push(name);
    document.forms[0].reset(); //clear the form for the next entry

    console.warn('added' , {info} );
    
}

document.addEventListener('domContentLoaded' ,()=>{
    document.getElementById('save').addEventListener('click' , addName);
});
