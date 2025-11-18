import type { JSX } from 'react';
import Car from '../Car/Car';
import Bike from '../Bike/Bike';

export default function CarShop(): JSX.Element {
  return (
    <div>
      <h1>Car Shop</h1>
      <h2>Cars</h2>
      {/* aufrufen */}
      <Car brand={'BMW'} color={'black'} image='https://www.tuningblog.eu/wp-content/uploads/2016/06/slammed-black-BMW-M5-F10-Manhart-ADV.1-Tuning.jpg' />
      <Car brand={'Audi'} color={'red'} image='https://audirstuning.files.wordpress.com/2016/11/8287860969_1975e0db5c_b.jpg'/>
      <Car brand={'Honda'} color={'yellow'} image='https://i.pinimg.com/736x/2f/23/ab/2f23ab9beb8c9672839e99a2e0c5a290.jpg' />
      <Car brand={'Mercedes'} color={'blue'} image='https://tse2.mm.bing.net/th/id/OIP.MufsAVMuqagM-PObAvn8AgHaFU?cb=12&w=800&h=575&rs=1&pid=ImgDetMain&o=7&rm=3' />
      <Car brand={'Toyota'} color={'green'} image='https://img1.goodfon.com/wallpaper/nbig/6/c3/toyota-supra-tuning-advan.jpg' />
      <h2>Bikes</h2>
      {/* aufrufen */}
      <Bike gears={4} brand={'Giant'} price={799} />
      <img src="https://tse1.mm.bing.net/th/id/OIP.AExrUuFezG5OyAhqMu4YWAHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" alt="bike" width="300"/>
      <Bike gears={4} brand={'Trek'} price={699} />
      <img src="https://tse3.mm.bing.net/th/id/OIP.c-QE7t55jxpUI0oq2VdFFgAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" alt="bike" width="300"/>
      <Bike gears={5} brand={'Specialized'} price={999} />
      <Bike gears={6} brand={'Cannondale'} price={899} />
      <Bike gears={2} brand={'Scott'} price={749} />
    </div>
  );
}
