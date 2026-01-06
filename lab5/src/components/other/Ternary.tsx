const Ternary = () => {
  let a:boolean= true;
  let b:boolean= true;
  return(
      <div>
          <div>
              { a ? "A jest prawdziwe": "A to fałsz"};
          </div>
          <div>
              { b ? "B jest prawdziwe": "B to fałsz"};
          </div>
      </div>
  );
};
export default Ternary;