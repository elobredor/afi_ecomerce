import DeliveryModal from '@/components/common/DeliveryModal';
import React, { useState } from 'react';

const SelectDelivery = ({ addresses, selectedAddress, setSelectedAddress }) => {
  const [deliveryType, setDeliveryType] = useState('domicilio');
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
     <DeliveryModal
        // directions={directions}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        // setDirectionSelected={(direction) => {
        //   setDirectionSelected(direction);
        //   if (sellerDirection && isDelivery) {
        //     calculateDeliveryPrice();
        //   }
        // }}
        // refreshDirections={getDirections}
      />
  
    <div>
      <h1 className="text-primary font-semibold">Selecciona tipo de entrega</h1>
      <div className="border border-gray-300 mt-2 mb-4"></div>
      
      {/* Opciones de entrega */}
      <div className="space-y-4">
        <div
          className={`p-4 border rounded-md cursor-pointer ${deliveryType === 'domicilio' ? 'border-primary bg-blue-50' : 'border-gray-300'}`}
          onClick={() => setDeliveryType('domicilio')}
        >
          <input type="radio" checked={deliveryType === 'domicilio'} readOnly className="mr-2" />
          <span className="font-medium">A domicilio</span>
          <p className="text-gray-600 text-sm">Selecciona tu dirección de envío</p>
        </div>

        {deliveryType === 'domicilio' && (
        <div className="mt-6">
          {/* Selección de dirección */}
          <h2 className="text-primary font-semibold">Selecciona una dirección de envío</h2>
          <div className="border border-gray-300 mt-2 mb-4"></div>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 border rounded-md cursor-pointer ${selectedAddress === addr.id ? 'border-primary bg-blue-50' : 'border-gray-300'}`}
              onClick={() => setSelectedAddress(addr.id)}
            >
              <input type="radio" checked={selectedAddress === addr.id} readOnly className="mr-2" />
              <span className="font-medium">{addr.address}</span>
              <p className="text-gray-600 text-sm">{addr.city}</p>
            </div>
          ))}
          <button   onClick={() => setIsModalVisible(true)} className="bg-primary text-white  py-2 my-4 px-10 rounded-full text-sm">+ Agregar nueva dirección</button>
        
          {/* Selección de transportista */}
          <h2 className="text-primary font-semibold mt-6">Selecciona transportadora</h2>
          <div className="border border-gray-300 mt-2 mb-4"></div>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="transport" className="mr-2" /> Coordinadora
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="transport" className="mr-2" /> Deprisa
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="transport" className="mr-2" /> Blue
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="transport" className="mr-2" /> Envia
            </label>
          </div>
        </div>
      )}

        <div
          className={`p-4 border rounded-md cursor-pointer ${deliveryType === 'bodega' ? 'border-primary bg-blue-50' : 'border-gray-300'}`}
          onClick={() => setDeliveryType('bodega')}
        >
          <input type="radio" checked={deliveryType === 'bodega'} readOnly className="mr-2" />
          <span className="font-medium">Recoger en bodega</span>
          <p className="text-gray-600 text-sm">Acércate a uno de nuestros puntos de recolección</p>
        </div>
      </div>

      {/* Secciones adicionales si se elige "Domicilio" */}
     
    </div>
    </>
  );
};

export default SelectDelivery;
