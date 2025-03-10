// src/components/Banner.tsx
import Image from 'next/image';

interface BannerProps {
  imageSrc: string;
  altText: string;
  mt: string;
}

const Banner: React.FC<BannerProps> = ({ imageSrc, altText, mt }) => {
  return (
    <div className={"relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-64 "}
      style={{ marginTop: mt }}
    >
      <Image
        src={imageSrc}
        alt={altText}
        fill
        className="object-cover"
      />
    </div>
  );
};

export default Banner;
