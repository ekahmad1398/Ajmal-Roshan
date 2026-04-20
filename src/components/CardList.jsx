import { memo, useMemo } from "react";
import Card from "./Card";

const PAGE_SIZE = 21;

const chunkCards = (data) => {
  const pages = [];

  for (let index = 0; index < data.length; index += PAGE_SIZE) {
    pages.push(data.slice(index, index + PAGE_SIZE));
  }

  return pages;
};

const CardList = ({ data, paginate = false }) => {
  const pages = useMemo(() => chunkCards(data), [data]);
  const pagesClassName = paginate ? "print-pages" : "preview-pages";
  const pageClassName = paginate ? "card-page print-page" : "card-page preview-page";

  return (
    <div className={pagesClassName}>
      {pages.map((page, pageIndex) => (
        <div className={pageClassName} key={`page-${pageIndex}`}>
          {page.map((item, cardIndex) => (
            <div
              className="print-card"
              key={`page-${pageIndex}-card-${item.serialNumber ?? cardIndex}`}
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(CardList);
