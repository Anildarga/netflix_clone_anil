const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const movies = await prisma.movie.findMany();
  console.log('Updated movies in database:');
  movies.forEach(m => {
    console.log(`\nTitle: ${m.title}`);
    console.log(`  thumbnailUrl: ${m.thumbnailUrl}`);
    console.log(`  videoUrl: ${m.videoUrl}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
