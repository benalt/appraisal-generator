import { Artwork } from "./Artwork"
import { DocumentSection } from "./DocumentSection"

import * as contentful from 'contentful'
import { type ContentfulData } from "./types";

import apiConfig from "@/apiConfig";
import type { App } from "vue";

const client = contentful.createClient({
  ...apiConfig
});

export class Appraisal {
  constructor (contentfulData:ContentfulData) {
    this.id = contentfulData.sys.id
    for (const key in contentfulData.fields) {
      if ( [ "documentTitle",
      "preparationDate",
      "preparedFor",
      "preparer",
      "title",
      "valuationDate" ].includes(key) ) {
        // @ts-ignore
        this[key] = contentfulData.fields[key]
      }
      if ( key === "precedingSections") {
        this.precedingSections = contentfulData.fields.precedingSections.map((section:any) =>(new DocumentSection(section)))
      }
      
      if ( key === "followingSections") {
        this.followingSections = contentfulData.fields.followingSections.map((section:any) =>(new DocumentSection(section)))
      }

      if ( key === "appraisedArtworks") {
        this.appraisedArtworks = contentfulData.fields.appraisedArtworks.map((artwork:any) =>(new Artwork(artwork)))
      }
    }
  }

  public id?:string

  public title?: string
  public documentTitle?: string
  public preparedFor?: string
  
  public valuationDate?: Date
  public preparationDate?: Date
  public preparer?: string

  public includeTableOfContents: boolean = true

  public precedingSections: Array<DocumentSection> = [] 
  appraisedArtworks: Array<Artwork> = []
  followingSections: Array<DocumentSection> = []
  
  get appraisedValueHtml():string {
    const valueRange = [0, 0]
    let incomplete = false
    let retString = ""
    for (let i=0; i<this.appraisedArtworks.length; i++) {
      const artworkValue = this.appraisedArtworks[i].appraisedValueRange
      
      if (!artworkValue) { 
        incomplete = true 
      } else {
        valueRange[0] = valueRange[0] + artworkValue[0]
        valueRange[1] = valueRange[1] + artworkValue[1]
      }
    }
    
    if (valueRange[0] === valueRange[1]) {
      retString = `$${valueRange[0].toLocaleString()}.00`
    } else {
      retString = `$${valueRange[0].toLocaleString()}.00-${valueRange[1].toLocaleString()}.00`
    }

    if (incomplete) {
      retString += ` <span class="incomplete">(incomplete)</span>`
    }

    // loop through appraised artworks and add up appraisedValues
    return retString
  }

  static async loadAllAppraisals(): Promise<Array<Appraisal>> {
    //const appraisalRawData:ContentfulData = await client.getEntry(id);
    
    const appraisalRawData:any = await client.getEntries({
      include: 0,
      content_type: "appraisal"
    })
    
    return appraisalRawData.items.map((rawAppraisal:ContentfulData)=>{
      return new Appraisal(rawAppraisal)
    })
  }

  static async loadAppraisal(id:string): Promise<Appraisal> {
    const appraisalRawData = await client.getEntry(id);
    // @ts-ignore
    return new Appraisal(appraisalRawData);
  }
}