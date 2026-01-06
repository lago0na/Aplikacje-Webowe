interface ButtonProps{
    click: ()=>void;
}

const IncreaseButton = ({click}: ButtonProps) => {
  return(
      <button onClick={click}>Increase</button>
  );
};
export default IncreaseButton;