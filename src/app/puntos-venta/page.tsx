import LocationCard from '@/components/location/LocationCard';
import React from 'react';

const PuntosVentaPage: React.FC = () => {
    // 🔹 Array de puntos de venta con información detallada
    const puntosDeVenta = [
        {
            id: 1,
            city: 'Barranquilla',
            address: 'VÍA 40 #85 - 999, Parque Industrial LOGIKA BODEGA D14',
            schedule: 'Lunes a Viernes: 8:00am - 6:00pm • Sábados: 9:00am - 1:00pm',
            phone: '(5) 345 6120 - 385 5758 - 301 789 5984',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.347127358473!2d-74.80567942505818!3d10.963889889225038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d1c1ff3e1bb%3A0x123456789abcdef!2sParque%20Industrial%20La%20Mar%C3%ADa!5e0!3m2!1ses!2sco!4v1706900000000',
            productsForSale: ['Baterías para autos', 'Filtros de aire', 'Aceites lubricantes']
        },
        {
            id: 2,
            city: 'Medellín',
            address: 'Carrera 50 #32-45, Centro Comercial Automotriz',
            schedule: 'Lunes a Viernes: 9:00am - 6:00pm • Sábados: 9:00am - 2:00pm',
            phone: '(4) 123 4567 - 300 567 8901',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.568736275018!2d-75.563123456789!3d6.251840128382929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d1c1ff3e1bb%3A0xabcdef123456789!2sCentro%20Comercial%20Automotriz!5e0!3m2!1ses!2sco!4v1706900000001',
            productsForSale: ['Llantas y neumáticos', 'Repuestos para frenos', 'Lubricantes']
        },
        {
            id: 3,
            city: 'Bogotá',
            address: 'Avenida Caracas #12-34, Zona Industrial',
            schedule: 'Lunes a Sábado: 8:30am - 5:30pm',
            phone: '(1) 765 4321 - 310 765 4321',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.2345678!2d-74.08123456789!3d4.6097100198238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d1c1ff3e1bb%3A0xabcdef123456789!2sZona%20Industrial!5e0!3m2!1ses!2sco!4v1706900000002',
            productsForSale: ['Lubricantes de alto rendimiento', 'Filtros de aceite', 'Herramientas']
        }
    ];

    return (
        <div className="flex flex-col items-center gap-8 py-8">

            {/* 🔹 Mapear los puntos de venta y renderizar cada LocationCard */}
            {puntosDeVenta.map((punto) => (
                <LocationCard
                    key={punto.id}
                    city={punto.city}
                    address={punto.address}
                    schedule={punto.schedule}
                    phone={punto.phone}
                    mapUrl={punto.mapUrl}
                    productsForSale={punto.productsForSale}
                />
            ))}
        </div>
    );
};

export default PuntosVentaPage;
