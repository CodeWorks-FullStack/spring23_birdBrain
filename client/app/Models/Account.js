export class Profile {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
  }

  get WatcherPicture() {
    return `
    <img src="${this.picture}" alt="${this.name}" title="${this.name}" class="img-fluid informant-picture">
    `
  }
}
export class Account extends Profile {
  constructor (data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}
