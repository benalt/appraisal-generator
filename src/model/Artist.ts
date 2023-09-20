import { type ContentfulData } from "./types"

export class Artist {

  constructor (contentfulData:ContentfulData) {
    if (contentfulData) {
      this.id = contentfulData.sys.id
      for (const key in contentfulData.fields) {
        if ( [ "artistName", "yearBorn",
              "yearDied", "origin" ].includes(key) ) {
          // @ts-ignore
          this[key] = contentfulData.fields[key]
        }
      } 
    }
  }

  public artistName?: string
  public yearBorn?: string
  public yearDied?: string
  public origin?: string


  get formattedYear():string|null {
    if (!this.yearBorn && !this.yearDied) { return null }
    if (this.yearBorn && this.yearDied) { return `${this.yearBorn}-${this.yearDied}` }
    if (this.yearBorn && !this.yearDied) { return `born ${this.yearBorn}` }
    if (!this.yearBorn && this.yearDied) { return `died ${this.yearBorn}` }
  }

  get labelHtml():string {
    let retString = `${this.artistName}`
    if (this.formattedYear) {
      retString += `, <span class="artist-year">${this.formattedYear}</span>`
    }
    return retString
  }

}