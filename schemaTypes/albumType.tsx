import { defineField, defineType } from "sanity";
import { EarthGlobeIcon, ActivityIcon } from '@sanity/icons'
import { MyInputLocal } from "./components/MyInputLocal";

export const albumType = defineType({
  name: 'album',
  type: 'document',
  fieldsets: [{
    name: 'all-inputs',
    title: 'All inputs',
    options: { columns: 2 }
  }],
  groups: [{
    name: 'common',
    title: 'Common',
    icon: ActivityIcon,
    default: true
  }, {
    name: 'dates',
    title: 'Dates',
    icon: EarthGlobeIcon,
  }],
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      group: 'common',
      fieldset: 'all-inputs',
      validation: (rule) =>
          rule
            .min(2)
            .max(20)
            .warning('Name should be between 2-20 characters'),
      description: (
        <div>
          <i>Name</i> of the album
        </div>
      )
    }),
    defineField({
      type: 'datetime',
      name: 'date',
      group: 'dates',
      fieldset: 'all-inputs',
      hidden: (ctx) => {
        return !ctx.document?.name
      },
      validation: (rule) =>
          rule
            .required().info('This field is required.'),
      description: (
        <div>
          <i>Date</i> the album was released.
        </div>
      )
    }),
    defineField({
      name: 'otherAlbums',
      type: 'object',
      options: {
        collapsed: true,
        columns: 2
      },
      fields: [
        defineField({
          type: 'string',
          name: 'previousAlbum',
          components: {
            input: MyInputLocal
          }
        }),
        defineField({
          type: 'string',
          name: 'nextlbum'
        })
      ]
    }),
  ]
})
