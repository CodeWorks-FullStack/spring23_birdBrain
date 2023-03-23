import { appState } from "../AppState.js";
import { Profile } from "../Models/Account.js";
import { Bird } from "../Models/Bird.js";
import { server } from "./AxiosService.js"

class BirdsService {
  async getWatchersByBirdId() {
    const bird = appState.bird
    const res = await server.get('api/birds/' + bird.id + '/watchers')
    console.log('get watchers', res.data);
    appState.watchers = res.data.map(w => new Profile(w.watcher))
  }
  async becomeWatcher() {
    const res = await server.post('api/watchers', { birdId: appState.bird.id })
    console.log('become wathcer', res.data);
    appState.watchers.push(new Profile(res.data.watcher))
    appState.emit('watchers')
    appState.bird.watcherCount++
    appState.emit('birds')
  }
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