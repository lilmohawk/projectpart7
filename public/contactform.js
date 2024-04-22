//Contact form JavaScript

{/* <ol>
  <li>First Name</li>
  <li>Lst Name</li>
  <li>Email</li>
</ol> */}

const orderedList = document.createElement("ol");

const contactformAction = (e) => {
  e.preventDefault();
  const contactForm = document.getElementById("contactForm");

  const fName = contactForm.elements["name"].value;
  console.log(fName);
  
}

document.getElementById("contactForm").onsubmit = contactformAction;