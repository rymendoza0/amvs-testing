import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Move, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group relative bg-white border border-stone-100 hover:border-stone-300 hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase text-stone-900">
          {property.tag}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <button className="flex items-center gap-2 text-white text-sm font-medium hover:underline decoration-gold-400 underline-offset-4">
                View Details <ArrowRight className="w-4 h-4" />
             </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl text-stone-900">{property.title}</h3>
            <span className="font-sans font-medium text-gold-600">{property.price}</span>
        </div>
        <p className="text-stone-500 text-sm mb-4 font-light">{property.location}</p>
        
        <div className="flex items-center justify-between border-t border-stone-100 pt-4 text-stone-600 text-xs tracking-wide">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-stone-400" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-stone-400" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4 text-stone-400" />
            <span>{property.sqft.toLocaleString()} Sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};