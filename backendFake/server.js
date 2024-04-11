const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

// fake data
let users = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com" },
    { id: 2, name: "Trần Thị B", email: "tranthib@example.com" },
    { id: 3, name: "Lê Văn C", email: "levanc@example.com" },
    { id: 4, name: "Phạm Thị D", email: "phamthid@example.com" },
    { id: 5, name: "Hoàng Văn E", email: "hoangvane@example.com" },
];

// Read
app.get("/users", (req, res) => {
    res.status(200).json({ EM: "Read SUCCESS", EC: 0, DT: users });
});

// create
app.post("/users", (req, res) => {
    const user = req.body;
    const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = { id: newId, ...user };
    users.push(newUser);

    res.status(201).json({ EM: "Create SUCCESS", EC: 0, DT: [] });
});

// update
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id == id);
    if (index >= 0) {
        const updatedUser = req.body;
        if (updatedUser.id && updatedUser.id != id) {
            res.status(400).json({
                EM: "User ID in the body must match ID in the URL.",
                EC: -1,
                DT: [],
            });
            return;
        }
        users[index] = { ...users[index], ...updatedUser };
        res.status(200).json({
            EM: "Update SUCCESS",
            EC: 0,
            DT: [users[index]],
        });
    } else {
        res.status(404).json({ EM: "User not found.", EC: -1, DT: [] });
    }
});

// delete
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const initialLength = users.length;
    users = users.filter((u) => u.id != id);
    if (users.length < initialLength) {
        res.status(200).json({ EM: "Delete SUCCESS", EC: 0, DT: [] });
    } else {
        res.status(404).json({ EM: "User not found.", EC: -1, DT: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
