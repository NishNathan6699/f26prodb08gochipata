
const HikingTrail = require('../models/hikingtrail');

// ===============================
// CREATE PAGE
// ===============================
exports.hikingtrail_create_Page = function(req, res) {
    res.render('hikingtrail_create', {
        title: 'Add Hiking Trail',
        trail: {}
    });
};


// ===============================
// DETAIL PAGE
// ===============================
exports.hikingtrail_item_Page = async function(req, res, next) {
    try {
        const id = req.params.id;

        if (!/^[a-fA-F0-9]{24}$/.test(id || '')) {
            return res.status(400).send('Invalid hiking trail ID');
        }

        const trail = await HikingTrail.findById(id);

        if (!trail) {
            return res.status(404).send('Hiking trail not found');
        }

        const mode = req.params.mode || 'inspect';

        const titles = {
            inspect: 'Inspect Hiking Trail',
            update: 'Update Hiking Trail',
            delete: 'Delete Hiking Trail'
        };

        if (!Object.hasOwn(titles, mode)) {
            return res.status(404).send('Page not found');
        }

        res.render('hikingtrail_' + mode, {
            title: titles[mode],
            trail: trail
        });

    } catch (err) {
        next(err);
    }
};


// ===============================
// VIEW ALL HIKING TRAILS
// ===============================
exports.hikingtrail_view_all_Page = async function(req, res) {
    try {
        const trails = await HikingTrail.find();

        res.render('hikingtrails', {
            title: 'Search Results - Hiking Trails',
            results: trails
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// ===============================
// LIST API
// ===============================
exports.hikingtrail_list = async function(req, res) {
    try {
        const trails = await HikingTrail.find();
        res.json(trails);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// ===============================
// DETAIL API
// ===============================
exports.hikingtrail_detail = async function(req, res) {
    const id = req.params.id;

    if (!/^[a-fA-F0-9]{24}$/.test(id || '')) {
        return res.status(400).json({
            error: 'Invalid hiking trail ID'
        });
    }

    try {
        const result = await HikingTrail.findById(id);

        if (!result) {
            return res.status(404).json({
                error: 'Hiking trail not found'
            });
        }

        res.json(result);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// ===============================
// CREATE API
// ===============================
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
        const status =
            err.name === 'ValidationError' ? 400 : 500;

        res.status(status).json({
            error: err.message
        });
    }
};


// ===============================
// UPDATE API
// ===============================
exports.hikingtrail_update_put = async function(req, res) {
    const id = req.params.id;

    if (!/^[a-fA-F0-9]{24}$/.test(id || '')) {
        return res.status(400).json({
            error: 'Invalid hiking trail ID'
        });
    }

    try {
        const trail = await HikingTrail.findById(id);

        if (!trail) {
            return res.status(404).json({
                error: 'Hiking trail not found'
            });
        }

        if (req.body.name !== undefined) {
            trail.name = req.body.name;
        }

        if (req.body.location !== undefined) {
            trail.location = req.body.location;
        }

        if (req.body.difficulty !== undefined) {
            trail.difficulty = req.body.difficulty;
        }

        if (req.body.length !== undefined) {
            trail.length = req.body.length;
        }

        const result = await trail.save();

        res.json(result);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// ===============================
// DELETE API
// ===============================
exports.hikingtrail_delete = async function(req, res) {
    const id = req.params.id;

    if (!/^[a-fA-F0-9]{24}$/.test(id || '')) {
        return res.status(400).json({
            error: 'Invalid hiking trail ID'
        });
    }

    try {
        const result = await HikingTrail.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                error: 'Hiking trail not found'
            });
        }

        res.json({
            message: 'Hiking trail deleted',
            deleted: result
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// ===============================
// UPDATE PAGE
// ===============================
exports.hikingtrail_update_Page = async function(req, res) {
    const id = req.query.id;

    console.log('Update view for ID:', id);

    // Validate ID before searching MongoDB
    if (!/^[a-fA-F0-9]{24}$/.test(id || '')) {
        return res.status(400).send('Invalid hiking trail ID');
    }

    try {
        const result = await HikingTrail.findById(id);

        if (!result) {
            return res.status(404).send('Hiking trail not found');
        }

        
         res.render('hikingtrailupdate', {
         title: 'Update Hiking Trail',
         toShow: result
         });


    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};


// ===============================
// DELETE PAGE
// ===============================
exports.hikingtrail_delete_Page = async function(req, res) {
    const id = req.query.id;

    if (!/^[a-fA-F0-9]{24}$/.test(id || '')) {
        return res.status(400).send('Invalid hiking trail ID');
    }

    try {
        const result = await HikingTrail.findById(id);

        if (!result) {
            return res.status(404).send('Hiking trail not found');
        }

        res.render('hikingtraildelete', {
            title: 'Delete Hiking Trail',
            toShow: result
        });

    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};
