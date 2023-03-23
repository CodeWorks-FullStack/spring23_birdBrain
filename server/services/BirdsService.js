import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BirdsService {


    async getBirds(query) {
        // NOTE query is already formatted as an object so we don't need the {} in our find method
        const birds = await dbContext.Birds.find(query).populate('informant', 'name picture').populate('watcherCount')
        return birds
    }

    async getBirdById(birdId) {
        // const foundBird = await dbContext.Birds.find({ id: birdId }).populate('informant', 'name picture')
        const foundBird = await dbContext.Birds.findById(birdId).populate('informant', 'name picture').populate('watcherCount')
        if (!foundBird) {
            throw new BadRequest("Ain't no bird here")
        }
        return foundBird
    }
    async createBird(birdData) {
        const newBird = await dbContext.Birds.create(birdData)
        // NOTE if we want to populate on a create, it must happen AFTER it goes into the database
        await newBird.populate('informant', 'name picture')
        return newBird
    }

    async deleteBird(userId, birdId) {
        const foundBird = await this.getBirdById(birdId)

        // NOTE don't let just anyone remove a bird, only the person with the right cred. should be able to do this
        if (foundBird.informantId != userId) {
            throw new Forbidden("Nacho bird")
        }

        await foundBird.remove()

    }

}

export const birdsService = new BirdsService()