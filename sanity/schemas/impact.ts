import { defineType, defineField } from "sanity";

export default defineType({
  name: "impact",
  title: "Home - Impact ",
  type: "document",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
    }),
    defineField({
      name: "value",
      type: "string",
      title: "Value",
    }),
    defineField({
      name: "suffix",
      type: "string",
      title: "Suffix",
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon",
      description:
        "pilihannya: users | userPlus | calendarCheck | calendar | trophy | award | fileText | bookOpen | cpu | layers",
    }),
  ],
});
