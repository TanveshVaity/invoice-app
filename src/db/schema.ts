import { integer, pgEnum, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";
import { AvailableStatus } from "@/data/status";

export type Status = (typeof AvailableStatus)[number]["id"];

const statuses = AvailableStatus.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>],
) 

export const Invoices = pgTable("invoices", {
    id : serial("id").primaryKey().notNull(),
    createTs : timestamp("createTs").defaultNow().notNull(),
    value : integer("value").notNull(),
    description : text("description").notNull(),
    userId : text("userId").notNull(),
    organizationID : text("organizationID"),
    customerId : integer("customerId").notNull().references(() => Customers.id),
    status : statusEnum("status").notNull(),
});

export const Customers = pgTable("customers", {
    id : serial("id").primaryKey().notNull(),
    createTs : timestamp("createTs").defaultNow().notNull(),
    name : text("name").notNull(),
    email : text("email").notNull(),
    userId : text("userId").notNull(),
    organizationID : text("organizationID"),
});
