import express from 'express';
import Skill from '../models/Skill.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort('category');
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/skills
// @desc    Create a skill category
// @access  Private/Admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const { category, icon, items } = req.body;

    // Validate required fields
    if (!category || !icon || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        msg: 'Please provide category, icon, and at least one skill item' 
      });
    }

    const newSkill = new Skill({
      category,
      icon,
      items,
    });

    const skill = await newSkill.save();
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update a skill category
// @access  Private/Admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { category, icon, items } = req.body;

    // Validate required fields
    if (!category || !icon || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        msg: 'Please provide category, icon, and at least one skill item' 
      });
    }

    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: { category, icon, items } },
      { new: true, runValidators: true }
    );

    res.json(updatedSkill);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete a skill category
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    await skill.deleteOne();
    res.json({ msg: 'Skill removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;