import { Artist } from "./Artist"
import { RichTextBlock } from "./RichTextBlock"
import { type ContentfulData } from "./types"

import { usCurrencyFormatter } from '../lib/formatters'

class ImageAsset {
  constructor (contentfulData:ContentfulData) {
    this.url = contentfulData.fields?.file?.url
    this.title = contentfulData.fields?.title
  }
  url?:string 
  title?:string
}

class SupportingArtwork {
  constructor (contentfulData:ContentfulData) {
    this.id = contentfulData.sys.id
  
    for (const key in contentfulData.fields) {
      if ( key === "title") {
        this.title = contentfulData?.fields.title
      }
      
      if ( key === "images") {
        this.images = contentfulData.fields.images.map( (imageData: ContentfulData) => ( new ImageAsset(imageData) ) )
      }

      if ( key === "details" ) {
        this.details = new RichTextBlock( contentfulData.fields.details as ContentfulData)
      } 
    }
  }

  public id?:string
  public title?:string
  public images: Array<ImageAsset> = []
  public details?: RichTextBlock
}

export class Artwork {

  constructor (contentfulData:ContentfulData) {
    this.id = contentfulData.sys.id
    for (const key in contentfulData.fields) {
      if ( [ "title", "year",
            "signature", "style",
            "medium", "dimensions",
            "condition", "frameNote",
            "edition", "printer", "publisher",
            "appraisedValue" ].includes(key) ) {
        // @ts-ignore
        this[key] = contentfulData.fields[key]
      }

      if ( [ "provenance", "exhibited",
            "literature", "description",
            "footnotes" ].includes(key) ) {
        // @ts-ignore
        this[key] = new RichTextBlock( contentfulData.fields[key] as ContentfulData)
      }        
      
      if ( key === "artist") {
        this.artist = new Artist(contentfulData.fields.artist)
      }

      if ( key === "images") {
        this.images = contentfulData.fields.images.map( (imageData: ContentfulData) => ( new ImageAsset(imageData) ) )
      }

      if ( key === "supportingArtworks") {
        this.supportingArtworks = contentfulData.fields.supportingArtworks.map( (artworkData: ContentfulData) => ( new SupportingArtwork(artworkData) ) )
      }
    }
  }

  public id: string
  public title?:string
  public inventoryNumber?:string
  public artist?: Artist
  public images: Array<ImageAsset> = []
  public year?:string
  public signature?: string
  public style?: string
  public medium?: string
  public dimensions?: string
  public condition?: string
  public edition?: string
  public printer?: string
  public publisher?: string
  public frameNote?:string
  public appraisedValue?: string
  public provenance?: RichTextBlock
  public exhibited?: RichTextBlock
  public literature?: RichTextBlock
  public description?: RichTextBlock
  public footnotes?: RichTextBlock
  public supportingArtworks: Array<SupportingArtwork> = []

  get labelHtml():string {
    let retString = (this.artist?.artistName) ? `${ this.artist.artistName }, `: ''
    if (this.title) { retString = retString + "<i>" + this.title + "</i>" }
    if (this.year) { retString = retString + `, ${this.year}`  }
    return retString
  }

  get appraisedValueRangeHtml():string {
    if (this.appraisedValueRange) {
      if (this.appraisedValueRange[0] == this.appraisedValueRange[1]) {
        return usCurrencyFormatter.format(this.appraisedValueRange[0])
      }
      return `${this.appraisedValueRange[0].toFixed()}-${this.appraisedValueRange[1].toFixed()}`
    }
    return ""
  }
  get appraisedValueRange():[number, number]|null {
    if (!this.appraisedValue) { return null }
    const range = [];
    // remove all the whitespace
    const rawString = this.appraisedValue.replace(/\s\s+/g, '') // whitespace
      .replace(/\$/g,'') // remove all the commas 
      .replace(/,/g,'') // remove all the commas 
      .replace(/–|—/g,'-') // en/em dash
      .replace(/[T|t][O|o]/g,'-') // word 'to'
    
    const rawValues = rawString.split('-');
    if (rawValues[0]) {
      const asInt = parseInt(rawValues[0]);
      if (!isNaN(asInt)) {
        range[0] = asInt;
        if (rawValues[1]) {
          const asInt = parseInt(rawValues[1]);
          if (!isNaN(asInt)) {
            range[1] = asInt;
          }
        } else {
          range[1] = range[0]  
        }
      }
    }
    if (range.length > 0) {
      //@ts-ignore
      return range
    }
    return null
  }
}