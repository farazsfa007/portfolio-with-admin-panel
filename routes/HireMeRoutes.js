const express = require('express');
const {
    createHireMe,
    getHireMeById,
    getAllHireMeEntries,
    updateHireMeStatus,
    deleteHireMeEntry
} = require('../controllers/HiremeController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hire Me');
});

router.post('/', createHireMe);
router.get('/all', getAllHireMeEntries);
router.get('/:idNumber', getHireMeById);

// ✅ Update status route (PATCH)
router.patch('/:idNumber/status', updateHireMeStatus);

// ✅ Delete user route (DELETE)
router.delete('/:idNumber', deleteHireMeEntry);

module.exports = router;
