import {defineField, defineType} from 'sanity'
import {AddCommentIcon} from '@sanity/icons'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name'
    },
    prepare: (prev) => ({
      title: prev.name,
      subtitle: prev.name,
      media: AddCommentIcon
    })
  }
})
