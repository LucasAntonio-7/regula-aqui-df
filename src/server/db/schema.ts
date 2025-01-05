import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const createTable = sqliteTableCreator((name) => `regula-aqui_${name}`);

export const categoriesTable = sqliteTable("categories", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 128 }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  options: many(optionsTable),
}));

export const optionsTable = sqliteTable("options", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 128 }).notNull(),
  categoryId: int("category_id", { mode: "number" }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const optionsRelations = relations(optionsTable, ({ many, one }) => ({
  category: one(categoriesTable, {
    fields: [optionsTable.categoryId],
    references: [categoriesTable.id],
  }),
  reasonForReferal: many(reasonForReferalTable),
}));

export const reasonForReferalTable = sqliteTable("reason_for_referal", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 128 }).notNull(),
  assistedText: text("assisted_text", { length: 256 }).notNull(),
  optionId: int("option_id", { mode: "number" }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const reasonForReferalRelations = relations(
  reasonForReferalTable,
  ({ one }) => ({
    option: one(optionsTable, {
      fields: [reasonForReferalTable.optionId],
      references: [optionsTable.id],
    }),
  }),
);
