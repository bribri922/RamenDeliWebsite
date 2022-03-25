let ramenItemsData = new Localbase("Ramen Items Data"); // database

let btnNewItem = document.getElementById("btn-new-item");
let btnCloseModal = document.getElementById("btn-close-modal");
let btnClearInputField = document.getElementById("btn-clear-inputField"); //prettier-ignore
let inItemName = document.getElementById("inItemName");
let inItemDescription = document.getElementById("inItemDescription");
let inItemImageUrl = document.getElementById("inItemImageUrl");
let modalOfItems = document.getElementById("modalOfItem");

let inQtyItemField;

btnNewItem.addEventListener("click", AddItem);
btnCloseModal.addEventListener("click", ClearInputField);
btnClearInputField.addEventListener("click", ClearInputField);

inItemName.addEventListener("keydown", CheckFieldsIfValid);
inItemDescription.addEventListener("keydown", CheckFieldsIfValid);
inItemImageUrl.addEventListener("keydown", CheckFieldsIfValid);

inItemName.addEventListener("keyup", CheckFieldsIfValid);
inItemDescription.addEventListener("keyup", CheckFieldsIfValid);
inItemImageUrl.addEventListener("keypup", CheckFieldsIfValid);

inItemName.addEventListener("change", CheckFieldsIfValid);
inItemDescription.addEventListener("change", CheckFieldsIfValid);
inItemImageUrl.addEventListener("change", CheckFieldsIfValid);

//run this function
DisplayRamenItems();

//ramenItemsData.collection("Homemade Shoyu Ramen Sales").delete();

//prettier-ignore
async function AddItem() {
      let inItemName = document.getElementById("inItemName");
      let inItemDescription = document.getElementById("inItemDescription");
      let inItemImageUrl = document.getElementById("inItemImageUrl");
      //Runs this function and returns true or false
      if(CheckFieldsIfValid()){
        let itemId;
        let listOfItems = await ramenItemsData.collection("RamenItemsData").get();//gets data from this RamenItemsData Collection

        itemId = listOfItems.length + 1;//sets item id to the length of listOfItems Variable add by 1

        //add data in this collection
        await ramenItemsData.collection("RamenItemsData").add({
          itemId: `item_no_${itemId}`,
          itemName: inItemName.value,
          itemDescription: inItemDescription.value,
          itemImageUrl: inItemImageUrl.value
        })

        ClearInputField();
        alert("Item Recorded! \nReload the browser to see changes!");
      }
      else{
        alert("Please fill in all fields");
      }
    }

//prettier-ignore
//this functions to check the input field item name, item description, item image url in the adding item modal
function CheckFieldsIfValid() {
      let itemNameValidity = false;
      let itemDescriptionValidity = false;
      let itemImageUrlValidity = false;

      //checks if the value in the input field item name is greater than or equal to 4.
      if (inItemName.value.length >= 10) {
        document.getElementById("itemName-check-or-x").className = "bi bi-check text-success fs-3";// if condition is true then the x icon beside this input field will change into a check icon
        itemNameValidity = true;//set this variable to true
      } else {
        document.getElementById("itemName-check-or-x").className = "bi bi-x text-danger fs-3";// if false set the icon back to x
        itemNameValidity = false;
      }

      //checks if the value in the input field item description is greater than or equal to 10.
      if(inItemDescription.value.length >= 10){
        document.getElementById("itemDescription-check-or-x").className = "bi bi-check text-success fs-3";// if condition is true then the x icon beside this input field will change into a check icon
        itemDescriptionValidity = true;// sets this variable to true;
      }
      else{
        document.getElementById("itemDescription-check-or-x").className = "bi bi-x text-danger fs-3";// if false set the icon back to x
        itemDescriptionValidity = false;// sets this variable to false;
      }

      //checks if the value in the input field item description is greater than or equal to 20.
      if(inItemImageUrl.value.length >= 20){
        document.getElementById("itemImageUrl-check-or-x").className = "bi bi-check text-success fs-3";// if condition is true then the x icon beside this input field will change into a check icon
        itemImageUrlValidity = true// sets this variable to true
      }
      else{
        document.getElementById("itemImageUrl-check-or-x").className = "bi bi-x text-danger fs-3";// if false set the icon back to x
        itemImageUrlValidity = false;// sets this variable to false
      }

      //this checks if all this variables are true then execute the code in this condition
      if(itemNameValidity && itemDescriptionValidity && itemImageUrlValidity){
        return true;
      }
      else{
        return false;
      }
    }

