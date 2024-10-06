import { defineField, defineType } from "sanity";
import { EarthGlobeIcon, ActivityIcon } from '@sanity/icons'

export const albumType = defineType({
  name: 'album',
  type: 'document',
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
    })
  ]
})
