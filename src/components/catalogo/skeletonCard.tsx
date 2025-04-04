// components/catalogo/SkeletonCard.tsx
import styles from './catalogoPage.module.css';

const SkeletonCard = () => {
  return (
    <div className={`${styles.card} animate-pulse`}>
      <div className="bg-gray-300 h-48 w-full rounded-md mb-4" />
      <div className="bg-gray-300 h-4 w-3/4 rounded" />
    </div>
  );
};

export default SkeletonCard;
