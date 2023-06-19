import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Collection = () => {
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const res = await axios.get(`https://api.covalenthq.com/v1/eth-mainnet/nft/0x59468516a8259058baD1cA5F8f4BFF190d30E066/traits_summary/?key=${process.env.REACT_APP_COVALENT_API_KEY}`);
        setCollectionData(res.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCollectionData();
  }, []);

  return (
    <div>
      {collectionData.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          {item.attributes.map((attr, i) => (
            <div key={i}>
              <h3>{attr.trait_type}</h3>
              {attr.values && attr.values.map((val, vIndex) => (
                <p key={vIndex}>{val.value} ({val.count})</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Collection;
