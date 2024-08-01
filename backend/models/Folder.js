const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
