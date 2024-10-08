import {defineField, defineType} from 'sanity'

export const artistType = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Artist description',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Artist photo',
      options: {
        hotspot: true,
      },
    })
  ],
  preview: {
    select: {
      name: 'name'
    },
    prepare: (prev) => ({
      title: prev.name,
      subtitle: prev.name,
      media: (
        <div>
          ...
        </div>
      )
    })
  }
})
