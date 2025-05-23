import img1 from '../assets/png/img-1.png';
import img2 from '../assets/png/img-2.png';
import img3 from '../assets/png/img-3.png';
import img4 from '../assets/png/img-4.png';
import img5 from '../assets/png/img-5.png';
import img6 from '../assets/png/img-6.png';
import img7 from '../assets/png/img-7.png';
import img8 from '../assets/png/img-8.png';
import img9 from '../assets/png/img-9.png';
import img10 from '../assets/png/img-10.png';
import img11 from '../assets/png/img-11.png';
import img12 from '../assets/png/img-12.png';
import img13 from '../assets/png/img-13.png';
import img14 from '../assets/png/img-14.png';
import img15 from '../assets/png/img-15.png';
import img16 from '../assets/png/img-16.png';
import img17 from '../assets/png/img-17.png';
import img18 from '../assets/png/img-18.png';
import img19 from '../assets/png/img-19.png';
import img20 from '../assets/png/img-20.png';
import img21 from '../assets/png/img-21.png';
import img22 from '../assets/png/img-22.png';
import img23 from '../assets/png/img-23.png';
import img24 from '../assets/png/img-24.png';
import img25 from '../assets/png/img-25.png';
import img26 from '../assets/png/img-26.png';
import img27 from '../assets/png/img-27.png';
import img28 from '../assets/png/img-28.png';
import img29 from '../assets/png/img-29.png';
import img30 from '../assets/png/img-30.png';
import img31 from '../assets/webp/img-31.webp';
import img32 from '../assets/webp/img-32.webp';
import img33 from '../assets/webp/img-33.webp';
import img34 from '../assets/webp/img-34.webp';
import img35 from '../assets/webp/img-35.webp';
import img36 from '../assets/webp/img-36.webp';


// Map the images to an object for easy reference by id
export const memeImages = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
  9: img9,
  10: img10,
  11: img11,
  12: img12,
  13: img13,
  14: img14,
  15: img15,
  16: img16,
  17: img17,
  18: img18,
  19: img19,
  20: img20,
  21: img21,
  22: img22,
  23: img23,
  24: img24,
  25: img25,
  26: img26,
  27: img27,
  28: img28,
  29: img29,
  30: img30,
  31: img31,
  32: img32,
  33: img33,
  34: img34,
  35: img35,
  36: img36
};

// Define Meme interface
export interface Meme {
  id: number;
  name: string;
  likes: number;
}

// Convert memeImages object to an array of Meme objects
const memeList: Meme[] = Object.keys(memeImages).map((key) => {
  const id = Number(key); 
  return {
    id,
    name: `Brainrot ${id}`,
    likes: 0,
  };
});

export default memeList;