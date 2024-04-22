const navButton = document.getElementById("smallnav");
const nav = document.getElementById("nav");
const addproduct = document.getElementById("addproduct");

const smallnav = () => {
  nav.classList.toggle("active");
}

navButton.onclick = smallnav;
addproduct.onclick = () => {
  let id01 = document.getElementById('id01');
  id01.style.display = "block";
  console.log("working");
}


//JSON CODE BELOW
const getJson = async() => {
  const url = "https://projectpart7-7sap.onrender.com/api";

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
} 

const addProduct = async (e) => {
  e.preventDefault();
  const form = document.getElementById("addProductForm");
  const formData = new FormData(form);
  let infoArray = getInfo();
  formData.append("info", JSON.stringify(infoArray));

  let response;

  response = await fetch("/api", {
    method: "POST",
    body: formData,
  });


  if(response.status != 200) {
    console.log("Error contacting server");
    return;
  }

  console.log(...formData);

  let products = await getJson();
  displayProducts(products[products.length]);
};



const getInfo = () => {
  const title = document.getElementById("productName").value;
  const seller = document.getElementById("seller").value;
  const desc = document.getElementById("summary").value;
  
  const info = [title, seller, desc]; // Assign the array directly
  return info;
}


const showProducts = async() => {
  let products = await getJson();

  products.forEach((item) => {
    displayProducts(item);
  })
}

/* <a class="product-item" href="itempage.html">
        <section class="item-list flex">
            <img width="200px" height="200px" src="image/Junghans.webp" alt="">
            <div>
              <h2>Junghans Max Bill</h2>
              <p>
                The Bauhaus is a German artistic movement which lasted from 1919-1933. Its goal was to merge all artistic mediums into one unified approach, that of combining an individual's artistry with mass production and function. Bauhaus design is often abstract, angular, and geometric, with little ornamentation.              <br>
                <small>Image from <a href="https://www.architectgiftsplus.com/products/junghans-automatic-27-watch-3501-04-silver-black?utm_source=googleshopping&utm_medium=cse&gad_source=1&gclid=CjwKCAiA2pyuBhBKEiwApLaIO5_NZyPVSkVbcWA6lAjqNZG_5KFHWqkWmNJOGKSEjVnbsa1ogj5oahoCuEIQAvD_BwE">here</a></small>
              </p>
            </div>
        </section>
      </a> */

const displayProducts = (item) => {
  const productpage = document.getElementById("productmain");

  const proLink = document.createElement("a");
  proLink.href = "itempage.html";
  proLink.classList = "product-item";

  const proSection = document.createElement("section");
  proSection.classList = "item-list flex";

  const proImg = document.createElement("img");
  proImg.style.height = "200px";
  proImg.style.width = "200px";
  proImg.src = item.img_name;

  const proDiv = document.createElement("div");

  const proH2 = document.createElement("h2");
  proH2.innerHTML = item.info[0];

  const proP = document.createElement("p");
  proP.innerHTML = item.info[2];

  proDiv.append(proH2);
  proDiv.append(proP);

  proSection.append(proImg);
  proSection.append(proDiv);

  proLink.append(proSection);

  productpage.append(proLink);
}
      
showProducts();

window.onload = () => {
  document.getElementById("addProductForm").onsubmit = addProduct;
}