//It will just clear all the values of the input fields in the adding modal item.
function ClearInputField() {
  let inItemName = document.getElementById("inItemName");
  let inItemDescription = document.getElementById("inItemDescription");
  let inItemImageUrl = document.getElementById("inItemImageUrl");

  inItemName.value = null;
  inItemDescription.value = null;
  inItemImageUrl.value = null;

  CheckFieldsIfValid();
}

//prettier-ignore
//this function will display all the sales of a specific ramen you choose in a table
async function DisplaySalesOfRamenItem_1(thisRamenTbody, collectionName) {
      //replace the tbody into a new one so that the existing will be delete and will avoid duplicates
      let ramenTbody = document.getElementById(`${thisRamenTbody} Sales Data`);
      let newTbody = document.createElement("tbody");
      newTbody.id = `${thisRamenTbody} Sales Data`;
      ramenTbody.replaceWith(newTbody);

      let sales = await ramenItemsData.collection(`${collectionName} Sales`).get();

      //insert row and cell for sales of the ramen
      for (items of sales) {
        let newRow = newTbody.insertRow();
        let newCell = newRow.insertCell();
        newCell.innerText = `${items.salesId}`;

        newCell = newRow.insertCell();
        newCell.innerText = `${items.salesDateTime}`;

        newCell = newRow.insertCell();
        newCell.innerText = `${items.salesQty}`;

        console.log(items);
      }
    }

//this functions to check if current time is in am or pm
function GetTimeAMPM(curTime) {
  const time = parseInt(curTime);
  if (time > 11) {
    const newTimeFormat = time - 12;
    return [newTimeFormat, "PM"];
  } else {
    return [time, "AM"];
  }
}

//this function converts the month in number format to a word format
function ConvertMonthToWords(monthINum) {
  if (monthINum == "01") {
    return "Jan";
  } else if (monthINum == "02") {
    return "Feb";
  } else if (monthINum == "03") {
    return "Mar";
  } else if (monthINum == "04") {
    return "Apr";
  } else if (monthINum == "05") {
    return "May";
  } else if (monthINum == "06") {
    return "Jun";
  } else if (monthINum == "07") {
    return "Jul";
  } else if (monthINum == "08") {
    return "Aug";
  } else if (monthINum == "09") {
    return "Sep";
  } else if (monthINum == "10") {
    return "Oct";
  } else if (monthINum == "11") {
    return "Nov";
  } else if (monthINum == "12") {
    return "Dec";
  } else {
    return "no month";
  }
}

