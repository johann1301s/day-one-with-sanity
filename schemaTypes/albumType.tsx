import { defineField, defineType } from "sanity";
import { MyInputLocal } from "./components/MyInputLocal";
import { Camera, AlarmClockPlus } from 'lucide-react';

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
    icon: Camera,
    default: true
  }, {
    name: 'dates',
    title: 'Dates',
    icon: AlarmClockPlus,
  }],
  fields: [
    defineField({
      type: 'string',
      name: 'author',
      readOnly: true
    }),
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
      type: 'image',
      name: 'image',
    }),
    defineField({
      type: 'datetime',
      name: 'date',
      group: 'dates',
      fieldset: 'all-inputs',
      hidden: (ctx) => {
        return !ctx.document?.name
      },
      readOnly: (ctx) => {
        return !ctx.currentUser?.roles.some((role) => role.name === 'contributor')
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
          name: 'nextlbum',
          hidden: (ctx) => {
            return !!ctx.currentUser?.roles.find(({name}) => name === 'viewer')
          },
        })
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      date: 'date',
      media: 'image'
    },
    prepare: (prev) => ({
      ...prev,
      subtitle: new Date(prev.date).getFullYear().toString()
    })
  }
})
