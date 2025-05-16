import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Icon name is required'],
      trim: true,
    },
    items: {
      type: [String],
      required: [true, 'At least one skill item is required'],
      validate: {
        validator: function(arr) {
          return arr.length > 0;
        },
        message: 'At least one skill item is required',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', SkillSchema);