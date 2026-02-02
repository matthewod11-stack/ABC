import React, { useState } from 'react';
import { LETTERS, NUMBERS, SHAPES } from './constants';
import { AppScreen, Category, TraceItem } from './types';
import TracingCanvas from './components/TracingCanvas';
import CuteDecor from './components/CuteDecor';
import { Crown } from 'lucide-react';

function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.HOME);
  const [category, setCategory] = useState<Category>(Category.LETTERS);
  const [selectedItem, setSelectedItem] = useState<TraceItem | null>(null);

  const getCategoryItems = () => {
    switch (category) {
      case Category.LETTERS: return LETTERS;
      case Category.NUMBERS: return NUMBERS;
      case Category.SHAPES: return SHAPES;
      default: return [];
    }
  };

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    setScreen(AppScreen.CATEGORY_SELECT);
  };

  const handleItemSelect = (item: TraceItem) => {
    setSelectedItem(item);
    setScreen(AppScreen.TRACING);
  };

  const goBack = () => {
    if (screen === AppScreen.TRACING) {
      setScreen(AppScreen.CATEGORY_SELECT);
      setSelectedItem(null);
    } else if (screen === AppScreen.CATEGORY_SELECT) {
      setScreen(AppScreen.HOME);
    }
  };

  // --- RENDERERS ---

  if (screen === AppScreen.TRACING && selectedItem) {
    return (
        <div className="relative w-full h-full">
            <CuteDecor />
            <TracingCanvas item={selectedItem} onBack={goBack} />
        </div>
    );
  }

  if (screen === AppScreen.CATEGORY_SELECT) {
    const items = getCategoryItems();
    return (
      <div className="min-h-screen bg-[#FFF0F5] p-4 flex flex-col items-center relative">
        <CuteDecor />
        
        {/* Navbar */}
        <div className="w-full max-w-4xl flex items-center justify-between mb-6 z-10">
          <button 
            onClick={goBack}
            className="bg-white text-pink-500 px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2"
          >
             Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bubble text-pink-600 font-bold">
            {category === Category.LETTERS ? 'ABC' : category === Category.NUMBERS ? '123' : 'Shapes'}
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-4xl pb-10 z-10">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemSelect(item)}
              className="aspect-square bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center group border-4 border-transparent hover:border-pink-200"
            >
              <div className="w-2/3 h-2/3 flex items-center justify-center">
                 {/* Preview SVG or Text */}
                 <svg viewBox={item.viewBox} className="w-full h-full text-gray-400 group-hover:text-pink-500 transition-colors">
                   {item.char ? (
                      <text 
                        x="50%" 
                        y="55%" 
                        fontFamily={item.fontFamily} 
                        fontSize="70" 
                        fontWeight="bold" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill="currentColor"
                      >
                        {item.char}
                      </text>
                   ) : (
                      <path d={item.path} fill="currentColor" />
                   )}
                 </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // HOME SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      <CuteDecor />

      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-20 text-yellow-300 opacity-60 animate-pulse">
        <Crown size={48} />
      </div>

      {/* Main Content */}
      <div className="z-10 text-center max-w-2xl w-full">
        <div className="mb-10 bg-white/60 backdrop-blur-sm p-8 rounded-[3rem] shadow-xl border-4 border-white">
            <h1 className="text-5xl md:text-7xl font-bubble font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 tracking-wider drop-shadow-sm">
            Princess<br/>Paws
            </h1>
            <p className="text-xl text-gray-600 font-bubble">Learn to write with Kitty & Puppy!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
            {/* ABC Button */}
            <button 
              onClick={() => handleCategorySelect(Category.LETTERS)}
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-b-8 border-pink-200 active:border-b-0 active:translate-y-0"
            >
              <div className="bg-pink-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl group-hover:bg-pink-200 transition-colors">
                🅰️
              </div>
              <span className="text-2xl font-bold text-gray-700 font-bubble">Letters</span>
            </button>

            {/* 123 Button */}
            <button 
              onClick={() => handleCategorySelect(Category.NUMBERS)}
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-b-8 border-purple-200 active:border-b-0 active:translate-y-0"
            >
               <div className="bg-purple-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl group-hover:bg-purple-200 transition-colors">
                1️⃣
              </div>
              <span className="text-2xl font-bold text-gray-700 font-bubble">Numbers</span>
            </button>

            {/* Shapes Button */}
            <button 
               onClick={() => handleCategorySelect(Category.SHAPES)}
               className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-b-8 border-yellow-200 active:border-b-0 active:translate-y-0"
            >
               <div className="bg-yellow-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl group-hover:bg-yellow-200 transition-colors">
                ⭐
              </div>
              <span className="text-2xl font-bold text-gray-700 font-bubble">Shapes</span>
            </button>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-pink-400 font-semibold z-10">
        Made with love for your little Princess 💖
      </div>

    </div>
  );
}

export default App;