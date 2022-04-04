import { z } from "zod";

export const ApiRoleSchema = z.enum(['USER', 'ADMIN', 'OWNER'])