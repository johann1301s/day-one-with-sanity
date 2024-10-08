import {defineField, defineType} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

export const venueType = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'city',
      type: 'string',
    }),
    defineField({
      name: 'country',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name'
    },
    prepare: (prev) => {

      return ({
        ...prev,
        subtitle: '...',
        media: BarChartIcon
      })
    }
  }
})
