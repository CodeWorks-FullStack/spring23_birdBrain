import { appState } from "../AppState.js"
import { Bird } from "../Models/Bird.js"
import { birdsService } from "../Services/BirdsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawBirds() {
  let birds = appState.birds
  let template = ''
  birds.forEach(bird => template += bird.BirdCardTemplate)
  setHTML('birds', template)
}

function _drawActiveBirdTemplate() {
  if (appState.bird) {
    setHTML('modal-guts', appState.bird.ActiveBirdTemplate)
  }
}

function _drawWatchers() {
  let template = ''
  appState.watchers.forEach(w => template += w.WatcherPicture)
  setHTML('watchers', template)
}

export class BirdsController {
  constructor () {
    this.getBirds()
    appState.on('birds', _drawBirds)
    appState.on('bird', _drawActiveBirdTemplate)
    appState.on('bird', this.getWatchersByBirdId)
    appState.on('account', _drawActiveBirdTemplate)
    appState.on('watchers', _drawWatchers)
  }
  async getWatchersByBirdId() {
    try {
      await birdsService.getWatchersByBirdId()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async getBirds() {
    try {
      await birdsService.getBirds()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async createBird() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const formData = getFormData(form)
      console.log('form data', formData);
      await birdsService.createBird(formData)
      // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#modal').hide()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async deleteBird() {
    try {
      if (await Pop.confirm('Are your sure that this bird is trash?', "He's going in the trash if you colick this button", "YEAH HE'S TRASH")) {
        await birdsService.deleteBird()
        // @ts-ignore
        bootstrap.Modal.getOrCreateInstance('#modal').hide()
      }
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async becomeWatcher() {
    try {
      await birdsService.becomeWatcher()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  setBirdForm() {
    setHTML('modal-guts', Bird.BirdForm())
  }

  setActiveBird(birdId) {
    birdsService.setActiveBird(birdId)
  }
}