import { defineField, defineType } from "sanity";

export const albumType = defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    })
  ]
})
