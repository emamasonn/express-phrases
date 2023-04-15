const { response, request } = require("express");
const { query } = require("../database/config");

const getPhrases = (req, res = response) => {
  query("SELECT * FROM phrases WHERE deleted != true", (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      //const data = result.rows;
      res.json(result.rows);
    }
  });
};

const getPhraseById = (req, res = response) => {
  const id = parseInt(req.params.phrase_id);
  query(`SELECT * FROM phrases WHERE phrase_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.json(result.rows?.[0] || []);
    }
  });
};

const postPhrases = (req = request, res = response) => {
  const { phrase, translate, time, deleted } = req.body;
  const textQuery = `INSERT INTO phrases(phrase, translate, time, deleted) values('${phrase}', '${translate}', '${time}'::time, ${deleted})`;
  query(textQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.json({ phrase, translate, time });
    }
  });
};

const putPhrases = (req, res = response) => {
  const id = parseInt(req.params.phrase_id);
  const { phrase, translate, time } = req.body;
  const textQuery = `UPDATE phrases SET phrase = '${phrase}', translate = '${translate}', time = '${time}'::time WHERE phrase_id = ${id}`;
  query(textQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.json({ phrase, translate, time });
    }
  });
};

const deletePhrases = (req, res = response) => {
  const id = parseInt(req.params.phrase_id);
  const textQuery = `UPDATE phrases SET deleted = true WHERE phrase_id = ${id}`;
  query(textQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.json({ deleted: true });
    }
  });
};

module.exports = {
  getPhrases,
  postPhrases,
  putPhrases,
  deletePhrases,
  getPhraseById,
};
