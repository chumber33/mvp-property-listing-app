import  { useEffect, useState } from 'react';
import ListingCard from './ListingCard';

interface PropertyDetailsProps {
  property_id: number,
  description: string;
  image_url: string,
  price_pcm: number
  create: number,
  address: string
};

function Listing() {

  const [listed_properties, setListedProperties] = useState<PropertyDetailsProps[]>([])

  const  getListedProperties: VoidFunction = async ()  => {
    try {
      const response: Response = await fetch("http://localhost:5000/listed_properties");
      const json_data: Array<PropertyDetailsProps> = await response.json(); 
      setListedProperties(json_data);

    } catch (error: any) {
      console.error(error.message);
    }
  }
  
  useEffect(() =>{
    getListedProperties();
  }, []);

  return (
    <div className=' p-2 grid place-items-center '>
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between w-3/5'>
        {listed_properties.map((listing) =>
         <ListingCard 
            key={listing.property_id}
            image_url= {listing.image_url}
            description={listing.description}
            price_pcm={listing.price_pcm}
            address={listing.address}
            property_id={listing.property_id}
        />)}
      </div>
    </div>
  )
}

export default Listing;