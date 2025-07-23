import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types";
import Spotify from "~/components/apps/Spotify";
import Mail from "~/components/apps/Mail";
import Photos from "~/components/apps/Photos";
import Calculator from "~/components/apps/Calculator";
import Finder from "~/components/apps/Finder";
import Maps from "~/components/apps/Maps";
import Messages from "~/components/apps/Messages";
import AppleTV from "~/components/apps/AppleTV";

const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/icons/launchpad.png"
  },
  {
    id: "bear",
    title: "Bear",
    desktop: true,
    width: 860,
    height: 500,
    show: true,
    y: -40,
    img: "img/icons/bear.png",
    content: <Bear />
  },
  {
    id: "typora",
    title: "Typora",
    desktop: true,
    width: 600,
    height: 580,
    y: -20,
    img: "img/icons/typora.png",
    content: <Typora />
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    x: -20,
    img: "img/icons/safari.png",
    content: <Safari />
  },

  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    img: "img/icons/facetime.png",
    width: 500 * 1.7,
    height: 500 + appBarHeight,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    x: -80,
    y: 20,
    content: <FaceTime />
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    img: "img/icons/terminal.png",
    content: <Terminal />
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/icons/github.png",
    link: "https://github.com/chakravarthigit"
  },
  {
    id: "spotify",
    title: "Spotify",
    desktop: true,
    width: 900,
    height: 600,
    img: "img/icons/Spotify.png",
    content: <Spotify />
  },
  {
    id: "finder",
    title: "Finder",
    desktop: true,
    width: 900,
    height: 600,
    img: "img/icons/Finder.png",
    content: <Finder />
  },
  {
    id: "mail",
    title: "Mail",
    desktop: true,
    width: 900,
    height: 600,
    img: "img/icons/apple-mail.png",
    content: <Mail />
  },
  {
    id: "photos",
    title: "Photos",
    desktop: true,
    width: 900,
    height: 600,
    img: "img/icons/apple-photos.png",
    content: <Photos />
  },
  {
    id: "calculator",
    title: "Calculator",
    desktop: true,
    width: 320,
    height: 480,
    img: "img/icons/calculator.png",
    content: <Calculator />
  },

  {
    id: "maps",
    title: "Maps",
    desktop: true,
    width: 900,
    height: 600,
    img: "img/icons/maps.png",
    content: <Maps />
  },
  {
    id: "messages",
    title: "Messages",
    desktop: true,
    width: 800,
    height: 600,
    img: "img/icons/messages.png",
    content: <Messages />
  },
  {
    id: "appletv",
    title: "Apple TV",
    desktop: true,
    width: 1000,
    height: 650,
    img: "img/icons/apple-tv.png",
    content: <AppleTV />
  }

];

export default apps;
