import { model, models, Schema } from "mongoose";

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Check if model exists before creating
const Person = models?.Person || model("Person", PersonSchema);

export default Person;
