import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@sfltanzania.org' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@sfltanzania.org',
      password: hashedPassword,
      name: 'Admin',
    },
  });

  // Seed programs
  const programs = [
    {
      titleEn: 'Local Coordinator Program',
      titleSw: 'Mpango wa Mratibu wa Mitaa',
      descriptionEn:
        'The premier program for advancing free markets and individual liberty on college campuses. As a Local Coordinator, you organize events, lead campaigns, and build a liberty movement at your university.',
      descriptionSw:
        'Mpango wa kwanza wa kuendeleza masoko huru na uhuru wa mtu binafsi vyuoni. Kama Mratibu wa Mitaa, unaandaa matukio, unaongoza kampeni, na kujenga vuguvugu la uhuru katika chuo chako.',
      slug: 'local-coordinator',
      icon: 'users',
      order: 1,
    },
    {
      titleEn: 'Learn Liberty Courses',
      titleSw: 'Masomo ya Learn Liberty',
      descriptionEn:
        'Online courses on the ideas of liberty with a gamified learning system. Earn points, unlock achievements, and connect with pro-liberty students worldwide.',
      descriptionSw:
        'Masomo ya mtandaoni kuhusu mawazo ya uhuru yenye mfumo wa kujifunza wa michezo. Pata pointi, fungua mafanikio, na ungana na wanafunzi wanaopenda uhuru duniani kote.',
      slug: 'learn-liberty',
      icon: 'book-open',
      order: 2,
    },
    {
      titleEn: 'African Liberty Writing Fellowship',
      titleSw: 'Programu ya Uandishi ya African Liberty',
      descriptionEn:
        'A fellowship program that trains young Africans in opinion article writing for careers in academia, media, and public policy.',
      descriptionSw:
        'Programu inayowafundisha vijana Waafrika uandishi wa makala za maoni kwa ajili ya taaluma, vyombo vya habari, na sera za umma.',
      slug: 'writing-fellowship',
      icon: 'edit',
      order: 3,
    },
    {
      titleEn: 'Green Liberty',
      titleSw: 'Green Liberty',
      descriptionEn:
        'Make the world a better and freer place by addressing environmental issues through free-market solutions that matter to your community.',
      descriptionSw:
        'Fanya dunia kuwa mahali pazuri na huru kwa kushughulikia masuala ya mazingira kupitia suluhisho za soko huru zinazojalisha jamii yako.',
      slug: 'green-liberty',
      icon: 'leaf',
      order: 4,
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: program,
    });
  }

  // Seed events
  const events = [
    {
      titleEn: 'LibertyCon Africa 2026',
      titleSw: 'LibertyCon Afrika 2026',
      descriptionEn: 'The largest gathering of pro-liberty students across Africa. Join us for networking, training, and inspiring talks.',
      descriptionSw: 'Mkutano mkubwa zaidi wa wanafunzi wanaopenda uhuru kote Afrika. Jiunge nasi kwa mafunzo, mazungumzo, na hotuba za kuhamasisha.',
      date: new Date('2026-08-15'),
      location: 'Dar es Salaam, Tanzania',
      type: 'upcoming',
    },
    {
      titleEn: 'East Africa Regional Conference',
      titleSw: 'Mkutano wa Kanda ya Afrika Mashariki',
      descriptionEn: 'A conference bringing together liberty advocates from Tanzania, Kenya, and Uganda.',
      descriptionSw: 'Mkutano unaowaleta pamoja watetezi wa uhuru kutoka Tanzania, Kenya, na Uganda.',
      date: new Date('2026-02-12'),
      location: 'Dar es Salaam, Tanzania',
      type: 'past',
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }

  // Seed testimonials
  const testimonials = [
    {
      name: 'Evan Nkya',
      quoteEn: 'SFL gave me the skills and network to build Liberty Sparks, a think tank advancing freedom in Tanzania.',
      quoteSw: 'SFL ilinipa ujuzi na mtandao wa kujenga Liberty Sparks, taasisi ya utafiti inayoendeleza uhuru nchini Tanzania.',
      role: 'CEO',
      organization: 'Liberty Sparks',
    },
    {
      name: 'Dickson Kigora',
      quoteEn: 'Students For Liberty helped me realize my potential and professionalism. SFL allowed me to discover my skills and use them to change the world.',
      quoteSw: 'Students For Liberty ilinisaidia kutambua uwezo wangu na taaluma. SFL iliniruhusu kugundua ujuzi wangu na kuitumia kubadilisha dunia.',
      role: 'National Coordinator Tanzania (Former)',
      organization: 'Students For Liberty',
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  // Seed team
  const team = [
    {
      name: 'Dickson Kigora',
      roleEn: 'National Coordinator',
      roleSw: 'Mratibu wa Taifa',
      order: 1,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.create({ data: member });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
