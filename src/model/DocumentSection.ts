import { RichTextBlock } from "./RichTextBlock"
import { type ContentfulData } from "./types"

export class DocumentSection {
  constructor (contentfulData:ContentfulData) {
    this.id = contentfulData.sys.id

    for (const key in contentfulData.fields) {
      if ( [ "title", "sectionTitle" ].includes(key) ) {
        // @ts-ignore
        this[key] = contentfulData.fields[key]
      }
      if ( key === "details" ) {
        this.details = new RichTextBlock(contentfulData.fields.details)
      }
    }
  }

  id?: string
  title?: string
  sectionTitle?: string
  details?: RichTextBlock
}