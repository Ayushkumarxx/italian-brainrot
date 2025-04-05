import Exports from "./export";
import img1 from '../assets/png/img-1.png'
import img2 from '../assets/png/img-2.png'
import img3 from '../assets/png/img-3.png'
import img4 from '../assets/png/img-4.png'
import img5 from '../assets/png/img-5.png'
import img6 from '../assets/png/img-6.png'
import img7 from '../assets/png/img-7.png'
import img8 from '../assets/png/img-8.png'
import img9 from '../assets/png/img-9.png'
import img10 from '../assets/png/img-10.png'
import img11 from '../assets/png/img-11.png'
import img12 from '../assets/png/img-12.png'
import img13 from '../assets/png/img-13.png'
import img14 from '../assets/png/img-14.png'
import img15 from '../assets/png/img-15.png'
import img16 from '../assets/png/img-16.png'
import img17 from '../assets/png/img-17.png'
import img18 from '../assets/png/img-18.png'
import img19 from '../assets/png/img-19.png'
import img20 from '../assets/png/img-20.png'
import img21 from '../assets/png/img-21.png'
import img22 from '../assets/png/img-22.png'
import img23 from '../assets/png/img-23.png'
import img24 from '../assets/png/img-24.png'
import img25 from '../assets/png/img-25.png'
import img26 from '../assets/png/img-26.png'
import img27 from '../assets/png/img-27.png'
import img28 from '../assets/png/img-28.png'
import img29 from '../assets/png/img-29.png'
import img30 from '../assets/png/img-30.png'


const brainrotImages = [
    img1,img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30
  ];
export interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

const BrainrotList: Meme[] = brainrotImages.map((img: string, index: number) => ({
    id: index + 1,
    name: `Brainrot ${index + 1}`,
    image: img,
    likes: 0,
  }));
export default BrainrotList;
