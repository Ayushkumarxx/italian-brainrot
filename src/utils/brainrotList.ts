// src/data/BrainrotList.ts

const brainrotImages: string[] = [
  '/assets/png/img-1.png',
  '/assets/png/img-2.png',
  '/assets/png/img-3.png',
  '/assets/png/img-4.png',
  '/assets/png/img-5.png',
  '/assets/png/img-6.png',
  '/assets/png/img-7.png',
  '/assets/png/img-8.png',
  '/assets/png/img-9.png',
  '/assets/png/img-10.png',
  '/assets/png/img-11.png',
  '/assets/png/img-12.png',
  '/assets/png/img-13.png',
  '/assets/png/img-14.png',
  '/assets/png/img-15.png',
  '/assets/png/img-16.png',
  '/assets/png/img-17.png',
  '/assets/png/img-18.png',
  '/assets/png/img-19.png',
  '/assets/png/img-20.png',
  '/assets/png/img-21.png',
  '/assets/png/img-22.png',
  '/assets/png/img-23.png',
  '/assets/png/img-24.png',
  '/assets/png/img-25.png',
  '/assets/png/img-26.png',
  '/assets/png/img-27.png',
  '/assets/png/img-28.png',
  '/assets/png/img-29.png',
  '/assets/png/img-30.png',
];
export interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}
const BrainrotList: Meme[] = brainrotImages.map((img, index) => ({
  id: index + 1,
  name: `Brainrot ${index + 1}`,
  image: img,
  likes: 0,
}));

export default BrainrotList;




