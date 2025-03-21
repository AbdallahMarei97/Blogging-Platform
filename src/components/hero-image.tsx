interface HeroImageProps {
  title: string;
  subtitle: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ title, subtitle }) => {
  return (
    <div className="relative w-full h-64 md:h-96 mb-3">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        <p className="text-lg md:text-2xl mt-2">{subtitle}</p>
      </div>
    </div>
  );
};
