import { MembershipRole } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { OrganizationCreateInputSchema, type Organization } from "prisma/zod";
import slugify from "slugify";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import prisma from "~/server/db";

interface Request extends NextApiRequest {
  body: Organization;
}

export default async function handle(req: Request, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: "You must be logged in." });

  const { user } = session;
  try {
    const data = OrganizationCreateInputSchema.parse(req.body);

    const org = await prisma.organization.create({
      data: {
        ...data,
        slug: slugify(data.name),
        members: {
          create: {
            userId: user.id,
            role: MembershipRole.OWNER,
            accepted: true,
          },
        },
      },
    });

    if (org) {
      // set active org to current created
      await prisma.user.update({
        where: { id: user.id },
        data: { activeOrgId: org.id },
      });
    }

    return res.json(org);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues);
    }

    return res.status(500).end();
  }
}
