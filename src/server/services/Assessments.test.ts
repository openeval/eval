import { faker } from "@faker-js/faker";
import { AssessmentStatus, type Assessment } from "@prisma/client";
import { expect, test, vi } from "vitest";

import type { CreateAssessmentDto } from "~/dto/CreateAssessmentDto";
import prisma from "~/server/__mocks__/db";
import * as assessmentService from "./Assessments";

vi.mock("~/server/db");

vi.mock("server-only", () => {
  return {
    // mock server-only module
  };
});

test("createAssessment should return the generated Assessment", async () => {
  const newAssessment: CreateAssessmentDto = {
    title: "new assessment",
    description: "long description",
    createdById: faker.string.uuid(),
    organizationId: faker.string.uuid(),
  };

  const response = {
    id: faker.string.uuid(),
    status: AssessmentStatus.DRAFT,
    title: newAssessment.title,
    description: newAssessment.description,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    published: false,
  };

  prisma.assessment.create.mockResolvedValue(response as Assessment);

  const assessment = await assessmentService.create(newAssessment);

  expect(assessment).toStrictEqual(response);
});
