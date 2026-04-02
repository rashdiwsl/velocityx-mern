const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Car = require('./models/Car');

const cars = [
  {
    title: 'Lamborghini Huracán EVO',
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2022,
    price: 287450,
    mileage: 4200,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjc1fHx8ZW58MHx8fHx8',
    images: [
      'https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjc1fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1621285891826-0e26a90e9652?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjg0fHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1621285849733-39974b5d7497?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjc4fHx8ZW58MHx8fHx8',
    ],
    description: '5.2L V10, 630hp, 0-100 in 2.9s. Pearl white with carbon interior.'
  },

  {
    title: 'Ford Mustang Shelby GT500',
    brand: 'Ford',
    model: 'Mustang Shelby GT500',
    year: 2022,
    price: 79995,
    mileage: 6200,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://shelby.com/media/images/vehicles/gt500_signature/gallery/20_gt500se-3.jpg',
    images: [
      'https://shelby.com/media/images/vehicles/gt500_signature/gallery/20_gt500se-3.jpg',
      'https://shelby.com/media/images/vehicles/gt500_signature/gallery/20_gt500se-4.jpg',
      'https://shelby.com/media/images/vehicles/gt500_signature/gallery/20_gt500se-1.jpg',
    ],
    description: '5.2L supercharged V8, 760hp. Shadow Black. Carbon Fibre Track Pack.'
  },
  {
    title: 'Ferrari 488 GTB',
    brand: 'Ferrari',
    model: '488 GTB',
    year: 2021,
    price: 312000,
    mileage: 6800,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://images.unsplash.com/photo-1690732933382-779d8f5b91b7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
    description: 'Twin-turbo 3.9L V8, 661hp. Rosso Corsa red. Full Ferrari service history.'
  },

 {
    title: 'Tesla Model S Plaid',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    price: 109990,
    mileage: 11200,
    fuelType: 'Electric',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2026-tesla-model-s-plaid-134-68f6610846819.jpg?crop=1xw:1xh;center,top',
    images: [
      'https://hips.hearstapps.com/hmg-prod/images/2026-tesla-model-s-plaid-134-68f6610846819.jpg?crop=1xw:1xh;center,top',
      'https://hips.hearstapps.com/hmg-prod/images/2026-tesla-model-s-plaid-107-68f660f56b67c.jpg?crop=1xw:1xh;center,top',
      'https://hips.hearstapps.com/hmg-prod/images/2026-tesla-model-s-plaid-111-68f660fb960fc.jpg?crop=1xw:1xh;center,top',
    ],
    description: 'Tri-motor, 1020hp, 0-100 in 2.1s. 600km range. Yoke steering, 17" display.'
  },
  
  {
    title: 'McLaren 720S',
    brand: 'McLaren',
    model: '720S',
    year: 2022,
    price: 299000,
    mileage: 3500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://www.mansory.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/661d6e0d2e84ef511db18f17/6818c186b53bf8d6c75d1530_McLaren%2520720S-Gallery-004.webp',
    images: [
      'https://www.mansory.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/661d6e0d2e84ef511db18f17/6818c186b53bf8d6c75d1530_McLaren%2520720S-Gallery-004.webp',
      'https://www.mansory.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/661d6e0d2e84ef511db18f17/6818c185b53bf8d6c75d148e_McLaren%2520720S-Gallery-002.webp',
      'https://www.mansory.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/661d6e0d2e84ef511db18f17/6818c187b53bf8d6c75d1731_McLaren%2520720S-Gallery-003.webp',
    ],
    description: '4.0L twin-turbo V8, 720hp. Papaya Spark orange. Carbon fibre monocoque chassis.'
  },
  {
    title: 'BMW M4 Competition',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2023,
    price: 89900,
    mileage: 8900,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/10/BMW-M4-CS-1.jpg?w=1200&h=900&crop=1',
    images: [
      'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/10/BMW-M4-CS-1.jpg?w=1200&h=900&crop=1',
      'https://di-uploads-pod23.dealerinspire.com/bmwofowingsmills/uploads/2024/07/P90548593_highRes_the-all-new-bmw-m4-c-1-1024x683.jpg',
      'https://simemotors.com.au/wp-content/uploads/2024-bmw-m4-cs-13-scaled.jpg',
    ],
    description: 'S58 3.0L twin-turbo, 503hp. Isle of Man Green. M xDrive, carbon roof.'
  },
  {
    title: 'Mercedes-AMG GT Black Series',
    brand: 'Mercedes',
    model: 'AMG GT Black Series',
    year: 2021,
    price: 435000,
    mileage: 2100,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://www.mercedes-amg.com/media/images/1a7f764e58cc88cd45cc52405d083f05408820ff-1352x1014.jpg?auto=format&fit=max&q=75&w=1352',
    images: [
      'https://www.mercedes-amg.com/media/images/1a7f764e58cc88cd45cc52405d083f05408820ff-1352x1014.jpg?auto=format&fit=max&q=75&w=1352',
      'https://www.mercedes-amg.com/media/images/427deb93d7915a4124428af18d1f11792a3fbd2d-1920x1080.jpg?auto=format&fit=max&q=75&w=1920',
      'https://www.mercedes-amg.com/media/images/2cb55f9ac77334c82a28f49cf4d9d9786729205a-1920x1080.jpg?auto=format&fit=max&q=75&w=1920',
    ],
    description: '4.0L biturbo V8, 730hp. Obsidian Black. One of 900 units worldwide.'
  },
  {
    title: 'Audi R8 V10 Performance',
    brand: 'Audi',
    model: 'R8 V10 Performance',
    year: 2022,
    price: 219000,
    mileage: 5600,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://www.topgear.com/sites/default/files/2021/12/A218766_large.jpg?w=1784&h=1004',
    images: [
      'https://www.topgear.com/sites/default/files/2021/12/A218766_large.jpg?w=1784&h=1004',
      'https://www.topgear.com/sites/default/files/2021/12/A218761_large.jpg?w=1784&h=1004',
      'https://www.topgear.com/sites/default/files/2021/12/A218764_large.jpg?w=892&h=502',
    ],
    description: '5.2L FSI V10, 620hp, 8250rpm redline. Daytona Grey. Laser headlights.'
  },
  {
    title: 'Bugatti Chiron Sport',
    brand: 'Bugatti',
    model: 'Chiron Sport',
    year: 2020,
    price: 3200000,
    mileage: 980,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Sold',
    sellerContact: 'admin@velocityx.com',
    image: 'https://www.bugattiofgreenwich.com/wp-content/themes/aanWordpress/images/model_pages/chiron-sport/chiron-sport-1.jpg',
    images: [
      'https://www.bugattiofgreenwich.com/wp-content/themes/aanWordpress/images/model_pages/chiron-sport/chiron-sport-1.jpg',
      'https://www.bugattiofgreenwich.com/wp-content/uploads/2020/06/chiron-sport-2.jpg',
      'https://www.bugattiofgreenwich.com/wp-content/themes/aanWordpress/images/model_pages/chiron-sport/chiron-sport-3.jpg',
    ],
    description: '8.0L quad-turbo W16, 1479hp. Sky View glass roof. One careful owner.'
  },
  {
    title: 'Nissan GT-R NISMO',
    brand: 'Nissan',
    model: 'GT-R NISMO',
    year: 2023,
    price: 212000,
    mileage: 3300,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Sold',
    sellerContact: 'admin@velocityx.com',
    image: 'https://www.topgear.com/sites/default/files/images/cars-road-test/carousel/2021/01/dc4894bd222beecd609968b65b33bdff/my20_gt-r_nismo_germany_36.jpg?w=892&h=502',
    images: [
      'https://www.topgear.com/sites/default/files/images/cars-road-test/carousel/2021/01/dc4894bd222beecd609968b65b33bdff/my20_gt-r_nismo_germany_36.jpg?w=892&h=502',
      'https://www.topgear.com/sites/default/files/images/cars-road-test/carousel/2021/01/dc4894bd222beecd609968b65b33bdff/my20_gt-r_nismo_germany_29.jpg?w=211&h=119',
      'https://www.topgear.com/sites/default/files/images/cars-road-test/carousel/2021/01/dc4894bd222beecd609968b65b33bdff/my20_gt-r_nismo_germany_32.jpg?w=211&h=119',
    ],
    description: 'Hand-built 3.8L twin-turbo, 600hp. Ultimate R35 spec. Track-tuned suspension.'
  },
  {
    title: 'Chevrolet Corvette C8 Z06',
    brand: 'Chevrolet',
    model: 'Corvette C8 Z06',
    year: 2023,
    price: 112000,
    mileage: 4700,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/Performance/2026-corvette-z06/page-assets/03-design/2026-z06-design-01.jpg?imwidth=2400',
    images: [
      'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/Performance/2026-corvette-z06/page-assets/03-design/2026-z06-design-01.jpg?imwidth=2400',
      'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/Performance/2026-corvette-z06/page-assets/05-performance/2026-z06-performance-04.jpg?imwidth=1200',
      'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/Performance/2026-corvette-z06/page-assets/05-performance/2026-z06-performance-01.jpg?imwidth=1200',
    ],
    description: 'LT6 5.5L flat-plane V8, 670hp, 8600rpm. Torch Red. Z07 aero package.'
  },
 
  
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  await Car.deleteMany();
  await User.deleteMany();

  const seller = await User.create({
    name: 'VelocityX Admin',
    email: 'admin@velocityx.com',
    password: 'velocityx123',
  });

  const carsWithSeller = cars.map(c => ({ ...c, seller: seller._id }));
  await Car.insertMany(carsWithSeller);

  console.log(`✅ Seeded ${cars.length} cars with image galleries`);
  console.log('👤 Demo login — email: admin@velocityx.com | password: velocityx123');
  process.exit();
};

seed().catch(err => { console.error(err); process.exit(1); });