// Sanity schema for a Product document. Copy this into your Sanity Studio
// (sanity/schemas) when you set up the Studio. The fields map 1:1 to the
// Product type in the Next.js app.

const product = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "refNumber",
      title: "Reference Number",
      type: "string",
      description: 'Catalog index, e.g. "001"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "EUR",
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["XS", "S", "M", "L", "XL"],
      },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description:
        "Upload every photo for this product here, in order — drag to reorder. The FIRST image is used as the card thumbnail everywhere else on the site; all of them show, in order, on the product detail page.",
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "featured",
      title: "Featured (show on homepage hero)",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "specs",
      title: "Specs",
      type: "object",
      fields: [
        { name: "figure", title: "Figure", type: "string" },
        { name: "material", title: "Material", type: "string" },
        { name: "detail", title: "Detail", type: "string" },
        { name: "construction", title: "Construction", type: "string" },
        { name: "coordinates", title: "Coordinates", type: "string" },
      ],
    },
  ],
};

export default product;
