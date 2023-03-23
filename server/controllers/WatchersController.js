import { Auth0Provider } from "@bcwdev/auth0provider";
import { watchersService } from "../services/WatchersService.js";
import BaseController from "../utils/BaseController.js";

export class WatchersController extends BaseController {
    constructor() {
        super('api/watchers')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.becomeWatcher)
    }
    async becomeWatcher(req, res, next) {
        try {
            const userId = req.userInfo.id
            const watcherData = req.body
            // NOTE expect user to supply the birdId on the req.body, so I need to supply the accountId
            watcherData.accountId = userId
            const newWatcher = await watchersService.becomeWatcher(watcherData)
            return res.send(newWatcher)
        } catch (error) {
            next(error)
        }
    }
}