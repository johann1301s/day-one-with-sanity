import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      group: 'details',
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
        name: 'eventType',
        group: 'details',
        type: 'string',
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
        initialValue: 60
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
  ]
})
