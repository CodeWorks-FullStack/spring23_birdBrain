import { appState } from "../AppState.js";
import { Bird } from "../Models/Bird.js";
import { server } from "./AxiosService.js"

class BirdsService {
  async deleteBird() {
    const bird = appState.bird
    const res = await server.delete('api/birds/' + bird.id)
    console.log('delete bird', res.data);
    appState.birds = appState.birds.filter(b => b.id != bird.id)
    appState.bird = null
  }
  setActiveBird(birdId) {
    const bird = appState.birds.find(b => b.id == birdId)
    appState.bird = bird
  }
  async createBird(formData) {
    const res = await server.post('api/birds', formData)
    console.log('created bird', res.data);
    appState.birds.push(new Bird(res.data))
    appState.emit('birds')
  }
  async getBirds() {
    const res = await server.get('api/birds')
    console.log('get birds', res.data);
    appState.birds = res.data.map(b => new Bird(b))
    console.log(appState.birds);
  }

}

export const birdsService = new BirdsService()