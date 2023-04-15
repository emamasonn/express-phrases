const { Router } = require("express");
const {
  getPhrases,
  postPhrases,
  putPhrases,
  deletePhrases,
  getPhraseById,
} = require("../controllers/phrases.controllers");

const router = Router();

router.get("/", getPhrases);

router.get("/:phrase_id", getPhraseById);

router.post("/", postPhrases);

router.put("/:phrase_id", putPhrases);

router.delete("/:phrase_id", deletePhrases);

module.exports = router;
