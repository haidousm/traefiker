import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("hi");
});

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
