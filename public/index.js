let contactosTBody = document.getElementById("listaContactosTableBody");
let contactsForm = document.getElementById("contactsForm");
let updateContactsForm = document.getElementById("updateContactsForm");

function getTrashLogoTxt() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
`;
}

async function getContacts(url = "") {
  let resp = await fetch("http://localhost:5000/api/contacts");
  return resp.json();
}

async function createContact(data) {
  let resp = await fetch("http://localhost:5000/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return resp.json();
}

async function updateContact(id, data) {
  let resp = await fetch("http://localhost:5000/api/contacts/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return resp.json();
}

async function deleteContact(id) {
  let resp = await fetch("http://localhost:5000/api/contacts/" + id, {
    method: "DELETE",
  });
  return resp;
}

function getTableRow(
  number = "",
  rowId = "",
  documentId = "",
  firstName = "",
  lastName = ""
) {
  return (
    "<tr><th scope='row'>" +
    number +
    "</th>" +
    "<td>" +
    rowId +
    "</td>" +
    "<td>" +
    documentId +
    "</td>" +
    "<td>" +
    firstName +
    "</td>" +
    "<td>" +
    lastName +
    "</td>" +
    "<td><button type='button' class='btn btn-outline-danger deleteContactButton'>" +
    getTrashLogoTxt() +
    "</button></td>" +
    "</tr>"
  );
}

function loadDeleteListeners() {
  let deleteButtons = document.getElementsByClassName("deleteContactButton");
  for (let button of deleteButtons) {
    button.addEventListener("click", async (event) => {
      let row = event.currentTarget.parentElement.parentElement;
      let rowId = row.children[1].innerHTML;
      await deleteContact(rowId);
      location.reload();
    });
  }
}

getContacts()
  .then((data) => {
    let rowsHTML = data.reduce((prev, current, index) => {
      prev += getTableRow(
        index,
        current.id,
        current.documentId,
        current.firstName,
        current.lastName
      );
      return prev;
    }, "");
    contactosTBody.innerHTML = rowsHTML;
  })
  .then(() => {
    loadDeleteListeners();
  });

contactsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formElements = contactsForm.elements;
  let documentId = formElements["documentId"].value;
  let firstName = formElements["firstName"].value;
  let lastName = formElements["lastName"].value;
  createContact({ documentId, firstName, lastName }).then((data) => {
    console.log(data);
    location.reload();
  });
});

//updateContactsForm

updateContactsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formElements = updateContactsForm.elements;
  let rowId = formElements["rowId"].value;
  let documentId = formElements["documentId"].value;
  let firstName = formElements["firstName"].value;
  let lastName = formElements["lastName"].value;
  updateContact(rowId, { documentId, firstName, lastName }).then((data) => {
    console.log(data);
    location.reload();
  });
});
