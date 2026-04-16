import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CardList from "./CardList";

const PrintView = ({ data }) => {
  const ref = useRef();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print Cards</button>

      <div ref={ref}>
        <CardList data={data} />
      </div>
    </div>
  );
};

export default PrintView;