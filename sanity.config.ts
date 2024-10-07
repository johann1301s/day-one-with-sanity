import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import { MyInput } from './schemaTypes/components/MyInput'
import { myTheme } from './common/theme'
import {presentationTool} from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import {
  dashboardTool,
  sanityTutorialsWidget,
  projectUsersWidget,
  projectInfoWidget,
} from "@sanity/dashboard";

const SANITY_STUDIO_PREVIEW_URL = (
	process.env.SANITY_STUDIO_PREVIEW_URL
	|| 'http://localhost:8080'
)

export default defineConfig({
  name: 'default',
  title: 'Day one with Sanity',

  projectId: '5mo4u4lk',
  dataset: 'production',

  plugins: [
    dashboardTool({
      widgets: [
        sanityTutorialsWidget(),
        projectInfoWidget(),
        projectUsersWidget(),
      ]
    }),
    structureTool({ structure, defaultDocumentNode }),
    visionTool(),
    presentationTool({
      previewUrl: SANITY_STUDIO_PREVIEW_URL
    }),
    media()
  ],

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
