const express = require('express');
const { query, validationResult } = require('express-validator/check');

const app = express();
const port = process.env.port || 6363;

const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

app.get('/', (req, res) => {
    res.send({ 'status': 'SUCCESS' })
});

app.get('/columnIndex', [
    query('column_str').exists()
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    let column_index = 0;
    for(let i = 0; i < req.query.column_str.length; i++) {
        const char_index = chars.indexOf(req.query.column_str[i]) + 1;
        column_index += (Math.pow(26, (req.query.column_str.length - i - 1)) * char_index);
    }
    res.send({ 'status': 'SUCCESS', 'column_index': column_index})
})

app.listen(port, () => { console.log(`Listening on port ${port}..`); })