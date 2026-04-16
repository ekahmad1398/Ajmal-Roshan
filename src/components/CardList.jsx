import Card from "./Card";

const PAGE_SIZE = 12;

const chunkCards = (data) => {
  const pages = [];

  for (let index = 0; index < data.length; index += PAGE_SIZE) {
    pages.push(data.slice(index, index + PAGE_SIZE));
  }

  return pages;
};

const CardList = ({ data, paginate = false }) => {
  if (paginate) {
    const pages = chunkCards(data);

    return (
      <div className="print-pages">
        {pages.map((page, pageIndex) => (
          <div className="print-page" key={`page-${pageIndex}`}>
            {page.map((item, cardIndex) => (
              <div className="print-card" key={`page-${pageIndex}-card-${cardIndex}`}>
                <Card item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="print-container">
      {data.map((item, index) => (
        <div className="print-card" key={index}>
          <Card item={item} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
