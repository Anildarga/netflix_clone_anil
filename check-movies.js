const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const movies = await prisma.movie.findMany();
  console.log('Movies in database:');
  movies.forEach(m => {
    console.log(`- ${m.title}: thumbnailUrl=${m.thumbnailUrl}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
