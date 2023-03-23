import { dbContext } from "../db/DbContext.js"

class WatchersService {
    async getWatchersByBirdId(birdId) {
        // const watchers = await dbContext.Watchers.find({ birdId: id })
        // NOTE as soon as I say, 'find' something where this value matches here, we must format it with {}
        const watchers = await dbContext.Watchers.find({ birdId }).populate('watcher', 'name picture')
        return watchers
    }
    async becomeWatcher(watcherData) {
        const newWatcher = await dbContext.Watchers.create(watcherData)
        await newWatcher.populate('watcher', 'name picture')
        return newWatcher
    }

}

export const watchersService = new WatchersService()