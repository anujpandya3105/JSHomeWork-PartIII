// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#dt");
var $cityInput = document.querySelector("#cty");
var $stateInput = document.querySelector("#sta");
var $countryInput = document.querySelector("#cntry");
var $shapeInput = document.querySelector("#shp");

var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredData to Data initially
var filteredData = dataSet;


// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    // Get get the current address object and its fields
    var dataset = filteredData[i];
    var fields = Object.keys(dataset);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = dataset[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim();
  var filterCity = $cityInput.value.trim();
  var filterState = $stateInput.value.trim();
  var filterCountry = $countryInput.value.trim();
  var filterShape = $shapeInput.value.trim();
  
  // Set filteredDate to an array of all addresses whose "date" matches the filter

  filteredData = dataSet.filter(function(data) {
    var datadate = data.datetime;
    var datacity = data.city;
    var datastate = data.state;
    var datacountry = data.country;
    var datashape = data.shape;

    if (filterDate.length > 0 &&
      filterCity.length == 0 &&
      filterState.length == 0 &&
      filterCountry.length == 0 && 
      filterShape.length == 0) {
         return (datadate === filterDate); 
    }

    if (filterDate.length == 0 &&
      filterCity.length > 0 &&
      filterState.length == 0 &&
      filterCountry.length == 0 && 
      filterShape.length == 0) {
         return (datacity === filterCity); 
    }

    if (filterDate.length == 0 &&
      filterCity.length == 0 &&
      filterState.length > 0 &&
      filterCountry.length == 0 && 
      filterShape.length == 0) {
         return (datastate === filterState); 
    }

    if (filterDate.length == 0 &&
      filterCity.length == 0 &&
      filterState.length == 0 &&
      filterCountry.length > 0 && 
      filterShape.length == 0) {
         return (datacountry === filterCountry); 
    }

    if (filterDate.length == 0 &&
      filterCity.length == 0 &&
      filterState.length == 0 &&
      filterCountry.length == 0 && 
      filterShape.length > 0) {
         return (datashape === filterShape); 
    }

    if (filterDate.length > 0 &&
       filterCity.length > 0 &&
       filterState.length > 0 &&
       filterCountry.length > 0 && 
       filterShape.length > 0) {
          return (datadate === filterDate && 
                  datacity === filterCity &&
                  datastate === filterState &&
                  datacountry === filterCountry &&
                  datashape === filterShape);
    }

    // If true, add the data to the filteredData, otherwise don't add it to filteredData
    //if (filterDate.length > 0 && filterCity.length > 0 ) {
    //    return (datadate === filterDate && datacity === filterCity);
    //}
  });
  renderTable();
}

// Render the table for the first time on page load


renderTable();
$(document).ready(function() {
	$('#sheepletable').DataTable();
} );