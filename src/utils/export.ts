import Home from '../pages/home'

//*components
import Navbar from '../components/navbar'
//* images
import chips from '../assets/png/chips.png'




interface Exp {
    pages: any,
    components: any,
    images: any,
}

let Exports: Exp  = {
    pages: {
      home: Home  
    } ,
    components: {
      navbar: Navbar
    },
    images: {
      chips: chips,

    }
}
export default Exports