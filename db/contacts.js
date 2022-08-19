const hubspot = require("@hubspot/api-client");
const { createHubDBTableRowV3, contactToApi } = require("../utils/HubDB");

const hubspotClient = new hubspot.Client({
  apiKey: process.env.HUBSPOT_API_KEY,
});

async function getContactByRowId(rowId) {
  const apiResponse =
    await hubspotClient.cms.hubdb.rowsApi.getDraftTableRowById(
      process.env.HUBSPOT_CONTACTS_TABLE,
      rowId
    );
  return contactToApi({ id: apiResponse.id, ...apiResponse.values });
}

async function getAllContacts() {
  const apiResponse = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(
    process.env.HUBSPOT_CONTACTS_TABLE
  );

  let results = apiResponse.results.map((element) => {
    return contactToApi({ id: element.id, ...element.values });
  });

  return results;
}

async function createContact(docId, firstName, lastName) {
  const row = createHubDBTableRowV3({
    name: firstName,
    last_name: lastName,
    document_id: docId,
  });
  const apiResponse = await hubspotClient.cms.hubdb.rowsApi.createTableRow(
    process.env.HUBSPOT_CONTACTS_TABLE,
    row
  );
  return contactToApi({ id: apiResponse.id, ...apiResponse.values });
}

async function updateContactByRowId(rowId, docId, firstName, lastName) {
  const row = createHubDBTableRowV3({
    name: firstName,
    last_name: lastName,
    document_id: docId,
  });
  const apiResponse = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(
    process.env.HUBSPOT_CONTACTS_TABLE,
    rowId,
    row
  );
  return contactToApi({ id: apiResponse.id, ...apiResponse.values });
}

async function deleteContactByRowId(rowId) {
  const apiResponse = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(
    process.env.HUBSPOT_CONTACTS_TABLE,
    rowId
  );
}

module.exports = {
  getContactByRowId,
  getAllContacts,
  createContact,
  updateContactByRowId,
  deleteContactByRowId,
};
