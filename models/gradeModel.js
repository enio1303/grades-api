import mongoose from "mongoose";

/*
{
  "name": "Marco Tulio",
  "subject": "Historia",
  "type": "Trabalho Pratico",
  "value": "17.4",
  "lastModified": "2020-06-19T01:19:24.962Z"
}
*/
const gradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  value: {
    type: Number,
    required: [true, "Value is required"],
  },
  lastModified: {
    type: Date,
    required: [true, "Date is required"],
  },
});


const gradeModel = mongoose.model("grade", gradeSchema, "grades");

export { gradeModel };
