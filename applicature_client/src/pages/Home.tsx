import React, { useState, createContext, useContext } from "react";

enum Layers {
  Home = 'home',
}

interface LayerContextProps {
  layer: Layers;
  setLayer: (layer: Layers) => void;
}

const LayerContext = createContext<LayerContextProps | undefined>(undefined);

const LayerProvider = ({ children }: {children: React.ReactNode}) => {
  const [layer, setLayer] = useState(Layers.Home);
  return (
    <LayerContext.Provider value={{ layer, setLayer }}>
      {children}
    </LayerContext.Provider>
  );
};

const useLayer = () => {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error("useLayer must be used within a LayerProvider");
  }
  return context;
};

function App() {
  return (
    <LayerProvider>
      <HomeLayout />
    </LayerProvider>
  );
}

const HomeLayout = () => {
  const { layer } = useLayer();

  return (
    <>
      {layer === Layers.Home && (
        <>
          <Header />
          <Home />
        </>
      )}
    </>
  );
};

const Home = () => {
  return (
    <div>home</div>
  );
};

const Header = () => {
  const { setLayer } = useLayer();

  return (
    <div>
      <button onClick={() => setLayer(Layers.Home)}>Home</button>
    </div>
  );
};

export default App;