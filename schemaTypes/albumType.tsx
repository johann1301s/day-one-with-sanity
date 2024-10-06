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
            .required()
            .error('Name of album is required.'),
      description: (
        <div>
          <i>Name</i> of the album
        </div>
      )
    })
  ]
})
