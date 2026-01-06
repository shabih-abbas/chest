import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const users = pgTable("users", {
  id: integer("userId").primaryKey().generatedAlwaysAsIdentity(),
  joined: timestamp("joined", {mode: 'date', withTimezone: true}).defaultNow().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("passwordHash").notNull()
});
export const entry = pgTable("entry", {
    id: integer("entryId").primaryKey().generatedAlwaysAsIdentity(),
    date: timestamp("date", {mode: 'date', withTimezone: true}).defaultNow().notNull(),
    userId: integer("userId").references(()=> users.id).notNull(),
})
export const thoughts = pgTable("thoughts", {
    id: integer("thoughtId").primaryKey().generatedAlwaysAsIdentity(),
    time: timestamp("time",{mode: 'date', withTimezone: true}).defaultNow().notNull(),
    content: text("content").notNull(),
    entryId: integer("entryId").references(() => entry.id).notNull()
});
export const usersRelation = relations(users, ({many})=> ({
    entry: many(entry),
}));
export const entryRelation = relations(entry, ({one})=> ({
    user: one(users, {
        fields: [entry.userId],
        references: [users.id]
    }),
    thoughts: many(thoughts),
}));
        
export const thoughtsRelation = relations(thoughts, ({one})=> ({
    user: one(entry, {
        fields: [thoughts.entryId],
        references: [entry.id],
    }),
}));
        

