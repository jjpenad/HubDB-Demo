function createHubDBTableRowV3(values) {
  return {
    path: null,
    childTableId: "0",
    values,
  };
}

function contactToApi(dbContact) {
  return {
    id: dbContact.id,
    firstName: dbContact.name,
    lastName: dbContact.last_name,
    documentId: dbContact.document_id,
  };
}

module.exports = { createHubDBTableRowV3, contactToApi };
