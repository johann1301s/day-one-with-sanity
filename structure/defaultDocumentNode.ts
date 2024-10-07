import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { PreviewComponent } from '../schemaTypes/components/PreviewComponent'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { SanityDocument } from 'sanity'

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(doc: any) {
  return doc?.slug?.current
    ? `http://localhost:3000/${doc.slug.current}`
    : 'http://localhost:3000'
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `artist`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "event" && references($id)]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Events'),
      ])
    case 'album':
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "album" && name match "*mok*" && _id != $currentId]`,
            params: {
              currentId: `_id`
            },
            options: { perspective: 'previewDrafts' }
          })
          .title('Other albums'),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc),
          })
          .title('Preview Url'),
        S.view.component(PreviewComponent).title('Preview'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
