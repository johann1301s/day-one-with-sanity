import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import { DoorsOpenInput } from './components/DoorsOpenInput'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  type: 'document',
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      group: ['details', 'editorial'],
      type: 'string',
    }),
    defineField({
        name: 'slug',
        group: 'details',
        type: 'slug',
        options: {source: 'name'},
        validation: (rule) => rule
            .required()
            .error(`Required to generate a page on the website`),
        hidden: ({document}) => !document?.name
    }),
    defineField({
      name: 'format',
      group: 'details',
      type: 'string',
      title: 'Event format',
      validation: (rule) => rule
        .required(),
      options: {
          list: ['in-person', 'virtual'],
          layout: 'radio',
      }
    }),
    defineField({
        name: 'date',
        group: 'details',
        type: 'datetime',
    }),
    defineField({
        name: 'doorsOpen',
        group: 'details',
        description: 'Number of minutes before the start time for admission',
        type: 'number',
        initialValue: 60,
        components: {
            input: DoorsOpenInput
        }
    }),
    defineField({
        name: 'venue',
        group: 'details',
        type: 'reference',
        to: {type: 'venue'},
        readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
        validation: (rule) =>
            rule.custom((value, context) => {
              if (value && context?.document?.eventType === 'virtual') {
                return 'Only in-person events can have a venue'
              }
        
              return true
            }),
    }),
    defineField({
        name: 'headline',
        group: 'details',
        type: 'reference',
        to: {type: 'artist'}
    }),
    defineField({
        name: 'image',
        group: 'editorial',
        type: 'image',
    }),
    defineField({
        name: 'details',
        group: 'editorial',
        type: 'array',
        of: [{type: 'block'}]
    }),
    defineField({
        name: 'tickets',
        group: 'details',
        type: 'url'
    })
  ],
  preview: {
    select: {
        name: 'name',
        venue: 'venue.name',
        artist: 'headline.name',
        date: 'date',
        image: 'image',
    },
    prepare({name, venue, artist, date, image}) {
        const nameFormatted = name || 'Untitled event'
        const dateFormatted = date
          ? new Date(date).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })
          : 'No date'
    
        return {
          title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
          subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
          media: image || CalendarIcon,
        }
    },
  }
})
