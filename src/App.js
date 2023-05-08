import './App.css';
import { Header, CreateContainer, MainContainer } from './components';
import {Route, Routes} from "react-router-dom"
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion'; //Tạo hiệu ứng cho các thành phần khi bị xóa khỏi react.
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';

function App() {
  const[{fooditems},dispatch] = useStateValue();

  const fetchData = async()=>{
    await getAllFoodItems().then(data=>{
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        fooditems: data,
      })
    })
  }

  useEffect(()=> {
    fetchData()
  },[]);

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
