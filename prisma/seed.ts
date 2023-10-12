import { prisma } from "../src/server/db";
import type { Prisma } from "@prisma/client";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Unverified",
    email: "test+unverified@useeval.com",
    emailVerified: new Date(),
    completedOnboarding: false,
  },
  {
    name: "Test verified",
    email: "test@useeval.com",
    emailVerified: new Date(),
    completedOnboarding: true,
  },
];

const criteriaData = [
  {
    name: "Code Quality",
    weight: 30,
    children: [
      { name: "Code follows project coding standards and guidelines." },
      {
        name: "No major code smells, such as duplicated code, overly complex logic, or unnecessary comments.",
      },
      { name: "Code is well-organized and modular." },
      { name: "Variable and function names are clear and meaningful." },
      { name: "No linting errors or warnings." },
    ],
  },
  {
    name: "Functionality and Purpose",
    weight: 25,
    children: [
      {
        name: "The pull request addresses a clear issue, user story, or feature request.",
      },
      {
        name: "The proposed changes fulfill the intended purpose effectively.",
      },
      { name: "Any new functionality is well-documented." },
      {
        name: "Changes do not introduce regressions or break existing features.",
      },
    ],
  },
  {
    name: "Testing",
    weight: 20,
    children: [
      { name: "Unit tests are included and cover new or modified code." },
      { name: "Existing tests pass without errors." },
      { name: "Test coverage is maintained or improved (if applicable)." },
    ],
  },
  {
    name: "Documentation",
    weight: 15,
    children: [
      {
        name: "Code changes are accompanied by clear and concise documentation or comments.",
      },
      {
        name: "Documentation is updated to reflect the changes introduced in the pull request.",
      },
      {
        name: "User-facing changes (APIs, configuration, etc.) are documented for users and developers.",
      },
    ],
  },
  {
    name: "Consistency and Style",
    weight: 10,
    children: [
      {
        name: "Code formatting adheres to the project's coding style and conventions.",
      },
      {
        name: "Consistency in code style with the rest of the project is maintained.",
      },
      {
        name: "The pull request description is well-structured and provides context for reviewers.",
      },
    ],
  },
  {
    name: "Dependencies and Compatibility",
    weight: 5,
    children: [
      { name: "Any new dependencies are justified and documented." },
      {
        name: "Compatibility with supported platforms and versions is ensured.",
      },
    ],
  },
  {
    name: "Security and Performance",
    weight: 5,
    children: [
      {
        name: "The code changes do not introduce security vulnerabilities.",
      },
      { name: "Performance implications are considered and documented." },
    ],
  },
];

async function seedCriteria(parentId, criteriaData) {
  for (const criterion of criteriaData) {
    const { name, children, weight } = criterion;

    const createdCriterion = await prisma.evaluationCriteria.create({
      data: {
        name,
        weight,
        parentId: parentId ? parentId : undefined,
      },
    });

    if (children && children.length) {
      await seedCriteria(createdCriterion.id, children);
    }
  }
}

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.upsert({
      create: u,
      update: {},
      where: { email: u.email as string },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  await seedCriteria(null, criteriaData);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
