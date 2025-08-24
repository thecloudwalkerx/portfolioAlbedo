export default function ProfilePhoto({ src, size = 500 }) {
  return (
    <img
      src={src}
      alt="Profile Photo"
      className="absolute top-1/2 left-0 -translate-y-1/2 object-cover rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
