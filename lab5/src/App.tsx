import Cart from "./components/cart/Cart.tsx";
import NewCart from "./components/cart/NewCart.tsx";
import Counter from "./components/effects/Counter.tsx";
import Form from "./components/forms/Form.tsx";
import Login from "./components/forms/Login.tsx";
import Ternary from "./components/other/Ternary.tsx";
import Update from "./components/other/Update.tsx";
import StudentManager from "./components/students/StudentManager.tsx";
import Title from "./components/effects/Title.tsx";
import Countdown from "./components/effects/Countdown.tsx";
import Comments from "./components/products/Comments.tsx";

function App() {
  return (
    <>
        <Cart/>
        <NewCart/>
        <Counter/>
        <Form/>
        <Login/>
        <Ternary/>
        <Update/>
        <StudentManager/>
        <Title/>
        <Countdown/>
        <Comments/>
    </>
  )
}

export default App
