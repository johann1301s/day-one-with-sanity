import {defineMigration, at, setIfMissing, unset, insert} from 'sanity/migrate'

// should be unique for the migration but never change
const idempotenceKey = 'xyz' 

const from = 'eventType'
const to = 'format'

export default defineMigration({
  title: 'Replace event type with event format',
  documentTypes: ["event"],
  filter: '_type == "event" && defined(eventType) && !defined(format)',
  migrate: {
    document(doc) {
      if ((doc?._migrations as string[] || []).includes(idempotenceKey)) {
        // Document already migrated, so we can skip
        return
      }

      return [
        at(to, setIfMissing(doc[from])),
        at(from, unset()),
        at('_migrations', setIfMissing([])),
        at('_migrations', insert(idempotenceKey, 'after', 0)),
      ]
    }
  }
})
