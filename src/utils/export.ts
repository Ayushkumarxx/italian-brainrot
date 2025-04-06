import Home from "../pages/home";

//*components
import Navbar from "../components/navbar";
import UsernamePrompt from "../components/userPromt";
import Leaderboard from "../components/ledearBoard";
import Versus from "../components/versus";
//* images
import chips from "../assets/png/chips.png";

interface Exp {
  pages: any;
  components: any;
  images: any;
}

let Exports: Exp = {
  pages: {
    home: Home,
  },
  components: {
    navbar: Navbar,
    userPromt: UsernamePrompt,
    leaderboard: Leaderboard,
    versus: Versus,
  },
  images: {
    chips: chips,
  },
};
export default Exports;
