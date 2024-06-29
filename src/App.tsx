import './App.css'
import MutateQuotes from "./components/MutateQuotes/MutateQuotes";
import Toolbar from "./components/Toolbar/Toolbar";
import {Route, Routes} from "react-router-dom";
import GetQuotes from "./components/GetQuotes/GetQuotes";

const  App=()=> {


  return (
    <>
        <header>
            <Toolbar />
        </header>
        <Routes>
            <Route path="/" element={<GetQuotes/>} />
            <Route path="/add-quote" element={<MutateQuotes/>} />
            <Route path="/quotes/:id/edit" element={<MutateQuotes />} />
            <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
    </>
  )
}

export default App
