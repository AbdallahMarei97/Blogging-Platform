import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  userName: text("user_name").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});

export const post = pgTable(
  "post",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    imagePath: text("image_path").notNull(),
    body: text("body").notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdIndex: index("userIdIndex").on(table.userId),
  })
);

export const comment = pgTable(
  "comment",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    message: text("message").notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    postId: uuid("postId")
      .notNull()
      .references(() => post.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    postIdIndex: index("postIdIndex").on(table.postId),
  })
);

export const postsRelations = relations(post, ({ one, many }) => ({
  user: one(user, { fields: [post.userId], references: [user.id] }),
  comments: many(comment),
}));

export const usersRelations = relations(user, ({ many }) => ({
  posts: many(post),
}));

export const commentsRelations = relations(comment, ({ one }) => ({
  post: one(post, { fields: [comment.postId], references: [post.id] }),
  user: one(user, { fields: [comment.userId], references: [user.id] }),
}));
