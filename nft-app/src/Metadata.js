import React, { useEffect, useState } from "react";
import axios from 'axios';

function Metadata() {
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(
                    `https://api.covalenthq.com/v1/eth-mainnet/nft/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/metadata/?key=${process.env.REACT_APP_COVALENT_API_KEY}`,
                );
    
                console.log('API Response:', result.data);  // Log the whole response
    
                setMetadata(result.data.data.items);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchData();
    }, []);

    console.log('Current metadata:', metadata);


    return (
        <div>
            {metadata ? metadata.map(item => {
    console.log(item.nft_data.external_data.image);  // Log the image URL
    return (
        <div key={item.contract_address}>
            <h2>{item.contract_name}</h2>
            <img src={item.nft_data.external_data.image} alt={item.nft_data.external_data.name}/>
            <p>{item.nft_data.external_data.description}</p>
            {item.nft_data.external_data.attributes.map((attr) => (
                <div key={attr.trait_type}>
                    <h3>{attr.trait_type}</h3>
                    <p>{attr.value}</p>
                </div>
            ))}
        </div>
    )
}) : <p>Loading...</p>}

        </div>
    );
}

export default Metadata;

