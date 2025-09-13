import React from 'react';
import { useApi } from '../hooks/useApi';
import ServiceCard from '../components/ServiceCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Catalog = () => {
  const { data: services, loading, error } = useApi('/Services');

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  if (!Array.isArray(services)) {
    return <ErrorMessage message="Данные услуг не получены" />;
  }

  if (services.length === 0) {
    return (
      <div className="catalog">
        <h1>Каталог услуг</h1>
        <p>Нет доступных услуг</p>
      </div>
    );
  }

  return (
    <div className="catalog">
      <h1>Каталог услуг</h1>
      <div className="services-grid">
        {services.map(service => (
          <ServiceCard 
            key={service.serviceId}
            service={service} 
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
