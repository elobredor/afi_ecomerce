import DeliveryModal from '@/components/common/DeliveryModal';
import React, { useState } from 'react';
import { TruckIcon, HomeIcon, WarehouseIcon } from 'lucide-react';
import { AddressCard } from '@/components/common/AddressCard';

interface AddressData {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  isDefault?: boolean;
}


const SelectDelivery = ({ addresses, selectedAddress, setSelectedAddress }) => {
  const [deliveryType, setDeliveryType] = useState('domicilio');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransportist, setSelectedTransportist] = useState(null);
    const [selectedAddressForAction, setSelectedAddressForAction] = useState<AddressData | null>(null);
    const [selectionMode, setSelectionMode] = useState(false);

  const transportists = [
    { id: 1, name: 'Coordinadora', logo: '/transportists/coordinadora.png' },
    { id: 2, name: 'Deprisa', logo: '/transportists/deprisa.png' },
    { id: 3, name: 'Blue', logo: '/transportists/blue.png' },
    { id: 4, name: 'Envia', logo: '/transportists/envia.png' }
  ];



  const handleTransportistSelection = (transportist) => {
    setSelectedTransportist(transportist);
    
    // Update selected address with the new transportist if an address is already selected
    if (selectedAddress) {
      setSelectedAddress({
        ...selectedAddress,
        transportist: transportist
      });
    }
  };


  const handleSelect = (data: AddressData) => {
    setSelectedAddressForAction(data);
    setSelectedAddress({
      id: data.id,
      name: data.address,
      transportist: selectedTransportist
    });
    
  };

  return (
    <>
      <DeliveryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
  
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
        <h1 className="text-primary text-xl font-semibold flex items-center">
          <TruckIcon className="mr-2 h-5 w-5" />
          Selecciona tipo de entrega
        </h1>
        <div className="border-b border-gray-200 mt-2 mb-6"></div>
        
        {/* Delivery Options */}
        <div className="grid gap-4 mb-6">
          <div
            className={`p-5 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              deliveryType === 'domicilio' 
                ? 'border-primary bg-blue-50 ring-2 ring-blue-100' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setDeliveryType('domicilio')}
          >
            <div className="flex items-center">
              <input 
                type="radio" 
                checked={deliveryType === 'domicilio'} 
                readOnly 
                className="w-4 h-4 text-primary" 
              />
              <div className="ml-3">
                <span className="font-medium flex items-center">
                  <HomeIcon className="h-4 w-4 mr-1" />
                  A domicilio
                </span>
                <p className="text-gray-600 text-sm mt-1">Selecciona tu dirección de envío</p>
              </div>
            </div>
          </div>

          {deliveryType === 'domicilio' && (
          <div className="space-y-6 animate-fadeIn ml-12">
            {/* Address Selection */}
            <div>
              <h2 className="text-primary font-semibold flex items-center">
                <HomeIcon className="h-4 w-4 mr-2" />
                Selecciona una dirección de envío
              </h2>
              <div className="border-b border-gray-200 mt-2 mb-4"></div>
              
              <div className="">
                  {addresses.map(address => (
                          <AddressCard
                            key={address.id}
                            data={address}
                            // onEdit={handleEdit}
                            // onDelete={handleDelete}
                            isSelectable={true}
                            isSelected={selectedAddressForAction?.id === address.id}
                            onSelect={handleSelect}
                          />
                        ))}
              </div>
              
              <button 
                onClick={() => setIsModalVisible(true)} 
                className="bg-primary text-white py-2 px-6 mt-4 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
              >
                + Agregar nueva dirección
              </button>
            </div>
            
            {/* Transportist Selection */}
            <div>
              <h2 className="text-primary font-semibold flex items-center">
                <TruckIcon className="h-4 w-4 mr-2" />
                Selecciona transportadora
              </h2>
              <div className="border-b border-gray-200 mt-2 mb-4"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {transportists.map((transportist) => (
                  <div
                    key={transportist.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center ${
                      selectedTransportist && selectedTransportist.id === transportist.id
                        ? 'border-primary bg-blue-50 ring-1 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleTransportistSelection(transportist)}
                  >
                    <input 
                      type="radio" 
                      name="transport"
                      checked={selectedTransportist && selectedTransportist.id === transportist.id} 
                      readOnly 
                      className="w-4 h-4 text-primary" 
                    />
                    <div className="ml-3 flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {/* You can replace this with actual logos */}
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      </div>
                      <span className="ml-2 font-medium">{transportist.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

          <div
            className={`p-5 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              deliveryType === 'bodega' 
                ? 'border-primary bg-blue-50 ring-2 ring-blue-100' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setDeliveryType('bodega')}
          >
            <div className="flex items-center">
              <input 
                type="radio" 
                checked={deliveryType === 'bodega'} 
                readOnly 
                className="w-4 h-4 text-primary" 
              />
              <div className="ml-3">
                <span className="font-medium flex items-center">
                  <WarehouseIcon className="h-4 w-4 mr-1" />
                  Recoger en bodega
                </span>
                <p className="text-gray-600 text-sm mt-1">Acércate a uno de nuestros puntos de recolección</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Delivery Options */}
       
      </div>
    </>
  );
};

export default SelectDelivery;