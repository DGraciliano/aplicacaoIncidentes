import express from 'express'
const router = express.Router()
import IncidentsController from '../controllers/IncidentsController.mjs'

// Helpers
import checkAuth from '../helpers/auth.mjs'

// Controller

router.get('/dashboard', checkAuth, IncidentsController.dashboard)
router.get('/report', checkAuth, IncidentsController.reportIncident)
router.post('/add', checkAuth, IncidentsController.reportIncidentPost)
router.get('/userIncidents', checkAuth, IncidentsController.userIncidents)
router.get('/', IncidentsController.showIncidents)


export default router