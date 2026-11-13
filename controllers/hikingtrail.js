
const HikingTrail = require('../models/hikingtrail');

exports.hikingtrail_create_Page = function(req, res) {
  res.render('hikingtrail_create', { title: 'Add Hiking Trail', trail: {} });
};

exports.hikingtrail_item_Page = async function(req, res, next) {
  try {
    if (!/^[a-fA-F0-9]{24}$/.test(req.params.id)) return res.status(400).send('Invalid trail ID');
    const trail = await HikingTrail.findById(req.params.id);
    if (!trail) return res.status(404).send('Trail not found');
    const mode = req.params.mode || 'inspect';
    const titles = { inspect: 'Inspect Hiking Trail', update: 'Update Hiking Trail', delete: 'Delete Hiking Trail' };
    if (!Object.hasOwn(titles, mode)) return res.status(404).send('Page not found');
    res.render('hikingtrail_' + mode, { title: titles[mode], trail });
  } catch (err) {
    next(err);
  }
};

// Display all hiking trails from the database.
exports.hikingtrail_view_all_Page = async function(req, res) {
  try {
    const trails = await HikingTrail.find();
    res.render('hikingtrails', {
      title: 'Search Results - Hiking Trails',
      results: trails
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all hiking trails

exports.hikingtrail_list = async function(req, res) {
  try {
    const trails = await HikingTrail.find();
    res.json(trails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get one hiking trail

exports.hikingtrail_detail = async function(req, res) {
  console.log("Detail for ID: " + req.params.id);

  try {
    const result = await HikingTrail.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        error: "Hiking trail not found"
      });
    }

    res.json(result);

  } catch (err) {
    res.status(400).json({
      error: "Invalid hiking trail ID or request"
    });
  }
};

// Create a hiking trail using POST
exports.hikingtrail_create_post = async function(req, res) {
  try {
    const trail = new HikingTrail({
      name: req.body.name,
      location: req.body.location,
      difficulty: req.body.difficulty,
      length: req.body.length
    });
    const result = await trail.save();
    res.status(201).json(result);
  } catch (err) {
    const status = err.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
};

// Delete a hiking trail using DELETE
exports.hikingtrail_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Hiking Trail delete DELETE ' + req.params.id);
};

// Update a hiking trail using PUT

exports.hikingtrail_update_put = async function(req, res) {
  try {
    const trail = await HikingTrail.findById(req.params.id);

    if (!trail) {
      return res.status(404).json({
        error: "Hiking trail not found"
      });
    }

    if (req.body.name !== undefined)
      trail.name = req.body.name;

    if (req.body.location !== undefined)
      trail.location = req.body.location;

    if (req.body.difficulty !== undefined)
      trail.difficulty = req.body.difficulty;

    if (req.body.length !== undefined)
      trail.length = req.body.length;

    const result = await trail.save();
    res.json(result);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