//This function add sales in a specific db
async function AddSales(storageName) {
  let dateTimeSalesAdded;
  let qty;
  const request = "http://worldtimeapi.org/api/timezone/asia/singapore"; //prettier-ignore this is the api

  let salesCount;
  let sales = await ramenItemsData.collection(`${storageName}`).get() //prettier-ignore

  salesCount = sales.length + 1;

  //prettier-ignore
  await fetch(request).then((response) => {
        let converted = response.json().then((data) => {
          dateTimeSalesAdded = `${ConvertMonthToWords(data["datetime"].substring(5, 7))}-${data["datetime"].substring(8,10)}-${data["datetime"].substring(0,4)} ${GetTimeAMPM(data["datetime"].substring(11, 13))[0]}${data["datetime"].substring(13,16)} ${GetTimeAMPM(data["datetime"].substring(11, 13))[1]}`; //prettier-ignore

          try {
            qty = inQtyItemField.value;
            if(qty > 0){
              ramenItemsData.collection(`${storageName}`).add({
                salesId: salesCount,
                salesDateTime: dateTimeSalesAdded,
                salesQty: qty,
              });
              alert("Sales successfully added!");
              ClearInQtyVal();
              location.reload();
            }else{
              alert("Quantity should be greater than 0!");
            }
          } catch (error) {
            alert("Quantity should be greater than 0!");
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
}

//this function clears qty value of a specific ramen
function ClearInQtyVal() {
  try {
    let qty = inQtyItemField.value;
    inQtyItemField.value = 0;
  } catch (err) {}
}

//prettier-ignore
//this function decrease the value in the input field qty of a specific ramen
function DecreaseQty(inputField) {
      inQtyItemField = document.getElementById(inputField.parentNode.childNodes[3].id);//gets a more specific element.

      if (inQtyItemField.value <= 0) {
        inQtyItemField.value = 0;
      } else {
        inQtyItemField.value--;
      }
    }

//prettier-ignore
//this function increase the value in the input field qty of a specific ramen
function IncreaseQty(inputField) {
      inQtyItemField = document.getElementById(inputField.parentNode.childNodes[3].id);//gets a more specific element.

      if (inQtyItemField.value >= 100) {
        inQtyItemField.value = 100;
      } else {
        inQtyItemField.value++;
      }
    }

//displays item in the RamenDataItems collection in cards
async function DisplayRamenItems() {
  let contentsDisplay = document.getElementById("contentsDisplay"); //prettier-ignore
  let ramenItems = await ramenItemsData.collection("RamenItemsData").get();

  //this execute to count the total quantity of sales of a specific ramen
  for (item of ramenItems) {
    let countSales = await ramenItemsData.collection(`${item.itemName} Sales`).get(); //prettier-ignore
    let count = 0;

    for (salesQtyCount of countSales) {
      count += parseInt(salesQtyCount.salesQty);
    }
    //creates the card for each item
    contentsDisplay.innerHTML += `<div class="col-md-4 my-5">
          <div class="card mx-auto text-center text-white bg-dark" style="width: 20rem; border: #DAAF7F solid">
            <button id="${item.itemName}" type="button" class="card-img-overlay bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#${item.itemId}" onclick="DisplaySalesOfRamenItem_1(this.id,this.id)"></button>
            <img src="${item.itemImageUrl}" class="card-img-top" style="height: 350px;" alt="A ramen picture">
            <div class="card-body overflow-hidden" style="height: 10rem">
              <h5 class="card-title font-ribeye fw-bolder fs-6 text-white">${item.itemName}</h5>
                <p class="card-text fs-7">${item.itemDescription}</p>
              </div>
              <div class="card-footer bg-dark border-0 text-end">
                <i class="bi bi-basket2-fill"></i>
                <span id="${item.itemName} Sales Count" class="fs-6 fw-bold">${count}</span>
              </div>
            </div>
          </div>
        </button>`;

    //creates a modal for each card(card is a button)
    modalOfItems.innerHTML += `
          <section>
            <div class="modal fade" id="${item.itemId}" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-fullscreen ">
                <div class="modal-content bg-custom-3">
                  <div class="modal-header text-start border-0">
                    <button type="button" class="bg-dark d-inline-flex p-0 bg-transparent border-0" data-bs-dismiss="modal" onclick="ClearInQtyVal()">
                      <i class="bi bi-arrow-left fs-2 text-danger d-inline-flex p-0"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="card bg-dark text-white mx-auto d-flex" style="width: 75%" >
                          <img src="${item.itemImageUrl}" class="card-img" style="height: 45rem" alt="A ramen picture">
                          <div class="card-img-overlay">
                            <div class="row h-100">
                              <div class="col align-self-end text-end">
                                <span class="badge bg-dark py-2">
                                  <span class="badge bg-secondary text-light">
                                    <i class="bi bi-basket2-fill fs-3 px-1"></i>
                                    <span class="fs-3 fw-bold px-1">${count}</span>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col text-md-start text-center font-ribeye font-border-effect-1 py-md-0 pt-5">
                            <h1>${item.itemName}</h1>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col text-md-start text-center">
                            <span class="text-dark font-ribeye fs-6">${item.itemDescription}</span>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-2 col-6 text-md-start text-end py-3">
                            <div class="btn-group p-0" role="group">
                              <button id="btn-qty-deduct" type="button" class="btn btn-danger p-0" style="height:1.2em" onclick="DecreaseQty(this)">
                                <i class="bi bi-dash d-inline-flex"></i>
                              </button>
                              <input id="inQtyItemField_${item.itemId}" type="text" class="text-center form-control" style="width:3em; height:1.2em" value="0" disabled>
                              <button id="btn-qty-add" type="button" class="btn btn-success p-0" style="height:1.2em" onclick="IncreaseQty(this)">
                                <i class="bi bi-plus d-inline-flex"></i>
                              </button>
                            </div>
                          </div>
                          <div class="col-md-10 col-6 text-md-start text-start py-3 ">
                            <button id="${item.itemName} Sales" type="button" class="btn btn-dark btn-sm font-ribeye text-white fs-7" onclick="AddSales(this.id)">Add Sales Count</button>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <table class="text-center w-75 m-md-0 m-auto">
                              <thead>
                                <tr>
                                  <th style="width: 5%">#</th>
                                  <th style="width: 80%">Data/Time</th>
                                  <th style="width: 15%">Qty</th>
                                </tr>
                              </thead>
                              <tbody id="${item.itemName} Sales Data"></tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>`;
  }

  contentsDisplay.innerHTML += `<div class="col-md-4 my-5 text-center align-self-center">
        <button type="button" class="btn btn-dark text-white p-0" style="border: #DAAF7F solid" data-bs-toggle="modal" data-bs-target="#addingItemsModal">
          <i class="bi bi-plus fs-1 d-flex"></i>
        </button>
      </div>`;
}
