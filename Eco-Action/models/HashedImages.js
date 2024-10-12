const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (optional)
    required: true
  },
  file_path: {
    type: String,
    required: true
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  },
  image_hash: {
    type: String,
    required: true,
    unique: true // Ensure that the hash is unique
  },uploadCount: { type: Number, default: 0 }
});

// Create the Image model from the schema
const Imageh = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Imageh;
