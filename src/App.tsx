import React from "react";
// import { Drawer } from './components/Drawer';
import ShowMore from "./components/ShowMore";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="show-more-wrapper">
        <ShowMore>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          pariatur iusto dolorum id eaque iure praesentium illum dolorem,
          laborum molestiae voluptatem maxime harum eos quibusdam placeat vitae
          voluptates porro. Iusto?
        </ShowMore>
      </div>
      <div>
        <div>
          <div>dfsdf</div>
        </div>
      </div>
    </div>
  );
};

export default App;
