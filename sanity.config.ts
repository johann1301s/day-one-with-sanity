import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import { MyInput } from './schemaTypes/components/MyInput'

export default defineConfig({
  name: 'default',
  title: 'Day one with Sanity',

  projectId: '5mo4u4lk',
  dataset: 'production',

  plugins: [structureTool({ structure, defaultDocumentNode }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  form: {
    components: {
      input: MyInput
    }
  },

  tools: (prev, {currentUser}) => {
    if (currentUser?.roles.some(({name}) => name === 'viewer')) return prev.filter((item) => item.name !== 'vision')
    return prev
  }
})
