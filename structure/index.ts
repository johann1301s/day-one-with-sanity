import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, UsersIcon, PinIcon, MasterDetailIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Upcoming Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(S.documentList().title('Upcoming Events').filter('date >= now()')),
      S.listItem()
        .title('Past Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(S.documentList().title('Past Events').filter('date < now()')),
      S.divider(),
      S.documentTypeListItem('artist').title('Artists').icon(UsersIcon),
      S.divider(),
      S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
      S.divider(),
      S.listItem()
        .title('Smart albums')
        .schemaType('album')
        .icon(MasterDetailIcon)
        .child(S.documentList().title('fooo').filter('length(name) > 5'))
    ])