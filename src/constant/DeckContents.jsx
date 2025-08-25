import Bento from "../components/Bento";

export default function DeckContent() {
  return (
    <section className="p-10 flex flex-col gap-6">
      <Bento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
      />
    </section>
  );
}
