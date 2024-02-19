let inputs = document.querySelectorAll(".input");

let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let tableBody = document.getElementById("tableBody");
let addBtn = document.querySelector("[type=submit]");
let searchInput = document.querySelectorAll("#search");
let updateBtn = document.querySelector(".update");

let ProductsArr = [];

/*==================== Display Products From LocalStorage (Get Item) =========================== */
if (localStorage.getItem("myProducts") !== null) {
  ProductsArr = JSON.parse(localStorage.getItem("myProducts"));
  displayProduct(ProductsArr);
}
/*==================== Button Add =========================== */
addBtn.addEventListener("click", function () {
  if (
    productName.value != "" &&
    productPrice.value != "" &&
    productCategory.value != ""
  ) {
    addProduct();
    reset();

    saveLocalStorage();
    displayProduct(ProductsArr);
  }
});

/*==================== Add Product =========================== */
function addProduct() {
  let data = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };

  ProductsArr.push(data);
}

/*==================== Reset Inputs =========================== */

function reset() {
  inputs.forEach(function (ele) {
    ele.value = "";
  });
}

/*==================== Display Products =========================== */

function displayProduct(productList) {
  let box = "";
  count = 0;
  for (let i = 0; i < productList.length; i++) {
    count++;
    box += `
          <tr">
            <td>${count}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].desc}</td>
            <td><button onclick = "getInfo(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick = "deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
          </tr>
    `;
  }

  tableBody.innerHTML = box;
}

/*==================== Search For Products =========================== */
searchInput.forEach(function (ele) {
  ele.addEventListener("input", function () {
    searchProducts(this.value);
  });
});
// searchInput.addEventListener("input", function () {

// });

function searchProducts(searchTerm) {
  resultSearch = [];

  for (i = 0; i < ProductsArr.length; i++) {
    if (ProductsArr[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      resultSearch.push(ProductsArr[i]);
    } else if (ProductsArr[i].category.toLowerCase().includes(searchTerm.toLowerCase())) {
      resultSearch.push(ProductsArr[i]);

    }
  }
  displayProduct(resultSearch);
}



/*==================== Delete Products =========================== */
function deleteProduct(deleteIndex) {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      // Delete Product
      ProductsArr.splice(deleteIndex, 1);
      saveLocalStorage();
      displayProduct(ProductsArr);
    }
  });

}

/*==================== Update Products =========================== */

/*=====get Info======*/
let currentIndex = 0;
function getInfo(updateIndex) {

  currentIndex = updateIndex;
  productName.value = ProductsArr[updateIndex].name;
  productPrice.value = ProductsArr[updateIndex].price;
  productCategory.value = ProductsArr[updateIndex].category;
  productDesc.value = ProductsArr[updateIndex].desc;

  updateBtn.style.display = "block";
  addBtn.style.display = "none";

}

/*=====Update Product======*/
updateBtn.addEventListener("click", function () {
  if (
    productName.value != "" &&
    productPrice.value != "" &&
    productCategory.value != ""
  ) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your products has been updated",
      showConfirmButton: false,
      timer: 2000
    });

    updateProduct();
  }


});

function updateProduct() {

  let data = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };

  ProductsArr[currentIndex] = data;
  saveLocalStorage();
  displayProduct(ProductsArr);
  addBtn.style.display = "block";
  updateBtn.style.display = "none";
  reset();
}


/*==================== Save To Local storage =========================== */

function saveLocalStorage() {
  localStorage.setItem("myProducts", JSON.stringify(ProductsArr));
}


/*==================== Keyboard Event =========================== */

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {

    if (
      productName.value != "" &&
      productPrice.value != "" &&
      productCategory.value != ""
    ) {

      displayProduct(ProductsArr);
      updateProduct();
    }
  }




});


/***********************  Dark Mode ****************************** */
let dark = document.querySelector(".container i");

let light = document.querySelector(".container svg");

let table = document.querySelector(".table")

let container = document.querySelector(".container");


/*===================== Dark=========================*/ 
dark.addEventListener("click", function () {
  dark.style.display = "none";
  light.style.cssText = `
  display : block;
  color : #fab005;
  transition : 1s ;
  `;
  document.body.style.cssText = `
  background-color : #183153 ;
  color : white ;
  `;
  container.style.cssText = `
   background-color : #183153 ;
  `;

  inputs.forEach((ele) => {
    ele.style.cssText = `
    background-color : #081c39 ;
    color : white ;
    `;
  });

  searchInput.forEach((ele) => {
    ele.style.cssText = `
    background-color : #081c39 ;
    color : white ;
    `;
  });

  tableBody.style.cssText = `
   background-color : #081c39 ;
    color : white ;
  `;
  table.style.color = "white"
});

/*===================== Light=========================*/

light.addEventListener("click", function () {
  light.style.display = "none";
  dark.style.cssText = `
  display : block;
  `;
  document.body.style.cssText = `
  background-color : #ffffff ;
  color : black ;
  `;
  container.style.cssText = `
   background-color : #eee ;
  `;

  inputs.forEach((ele) => {
    ele.style.cssText = `
    background-color : #ffffff ;
    color : black ;
    `;
  });

  searchInput.forEach((ele) => {
    ele.style.cssText = `
    background-color : #fff ;
    color : black ;
    `;
  });

  tableBody.style.cssText = `
   background-color : #fff ;
    color : black ;
  `;
  table.style.color = "black";
});





// #081c39;

