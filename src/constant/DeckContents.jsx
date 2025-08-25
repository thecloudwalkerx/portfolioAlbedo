export default function DeckContent() {
  return (
    <section className="p-10 flex flex-col gap-6">
      <h1 className="text-4xl border-l-black font-bold">Hello World</h1>
      <p className="text-lg">This content moves with the deck.</p>
      <div className="bg-blue-200 h-40 w-full">Box 1</div>
      <div className="bg-green-200 h-40 w-full">Box 2</div>
    </section>
  );
}
