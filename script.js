function showSection(sectionId) {
  const sectionIds = ["one_way", "round_trip", "multi_city"];
  sectionIds.forEach((id) => {
    document.getElementById(id).classList.toggle("hidden", id !== sectionId);
  });
}

function normalize(value) {
  return value.trim().toUpperCase();
}

function isFutureDate(dateText) {
  if (!dateText) return false;
  const inputDate = new Date(dateText + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate > today;
}

function validateDifferent(fromId, toId, labelId) {
  const from = normalize(document.getElementById(fromId).value);
  const to = normalize(document.getElementById(toId).value);
  const label = document.getElementById(labelId);

  if (from && to && from === to) {
    label.textContent = "Destination must be different from departure.";
  } else {
    label.textContent = "";
  }
}

function validateFutureDate(inputId, labelId) {
  const dateValue = document.getElementById(inputId).value;
  const label = document.getElementById(labelId);

  if (dateValue && !isFutureDate(dateValue)) {
    label.textContent = "Departure date must be from tomorrow onward.";
  } else {
    label.textContent = "";
  }
}

function validateReturnDate() {
  const returnDate = document.getElementById("txtReturnDate").value;
  const departDate = document.getElementById("txtDepartureDate2").value;
  const label = document.getElementById("lblReturnDate2");

  if (!returnDate || !departDate) {
    label.textContent = "";
    return;
  }

  const returnObj = new Date(returnDate + "T00:00:00");
  const departObj = new Date(departDate + "T00:00:00");

  if (returnObj <= departObj) {
    label.textContent = "Return date must be after departure date.";
  } else {
    label.textContent = "";
  }
}

function syncMultiCityFrom() {
  const from3 = document.getElementById("txtFrom3").value.trim();
  const from4 = document.getElementById("txtFrom4");
  if (!from4.value.trim()) {
    from4.value = from3;
  }
}

function validateMultiCitySecondDeparture() {
  validateFutureDate("txtDepartureDate4", "multiWayDept2");
}

document.getElementById("tripType").addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "oneway") showSection("one_way");
  else if (value === "roundtrip") showSection("round_trip");
  else if (value === "multicity") showSection("multi_city");
  else showSection("none");
});

document.getElementById("txtTo1").addEventListener("input", () => validateDifferent("txtFrom1", "txtTo1", "lbloneWay"));
document.getElementById("txtFrom1").addEventListener("input", () => validateDifferent("txtFrom1", "txtTo1", "lbloneWay"));
document.getElementById("txtDepartureDate1").addEventListener("input", () => validateFutureDate("txtDepartureDate1", "deptOneLbl"));

document.getElementById("txtTo2").addEventListener("input", () => validateDifferent("txtFrom2", "txtTo2", "lbltwoWay"));
document.getElementById("txtFrom2").addEventListener("input", () => validateDifferent("txtFrom2", "txtTo2", "lbltwoWay"));
document.getElementById("txtDepartureDate2").addEventListener("input", () => {
  validateFutureDate("txtDepartureDate2", "lblDepartDate2");
  validateReturnDate();
});
document.getElementById("txtReturnDate").addEventListener("input", validateReturnDate);

document.getElementById("txtTo3").addEventListener("input", () => validateDifferent("txtFrom3", "txtTo3", "multiWay1"));
document.getElementById("txtFrom3").addEventListener("input", () => {
  validateDifferent("txtFrom3", "txtTo3", "multiWay1");
  syncMultiCityFrom();
});
document.getElementById("txtDepartureDate3").addEventListener("input", () => validateFutureDate("txtDepartureDate3", "multiWayDept1"));

document.getElementById("txtTo4").addEventListener("input", () => validateDifferent("txtFrom4", "txtTo4", "multiWay2"));
document.getElementById("txtFrom4").addEventListener("input", () => validateDifferent("txtFrom4", "txtTo4", "multiWay2"));
document.getElementById("txtDepartureDate4").addEventListener("input", validateMultiCitySecondDeparture);

document.getElementById("addFlightBtn").addEventListener("click", () => {
  const tripType = document.getElementById("tripType").value;

  if (tripType !== "multicity") {
    alert("Switch to Multi-city to add more flights.");
    return;
  }

  const container = document.getElementById("multi_city");

  const blocks = container.querySelectorAll(".block");
  const lastBlock = blocks[blocks.length - 1];
  const newBlock = lastBlock.cloneNode(true);

  // clear inputs
  newBlock.querySelectorAll("input").forEach(input => input.value = "");
  newBlock.querySelectorAll(".error").forEach(span => span.textContent = "");

  container.appendChild(newBlock);
});
