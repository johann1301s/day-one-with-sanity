import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import { MyInput } from './schemaTypes/components/MyInput'
import { myTheme } from './common/theme'

export default defineConfig({
  name: 'default',
  title: 'Day one with Sanity',

  projectId: '5mo4u4lk',
  dataset: 'production',

  plugins: [structureTool({ structure, defaultDocumentNode }), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (prev, context) => [
        ...prev.filter(({schemaType}) => schemaType !== 'album'),
        {
        id: 'album-prefix',
        title: 'Album',
        schemaType: 'album',
        value: {
          author: context.currentUser?.email
        },
      },
    ],
  },

  form: {
    components: {
      input: MyInput
    }
  },

  tools: (prev, {currentUser}) => {
    if (currentUser?.roles.some(({name}) => name === 'viewer')) return prev.filter((item) => item.name !== 'vision')
    return prev
  },
  theme: myTheme
})
