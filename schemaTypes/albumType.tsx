import { defineField, defineType } from "sanity";

export const albumType = defineType({
  name: 'album',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
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
    })
  ]
})
