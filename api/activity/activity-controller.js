
const activityModel = require('./activity-model');

class ActivityController {
    async getActivity(req, res) {
        try {
            console.log(req.user)
            const { user_id } = req.user

            const activity = await activityModel.find({ user_id })

            return res.send({ activity })

        } catch (error) {
            res.status(400).send('bad request')
        }
    }
}

module.exports = new ActivityController()