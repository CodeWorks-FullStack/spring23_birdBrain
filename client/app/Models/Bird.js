import { appState } from "../AppState.js"

export class Bird {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.imgUrl = data.imgUrl
    this.species = data.species
    this.isReal = data.isReal
    this.location = data.location
    this.informantId = data.informantId
    this.informant = data.informant
    this.createdAt = new Date(data.createdAt)
  }

  get BirdCardTemplate() {
    return `
    <div class="col-12 col-md-3 p-4">
      <div onclick="app.birdsController.setActiveBird('${this.id}')" class="bg-primary rounded elevation-3 selectable" data-bs-toggle="modal" data-bs-target="#modal">
        <img src="${this.imgUrl}" alt="${this.name}" class="img-fluid rounded-top bird-card-img">
        <div class="d-flex justify-content-between p-2 align-items-center">
          <div class="text-light">
            <b class="fs-2">${this.name}</b>
            <div class="fs-3">
              <span>👀</span>
              <span>1</span>
            </div>
          </div>
          <img
            src="${this.informant.picture}"
            alt="${this.informant.name}" title="${this.informant.name}" class="img-fluid informant-picture">
        </div>
      </div>
    </div>
    `
  }

  get ActiveBirdTemplate() {
    return `
      <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalLabel">Bird Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img class="img-fluid mb-3 active-bird-picture" src="${this.imgUrl}" alt="${this.name + ' picture'}">
        <h1 class="mb-2">${this.name} ${this.isReal ? '🦅🏳️‍🌈' : '🤖📹'}</h1>
        <div class="d-flex justify-content-between mb-2">
          <h2>${this.species}</h2>
          <h2>${this.location}</h2>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        ${this.ComputeDeleteButton}
      </div>
    </div>
    `
  }

  get ComputeDeleteButton() {
    return `<button onclick="app.birdsController.deleteBird()" type="button" class="btn btn-danger">This bird is trash <i class="mdi mdi-delete-forever"></i> </button>`
    // if (appState.account.id == this.informantId) {
    // }
    // return ''
  }

  static BirdForm() {
    return `
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalLabel">Create Bird</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onsubmit="app.birdsController.createBird()">
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input required type="text" class="form-control" name="name" id="birdName" placeholder="Bird name...">
              <label for="birdName">Bird Name</label>
            </div>
            <div class="form-floating mb-3">
              <input required type="url" class="form-control" name="imgUrl" id="birdImgUrl"
                placeholder="Bird imgUrl...">
              <label for="birdImgUrl">Bird ImgUrl</label>
            </div>
            <div class="form-floating mb-3">
              <input required type="text" class="form-control" name="location" id="birdLocation"
                placeholder="Bird location...">
              <label for="birdLocation">Bird Location</label>
            </div>
            <select name="species" class="form-select mb-3" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="party-fowler">Party Fowler</option>
              <option value="crow">Crow</option>
              <option value="seagull">Seagull</option>
              <option value="pigeon">Pigeon</option>
              <option value="raptor">Raptor</option>
              <option value="goose">Goose</option>
            </select>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="false" disabled id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Is this bird real?
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Report Bird <i class="mdi mdi-binoculars"></i></button>
          </div>
        </form>
      </div>
    `
  }
}