const productSchema = {
  type: "object",
  required: ["id", "title", "price", "description", "category", "image", "rating"],
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    price: { type: "number" },
    description: { type: "string" },
    category: { type: "string" },
    image: { type: "string" },
    rating: {
      type: "object",
      required: ["rate", "count"],
      properties: {
        rate: { type: "number" },
        count: { type: "integer" }
      }
    }
  }
};

const cartSchema = {
  type: "object",
  required: ["id", "userId", "date", "products"],
  properties: {
    id: { type: "integer" },
    userId: { type: "integer" },
    date: { type: "string", format: "date-time" },
    products: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["productId", "quantity"],
        properties: {
          productId: { type: "integer" },
          quantity: { type: "integer" }
        }
      }
    }
  }
};

module.exports = {
  productSchema,
  cartSchema
};
