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
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    ],
    description: '5.2L V10, 630hp, 0-100 in 2.9s. Pearl white with carbon interior.'
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
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
    description: 'Twin-turbo 3.9L V8, 661hp. Rosso Corsa red. Full Ferrari service history.'
  },
  {
    title: 'Porsche 911 GT3',
    brand: 'Porsche',
    model: '911 GT3',
    year: 2023,
    price: 198500,
    mileage: 1200,
    fuelType: 'Petrol',
    transmission: 'Manual',
    status: 'Available',
    sellerContact: 'admin@velocityx.com',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    ],
    description: '4.0L flat-six, 510hp, naturally aspirated. Guards Red, Clubsport package.'
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549927681-0b673b8243ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    description: 'LT6 5.5L flat-plane V8, 670hp, 8600rpm. Torch Red. Z07 aero package.'
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
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    ],
    description: 'Tri-motor, 1020hp, 0-100 in 2.1s. 600km range. Yoke steering, 17" display.'
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
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
    ],
    description: '5.2L supercharged V8, 760hp. Shadow Black. Carbon Fibre Track Pack.'
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