import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

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
          .title('Other albums')
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
