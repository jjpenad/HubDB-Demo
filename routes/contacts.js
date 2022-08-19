const express = require("express");
const router = express.Router();
const hubspot = require("@hubspot/api-client");
const db = require("../db/contacts");
const { createHubDBTableRowV3 } = require("../utils/HubDB");
const { validateContact } = require("../utils/schemaValidation");

const hubspotClient = new hubspot.Client({
  apiKey: process.env.HUBSPOT_API_KEY,
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let results = await db.getAllContacts();
    res.send(results);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let contact = await db.getContactByRowId(parseInt(req.params.id));
    res.send(contact);
  } catch (e) {
    return res
      .status(404)
      .send({ message: "The contact with the given id was not found." });
  }
});

router.post("/", async function (req, res, next) {
  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  let docId = req.body.documentId;
  let lastName = req.body.lastName;
  let firstName = req.body.firstName;

  try {
    let newContact = await db.createContact(docId, firstName, lastName);
    res.send(newContact);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

router.put("/:id", async function (req, res, next) {
  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  let contact = null;
  try {
    contact = await db.getContactByRowId(parseInt(req.params.id));
  } catch (e) {
    return res
      .status(404)
      .send({ message: "The contact with the given id was not found." });
  }

  try {
    let contactUpdated = await db.updateContactByRowId(
      parseInt(req.params.id),
      req.body.documentId,
      req.body.firstName,
      req.body.lastName
    );
    return res.send(contactUpdated);
  } catch (e) {
    return res.status(404).send({ message: e.message });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let contact = await db.getContactByRowId(parseInt(req.params.id));
  } catch (e) {
    return res
      .status(404)
      .send({ message: "The contact with the given id was not found." });
  }

  try {
    await db.deleteContactByRowId(parseInt(req.params.id));
    res.status(204).send();
  } catch (e) {
    return res.status(404).send({ message: e.message });
  }
});

module.exports = router;
