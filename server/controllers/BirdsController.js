import { Auth0Provider } from "@bcwdev/auth0provider";
import { birdsService } from "../services/BirdsService.js";
import { watchersService } from "../services/WatchersService.js";
import BaseController from "../utils/BaseController.js";


export class BirdsController extends BaseController {
    constructor() {
        super('api/birds')
        this.router
            .get('', this.getBirds)
            .get('/:birdId', this.getBirdById)
            .get('/:birdId/watchers', this.getWatchersByBirdId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBird)
            .delete('/:birdId', this.deleteBird)
    }



    async getBirds(req, res, next) {
        try {
            const query = req.query
            const birds = await birdsService.getBirds(query)
            return res.send(birds)
        } catch (error) {
            next(error)
        }
    }

    async getBirdById(req, res, next) {
        try {
            const birdId = req.params.birdId
            const bird = await birdsService.getBirdById(birdId)
            return res.send(bird)
        } catch (error) {
            next(error)
        }
    }

    async getWatchersByBirdId(req, res, next) {
        try {
            // const birdId = req.params.birdId
            const watchers = await watchersService.getWatchersByBirdId(req.params.birdId)
            return res.send(watchers)
        } catch (error) {
            next(error)
        }
    }
    async createBird(req, res, next) {
        try {
            const birdData = req.body
            // NOTE we access the logged-in user by accessing our middleware ('userInfo')
            const userId = req.userInfo.id
            birdData.informantId = userId
            const newBird = await birdsService.createBird(birdData)
            return res.send(newBird)
        } catch (error) {
            next(error)
        }
    }

    async deleteBird(req, res, next) {
        try {
            const userId = req.userInfo.id
            const birdId = req.params.birdId
            await birdsService.deleteBird(userId, birdId)
            return res.send(`Bird ${birdId} was deleted`)
        } catch (error) {
            next(error)
        }
    }
}