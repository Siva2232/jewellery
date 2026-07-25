import { brand } from "../../data/jewellery";

export function BrandLogo({
  className = "",
  imgClassName = "",
  alt = `${brand.name} — ${brand.tagline}`,
}) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={brand.logo}
        alt={alt}
        className={`h-full w-auto object-contain ${imgClassName}`}
      />
    </span>
  );
}

export default BrandLogo;
