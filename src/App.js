import './App.css';
import { Header, CreateContainer, MainContainer } from './components';
import {Route, Routes} from "react-router-dom"
import React from 'react';
import { AnimatePresence } from 'framer-motion'; //Tạo hiệu ứng cho các thành phần khi bị xóa khỏi react.

function App() {
  return (
    <AnimatePresence initial={false} mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header/>
        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer/>}/>
            <Route path='/createContainer' element={<CreateContainer/>}/>
          </Routes>
      
        </main>
      </div>
      </AnimatePresence>
  );
}

export default App;
