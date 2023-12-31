import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { type ContentfulData } from './types';

const options = {
  renderNode: {
      // @ts-ignore
      [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
          `<img src="${fields.file.url}" class="embedded_image" width="300" alt="${fields.description}"/>`,
  },
};

export class RichTextBlock {

  constructor(contentfulData:ContentfulData) {
    this.data = contentfulData
  }
  
  data?: ContentfulData

  set html(arg:string) {
    throw new Error(`ReadOnlyError - Artist.year is read only, annot set ${arg}`)
  }
  get html():string {
    // @ts-ignore
    return (this.data != undefined) ? documentToHtmlString(this.data, options) : ''
  }

}