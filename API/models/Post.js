const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String,  },
  description: { type: String,  },
  places: { type: Number,  },
  level: { type: String,  },
  localisation: { type: String,  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  date: { type: Date },
//   begin: { type: Date, required: true },
//   end: { type: Date, required: true },
});

module.exports = mongoose.model('Post', PostSchema);