const z = require("zod");
module.exports = userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

module.exports = userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});
