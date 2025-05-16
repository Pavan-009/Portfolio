import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    projectLink: {
      type: String,
      required: [true, 'Project link is required'],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: 'At least one image URL is required',
      },
    },
    videos: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: 'At least one technology is required',
      },
    },
    date: {
      type: Date,
      required: [true, 'Project date is required'],
      default: Date.now,
    },
    categories: {
      type: [String],
      required: [true, 'At least one category is required'],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: 'At least one category is required',
      },
    },
    priority: {
      type: Number,
      default: 0,
    },
    liveDemo: {
      type: String,
      default: '',
    },
    sourceCode: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);